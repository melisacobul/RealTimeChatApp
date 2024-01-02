using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

public class HomeController : Controller
{
    private readonly IHubContext<ChatHub> _hubContext;
    private readonly ApplicationDbContext _context;

    public HomeController(IHubContext<ChatHub> hubContext, ApplicationDbContext context)
    {
        _hubContext = hubContext;
        _context = context;
    }

    public IActionResult Index()
    {
        var messages = _context.Messages.ToList();
        return View(messages);
    }

    [HttpPost]
    public async Task<IActionResult> SendMessage(string userName, string text)
    {
        try
        {
            var message = new Message
            {
                UserName = userName,
                Text = text,
                Timestamp = DateTime.Now
            };

            _context.Messages.Add(message);
            await _context.SaveChangesAsync();

            await _hubContext.Clients.All.SendAsync("ReceiveMessage", message.UserName, message.Text);

            return RedirectToAction("Index");
        }
        catch (Exception ex)
        {
            // Hata mesajını konsola yazdırabilirsiniz
            Console.WriteLine($"Hata: {ex.Message}");
            throw; // Hatanın yukarıya doğru fırlatılması
        }
    }

}

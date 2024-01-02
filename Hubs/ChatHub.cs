using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

public class ChatHub : Hub
{
    public async Task SendMessage(string userName, string text)
    {
        await Clients.All.SendAsync("ReceiveMessage", userName, text);
    }
}

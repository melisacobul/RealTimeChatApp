const connection = new signalR.HubConnectionBuilder()
    .withUrl('/chatHub')  // Hub'ın URL'sini doğru şekilde belirtin
    .build();

connection.on('ReceiveMessage', addMessageToChat);

connection.start()
    .then(() => {
        console.log('SignalR connection established.');
    })
    .catch(error => {
        console.error('Error establishing SignalR connection:', error.message);
    });

function sendMessageToHub(message) {
    connection.invoke('SendMessage', message)
        .catch(error => {
            console.error('Error invoking SendMessage:', error.message);
        });
}

//ส่วนของ client
(function connect() {
    let socket = io.connect("http://localhost:3000")
    let username = document.querySelector('#username');
    let usernamebtn = document.querySelector('#usernamebtn');
    let curusername = document.querySelector('.card-header')

    usernamebtn.addEventListener('click', e => {
        console.log(username.value);
        socket.emit('change_username', { username: username.value })
        curusername.textContent = username.value;
        username = '';
    })
    let message = document.querySelector('#message');
    let messagebtn = document.querySelector('#messagebtn');
    let messageList = document.querySelector('#message-list');
    //ส่งข้องมูล
    messagebtn.addEventListener('click', e => {
            console.log(message.value);
            socket.emit('new_massage', { message: message.value });
            message.value = '';
        })
        //รับข้อมูล
    socket.on('receive_message', data => {
        console.log(data);
        let listitem = document.createElement('li');
        listitem.textContent = data.username + ": " + data.message; //เอาข้อมูลไปยัง list-item
        listitem.classList.add('list-group-item');
        messageList.appendChild(listitem)
    });
    let info = document.querySelector('.info');
    message.addEventListener('keypress', e => {
        socket.emit('typing')
    })
    socket.on('typing', data => {
        info.textContent = data.username + " is typing..."
        setTimeout(() => { info.textContent = '' }, 4000)
    })
})();
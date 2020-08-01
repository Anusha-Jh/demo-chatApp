//for client-side js codes
// to get the server and set the path where the server is working
const socket=io('http://localhost:3400')
const messageContainer=document.getElementById('message-container')
const messageForm=document.getElementById('send-container')
const messageInput=document.getElementById('message-input')
const name=prompt('What is your Name?')
appendMessage('you joined')
socket.emit('new-user',name)

socket.on('chat-message', data=>{
    //console.log(data)
    appendMessage('${data.name}:${data.messsage}')
})
socket.on('user-connected', name=>{
    appendMessage('${name} connected')
})
socket.on('user-disconnected', name=>{
    appendMessage('${name} disconnected')
})
messageForm.addEventListener('submit',e=>{
    //to stop the page from refreshing
    e.preventDefault()
    const message=messageInput.value
    //to append the message on the same side of client too
    appendMessage(('You: ${message}'))
    //to send info from the client to the server
    socket.emit('send-chat-message',message)
    //this will empty out the message field everytime we send it
    messageInput.value=''
})
//to append the file in the index file
function appendMessage(message){
    const messageElement=document.createElement('div')
    messageElement.innerText= message
    messageContainer.append(messageElement)
}
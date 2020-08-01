const io=require('socket.io')(3400)
const users={}
//client and server both works on completely different sites..so 3400 is called but client may run in some other port
io.on('connection',socket=>{
//to catch the new user in the server
   socket.on('new-user',name=>{
       users[socket.id]=name
       //to send the message that this client has joined
       socket.broadcast.emit('user-connected', name)

   })
   // console.log('new User')
   //socket.emit('chat-message','Hello World') 
   //to get the message sent by the client
   socket.on('send-chat-message',message=>{
      // console.log(message)
      //to send the message to the other client or any other user
      socket.broadcast.emit('chat-message',{message:message,name:
        users[socket.id]})
        

   })
   socket.on('disconnect',()=>{
       socket.broadcast.emit('user-disconnected',users[socket.id])
       delete users[socket.id]

})
})
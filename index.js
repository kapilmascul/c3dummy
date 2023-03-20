const express=require("express")
const http=require("http")
const {Server}=require("socket.io")
const app=express()

const httpServer=http.createServer(app)
httpServer.listen(9090,()=>{
    console.log("server running at port 9090")
})

const io=new Server(httpServer)

let names=[]; let chats=[]
io.on("connection",(socket)=>{

    socket.on("msg",(name,chat)=>{
        names.push(name)
        chats.push(`${name}:${chat}`)

        socket.emit("server","Online!")
        socket.broadcast.emit("user",`A new User joined the Chat: ${name}`)
        socket.broadcast.emit("clients",`Users joined the Chat: ${names}`)
        socket.broadcast.emit("chat",`Message from-${name}:${chat}`)
        socket.broadcast.emit("chatHistory",`${chats}`)
       
        socket.on("disconnect",(name)=>{
            socket.broadcast.emit("dis",` Left the chat`)
        })
    })
})




import { Server } from "socket.io";

const io = new Server({
    cors: {
        origin: "http://localhost:3000"
    }
});

let onlineUsers = [];

const addNewUser = (userId, socketId) => {
    !onlineUsers.some(user => user.userId === userId) && onlineUsers.push({ userId, socketId });
}

const removeUser = (socketId) => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
    return onlineUsers.find((user) => user.userId === userId);
};


io.on("connection", (socket) => {

    socket.on("newUser", (userId) => {
        addNewUser(userId, socket.id);
        console.log("adding user");
        console.log(onlineUsers);
    });

    socket.on("alertAdmin", ({ senderName, workshopName,  companyName }) => {
        console.log("alerting admin");
        //const admins = onlineUsers.filter(item=> item.userId.startsWith("admin"));
        console.log(getUser("admin1").socketId);
        io.to(getUser("admin1").socketId).emit("alertingAdmin", {
            senderName, workshopName, companyName
        });
        console.log(senderName, workshopName,  companyName);
        
        console.log("sent to admin");

        /* admins.forEach(function(admin){
            console.log(admin.socketId);
            io.to(getUser(admin.socketId).socketId).emit("alertingAdmin", {
                senderName, workshopName, companyName
            });
        }); */
    })

    socket.on("disconnect", () => {
        console.log("someone has left");
        removeUser(socket.id);
    });



});

io.listen(5000);
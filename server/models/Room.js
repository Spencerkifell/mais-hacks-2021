class Room{
    constructor(id, roomName, rules){
        this.id = id;
        this.roomName = roomName;
        this.rules = rules;
        this.users = new Map();
        this.messages = [];
    }

    addUser(user){
        this.users.set(user.name, user);
    }

    removeUser(userName){
        return this.users.delete(userName);
    }

    getCurrentUsers(){
        let currentUsers = [];

        for(let user in this.users)
            currentUsers.push(this.users.get(user).name);

        return currentUsers;
    }
}

module.exports = Room;
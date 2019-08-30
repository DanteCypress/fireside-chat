//adding new chat doc

//setting up a real-time listener to get new chat

//updating the username

//updating the room

class Chatroom {
  constructor(room, username) {
    (this.room = room),
      (this.username = username),
      (this.chats = db.collection("chats"));
  }
  async addChat(message) {
    //format chat object
    const now = new Date();
    const chat = {
      message,
      username: this.username,
      room: this.room,
      posted_at: firebase.firestore.Timestamp.fromDate(now)
    };
    //save to firebase
    const response = await this.chats.add(chat);
    return response;
  }
  getChats(callbackFn) {
    this.chats.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type === "added") {
          //update ui
          callbackFn(change.doc.data());
        }
      });
    });
  }
}

const chatroom = new Chatroom("general", "Dante");
console.log(chatroom);

chatroom.getChats(data => {
  console.log(data);
});

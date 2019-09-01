//adding new chat doc

//setting up a real-time listener to get new chat

//updating the username

//updating the room

class Chatroom {
  constructor(room, username) {
    (this.room = room),
      (this.username = username),
      (this.chats = db.collection("chats")),
      this.unsub;
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
    this.unsub = this.chats
      .where("room", "==", this.room)
      .orderBy("posted_at")
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type === "added") {
            //update ui
            callbackFn(change.doc.data());
          }
        });
      });
  }
  updateName(username) {
    this.username = username;
    localStorage.setItem("username", username);
  }
  updateRoom(room) {
    this.room = room;
    console.log(room, "current room");
    if (this.sub) {
      this.unsub();
    }
  }
}

// setTimeout(() => {
//   chatroom.updateRoom("JavaScript");
//   chatroom.updateName("Cypress");
//   chatroom.getChats(data => {
//     console.log(data);
//   });
//   chatroom.addChat("hello");
// }, 3000);
// chatroom.updateRoom("JavaScript");

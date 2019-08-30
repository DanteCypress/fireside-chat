//dom
const chatList = document.querySelector(".chat-list");
//class instances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom("General", "Dante");
//gets chat & render
chatroom.getChats(data => {
  chatUI.render(data);
});

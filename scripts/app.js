//dom
const newChatForm = document.querySelector(".new-chat");
const chatList = document.querySelector(".chat-list");
const usernameForm = document.querySelector(".new-name");
const updateMsg = document.querySelector(".update-msg");
const rooms = document.querySelector(".chat-rooms");
//add new chat
newChatForm.addEventListener("submit", e => {
  e.preventDefault();
  const message = newChatForm.message.value.trim();
  chatroom.addChat(message).then(() => {
    newChatForm.reset().catch(err => {
      console.log(err);
    });
  });
});

//update username

usernameForm.addEventListener("submit", e => {
  e.preventDefault();
  const newName = usernameForm.name.value.trim();

  chatroom.updateName(newName);
  usernameForm.reset();
  //show update msg
  updateMsg.innerText = `Username updated to ${newName}`;
  setTimeout(() => (updateMsg.innerText = ""), 2500);
});

rooms.addEventListener("click", e => {
  if (e.target.tagName === "BUTTON") {
    chatUI.clear();
    chatroom.updateRoom(e.target.getAttribute("id"));
    chatroom.getChats(chat => chatUI.render(chat));
  }
});
//check lS for name

const username = localStorage.username ? localStorage.username : "Anon";
//class instances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom("General", username);
//gets chat & render
chatroom.getChats(data => {
  chatUI.render(data);
});

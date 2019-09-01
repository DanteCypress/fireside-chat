//dom
const newChatForm = document.querySelector(".new-chat");
const chatList = document.querySelector(".chat-list");
const usernameForm = document.querySelector(".new-name");
const updateMsg = document.querySelector(".update-msg");
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
});
//class instances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom("General", "Anon");
//gets chat & render
chatroom.getChats(data => {
  chatUI.render(data);
});

// dom queries
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMssg = document.querySelector('.update-mssg')
const rooms = document.querySelector('.chat-rooms')
const deleteBtn = document.querySelector('.delete')

// add a new chat
newChatForm.addEventListener('submit', e => {
    e.preventDefault();
    const message = newChatForm.message.value.trim();
    chatroom.addChat(message)
        .then(() => newChatForm.reset())
        .catch(err => console.log(err));
})

// update username
newNameForm.addEventListener('submit', e => {
    e.preventDefault();
    // update name via chatroom class
    const newName = newNameForm.name.value.trim()
    chatroom.updateName(newName);
    //reset form
    newNameForm.reset();
    //show then hide the update message
    setTimeout(() => {
        updateMssg.innerText=" ";
    }, 3000)
    updateMssg.innerText = `Your name was updated to ${newName}`;
})

//update the chat room

rooms.addEventListener('click', e => {
    if(e.target.tagName === 'BUTTON') {
        chatUI.clear();
        chatroom.updateRoom(e.target.getAttribute('id'));
        chatroom.getChats(chat => chatUI.render(chat))
    }
})

//delete all chats

deleteBtn.addEventListener('click', () => {
    db.collection('chats').get()
        .then(snapshot => {
            snapshot.docs.forEach(doc => {
                let id = doc.id
                console.log(doc.data(), doc.id)
                db.collection('chats').doc(id).delete();
            })     
        })
   
})

// deleteBtn.addEventListener('click', () => {
//     db.collection('chats')
//         .onSnapshot(snapshot => {
//             snapshot.docs.forEach(doc => {
//                 let id = doc.id
//                 console.log(doc.data(), doc.id)
//                 db.collection('chats').doc(id).delete();
//             })     
//         })
   
// })

//test delete
// deleteBtn.addEventListener('click', () => {
//     db.collection('chats')
//         .onSnapshot(snapshot => {
//             snapshot.docs.delete();    
//         })
   
// })


// check local storage for a name
const username = localStorage.username ? localStorage.username : 'Anonymous'

// class instances
const chatUI = new ChatUI(chatList)
const chatroom = new Chatroom('general', username);

// get chats and render
chatroom.getChats(data => chatUI.render(data));
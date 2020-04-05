import React, { useState, createContext, useEffect } from 'react';

export const StoreContext = createContext(null);

export default ({ children }) => {

  const [user, setUser] = useState(); // from onAuthStateChanged
  const [newUser, setNewUser] = useState(false);

    // stores info on current user
    // from firestore - users/$user.uid
  const [userSnapshot, setUserSnapshot] = useState(); 
  const [unsubUser, setUnsubUser] = useState();

    // stores messages of current chat
    // from database - msg/$friend.chatID
  const [messages, setMessages] = useState(); 
  const [unsubMessages, setUnsubMessages] = useState();
  
    // stores personal info on friend
    // from firestore - users/$user.uid/friends/$userSnapshot.current_friend
  const [friendSnapshot, setFriendSnapshot] = useState();
  const [unsubFriend, setUnSubFriend] = useState();
  
    // stores list of friends
    // from firestore users/$user.uid/friends
  const [friendsSnapshot, setFriendsSnapshot] = useState();
  const [unsubFriends, setUnsubFriends] = useState();
  

  const store = {
    user, setUser,
    newUser, setNewUser,

    userSnapshot, setUserSnapshot,
    unsubUser, setUnsubUser,

    messages, setMessages,
    unsubMessages, setUnsubMessages,

    friendSnapshot, setFriendSnapshot,
    unsubFriend, setUnSubFriend,

    friendsSnapshot, setFriendsSnapshot,
    unsubFriends, setUnsubFriends,

  };

  useEffect(() => {
    console.log(store)
  })

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

import React, { useEffect, useContext, useState } from "react";
import { StoreContext } from '../store';

import firebase from "../firebase";
const firestore = firebase.firestore();

import Loadpage from "../loading/index"

export default function Switch({ navigation }) {

  const { user, setUser, newUser, setNewUser, userSnapshot, setUserSnapshot, setUnsubUser } = useContext(StoreContext);

  const[triedAuth, setTriedAuth] = useState(false)

  useEffect(() => {
    firebase.auth().onAuthStateChanged(d => { setUser(d); setTriedAuth(true) });
  }, [firebase]);

  useEffect(() => {
    if (triedAuth) {
      if (user != null) { // if null, user signed out
        let unsub = firestore.collection("users").doc(user.uid);
          
        unsub.onSnapshot(s => s ? setUserSnapshot(s.data()) : setNewUser(true));
        
        setUnsubUser(unsub)

      } else {

        console.log("Switch => login")
        navigation.navigate('Login');

      }
    }

  }, [user, triedAuth])

  useEffect(() => {
    if (newUser) {
      console.log("Switch => NewUser")
      navigation.navigate('NewUser');
    }
  }, [newUser])

  useEffect(() => {
    if (userSnapshot) {
      console.log("Switch => Loading")
      navigation.navigate('Loading');
    }
  }, [userSnapshot])

  return (
    <Loadpage text={"Authenticating..."} />
  )
}



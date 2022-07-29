import { initializeApp } from "/firebase/firebase-app.js";
import { getFirestore } from '/firebase/firebase-firestore.js';
import { runTransaction, doc } from '/firebase/firebase-firestore.js';

let userInfo = {};  // from chrome

try {
  chrome.identity.getProfileUserInfo(function(userInfoData) {
    userInfo = userInfoData;
    console.log(JSON.stringify(userInfo));
  });

chrome.action.onClicked.addListener(tab => {
  chrome.tabs.sendMessage(tab.id,"toggle");
});

// we downloaded firebase from https://www.gstatic.com/firebasejs/9.6.5/firebase-app.js into ./firebase folder
// https://stackoverflow.com/questions/69160743/connect-a-manifest-version-3-chrome-extension-to-a-firestore-database
const firebaseConfig = {
  apiKey: "",
  authDomain: "**.firebaseapp.com",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};

const firebase = initializeApp(firebaseConfig);
const db = getFirestore(firebase);

chrome.runtime.onMessage.addListener((msg, sender, resp) => {
  if (msg.command == "update-stats") {
    console.log('CMD, update-stats', msg.data);

    let userRef = doc(db, 'users', userInfo.id);
    runTransaction(db, transaction => {
      return transaction.get(userRef).then(userDoc => {
        // let user = userDoc.data();
        // let eventName = msg.data.eventName;
        // let oldNumber = user[eventName] || 0;
        // let newNumber = oldNumber + 1;
        // return transaction.update(userRef, { stats: { eventName: newNumber }});
        return transaction.update(userRef, { 'eventName': 42 });
      });
    });

    resp({
      type: 'result',
      status: 'success',
      data: {},
      request: msg,
    });
    return true;
  }
  
  console.log('Unknown command', msg.command);
});


} catch(e) {
  console.log('Error', e);
}

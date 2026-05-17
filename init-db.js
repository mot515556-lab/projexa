// هنحط هنا الـ Config اللي فيسبوك هتديهولك
const firebaseConfig = {
    apiKey: "AIzaSy...",
    authDomain: "projexa.firebaseapp.com",
    projectId: "projexa",
    storageBucket: "projexa.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abc123"
};

// تشغيل الفايربيز
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
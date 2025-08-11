// =======================
// Firebase Initialization
// =======================
const firebaseConfig = {
    apiKey: "AIzaSyA2-ZSnxGhMSbpxR9lWipQ-JX4s8Fz3j8Q",
    authDomain: "librarymanagement-80741.firebaseapp.com",
    projectId: "librarymanagement-80741",
    storageBucket: "librarymanagement-80741.firebasestorage.app",
    messagingSenderId: "7076696675",
    appId: "1:7076696675:web:ff0f1965ca544627ab1e56"
};

// Initialize Firebase (only once)
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();
const auth = firebase.auth();

// DOM Elements
const totalBooksEl = document.getElementById('totalBooksCount');
const borrowedBooksEl = document.getElementById('borrowedBooksCount');
const overdueBooksEl = document.getElementById('overdueBooksCount');

// 1️⃣ Total Books
db.collection("books").onSnapshot(snapshot => {
    totalBooksEl.textContent = snapshot.size; // total count of books
}, error => {
    console.error("Error fetching total books:", error);
});

// 2️⃣ Borrowed Books (status = 'borrowed')
db.collection("borrowedBooks").where("status", "==", "borrowed")
    .onSnapshot(snapshot => {
        borrowedBooksEl.textContent = snapshot.size;
    }, error => {
        console.error("Error fetching borrowed books:", error);
    });

// 3️⃣ Overdue Books (borrowDate older than 15 days)
db.collection("borrowedBooks").where("status", "==", "borrowed")
    .onSnapshot(snapshot => {
        let overdueCount = 0;
        const now = new Date();

        snapshot.forEach(doc => {
            const data = doc.data();
            if (data.borrowDate && data.borrowDate.toDate) {
                const borrowDate = data.borrowDate.toDate();
                const diffDays = Math.floor((now - borrowDate) / (1000 * 60 * 60 * 24));
                if (diffDays > 15) {
                    overdueCount++;
                }
            }
        });

        overdueBooksEl.textContent = overdueCount;
    }, error => {
        console.error("Error fetching overdue books:", error);
    });

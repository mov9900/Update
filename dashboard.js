// Import Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { 
    getFirestore, 
    doc, 
    getDoc, 
    collection, 
    query, 
    where, 
    onSnapshot 
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyA2-ZSnxGhMSbpxR9lWipQ-JX4s8Fz3j8Q",
    authDomain: "librarymanagement-80741.firebaseapp.com",
    projectId: "librarymanagement-80741",
    storageBucket: "librarymanagement-80741.firebasestorage.app",
    messagingSenderId: "7076696675",
    appId: "1:7076696675:web:ff0f1965ca544627ab1e56"
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Elements
const qrScannerBtn = document.getElementById('qrScannerBtn');
const qrModal = document.getElementById('qrModal');
const qrModalOverlay = document.getElementById('qrModalOverlay');
const closeQrModal = document.getElementById('closeQrModal');
const qrCodeContainer = document.getElementById('userQrCode');

// Fetch user data from Firestore (v9 syntax)
async function fetchUserData(uid) {
    try {
        const userRef = doc(db, "users", uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            return userSnap.data();
        } else {
            console.error("No such user found!");
            return null;
        }
    } catch (error) {
        console.error("Error fetching user:", error);
        return null;
    }
}

// Open modal and generate QR code
async function openQrModal(uid) {
    const userData = await fetchUserData(uid);
    if (!userData) return;

    qrCodeContainer.innerHTML = ""; // clear old QR

    // Generate QR with JSON data
    new QRCode(qrCodeContainer, {
        text: JSON.stringify(userData),
        width: 180,
        height: 180
    });

    qrModal.classList.remove('hidden');
}

// Track auth state and attach events
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("Logged in UID:", user.uid);

        // Borrowed books listener
        const borrowedRef = query(collection(db, "borrowedBooks"), where("userId", "==", user.uid));
        onSnapshot(borrowedRef, (snapshot) => {
            let borrowedCount = 0;
            let dueSoonCount = 0;
            let overdueCount = 0;

            const today = new Date();
            const dueSoonThreshold = new Date();
            dueSoonThreshold.setDate(today.getDate() + 3);

            snapshot.forEach(docSnap => {
                borrowedCount++;
                const data = docSnap.data();
                if (data.dueDate) {
                    const dueDate = new Date(data.dueDate);
                    if (dueDate < today) {
                        overdueCount++;
                    } else if (dueDate <= dueSoonThreshold) {
                        dueSoonCount++;
                    }
                }
            });

            document.getElementById("booksBorrowedCount").textContent = borrowedCount;
            document.getElementById("booksDueSoonCount").textContent = dueSoonCount;
            document.getElementById("overdueBooksCount").textContent = overdueCount;
        });

        // QR button event
        qrScannerBtn.addEventListener('click', () => openQrModal(user.uid));

    } else {
        window.location.href = "index.html";
    }
});

// Close modal
closeQrModal.addEventListener('click', () => qrModal.classList.add('hidden'));
qrModalOverlay.addEventListener('click', () => qrModal.classList.add('hidden'));

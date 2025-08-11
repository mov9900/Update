// app.js

// Signup
const signupForm = document.getElementById('signupForm');
if (signupForm) {
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;
    const fullName = document.getElementById('signupName').value;
    const enrollment = document.getElementById('signupEnrollment').value;
    const semester = document.getElementById('signupSemester').value; // new line
    const department = document.getElementById('signupdepartment').value; // new line

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    function isValidEnrollment(enroll) {
      return (
        enroll.length === 12 &&
        enroll.slice(2, 5) === '014' &&
        /^[0-9]+$/.test(enroll)
      );
    }
    if (!isValidEnrollment(enrollment)) {
      alert('Invalid Enrollment Number.');
      return;
    }

    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        return db.collection('users').doc(user.uid).set({
          fullName,
          email,
          enrollment,
          semester,
          department,
          role: "user",
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
      })
      .then(() => {
        alert('Signup successful! Please login.');
        window.location.href = 'index.html';
      })
      .catch((error) => {
        alert(error.message);
      });
  });
}

// Login
const loginForm = document.getElementById('loginForm');

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        // Check if the user is in the "admins" collection
        db.collection("admins").doc(user.uid).get()
          .then((doc) => {
            if (doc.exists) {
              // User is an admin
              window.location.href = "admin-dashboard.html";
            } else {
              // Not in admins collection → normal user
              window.location.href = "dashboard.html";
            }
          })
          .catch((error) => {
            console.error("Error checking admin status: ", error);
            alert("Error checking user role. Please try again.");
          });

      })
      .catch((error) => {
        alert(error.message);
      });
  });
}



// Logout
const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    auth.signOut().then(() => {
      window.location.href = 'index.html';
    });
  });
}

// Show user name on dashboard
auth.onAuthStateChanged((user) => {
  if (user) {
    const userName = document.getElementById('user-name');
    if (userName) {
      db.collection('users').doc(user.uid).get()
        .then(doc => {
          if (doc.exists) {
            userName.textContent = `Welcome, ${doc.data().fullName}`;
          }
        });
    }
  }
});

//same as upper code 
auth.onAuthStateChanged((user) => {
  if (user) {
    const uid = user.uid;
    db.collection("users").doc(uid).get()
      .then((doc) => {
        if (doc.exists) {
          const fullName = doc.data().fullName;
          document.getElementById("welcomeTitle").textContent = `WELCOME ${fullName.toUpperCase()}`;
        } else {
          console.log("No user data found.");
        }
      })
      .catch((error) => {
        console.error("Error getting user data:", error);
      });
  } else {
    console.log("User not logged in");
  }
});


document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');
  const showSignup = document.getElementById('show-signup');
  const showLogin = document.getElementById('show-login');

  showSignup.addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.style.display = 'none';
    signupForm.style.display = 'block';
  });

  showLogin.addEventListener('click', (e) => {
    e.preventDefault();
    signupForm.style.display = 'none';
    loginForm.style.display = 'block';
  });
});

//Reset Password
function showResetPassword() {
  document.getElementById('login-form').style.display = 'none';
  document.getElementById('signup-form').style.display = 'none';
  document.getElementById('resetPassword').style.display = 'block';
}

function showLoginForm() {
  document.getElementById('resetPassword').style.display = 'none';
  document.getElementById('signup-form').style.display = 'none';
  document.getElementById('login-form').style.display = 'block';
}

async function resetPassword(event) {
  event.preventDefault(); // prevent form from reloading page

  const email = document.getElementById("email").value.trim();
  const msg = document.getElementById("message");

  msg.textContent = ""; // clear previous message

  if (!email) {
    msg.textContent = "Please enter your email.";
    msg.style.color = "red";
    return;
  }

  try {
    await auth.sendPasswordResetEmail(email);
    msg.textContent = "Reset link sent to your email.";
    msg.style.color = "green";
  } catch (error) {
    msg.textContent = "Error: " + error.message;
    msg.style.color = "red";
  }
}

// Optional: toggle between login/signup (if needed)
document.getElementById("show-signup").addEventListener("click", function () {
  document.getElementById("login-form").style.display = "none";
  document.getElementById("signup-form").style.display = "block";
  document.getElementById("resetPassword").style.display = "none";
});

document.getElementById("show-login").addEventListener("click", function () {
  showLoginForm();
});


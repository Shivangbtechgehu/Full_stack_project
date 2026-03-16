// import { io } from "socket.io-client";

// // This tells the browser to connect to the server on Port 3001
// const socket = io("http://localhost:3001");

// console.log("Attempting to connect...");
// socket.on("connect", () => {
//   console.log("I am connected to the server! My ID is:", socket.id);
// });
document.addEventListener('DOMContentLoaded', () => {
  // 1. Grab the modals
  const loginModal = document.getElementById("loginModal");
  const registerModal = document.getElementById("registerModal");

  // 2. Grab the buttons that open the login modal
  const loginBtn = document.getElementById("login-btn"); 
  const heroBtn = document.getElementById("hero-start-btn"); 

  // 3. Grab the toggle links
  const toRegisterLink = document.getElementById("toRegister"); 
  const toLoginLink = document.getElementById("toLogin"); 

  // 4. Grab all close (x) buttons
  const closeBtns = document.querySelectorAll(".close-btn");

  // Helper function to hide all modals and unlock scrolling
  const hideAllModals = () => {
    if (loginModal) loginModal.style.display = "none";
    if (registerModal) registerModal.style.display = "none";
    document.body.classList.remove("modal-open");
  };

  // Function to open Login Modal and lock scrolling
  const openLogin = (e) => {
    e.preventDefault();
    hideAllModals();
    if (loginModal) {
      loginModal.style.display = "block";
      document.body.classList.add("modal-open");
    }
  };

  // Function to open Registration Modal and lock scrolling
  const openRegister = (e) => {
    e.preventDefault();
    hideAllModals();
    if (registerModal) {
      registerModal.style.display = "block";
      document.body.classList.add("modal-open");
    }
  };

  // Attach click events to open modals
  if (loginBtn) loginBtn.onclick = openLogin;
  if (heroBtn) heroBtn.onclick = openLogin;
  if (toLoginLink) toLoginLink.onclick = openLogin;
  if (toRegisterLink) toRegisterLink.onclick = openRegister;

  // Attach click events to close buttons
  closeBtns.forEach(btn => {
    btn.onclick = hideAllModals;
  });

  // Close modals when clicking outside the box
  window.onclick = (event) => {
    if (event.target === loginModal || event.target === registerModal) {
      hideAllModals();
    }
  };

  // Helper function for Email Validation (Regex)
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // --- Registration Form Logic ---
  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.onsubmit = (e) => {
      e.preventDefault(); 
      
      const email = document.getElementById("regEmail").value;
      const pass = document.getElementById("regPassword").value;
      const confirmPass = document.getElementById("confirm-password").value;
      
      // Grab the selected role and convert to lowercase to prevent bugs
      const selectedRole = document.querySelector('input[name="userRole"]:checked').value.toLowerCase();

      // Feature 1: Check Email Syntax
      if (!isValidEmail(email)) {
        alert("Please enter a valid email address.");
        return;
      }

      // Feature 2: Match Password and Confirm Password
      if (pass !== confirmPass) {
        alert("Passwords do not match. Please re-enter them.");
        return; 
      }

      // --- TEMPORARY DATABASE BYPASS ---
      alert(`Registration successful! Logging you in as a ${selectedRole}.`);
      hideAllModals();

      // Feature 3: Redirect based on all 4 role selections
      if (selectedRole === "farmer") {
        window.location.href = "farmer.html";
      } else if (selectedRole === "buyer") {
        window.location.href = "buyer.html";
      } else if (selectedRole === "keeper") {
        window.location.href = "keeper.html"; 
      } else if (selectedRole === "admin") {
        window.location.href = "admin.html";
      }
    };
  }

  // --- Login Form Logic ---
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.onsubmit = (e) => {
      e.preventDefault();
      
      const email = document.getElementById("email").value;
      const emailLower = email.toLowerCase(); // Convert to lowercase for reliable matching

      // Validate Email Syntax
      if (!isValidEmail(email)) {
        alert("Please enter a valid email address.");
        return;
      }

      // --- TEMPORARY DATABASE BYPASS ---
      alert("Login successful!");
      hideAllModals();

      // Temporary routing logic for all 4 roles until Firebase is connected
      if (emailLower.includes("buyer")) {
        window.location.href = "buyer.html";
      } else if (emailLower.includes("admin")) {
        window.location.href = "admin.html";
      } else if (emailLower.includes("keeper")) {
        window.location.href = "keeper.html";
      } else {
        // Defaults to farmer if none of the above keywords are in the email
        window.location.href = "farmer.html"; 
      }
    };
  }
});
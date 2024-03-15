//burger menu
function toggleMenu() {
var navigationItems = document.querySelector('.navigation-items');
var burgerIcon = document.querySelector('.burger-menu');
navigationItems.classList.toggle('nav-open');
burgerIcon.classList.toggle("active");
}

//nav dropdown
function toggleDropdown(dropdownBtnId, dropdownContentId) {
    var dropdownContents = document.getElementsByClassName("dropdown-content");
    var dropdownButtons = document.getElementsByClassName("dropbtn");
  
    // Close all dropdowns first
    for (let i = 0; i < dropdownContents.length; i++) {
      if (dropdownContents[i].id !== dropdownContentId) { // Check to not close the one we're about to toggle
        dropdownContents[i].classList.remove("show");
      }
      if (dropdownButtons[i].id !== dropdownBtnId) { // Similarly, check for button not being the one we're about to toggle
        dropdownButtons[i].classList.remove("active");
      }
    }
  
    // Now toggle the clicked dropdown and button
    document.getElementById(dropdownContentId).classList.toggle("show");
    document.getElementById(dropdownBtnId).classList.toggle("active");
  }
  
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdownContents = document.getElementsByClassName("dropdown-content");
      var dropdownButtons = document.getElementsByClassName("dropbtn");
      
      for (let i = 0; i < dropdownContents.length; i++) {
        var openDropdown = dropdownContents[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
          // Also remove the 'active' class from the button if there's a matching button
          if (dropdownButtons[i]) { // Added check to ensure there's a matching button
            dropdownButtons[i].classList.remove('active');
          }
        }
      }
    }
  }
  

//sticky nav bar on scroll
window.addEventListener("scroll", function() {
var nav = document.querySelector("nav");

if (window.innerWidth <= 768) { 
    if (window.scrollY > 0) {
    nav.classList.add("scrolled"); 
    } else {
    nav.classList.remove("scrolled"); 
    }
}
});


//newsletter email input validation
document.addEventListener('DOMContentLoaded', function() {
var emailInput = document.getElementById('mce-EMAIL');
var submitButton = document.getElementById('mc-embedded-subscribe');
var errorMessage = document.getElementById('email-error');

function validateEmail() {
    var emailValue = emailInput.value;
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email pattern for validation
    
    if (emailValue === '') { // If email field is empty
    errorMessage.style.display = 'none'; // Hide error message
    submitButton.disabled = true; // Keep the Subscribe button disabled
    } else if (emailPattern.test(emailValue)) {
    errorMessage.style.display = 'none'; // Hide error message
    submitButton.disabled = false; // Enable the Subscribe button
    } else {
    errorMessage.style.display = 'block'; // Show error message
    submitButton.disabled = true; // Disable the Subscribe button
    }
}

emailInput.addEventListener('input', validateEmail);

// Initialize on load
validateEmail();
});

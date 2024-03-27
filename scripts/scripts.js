//* Burger Menu
function toggleMenu() {
  var navigationItems = document.querySelector(".navigation-items");
  var burgerIcon = document.querySelector(".burger-menu");
  navigationItems.classList.toggle("nav-open");
  burgerIcon.classList.toggle("active");
}

//* Dropdown
document.addEventListener("DOMContentLoaded", function () {
  setupDropdownBehavior();
  window.addEventListener("resize", debounce(setupDropdownBehavior, 250));
});

function toggleDropdown(dropdownBtnId, dropdownContentId) {
  const dropdownContent = document.getElementById(dropdownContentId);
  const dropdownButton = document.getElementById(dropdownBtnId);

  // Toggle the visibility of the dropdown content
  dropdownContent.classList.toggle("show");

  // Toggle the 'active' class on the dropdown button
  dropdownButton.classList.toggle("active"); // This line ensures the 'active' class is correctly toggled

  // Close all other dropdowns except the current one
  const allDropdownContents = document.querySelectorAll(".dropdown-content");
  allDropdownContents.forEach((content) => {
    if (content.id !== dropdownContentId) {
      content.classList.remove("show");
    }
  });

  const allDropdownButtons = document.querySelectorAll(".dropbtn");
  allDropdownButtons.forEach((button) => {
    if (button.id !== dropdownBtnId) {
      button.classList.remove("active");
    }
  });
}

function setupDropdownBehavior() {
  const isMobileView = window.matchMedia("(max-width: 768px)").matches;
  const dropdowns = document.querySelectorAll(".dropdown");

  dropdowns.forEach((dropdown) => {
    const btn = dropdown.querySelector(".dropbtn");
    const dropdownContentId = btn.getAttribute("data-dropdown");

    // Clean up previous event listeners
    btn.removeEventListener("click", handleDropdownClick);
    btn.removeEventListener("mouseenter", handleDropdownMouseEnter);
    dropdown.removeEventListener("mouseleave", handleDropdownMouseLeave);

    if (isMobileView) {
      btn.addEventListener("click", handleDropdownClick);
    } else {
      btn.addEventListener("mouseenter", handleDropdownMouseEnter);
      dropdown.addEventListener("mouseleave", handleDropdownMouseLeave);
    }
  });

  // Only for mobile: Close all dropdowns when clicking outside
  if (isMobileView) {
    document.addEventListener("click", closeAllDropdowns, true);
  } else {
    document.removeEventListener("click", closeAllDropdowns, true);
  }
}

function handleDropdownClick(event) {
  const btn = event.target;
  const dropdownContentId = btn.getAttribute("data-dropdown");
  toggleDropdown(btn.id, dropdownContentId);
  event.stopPropagation(); // Prevent triggering closeAllDropdowns
}

function handleDropdownMouseEnter(event) {
  const btn = event.target;
  const dropdownContentId = btn.getAttribute("data-dropdown");
  toggleDropdown(btn.id, dropdownContentId);
}

function handleDropdownMouseLeave(event) {
  const dropdownContent =
    event.currentTarget.querySelector(".dropdown-content");
  dropdownContent.classList.remove("show");
}

function closeAllDropdowns(event) {
  if (!event.target.matches(".dropbtn")) {
    const dropdowns = document.querySelectorAll(".dropdown-content");
    dropdowns.forEach((dropdown) => {
      dropdown.classList.remove("show");
    });
  }
}

// Debounce function to limit resize event handling
function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

//* Sticky Nav Bar On Scroll
window.addEventListener("scroll", function () {
  var nav = document.querySelector("nav");

  if (window.innerWidth <= 768) {
    if (window.scrollY > 0) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  }
});

//* Newsletter Email Input Validation
document.addEventListener("DOMContentLoaded", function () {
  var emailInput = document.getElementById("mce-EMAIL");
  var submitButton = document.getElementById("mc-embedded-subscribe");
  var errorMessage = document.getElementById("email-error");

  function validateEmail() {
    var emailValue = emailInput.value;
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email pattern for validation

    if (emailValue === "") {
      // If email field is empty
      errorMessage.style.display = "none"; // Hide error message
      submitButton.disabled = true; // Keep the Subscribe button disabled
    } else if (emailPattern.test(emailValue)) {
      errorMessage.style.display = "none"; // Hide error message
      submitButton.disabled = false; // Enable the Subscribe button
    } else {
      errorMessage.style.display = "block"; // Show error message
      submitButton.disabled = true; // Disable the Subscribe button
    }
  }

  emailInput.addEventListener("input", validateEmail);

  // Initialize on load
  validateEmail();
});

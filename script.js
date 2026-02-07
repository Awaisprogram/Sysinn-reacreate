const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const menuIcon = document.getElementById("menu-icon");
const closeIcon = document.getElementById("close-icon");

menuBtn.addEventListener("click", () => {
  // Toggle the open class for animation
  mobileMenu.classList.toggle("open");
  
  // Toggle Icons
  if (mobileMenu.classList.contains("open")) {
      menuIcon.classList.add("hidden");
      closeIcon.classList.remove("hidden");
  } else {
      menuIcon.classList.remove("hidden");
      closeIcon.classList.add("hidden");
  }
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!menuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
      mobileMenu.classList.remove("open");
      menuIcon.classList.remove("hidden");
      closeIcon.classList.add("hidden");
    }
});


// FAQS SECTION

document.querySelectorAll('.faq-toggle').forEach(button => {
  button.addEventListener('click', () => {
    const item = button.parentElement;
    const content = button.nextElementSibling;
    const icon = button.querySelector('.faq-icon');
    
    // Close all other open items
    document.querySelectorAll('.faq-content').forEach(otherContent => {
      if (otherContent !== content) {
        otherContent.style.maxHeight = null;
        otherContent.parentElement.querySelector('.faq-icon').style.transform = 'rotate(0deg)';
      }
    });

    // Toggle current item
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
      icon.style.transform = 'rotate(0deg)';
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
      icon.style.transform = 'rotate(45deg)'; // Rotates plus to an 'x' or minus style
    }
  });
});
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

// Mega Menu with Delayed Close
const megaMenuTriggers = document.querySelectorAll('.group.static');

// Add a slight delay before closing mega menus
megaMenuTriggers.forEach(trigger => {
  let hideTimeout;
  let isHovered = false;
  
  const megaMenu = trigger.querySelector('.mega-menu');
  
  // Show menu immediately on hover
  trigger.addEventListener('mouseenter', () => {
    isHovered = true;
    clearTimeout(hideTimeout);
    megaMenu.classList.remove('opacity-0', 'invisible', 'pointer-events-none');
    megaMenu.classList.add('opacity-100', 'visible', 'pointer-events-auto');
  });
  
  // Hide menu after delay when mouse leaves
  trigger.addEventListener('mouseleave', () => {
    isHovered = false;
    hideTimeout = setTimeout(() => {
      if (!isHovered) {
        megaMenu.classList.add('opacity-0', 'invisible', 'pointer-events-none');
        megaMenu.classList.remove('opacity-100', 'visible', 'pointer-events-auto');
      }
    }, 300); // 300ms delay before closing
  });
  
  // Also keep menu open when hovering the mega menu itself
  if (megaMenu) {
    megaMenu.addEventListener('mouseenter', () => {
      isHovered = true;
      clearTimeout(hideTimeout);
    });
    
    megaMenu.addEventListener('mouseleave', () => {
      isHovered = false;
      hideTimeout = setTimeout(() => {
        if (!isHovered) {
          megaMenu.classList.add('opacity-0', 'invisible', 'pointer-events-none');
          megaMenu.classList.remove('opacity-100', 'visible', 'pointer-events-auto');
        }
      }, 300);
    });
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

// logo animator:
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
      if (entry.isIntersecting) {
          const logos = entry.target.querySelectorAll('.logo-item');
          logos.forEach((logo, index) => {
              // Start Entrance
              logo.classList.add('animate-entrance');
              
              // Once entrance is done, start the continuous float loop
              setTimeout(() => {
                  logo.classList.add('animate-float');
                  // Randomize float timing slightly so they don't move in perfect sync
                  logo.style.animationDelay = `${Math.random() * 2}s`;
              }, 1000 + (index * 100));
          });
          observer.unobserve(entry.target);
      }
  });
}, { threshold: 0.3 });

observer.observe(document.querySelector('#logo-section'));

// Swiper 

document.addEventListener("DOMContentLoaded", () => {
  const swiper = new Swiper('.testimonialSwiper', {
    effect: 'fade', // This keeps the layout "in place"
    fadeEffect: {
        crossFade: true
    },
    loop: true,
    speed: 600,
    navigation: {
        nextEl: '.next-btn',
        prevEl: '.prev-btn',
    },
});
});

// 1. THE DATA: Define the content for each tab here
const servicesData = [
  {
      id: 0,
      title: "Paid Social That Drives The Conversion Pipeline",
      description: "Acquiring new customers is expensive. Our email and lifecycle marketing transforms first time visitors into loyal, repeat buyers through automated flows and targeted campaigns.",
      rightHeader: "BOOST CUSTOMER <br> LIFETIME VALUES, DRIVE <br> REPEAT PURCHASE",
      centralTag: "Advertising",
      features: ["Data Focused", "Cost Effective", "Targetable", "Customizable", "Measurable", "Fast Result", "Exposure"]
  },
  {
      id: 1,
      title: "Email & Lifecycle Marketing for Dedicated Conversions",
      description: "Don't let leads go cold. We build automated email flows that nurture customers from their first click to their hundredth purchase, maximizing LTV.",
      rightHeader: "NURTURE LEADS <br> INTO LOYAL FANS & <br> REPEAT BUYERS",
      centralTag: "Email Flows",
      features: ["Automation", "Personalized", "High ROI", "Retention", "Segmentation", "Loyalty", "Engagement"]
  },
  {
      id: 2,
      title: "Conversion Rate Optimization (CRO)",
      description: "Traffic is useless if it doesn't convert. We analyze user behavior and optimize your landing pages to turn more visitors into paying customers.",
      rightHeader: "MAXIMIZE EVERY <br> CLICK WITH DATA-DRIVEN <br> OPTIMIZATION",
      centralTag: "Optimization",
      features: ["A/B Testing", "Heatmaps", "UX Design", "Funnel Fix", "Analytics", "Speed", "Growth"]
  },
  {
      id: 3,
      title: "Conversion-First Content",
      description: "Content that sells. From ad copy to blog posts, we create narratives that resonate with your audience and drive them toward the checkout button.",
      rightHeader: "TELL STORIES <br> THAT SELL AND <br> BUILD TRUST",
      centralTag: "Content",
      features: ["Copywriting", "SEO", "Creative", "Viral", "Authority", "Organic", "Brand"]
  },
  {
      id: 4,
      title: "Responsive First Web Marketing",
      description: "Content that sells. From ad copy to blog posts, we create narratives that resonate with your audience and drive them toward the checkout button.",
      rightHeader: "TELL STORIES <br> THAT SELL AND <br> BUILD TRUST",
      centralTag: "Content",
      features: ["Personalized", "UX Design", "Creative", "SEO", "Authority", "Organic", "Brand"]
  }
];

let activeIndex = 0;

// 2. RENDER FUNCTIONS
function renderLeftList() {
  const listContainer = document.getElementById('services-list');
  listContainer.innerHTML = '';

  servicesData.forEach((service, index) => {
      const isActive = index === activeIndex;
      
      // Logic for styling Active vs Inactive items
      const cardClass = isActive 
          ? "bg-[#F8FBFF] border-blue-100 shadow-sm" 
          : "bg-white border-gray-100 hover:border-blue-200 cursor-pointer";
      
      const titleClass = isActive ? "text-xl text-gray-900 mb-4" : "text-lg text-gray-800";
      
      // Create HTML
      const html = `
          <div onclick="setActive(${index})" class="border rounded-2xl p-6  transition-all duration-300 ${cardClass}">
              <h3 class="${titleClass} font-bold">${service.title}</h3>
              ${isActive ? `
                  <div class="fade-in">
                      <p class="text-gray-500 text-[15px] leading-relaxed mb-6">
                          ${service.description}
                      </p>
                      <button class="inline-flex items-center gap-2 px-6 py-2.5 bg-white border border-blue-100 rounded-full text-blue-600 font-semibold text-sm hover:bg-blue-50 transition-colors">
                          Explore Services
                          <i class="fas fa-arrow-right w-4 h-4"></i>
                      </button>
                  </div>
              ` : ''}
          </div>
      `;
      listContainer.innerHTML += html;
  });
}

function renderRightPanel() {
  const data = servicesData[activeIndex];
  
  // Update Text
  const header = document.getElementById('right-header');
  const tag = document.getElementById('central-tag');
  
  // Simple fade effect
  header.classList.remove('fade-in');
  void header.offsetWidth; // trigger reflow
  header.classList.add('fade-in');
  header.innerHTML = data.rightHeader;

  tag.innerText = data.centralTag;

  // Render Icons (Splitting features array into top grid and bottom row)
  const topFeatures = data.features.slice(0, 4);
  const bottomFeatures = data.features.slice(4, 7);

  const iconMap = ["chart-line", "eye", "bolt", "desktop", "chart-bar", "clock", "globe"]; // Just cycling random icons for demo

  const topGrid = document.getElementById('feature-grid');
  topGrid.innerHTML = topFeatures.map((feat, i) => `
      <div class="flex flex-col items-center gap-1 fade-in" style="animation-delay: ${i * 50}ms">
          <div class="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
              <i class="fas fa-${iconMap[i % iconMap.length]} w-5 h-5 text-center"></i>
          </div>
          <span class="text-[8px] text-gray-400 font-bold uppercase text-center">${feat}</span>
      </div>
  `).join('');

  const bottomGrid = document.getElementById('feature-grid-bottom');
  bottomGrid.innerHTML = bottomFeatures.map((feat, i) => `
      <div class="flex flex-col items-center gap-1 fade-in" style="animation-delay: ${(i+4) * 50}ms">
          <div class="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
               <i class="fas fa-${iconMap[(i+4) % iconMap.length]} w-5 h-5 text-center"></i>
          </div>
          <span class="text-[8px] text-gray-400 font-bold uppercase text-center">${feat}</span>
      </div>
  `).join('');
}

// 3. EVENT HANDLER
function setActive(index) {
  if(activeIndex === index) return; // Prevent re-rendering if clicking same item
  activeIndex = index;
  renderLeftList();
  renderRightPanel();
}

// Initialize
renderLeftList();
renderRightPanel();

// Slider for bars:
var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 0,
  centeredSlides: false,
  loop: true,
  speed: 800,
  navigation: {
    nextEl: ".swiper-button-next-custom",
    prevEl: ".swiper-button-prev-custom",
  },
  breakpoints: {
    // Mobile
    320: {
      slidesPerView: 1,
      spaceBetween: 0,
    },
    // Tablet
    768: {
      slidesPerView: 1,
      spaceBetween: 0,
    },
    // Desktop
    1024: {
      slidesPerView: 1,
      spaceBetween: 0,
    }
  }
});


 // Tab switching functionality
 const tabs = document.querySelectorAll('button.active-tab, button.inactive-tab');
  tabs.forEach(tab => {

  tab.addEventListener('click', function() {
      // Remove active state from all tabs
      tabs.forEach(t => {
          t.classList.remove('active-tab', 'bg-blue-600', 'text-white', 'shadow-md');
          t.classList.add('inactive-tab', 'bg-white', 'text-gray-700', 'border', 'border-gray-300', 'shadow-sm');
      });
      
      // Add active state to clicked tab
      this.classList.remove('inactive-tab', 'bg-white', 'text-gray-700', 'border', 'border-gray-300', 'shadow-sm');
      this.classList.add('active-tab', 'bg-blue-600', 'text-white', 'shadow-md');
      
      // Update content based on selected country
      const country = this.textContent.trim();
      updateLocationInfo(country);
  });
});

function updateLocationInfo(country) {
  const locationData = {
      'USA': {
          country: 'USA',
          address: '20100 S Western Ave Torrance, CA',
          phone: '(213) 817-5192',
          mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3315.8373717171656!2d-118.29254!3d33.8358!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDUwJzA4LjkiTiAxMTjCsDE3JzMzLjEiVw!5e0!3m2!1sen!2sus!4v1234567890',
          pinAddress: '# 20100 S',
          pinCity: 'Western Ave Torrance, CA'
      },
      'Norway': {
          country: 'Norway',
          address: 'Karl Johans gate 22, 0159 Oslo',
          phone: '+47 22 00 00 00',
          mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2000.0!2d10.7461!3d59.9139!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTnCsDU0JzUwLjAiTiAxMMKwNDQnNDYuMCJF!5e0!3m2!1sen!2sno!4v1234567890',
          pinAddress: 'Karl Johans gate 22',
          pinCity: '0159 Oslo, Norway'
      }
  };
  
  const data = locationData[country];
  
  // Update text content
  document.querySelector('.text-lg.font-bold').textContent = data.country;
  document.querySelectorAll('.text-base.font-semibold')[0].textContent = data.address;
  document.querySelector('a[href^="tel"]').textContent = data.phone;
  document.querySelector('a[href^="tel"]').href = `tel:${data.phone.replace(/\D/g, '')}`;
  
  // Update map
  document.querySelector('iframe').src = data.mapSrc;
  
  // Update pin overlay
  document.querySelector('.text-xs.text-gray-500.font-medium').textContent = data.pinAddress;
  document.querySelector('.text-sm.text-gray-900.font-semibold').textContent = data.pinCity;
}
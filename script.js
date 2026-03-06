
// Mobile Menu Toggle
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const menuIcon = document.getElementById("menu-icon");
const closeIcon = document.getElementById("close-icon");

// Ensure initial state is correct on page load
function setInitialIconState() {
    if (mobileMenu.classList.contains("open")) {
        // If menu is open, show close icon
        menuIcon.classList.add("hidden");
        closeIcon.classList.remove("hidden");
    } else {
        // If menu is closed, show hamburger icon
        menuIcon.classList.remove("hidden");
        closeIcon.classList.add("hidden");
    }
}

// Call on page load to set correct initial state
setInitialIconState();

menuBtn.addEventListener("click", () => {
  // Toggle the open class for animation
  mobileMenu.classList.toggle("open");
  
  // Toggle Icons based on open state
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

// FAQS SECTION
document.querySelectorAll('.faq-toggle').forEach(button => {
  button.addEventListener('click', () => {
    const item = button.parentElement;
    const content = button.nextElementSibling;
    const icon = button.querySelector('.faq-icon i');
    
    // Close all other open items
    document.querySelectorAll('.faq-content').forEach(otherContent => {
      if (otherContent !== content) {
        otherContent.style.maxHeight = null;
        const otherIcon = otherContent.parentElement.querySelector('.faq-icon i');
        otherIcon.classList.remove('fa-minus');
        otherIcon.classList.add('fa-plus');
      }
    });

    // Toggle current item
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
      icon.classList.remove('fa-minus');
      icon.classList.add('fa-plus');
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
      icon.classList.remove('fa-plus');
      icon.classList.add('fa-minus');
    }
  });
});

// Services Data for Lifecycle Marketing Section
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

// Render Functions for Services Section
function renderLeftList() {
  const listContainer = document.getElementById('services-list');
  if (!listContainer) return;
  
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
  const header = document.getElementById('right-header');
  const tag = document.getElementById('central-tag');
  const topGrid = document.getElementById('feature-grid');
  const bottomGrid = document.getElementById('feature-grid-bottom');
  
  if (!header || !tag || !topGrid || !bottomGrid) return;
  
  const data = servicesData[activeIndex];
  
  // Simple fade effect
  header.classList.remove('fade-in');
  void header.offsetWidth; // trigger reflow
  header.classList.add('fade-in');
  header.innerHTML = data.rightHeader;

  tag.innerText = data.centralTag;

  // Render Icons (Splitting features array into top grid and bottom row)
  const topFeatures = data.features.slice(0, 4);
  const bottomFeatures = data.features.slice(4, 7);

  const iconMap = ["chart-line", "eye", "bolt", "desktop", "chart-bar", "clock", "globe"];

  topGrid.innerHTML = topFeatures.map((feat, i) => `
      <div class="flex flex-col items-center gap-1 fade-in" style="animation-delay: ${i * 50}ms">
          <div class="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
              <i class="fas fa-${iconMap[i % iconMap.length]} w-5 h-5 text-center"></i>
          </div>
          <span class="text-[8px] text-gray-400 font-bold uppercase text-center">${feat}</span>
      </div>
  `).join('');

  bottomGrid.innerHTML = bottomFeatures.map((feat, i) => `
      <div class="flex flex-col items-center gap-1 fade-in" style="animation-delay: ${(i+4) * 50}ms">
          <div class="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
               <i class="fas fa-${iconMap[(i+4) % iconMap.length]} w-5 h-5 text-center"></i>
          </div>
          <span class="text-[8px] text-gray-400 font-bold uppercase text-center">${feat}</span>
      </div>
  `).join('');
}

// Event Handler for Services
function setActive(index) {
  if(activeIndex === index) return;
  activeIndex = index;
  renderLeftList();
  renderRightPanel();
}

// Initialize Services Section
function initServices() {
  renderLeftList();
  renderRightPanel();
}

// Initialize all functionality when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  
  // Initialize Services Section
  initServices();
  
  // Initialize Paid Social Dots
  initPaidSocialCarousel();
  
  // Initialize Results Filter Buttons
  initResultsFilter();
  
  // Testimonial Swiper
  if (document.querySelector('.testimonialSwiper')) {
    new Swiper('.testimonialSwiper', {
      effect: 'fade',
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
  }

  // Results/Case Studies Swiper
  if (document.querySelector('.mySwiper')) {
    new Swiper(".mySwiper", {
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
        320: { slidesPerView: 1, spaceBetween: 0 },
        768: { slidesPerView: 1, spaceBetween: 0 },
        1024: { slidesPerView: 1, spaceBetween: 0 }
      }
    });
  }

  // Location Tabs (if exists on page)
  const tabs = document.querySelectorAll('button.active-tab, button.inactive-tab');
  if (tabs.length > 0) {
    tabs.forEach(tab => {
      tab.addEventListener('click', function() {
        tabs.forEach(t => {
          t.classList.remove('active-tab', 'bg-blue-600', 'text-white', 'shadow-md');
          t.classList.add('inactive-tab', 'bg-white', 'text-gray-700', 'border', 'border-gray-300', 'shadow-sm');
        });
        
        this.classList.remove('inactive-tab', 'bg-white', 'text-gray-700', 'border', 'border-gray-300', 'shadow-sm');
        this.classList.add('active-tab', 'bg-blue-600', 'text-white', 'shadow-md');
        
        const country = this.textContent.trim();
        updateLocationInfo(country);
      });
    });
  }

  function updateLocationInfo(country) {
    const locationData = {
      'USA': {
        country: 'USA',
        address: '20100 S Western Ave Torrance, CA',
        phone: '(213) 817-5192',
        pinAddress: '# 20100 S',
        pinCity: 'Western Ave Torrance, CA'
      },
      'Norway': {
        country: 'Norway',
        address: 'Karl Johans gate 22, 0159 Oslo',
        phone: '+47 22 00 00 00',
        pinAddress: 'Karl Johans gate 22',
        pinCity: '0159 Oslo, Norway'
      }
    };
    
    const data = locationData[country];
    if (!data) return;
    
    const countryElement = document.querySelector('.text-lg.font-bold');
    const addressElement = document.querySelectorAll('.text-base.font-semibold')[0];
    const phoneLink = document.querySelector('a[href^="tel"]');
    const pinAddressElement = document.querySelector('.text-xs.text-gray-500.font-medium');
    const pinCityElement = document.querySelector('.text-sm.text-gray-900.font-semibold');
    
    if (countryElement) countryElement.textContent = data.country;
    if (addressElement) addressElement.textContent = data.address;
    if (phoneLink) {
      phoneLink.textContent = data.phone;
      phoneLink.href = `tel:${data.phone.replace(/\D/g, '')}`;
    }
    if (pinAddressElement) pinAddressElement.textContent = data.pinAddress;
    if (pinCityElement) pinCityElement.textContent = data.pinCity;
  }

  // Blogs Swiper (if exists on page)
  if (document.querySelector('.blogsSwiper')) {
    new Swiper('.blogsSwiper', {
      slidesPerView: 1,
      spaceBetween: 24,
      loop: true,
      grabCursor: true,
      navigation: {
        nextEl: '.swiper-next-blogs',
        prevEl: '.swiper-prev-blogs',
      },
      breakpoints: {
        640: { slidesPerView: 2, spaceBetween: 24 },
        1024: { slidesPerView: 3, spaceBetween: 28 },
      }
    });
  }

  // TOC Observer for Blogs (if exists)
  const sections = document.querySelectorAll('article [id]');
  const tocLinks = document.querySelectorAll('.toc-link');
  
  if (sections.length > 0 && tocLinks.length > 0) {
    const tocObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          tocLinks.forEach(link => {
            link.classList.remove('active');
            const dot = link.querySelector('span');
            if (dot) {
              dot.classList.remove('bg-blue-600');
              dot.classList.add('bg-gray-300');
            }
          });
          const activeLink = document.querySelector(`.toc-link[href="#${entry.target.id}"]`);
          if (activeLink) {
            activeLink.classList.add('active');
            const dot = activeLink.querySelector('span');
            if (dot) {
              dot.classList.remove('bg-gray-300');
              dot.classList.add('bg-blue-600');
            }
          }
        }
      });
    }, { rootMargin: '-10% 0px -80% 0px', threshold: 0 });

    sections.forEach(section => tocObserver.observe(section));
  }
});

// ========================================
// Results Section - Filter Buttons Functionality
// ========================================
(function () {
  const track = document.getElementById('cs-track');
  const slides = document.querySelectorAll('.cs-slide');
  const dots = document.querySelectorAll('.cs-dot');
  const prevBtn = document.getElementById('cs-prev');
  const nextBtn = document.getElementById('cs-next');
  const total = slides.length;
  let current = 0;

  function goTo(index) {
    current = (index + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;

    dots.forEach((dot, i) => {
      if (i === current) {
        dot.classList.add('bg-[#0b4d9c]', 'w-3', 'h-3');
        dot.classList.remove('bg-gray-300', 'w-3', 'h-3');
      } else {
        dot.classList.remove('bg-[#0b4d9c]', 'w-3', 'h-3');
        dot.classList.add('bg-gray-300', 'w-3', 'h-3');
      }
    });
  }

  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));
  dots.forEach(dot => dot.addEventListener('click', () => goTo(+dot.dataset.index)));

  // Auto-advance every 5s
  setInterval(() => goTo(current + 1), 5000);
})();

// ========================================
// Paid Social Section - Card Data
// ========================================
const paidSocialCards = [
  {
    id: 0,
    title: "Paid Social That Drives The Conversion Pipeline",
    description: "Paid social is one of the fastest ways for startups and e-commerce brands to scale. We create campaigns focused on audience intent, creative testing, and high-converting landing pages — measuring performance against real business outcomes to generate leads, sales, and measurable pipeline growth.",
    image: "/images/paid.webp",
    buttonText: "Explore Services"
  },
  {
    id: 1,
    title: "Email & Lifecycle Marketing For Dedicated Conversion",
    description: "Don't let leads go cold. We build automated email flows that nurture customers from their first click to their hundredth purchase. Our lifecycle campaigns maximize customer lifetime value through personalization and strategic timing.",
    image: "/images/paid1.webp",
    buttonText: "Learn More"
  },
  {
    id: 2,
    title: "Conversion Rate Opetimization (CRO)",
    description: "More traffic alone won't increase revenue. CRO turns existing visitors into leads and sales by optimizing messaging, UX, and the user journey from click to conversion. With targeted improvements, we help you get the most value from every visitor, boosting conversions and maximizing ROI",
    image: "/images/paid2.webp",
    buttonText: "View Services"
  },
  {
    id: 3,
    title: "Conversion First Opetimization",
    description: "We create content that performs, ranking, persuading, and converting. From ad landing pages to SEO clusters and product pages, each piece is designed to see to take action, driving measurable engagement, generating qualified leads, and increasing sales for your business",
    image: "/images/paid3.webp",
    buttonText: "Our Approach"
  },
  {
    id: 4,
    title: "Responsive First Web Marketing",
    description: "We build websites as growth engines: fast, scalable, and conversion-focused. From marketing sites to complex web apps and e-commerce platforms, our development prioritizes speed, usability, SEO readiness, and measurable conversion paths turning visits into revenue without limiting future flexibility.",
    image: "/images/paid4.webp",
    buttonText: "See How It Works"
  }
];

let currentCardIndex = 0;

// ========================================
// Paid Social Section - Render Function
// ========================================
function renderPaidSocialCard(index) {
  const cardContainer = document.querySelector('.paid-social-card-content');
  if (!cardContainer) return;
  
  const card = paidSocialCards[index];
  
  // Add fade-out class for transition
  cardContainer.classList.add('opacity-0');
  
  setTimeout(() => {
    // Update card content
    const titleEl = cardContainer.querySelector('.card-title');
    const descEl = cardContainer.querySelector('.card-description');
    const imageEl = cardContainer.querySelector('.card-image');
    const buttonEl = cardContainer.querySelector('.card-button span');
    
    if (titleEl) titleEl.textContent = card.title;
    if (descEl) descEl.textContent = card.description;
    if (imageEl) imageEl.src = card.image;
    if (buttonEl) buttonEl.textContent = card.buttonText;
    
    // Fade-in
    cardContainer.classList.remove('opacity-0');
    cardContainer.classList.add('transition-opacity', 'duration-300', 'ease-in-out');
  }, 300);
}

function updatePaidSocialDots(index) {
  const dots = document.querySelectorAll('.paid-social-dots .Paiddot');
  dots.forEach((dot, i) => {
    if (i === index) {
      dot.classList.remove('bg-gray-300', 'hover:bg-gray-400');
      dot.classList.add('bg-secondary');
    } else {
      dot.classList.remove('bg-secondary');
      dot.classList.add('bg-gray-300', 'hover:bg-gray-400');
    }
  });
}

function setPaidSocialCard(index) {
  if (index < 0 || index >= paidSocialCards.length) return;
  if (currentCardIndex === index) return;
  
  currentCardIndex = index;
  renderPaidSocialCard(index);
  updatePaidSocialDots(index);
}

// ========================================
// Paid Social Section - Initialize
// ========================================
function initPaidSocialCarousel() {
  const dots = document.querySelectorAll('.paid-social-dots .Paiddot');
  if (dots.length === 0) return;
  
  // Add click handlers to dots
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      setPaidSocialCard(index);
    });
  });
  
  // Initial render
  updatePaidSocialDots(0);
  
  // Auto-play functionality (cycles through cards every 5 seconds)
  let autoPlayInterval;
  
  function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
      const nextIndex = (currentCardIndex + 1) % paidSocialCards.length;
      setPaidSocialCard(nextIndex);
    }, 5000);
  }
  
  function stopAutoPlay() {
    clearInterval(autoPlayInterval);
  }
  
  // Start auto-play
  startAutoPlay();
  
  // Pause on hover
  const paidSocialSection = document.querySelector('.paid-social-container');
  if (paidSocialSection) {
    paidSocialSection.addEventListener('mouseenter', stopAutoPlay);
    paidSocialSection.addEventListener('mouseleave', startAutoPlay);
  }
}

// Slider


document.addEventListener("DOMContentLoaded", function(){

  const wrap = document.getElementById("splitWrap");
  const bar = document.getElementById("dragBar");
  const mask = document.getElementById("leftMask");
  
  const problems = document.getElementById("problemsCol");
  const solutions = document.getElementById("solutionsCol");
  
  if(!wrap || !bar || !mask) return;
  
  let dragging=false;
  
  // Function to update bar position based on mouse/touch position
  function updateBarPosition(clientX) {
    const rect = wrap.getBoundingClientRect();
    let x = clientX - rect.left;
    
    if(x < 0) x = 0;
    if(x > rect.width) x = rect.width;
    
    const percent = x / rect.width * 100;
    
    bar.style.left = percent + "%";
    mask.style.width = percent + "%";
    
    // TEXT LOGIC - opacity depends on bar position
    if(percent < 45){
      problems.style.opacity = "1";
      solutions.style.opacity = "0";
    }
    else if(percent > 55){
      problems.style.opacity = "0";
      solutions.style.opacity = "1";
    }
    else{
      problems.style.opacity = "1";
      solutions.style.opacity = "1";
    }
  }
  
  // START DRAG - from bar
  bar.addEventListener("mousedown", (e) => {
    dragging = true;
    e.preventDefault();
  });
  
  // START DRAG - from text areas (problems and solutions columns)
  if(problems) {
    problems.addEventListener("mousedown", (e) => {
      dragging = true;
      updateBarPosition(e.clientX);
    });
  }
  
  if(solutions) {
    solutions.addEventListener("mousedown", (e) => {
      dragging = true;
      updateBarPosition(e.clientX);
    });
  }
  
  // STOP DRAG
  window.addEventListener("mouseup", () => dragging = false);
  
  
  // MOVE - for mouse drag
  window.addEventListener("mousemove", (e) => {
    if(!dragging) return;
    updateBarPosition(e.clientX);
  });
  
  
  // TOUCH SUPPORT
  
  // START DRAG - from bar
  bar.addEventListener("touchstart", (e) => {
    dragging = true;
    e.preventDefault();
  });
  
  // START DRAG - from text areas (touch)
  if(problems) {
    problems.addEventListener("touchstart", (e) => {
      dragging = true;
      updateBarPosition(e.touches[0].clientX);
    });
  }
  
  if(solutions) {
    solutions.addEventListener("touchstart", (e) => {
      dragging = true;
      updateBarPosition(e.touches[0].clientX);
    });
  }
  
  // STOP DRAG - touch
  window.addEventListener("touchend", () => dragging = false);
  
  // MOVE - for touch drag
  window.addEventListener("touchmove", (e) => {
    if(!dragging) return;
    updateBarPosition(e.touches[0].clientX);
  });
  
  });

  // digital marketing

  const tabs = document.querySelectorAll(".tab-btn");
  const panels = document.querySelectorAll(".tab-panel");
  const images = document.querySelectorAll(".tab-img");
  
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const tabName = tab.getAttribute("data-tab");
  
      // remove active state
      tabs.forEach(t => {
        t.classList.remove("active-tab", "text-blue-600");
        t.classList.add("text-gray-500");
      });
  
      // add active state
      tab.classList.add("active-tab", "text-blue-600");
      tab.classList.remove("text-gray-500");
  
      // hide panels
      panels.forEach(panel => panel.classList.add("hidden"));
  
      // show selected panel
      document
        .querySelector(`[data-panel="${tabName}"]`)
        .classList.remove("hidden");
  
      // hide images
      images.forEach(img => img.classList.add("hidden"));
  
      // show selected image
      document
        .querySelector(`[data-tab-img="${tabName}"]`)
        .classList.remove("hidden");
    });
  });


  // HOME AI:
  const slides = [
    {
    icon: `<svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="56" height="56" rx="28" fill="#E6F7F1"/>
<path d="M23.3203 31.2835V19.2835L32.6453 13.9001C37.812 10.9168 47.062 18.2751 43.1786 25.0085" stroke="#489478" stroke-linejoin="round"/>
<path d="M23.3203 25.4502L33.712 19.4502L43.037 24.8335C48.2036 27.8169 46.4536 39.5085 38.6786 39.5085" stroke="#489478" stroke-linejoin="round"/>
<path d="M28.3667 22.5332L38.7583 28.5332V39.3082C38.7583 45.2749 27.7583 49.6082 23.875 42.8749" stroke="#489478" stroke-linejoin="round"/>
<path d="M33.4181 25.6665V37.4498L24.0931 42.8332C18.9264 45.8165 9.67643 38.4582 13.5598 31.7248" stroke="#489478" stroke-linejoin="round"/>
<path d="M33.4158 31.2834L23.0242 37.2834L13.6992 31.9001C8.52418 28.9084 10.2742 17.2251 18.0492 17.2251" stroke="#489478" stroke-linejoin="round"/>
<path d="M28.3682 34.2003L17.9766 28.2003V17.4253C17.9766 11.4586 28.9766 7.1253 32.8599 13.8586" stroke="#489478" stroke-linejoin="round"/>
</svg>
`,
    title: "ChatGPT Search Optimization",
    description:
    "Our chat GPT SEO strategies leverage digital PR to build external brand mentions and create high-quality content."
    },
    
    {
    icon: `<svg class="w-6 h-6 text-[#4285F4]" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2a10 10 0 100 20A10 10 0 0012 2z"/>
    </svg>`,
    title: "Gemini AI Optimization",
    description:
    "Our Gemini-focused strategies help your brand appear prominently in Google's AI-powered search results."
    },
    
    {
    icon: `<svg class="w-6 h-6 text-[#7c3aed]" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
    </svg>`,
    title: "Perplexity AI Visibility",
    description:
    "Position your brand as an authoritative source within Perplexity's citation ecosystem."
    },
    
    {
    icon: `<svg class="w-6 h-6 text-[#f59e0b]" viewBox="0 0 24 24" fill="currentColor">
    <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
    </svg>`,
    title: "LLM Brand Positioning",
    description:
    "We ensure your brand narrative is consistently represented across all major large language models."
    }
    ];
    
    let currentSlideIndex = 0;
    
    const icon = document.getElementById("slideIcon");
    const title = document.getElementById("slideTitle");
    const description = document.getElementById("slideDescription");
    const dots = document.querySelectorAll(".dot");
    
    function renderSlide(index) {
    icon.innerHTML = slides[index].icon;
    title.textContent = slides[index].title;
    description.textContent = slides[index].description;
    
    dots.forEach((dot, i) => {
    dot.classList.remove("w-5","h-2.5","bg-[#0f172a]");
    dot.classList.add("w-2.5","h-2.5","bg-gray-300");
    
    if(i === index){
    dot.classList.remove("bg-gray-300","w-2.5","h-2.5");
    dot.classList.add("w-5","h-2.5","bg-[#0f172a]");
    }
    });
    }
    
    dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentSlideIndex = index;
    renderSlide(currentSlideIndex);
    });
    });
    
    setInterval(() => {
      currentSlideIndex = (currentSlideIndex + 1) % slides.length;
    renderSlide(currentSlideIndex);
    }, 4000);
    
    renderSlide(currentSlideIndex);
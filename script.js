// Mobile Menu Toggle
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

// Make setActive available globally for onclick handlers
window.setActive = setActive;

// ========================================
// Paid Social Section - Card Data
// ========================================
const paidSocialCards = [
  {
    id: 0,
    title: "Paid Social That Drives The Conversion Pipeline",
    description: "Paid social is one of the fastest ways for startups and e-commerce brands to scale. We create campaigns focused on audience intent, creative testing, and high-converting landing pages — measuring performance against real business outcomes to generate leads, sales, and measurable pipeline growth.",
    image: "/images/paid.png",
    buttonText: "Explore Services"
  },
  {
    id: 1,
    title: "Email & Lifecycle Marketing For Dedicated Conversion",
    description: "Don't let leads go cold. We build automated email flows that nurture customers from their first click to their hundredth purchase. Our lifecycle campaigns maximize customer lifetime value through personalization and strategic timing.",
    image: "/images/paid1.png",
    buttonText: "Learn More"
  },
  {
    id: 2,
    title: "Conversion Rate Opetimization (CRO)",
    description: "More traffic alone won't increase revenue. CRO turns existing visitors into leads and sales by optimizing messaging, UX, and the user journey from click to conversion. With targeted improvements, we help you get the most value from every visitor, boosting conversions and maximizing ROI",
    image: "/images/paid2.png",
    buttonText: "View Services"
  },
  {
    id: 3,
    title: "Conversion First Opetimization",
    description: "We create content that performs, ranking, persuading, and converting. From ad landing pages to SEO clusters and product pages, each piece is designed to see to take action, driving measurable engagement, generating qualified leads, and increasing sales for your business",
    image: "/images/paid3.png",
    buttonText: "Our Approach"
  },
  {
    id: 4,
    title: "Responsive First Web Marketing",
    description: "We build websites as growth engines: fast, scalable, and conversion-focused. From marketing sites to complex web apps and e-commerce platforms, our development prioritizes speed, usability, SEO readiness, and measurable conversion paths turning visits into revenue without limiting future flexibility.",
    image: "/images/paid4.png",
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
  const dots = document.querySelectorAll('.paid-social-dots .dot');
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
  const dots = document.querySelectorAll('.paid-social-dots .dot');
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
  
  
  // START DRAG
  bar.addEventListener("mousedown",()=>dragging=true);
  window.addEventListener("mouseup",()=>dragging=false);
  
  
  // MOVE
  window.addEventListener("mousemove",(e)=>{
  
   if(!dragging) return;
  
   const rect = wrap.getBoundingClientRect();
   let x = e.clientX - rect.left;
  
   if(x<0) x=0;
   if(x>rect.width) x=rect.width;
  
   const percent = x/rect.width*100;
  
   bar.style.left = percent+"%";
   mask.style.width = percent+"%";
  
   // ⭐ TEXT LOGIC HERE
   if(percent < 45){
     problems.style.opacity="1";
     solutions.style.opacity="0.25";
   }
   else if(percent > 55){
     problems.style.opacity="0.25";
     solutions.style.opacity="1";
   }
   else{
     problems.style.opacity="1";
     solutions.style.opacity="1";
   }
  
  });
  
  
  // TOUCH SUPPORT
  
  bar.addEventListener("touchstart",()=>dragging=true);
  window.addEventListener("touchend",()=>dragging=false);
  
  window.addEventListener("touchmove",(e)=>{
  
   if(!dragging) return;
  
   const rect = wrap.getBoundingClientRect();
   let x = e.touches[0].clientX - rect.left;
  
   if(x<0) x=0;
   if(x>rect.width) x=rect.width;
  
   const percent = x/rect.width*100;
  
   bar.style.left = percent+"%";
   mask.style.width = percent+"%";
  
   if(percent < 45){
     problems.style.opacity="1";
     solutions.style.opacity="0.25";
   }
   else if(percent > 55){
     problems.style.opacity="0.25";
     solutions.style.opacity="1";
   }
   else{
     problems.style.opacity="1";
     solutions.style.opacity="1";
   }
  
  });
  
  });
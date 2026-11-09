// SimplyBuySell Main Application Logic

document.addEventListener("DOMContentLoaded", () => {
  initHeroSlider();
  initTestimonialSlider();
  initInteractiveStars();
  initCharCounters();
  initFormHandlers();
  initFavorites();
  initScrollAnimations();
});

// 1. Hero 4-Image Changing Carousel (Grand Level)
let heroSlideIndex = 0;
let heroTimer = null;

function initHeroSlider() {
  const slides = document.querySelectorAll(".hero-slide-img");
  const dots = document.querySelectorAll(".hero-card .carousel-dots .dot");
  if (!slides.length) return;

  function showHeroSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
    heroSlideIndex = index;
  }

  dots.forEach((dot, idx) => {
    dot.addEventListener("click", () => {
      clearInterval(heroTimer);
      showHeroSlide(idx);
      startHeroAutoPlay();
    });
  });

  function startHeroAutoPlay() {
    heroTimer = setInterval(() => {
      heroSlideIndex = (heroSlideIndex + 1) % slides.length;
      showHeroSlide(heroSlideIndex);
    }, 4000);
  }

  showHeroSlide(0);
  startHeroAutoPlay();
}

// 2. Testimonial Slider
let currentSlideIndex = 0;
function initTestimonialSlider() {
  const slides = document.querySelectorAll(".testimonial-slide");
  const prevBtn = document.getElementById("prevTestimonial");
  const nextBtn = document.getElementById("nextTestimonial");

  if (!slides.length) return;

  function showSlide(index) {
    slides.forEach((s, i) => {
      s.classList.toggle("active", i === index);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
      showSlide(currentSlideIndex);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      currentSlideIndex = (currentSlideIndex + 1) % slides.length;
      showSlide(currentSlideIndex);
    });
  }

  setInterval(() => {
    currentSlideIndex = (currentSlideIndex + 1) % slides.length;
    showSlide(currentSlideIndex);
  }, 4500);
}

// 3. Scroll Reveal Animations
function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll(".reveal-on-scroll").forEach((el) => {
    observer.observe(el);
  });
}

// 4. Interactive Star Rating Selector
function initInteractiveStars() {
  const starContainers = document.querySelectorAll(".interactive-stars-picker");
  starContainers.forEach((container) => {
    const stars = container.querySelectorAll("i");
    const hiddenInput = container.parentElement.querySelector("input[name='rating']");

    stars.forEach((star) => {
      star.addEventListener("mouseenter", () => {
        const val = parseInt(star.dataset.val, 10);
        stars.forEach((s, idx) => {
          s.classList.toggle("hovered", idx < val);
        });
      });

      star.addEventListener("mouseleave", () => {
        stars.forEach((s) => s.classList.remove("hovered"));
      });

      star.addEventListener("click", () => {
        const val = parseInt(star.dataset.val, 10);
        if (hiddenInput) hiddenInput.value = val;
        stars.forEach((s, idx) => {
          s.classList.toggle("selected", idx < val);
        });
        showToast(`Rated ${val} out of 5 stars ⭐`, "info");
      });
    });
  });
}

// 5. Character Counters for Textareas
function initCharCounters() {
  const textareas = document.querySelectorAll("textarea[maxlength]");
  textareas.forEach((ta) => {
    const max = ta.getAttribute("maxlength") || 500;
    const counter = ta.parentElement.querySelector(".char-counter-text");
    if (!counter) return;

    ta.addEventListener("input", () => {
      const current = ta.value.length;
      counter.textContent = `${current}/${max}`;
      if (current >= max) {
        counter.style.color = "#ef4444";
      } else {
        counter.style.color = "#94a3b8";
      }
    });
  });
}

// 6. Favorites Handler
function initFavorites() {
  document.addEventListener("click", (e) => {
    const favBtn = e.target.closest(".prop-fav-btn");
    if (!favBtn) return;
    e.preventDefault();
    favBtn.classList.toggle("active");
    const isFav = favBtn.classList.contains("active");
    favBtn.innerHTML = isFav ? '<i class="fa-solid fa-heart"></i>' : '<i class="fa-regular fa-heart"></i>';
    showToast(isFav ? "Saved to your favorites ❤️" : "Removed from favorites", "info");
  });
}

// 7. Modals Framework
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove("open");
    document.body.style.overflow = "";
  }
}

// Quick Call Modal
function openCallModal() {
  openModal("callModal");
}

function closeCallModal() {
  closeModal("callModal");
}

// Language Modal & Instant Translation
function openLanguageModal() {
  openModal("languageModal");
}

function closeLanguageModal() {
  closeModal("languageModal");
}

function selectLanguage(langCode, langDisplayName) {
  if (typeof setAppLanguage === "function") {
    setAppLanguage(langCode);
  }
  const labelEl = document.getElementById("selectedLangText");
  if (labelEl) labelEl.textContent = langDisplayName;
  closeLanguageModal();
  showToast(`Language switched to ${langDisplayName}`, "success");
}

// Write Review Modal
function openWriteReviewModal() {
  openModal("writeReviewModal");
}

function closeWriteReviewModal() {
  closeModal("writeReviewModal");
}

// Instant Quick Response Toggle between Buy & Sell in Home Form
function toggleHomeFormAction(mode) {
  const buyBtn = document.getElementById("homeToggleBuyBtn");
  const sellBtn = document.getElementById("homeToggleSellBtn");
  const submitBtn = document.getElementById("homeSubmitBtn");
  const propTypeSelect = document.getElementById("homePropType");

  if (mode === "buy") {
    buyBtn?.classList.add("active");
    sellBtn?.classList.remove("active");
    if (submitBtn) submitBtn.innerHTML = '<i class="fa-solid fa-magnifying-glass"></i> Search Properties';
    if (propTypeSelect) {
      propTypeSelect.innerHTML = `
        <option value="" disabled selected>Select Property Type</option>
        <option value="Plots">Residential Plots</option>
        <option value="Flats">Apartments / Flats</option>
        <option value="Houses">Independent Houses</option>
        <option value="Villas">Luxury Villas</option>
        <option value="Commercial">Commercial Spaces</option>
        <option value="Farm Lands">Farm Lands</option>
      `;
    }
  } else {
    sellBtn?.classList.add("active");
    buyBtn?.classList.remove("active");
    if (submitBtn) submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Submit Listing Inquiry';
    if (propTypeSelect) {
      propTypeSelect.innerHTML = `
        <option value="" disabled selected>Select Property to Sell</option>
        <option value="Amaravathi LPS">Amaravathi LPS Plots</option>
        <option value="2nd Pooling">2nd Pooling Lands</option>
        <option value="Plots">Residential Plots</option>
        <option value="Flats">Apartments / Flats</option>
        <option value="Houses">Independent Houses</option>
        <option value="Commercial">Commercial Buildings</option>
      `;
    }
  }
}

// Property Details Modal
function openPropertyDetails(propId) {
  if (typeof SB_DATA === "undefined" || !SB_DATA.properties) return;
  const prop = SB_DATA.properties.find((p) => p.id === propId);
  if (!prop) return;

  const modalBody = document.getElementById("propDetailsModalBody");
  if (!modalBody) return;

  modalBody.innerHTML = `
    <div style="position: relative; border-radius: 16px; overflow: hidden; height: 210px; box-shadow: 0 4px 15px rgba(0,0,0,0.15);">
      <img src="${prop.image}" alt="${prop.title}" style="width: 100%; height: 100%; object-fit: cover;">
      <span class="prop-tag ${prop.tagColor}" style="position: absolute; top: 12px; left: 12px; font-size: 11px;">
        <i class="fa-solid fa-tag"></i> ${prop.tag}
      </span>
      <span style="position: absolute; top: 12px; right: 12px; background: rgba(0,0,0,0.65); color: white; padding: 4px 10px; border-radius: 12px; font-size: 11px; font-weight: 700;">
        <i class="fa-solid fa-star" style="color: #f59e0b;"></i> ${prop.rating} (${prop.reviewsCount})
      </span>
    </div>

    <div>
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
        <div>
          <h2 style="font-size: 20px; font-weight: 800; color: #033a88;">${prop.title}</h2>
          <p style="font-size: 13px; color: #64748b; display: flex; align-items: center; gap: 5px;">
            <i class="fa-solid fa-location-dot" style="color: #0754bd;"></i> ${prop.address}
          </p>
        </div>
        <div style="text-align: right;">
          <span style="font-size: 20px; font-weight: 800; color: #0754bd;">${prop.price}</span>
        </div>
      </div>
      <p style="font-size: 12px; font-weight: 700; color: #ea580c; background: #fff7ed; padding: 4px 10px; border-radius: 8px; display: inline-block;">
        <i class="fa-solid fa-ruler-combined"></i> ${prop.specs}
      </p>
    </div>

    <div>
      <h4 style="font-size: 14px; font-weight: 800; color: #0f172a; margin-bottom: 6px;">Overview</h4>
      <p style="font-size: 13px; color: #475569; line-height: 1.5;">${prop.description}</p>
    </div>

    <div>
      <h4 style="font-size: 14px; font-weight: 800; color: #0f172a; margin-bottom: 8px;">Key Amenities & Features</h4>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
        ${prop.amenities
          .map(
            (am) => `
          <div style="display: flex; align-items: center; gap: 8px; font-size: 12px; color: #1e293b; background: #f0f7ff; padding: 8px 10px; border-radius: 8px; border: 1px solid #dbeafe;">
            <i class="fa-solid fa-circle-check" style="color: #16a34a;"></i>
            <span>${am}</span>
          </div>
        `
          )
          .join("")}
      </div>
    </div>

    <div style="background: #f8fbff; border: 1.5px solid #d4e5f9; border-radius: 14px; padding: 14px;">
      <h4 style="font-size: 14px; font-weight: 800; color: #033a88; margin-bottom: 8px;">
        <i class="fa-solid fa-calendar-check" style="color: #ff6801;"></i> Schedule a Free Site Visit
      </h4>
      <form onsubmit="handleSiteVisitSubmit(event, '${prop.title}')" style="display: flex; flex-direction: column; gap: 8px;">
        <input type="text" placeholder="Your Name" required class="custom-input" style="padding-left: 14px;">
        <input type="tel" placeholder="Mobile Number" required class="custom-input" style="padding-left: 14px;">
        <input type="date" required class="custom-input" style="padding-left: 14px;">
        <button type="submit" class="btn-orange" style="width: 100%; padding: 10px; justify-content: center;">
          <i class="fa-solid fa-paper-plane"></i> Book Appointment Now
        </button>
      </form>
    </div>
  `;

  openModal("propDetailsModal");
}

function handleSiteVisitSubmit(e, propTitle) {
  e.preventDefault();
  closeModal("propDetailsModal");
  const randomRef = "VISIT-" + Math.floor(100000 + Math.random() * 900000);
  showSuccessModal(
    "Site Visit Scheduled!",
    `Thank you! Your site visit request for <strong>${propTitle}</strong> has been registered. Our property executive will call you within 2 business hours to confirm transportation and timings.`,
    randomRef
  );
}

// 8. Success Feedback Modal
function showSuccessModal(title, msg, refId) {
  const modal = document.getElementById("successModal");
  if (!modal) return;

  document.getElementById("successModalTitle").textContent = title;
  document.getElementById("successModalBody").innerHTML = msg;
  document.getElementById("successModalRef").textContent = refId || "SBS-" + Date.now().toString().slice(-6);

  openModal("successModal");
}

// 9. Toast Notification
function showToast(message, type = "info") {
  let toast = document.getElementById("appToast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "appToast";
    toast.className = "toast-notice";
    document.body.appendChild(toast);
  }

  toast.className = `toast-notice ${type} show`;
  const icon = type === "success" ? "fa-circle-check" : "fa-circle-info";
  toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3500);
}

// 10. Form Handlers
function initFormHandlers() {
  // Contact Us Form
  const contactForm = document.getElementById("contactUsForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const ref = "INQ-" + Math.floor(100000 + Math.random() * 900000);
      showSuccessModal(
        "Message Sent Successfully!",
        "Thank you for contacting SimplyBuySell. Our support manager will get back to you within 24 hours.",
        ref
      );
      contactForm.reset();
    });
  }

  // Write Review Form
  const reviewForm = document.getElementById("writeReviewForm");
  if (reviewForm) {
    reviewForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const ref = "REV-" + Math.floor(100000 + Math.random() * 900000);
      showSuccessModal(
        "Review Submitted!",
        "Thank you for sharing your experience! Your review will be verified and published after approval.",
        ref
      );
      reviewForm.reset();
      if (document.getElementById("writeReviewModal")) {
        closeModal("writeReviewModal");
      }
    });
  }

  // Buy Request Form
  const buyForm = document.getElementById("buyPropertyForm");
  if (buyForm) {
    buyForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const ref = "BUY-" + Math.floor(100000 + Math.random() * 900000);
      showSuccessModal(
        "Buy Request Submitted!",
        "After submission, our team will verify the details and connect you with genuine property owners for a smooth and transparent transaction.",
        ref
      );
      buyForm.reset();
    });
  }

  // Sell Request Form
  const sellForm = document.getElementById("sellPropertyForm");
  if (sellForm) {
    sellForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const ref = "SELL-" + Math.floor(100000 + Math.random() * 900000);
      showSuccessModal(
        "Sell Request Submitted!",
        "After submission, our team will verify the details and connect you with genuine buyers for a smooth and transparent transaction.",
        ref
      );
      sellForm.reset();
    });
  }

  // Home Quick Search Form
  const homeSearchForm = document.getElementById("homeSearchForm");
  if (homeSearchForm) {
    homeSearchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const propType = document.getElementById("homePropType")?.value || "";
      const location = document.getElementById("homeLocation")?.value || "";
      const budget = document.getElementById("homeBudget")?.value || "";

      showToast("Searching matching properties...", "info");
      setTimeout(() => {
        window.location.href = `properties.html?type=${encodeURIComponent(propType)}&location=${encodeURIComponent(location)}&budget=${encodeURIComponent(budget)}`;
      }, 350);
    });
  }
}

// 11. Property Filter Functionality (on properties.html)
function filterProperties() {
  if (typeof SB_DATA === "undefined" || !SB_DATA.properties) return;

  const searchVal = document.getElementById("searchPropInput")?.value.toLowerCase().trim() || "";
  const locationVal = document.getElementById("filterLocation")?.value || "";
  const typeVal = document.getElementById("filterType")?.value || "";
  const budgetVal = document.getElementById("filterBudget")?.value || "";

  const filtered = SB_DATA.properties.filter((prop) => {
    const matchSearch =
      !searchVal ||
      prop.title.toLowerCase().includes(searchVal) ||
      prop.location.toLowerCase().includes(searchVal) ||
      prop.description.toLowerCase().includes(searchVal);

    const matchLocation = !locationVal || prop.location === locationVal;
    const matchType = !typeVal || prop.type === typeVal;

    let matchBudget = true;
    if (budgetVal === "under-50l") {
      matchBudget = prop.priceRaw < 5000000;
    } else if (budgetVal === "50l-1cr") {
      matchBudget = prop.priceRaw >= 5000000 && prop.priceRaw <= 10000000;
    } else if (budgetVal === "above-1cr") {
      matchBudget = prop.priceRaw > 10000000;
    }

    return matchSearch && matchLocation && matchType && matchBudget;
  });

  renderPropertyCards(filtered);
}

function renderPropertyCards(propsList) {
  const container = document.getElementById("propertiesGridContainer");
  if (!container) return;

  if (propsList.length === 0) {
    container.innerHTML = `
      <div style="grid-column: span 2; text-align: center; padding: 40px 10px; background: white; border-radius: 18px; border: 1px solid #d4e5f9;">
        <i class="fa-solid fa-magnifying-glass" style="font-size: 36px; color: #94a3b8; margin-bottom: 12px;"></i>
        <h4 style="font-size: 16px; font-weight: 800; color: #033a88;">No Properties Found</h4>
        <p style="font-size: 13px; color: #64748b; margin-top: 4px;">Try adjusting your filters or search keywords.</p>
        <button onclick="resetFilters()" class="btn-orange" style="margin-top: 14px; padding: 8px 18px; font-size: 12px;">Reset Filters</button>
      </div>
    `;
    return;
  }

  container.innerHTML = propsList
    .map(
      (prop) => `
    <div class="property-card-item">
      <div class="prop-img-box">
        <img src="${prop.image}" alt="${prop.title}">
        <span class="prop-tag ${prop.tagColor}">
          <i class="fa-solid fa-tag"></i> ${prop.tag}
        </span>
        <button class="prop-fav-btn" title="Add to favorites">
          <i class="fa-regular fa-heart"></i>
        </button>
      </div>
      <div class="prop-details-box">
        <div>
          <h4 class="prop-title">${prop.title}</h4>
          <span class="prop-location">
            <i class="fa-solid fa-location-dot" style="color: #0754bd;"></i> ${prop.location}
          </span>
          <div class="prop-price">${prop.price}</div>
          <div class="prop-specs">
            <i class="fa-solid fa-house-chimney"></i> ${prop.specs}
          </div>
        </div>
        <div>
          <div class="prop-rating-row">
            <i class="fa-solid fa-star"></i>
            <span>${prop.rating} (${prop.reviewsCount} Reviews)</span>
          </div>
          <button onclick="openPropertyDetails('${prop.id}')" class="btn-view-details" style="width: 100%;">
            View Details <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
  `
    )
    .join("");
}

function resetFilters() {
  const searchInput = document.getElementById("searchPropInput");
  const locSelect = document.getElementById("filterLocation");
  const typeSelect = document.getElementById("filterType");
  const budgetSelect = document.getElementById("filterBudget");

  if (searchInput) searchInput.value = "";
  if (locSelect) locSelect.value = "";
  if (typeSelect) typeSelect.value = "";
  if (budgetSelect) budgetSelect.value = "";

  filterProperties();
}

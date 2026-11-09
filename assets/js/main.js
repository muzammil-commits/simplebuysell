// SimplyBuySell Main Application Logic

document.addEventListener("DOMContentLoaded", () => {
  initTopControlBar();
  initViewportSwitcher();
  initDynamicIslandClock();
  initTestimonialSlider();
  initInteractiveStars();
  initCharCounters();
  initFormHandlers();
  initFavorites();
});

// 1. Top Control Bar Enhancements (Quick Page Navigator + Open in New Tab Toggle)
function initTopControlBar() {
  const controlBar = document.querySelector(".viewport-control-bar");
  if (!controlBar) return;

  if (!document.getElementById("pagesQuickNav")) {
    const pagesNav = document.createElement("div");
    pagesNav.id = "pagesQuickNav";
    pagesNav.style.display = "flex";
    pagesNav.style.alignItems = "center";
    pagesNav.style.gap = "8px";
    pagesNav.style.flexWrap = "wrap";

    const isNewTab = localStorage.getItem("sbs_new_tab") === "true";

    pagesNav.innerHTML = `
      <div style="display: flex; align-items: center; gap: 6px;">
        <span style="font-size: 11px; opacity: 0.85;">Jump to Page:</span>
        <select id="quickPageSelect" onchange="navigateQuickPage(this.value)" style="background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.3); color: white; padding: 3px 8px; border-radius: 6px; font-size: 11.5px; outline: none; cursor: pointer;">
          <option value="" style="color: black;" disabled selected>Select page...</option>
          <option value="index.html" style="color: black;">🏠 Home</option>
          <option value="properties.html" style="color: black;">🏡 Open Properties</option>
          <option value="buy.html" style="color: black;">🛒 Buy Property</option>
          <option value="sell.html" style="color: black;">🏷️ Sell Property</option>
          <option value="contact.html" style="color: black;">📞 Contact Us</option>
          <option value="write-review.html" style="color: black;">⭐ Write a Review</option>
          <option value="reviews.html" style="color: black;">💬 Customer Reviews</option>
          <option value="motto.html" style="color: black;">🎯 Our Motto</option>
          <option value="about.html" style="color: black;">ℹ️ About Us</option>
        </select>
      </div>

      <label style="display: inline-flex; align-items: center; gap: 4px; font-size: 11px; cursor: pointer; background: rgba(255,255,255,0.1); padding: 3px 8px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.2);">
        <input type="checkbox" id="openNewTabCheck" ${isNewTab ? "checked" : ""} onchange="toggleOpenNewTab(this.checked)">
        <span>Open in new tab</span>
      </label>
    `;

    controlBar.insertBefore(pagesNav, controlBar.querySelector(".viewport-btns"));
  }

  applyNewTabState();
}

function navigateQuickPage(url) {
  if (!url) return;
  const isNewTab = localStorage.getItem("sbs_new_tab") === "true";
  if (isNewTab) {
    window.open(url, "_blank");
  } else {
    window.location.href = url;
  }
}

function toggleOpenNewTab(checked) {
  localStorage.setItem("sbs_new_tab", checked ? "true" : "false");
  applyNewTabState();
  showToast(checked ? "Links will now open in new tab" : "Links will open in same window", "info");
}

function applyNewTabState() {
  const isNewTab = localStorage.getItem("sbs_new_tab") === "true";
  const links = document.querySelectorAll("a[href$='.html']");
  links.forEach((a) => {
    if (isNewTab) {
      a.setAttribute("target", "_blank");
    } else {
      a.removeAttribute("target");
    }
  });
}

// 2. Viewport Switcher (Mobile App Frame vs Responsive Desktop)
function initViewportSwitcher() {
  const wrapper = document.querySelector(".app-viewport-wrapper");
  const mobileBtn = document.getElementById("viewMobileBtn");
  const desktopBtn = document.getElementById("viewDesktopBtn");

  if (!wrapper || !mobileBtn || !desktopBtn) return;

  const savedMode = localStorage.getItem("sbs_viewport_mode") || "desktop";
  setViewportMode(savedMode);

  mobileBtn.addEventListener("click", () => setViewportMode("mobile"));
  desktopBtn.addEventListener("click", () => setViewportMode("desktop"));

  function setViewportMode(mode) {
    if (mode === "mobile") {
      wrapper.classList.remove("mode-desktop");
      wrapper.classList.add("mode-mobile");
      mobileBtn.classList.add("active");
      desktopBtn.classList.remove("active");
      localStorage.setItem("sbs_viewport_mode", "mobile");
    } else {
      wrapper.classList.remove("mode-mobile");
      wrapper.classList.add("mode-desktop");
      desktopBtn.classList.add("active");
      mobileBtn.classList.remove("active");
      localStorage.setItem("sbs_viewport_mode", "desktop");
    }
  }
}

// 3. Dynamic Island Status Bar Clock
function initDynamicIslandClock() {
  const clockEl = document.getElementById("statusClock");
  if (!clockEl) return;

  function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    clockEl.textContent = `${hours}:${minutes}`;
  }
  updateClock();
  setInterval(updateClock, 30000);
}

// 4. Testimonial Slider
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
  }, 5000);
}

// 5. Interactive Star Rating Selector
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

// 6. Character Counters for Textareas
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

// 7. Favorites Handler
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

// 8. Modals
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

// Language Modal
function openLanguageModal() {
  openModal("languageModal");
}

function closeLanguageModal() {
  closeModal("languageModal");
}

function selectLanguage(lang) {
  const langText = document.getElementById("selectedLangText");
  if (langText) langText.textContent = lang;
  closeLanguageModal();
  showToast(`Language switched to ${lang}`, "success");
}

// Write Review Modal
function openWriteReviewModal() {
  openModal("writeReviewModal");
}

function closeWriteReviewModal() {
  closeModal("writeReviewModal");
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
        <input type="text" placeholder="Your Name" required class="custom-input" style="padding-left: 12px;">
        <input type="tel" placeholder="Mobile Number" required class="custom-input" style="padding-left: 12px;">
        <input type="date" required class="custom-input" style="padding-left: 12px;">
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

// 9. Success Feedback Modal
function showSuccessModal(title, msg, refId) {
  const modal = document.getElementById("successModal");
  if (!modal) return;

  document.getElementById("successModalTitle").textContent = title;
  document.getElementById("successModalBody").innerHTML = msg;
  document.getElementById("successModalRef").textContent = refId || "SBS-" + Date.now().toString().slice(-6);

  openModal("successModal");
}

// 10. Toast Notification
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

// 11. Form Handlers
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
        const isNewTab = localStorage.getItem("sbs_new_tab") === "true";
        const targetUrl = `properties.html?type=${encodeURIComponent(propType)}&location=${encodeURIComponent(location)}&budget=${encodeURIComponent(budget)}`;
        if (isNewTab) {
          window.open(targetUrl, "_blank");
        } else {
          window.location.href = targetUrl;
        }
      }, 500);
    });
  }
}

// 12. Property Filter Functionality (on properties.html)
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

  applyNewTabState();
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

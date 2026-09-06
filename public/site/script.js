/* =========================================================
   SEO Services Planet — landing page logic
   1. Audit form validation + success message
   2. FAQ accordion
   3. Scroll progress bar
   4. Mobile hamburger navigation
   5. Animated stat counters + reveal on scroll
   6. Active nav link highlighting
   7. Instant SEO score checker
   8. Testimonial slider
   9. Back-to-top button
   ========================================================= */

/* =========================================================
   1. Audit form: validate then confirm
   ========================================================= */
const form = document.getElementById("auditForm");
const message = document.getElementById("formMessage");

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
const URL_PATTERN = /^(https?:\/\/)?([\w-]+\.)+[a-zA-Z]{2,}(\/\S*)?$/;

/**
 * Show a styled message below the form.
 * @param {string} text - message to display
 * @param {"success"|"error"} type - styling variant
 */
function showMessage(text, type) {
  message.textContent = text;
  message.className = "form-message visible " + type;
}

form.addEventListener("submit", function (event) {
  event.preventDefault(); // stop the page reload

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const website = form.website.value.trim();

  if (!name || !email || !website) {
    showMessage("Please fill in your name, email and website URL.", "error");
    return;
  }
  if (!EMAIL_PATTERN.test(email)) {
    showMessage("Please enter a valid business email address.", "error");
    return;
  }
  if (!URL_PATTERN.test(website)) {
    showMessage("Please enter a valid website URL (e.g. https://company.com).", "error");
    return;
  }

  showMessage("Success! Our SEO team will contact you shortly.", "success");
  form.reset();
});

/* =========================================================
   2. FAQ accordion — one panel open at a time
   ========================================================= */
const faqTriggers = document.querySelectorAll("#faqAccordion .acc-trigger");

faqTriggers.forEach(function (trigger) {
  trigger.addEventListener("click", function () {
    const item = trigger.parentElement;
    const panel = item.querySelector(".acc-panel");
    const isOpen = item.classList.contains("open");

    // Close everything first
    faqTriggers.forEach(function (other) {
      other.parentElement.classList.remove("open");
      other.setAttribute("aria-expanded", "false");
      other.parentElement.querySelector(".acc-panel").style.maxHeight = null;
    });

    // Re-open the clicked one unless it was already open
    if (!isOpen) {
      item.classList.add("open");
      trigger.setAttribute("aria-expanded", "true");
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
});

/* =========================================================
   3. Scroll progress bar — width reflects page position
   ========================================================= */
const progressBar = document.getElementById("scrollProgress");

function updateProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const percent = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  progressBar.style.width = percent + "%";
}

/* =========================================================
   4. Mobile navigation toggle
   ========================================================= */
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle.addEventListener("click", function () {
  const open = navLinks.classList.toggle("open");
  navToggle.classList.toggle("open", open);
  navToggle.setAttribute("aria-expanded", open ? "true" : "false");
});

// Close the menu after tapping a link (mobile)
navLinks.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", function () {
    navLinks.classList.remove("open");
    navToggle.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

/* =========================================================
   5. Animated counters + reveal-on-scroll (IntersectionObserver)
   ========================================================= */

// Tag the blocks we want to fade in
document
  .querySelectorAll(".card, .step, .price-card, .acc-item, .checker-card, .slider, .form-card")
  .forEach(function (el) {
    el.classList.add("reveal");
  });

const revealObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".reveal").forEach(function (el) {
  revealObserver.observe(el);
});

/**
 * Count from 0 up to the element's data-count value.
 * @param {HTMLElement} el
 */
function animateCounter(el) {
  const target = Number(el.dataset.count);
  const suffix = el.dataset.suffix || "";
  const duration = 1400;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    el.textContent = Math.floor(target * progress) + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

const counterObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll("[data-count]").forEach(function (el) {
  counterObserver.observe(el);
});

/* =========================================================
   6. Highlight the nav link of the section in view
   ========================================================= */
const sections = document.querySelectorAll("main section[id]");
// Exclude the "Get Free Audit" CTA button: it shares an href with the Contact
// section, and .active's color would otherwise override the button's own
// text color, washing it out against its matching accent background.
const menuLinks = navLinks.querySelectorAll('a[href^="#"]:not(.btn)');

function updateActiveLink() {
  let currentId = "";
  sections.forEach(function (section) {
    if (window.scrollY >= section.offsetTop - 140) currentId = section.id;
  });
  menuLinks.forEach(function (link) {
    link.classList.toggle("active", link.getAttribute("href") === "#" + currentId);
  });
}

/* =========================================================
   7. Instant SEO score checker
   ========================================================= */
const checkerForm = document.getElementById("checkerForm");
const scoreRing = document.getElementById("scoreRing");
const scoreValue = document.getElementById("scoreValue");
const scoreLabel = document.getElementById("scoreLabel");

/** Verdict text for a given score. */
function scoreVerdict(score) {
  if (score >= 100) return "Excellent — you are ready to compete for tough keywords.";
  if (score >= 75) return "Strong foundation. A few fixes away from Page 1.";
  if (score >= 50) return "Average — technical and content gaps are holding you back.";
  if (score >= 25) return "Weak. Your site needs a full SEO audit.";
  return "Critical — let our team run a free audit for you.";
}

checkerForm.addEventListener("submit", function (event) {
  event.preventDefault();

  // Sum the value of every ticked checkbox
  let score = 0;
  checkerForm.querySelectorAll('input[name="q"]:checked').forEach(function (box) {
    score += Number(box.value);
  });

  // Animate the ring and the number together
  const duration = 900;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const shown = Math.round(score * progress);
    scoreValue.innerHTML = shown + "<small>%</small>";
    scoreRing.style.background =
      "conic-gradient(var(--accent) " +
      shown * 3.6 +
      "deg, rgba(255,255,255,0.08) " +
      shown * 3.6 +
      "deg)";
    if (progress < 1) requestAnimationFrame(tick);
    else scoreLabel.textContent = scoreVerdict(score);
  }
  requestAnimationFrame(tick);
});

/* =========================================================
   8. Testimonial slider (arrows, dots, auto-advance)
   ========================================================= */
const slides = document.querySelectorAll("#slider .slide");
const dotsWrap = document.getElementById("sliderDots");
let slideIndex = 0;

// Build one dot per slide
slides.forEach(function (_, i) {
  const dot = document.createElement("button");
  dot.type = "button";
  dot.className = "dot" + (i === 0 ? " active" : "");
  dot.setAttribute("aria-label", "Go to testimonial " + (i + 1));
  dot.addEventListener("click", function () {
    showSlide(i);
  });
  dotsWrap.appendChild(dot);
});

const dots = dotsWrap.querySelectorAll(".dot");

/** Show a slide by index (wraps around). */
function showSlide(index) {
  slideIndex = (index + slides.length) % slides.length;
  slides.forEach(function (slide, i) {
    slide.classList.toggle("active", i === slideIndex);
  });
  dots.forEach(function (dot, i) {
    dot.classList.toggle("active", i === slideIndex);
  });
}

document.querySelector("#slider .prev").addEventListener("click", function () {
  showSlide(slideIndex - 1);
});
document.querySelector("#slider .next").addEventListener("click", function () {
  showSlide(slideIndex + 1);
});

// Auto-advance every 6 seconds
let autoPlay = setInterval(function () {
  showSlide(slideIndex + 1);
}, 6000);

// Pause auto-play while the user hovers the slider
const slider = document.getElementById("slider");
slider.addEventListener("mouseenter", function () {
  clearInterval(autoPlay);
});
slider.addEventListener("mouseleave", function () {
  autoPlay = setInterval(function () {
    showSlide(slideIndex + 1);
  }, 6000);
});

/* =========================================================
   9. Back-to-top button
   ========================================================= */
const toTop = document.getElementById("toTop");

toTop.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* One scroll listener drives progress, active link and back-to-top */
window.addEventListener("scroll", function () {
  updateProgress();
  updateActiveLink();
  toTop.classList.toggle("show", window.scrollY > 500);
});

// Run once on load so the UI matches the initial scroll position
updateProgress();
updateActiveLink();

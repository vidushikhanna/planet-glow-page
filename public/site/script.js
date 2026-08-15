/* =========================================================
   SEO Services Planet — landing page logic
   Handles the free audit form: validation + success message
   ========================================================= */

// Cache the elements we need
const form = document.getElementById("auditForm");
const message = document.getElementById("formMessage");

// Simple validation patterns
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

// Intercept the submission instead of reloading the page
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const website = form.website.value.trim();

  // 1. All fields required
  if (!name || !email || !website) {
    showMessage("Please fill in your name, email and website URL.", "error");
    return;
  }

  // 2. Email format
  if (!EMAIL_PATTERN.test(email)) {
    showMessage("Please enter a valid business email address.", "error");
    return;
  }

  // 3. Website format
  if (!URL_PATTERN.test(website)) {
    showMessage("Please enter a valid website URL (e.g. https://company.com).", "error");
    return;
  }

  // 4. Valid: confirm and reset the form
  showMessage("Success! Our SEO team will contact you shortly.", "success");
  form.reset();
});

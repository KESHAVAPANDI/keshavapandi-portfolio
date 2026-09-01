/**
 * CONTACT FORM AJAX SUBMISSION HANDLER
 * Seamless AJAX submission to Formspree endpoint without page reloads.
 */

function initContactForm() {
  const form = document.getElementById('contact-form');
  const statusBox = document.getElementById('form-status-box');
  const submitBtn = document.getElementById('form-submit-btn');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const formData = new FormData(form);
    const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Send Message';

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin" style="animation: spin 1s linear infinite;">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
          <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
        </svg>
        Sending...
      `;
    }

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        form.reset();
        form.style.display = 'none';
        if (statusBox) {
          statusBox.className = 'form-status-box is-success';
          statusBox.innerHTML = `
            <h4 style="font-size:1.15rem; font-weight:700; margin-bottom:0.45rem; color:#34D399;">Message Transmitted Successfully!</h4>
            <p>Thank you for reaching out. I have received your message and will get back to you shortly.</p>
          `;
        }
      } else {
        const errorData = await response.json();
        if (statusBox) {
          statusBox.className = 'form-status-box is-error';
          statusBox.innerHTML = `<p>${errorData.errors ? errorData.errors.map(err => err.message).join(', ') : 'Oops! Something went wrong transmitting your message. Please try again.'}</p>`;
        }
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
        }
      }
    } catch (err) {
      if (statusBox) {
        statusBox.className = 'form-status-box is-error';
        statusBox.innerHTML = `<p>Network error. Please verify your connection or email directly at keshavapandi@gmail.com</p>`;
      }
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }
    }
  });
}

window.initContactForm = initContactForm;

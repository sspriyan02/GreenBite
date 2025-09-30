// script.js

document.addEventListener("DOMContentLoaded", () => {
  /* =============================
     HERO TEXT SLIDER
  ==============================*/
  const heroText = document.getElementById("hero-text");

  // Only texts (background stays fixed)
  const texts = [
    "Eat Fresh, Live Healthy",
    "Fuel Your Body, Fuel Your Mind",
    "Wellness Starts With You"
  ];

  let currentText = 0;

  function showText(index) {
    if (!heroText) return;

    // fade out
    heroText.style.opacity = 0;

    setTimeout(() => {
      heroText.textContent = texts[index];
      // fade in
      heroText.style.opacity = 1;
    }, 500);
  }

  // initial text
  showText(currentText);

  // auto-change text every 6s
  setInterval(() => {
    currentText = (currentText + 1) % texts.length;
    showText(currentText);
  }, 6000);



  /* =============================
     HEALTH TIP OF THE DAY
  ==============================*/
  const tips = [
    "🌿 Start your day with a glass of water and light stretches.<br>It boosts circulation and wakes up your metabolism.",
    "🥗 Fill half your plate with colorful veggies at each meal.<br>They’re packed with fiber and essential vitamins.",
    "🍎 Keep fresh fruit handy for snacks instead of processed food.<br>It helps control cravings and adds natural energy.",
    "🏃‍♀️ Take the stairs or a short walk today.<br>Small moves add up to improve your heart health.",
    "🧘‍♀️ Pause for 5 deep breaths when stressed.<br>Mindful breathing calms your nervous system instantly.",
    "🥛 Carry a reusable water bottle with you.<br>Staying hydrated boosts focus, skin, and digestion.",
    "💤 Aim for 7–8 hours of quality sleep.<br>Good rest restores your energy and sharpens memory."
  ];

  function getDayOfYear(date) {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date - start + ((start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000);
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  }

  const today = new Date();
  const index = getDayOfYear(today) % tips.length;
  const tipEl = document.getElementById("daily-tip");

  if (tipEl) {
    tipEl.innerHTML = tips[index];
  }



  /* =============================
     NEWSLETTER FORM
  ==============================*/
  const newsletterForm = document.getElementById("newsletterForm");
  const emailInput = document.getElementById("emailInput");

  // create message element
  const msgEl = document.createElement("div");
  msgEl.classList.add("newsletter-msg");
  newsletterForm.appendChild(msgEl);

  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();

    // simple email validation
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/i;
    if (!emailPattern.test(email)) {
      showNewsletterMsg("Please enter a valid email.", "error");
      return;
    }

    // get stored emails from localStorage
    let storedEmails = JSON.parse(localStorage.getItem("newsletterEmails")) || [];

    if (storedEmails.includes(email)) {
      showNewsletterMsg("You are already subscribed!", "info");
      emailInput.value = "";
      return;
    }

    // store new email
    storedEmails.push(email);
    localStorage.setItem("newsletterEmails", JSON.stringify(storedEmails));
    showNewsletterMsg("Thank you for subscribing!", "success");
    emailInput.value = "";
  });

  // function to show message
  function showNewsletterMsg(msg, type) {
    msgEl.textContent = msg;
    msgEl.className = "newsletter-msg show " + type;

    setTimeout(() => {
      msgEl.classList.remove("show");
    }, 4000);
  }

});

// Mobile nav toggle (minimal + accessible)
(function () {
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.getElementById('nav-menu');
  if (!toggle || !menu) return;

  const setOpen = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    menu.classList.toggle('open', open);
  };

  toggle.addEventListener('click', () => {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });

  // keyboard support (Enter/Space)
  toggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    }
  });

  // close after clicking a link (nice on mobile)
  menu.addEventListener('click', (e) => {
    if (e.target.closest('a')) setOpen(false);
  });
})();

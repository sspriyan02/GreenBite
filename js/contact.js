// Contact Form Submission
const contactForm = document.getElementById("contactForm");
const contactSuccess = document.getElementById("contactSuccess");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get input values
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if(name && email && message){
    // Store feedback in localStorage
    const feedbacks = JSON.parse(localStorage.getItem("feedbacks") || "[]");
    feedbacks.push({ name, email, message, date: new Date().toISOString() });
    localStorage.setItem("feedbacks", JSON.stringify(feedbacks));

    // Show success message
    contactSuccess.textContent = "Message sent successfully!";
    contactForm.reset();

    setTimeout(() => contactSuccess.textContent = "", 4000);
  } else {
    contactSuccess.textContent = "Please fill out all fields.";
    setTimeout(() => contactSuccess.textContent = "", 3000);
  }
});

// FAQ Accordion
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {
  const questionBtn = item.querySelector(".faq-question");
  questionBtn.addEventListener("click", () => {
    item.classList.toggle("active");
  });
});

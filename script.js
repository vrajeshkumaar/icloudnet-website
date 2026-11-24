const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
menuButton.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
}));
document.getElementById("year").textContent = new Date().getFullYear();

document.querySelectorAll("[data-service]").forEach(link => {
  link.addEventListener("click", () => {
    const select = document.querySelector('select[name="service"]');
    const choice = link.dataset.service;
    if ([...select.options].some(o => o.value === choice)) select.value = choice;
  });
});

const form = document.getElementById("enquiry-form");
const status = document.getElementById("form-status");
const submit = form.querySelector("button[type=submit]");
form.addEventListener("submit", async event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  if (!form.querySelector('input[type="checkbox"]').checked) return;
  submit.disabled = true;
  submit.querySelector(".submit-label").textContent = "Sending...";
  status.className = "form-status";
  status.textContent = "Sending your enquiry securely…";
  try {
    const response = await fetch(form.action, {
      method: "POST",
      headers: { "Accept": "application/json" },
      body: new FormData(form)
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Unable to send your enquiry.");
    form.reset();
    status.className = "form-status success";
    status.textContent = "Thank you. Your enquiry has been sent. We will contact you soon.";
  } catch (error) {
    status.className = "form-status error";
    status.textContent = `${error.message} Please try again later or email hello@icloudnet.in.`;
  } finally {
    submit.disabled = false;
    submit.querySelector(".submit-label").textContent = "Send enquiry";
  }
});

/* ========================================
   ICLOUDNET - WEBSITE FUNCTIONALITY
======================================== */

document.addEventListener("DOMContentLoaded", function () {

  // Mobile navigation
  const menuToggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".nav");
  const navigationLinks = document.querySelectorAll(".nav a");

  if (menuToggle && navigation) {

    menuToggle.addEventListener("click", function () {

      const isOpen = navigation.classList.toggle("active");

      menuToggle.setAttribute(
        "aria-expanded",
        isOpen ? "true" : "false"
      );

      menuToggle.innerHTML = isOpen ? "&times;" : "&#9776;";
    });

    // Close menu after selecting a navigation link
    navigationLinks.forEach(function (link) {

      link.addEventListener("click", function () {

        navigation.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.innerHTML = "&#9776;";

      });

    });

    // Close menu when Escape is pressed
    document.addEventListener("keydown", function (event) {

      if (event.key === "Escape") {

        navigation.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.innerHTML = "&#9776;";

      }

    });

  }

});

/* =====================================================
   THE COLLINS MUNENE STORY
   INTERACTIVE JAVASCRIPT
   ===================================================== */


/* =====================================================
   1. WAIT FOR THE PAGE TO LOAD
   ===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    console.log("Welcome to The Collins Munene Story.");

    initializeTheme();

    initializeGallery();

    initializeScrollProgress();

    initializeBackToTop();

    initializeNavigation();

    initializeRevealAnimations();

});


/* =====================================================
   2. LIGHT AND DARK THEME
   ===================================================== */

function initializeTheme() {

    const themeButton = document.getElementById("themeButton");

    if (!themeButton) {
        return;
    }

    const savedTheme = localStorage.getItem("collinsTheme");

    if (savedTheme === "light") {
        document.body.classList.add("light-theme");
    }

    themeButton.addEventListener("click", function () {

        document.body.classList.toggle("light-theme");

        const currentTheme = document.body.classList.contains("light-theme")
            ? "light"
            : "dark";

        localStorage.setItem("collinsTheme", currentTheme);

        themeButton.textContent =
            currentTheme === "light" ? "☾" : "☀ / ☾";

    });

}


/* =====================================================
   3. PHOTO GALLERY LIGHTBOX
   ===================================================== */

function initializeGallery() {

    const images = document.querySelectorAll(".story-card img");

    const lightbox = document.createElement("div");

    lightbox.className = "photo-lightbox";

    lightbox.innerHTML = `
        <button class="lightbox-close" aria-label="Close">&times;</button>
        <button class="lightbox-prev" aria-label="Previous photo">&#10094;</button>
        <div class="lightbox-content">
            <img src="" alt="">
            <h3></h3>
            <p></p>
        </div>
        <button class="lightbox-next" aria-label="Next photo">&#10095;</button>
        <div class="lightbox-counter"></div>
    `;

    document.body.appendChild(lightbox);

    const displayedImage = lightbox.querySelector("img");

    const displayedTitle = lightbox.querySelector("h3");

    const displayedDescription = lightbox.querySelector("p");

    const closeButton = lightbox.querySelector(".lightbox-close");

    const previousButton = lightbox.querySelector(".lightbox-prev");

    const nextButton = lightbox.querySelector(".lightbox-next");

    const counter = lightbox.querySelector(".lightbox-counter");

    let currentIndex = 0;

    const photoArray = Array.from(images);

    function showPhoto(index) {

        if (index < 0) {
            index = photoArray.length - 1;
        }

        if (index >= photoArray.length) {
            index = 0;
        }

        currentIndex = index;

        const selectedImage = photoArray[currentIndex];

        const card = selectedImage.closest(".story-card");

        const title = card.querySelector("h3");

        const description = card.querySelector("p");

        displayedImage.src = selectedImage.src;

        displayedImage.alt = selectedImage.alt;

        displayedTitle.textContent = title
            ? title.textContent
            : "";

        displayedDescription.textContent = description
            ? description.textContent
            : "";

        counter.textContent =
            `${currentIndex + 1} / ${photoArray.length}`;

    }

    function openLightbox(index) {

        showPhoto(index);

        lightbox.classList.add("active");

        document.body.style.overflow = "hidden";

    }

    function closeLightbox() {

        lightbox.classList.remove("active");

        document.body.style.overflow = "";

    }

    images.forEach(function (image, index) {

        image.addEventListener("click", function () {

            openLightbox(index);

        });

    });

    closeButton.addEventListener("click", closeLightbox);

    previousButton.addEventListener("click", function () {

        showPhoto(currentIndex - 1);

    });

    nextButton.addEventListener("click", function () {

        showPhoto(currentIndex + 1);

    });

    lightbox.addEventListener("click", function (event) {

        if (event.target === lightbox) {
            closeLightbox();
        }

    });

    document.addEventListener("keydown", function (event) {

        if (!lightbox.classList.contains("active")) {
            return;
        }

        if (event.key === "Escape") {
            closeLightbox();
        }

        if (event.key === "ArrowRight") {
            showPhoto(currentIndex + 1);
        }

        if (event.key === "ArrowLeft") {
            showPhoto(currentIndex - 1);
        }

    });

}


/* =====================================================
   4. SCROLL PROGRESS BAR
   ===================================================== */

function initializeScrollProgress() {

    const progressBar = document.createElement("div");

    progressBar.className = "scroll-progress";

    document.body.appendChild(progressBar);

    window.addEventListener("scroll", function () {

        const scrollTop = window.scrollY;

        const documentHeight =
            document.documentElement.scrollHeight - window.innerHeight;

        const percentage = documentHeight > 0
            ? (scrollTop / documentHeight) * 100
            : 0;

        progressBar.style.width = percentage + "%";

    });

}


/* =====================================================
   5. BACK TO TOP BUTTON
   ===================================================== */

function initializeBackToTop() {

    const backButton = document.createElement("button");

    backButton.className = "back-to-top";

    backButton.innerHTML = "↑";

    backButton.setAttribute("aria-label", "Back to top");

    document.body.appendChild(backButton);

    window.addEventListener("scroll", function () {

        if (window.scrollY > 500) {

            backButton.classList.add("visible");

        } else {

            backButton.classList.remove("visible");

        }

    });

    backButton.addEventListener("click", function () {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}


/* =====================================================
   6. NAVIGATION
   ===================================================== */

function initializeNavigation() {

    const navigationLinks =
        document.querySelectorAll(".navigation a");

    navigationLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            const target = document.querySelector(
                link.getAttribute("href")
            );

            if (target) {

                target.scrollIntoView({

                    behavior: "smooth",

                    block: "start"

                });

            }

        });

    });

}


/* =====================================================
   7. REVEAL ANIMATIONS
   ===================================================== */

function initializeRevealAnimations() {

    const cards = document.querySelectorAll(".story-card");

    const observer = new IntersectionObserver(function (entries) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {

                entry.target.classList.add("revealed");

                observer.unobserve(entry.target);

            }

        });

    }, {

        threshold: 0.12

    });

    cards.forEach(function (card) {

        observer.observe(card);

    });

}


/* =====================================================
   8. KEYBOARD SHORTCUTS
   ===================================================== */

document.addEventListener("keydown", function (event) {

    if (event.key === "Home" && !event.ctrlKey) {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }

});


/* =====================================================
   9. WELCOME MESSAGE
   ===================================================== */

console.log(
    "%cTHE COLLINS MUNENE STORY",
    "font-size:22px;font-weight:bold;color:#c9a86a;"
);

console.log(
    "A life. A family. A thousand memories."
);


/* =====================================================
   END OF SCRIPT
   ===================================================== */
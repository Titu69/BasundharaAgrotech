let lastScrollPosition = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScrollPosition = window.pageYOffset;

    if (currentScrollPosition > lastScrollPosition) {
        // Scrolling down - hide navbar
        navbar.classList.add('hidden');
    } else {
        // Scrolling up - show navbar
        navbar.classList.remove('hidden');
    }

    lastScrollPosition = currentScrollPosition;
});

document.querySelector(".form").addEventListener("submit", function(event) {
    let name = document.getElementById("name").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let location = document.getElementById("location").value.trim();
    let email = document.getElementById("email").value.trim();

    let phonePattern = /^[0-9]{10}$/; // Accepts exactly 10 digits
    let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Standard email pattern

    if (name.length < 2) {
        alert("Name must be at least 2 characters long.");
        event.preventDefault();
        return;
    }

    if (!phonePattern.test(phone)) {
        alert("Please enter a valid 10-digit phone number.");
        event.preventDefault();
        return;
    }

    if (location.length < 3) {
        alert("Please enter a valid location.");
        event.preventDefault();
        return;
    }

    if (email !== "" && !emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        event.preventDefault();
        return;
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const newsContainer = document.querySelector(".news-container");
    const newsItems = document.querySelectorAll(".news-item");
    const newsDots = document.querySelector(".news-dots");
    let currentIndex = 0;
    const scrollStep = window.innerWidth; // Scroll full width

    // Create dots dynamically based on the number of news items
    newsItems.forEach((_, index) => {
        let dot = document.createElement("div");
        dot.classList.add("dot");
        if (index === 0) dot.classList.add("active");
        dot.setAttribute("data-index", index);
        dot.addEventListener("click", function () {
            currentIndex = index;
            updateScroll();
        });
        newsDots.appendChild(dot);
    });

    function updateScroll() {
        const scrollAmount = currentIndex * scrollStep;
        newsContainer.scrollTo({ left: scrollAmount, behavior: "smooth" });

        // Update active dot
        document.querySelectorAll(".dot").forEach((dot, idx) => {
            dot.classList.toggle("active", idx === currentIndex);
        });
    }

    function autoScrollNews() {
        currentIndex = (currentIndex + 1) % newsItems.length;
        updateScroll();
    }

    setInterval(autoScrollNews, 4000); // Auto-scroll every 4 seconds
});


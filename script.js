console.log("Скрипт подключен");
const options = {
    threshold: 0.3,                    // сколько процентов элемента должно быть видно (0–1)
    rootMargin: "0px 0px -50px 0px"    // сдвиг границ области видимости
};
const recipeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains("stagger-item"));
            const parentElement = entry.target.parentElement;
            const items = parentElement.querySelectorAll(".stagger-item");
            items.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add("animate");
    }, index * 200);
});   
        } else {
            entry.target.classList.add("animate");
        }
    });
}, options);
const cards=document.querySelectorAll(".animate-on-scroll, .slide-left, .slide-right, .scale-up, .fade-in, .stagger-item");
cards.forEach((card) => {
    recipeObserver.observe(card);
});
const progressBar = document.querySelector(".scroll-progress");

window.addEventListener("scroll", () => {
    const scrollTop=window.scrollY;
    const docHeight=document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + "%";
});
const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
        header.style.background = "rgba(10, 10, 10, 0,95)";
    } else {
        header.style.background = "rgba(10, 10, 10, 0,9)";
    }
});

const tocLinks = document.querySelectorAll('a[href^="#"');

tocLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();                 // браузер не прыгает сам
        const id = link.getAttribute("href");   // например, "#chapter-2"
        const targetElement = document.querySelector(id);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
}); 
const container = document.querySelector(".particles");
for (let i = 0; i < 50; i++) {
    const flake = document.createElement("div");
    flake.classList.add("particle");
    flake.style.left = Math.random() * 100 + "%";
    flake.style.animationDelay = Math.random() * 5 + "s";
    flake.style.animationDuration = (Math.random() * 3 + 2) + "s";
    container.appendChild(flake);
}

function countUp(element, target, duration = 2000) {
    let current = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting) {
            const numbers = entry.target.querySelectorAll(".stat-number");
            numbers.forEach((num) => {
                const target = parseInt(num.textContent);
                if (!isNaN(target)) {
                    countUp(num, target);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });
const statsBlock=document.querySelector(".stats");
if (statsBlock) {
    statsObserver.observe(statsBlock);
}
// ==============================
// 🚀 INIT APP
// ==============================
document.addEventListener("DOMContentLoaded", () => {
    initCounters();
    initSwiper();
    initSmoothScroll();
    fetchData();
    initThemeToggle();
});

// ==============================
// 🌙 THEME TOGGLE (DARK MODE)
// ==============================
function initThemeToggle() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const lightIcon = document.getElementById('theme-toggle-light-icon');
    const darkIcon = document.getElementById('theme-toggle-dark-icon');
    
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
        lightIcon.classList.remove('hidden');
    } else {
        document.documentElement.classList.remove('dark');
        darkIcon.classList.remove('hidden');
    }

    themeToggleBtn.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        if (document.documentElement.classList.contains('dark')) {
            localStorage.theme = 'dark';
            lightIcon.classList.remove('hidden');
            darkIcon.classList.add('hidden');
        } else {
            localStorage.theme = 'light';
            darkIcon.classList.remove('hidden');
            lightIcon.classList.add('hidden');
        }
    });
}

// ==============================
// 📊 COUNTER ANIMATION
// ==============================
function initCounters() {
    const counters = document.querySelectorAll(".counter");

    counters.forEach(counter => {
        counter.innerText = "0";

        const updateCounter = () => {
            const target = +counter.dataset.target;
            const count = +counter.innerText;

            const increment = target / 200;

            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCounter, 10);
            } else {
                counter.innerText = target;
            }
        };

        updateCounter();
    });
}


// ==============================
// 🎞️ SWIPER SLIDER
// ==============================
function initSwiper() {
    new Swiper(".swiper", {
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });
}


// ==============================
// 🔗 SMOOTH SCROLL
// ==============================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();

            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
            }
        });
    });
}


// ==============================
// 📦 FETCH DATA
// ==============================
async function fetchData() {
    try {
        const res = await fetch("data/data.json");
        const data = await res.json();

        renderTimeline(data.timeline);
        renderServices(data.services);
        renderSchemes(data.schemes);
        renderJobs(data.jobs);
        renderModern(data.modern);
        renderUniquePostOffices(data.uniquePostOffices);
        renderVideos(data.videos);

    } catch (error) {
        console.error("Error loading data:", error);
    }
}

// ==============================
// 🎥 VIDEOS
// ==============================
function renderVideos(videos) {
    const container = document.getElementById("videos-container");
    if (!container || !videos) return;

    container.innerHTML = "";

    videos.forEach((video, index) => {
        const card = document.createElement("a");
        card.href = video.url;
        card.target = "_blank";
        card.className = "bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border border-gray-100 dark:border-gray-700 rounded-2xl shadow hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden group block";
        card.setAttribute("data-aos", "fade-up");
        card.setAttribute("data-aos-delay", index * 100);

        card.innerHTML = `
            <div class="h-48 relative overflow-hidden bg-gray-200">
                <img src="${video.thumbnail}" alt="${video.title}" class="w-full h-full object-cover group-hover:scale-105 transition duration-300">
                <div class="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/10 transition">
                    <div class="bg-red-600/90 backdrop-blur-sm text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg text-xl pl-1 group-hover:scale-110 transition-transform">
                        ▶
                    </div>
                </div>
            </div>
            <div class="p-5 text-center">
                <h3 class="font-bold text-gray-800 dark:text-gray-100 text-sm md:text-base">${video.title}</h3>
            </div>
        `;

        container.appendChild(card);
    });
}

// ==============================
// 📜 TIMELINE
// ==============================
function renderTimeline(timeline) {
    const container = document.getElementById("timeline-container");
    if (!container) return;

    container.innerHTML = "";

    timeline.forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "relative pl-8 sm:pl-32 py-6 group";
        div.setAttribute("data-aos", "fade-up");
        div.setAttribute("data-aos-delay", index * 100);

        div.innerHTML = `
            <div class="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-[8.5rem] before:h-full before:px-px before:bg-gray-200 dark:before:bg-gray-700 sm:before:-ml-[0.5rem] before:top-10 hidden sm:block"></div>
            <div class="absolute left-0 sm:left-[8.25rem] w-4 h-4 rounded-full bg-red-600 border-4 border-white dark:border-gray-900 mt-1.5 sm:mt-0 z-10 hidden sm:block"></div>
            <h3 class="text-xl font-bold text-red-600 sm:absolute sm:left-0 sm:w-24 sm:text-right mb-2 sm:mb-0">${item.year}</h3>
            <div class="sm:ml-8 bg-white/60 dark:bg-gray-800/60 backdrop-blur-md p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm w-full transition-transform duration-300 hover:shadow-md hover:-translate-y-1">
                <h4 class="font-bold text-lg mb-2 dark:text-gray-100">${item.title}</h4>
                <p class="text-gray-600 dark:text-gray-400">${item.desc || item.description}</p>
            </div>
        `;

        container.appendChild(div);
    });
}


// ==============================
// 📦 SERVICES
// ==============================
function renderServices(services) {
    const container = document.getElementById("services-container");
    if (!container) return;

    container.innerHTML = "";

    services.forEach((service, index) => {
        const card = document.createElement("div");

        card.className =
            "bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border border-gray-100 dark:border-gray-700 p-8 rounded-2xl shadow hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between";
        card.setAttribute("data-aos", "fade-up");
        card.setAttribute("data-aos-delay", index * 100);

        card.innerHTML = `
            <div>
                <h3 class="font-bold text-xl mb-3 dark:text-gray-100">${service.title}</h3>
                <p class="text-gray-600 dark:text-gray-400 mb-6">${service.short}</p>
            </div>
            <button class="text-red-600 font-semibold text-left flex items-center gap-2 group">
                Read More →
            </button>
        `;

        card.querySelector("button").onclick = () =>
            openModal(service.title, service.description);

        container.appendChild(card);
    });
}


// ==============================
// 💰 SCHEMES
// ==============================
function renderSchemes(schemes) {
    const container = document.getElementById("schemes-container");
    if (!container) return;

    container.innerHTML = "";

    schemes.forEach((scheme, index) => {
        const card = document.createElement("div");

        card.className =
            "bg-white/60 dark:bg-gray-800/60 backdrop-blur-md border border-gray-100 dark:border-gray-700 p-8 rounded-2xl shadow hover:shadow-xl transition-all duration-300 hover:-translate-y-2";
        card.setAttribute("data-aos", "fade-up");
        card.setAttribute("data-aos-delay", index * 100);

        card.innerHTML = `
            <h3 class="font-bold text-lg mb-3 dark:text-gray-100">${scheme.name}</h3>
            <p class="text-gray-600 dark:text-gray-400">${scheme.description}</p>
        `;

        container.appendChild(card);
    });
}


// ==============================
// 👨‍💼 JOB HIERARCHY
// ==============================
function renderJobs(jobs) {
    const container = document.getElementById("job-container");
    if (!container) return;

    container.innerHTML = "";

    jobs.forEach((job, index) => {
        const card = document.createElement("div");

        card.className =
            "bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-100 dark:border-gray-700 px-6 py-3 rounded-full shadow hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer dark:text-gray-200";
        card.setAttribute("data-aos", "zoom-in");
        card.setAttribute("data-aos-delay", (index % 5) * 50);

        card.innerHTML = `<span class="font-semibold text-sm">${job.title}</span>`;

        card.onclick = () => openModal(job.title, job.description);

        container.appendChild(card);
    });
}


// ==============================
// 💻 MODERN INDIA POST
// ==============================
function renderModern(modern) {
    const container = document.getElementById("modern-container");
    if (!container) return;

    container.innerHTML = "";

    modern.forEach((item, index) => {
        const card = document.createElement("div");

        card.className =
            "bg-white/60 dark:bg-gray-800/60 backdrop-blur-md border border-gray-100 dark:border-gray-700 p-8 rounded-2xl shadow hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer flex flex-col justify-between";
        card.setAttribute("data-aos", "fade-up");
        card.setAttribute("data-aos-delay", index * 100);

        card.innerHTML = `
            <div>
                <h3 class="font-bold text-xl mb-3 dark:text-gray-100">${item.title}</h3>
                <p class="text-gray-600 dark:text-gray-400 mb-6">${item.short}</p>
            </div>
            <span class="text-red-600 font-semibold">Learn More →</span>
        `;

        card.onclick = () => openModal(item.title, item.description);

        container.appendChild(card);
    });
}


// ==============================
// 🏛️ UNIQUE POST OFFICES
// ==============================
function renderUniquePostOffices(offices) {
    const container = document.getElementById("unique-container");
    if (!container || !offices) return;

    container.innerHTML = "";

    offices.forEach((office, index) => {
        const card = document.createElement("div");

        card.className =
            "bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border border-gray-100 dark:border-gray-700 rounded-2xl shadow hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden group";
        card.setAttribute("data-aos", "fade-up");
        card.setAttribute("data-aos-delay", index * 100);

        card.innerHTML = `
            <div class="h-56 overflow-hidden">
                <img src="${office.image}" alt="${office.title}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
            </div>
            <div class="p-6 text-center">
                <h3 class="font-bold text-lg text-gray-800 dark:text-gray-100">${office.title}</h3>
            </div>
        `;

        container.appendChild(card);
    });
}

// ==============================
// 🪟 MODAL
// ==============================
function openModal(title, content) {
    document.getElementById("modal-title").innerText = title;
    document.getElementById("modal-content").innerHTML = content;

    const modal = document.getElementById("modal");
    modal.classList.remove("hidden");
    modal.classList.add("flex");

    setTimeout(() => {
        const modalContent = document.getElementById("modal-content-container");
        modalContent.classList.remove("scale-95", "opacity-0");
        modalContent.classList.add("scale-100", "opacity-100");
    }, 10);
}

function closeModal() {
    const modal = document.getElementById("modal");
    const modalContent = document.getElementById("modal-content-container");
    modalContent.classList.remove("scale-100", "opacity-100");
    modalContent.classList.add("scale-95", "opacity-0");
    setTimeout(() => {
        modal.classList.add("hidden");
        modal.classList.remove("flex");
    }, 300);
}

function openTimelineModal() {
  openModal(
    "Complete Timeline",
    "Full detailed timeline will be added here."
  );
}

// ==============================
// 📖 ABOUT INDIA POST MODAL
// ==============================
function openAboutModal() {
    const content = `
        <div class="space-y-4 text-gray-700 text-base text-left">
            <p>With over 1.6 lakh post offices across India, it operates the largest postal network in the world, reaching from busy cities to the most remote villages. What began as a traditional mail service has grown into a powerful public service network that supports communication, savings, insurance, logistics, and digital banking.</p>
            <p>For generations, India Post has done more than deliver mail—it has delivered emotions, opportunities, security, and connection. From handwritten letters and money orders to speed post and digital banking, India Post has remained a symbol of reliability and service in Indian life.</p>
            <p>More than just a postal system, India Post represents trust, dedication, and the spirit of public service that has connected India for generations.</p>
        </div>
    `;
    openModal("About India Post", content);
}

// ==============================
// 🏛️ HISTORY MODAL
// ==============================
function openHistoryModal() {
    const content = `
        <div class="space-y-6 text-base text-gray-700 text-left leading-relaxed">
            <div>
                <h3 class="text-lg font-bold text-gray-800 mb-2">Early Beginnings</h3>
                <p>The origins of postal communication in India date back to ancient and medieval times, when messages were carried through organized systems of horse riders and foot messengers under various kingdoms and empires. Rulers such as Sher Shah Suri helped strengthen these early communication routes by building organized postal pathways across long distances.</p>
            </div>
            <div>
                <h3 class="text-lg font-bold text-gray-800 mb-2">Birth of the Modern Postal System</h3>
                <p class="mb-2">The foundation of the modern postal system in India was laid during British rule. In 1774, the first General Post Office was established in Calcutta, followed later by Madras and Bombay. These early offices formed the administrative base for structured postal communication in India.</p>
                <p>In 1854, the modern Indian postal system was formally established under the Post Office Act, marking the official birth of India Post as a public postal institution. This laid the foundation for organized, accessible, and nationwide postal services in India.</p>
            </div>
            <div>
                <h3 class="text-lg font-bold text-gray-800 mb-2">Introduction of Postal Stamps</h3>
                <p>India introduced its earliest postage stamps in the mid-19th century, beginning with the Scinde Dawk in 1852—Asia’s first adhesive postage stamp. In 1854, the first all-India postage stamps were introduced, helping standardize postal services across the country.</p>
            </div>
            <div>
                <h3 class="text-lg font-bold text-gray-800 mb-2">Expanding Public Services</h3>
                <p class="mb-2">As India Post grew, it expanded beyond letters and parcels into public financial services.</p>
                <p class="font-semibold mb-2 text-gray-800">Major milestones included:</p>
                <ul class="list-disc list-inside ml-4 space-y-1">
                    <li>1879 – Postcard service introduced</li>
                    <li>1880 – Money Order service launched</li>
                    <li>1882 – Post Office Savings Bank opened</li>
                    <li>1884 – Postal Life Insurance introduced</li>
                </ul>
                <p class="mt-4">These services made India Post an essential part of daily life, helping people communicate, save money, and secure their families.</p>
            </div>
            <div>
                <h3 class="text-lg font-bold text-gray-800 mb-2">A Historic Global Milestone</h3>
                <p>In 1911, India Post made global history by handling the world’s first official airmail flight. Mail was flown from Allahabad to Naini, marking a major breakthrough in postal and aviation history.</p>
            </div>
            <div>
                <h3 class="text-lg font-bold text-gray-800 mb-2">India Post After Independence</h3>
                <p>After India gained independence in 1947, India Post became an important part of nation-building. It connected citizens, businesses, and government institutions across the country and continued expanding its reach into rural and remote areas.</p>
            </div>
            <div>
                <h3 class="text-lg font-bold text-gray-800 mb-2">Modernization & Innovation</h3>
                <p class="mb-2">India Post continued to modernize over time with several important innovations:</p>
                <ul class="list-disc list-inside ml-4 space-y-1">
                    <li>1972 – PIN Code system introduced</li>
                    <li>1986 – Speed Post launched</li>
                    <li>1995 – Rural Postal Life Insurance introduced</li>
                    <li>2008 – Project Arrow modernization launched</li>
                    <li>2018 – India Post Payments Bank launched</li>
                </ul>
                <p class="mt-4">These milestones transformed India Post from a traditional mail service into a modern network offering logistics, banking, insurance, and digital services.</p>
            </div>
            <div>
                <h3 class="text-lg font-bold text-gray-800 mb-2">India Post Today</h3>
                <p>Today, India Post is the largest postal network in the world, with over 1.64 lakh post offices serving millions of people every day. It continues to connect India through communication, financial inclusion, logistics, and public service—while carrying forward a legacy built on trust, service, and connection.</p>
            </div>
        </div>
    `;
    openModal("History of India Post", content);
}
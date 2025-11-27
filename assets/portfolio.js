// --- GEMINI API CONFIGURATION ---
// API key now securely stored on backend server
// Configure your proxy server URL below
const PROXY_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:3000/api/gemini'  // Local development
    : 'https://your-backend-server.com/api/gemini';  // Production - UPDATE THIS!

async function callGeminiAPI(prompt) {
    try {
        const response = await fetch(PROXY_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'API Error');
        }

        const data = await response.json();
        return data.text;
    } catch (error) {
        console.error("Gemini API Error:", error);
        showToast("AI Service Unavailable");
        return "Sorry, the AI service is currently unavailable. Please try again later.";
    }
}

// --- AI FEATURE 1: EXPLAIN PROJECT ---
async function explainProject(sourceId, targetId) {
    const descText = document.getElementById(sourceId).innerText;
    const targetEl = document.getElementById(targetId);

    // Loading State
    targetEl.classList.remove('hidden');
    targetEl.innerHTML = `<div class="flex items-center gap-2"><i data-lucide="loader-2" class="animate-spin w-4 h-4"></i> Simplifying complex concepts...</div>`;
    lucide.createIcons();

    const prompt = `You are a helpful science communicator. Rewrite the following research project description so it is easy for a high school student to understand. Keep it under 2 sentences. Description: "${descText}"`;

    const result = await callGeminiAPI(prompt);

    targetEl.innerHTML = `<strong class="block mb-1 text-[var(--text-main)] opacity-80">Simpler Explanation:</strong> ${result}`;
}

// --- AI FEATURE 2: SMART DRAFT ---
async function draftEmail() {
    const topic = document.getElementById('draft-topic').value;
    if (!topic) {
        showToast("Please enter a topic first");
        return;
    }

    const msgBox = document.getElementById('message-box');

    // Loading indication in the textarea
    const originalPlaceholder = msgBox.placeholder;
    msgBox.placeholder = "✨ AI is drafting your email...";
    msgBox.value = "✨ Drafting...";
    msgBox.classList.add("animate-pulse");

    const prompt = `Draft a professional, concise email to Swastik Sharma (a PhD Candidate at IIT Kanpur) regarding the following topic: "${topic}". The sender is a fellow researcher. Keep it under 100 words. Only output the body of the email.`;

    const result = await callGeminiAPI(prompt);

    msgBox.classList.remove("animate-pulse");
    msgBox.value = result;
    msgBox.placeholder = originalPlaceholder;
}

// --- ICONS ---
lucide.createIcons();

// --- DYNAMIC YEAR ---
document.getElementById('year').textContent = new Date().getFullYear();

// --- TAB NAVIGATION & DEEP LINKING ---
// --- TAB NAVIGATION & DEEP LINKING ---
const sectionOrder = ['about', 'cv', 'research', 'publications', 'teaching', 'reads', 'blog', 'gallery', 'contact'];

function showSection(sectionId, animationClass = 'fade-in') {
    // Update Hash without scrolling
    history.replaceState(null, null, '#' + sectionId);

    // Hide all sections
    sectionOrder.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.classList.add('hidden');
            el.classList.remove('fade-in', 'slide-in-right', 'slide-in-left');
        }
    });

    // Show target section
    const target = document.getElementById(sectionId);
    if (target) {
        target.classList.remove('hidden');
        // Trigger Reflow to restart animation
        void target.offsetWidth;
        target.classList.add(animationClass);

        // Scroll to top of content container
        const container = document.querySelector('.overflow-y-auto');
        if (container) container.scrollTop = 0;
    }

    // Update Nav Styling
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(btn => {
        btn.classList.remove('active');
        if (btn.innerText.toLowerCase().includes(sectionId)) {
            btn.classList.add('active');
        }
    });

    // Close mobile menu if open (Mobile only)
    if (window.innerWidth < 768) {
        const nav = document.getElementById('main-nav');
        if (nav && !nav.classList.contains('hidden')) {
            nav.classList.add('hidden');
            nav.classList.remove('flex');
        }
    }
}

// --- SWIPE NAVIGATION ---
let touchStartX = 0;
let touchEndX = 0;
const minSwipeDistance = 50;

const contentContainer = document.querySelector('.overflow-y-auto');

if (contentContainer) {
    contentContainer.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    contentContainer.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
}

function handleSwipe() {
    const distance = touchEndX - touchStartX;
    if (Math.abs(distance) < minSwipeDistance) return;

    // Get current section
    const currentHash = window.location.hash.substring(1) || 'about';
    const currentIndex = sectionOrder.indexOf(currentHash);

    if (currentIndex === -1) return;

    if (distance < 0) {
        // Swipe Left -> Next Section
        if (currentIndex < sectionOrder.length - 1) {
            showSection(sectionOrder[currentIndex + 1], 'slide-in-right');
        }
    } else {
        // Swipe Right -> Previous Section
        if (currentIndex > 0) {
            showSection(sectionOrder[currentIndex - 1], 'slide-in-left');
        }
    }
}

// Handle Initial Hash
window.addEventListener('load', () => {
    const hash = window.location.hash.substring(1);
    if (hash && sectionOrder.includes(hash)) {
        showSection(hash);
    }
});

// --- LIGHTBOX LOGIC ---
function openLightbox(imgSrc) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    lightboxImg.src = imgSrc;
    lightbox.classList.add('active');
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
}

// --- THEME TOGGLE ---
// --- THEME & SCHEME LOGIC ---
const schemes = {
    obsidian: { dark: '#FBBF24', light: '#D97706' },
    crimson: { dark: '#FB7185', light: '#BE123C' },
    oxford: { dark: '#60A5FA', light: '#0369A1' },
    sage: { dark: '#86EFAC', light: '#15803D' },
    royal: { dark: '#C084FC', light: '#7E22CE' }
};

function setScheme(scheme) {
    const html = document.documentElement;
    html.setAttribute('data-scheme', scheme);
    localStorage.setItem('scheme', scheme);
    updateThemeColors();
}

function toggleTheme() {
    const html = document.documentElement;
    const checkbox = document.getElementById('theme-checkbox');

    if (checkbox.checked) {
        html.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    } else {
        html.removeAttribute('data-theme');
        localStorage.setItem('theme', 'dark');
    }
    updateThemeColors();
}

function updateThemeColors() {
    const html = document.documentElement;
    const scheme = html.getAttribute('data-scheme') || 'obsidian';
    const isLight = html.getAttribute('data-theme') === 'light';

    const color = isLight ? schemes[scheme].light : schemes[scheme].dark;
    updateParticles(color);
}

// Initialize Theme State
window.addEventListener('DOMContentLoaded', () => {
    const html = document.documentElement;
    const checkbox = document.getElementById('theme-checkbox');

    // Load saved settings
    const savedTheme = localStorage.getItem('theme');
    const savedScheme = localStorage.getItem('scheme') || 'obsidian';

    // Apply Scheme
    setScheme(savedScheme);

    // Apply Theme
    if (savedTheme === 'light') {
        html.setAttribute('data-theme', 'light');
        checkbox.checked = true;
    } else {
        html.removeAttribute('data-theme');
        checkbox.checked = false;
    }

    updateThemeColors();
});

// --- CLIPBOARD UTILITY ---
function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(() => showToast("Citation copied!"));
    } else {
        // Fallback
        let textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            document.execCommand('copy');
            showToast("Citation copied!");
        } catch (err) {
            showToast("Failed to copy.");
        }
        document.body.removeChild(textArea);
    }
}

function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.className = "show";
    setTimeout(function () { toast.className = toast.className.replace("show", ""); }, 3000);
}

// --- INTERACTIVE BACKGROUND (PARTICLE NETWORK) ---
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let particleColor = '#FBBF24'; // Default dark mode Amber

function updateParticles(newColor) {
    particleColor = newColor;
    particles.forEach(p => p.color = newColor);
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
}
window.addEventListener('resize', resizeCanvas);

let mouse = { x: null, y: null, radius: 150 };
window.addEventListener('mousemove', function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    update() {
        if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
        if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;

        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius + this.size) {
            if (mouse.x < this.x && this.x < canvas.width - this.size * 10) this.x += 2;
            if (mouse.x > this.x && this.x > this.size * 10) this.x -= 2;
            if (mouse.y < this.y && this.y < canvas.height - this.size * 10) this.y += 2;
            if (mouse.y > this.y && this.y > this.size * 10) this.y -= 2;
        }

        this.x += this.directionX * 0.4;
        this.y += this.directionY * 0.4;
        this.draw();
    }
}

function initParticles() {
    particles = [];
    // Detect mobile by screen width
    const isMobile = canvas.width < 768;

    // drastically reduce divider for mobile (fewer particles)
    // Desktop: divide by 15000, Mobile: divide by 25000
    const divider = isMobile ? 25000 : 15000;

    let numberOfParticles = (canvas.height * canvas.width) / divider;

    for (let i = 0; i < numberOfParticles; i++) {
        // ... existing loop code ...
        let size = (Math.random() * 2) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 2) - 1;
        let directionY = (Math.random() * 2) - 1;
        particles.push(new Particle(x, y, directionX, directionY, size, particleColor));
    }
}

function animate() {
    // Performance: Pause animation if tab is hidden
    if (!document.hidden) {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
        }
        connect();
    } else {
        // Check again in 500ms if tab is active
        setTimeout(animate, 500);
    }
}

function connect() {
    // Convert hex color to rgb for opacity handling
    let rgb = hexToRgb(particleColor);

    for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
            let distance = ((particles[a].x - particles[b].x) * (particles[a].x - particles[b].x))
                + ((particles[a].y - particles[b].y) * (particles[a].y - particles[b].y));
            if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                let opacity = 1 - (distance / 20000);
                ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity * 0.15})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particles[a].x, particles[a].y);
                ctx.lineTo(particles[b].x, particles[b].y);
                ctx.stroke();
            }
        }
    }
}

// Helper to convert hex for canvas stroke style
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : { r: 251, g: 191, b: 36 }; // Default Amber 400
}

resizeCanvas();
animate();

const menuBtn = document.getElementById('mobile-menu-btn');
const closeMenuBtn = document.getElementById('close-menu-btn');
const mainNav = document.getElementById('main-nav');

function toggleMobileMenu() {
    mainNav.classList.toggle('hidden');
    mainNav.classList.toggle('flex');
}

menuBtn.addEventListener('click', toggleMobileMenu);
if (closeMenuBtn) {
    closeMenuBtn.addEventListener('click', toggleMobileMenu);
}

// --- BLOG LOGIC ---
const blogPosts = [
    {
        id: 1,
        title: "Distribution Systems: The Urgent Need for Customer-Centric Policies.",
        date: "October 15, 2025",
        summary: "Exploring the directions the policy needs to adapt to enhance efficient distribution system flexibility extraction",
        content: `
            <p class="mb-4">The distribution systems in many developed countries are changing the concept of “power only trickles down from transmission to distribution”. They are now becoming “active” networks, facilitating a bidirectional exchange where the distribution system can also provide power.  This is possible due to the various Distributed Energy Resources (DERs), such as Heating, Ventilation, and Air Conditioning (HVAC) loads, Electric Vehicles (EVs), and Solar Rooftop Photovoltaics (SRPVs). These resources enable the system to respond to changing conditions in real-time, which is essential for maintaining a continual supply-demand balance.</p>

            <p class="mb-4">While the proliferation of these resources is extensive today, the concept of asking for flexibility from distribution systems is not new. In India, when the Government launched the scheme of replacing ordinary light bulbs with LED lights, it was, in fact, introduced to reduce the load on the system. The humble LED bulb helped reduce a significant chunk of load (an interesting article <a href="https://www.carbonbrief.org/guest-post-how-energy-efficient-led-bulbs-lit-up-india-in-just-five-years/" target="_blank" rel="noopener noreferrer"><u>here</u></a> for your reference). This reduction in load is not only to tame the sharp increase in demand, but also to give the government a breathing space to implement its plans of decarbonization, which they are pursuing rather aggressively (an <a href="https://www.weforum.org/stories/2020/01/india-new-hotspot-renewable-energy-investors/" target="_blank" rel="noopener noreferrer"><u>article</u></a> for you). But these “newer” forms of electricity, especially those tied to renewable energy, bring with them a whole new set of problems. UNCERTAINTY and VARIABILITY. Uncertain, because you can’t predict their output. Variable because weather conditions dictate their output.</p>

        <p class="mb-4">Learning from the experiences of developed countries is crucial now to brace for the impact of this rapid decarbonization and increased reliance on Renewable Energy Sources (RESs). And the center of attraction of this discussion is Flexibility. Flexibility refers to a system's ability to adapt to changing conditions. It is the ability to control and handle change without causing disruption or trouble.  It is what keeps the lights on even when things change suddenly. With increasing uncertainty in the system, India needs more flexibility than ever. Much of this flexibility sits on the distribution side. But this flexibility is ultimately dependent on the customers, their behaviour, and willingness.</p>

        <p class="mb-4">From a policy standpoint, the distribution systems and their customers have been notoriously ignored. A customer has needs and wants; they need electricity, but they want it at a lower cost. These needs and wants come from a simple concept: how much are you willing to pay for electricity? Let's think about this for a moment. If I show up at your house tomorrow and say, “I’ll give you ₹500, but you’ll have to turn off all the lights during the day, do you accept?” What happens in your mind next is a cost-benefit analysis. You’ll think, “I have enough daylight during the day, and not using lights is fine, and I make an extra ₹500”. Now, let's change the situation. Suppose I ask you to turn off the lights at night, but you have a test coming up that you need to study for. Would you still accept it? The exchange is not lucrative now, isn’t it? This anecdote remains relevant today, as policymakers must consider the customer’s needs and wants before planning for flexibility. </p>
        <p class="mb-4">This is why customer-centric policies are needed now. India is rapidly adopting RTPVs, EVs, and other emerging technologies at an unprecedented rate. The distribution system is driving the country's energy transition. Technology alone won’t solve the flexibility problem. We need people to be part of the solution. We need plans, tariffs, and incentives that match what customers care about.</p>

        <p class="mb-4">If we can do that, the grid becomes more resilient and fairer, even in the face of all the uncertainty that renewable energy brings. A customer-centric approach isn’t just a nice idea. It’s what will determine whether India’s transition to cleaner energy is smooth, stable, and widely accepted.</p>
        <p class="mb-8"> <b>Swastik</b> </p>
        `
    }
];

function renderBlogPosts() {
    const grid = document.getElementById('blog-grid');
    if (!grid) return;

    grid.innerHTML = blogPosts.map(post => `
        <div class="glass-panel p-6 rounded-xl cursor-pointer group hover:border-[var(--primary)] transition-colors" onclick="openBlogPost(${post.id})">
            <span class="text-xs font-mono text-[var(--primary)]">${post.date}</span>
            <h4 class="text-xl font-bold mt-2 mb-3 group-hover:text-[var(--primary)] transition-colors">${post.title}</h4>
            <p class="text-sm text-[var(--text-muted)] line-clamp-3">${post.summary}</p>
            <div class="mt-4 flex items-center text-xs text-[var(--text-main)] font-bold uppercase tracking-wider">
                Read More <i data-lucide="arrow-right" class="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform"></i>
            </div>
        </div>
    `).join('');

    // Re-initialize icons for new elements
    if (window.lucide) lucide.createIcons();
}

function openBlogPost(id) {
    const post = blogPosts.find(p => p.id === id);
    if (!post) return;

    document.getElementById('modal-title').textContent = post.title;
    document.getElementById('modal-date').textContent = post.date;
    document.getElementById('modal-body').innerHTML = post.content;

    const modal = document.getElementById('blog-modal');
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeBlogPost() {
    const modal = document.getElementById('blog-modal');
    modal.classList.add('hidden');
    document.body.style.overflow = ''; // Restore scrolling
}

// Initial Render
renderBlogPosts();

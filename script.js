// --- SCROLL POSITION MEMORY ---
let lastScrollY = 0;

// --- REVEAL ANIMATIONS ON SCROLL ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => { 
        if (entry.isIntersecting) {
            entry.target.classList.add('show'); 
        }
    });
}, { threshold: 0.1 });

// Initialize reveal on all sections
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});

// --- NAVIGATION MENU TOGGLE ---
function toggleMenu() { 
    const nav = document.getElementById('navLinks');
    if(nav) nav.classList.toggle('active'); 
}

// --- SMOOTH SCROLL TO ID ---
function scrollToId(id) { 
    const el = document.getElementById(id);
    if(el) {
        el.scrollIntoView({ behavior: 'smooth' }); 
    }
}

// --- MULTI-TRACK SLIDER LOGIC ---
const sliderPositions = {};

function moveSlider(trackId, dir) {
    const track = document.getElementById(trackId);
    if(!track) return;
    
    const cards = track.children;
    if (cards.length === 0) return;
    
    // Get gap from root CSS variable
    const style = getComputedStyle(document.documentElement);
    const gap = parseInt(style.getPropertyValue('--slider-gap')) || 20;
    const cardWidth = cards[0].offsetWidth;
    const step = cardWidth + gap;
    
    // Determine visible cards based on viewport
    let visibleCards = window.innerWidth > 900 ? 3 : (window.innerWidth > 600 ? 2 : 1);
    
    // Max slides needed to reach the end
    let maxSlides = Math.max(0, cards.length - visibleCards);
    
    if (sliderPositions[trackId] === undefined) sliderPositions[trackId] = 0;
    
    // Update position
    sliderPositions[trackId] = Math.max(0, Math.min(sliderPositions[trackId] + dir, maxSlides));
    
    // Apply transform
    track.style.transform = `translateX(-${sliderPositions[trackId] * step}px)`;
}

// --- INTEGRATED PROJECT VIEW LOGIC ---
function showProject(type) {
    // Save current scroll position before hiding main content
    lastScrollY = window.scrollY;

    const main = document.getElementById('main-content');
    const projectView = document.getElementById('project-view');
    const inner = document.getElementById('project-inner-content');

    let content = "";
    if(type === 'sahyog') {
        content = `
            <h1>SAHYOG</h1>
            <div class="img-placeholder"></div>
            <p><strong>SAHYOG – Sharing Smiles</strong> supports the holistic development of underprivileged children through education and consistent mentoring.</p>
            <ul style="line-height: 2; margin-top: 20px; list-style-type: disc; padding-left: 20px;">
                <li>Daily teaching sessions from 3:00 PM to 5:00 PM.</li>
                <li>Annual cultural programs and creative workshops.</li>
                <li>Providing books, bags, and essential school supplies.</li>
                <li>Bridge courses to bring dropout children back to mainstream schools.</li>
            </ul>
        `;
    } else if(type === 'sahas') {
        content = `
            <h1>SAHAS</h1>
            <div class="img-placeholder"></div>
            <p><strong>SAHAS – Empowering Women</strong> focuses on creating an inclusive environment where women are equipped with skills to lead independent lives.</p>
            <ul style="line-height: 2; margin-top: 20px; list-style-type: disc; padding-left: 20px;">
                <li>Vocational training: Stitching, handicrafts, and computer literacy.</li>
                <li>Awareness sessions on health, hygiene, and reproductive rights.</li>
                <li>Legal aid workshops regarding domestic rights and safety.</li>
                <li>Self-defense camps and leadership development meets.</li>
            </ul>
        `;
    }

    inner.innerHTML = content;
    main.style.display = 'none';
    projectView.style.display = 'block';
    
    // Start sub-page from top
    window.scrollTo(0, 0);
}

function hideProject() {
    const main = document.getElementById('main-content');
    const projectView = document.getElementById('project-view');
    
    main.style.display = 'block';
    projectView.style.display = 'none';
    
    // Restore exact scroll position where the user clicked
    window.scrollTo(0, lastScrollY);
}

// --- FORM AUTOMATION HANDLER ---
function handleFormSubmit(form) {
    // Mocking email submission
    alert('Sukriya! Aapka message mail ho gaya hai. Hum jald hi aapse sampark karenge.');
    
    // Automatically empty the form
    form.reset(); 
}

// --- HANDLE RESIZE ---
window.addEventListener('resize', () => {
    // Reset sliders on resize to prevent alignment issues
    Object.keys(sliderPositions).forEach(id => {
        sliderPositions[id] = 0;
        const tr = document.getElementById(id);
        if(tr) tr.style.transform = 'translateX(0)';
    });
});
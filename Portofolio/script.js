// Memastikan semua isi HTML dimuat terlebih dahulu
document.addEventListener("DOMContentLoaded", () => {
    
    // Mobile Menu
    const menuBtn = document.getElementById('menuBtn');
    const navLinks = document.getElementById('navLinks');
    
    menuBtn.addEventListener('click', () => { 
        navLinks.classList.toggle('active'); 
    });
    
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => navLinks.classList.remove('active'));
    });

    // Tab Switching Case Study
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById(btn.dataset.target).classList.add('active');
        });
    });

    // Scrollspy untuk active link pada Navbar
    const sections = document.querySelectorAll('section, header, footer');
    const navItems = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(sec => {
            if (window.scrollY >= (sec.offsetTop - 150)) { 
                current = sec.getAttribute('id'); 
            }
        });
        navItems.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').substring(1) === current) {
                a.classList.add('active');
            }
        });
    });

    // MODAL ZOOM IMAGE LOGIC
    const zoomModal = document.getElementById('zoomModal');
    const zoomedImg = document.getElementById('zoomedImg');
    let imageScale = 1;

    // Buka zoom saat klik tombol View Project atau klik gambarnya langsung
    document.querySelectorAll('.view-project-btn, .mockup-img').forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            // Ambil path src gambar dari tab yang sedang aktif
            const tabPane = el.closest('.tab-pane');
            const imgSrc = tabPane.querySelector('.mockup-img').src;
            
            zoomedImg.src = imgSrc;
            imageScale = 1;
            zoomedImg.style.transform = `scale(${imageScale})`;
            zoomModal.classList.add('active');
        });
    });

    // Tutup Modal
    document.getElementById('closeModal').addEventListener('click', () => { 
        zoomModal.classList.remove('active'); 
    });
    
    zoomModal.addEventListener('click', (e) => { 
        if(e.target === zoomModal) {
            zoomModal.classList.remove('active'); 
        }
    });

    // Kontrol Zoom In & Out
    document.getElementById('zoomInBtn').addEventListener('click', () => {
        imageScale += 0.25;
        zoomedImg.style.transform = `scale(${imageScale})`;
    });
    
    document.getElementById('zoomOutBtn').addEventListener('click', () => {
        imageScale = Math.max(0.5, imageScale - 0.25); // Batas minimal zoom out
        zoomedImg.style.transform = `scale(${imageScale})`;
    });
});
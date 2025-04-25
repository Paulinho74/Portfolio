document.addEventListener("DOMContentLoaded", function () {
    const section = document.querySelector(".accueil") || document.querySelector(".contact") || document.querySelector(".afficheFootball");
    const heroImage = section ? section.querySelector("img") : null;
    const header = document.querySelector("header");

    if (!section || !header) return;

    // Toujours ajouter la classe loaded après un court délai
    setTimeout(() => {
        section.classList.add("loaded");

        // Si une image est présente (comme sur accueil/contact)
        if (heroImage) {
            // attendre la fin de transition pour rendre visible le header
            heroImage.addEventListener("transitionend", () => {
                header.classList.add("visible");
            });
        } else {
            // Sinon, sur les pages sans img (comme affiche-football), forcer l'apparition après un délai
            setTimeout(() => {
                header.classList.add("visible");
            }, 800); // Assez long pour laisser le temps à .loaded de faire effet
        }
    }, 500); // attend un peu pour déclencher .loaded

    // Effet de scroll / parallaxe
    window.addEventListener("scroll", () => {
        const scrollY = window.scrollY;
        const sectionHeight = section.offsetHeight;

        header.style.transform = `translateY(-${scrollY * 0.4}px)`;

        if (scrollY > sectionHeight / 3) {
            header.classList.add("hidden");
        } else {
            header.classList.remove("hidden");
        }
    });
});





// Intersection Observer pour détecter quand les images entrent dans la vue
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.2
  });

  document.querySelectorAll('.fade-img').forEach(img => {
    observer.observe(img);
  });



// CURSEUR SOURIS
document.addEventListener("DOMContentLoaded", () => {
    const cursor = document.createElement("div");
    cursor.classList.add("cursor");
    document.body.appendChild(cursor);

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let hasMoved = false;

    document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        if (!hasMoved) {
            hasMoved = true;
            cursor.classList.add("visible");
            cursorX = mouseX;
            cursorY = mouseY;
        }
    });

    function animate() {
        const dx = mouseX - cursorX;
        const dy = mouseY - cursorY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const speed = distance > 100 ? 0.1 : distance > 50 ? 0.15 : 0.2;


        cursorX += dx * speed;
        cursorY += dy * speed;

        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
        requestAnimationFrame(animate);
    }

    animate();
});



// IMAGES CLIQUABLE
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const closeBtn = document.querySelector('.lightbox .close-btn-img');


document.querySelectorAll('.fade-img').forEach(img => {
    img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightbox.classList.remove('hidden');
    });
});

// Fermer en cliquant sur la croix
closeBtn.addEventListener('click', () => {
    lightbox.classList.add('hidden');
});

// Fermer en cliquant en dehors de l'image
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.classList.add('hidden');
    }
});





// Active le scroll smooth sur tout le document
document.documentElement.style.scrollBehavior = 'smooth';




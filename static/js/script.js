// ===========================
// NAVBAR SCROLL
// ===========================

window.addEventListener("scroll", () => {

    const navbar = document.querySelector(".navbar");

    if (!navbar) return;

    if (window.scrollY > 50) {

        navbar.style.background =
            "rgba(3,15,43,.96)";

        navbar.style.backdropFilter =
            "blur(20px)";

    } else {

        navbar.style.background =
            "rgba(3,15,43,.85)";

    }

});

// ===========================
// FADE ANIMATION
// ===========================

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.style.opacity = "1";

            entry.target.style.transform =
                "translateY(0px)";

        }

    });

}, {
    threshold: .15
});

document.querySelectorAll(
    ".service-card, .project-card, .testimonial-card, .price-card, .member"
).forEach(el => {

    el.style.opacity = "0";

    el.style.transform =
        "translateY(40px)";

    el.style.transition =
        ".8s ease";

    observer.observe(el);

});

// ===========================
// HOVER PLANES
// ===========================

document.querySelectorAll(".price-card")
    .forEach(card => {

        card.addEventListener("mousemove", (e) => {

            const rect =
                card.getBoundingClientRect();

            const x =
                e.clientX - rect.left;

            const y =
                e.clientY - rect.top;

            const rotateY =
                ((x / rect.width) - 0.5) * 12;

            const rotateX =
                ((y / rect.height) - 0.5) * -12;

            card.style.transform =
                `perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                scale(1.03)`;

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform =
                "perspective(1000px) rotateX(0) rotateY(0) scale(1)";

        });

    });

// ===========================
// TOAST
// ===========================

function showToast(title, message) {

    const toast =
        document.getElementById("toast");

    const toastTitle =
        document.getElementById("toastTitle");

    const toastMessage =
        document.getElementById("toastMessage");

    if (!toast || !toastTitle || !toastMessage) return;

    toastTitle.textContent = title;

    toastMessage.textContent = message;

    toast.classList.remove("hidden");

    setTimeout(() => {

        toast.classList.add("show");

    }, 100);

    setTimeout(() => {

        toast.classList.remove("show");

        setTimeout(() => {

            toast.classList.add("hidden");

        }, 400);

    }, 3500);

}

// ===========================
// PLANES
// ===========================

document.querySelectorAll(".plan-btn")
    .forEach(btn => {

        btn.addEventListener("click", () => {

            showToast(
                "Plan seleccionado",
                "Tu plan fue seleccionado correctamente."
            );

        });

    });

// ===========================
// CONTACTO
// ===========================

const contactForm =
    document.querySelector(".contact form");

if (contactForm) {

    contactForm.addEventListener("submit", (e) => {

        e.preventDefault();

        showToast(
            "Consulta enviada",
            "Nos pondremos en contacto contigo pronto."
        );

        contactForm.reset();

    });

}
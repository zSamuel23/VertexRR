const form = document.getElementById("profileForm");
const previewSection = document.getElementById("previewSection");
const approvalSection = document.getElementById("approvalSection");
const historySection = document.getElementById("historyContainer");

// 📤 Enviar formulario
if (form) {

    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        const emprendimiento = {
            nombre: document.getElementById("businessName").value,
            descripcion: document.getElementById("businessDesc").value,
            telefono: document.getElementById("phone").value,
            website: document.getElementById("website").value,
            instagram: document.getElementById("instagram").value,
            facebook: document.getElementById("facebook").value,
            whatsapp: document.getElementById("whatsapp").value
        };

        try {

            const res = await fetch("/api/emprendimientos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(emprendimiento)
            });

            if (!res.ok) {
                throw new Error("Error del servidor");
            }

            await res.json();

            // Mostrar secciones ocultas
            previewSection.classList.remove("hidden");
            approvalSection.classList.remove("hidden");

            const historial = document.getElementById("historial");
            if (historial) {
                historial.classList.remove("hidden");
            }

            // Actualizar preview existente
            document.getElementById("previewName").textContent =
                emprendimiento.nombre;

            document.getElementById("previewDescription").textContent =
                emprendimiento.descripcion;

            document.getElementById("siteLink").href =
                emprendimiento.website || "#";

            document.getElementById("igLink").href =
                emprendimiento.instagram || "#";

            document.getElementById("fbLink").href =
                emprendimiento.facebook || "#";

            document.getElementById("waLink").href =
                emprendimiento.whatsapp || "#";

            // Vista previa del banner
            const bannerInput = document.getElementById("bannerInput");
            const previewBanner = document.getElementById("previewBanner");

            if (
                bannerInput &&
                bannerInput.files &&
                bannerInput.files[0]
            ) {

                const reader = new FileReader();

                reader.onload = function (event) {
                    previewBanner.src = event.target.result;
                };

                reader.readAsDataURL(
                    bannerInput.files[0]
                );
            }

            alert("Emprendimiento guardado ✔");

            form.reset();

            cargarEmprendimientos();

        } catch (error) {

            console.error(error);

            alert("Error al guardar");

        }

    });

}

// 📥 Cargar historial
async function cargarEmprendimientos() {

    if (!historySection) return;

    try {

        const res = await fetch(
            "/api/emprendimientos"
        );

        if (!res.ok) {
            throw new Error("Error del servidor");
        }

        const data = await res.json();

        historySection.innerHTML = "";

        data.forEach(emp => {

            const div = document.createElement("div");

            div.classList.add("history-card");

            div.innerHTML = `
                <h3>${emp.nombre}</h3>
                <p>${emp.descripcion}</p>
                <span class="pending">
                    Pendiente
                </span>
            `;

            historySection.appendChild(div);

        });

    } catch (error) {

        console.error(
            "Error cargando:",
            error
        );

    }

}

// 🚀 Al iniciar
document.addEventListener(
    "DOMContentLoaded",
    () => {
        cargarEmprendimientos();
    }
);
document.getElementById("toast").classList.add("show");
document.getElementById("toast").classList.remove("show");

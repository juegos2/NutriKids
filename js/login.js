
document.getElementById("login-overlay").style.display = "flex";

const TIEMPO_LIMITE = 15 * 60 * 1000;
function mostrarLogin() {
    const login = document.getElementById("login-overlay");
    const menu = document.getElementById("menu");
    const footer = document.querySelector("footer");

    if (login) login.style.display = "flex";
    if (menu) menu.classList.add("blur");
    if (footer) footer.classList.add("blur");

    document.body.classList.add("no-scroll");
}

function ocultarLogin() {
    const login = document.getElementById("login-overlay");
    const menu = document.getElementById("menu");
    const footer = document.querySelector("footer");

    if (login) login.style.display = "none";
    if (menu) menu.classList.remove("blur");
    if (footer) footer.classList.remove("blur");

    document.body.classList.remove("no-scroll");
}

function ingresar() {
    const nombre = document.getElementById("nombre").value.trim();
    const edad = document.getElementById("edad").value.trim();

    if (!nombre || !edad) {
        alert("Completa todos los campos");
        return;
    }

    localStorage.setItem("nombre", nombre);
    localStorage.setItem("edad", edad);

    localStorage.setItem("ultimoLogin", Date.now());

    ocultarLogin();
}

document.addEventListener("DOMContentLoaded", () => {
    const ultimoLogin = localStorage.getItem("ultimoLogin");
    const ahora = Date.now();

    if (!ultimoLogin || (ahora - ultimoLogin) > TIEMPO_LIMITE) {
        mostrarLogin();
    } else {
        ocultarLogin();
    }

    const inputNombre = document.getElementById("nombre");
    const inputEdad = document.getElementById("edad");

    if (!inputNombre || !inputEdad) return;

    inputNombre.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            inputEdad.focus();
        }
    });

    inputEdad.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            ingresar();
        }
    });
});

function toggleInfo() {
    const panel = document.getElementById("infoPanel");
    const arrow = document.getElementById("infoArrow");

    panel.classList.toggle("open");
    arrow.classList.toggle("up");
}
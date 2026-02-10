document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        document.getElementById("splash").style.display = "none";
        document.getElementById("menu").style.display = "block";

    }, 5000);
});

window.addEventListener("load", () => {
    document.body.classList.add("splash-activo");

    // Luego de X segundos desaparece el splash
    setTimeout(() => {
        document.getElementById("splash").style.display = "none";
        document.body.classList.remove("splash-activo");
    }, 4000); // ejemplo 3 segundos
});
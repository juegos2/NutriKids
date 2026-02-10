document.addEventListener("DOMContentLoaded", () => {
    const loader = document.getElementById("loader");
    const contenido = document.getElementById("contenido");

    setTimeout(() => {
        loader.style.display = "none";
        contenido.style.display = "block";
    }, 600);
});
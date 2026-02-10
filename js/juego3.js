let score = 0;
let aciertos = 0;
let rondaActual = 0;

/* ===============================
   REFERENCIAS AL DOM
================================ */
const intro = document.getElementById("intro-juego");
const tituloWrapper = document.querySelector(".titulo-wrapper");
const botonInicio = document.getElementById("boton-inicio");
const contenido = document.getElementById("contenido");
const resultado = document.getElementById("resultado");

const tarjetaContenido = contenido.querySelector(".tarjeta-juego");
const tarjetaResultado = resultado.querySelector(".tarjeta-juego");

const basket = document.getElementById("basket");
const mensaje = document.getElementById("mensaje");

const resNombre = document.getElementById("res-nombre");
const resPuntajePuntos = document.getElementById("res-puntaje-puntos");
const resPuntajeAciertos = document.getElementById("res-puntaje-aciertos");

const contenedorFoods = document.getElementById("foods-container");

/* ===============================
   UTILIDADES DE ANIMACIÓN
================================ */
function animarEntradaTarjeta(tarjeta) {
    tarjeta.classList.remove("mostrar", "ocultar");
    void tarjeta.getBoundingClientRect();
    tarjeta.classList.add("mostrar");
}

function animarSalidaTarjeta(tarjeta) {
    tarjeta.classList.remove("mostrar");
    tarjeta.classList.add("ocultar");
}

/* ===============================
   INICIO
================================ */
window.addEventListener("load", () => {
    intro.style.display = "flex";
    tituloWrapper.classList.add("mostrar");
    botonInicio.classList.add("mostrar");
});

botonInicio.addEventListener("click", iniciarJuego);

function iniciarJuego() {
    botonInicio.classList.remove("mostrar");
    botonInicio.classList.add("ocultar");
    tituloWrapper.classList.remove("mostrar");
    tituloWrapper.classList.add("ocultar");

    setTimeout(() => {
        intro.style.display = "none";
        contenido.style.display = "flex";
        resultado.style.display = "none";

        score = 0;
        aciertos = 0;
        rondaActual = 0;

        cargarRonda();
        animarEntradaTarjeta(tarjetaContenido);
    }, 600);
}

/* ===============================
   RONDAS DEL JUEGO
================================ */
const rondas = [
    [
        { src: "img/juego3/ronda1/manzana.png", good: true },
        { src: "img/juego3/ronda1/banana.png", good: true },
        { src: "img/juego3/ronda1/chupete.png", good: false },
        { src: "img/juego3/ronda1/caramelo.png", good: false },
        { src: "img/juego3/ronda1/pina.png", good: true }
    ],
    [
        { src: "img/juego3/ronda2/bebidaener.png", good: false },
        { src: "img/juego3/ronda2/jugo.png", good: true },
        { src: "img/juego3/ronda2/gaseosa.png", good: false },
        { src: "img/juego3/ronda2/agua.png", good: true },
        { src: "img/juego3/ronda2/te.png", good: true }
    ],
    [
        { src: "img/juego3/ronda3/harina.png", good: true },
        { src: "img/juego3/ronda3/frutoseco.png", good: true },
        { src: "img/juego3/ronda3/cereal.png", good: false },
        { src: "img/juego3/ronda3/dona.png", good: false },
        { src: "img/juego3/ronda3/pan.png", good: true }
    ],
    [
        { src: "img/juego3/ronda4/hamburguesa.png", good: false },
        { src: "img/juego3/ronda4/zanahoria.png", good: true },
        { src: "img/juego3/ronda4/pimiento.png", good: true },
        { src: "img/juego3/ronda4/brocoli.png", good: true },
        { src: "img/juego3/ronda4/pizza.png", good: false }
    ],
    [
        { src: "img/juego3/ronda5/tocino.png", good: false },
        { src: "img/juego3/ronda5/pollo.png", good: false },
        { src: "img/juego3/ronda5/pescado.png", good: true },
        { src: "img/juego3/ronda5/queso.png", good: true },
        { src: "img/juego3/ronda5/frijoles.png", good: true }
    ]
];

/* ===============================
   CARGAR RONDA
================================ */
function cargarRonda() {
    contenedorFoods.innerHTML = "";
    mensaje.textContent = `Ronda ${rondaActual + 1}`;

    rondas[rondaActual].forEach(item => {
        const img = document.createElement("img");
        img.src = item.src;
        img.classList.add("food");
        if (item.good) img.classList.add("good");
        else img.classList.add("bad");
        img.draggable = true;

        activarDrag(img);
        contenedorFoods.appendChild(img);
    });
}

/* ===============================
   DRAG & DROP
================================ */
function activarDrag(food) {
    food.addEventListener("dragstart", () => food.classList.add("dragging"));
    food.addEventListener("dragend", () => food.classList.remove("dragging"));
}

basket.addEventListener("dragover", e => e.preventDefault());

basket.addEventListener("drop", () => {
    const food = document.querySelector(".dragging");
    if (!food) return;

    if (food.classList.contains("good")) {
        food.style.opacity = "0.5";
        mensaje.textContent = "✅ ¡Correcto!";
        food.remove();
        aciertos++; // Cuenta de aciertos
    } else {
        food.style.opacity = "0.5";
        mensaje.textContent = "❌ Ese alimento no es saludable";
    }

    setTimeout(comprobarFin, 500);
});

/* ===============================
   FIN DE RONDA / JUEGO
================================ */
function comprobarFin() {
    const buenos = document.querySelectorAll(".food.good");

    if (buenos.length === 0) {
        animarSalidaTarjeta(tarjetaContenido);

        rondaActual++;
        if (rondaActual < rondas.length) {
            setTimeout(() => {
                cargarRonda();
                animarEntradaTarjeta(tarjetaContenido);
            }, 600);
        } else {
            setTimeout(mostrarResultado, 400);
        }
    }
}

/* ===============================
   RESULTADO FINAL
================================ */
function mostrarResultado() {
    contenido.style.display = "none";
    resultado.style.display = "flex";

    const nombre = localStorage.getItem("nombre") || "Jugador";
    resNombre.textContent = nombre;

    const totalAciertosPosibles = rondas.reduce((total, ronda) => total + ronda.filter(f => f.good).length, 0);

    // Escalar score a 100 puntos
    score = Math.round((aciertos / totalAciertosPosibles) * 100);

    resPuntajePuntos.textContent = `${score} puntos`;
    resPuntajeAciertos.textContent = `${aciertos} / ${totalAciertosPosibles}`;

    animarEntradaTarjeta(tarjetaResultado);
    lanzarConfeti();
}

/* ===============================
   CONFETI
================================ */
function lanzarConfeti() {
    let canvas = document.getElementById("confeti-canvas");
    if (!canvas) {
        canvas = document.createElement("canvas");
        canvas.id = "confeti-canvas";
        document.body.appendChild(canvas);
        canvas.style.position = "fixed";
        canvas.style.top = 0;
        canvas.style.left = 0;
        canvas.style.width = "100vw";
        canvas.style.height = "100vh";
        canvas.style.pointerEvents = "none";
        canvas.style.zIndex = 10;
    }

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confeti = [];
    const colores = ["#f94144","#f3722c","#f9c74f","#90be6d","#577590","#43aa8b","#4d908e"];

    for (let i=0;i<100;i++){
        const x = Math.random()*canvas.width;
        const y = Math.random()*-canvas.height;
        const speedX = Math.random()*4-2;
        const speedY = Math.random()*5+5;
        confeti.push({
            x:x, y:y, r:Math.random()*10+6, color:colores[Math.floor(Math.random()*colores.length)],
            dx:speedX, dy:speedY, tilt:Math.random()*10-5, tiltAngle:0, tiltSpeed:Math.random()*0.1+0.05
        });
    }

    function draw(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        confeti.forEach(c=>{
            ctx.beginPath();
            ctx.lineWidth=c.r/2;
            ctx.strokeStyle=c.color;
            ctx.moveTo(c.x+c.tilt,c.y);
            ctx.lineTo(c.x+c.tilt+c.r/2,c.y+c.r/2);
            ctx.stroke();

            c.x += c.dx;
            c.y += c.dy;
            c.tiltAngle += c.tiltSpeed;
            c.tilt = Math.sin(c.tiltAngle)*15;

            if(c.y>canvas.height){
                c.y = Math.random()*-50;
                c.x = Math.random()*canvas.width;
            }
        });
        requestAnimationFrame(draw);
    }

    draw();
    setTimeout(()=>ctx.clearRect(0,0,canvas.width,canvas.height),5000);
}
const preguntas = [
    { 
        texto: "Las frutas se deben comer solo una vez a la semana.", 
        correcta: false,
        imagen: "img/juego1/preguntas1/p101.jpg"
    },
    { 
        texto: "Comer muchos dulces todos los días es bueno para la salud.", 
        correcta: false,
        imagen: "img/juego1/preguntas1/p102.jpg"
    },
    { 
        texto: "Las frutas nos dan energía para jugar y aprender.", 
        correcta: true,
        imagen: "img/juego1/preguntas1/p103.jpg"
    },
    { 
        texto: "Las papas fritas son más saludables que las verduras.", 
        correcta: false,
        imagen: "img/juego1/preguntas1/p104.jpg"
    },
    { 
        texto: "Es importante desayunar antes de empezar el día.", 
        correcta: true,
        imagen: "img/juego1/preguntas1/p105.jpg"
    },
    { 
        texto: "El agua no es importante para nuestro cuerpo.", 
        correcta: false,
        imagen: "img/juego1/preguntas1/p106.jpg"
    },
    { 
        texto: "La comida rápida es el mejor alimento para todos los días.", 
        correcta: false,
        imagen: "img/juego1/preguntas1/p107.jpg"
    },
    { 
        texto: "El pescado ayuda al cerebro y a la memoria.", 
        correcta: true,
        imagen: "img/juego1/preguntas1/p108.jpg"
    },
    {
        texto: "Las naranjas ayudan a cuidar nuestras defensas.", 
        correcta: true,
        imagen: "img/juego1/preguntas1/p109.jpg"
    },
    { 
        texto: "Las frutas y verduras tienen vitaminas que ayudan a crecer sanos.", 
        correcta: true,
        imagen: "img/juego1/preguntas1/p110.jpg"
    }
];

let indice = 0;
let puntos = 0;   
let aciertos = 0; 

const intro = document.getElementById("intro-juego");
const tituloWrapper = document.querySelector(".titulo-wrapper");
const botonInicio = document.getElementById("boton-inicio");
const contenido = document.getElementById("contenido");
const imagenPregunta = document.getElementById("imagen-pregunta");
const resultado = document.getElementById("resultado");

const tarjetaContenido = contenido.querySelector(".tarjeta-juego");
const tarjetaResultado = resultado.querySelector(".tarjeta-juego");

const preguntaElem = document.getElementById("pregunta");
const botones = document.querySelectorAll(".opcion");
const mensajeElem = document.getElementById("mensaje");

const resNombre = document.getElementById("res-nombre");
const resPuntajePuntos = document.getElementById("res-puntaje-puntos");
const resPuntajeAciertos = document.getElementById("res-puntaje-aciertos");

function animarEntradaTarjeta(tarjeta) {
    tarjeta.classList.remove("mostrar");
    tarjeta.classList.remove("ocultar");
    void tarjeta.getBoundingClientRect();
    tarjeta.classList.add("mostrar");
}

function animarSalidaTarjeta(tarjeta) {
    tarjeta.classList.remove("mostrar");
    tarjeta.classList.add("ocultar");
}

window.addEventListener("load", () => {
    intro.style.display = "flex";
    tituloWrapper.classList.add("mostrar");
    botonInicio.classList.add("mostrar");
});

botonInicio.addEventListener("click", iniciarJuego);

function iniciarJuego() {
    tituloWrapper.classList.remove("mostrar");
    tituloWrapper.classList.add("ocultar");
    botonInicio.classList.remove("mostrar");
    botonInicio.classList.add("ocultar");

    setTimeout(() => {
        intro.style.display = "none";
        contenido.style.display = "flex";

        indice = 0;
        puntos = 0;
        aciertos = 0;

        cargarPregunta();
        animarEntradaTarjeta(tarjetaContenido);
    }, 800);
}

function cargarPregunta() {
    const p = preguntas[indice];

    preguntaElem.textContent = p.texto;
    imagenPregunta.src = p.imagen;

    botones[0].textContent = "Verdadero";
    botones[1].textContent = "Falso";

    botones.forEach((btn, i) => {
        btn.disabled = false;
        btn.style.backgroundColor = "#61A2FF";
        btn.onclick = () => responder(i === 0);
    });

    mensajeElem.textContent = "";
}

function responder(valor) {
    const p = preguntas[indice];

    botones.forEach(btn => btn.disabled = true);

    if (valor === p.correcta) {
        puntos += 10;
        aciertos += 1;
        botones[valor ? 0 : 1].style.backgroundColor = "#4CAF50";
    } else {
        botones[valor ? 0 : 1].style.backgroundColor = "#F44336";
        botones[p.correcta ? 0 : 1].style.backgroundColor = "#4CAF50";
    }

    setTimeout(() => {
        animarSalidaTarjeta(tarjetaContenido);

        setTimeout(() => {
            indice++;
            if (indice < preguntas.length) {
                cargarPregunta();
                animarEntradaTarjeta(tarjetaContenido);
            } else {
                mostrarResultado();
            }
        }, 600);
    }, 1000);
}

function mostrarResultado() {
    contenido.style.display = "none";
    resultado.style.display = "flex";

    const nombre = localStorage.getItem("nombre") || "Jugador";
    resNombre.textContent = nombre;

    resPuntajePuntos.textContent = `${puntos} puntos`;
    resPuntajeAciertos.textContent = `${aciertos} / ${preguntas.length}`;

    animarEntradaTarjeta(tarjetaResultado);
    lanzarConfeti();
}

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
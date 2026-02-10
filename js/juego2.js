const preguntas = [
    { 
        texto: "¿De dónde viene la leche?", 
        opciones: ["De los arboles", "De las vacas", "Del mar", "De las piedras"], 
        correcta: 1,
        imagen: "img/juego2/preguntas2/p201.jpg"
    },
    { 
        texto: "¿Dónde crece la zanahoria?", 
        opciones: ["Bajo la tierra", "En el agua", "En las nubes", "En los arboles"], 
        correcta: 0,
        imagen: "img/juego2/preguntas2/p202.jpg"
    },
    { 
        texto: "¿De qué se hace el pan?", 
        opciones: ["De frutas", "De carne", "De harina de trigo", "De leche"], 
        correcta: 2,
        imagen: "img/juego2/preguntas2/p203.jpg"
    },
    { 
        texto: "¿De dónde vienen los huevos?", 
        opciones: ["De las vacas", "Del mar", "De los arboles", "De las gallinas"], 
        correcta: 3,
        imagen: "img/juego2/preguntas2/p204.jpg"
    },
    { 
        texto: "¿Dónde crece el maíz?", 
        opciones: ["En la tierra", "En las fabricas", "En las rocas", "En el mar"], 
        correcta: 0,
        imagen: "img/juego2/preguntas2/p205.jpg"
    },
    { 
        texto: "¿De dónde viene el pescado?", 
        opciones: ["Del rio o del mar", "De la granja", "De la granja", "De la montaña"], 
        correcta: 0,
        imagen: "img/juego2/preguntas2/p206.jpg"
    },
    { 
        texto: "¿De dónde viene el pollo que comemos?", 
        opciones: ["De las plantas", "De las gallinas", "Del mar", "De los arboles"], 
        correcta: 1,
        imagen: "img/juego2/preguntas2/p207.jpg"
    },
    { 
        texto: "¿De dónde viene la carne de res?", 
        opciones: ["De las gallinas", "De las plantas", "De los peces", "De las vacas"], 
        correcta: 3,
        imagen: "img/juego2/preguntas2/p208.jpg"
    },
    { 
        texto: "¿Dónde crece la papa?", 
        opciones: ["En los arboles", "Bajo la tierra", "En las rocas", "En el agua"], 
        correcta: 1,
        imagen: "img/juego2/preguntas2/p209.jpg"
    },
    { 
        texto: "¿De dónde viene la miel?", 
        opciones: ["De los arboles", "De las abejas", "De las flores", "De la lluvia"], 
        correcta: 1,
        imagen: "img/juego2/preguntas2/p210.jpg"
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

        botones.forEach((btn, i) => {
            btn.addEventListener("click", () => responder(i));
        });

        cargarPregunta();
        animarEntradaTarjeta(tarjetaContenido);
    }, 800);
}

function cargarPregunta() {
    const p = preguntas[indice];

    preguntaElem.textContent = p.texto;
    imagenPregunta.src = p.imagen; // ⭐ ESTA ES LA CLAVE

    botones.forEach((btn, i) => {
        btn.textContent = p.opciones[i];
        btn.disabled = false;
        btn.style.backgroundColor = "#61A2FF";
    });

    mensajeElem.textContent = "";
}

function responder(opcion) {
    const p = preguntas[indice];

    botones.forEach(btn => btn.disabled = true);

    if (opcion === p.correcta) {
        puntos += 10;    
        aciertos += 1;   
        botones[opcion].style.backgroundColor = "#4CAF50";
    } else {
        botones[opcion].style.backgroundColor = "#F44336";
        botones[p.correcta].style.backgroundColor = "#4CAF50";
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
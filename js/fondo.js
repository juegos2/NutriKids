const canvas = document.getElementById("fondo-canvas");
const ctx = canvas.getContext("2d");

let w, h;
function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

class Cloud {
    constructor() {
        this.reset();
        this.x = Math.random() * w;
    }

    reset() {
        this.y = Math.random() * h * 0.6;
        this.size = 60 + Math.random() * 80;
        this.speed = 0.2 + Math.random() * 0.4;
        this.opacity = 0.6 + Math.random() * 0.3;
        this.x = -200;
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = "#ffffff";

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 0.4, 0, Math.PI * 2);
        ctx.arc(this.x + this.size * 0.4, this.y - this.size * 0.2, this.size * 0.5, 0, Math.PI * 2);
        ctx.arc(this.x + this.size * 0.8, this.y, this.size * 0.4, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }

    update() {
        this.x += this.speed;
        if (this.x > w + 200) this.reset();
        this.draw();
    }
}

const clouds = [];
for (let i = 0; i < 10; i++) {
    clouds.push(new Cloud());
}

function animate() {
    ctx.clearRect(0, 0, w, h);

    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, "#87CEEB");
    grad.addColorStop(1, "#E0F6FF");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    clouds.forEach(c => c.update());

    requestAnimationFrame(animate);
}

animate();
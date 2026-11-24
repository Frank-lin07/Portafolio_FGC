    const boton = document.getElementById('botonMenu');
    const menu = document.getElementById('menuInmersion');
    const textoGota = document.getElementById('gotaTexto');
    const reducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let abierto = false;
    let animando = false;

    function centroGota() {
    const r = boton.getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    }

    function radioMaximo(c) {
    return Math.hypot(
        Math.max(c.x, window.innerWidth - c.x),
        Math.max(c.y, window.innerHeight - c.y)
    );
    }

function crearOndas(c, R) {
    const capa = document.getElementById('menuOndas');
    capa.innerHTML = '';
    const diametros = [R * 0.5, R * 0.95, R * 1.4, R * 1.85];
    diametros.forEach(function (d) {
    const onda = document.createElement('div');
    onda.className = 'onda';
    onda.style.width = d + 'px';
    onda.style.height = d + 'px';
    onda.style.left = (c.x - d / 2) + 'px';
    onda.style.top = (c.y - d / 2) + 'px';
    capa.appendChild(onda);
    });
}

    function abrirMenu() {
    if (animando) return;
    animando = true;
    abierto = true;

    const c = centroGota();
    const R = radioMaximo(c);
    const duracion = reducido ? 300 : 900;
    
    menu.style.clipPath = 'circle(0px at ' + c.x + 'px ' + c.y + 'px)';
    menu.classList.add('abierto');
    menu.setAttribute('aria-hidden', 'false');
    boton.setAttribute('aria-expanded', 'true');
    boton.setAttribute('aria-label', 'Cerrar menú');
    textoGota.textContent = 'Cerrar';
    document.body.classList.add('menu-abierto');

    crearOndas(c, R);
    anime.set('.menu-enlace', { opacity: 0, translateY: 40 });
    anime.set('.menu-pie', { opacity: 0 });

    anime({
        targets: menu,
        clipPath: [
        'circle(0px at ' + c.x + 'px ' + c.y + 'px)',
        'circle(' + R + 'px at ' + c.x + 'px ' + c.y + 'px)'
        ],
        duration: duracion,
        easing: 'easeInOutQuart',
        complete: function () { animando = false; }
    });

    if (reducido) {
        anime.set('.menu-enlace', { translateY: 0 });
        anime({
        targets: '.menu-enlace, .menu-pie',
        opacity: [0, 1],
        duration: 300,
        easing: 'linear'
        });
        return;
    }

    anime({
        targets: '.onda',
        scale: [0.2, 1],
        opacity: [0, 1],
        delay: anime.stagger(140, { start: 200 }),
        duration: 1300,
        easing: 'easeOutQuad'
    });

    anime({
        targets: '.menu-enlace',
        opacity: [0, 1],
        translateY: [40, 0],
        delay: anime.stagger(110, { start: 400 }),
        duration: 700,
        easing: 'easeOutCubic'
    });

    anime({
        targets: '.menu-pie',
        opacity: [0, 1],
        delay: 950,
        duration: 500,
        easing: 'linear'
    });
    }

    function cerrarMenu() {
    if (animando) return;
    animando = true;
    abierto = false;

    const c = centroGota();
    const R = radioMaximo(c);

    anime({
        targets: '.menu-enlace, .menu-pie',
        opacity: 0,
        duration: reducido ? 0 : 250,
        easing: 'linear'
    });

    anime({
        targets: menu,
        clipPath: [
        'circle(' + R + 'px at ' + c.x + 'px ' + c.y + 'px)',
        'circle(0px at ' + c.x + 'px ' + c.y + 'px)'
        ],
        duration: reducido ? 300 : 700,
        easing: 'easeInOutQuart',
        complete: function () {
        menu.classList.remove('abierto');
        menu.setAttribute('aria-hidden', 'true');
        boton.setAttribute('aria-expanded', 'false');
        boton.setAttribute('aria-label', 'Abrir menú');
        textoGota.textContent = 'Menú';
        document.body.classList.remove('menu-abierto');
        animando = false;
        }
    });
    }

    boton.addEventListener('click', function () {
    if (abierto) { cerrarMenu(); } else { abrirMenu(); }
    });

    document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && abierto) { cerrarMenu(); }
    });

function animarEntrada() {
    const entrada = document.getElementById('inicio');
    if (!entrada) return;

    const capa = document.getElementById('entradaOndas');
    const gotaEl = document.getElementById('gotaCae');
    const revelar = entrada.querySelectorAll('[data-reveal]');

    [260, 460, 700, 960, 1260].forEach(function (d) {
    const anillo = document.createElement('div');
    anillo.className = 'anillo-entrada';
    anillo.style.width = d + 'px';
    anillo.style.height = d + 'px';
    anillo.style.marginLeft = (-d / 2) + 'px';
    anillo.style.marginTop = (-d / 2) + 'px';
    capa.appendChild(anillo);
    });

    if (reducido) return;

    anime.set(revelar, { opacity: 0, translateY: 30 });
    anime.set('.anillo-entrada', { opacity: 0, scale: 0.3 });

    const destino = entrada.offsetHeight / 2 - 10;

    anime.timeline({ easing: 'easeOutQuad' })
    .add({
        targets: gotaEl,
        opacity: [0, 1],
        translateY: [-20, destino],
        duration: 800,
        easing: 'easeInQuad'
    })
    .add({
        targets: gotaEl,
        scale: [1, 0],
        opacity: 0,
        duration: 200
    })
    .add({
        targets: '.anillo-entrada',
        opacity: [0, 1],
        scale: [0.3, 1],
        delay: anime.stagger(120),
        duration: 1400,
        easing: 'easeOutQuart'
    }, '-=100')
    .add({
        targets: revelar,
        opacity: [0, 1],
        translateY: [30, 0],
        delay: anime.stagger(150),
        duration: 800,
        easing: 'easeOutCubic'
    }, '-=1000');
}

animarEntrada();

function activarRevelado() {
    if (reducido || !('IntersectionObserver' in window)) return;

    const DISTANCIA = 70;    
    const DURACION = 1500;   
    const ESPERA = 220;      

    document.querySelectorAll('main section').forEach(function (seccion) {
        const items = seccion.querySelectorAll('.revelar');
        if (!items.length) return;

        anime.set(items, { opacity: 0, translateY: DISTANCIA });

        const observador = new IntersectionObserver(function (entradas) {
        if (entradas[0].isIntersecting) {
            anime({
            targets: items,
            opacity: [0, 1],
            translateY: [DISTANCIA, 0],
            delay: anime.stagger(ESPERA),
            duration: DURACION,
            easing: 'easeOutQuart'
            });
            observador.disconnect();
        }
        }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });

        observador.observe(seccion);
    });
}

activarRevelado();

function animarOndaAudio() {
    const contenedor = document.getElementById('barrasAudio');
    if (!contenedor) return;

    const alturas = [0.25, 0.5, 0.35, 0.8, 0.55, 0.95, 0.4, 0.7, 0.3, 0.85, 0.5, 0.65, 0.3, 0.9, 0.45, 0.6, 0.35, 0.75, 0.4, 0.55, 0.3, 0.45];

    alturas.forEach(function (a) {
        const barra = document.createElement('span');
        barra.className = 'barra';
        barra.style.transform = 'scaleY(' + a + ')';
        contenedor.appendChild(barra);
    });

    if (reducido) return;

    anime({
        targets: '.barra',
        scaleY: function (el, i) { return [alturas[i], Math.min(1, alturas[i] + 0.35)]; },
        direction: 'alternate',
        loop: true,
        delay: anime.stagger(90),
        duration: 600,
        easing: 'easeInOutSine'
    });
}

animarOndaAudio();
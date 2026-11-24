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
    menu.querySelectorAll('.onda').forEach(function (o) { o.remove(); });
    const diametros = [R * 0.5, R * 0.95, R * 1.4, R * 1.85];
    diametros.forEach(function (d) {
        const onda = document.createElement('div');
        onda.className = 'onda';
        onda.style.width = d + 'px';
        onda.style.height = d + 'px';
        onda.style.left = (c.x - d / 2) + 'px';
        onda.style.top = (c.y - d / 2) + 'px';
        menu.appendChild(onda);
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
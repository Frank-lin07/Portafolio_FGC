# Portafolio FGC
# Portafolio digital: Franklin Grisales Castrillón

Portafolio profesional de Franklin Grisales Castrillón, Diseñador Crossmedia y
Realizador Audiovisual. Momento Evaluativo 2 de Aplicaciones móviles y web
(UCC), Ruta B: desarrollo a medida. **Versión 2**, rehecha tras la revisión del
docente con una identidad más propia.

- **Sitio publicado:** https://franklin-grisales-castrillon.netlify.app
- **Prototipo y Design System (Figma):** https://www.figma.com/design/Tx8rmeRJXL15LL96Dg6vW5/Portafolio_FGC?node-id=0-1&t=Gbws3d3WxrYF8r6U-1
- **Repositorio:** https://github.com/Frank-lin07/Portafolio_FGC

### Versión 1 (evidencia del proceso)
Tras la revisión del docente, el sitio se rehízo desde cero con una identidad más propia.
La primera versión se conserva como evidencia:

- Sitio: https://portafoliofgc.netlify.app
- Repositorio: https://github.com/Frank-lin07/FGC_portafolio_NO
- Figma: https://www.figma.com/design/qSoP1aijzwWpbzeHirBcEX/FGC_Portafolio_NO

## Concepto

Una navegación pensada como **inmersión**: el sitio nace en el agua (mi
trayectoria como nadador) y cada página es una profundidad: Inicio 00 m,
Proyectos 02 m, Sobre mí 04 m y Contacto 06 m. El distintivo visual son las
**ondas concéntricas**, como gotas cayendo en el agua, y una onda de audio como
guiño al trabajo sonoro.

## Tecnologías

- HTML5, CSS3 y JavaScript.
- Bootstrap 5.3 (por CDN) para la cuadrícula y el responsive.
- Anime.js 3.2 para las animaciones.
- Tipografías de Google Fonts: Montserrat y Spectral.
- Publicación en Netlify.

**Por qué esta ruta:** los tokens del Design System son variables CSS que
controlan todo el sitio. Bootstrap pone la estructura; la identidad visual y los
componentes son propios y se cargan después para prevalecer.

## Estructura

```
├── index.html        Inicio
├── proyectos.html    Proyectos (5 casos de estudio)
├── perfil.html       Sobre mí y contacto
├── css/
│   ├── tokens.css    Design tokens: color, tipografía, espaciado, bordes, movimiento
│   └── estilos.css   Componentes y estilos de las páginas
├── js/main.js        Menú de inmersión, animaciones y formulario
└── imgs/             Monograma FGC, ondas concéntricas y retrato
```

## Design System y Atomic Design

Los tokens de `tokens.css` son los mismos de las variables de Figma.

| Nivel | Componentes (Figma y código) |
|---|---|
| Átomos | Botón primario, chip de habilidad, gota de menú, monograma |
| Moléculas | Campo con etiqueta y con error, tarjeta de proyecto, caso de estudio, bloque de método, reproductor de audio |
| Organismos | Cabecera, menú de inmersión, formulario, footer |
| Plantillas | Cabecera, contenido y footer compartidos por las tres páginas |
| Páginas | Inicio, Proyectos, Sobre mí y contacto |

## Animaciones (Anime.js)

- Menú: un círculo se expande desde la gota, aparecen anillos y los enlaces suben escalonados.
- Entrada del Inicio: una gota cae y las ondas revelan el nombre.
- Aparición escalonada del contenido al hacer scroll.
- Onda de audio con movimiento suave y reproductor animado.
- Se respeta `prefers-reduced-motion`.

## Accesibilidad

Enlace para saltar al contenido, foco visible, etiquetas en todos los campos,
texto alternativo en imágenes, mensajes de formulario anunciados a lectores de
pantalla y menú navegable con teclado (Esc lo cierra).

## Cómo ejecutarlo

Sitio estático: usar la extensión Live Server en VS Code. No requiere
instalación. Las máscaras del monograma necesitan un servidor, así que no abrir
el HTML con doble clic.

## Pendientes (Momento 3)

- Imágenes, video y audio reales de los proyectos (hoy hay marcadores).
- Perfiles de Behance y LinkedIn.
- Envío real del formulario (hoy solo valida en el navegador).
- Monograma con corte ondulado.
- Estados de componentes aún sin documentar en Figma.
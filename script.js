const $carta = document.querySelectorAll('.carta');
const $puntaje = document.querySelector('#puntaje');

let imagenes = ["/imgs/chandler.jpeg", "/imgs/joey.jpg", "/imgs/monica.webp", "/imgs/phoebe.jpeg", "/imgs/rachel.webp", "/imgs/ross.webp"];
let listaUrlImagenesClickeadas = [];
let listaIdsImagenesClickeadas = [];
let listaImagenCobertora = [];
let contador = 0;
let puntaje = 0;


window.onload = function () {
    ordenarImagenes();
};

function ordenarImagenes() {
    imagenes = [...imagenes, ...imagenes]
    imagenes.sort(() => Math.random() - 0.5);
}

document.onclick = clickUsuario;

function clickUsuario(e) {
    const IMAGEN_CLICKEADA = e.target.id;
    const PRIMER_IMAGEN = e.target.src;
    listaIdsImagenesClickeadas.push(IMAGEN_CLICKEADA)
    listaImagenCobertora.push(PRIMER_IMAGEN);
    if ((/^[0-9]/).test(IMAGEN_CLICKEADA)) {
        puntaje++
        $puntaje.innerHTML = puntaje;
        mostrarImagen(IMAGEN_CLICKEADA)
    }
}

function mostrarImagen(IMAGEN_CLICKEADA) {
    $carta[IMAGEN_CLICKEADA].setAttribute("src", imagenes[IMAGEN_CLICKEADA]);
    const URL_IMAGEN = $carta[IMAGEN_CLICKEADA].src;
    listaUrlImagenesClickeadas.push(URL_IMAGEN);
    comparar(IMAGEN_CLICKEADA);
}

function comparar(IMAGEN_CLICKEADA) {
    contador++;
    if (contador === 1) {
        $carta[IMAGEN_CLICKEADA].setAttribute("src", imagenes[IMAGEN_CLICKEADA]);
    }
    if (contador > 1) {
        if (listaUrlImagenesClickeadas[listaUrlImagenesClickeadas.length - 2] === listaUrlImagenesClickeadas[listaUrlImagenesClickeadas.length - 1]) {
            setTimeout(() => {
                $carta[listaIdsImagenesClickeadas[listaIdsImagenesClickeadas.length - 1]].style.visibility = "hidden"
                $carta[listaIdsImagenesClickeadas[listaIdsImagenesClickeadas.length - 2]].style.visibility = "hidden"
                compronarGano();
            }, 200);
        } else {
            setTimeout(() => {
                $carta[listaIdsImagenesClickeadas[listaIdsImagenesClickeadas.length - 1]].setAttribute("src", listaImagenCobertora[listaImagenCobertora.length - 1]);
                $carta[listaIdsImagenesClickeadas[listaIdsImagenesClickeadas.length - 2]].setAttribute("src", listaImagenCobertora[listaImagenCobertora.length - 2]);
            }, 200);
        }
        contador = 0;

    }
}

/*
function compronarGano() {
    if ($carta[].style.visibility === "hidden") {
        alert('ganaste')
    }
}
*/
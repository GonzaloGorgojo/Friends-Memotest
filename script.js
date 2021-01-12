const $carta = document.querySelectorAll('.carta');
const $puntaje = document.querySelector('#puntaje');
const $mayorPuntaje = document.querySelector('#mayorPuntaje');
const $botonReinicio = document.querySelector('#botonReinicio');

let imagenes = ["./imgs/android.png", "./imgs/mac.png", "./imgs/firefox.png", "./imgs/google.png", "./imgs/linux.png", "./imgs/windows.png"];
let numerosImagenes = ["./numbers/1.png", "./numbers/2.png", "./numbers/3.png", "./numbers/4.png", "./numbers/5.png", "./numbers/6.png", "./numbers/7.png", "./numbers/8.png", "./numbers/9.png", "./numbers/10.png", "./numbers/11.png", "./numbers/12.png",]

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
        if (listaIdsImagenesClickeadas[listaIdsImagenesClickeadas.length - 2] === listaIdsImagenesClickeadas[listaIdsImagenesClickeadas.length - 1]) {
            $carta[listaIdsImagenesClickeadas[listaIdsImagenesClickeadas.length - 2]].setAttribute("src", listaImagenCobertora[listaImagenCobertora.length - 2]);
        }
        else if (listaUrlImagenesClickeadas[listaUrlImagenesClickeadas.length - 2] === listaUrlImagenesClickeadas[listaUrlImagenesClickeadas.length - 1]) {
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

function compronarGano() {
    let listadoAcertadas = [];
    for (let i = 0; i < $carta.length; i++) {
        if ($carta[i].style.visibility === "hidden") {
            listadoAcertadas.push(i)
        }
    }
    if (listadoAcertadas.length === 12) {
        $mayorPuntaje.innerHTML = Number($puntaje.innerHTML);
        alert('Felicitaciones Ganaste !');
        if (Number($mayorPuntaje.innerHTML) > Number($puntaje.innerHTML)) {
            $mayorPuntaje.innerHTML = $puntaje.innerHTML;
        }
        puntaje = 0;
        $puntaje.innerHTML = puntaje;
        $botonReinicio.style.display = 'block';
    }
}
$botonReinicio.onclick = function () {
    $botonReinicio.style.display = 'none';
    for (let i = 0; i < $carta.length; i++) {
        $carta[i].style.visibility = 'visible';
        $carta[i].setAttribute("src", numerosImagenes[i])
    }
    imagenes.sort(() => Math.random() - 0.5);
}

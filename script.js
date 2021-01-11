const $carta = document.querySelectorAll('.carta');

let imagenes = ["/imgs/chandler.jpeg", "/imgs/joey.jpg", "/imgs/monica.webp", "/imgs/phoebe.jpeg", "/imgs/rachel.webp", "/imgs/ross.webp"];
let listaClicks = [];
let listaImagenCobertora = [];
let contador = 0;


function juegaUsuario() {
    document.onclick = clickUsuario;
}
juegaUsuario();

function clickUsuario(e) {
    const click = e.target.id;
    const PRIMER_IMAGEN = e.target.src;
    listaImagenCobertora.push(PRIMER_IMAGEN)
    if ((/^[0-9]/).test(click)) {
        mostrarImagen(click - 1)

    }
}

function mostrarImagen(numeroImagen) {
    let numeroAleatorio = ObtenerNumeroAleatorio();
    $carta[numeroImagen].setAttribute("src", imagenes[numeroAleatorio]);
    const url = $carta[numeroImagen].src;
    listaClicks.push(url);
    comparar(numeroImagen, numeroAleatorio);
}

function comparar(numeroImagen, numeroAleatorio) {
    contador++;
    console.log(contador)
    if (contador === 1) {
        $carta[numeroImagen].setAttribute("src", imagenes[numeroAleatorio]);
    }
    if (contador > 1) {
        if (listaClicks[listaClicks.length - 2] === listaClicks[listaClicks.length - 1]) {
            bloquearUsuario();
            setTimeout(() => {
                alert('ganaste')
            }, 100);
        } else {
            setTimeout(() => {
                $carta[numeroImagen].setAttribute("src", listaImagenCobertora[listaImagenCobertora.length - 1]);
                $carta[numeroImagen - 1].setAttribute("src", listaImagenCobertora[listaImagenCobertora.length - 2]);
            }, 200);
        }
        contador = 0;
    }
}

function ObtenerNumeroAleatorio() {
    const NUMERO_ALEATORIO = Math.floor(Math.random() * imagenes.length);
    return NUMERO_ALEATORIO;
}

function bloquearUsuario() {
    $carta.forEach(function ($boton) {
        $boton.onclick = function () {
        };
    });
}

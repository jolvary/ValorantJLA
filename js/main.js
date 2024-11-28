let menuActivo = false;
let lista = document.querySelector(".desplegable");

function menuDesplegable() {
    if(!menuActivo){
        menuActivo = true;
        lista.style.display = "block";
    } else {
        menuActivo = false;
        lista.style.display = "none";
    }
}

window.addEventListener("resize", () => {
    if(window.innerWidth >= 900){
        lista.style.display = "none";
    }
})
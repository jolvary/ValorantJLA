function pFetch(url, options, callback) {
    options.method = options.method.toUpperCase()
    fetch(url, options)
        .then(response => response.json())
        .then(data => callback(data.data))
}

function muestraDatos(datos) {
    console.log(datos);

    const imgMapa = document.getElementById("imgMapa");
    imgMapa.src = datos.listViewIconTall;
    const centrarMapa = document.querySelector(".centrar-mapa");
    centrarMapa.style.backgroundImage = 'url("'+datos.stylizedBackgroundImage+'")';
    const displayMap = document.getElementById("displayMap");
    displayMap.style.backgroundImage = 'url("'+datos.displayIcon+'")';
    const nombreDisplayMapa = document.getElementById("nombreDisplayMapa");
    nombreDisplayMapa.innerHTML = (datos.displayName).toUpperCase();
    const coordMapa = document.getElementById("coordMapa");
    coordMapa.innerHTML = (datos.coordinates).split("").join(" ");;
}

window.onload = function () {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const uuid = urlParams.get('map');

    let url = "https://valorant-api.com/v1/maps/"+uuid+"?language=es-ES";
    let options = {
        method: "get"
    }
    pFetch(url, options, muestraDatos);
};
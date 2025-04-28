function pFetch(url, options, callback) {
    options.method = options.method.toUpperCase()
    fetch(url, options)
        .then(response => response.json())
        .then(data => {
            let array = [];
            for (let i = 0; i < data.data.length; i++) {
                if(data.data[i].coordinates != null && data.data[i].displayName != "Campo de tiro"){
                   array.push(data.data[i]);
                }
            }
            callback(array)
        })
}

function muestraDatos(datos) {
    const mapas = document.querySelectorAll(".mapa");
    const nombresMapas = document.querySelectorAll(".nombre-mapa");

    for (let i = 0; i < mapas.length; i++) {
        mapas[i].style.backgroundImage='url("'+datos[i].listViewIcon+'")';
        nombresMapas[i].innerHTML = (datos[i].displayName).toUpperCase();
        nombresMapas[i].dataset.uuid = datos[i].uuid;
    }
}

window.onload = function () {
    let url = "https://valorant-api.com/v1/maps?language=en-EN";
    let options = {
        method: "get"
    }
    pFetch(url, options, muestraDatos);

    document.querySelectorAll('.mapa').forEach(element => {
        element.addEventListener('click', function() {
            const nombreMapa = this.querySelector('.nombre-mapa').dataset.uuid;

            window.location.href = `./map-profile.html?map=${nombreMapa}`;
        });
    });
};
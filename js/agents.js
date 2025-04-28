function pFetch(url, options, callback) {
    options.method = options.method.toUpperCase()
    fetch(url, options)
        .then(response => response.json())
        .then(data => {
            let array = [];
            for (let i = 0; i < data.data.length; i++) {
                if(data.data[i].fullPortraitV2 != null){
                    array.push(data.data[i])
                }
            }
            callback(array)
        })
}

function muestraDatos(datos) {
    let divAgentes = document.querySelectorAll(".agentes");
    let nombAgentes = document.querySelectorAll(".nombre-agente");
    for (let i = 0; i < divAgentes.length; i++) {
        divAgentes[i].style.backgroundImage = 'url("'+datos[i].fullPortraitV2+'"';
    }
    for (let i = 0; i < nombAgentes.length; i++) {
        nombAgentes[i].innerHTML += datos[i].displayName;
        nombAgentes[i].dataset.uuid = datos[i].uuid;
    }
    
}

window.onload = function () {
    let url = "https://valorant-api.com/v1/agents?language=en-EN";
    let options = {
        method: "get"
    }
    pFetch(url, options, muestraDatos);


    document.querySelectorAll('.agentes').forEach(element => {
        element.addEventListener('click', function() {
            const nombreAgente = this.querySelector('.nombre-agente').dataset.uuid;

            window.location.href = `./agent-profile.html?agent=${nombreAgente}`;
        });
    });
};
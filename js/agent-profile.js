function pFetch(url, options, callback) {
    options.method = options.method.toUpperCase()
    fetch(url, options)
        .then(response => response.json())
        .then(data => callback(data.data))
}
const habilidades = [];
function muestraDatos(datos) {
    const imgElement = document.getElementById("imgAgente");

    imgElement.src = datos.fullPortraitV2;
    imgElement.style.backgroundImage = 'url("' + datos.background + '")';

    const nombrePj = document.getElementById("nombrePj");
    nombrePj.innerHTML += datos.displayName;
    const imgRolPj = document.getElementById("imgRolPj");
    imgRolPj.src = datos.role.displayIcon;
    const textRolPj = document.getElementById("textRol");
    textRolPj.innerHTML += datos.role.displayName;
    const descPj = document.getElementById("descPj");
    descPj.innerHTML += datos.description;

    let imgHabilidades = document.querySelectorAll(".habilidad");
    for (let i = 0; i < imgHabilidades.length; i++) {
        imgHabilidades[i].src = datos.abilities[i].displayIcon;
        habilidades.push(datos.abilities[i]);
    }


    aplicarColor(datos.displayName);

}


function aplicarColor(agente) {
    const color = agentesColores[agente];
    const colorSecundario = agentesColoresSecundarios[agente];
    if (color) { // Si el agente existe en el mapa
        document.getElementById("agente").style.backgroundColor = color;
        document.querySelector(".habilidadesDescripcion").style.backgroundColor = color;

        const habilidades = document.querySelectorAll('.habilidad');
        habilidades.forEach(habilidad => {
            habilidad.addEventListener('mouseover', () => {
                habilidad.style.backgroundColor = colorSecundario; // Cambia al color deseado
            });
        
            habilidad.addEventListener('mouseout', () => {
                habilidad.style.backgroundColor = ''; // Restaura el color original
            });
        });

    } else {
        console.warn(`Agente no encontrado: ${agente}`);
    }
}


function cambiarTextDescripcionHabilidad(numero) {
    const descHabilidad = document.getElementById("textDescHabilidad");
    const textNombHabilidad = document.getElementById("textNombreHabilidad");
    descHabilidad.innerHTML = habilidades[numero].description;
    textNombHabilidad.innerHTML = (habilidades[numero].displayName).toUpperCase();
}


window.onload = function () {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const uuid = urlParams.get('agent');

    let url = "https://valorant-api.com/v1/agents/" + uuid + "?language=en-EN";
    let options = {
        method: "get"
    }
    pFetch(url, options, muestraDatos);
};


const agentesColores = {
    "Gekko": "#c7f558",
    "Fade": "#2b324a",
    "Breach": "#ca5826",
    "Deadlock": "#ca5826",
    "Raze": "#e75e13",
    "Chamber": "#e0ca9b",
    "KAY/O": "#b7dfea",
    "Skye": "#39d8a6",
    "Cypher": "#b78460",
    "Sova": "#10255c",
    "Killjoy": "#fadc31",
    "Harbor": "#0c8c74",
    "Vyse": "#6153b7",
    "Viper": "#1cb864",
    "Phoenix": "#ff8513",
    "Astra": "#7013e4",
    "Brimstone": "#f08a33",
    "Iso": "#3d4158",
    "Clove": "#d891ef",
    "Neon": "#5658ff",
    "Yoru": "#39386d",
    "Sage": "#c8cbb6",
    "Reyna": "#591158",
    "Omen": "#230257",
    "Jett": "#77d4e4"
};

const agentesColoresSecundarios = {
    "Gekko": "#9fb846",
    "Fade": "#1f2438",
    "Breach": "#a74a20",
    "Deadlock": "#a74a20",
    "Raze": "#b94b0f",
    "Chamber": "#b9a87d",
    "KAY/O": "#8fb5be",
    "Skye": "#2cb08b",
    "Cypher": "#946d4f",
    "Sova": "#0d1d49",
    "Killjoy": "#c7b027",
    "Harbor": "#0a705e",
    "Vyse": "#4e4293",
    "Viper": "#17934f",
    "Phoenix": "#cc6a0f",
    "Astra": "#590fb4",
    "Brimstone": "#c1702a",
    "Iso": "#2f3346",
    "Clove": "#b474c2",
    "Neon": "#4546cc",
    "Yoru": "#2e2e58",
    "Sage": "#a1a48f",
    "Reyna": "#460e46",
    "Omen": "#1b0145",
    "Jett": "#5fb0b7"
}
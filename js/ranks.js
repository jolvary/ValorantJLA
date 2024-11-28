function pFetch(url, options, callback) {
    options.method = options.method.toUpperCase()
    fetch(url, options)
        .then(response => response.json())
        .then(data => {
            let array = [];
            let numRangos = data.data[data.data.length - 1].tiers.length;
            for (let i = 0; i < numRangos; i++) {
                if (data.data[data.data.length - 1].tiers[i].divisionName != "SIN CLASIFICACIÓN" && data.data[data.data.length - 1].tiers[i].divisionName != "Unused1" && data.data[data.data.length - 1].tiers[i].divisionName != "Unused2") {
                    array.push(data.data[data.data.length - 1].tiers[i])
                }
            }

            callback(array)
        })
}

function muestraDatos(datos) {
    const ctx = document.getElementById('grafica');
    ctx.width = 40;

    let nombresRangos = [];
    let cantidadJugadores = [22857, 53101, 107955, 130364, 155483, 157809, 181641, 177243, 186476, 194316, 178588, 165255, 156207, 129261, 111742, 103870, 83850, 69528, 58887, 41841, 28760, 18808, 3733, 2679, 358];
    let totalJugadores = 0;
    for (let i = 0; i < cantidadJugadores.length; i++) {
        totalJugadores += cantidadJugadores[i];
    }
    for (let i = 0; i < datos.length; i++) {
        nombresRangos.push(datos[i].tierName);
    }
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: nombresRangos, //Nombres de las columns (los rangos)
            datasets: [{
                
                data: cantidadJugadores, //datos de la grafica
                backgroundColor: [ //fondos para cada barra de rango
                    'rgb(93, 93, 93)',
                    'rgb(93, 93, 93)',
                    'rgb(93, 93, 93)',
                    'rgb(150, 107, 24)',
                    'rgb(150, 107, 24)',
                    'rgb(150, 107, 24)',
                    'rgb(225, 232, 231)',
                    'rgb(225, 232, 231)',
                    'rgb(225, 232, 231)',
                    'rgb(233, 197, 76)',
                    'rgb(233, 197, 76)',
                    'rgb(233, 197, 76)',
                    'rgb(82, 213, 222)',
                    'rgb(82, 213, 222)',
                    'rgb(82, 213, 222)',
                    'rgb(241, 151, 244)',
                    'rgb(241, 151, 244)',
                    'rgb(241, 151, 244)',
                    'rgb(60, 181, 123)',
                    'rgb(60, 181, 123)',
                    'rgb(60, 181, 123)',
                    'rgb(176, 38, 57)',
                    'rgb(176, 38, 57)',
                    'rgb(176, 38, 57)',
                    'rgb(255, 255, 181)'
                ],
                borderWidth: 1, //borde
                borderRadius: 8 //redondeo de borde
            }]
        },
        options: {
            plugins: {
                legend: {
                    display: false // Desactiva la leyenda
                },
                tooltip: {
                    enabled: true, //mostrar cuadro al poner raton encima de l barra
                    callbacks: {
                        label: function (context) {
                            const ratio = ((context.raw / totalJugadores) * 100).toFixed(2); //calculo del porcentaje
                            return [
                                `Ratio: ${ratio}%`, //ratio de jugdores
                                `Jugadores: ${context.raw}` //numero de jugadores
                              ];
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false // Quita las líneas verticales
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgb(169, 169, 169, 0.2)' // Color cenizo para las líneas horizontales
                    },
                    ticks: {
                        stepSize: 50000 // Define el paso de 50,000 en 50,000
                    }
                }
            }
        }
    });

    insertarRangos(datos);
}

function insertarRangos(datos) {
    let imgRangos = document.querySelectorAll(".img-rango"); //lista con todos los elementos con la clase img-rango
    let nombRangos = document.querySelectorAll(".nombre-rango"); //lista con todos los elementos con la clase nombre-rango
    let divisiones = []; //lista con solo las divisiones
    let division = ""; //variable auxiliar para comprobar que la division a cambiado

    for (let i = 0; i < datos.length; i++) { //bucle para guardar todas las divisiones
        if(datos[i].divisionName != division){
            divisiones.push(datos[i].divisionName); //se añaden la division al array
        }
        division = datos[i].divisionName; //se cambia el valor de la variable auxiliar
    }

    for (let i = 0; i < imgRangos.length; i++) { //blucle para insertar las imagenes de los rangos
        imgRangos[i].src = datos[i].largeIcon;
    }

    for (let i = 0; i < nombRangos.length; i++) { //bucle para insertar el nombre de los rangos
        nombRangos[i].innerHTML += divisiones[i];
    }

}


window.onload = function () {
    let url = "https://valorant-api.com/v1/competitivetiers?language=es-ES";
    let options = {
        method: "get"
    }
    pFetch(url, options, muestraDatos);
};
const clientes = new Map();
let map = null;
const select = document.getElementById('users');
let marker = null;

function getUsers() {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then((json) => {
            json.forEach((client) => {
                clientes.set(client.username, client.address.geo)
                setOptions(client);
            });
            //setCoords(clientes);
        })
}

function setMapOnAll(map) {
    marker.setMap(map);
    // for (let i = 0; i < marker.length; i++) {
    //   marker[i].setMap(map);
    // }
}

function setOptions(cliente) {
    let opt = document.createElement('option');
    opt.value = cliente.username;
    opt.innerHTML = cliente.username;
    select.appendChild(opt);
}

select.addEventListener('change', (event) => {
    const valor = select.value;
    setCoords(valor, clientes.get(valor))
})

function setCoords(userName, coordenadas) {



    marker != null ? setMapOnAll(null) : '';
 

    marker = new google.maps.Marker({
        position: new google.maps.LatLng(coordenadas.lat, coordenadas.lng),
        map: map,
        draggable: true,
        // icon: iconBase + "parking_lot_maps.png"
    });


    // info a mostrar
    const infoWindow = new google.maps.InfoWindow({
        content: userName
    });

    // mostrar y ocultar la info
    google.maps.event.addListener(marker, 'mouseover', function () {
        infoWindow.open(map, marker);
    });

    google.maps.event.addListener(marker, 'mouseout', function () {
        infoWindow.close();
    });
}

function generarMap() {
    const initialCenter = new google.maps.LatLng(40.130152, -4.2019183);
    map = new google.maps.Map(document.getElementById('map'), {
        center: initialCenter,
        //{ lat: user_location.latitude, lng: user_location.longitude}, // posición inicial
        zoom: 2
    });

}

getUsers();
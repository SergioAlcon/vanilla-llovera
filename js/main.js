'use strict';
// Creo querySelector para el botton
const boton = document.querySelector('button');
// Creo const de apiKey
const apiKey = '38bf43763474e996f4a7655034098a17';
// Creo una constante para recibir la geolocation
// y a su vez hago llamada a openweathermap
const fetchData = (position) => {
  const { latitude, longitude } = position.coords;
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
  )
    // Transformo la data para poder recibirla y manipularla.
    .then((response) => response.json())
    .then((data) => {
      prevision(data);
    });

  // Creo una const para empezar a sacar de data lo que me interesa
  const prevision = (data) => {
    // Creo una constante donde voy a recibir los datos que quiero usar
    const todosDatos = {
      // Creo propiedades para la ubicación
      city: data.city.name,
      country: data.city.country,
      // Creo propiedades ahora
      previsionCeroHoras: data.list[0].weather[0].main,
      textoCeroHoras: data.list[0].dt_txt,
      temperatura: data.list[0].temp,
      temperaturaMax: data.list[0].temp_max,
      temperaturaMin: data.list[0].temp_min,
      viento: data.list[0].wind.speed,
      // Creo propiedades dentro 3 horas
      previsionTresHoras: data.list[1].weather[0].main,
      textoTresHoras: data.list[1].dt_txt,
      // Creo propiedades dentro 3 horas
      previsionSeisHoras: data.list[2].weather[0].main,
      textoSeisHoras: data.list[2].dt_txt,
      // Creo propiedades dentro 3 horas
      previsionNueveHoras: data.list[3].weather[0].main,
      textoNueveHoras: data.list[3].dt_txt,
    };
    // Creo los querySelector para la ubicación
    const City = (document.querySelector('#ciudad').textContent =
      todosDatos.city);
    const Country = (document.querySelector('#pais').textContent =
      todosDatos.country);
    // Creo los querySelector prevision ahora
    const diaHoraCero = (document.querySelector('#diaHora0').textContent =
      todosDatos.textoCeroHoras);
    const prevCeroHoras = (document.querySelector('#tiempo0').textContent =
      todosDatos.previsionCeroHoras);
    // Creo los querySelector prevision tres horas
    const diaHoraTres = (document.querySelector('#diaHora1').textContent =
      todosDatos.textoTresHoras);
    const prevTresHoras = (document.querySelector('#tiempo1').textContent =
      todosDatos.previsionTresHoras);
    // Creo los querySelector prevision seis horas
    const diaHoraSeis = (document.querySelector('#diaHora2').textContent =
      todosDatos.textoSeisHoras);
    const prevCeroSeis = (document.querySelector('#tiempo2').textContent =
      todosDatos.previsionSeisHoras);
    // Creo los querySelector prevision nueve horas
    const diaHoraNueve = (document.querySelector('#diaHora3').textContent =
      todosDatos.textoNueveHoras);
    const prevNueveHoras = (document.querySelector('#tiempo3').textContent =
      todosDatos.previsionNueveHoras);
  };
};

// Creo la funcion manejadora del evento click
function handleclick(params) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(fetchData);
  } else {
    alert('No podemos acceder a tu posión');
  }
}
// Creo una funcion manejadora para que me diga si llueve
function llovera() {
  setTimeout(() => {
    if (
      document.querySelector('#tiempo0').textContent === 'Rain' ||
      document.querySelector('#tiempo1').textContent === 'Rain' ||
      document.querySelector('#tiempo2').textContent === 'Rain' ||
      document.querySelector('#tiempo3').textContent === 'Rain'
    ) {
      document.querySelector('#prevision').textContent = 'Se avecinan lluvías';
    } else {
      document.querySelector('#prevision').textContent =
        'No se avecinan lluvías';
    }
  }, 500);
}

function imagenes(tiempo, hora) {
  if (document.querySelector(tiempo).textContent === 'Rain') {
    const img = document.createElement('img');
    img.src = './media/Rain.png';
    img.alt = 'Rain';
    document.querySelector(hora).append(img);
  } else if (document.querySelector(tiempo).textContent === 'Clouds') {
    const img = document.createElement('img');
    img.src = './media/Clouds.png';
    img.alt = 'Clouds';
    document.querySelector(hora).append(img);
  } else if (document.querySelector(tiempo).textContent === 'Clear') {
    const img = document.createElement('img');
    img.src = './media/Clear.png';
    img.alt = 'Clear';
    document.querySelector(hora).append(img);
  } else if (document.querySelector(tiempo).textContent === 'Snow') {
    const img = document.createElement('img');
    img.src = './media/Snow.png';
    img.alt = 'Snow';
    document.querySelector(hora).append(img);
  } else if (document.querySelector(tiempo).textContent === 'Storm') {
    const img = document.createElement('img');
    img.src = './media/Storm.png';
    img.alt = 'Storm';
    document.querySelector(hora).append(img);
  }
}
// Creo una funcion manejadora para insertar una imagen según el estado.
function insertarImagen() {
  setTimeout(() => {
    imagenes('#tiempo0', '#horaCero');
    imagenes('#tiempo1', '#horaTres');
    imagenes('#tiempo2', '#horaSeis');
    imagenes('#tiempo3', '#horaNueve');
  }, 600);
}

function borrarBoton() {
  boton.remove();
}

// Creo un evento de click
boton.addEventListener('click', handleclick);
boton.addEventListener('click', llovera);
boton.addEventListener('click', insertarImagen);
boton.addEventListener('click', borrarBoton);

// Clear, Clouds, Rain,

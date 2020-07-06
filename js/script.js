// Chiave API (v3 auth)
// e12dca5dd96a7799461651a590256acb

// Esempio Richiesta API
// https://api.themoviedb.org/3/movie/550?api_key=e12dca5dd96a7799461651a590256acb

$(document).ready(function () {

  // evento click
  $(document).on('click', '#btn-ricerca', function () {

    var valoreInput = $('#ricerca-film').val();
    

    stampaFilm(valoreInput, 'movies');
    stampaFilm(valoreInput, 'tv');
  });

  // $('#stampa-ul').mouseenter(function() {

  //   $('.wrapper-ul').addClass('active');

  // });

  // $('#stampa-ul').mouseleave(function() {

  //   $('.wrapper-ul').removeClass('active');

  // });

}); // end document ready


// evento pressione tasto input
$(document).keypress(function (event) {

  var inputKeypress = $("#input").val();

  if ((event.which == 13) && (inputKeypress != '')) {

    var valoreInput = $('#ricerca-film').val();

    stampaFilm(valoreInput, 'movies');
    stampaFilm(valoreInput, 'tv');
  }
});

// funzione tasto reset
// funzione che fa il reset di html e del campo imput alla pressione del tasto invio 
// e del click sul bottone
function reset() {

  // svuota la ricerca all'interno dell'html quando riclicco sul bottone
  $('#stampa-ul').text('');

  // svuota il campo ricerca al click
  $('#ricerca-film').val('');
}


// la funzione che stampa i film
function stampaFilm(queryRicerca, type) {

  // funzione che fa il reset di html e del campo imput alla pressione del tasto invio 
  // e del click sul bottone
  reset();
  
  if (type === 'movies') {
    var url = 'https://api.themoviedb.org/3/search/movie';
  } else {
    url = 'https://api.themoviedb.org/3/search/tv';
  }

  $.ajax(
    {
      url: url,

      method: "GET",

      data: {
        api_key: 'e12dca5dd96a7799461651a590256acb',
        query: queryRicerca,
        language: 'it-IT'
    },

    success: function (data) {

      var risultatoRicerca = data.results;

      generaFilm(risultatoRicerca);

    },

    error: function () {
      alert('qualcosa non va');
    }
  }); // end chiamata ajax
}

function generaFilm(arrayRicerca) {

  var source = $('#film-template').html();
  var template = Handlebars.compile(source);

  for (var i = 0; i < arrayRicerca.length; i++) {

    var filmSingolo = arrayRicerca[i];

    var titolo = filmSingolo.title;
    var titoloOriginale = filmSingolo.original_title;
    var linguaOriginale = filmSingolo.original_language;
    var votoMedio = filmSingolo.vote_average;
    var titoloSerieTv = filmSingolo.name;
    var titoloOriginaleSerieTv = filmSingolo.original_name;
    var votoStella = creaStelle(votoMedio);
    var poster = filmSingolo.poster_path;
    var image = '<img src="https://image.tmdb.org/t/p/w342' + poster + '">';
    var info = filmSingolo.overview;

    var context = {

      title: titolo,
      original_language: creaLingua(linguaOriginale),
      original_title: titoloOriginale,
      vote_average: votoStella,
      name: titoloSerieTv,
      original_name: titoloOriginaleSerieTv,
      poster_path: image,
      overview: info
    };

    var html = template(context);

    $('#stampa-ul').append(html);

  }
}


function creaStelle(voto) {

  voto = Math.ceil(voto / 2);

  var stelle = '';
  for (var i = 1; i <= 5; i++) {

    if (i <= voto) {
      stelle += '<i class="fas fa-star"></i>';
    } else {
      stelle += '<i class="far fa-star"></i>';
    }
  }

  return stelle;

}

function creaLingua(linguaOriginale) {

  var bandiere = ['en', 'it'];

  if (bandiere.includes(linguaOriginale)) {

    return '<img src="img/' + linguaOriginale + '.png">'

  } else {

    return linguaOriginale;
  }
}

// // la funzione che stampa i film
// function stampaSerieTv(queryRicerca) {

//   // funzione che fa il reset di html e del campo imput alla pressione del tasto invio 
//   // e del click sul bottone
//   reset();

//   $.ajax({

//     url: "https://api.themoviedb.org/3/search/tv",
//     method: "GET",

//     data: {
//       api_key: 'e12dca5dd96a7799461651a590256acb',
//       query: queryRicerca,
//       language: 'it-IT'
//     },

//     success: function (data) {

//       var risultatoRicerca = data.results;

//       generaFilm(risultatoRicerca);

//     },

//     error: function () {
//       alert('qualcosa non va');
//     }
//   }); // end chiamata ajax
// }
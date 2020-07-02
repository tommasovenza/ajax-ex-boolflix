// Chiave API (v3 auth)
// e12dca5dd96a7799461651a590256acb

// Esempio Richiesta API
// https://api.themoviedb.org/3/movie/550?api_key=e12dca5dd96a7799461651a590256acb

$(document).ready(function () {

  // evento click
  $(document).on('click', '#btn-ricerca', function () {

    var valoreInput = $('#ricerca-film').val();

    stampaFilm(valoreInput);

  });

}); // end document ready


// evento pressione tasto input
$(document).keypress(function (event) {

  var inputKeypress = $("#input").val();

  if ((event.which == 13) && (inputKeypress != '')) {

    var valoreInput = $('#ricerca-film').val();

    stampaFilm(valoreInput);

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
function stampaFilm(queryRicerca) {

  // funzione che fa il reset di html e del campo imput alla pressione del tasto invio 
  // e del click sul bottone
  reset();

  $.ajax({

    url: "https://api.themoviedb.org/3/search/movie",
    method: "GET",

    data: {
      api_key: 'e12dca5dd96a7799461651a590256acb',
      query: queryRicerca,
      language: 'it-IT'
    },

    success: function(data) {

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

        var votoStella = arrotondaNumero(votoMedio);

        
        var context = {
          title: titolo,
          original_language: linguaOriginale,
          original_title: titoloOriginale,
          vote_average: votoStella
        };

        var html = template(context);

        $('#stampa-ul').append(html);

      }
}

function arrotondaNumero(numero) {

  var arrotondato = Math.ceil(numero);

  var stella = arrotondato / 2;

  if(stella % 2 != 0) {

     var test = Math.ceil(stella);

     return test;

  } else {

    return stella;
  }
}
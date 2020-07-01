// Chiave API (v3 auth)
// e12dca5dd96a7799461651a590256acb

// Esempio Richiesta API
// https://api.themoviedb.org/3/movie/550?api_key=e12dca5dd96a7799461651a590256acb

$(document).ready(function() {

  // evento click
  $(document).on('click', '#btn-ricerca', function() {
    
    // svuota la ricerca all'interno dell'html quando riclicco sul bottone
    $('#stampa-ul').text('');
    
    var valoreInput = $('#ricerca-film').val();

    stampaFilm(valoreInput);

    // svuota il campo ricerca al click
    $('#ricerca-film').val('');
  });

}); // end document ready


// la funzione che stampa i film
function stampaFilm(queryRicerca) {

  $.ajax( {

    url:"https://api.themoviedb.org/3/search/movie",
    method:"GET",

    data: {
      api_key: 'e12dca5dd96a7799461651a590256acb',
      query: queryRicerca,
      language: 'it-IT'
    },

    success: function(data) {
       
      var source = $('#film-template').html();
      var template = Handlebars.compile(source);

      var arrayRicerca = data.results;
      
      for (var i = 0; i < arrayRicerca.length; i++) {

        var filmSingolo = arrayRicerca[i];

        var titolo = filmSingolo.title;
        var titoloOriginale = filmSingolo.original_title;
        var linguaOriginale = filmSingolo.original_language;
        var votoMedio = filmSingolo.vote_average;

        // console.log(titolo);
        // console.log(titoloOriginale);
        // console.log(linguaOriginale);
        // console.log(votoMedio);

        var context = {
          title: titolo,
          original_language: linguaOriginale,
          original_title: titoloOriginale,
          vote_average: votoMedio
        };
  
        var html = template(context);
        
        $('#stampa-ul').append(html);
        
      }

    },

    error: function() {
      alert('qualcosa non va');
    }


  });
}

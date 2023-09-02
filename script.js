// press f11 to full page view
// vote for me at https://www.uplabs.com/posts/fluent-movie-booking

tooglePage1();

function tooglePage1() {
  $('.covers').removeClass('up');
  setTimeout(() => $('.main header').toggleClass('loaded'), 50);
  setTimeout(() => $('.covers').toggleClass('loaded'), 600);
}

var $covers = $('.covers');
var scroll = 0;
var delta = 267;

function doScroll(scrollUp = false) {
  var listHeight = getComputedStyle(document.querySelector('ul.covers')).getPropertyValue('height');

  if (!scrollUp && scroll < parseInt(listHeight) - delta * 2) {
    scroll += delta;
    $covers.removeClass('up').
    find('li').css('transform', `translateY(-${scroll}px)`);
  }

  if (scrollUp && scroll >= delta) {
    scroll -= delta;
    $covers.addClass('up').
    find('li').css('transform', `translateY(-${scroll}px)`);
  }
}

$('button.scrollDown').on('click', evt => doScroll());
$('button.scrollTop').on('click', evt => doScroll(true));

$('button.back').on('click', evt => {
  $('.main').toggleClass('page2');
  $('.total button').removeClass('success').text('CHECKOUT');
  tooglePage1();
});

$('.covers').on('click', 'li', evt => {
  var data = getData();
  var index = evt.currentTarget.getAttribute('data-index');
  var movie = data.results[parseInt(index)];
  var txt = movie.overview.length >= 220 ?
  movie.overview.substring(0, 220).concat('...') :
  movie.overview;

  var $sinopsis = $('.sinopsis');
  $sinopsis.find('h3').text(movie.title);
  $sinopsis.find('p').text(txt);
  $sinopsis.find('img').attr('src', `https://image.tmdb.org/t/p/w300${movie.poster_path}`);

  $('.main').toggleClass('page2');
  tooglePage1();
});

// https://image.tmdb.org/t/p/w300/w93GAiq860UjmgR6tU9h2T24vaV.jpg
function doMoviesRender(filter) {
  var movies = getData().results;
  var moviesRender = movies.map((item, index) => {
    var {
      title,
      genre_ids,
      poster_path,
      overview } =
    item;

    var uri = `https://image.tmdb.org/t/p/w300/${poster_path}`;
    var gid = genre_ids.toString();

    return gid.indexOf(filter) < 0 ? '' : `
			<li data-index="${index}">
				<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8zw8AAhMBENYXhyAAAAAASUVORK5CYII=" style="background-image: url(${uri})">
				<span>${title}</span><small>16:00 (2h 15m)</small>
			</li>
		`;
  });

  $('.covers').html(moviesRender.join(''));
}

doMoviesRender(',');

var seats = [];
var initPos = 65;
for (var i = 0; i < 78; i++) {
  var row = String.fromCharCode(initPos + Math.floor(i / 9));
  var taken = i % 7 == 0 || i % 6 == 0 ? 'taken' : '';

  var aisle = i % 9 === 1 ? 'aisle-right' :
  i % 9 === 7 ? 'aisle-left' : '';

  if (row === 'I')
  aisle = 'aisle-top';

  seats.push(`<div class="seat ${taken} ${aisle}">${row}${i % 9 + 1}</div>`);
}
$('.seats').html(seats.join(''));

$('.seats').on('click', '.seat', evt => {
  var $seat = $(evt.currentTarget);

  if (!$seat.hasClass('taken')) {
    $seat.toggleClass('selected');

    var $sel = $seat.parent().find('.selected');
    var qty = $sel.length * 100;
    $('.total span').text(`$${qty}`.substring(0, 6));
  }
});

$('.filter li').on('click', evt => {
  $(evt.currentTarget).addClass('selected').siblings().removeClass('selected');
  var $covers = $('.covers').removeClass('loaded').removeClass('up');
  var filter = evt.currentTarget.getAttribute('data-gid');
  doMoviesRender(filter);
  scroll = 0;
  setTimeout(() => $covers.toggleClass('loaded'), 100);
});

$('.total button').on('click', function (evt) {
  var $button = $(evt.currentTarget);
  var total = $('.total span').text();

  if (!$button.hasClass('success') && total !== '$0') {
    var $loader = $('.loader').show();
    $button.text('Booking...');

    setTimeout(() => {
      $loader.hide();
      $button.html('<i class="zmdi zmdi-check-circle"></i> Movie Booked');
      $button.addClass('success');
    }, 1600);
  }
});

/*** END OF CODE ***/

function getData() {
  return { "page": 1, "total_results": 315519, "total_pages": 15776, "results": [{ "vote_count": 1724, "id": 297762, "video": false, "vote_average": 7, "title": "Wonder Woman", "popularity": 119.66635, "poster_path": "/gfJGlDaHuWimErCr5Ql0I8x9QSy.jpg", "original_language": "en", "original_title": "Wonder Woman", "genre_ids": [28, 12, 14, 878], "backdrop_path": "/hA5oCgvgCxj5MEWcLpjXXTwEANF.jpg", "adult": false, "overview": "An Amazon princess comes to the world of Man to become the greatest of the female superheroes.", "release_date": "2017-05-30" }, { "vote_count": 4194, "id": 263115, "video": false, "vote_average": 7.5, "title": "Logan", "popularity": 80.401638, "poster_path": "/9EXnebqbb7dOhONLPV9Tg2oh2KD.jpg", "original_language": "en", "original_title": "Logan", "genre_ids": [28, 18, 878], "backdrop_path": "/5pAGnkFYSsFJ99ZxDIYnhQbQFXs.jpg", "adult": false, "overview": "In the near future, a weary Logan cares for an ailing Professor X in a hideout on the Mexican border. But Logan's attempts to hide from the world and his legacy are upended when a young mutant arrives, pursued by dark forces.", "release_date": "2017-02-28" }, { "vote_count": 3464, "id": 321612, "video": false, "vote_average": 6.8, "title": "Beauty and the Beast", "popularity": 73.33872, "poster_path": "/tWqifoYuwLETmmasnGHO7xBjEtt.jpg", "original_language": "en", "original_title": "Beauty and the Beast", "genre_ids": [10751, 14, 10749], "backdrop_path": "/7QshG75xKCmClghQDU1ta2BTaja.jpg", "adult": false, "overview": "A live-action adaptation of Disney's version of the classic 'Beauty and the Beast' tale of a cursed prince and a beautiful young woman who helps him break the spell.", "release_date": "2017-03-16" },  { "vote_count": 8253, "id": 76341, "video": false, "vote_average": 7.2, "title": "Mad Max: Fury Road", "popularity": 23.066573, "poster_path": "/kqjL17yufvn9OVLyXYpvtyrFfak.jpg", "original_language": "en", "original_title": "Mad Max: Fury Road", "genre_ids": [28, 12, 878, 53], "backdrop_path": "/phszHPFVhPHhMZgo0fWTKBDQsJA.jpg", "adult": false, "overview": "An apocalyptic story set in the furthest reaches of our planet, in a stark desert landscape where humanity is broken, and most everyone is crazed fighting for the necessities of life. Within this world exist two rebels on the run who just might be able to restore order. There's Max, a man of action and a man of few words, who seeks peace of mind following the loss of his wife and child in the aftermath of the chaos. And Furiosa, a woman of action and a woman who believes her path to survival may be achieved if she can make it across the desert back to her childhood homeland.", "release_date": "2015-05-13" }, { "vote_count": 654, "id": 305470, "video": false, "vote_average": 6.5, "title": "Power Rangers", "popularity": 22.184089, "poster_path": "/zV5rpeTzUJ7QpA3NC4iidlwXssU.jpg", "original_language": "en", "original_title": "Power Rangers", "genre_ids": [28, 12, 878], "backdrop_path": "/gfTQaH7h09IaSZw9ubZgP2c7syr.jpg", "adult": false, "overview": "Saban's Power Rangers follows five ordinary teens who must become something extraordinary when they learn that their small town of Angel Grove — and the world — is on the verge of being obliterated by an alien threat. Chosen by destiny, our heroes quickly discover they are the only ones who can save the planet. But to do so, they will have to overcome their real-life issues and before it’s too late, band together as the Power Rangers.", "release_date": "2017-03-23" },  { "vote_count": 2554, "id": 283995, "video": false, "vote_average": 7.6, "title": "Guardians of the Galaxy Vol. 2", "popularity": 19.364494, "poster_path": "/y4MBh0EjBlMuOzv9axM4qJlmhzz.jpg", "original_language": "en", "original_title": "Guardians of the Galaxy Vol. 2", "genre_ids": [28, 12, 35, 878], "backdrop_path": "/aJn9XeesqsrSLKcHfHP4u5985hn.jpg", "adult": false, "overview": "The Guardians must fight to keep their newfound family together as they unravel the mysteries of Peter Quill's true parentage.", "release_date": "2017-04-19" }] };
}
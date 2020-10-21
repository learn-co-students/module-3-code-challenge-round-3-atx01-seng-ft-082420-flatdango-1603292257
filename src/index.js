// const url = 'http://localhost:3000/films';
document.addEventListener('DOMContentLoaded', () => {
  console.log('Its working');
  fetch('http://localhost:3000/films/1')
    .then(res => res.json())
    .then(json => {
      //   console.log(json);
      createMovieCard(json);
    });
});

function createMovieCard(movie) {
  // Create Elements
  const img = document.querySelector('#poster');
  const title = document.querySelector('#title');
  const runtime = document.querySelector('#runtime');
  const desc = document.querySelector('#film-info');
  const showTime = document.querySelector('#showtime');
  const ticketsLeft = document.querySelector('#ticket-num');

  // Assing Elements
  img.setAttribute('src', movie.poster);
  title.innerText = movie.title;
  runtime.innerText = `${movie.runtime} minutes`;
  desc.innerText = movie.description;
  showTime.innerText = movie.showtime;
  ticketsLeft.innerText = movie.capacity - movie.tickets_sold;
  let tix = ticketsLeft.innerText;

  const btn = document.querySelector('.ui.orange.button');
  if (ticketsLeft.innerText == 0) {
    btn.innerText = 'Sold Out';
    btn.className = 'ui.button';
  }
  btn.addEventListener('click', () => {
    console.log(movie.tickets_sold);
    let tixS = movie.tickets_sold + 1;
    console.log(tixS);
    ticketsLeft.innerText = movie.capacity - tixS;

    fetch(`http://localhost:3000/films/${movie.id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        tickets_sold: tixS
      })
    })
      .then(res => res.json())
      .then(
        updateMovie =>
          (ticketsLeft.innerText =
            updateMovie.capacity - updateMovie.tickets_sold)
      );
  });
}

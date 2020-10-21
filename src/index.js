const URL = "http://localhost:3000/films/1"

document.addEventListener("DOMContentLoaded", () => {
    fetch(URL)
    .then(res => res.json())
    .then(movie => renderMovie(movie))

    function renderMovie(movie){
        const title = document.querySelector('.title')
        title.innerText = movie.title
        const runtime = document.querySelector('.meta')
        runtime.innerText = movie.runtime
        const showTime = document.querySelector('#showtime')
        showTime.innerText = movie.showtime
        const poster = document.querySelector('#poster')
        poster.src= movie.poster
        const description = document.querySelector('#film-info')
        description.innerText = movie.description
        const remainingTickets = document.querySelector('#ticket-num')
        remainingTickets.innerText = movie.capacity - movie.tickets_sold

    const ticketButton = document.querySelector('.ui.orange.button')
    
    ticketButton.addEventListener('click', (e) => {
        e.preventDefault();
        let remainingTickets = document.querySelector('#ticket-num')
        remainingTickets.innerText -- 
        if (remainingTickets.innerText < 0){
            ticketButton.innerText = "Sold Out"
            remainingTickets.innerText = 0
        }
        let patchObject = {
            method:"PATCH",
            headers: {
                "Content-Type": "application/json",
                Accept : "application/json"
            },
            body: JSON.stringify(
                remainingTickets
            )
        }
        fetch("URL", patchObject)
        .then(res => res.json())
        .then(() => remainingTickets)
        })
    }
})

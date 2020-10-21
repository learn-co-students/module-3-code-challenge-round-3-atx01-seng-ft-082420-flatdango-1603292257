const url = "http://localhost:3000/films"
const filmUrl = 'http://localhost:3000/films/1'

document.addEventListener('DOMContentLoaded', () => {
    console.log("cao")
    fetch(filmUrl)
    .then(res => res.json())
    .then(film => renderFilm(film))
})

function renderFilm(film) {
    console.log(film)
    const poster = document.querySelector('#poster')
    const title = document.querySelector('.title')
    const runtime = document.querySelector('.meta')
    const desc = document.querySelector('#film-info')
    const showtime = document.querySelector('#showtime')
    const buy = document.querySelector('.ui.orange.button')
    let remainingTics = document.querySelector('#ticket-num')

    let capacity = film.capacity
    let sold = film.tickets_sold
    remainingTics.innerText = (capacity - sold)
    if (remainingTics.innerText === 0) {
        buy.remove()
    }
    
    
    poster.src = film.poster
    title.innerText = film.title
    runtime.innerText = film.runtime + ' minutes'
    desc.innerText = film.description
    showtime.innerText = film.showtime
    
    
    
    buy.addEventListener('click', e => {
        e.preventDefault()
        let soldTickets = sold++
        let decreaseTics = parseInt(remainingTics.innerText) - 1
        

        fetch(filmUrl, {
            method: 'PATCH',
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                tickets_sold: soldTickets
            })
        })
        .then(res => res.json())
        .then(() => {
            remainingTics.innerText = decreaseTics
            sold.innerText = soldTickets
        })
        
    })
    

}

//  number of available tickets decreasing on the frontend.
// - I should not be able to buy a ticket if the showing is sold out.

// {id: "1", title: "The Giant Gila Monster", runtime: "108", capacity: 30, showtime: "04:00PM", …}
// capacity: 30
// description: "A giant lizard terrorizes a rural Texas community and a heroic teenager attempts to destroy the creature."
// id: "1"
// poster: "https://www.gstatic.com/tv/thumb/v22vodart/2157/p2157_v_v8_ab.jpg"
// runtime: "108"
// showtime: "04:00PM"
// tickets_sold: 27
// title: "The Giant Gila Monster"
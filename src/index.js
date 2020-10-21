const url = "http://localhost:3000/films/1"

document.addEventListener("DOMContentLoaded", () => {
    fetch(url).then(res => res.json()).then(film => renderFilm(film))
})

function renderFilm(film) {

    console.log(film)

    const poster = document.querySelector("#poster")
    poster.src = film.poster

    const title = document.querySelector("#title")
    title.innerText = film.title

    const desc = document.querySelector("#film-info")
    desc.innerText = film.description

    const runtime = document.querySelector("#runtime")
    runtime.innerText = `${film.runtime} minutes`

    const showtime = document.querySelector("#showtime")
    showtime.innerText = film.showtime

    const availTickets = document.querySelector("#ticket-num")
    let remainingTickets = (film.capacity - film.tickets_sold)
    availTickets.innerText = remainingTickets

    const buyBtn = document.querySelector(".ui.orange.button")
    console.log(buyBtn)
    buyBtn.addEventListener("click", event => {

        event.preventDefault()
        // ++film.tickets_sold
        // console.log(film.tickets_sold)
        if (film.tickets_sold < 30){
            ++film.tickets_sold
        }

        fetch(url, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "id": 1,
                "tickets_sold": film.tickets_sold
            })
        })
            .then(res => res.json())
            .then(updatedFilm => {
                // console.log(film.tickets_sold)
                const availTickets = document.querySelector("#ticket-num")
                // if (updatedFilm.tickets_sold < 30){
                //     ++film.tickets_sold
                // }
                let remainingTickets = (updatedFilm.capacity - updatedFilm.tickets_sold)
                availTickets.innerText = remainingTickets
            })
    })
}
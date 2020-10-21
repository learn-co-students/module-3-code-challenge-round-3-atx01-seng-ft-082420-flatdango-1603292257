const url = "http://localhost:3000/films/1"

document.addEventListener("DOMContentLoaded", () => {
    console.log("loaded")
    fetch(url)
    .then(res => res.json())
    .then(movie => {
        renderMovie(movie)
    })
})

function renderMovie(movie) {
    // console.log("hi")

    const poster = document.getElementById("poster")
    poster.src = movie.poster

    const title = document.getElementById("title")
    title.innerText = movie.title

    const runtime = document.getElementById("runtime")
    runtime.innerText = `${movie.runtime} minutes`

    const plot = document.getElementById("film-info")
    plot.innerText = movie.description

    const showtime = document.getElementById("showtime")
    showtime.innerText = movie.showtime

    const ticket = document.getElementById("ticket-num")
    let capacity = movie.capacity 
    let ticketsSold = movie.tickets_sold
    // console.log(capacity)
    ticket.innerText = capacity - ticketsSold

    const buyTixBtn = document.querySelector(".ui.orange.button")
    buyTixBtn.addEventListener("click", () => {
        if(ticket.innerText > 0){
        let newTixSold = ticketsSold + 1
        ticket.innerText = capacity - newTixSold
        fetch(`http://localhost:3000/films/${movie.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                tickets_sold: movie.tickets_sold ++
            })
        })
        .then(res => res.json())
        .then(obj => ticketsSold = obj.tickets_sold)
        console.log(ticket.innerText)
    } else {
        buyTixBtn.innerText = "Sold Out";
    }
    })
    
}


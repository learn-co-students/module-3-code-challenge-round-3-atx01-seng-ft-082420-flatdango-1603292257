const url = "http://localhost:3000/films/1"

document.addEventListener("DOMContentLoaded", () => {
    fetch(url)
    .then(res => res.json())
    .then( json => {
        // json => console.log(json)
        createMovieCard(json)
    }) 
})

//selecting the elements
function createMovieCard(movie) {
    const img = document.getElementById("poster")
    const titleDiv = document.getElementById("title")
    const runTimeDiv =  document.getElementById("runtime")
    const showTimeSpan = document.getElementById("showtime")
    const ticketSpan = document.getElementById("ticket-num")
    const button = document.querySelector(".ui.orange.button")
    const descriptionDiv = document.getElementById("film-info")
    
    // console.log(button)

    //assign the  elements
    img.src = movie.poster
    titleDiv.innerText = movie.title
    runTimeDiv.innerHTML = `${movie.runtime} minutes`
    showTimeSpan.innerText = movie.showtime
    let numTickets = movie.tickets_sold 
    let capacity = movie.capacity
    ticketSpan.innerText = (capacity - numTickets)
    descriptionDiv.innerText = movie.description
    
    //buy tickets
    button.addEventListener("click", () => {
        if ((capacity - numTickets) > 0 ){
            let buyTicket = (numTickets + 1)
            fetch(url, {
                method: "PATCH",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    tickets_sold: buyTicket
                })
            })
            .then(res => res.json())
            .then(() => (ticketSpan.innerText = capacity - buyTicket))
            location.reload()
        }
        else {
            ticketSpan.innerText = "Sorry, the Show has 0"
        }
    })
}

// for personal use during code challeng:
// {id: "1", title: "The Giant Gila Monster", runtime: "108", capacity: 30, showtime: "04:00PM", …}
// capacity: 30
// description: "A giant lizard terrorizes a rural Texas community and a heroic teenager attempts to destroy the creature."
// id: "1"
// poster: "https://www.gstatic.com/tv/thumb/v22vodart/2157/p2157_v_v8_ab.jpg"
// runtime: "108"
// showtime: "04:00PM"
// tickets_sold: 27
// title: "The Giant Gila Monster"
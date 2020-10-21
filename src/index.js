const url = "http://localhost:3000/films"
document.addEventListener("DOMContentLoaded", (e)=> {
fetch("http://localhost:3000/films/1")
.then(res => res.json())
.then(film => renderFilm(film))

function renderFilm(film){
    //console.log("yay")
    
    const img = document.querySelector("#poster")
    img.src = film.poster
    
    const titleDiv = document.querySelector("#title")
    titleDiv.innerText = film.title

    const runtimeDiv = document.querySelector("#runtime")
    runtimeDiv.innerText = `${film.runtime} minutes`

    const filmInfoDiv = document.querySelector("#film-info")
    filmInfoDiv.innerText = film.description
    const showtimeSpan = document.querySelector("#showtime")
    showtimeSpan.innerText = film.showtime
    
    const availableTicketsSpan = document.querySelector("#ticket-num")
    let ticketsSold = film.tickets_sold
    //const availableTickets = film.capacity - film.tickets_sold
    availableTicketsSpan.innerText = film.capacity - ticketsSold
    
     const button = document.querySelector(".ui.orange.button")
     //console.log(button)
    
    button.addEventListener("click", (e)=>{
       
        //if(ticketsSold == film.capacity){
        // I would use the code above to be more flexible but since I already
        // sold more than the film's capacity before I worked out the kinks
        //the statement was evaluating to false so I hardcoded line 39 just so I 
        // could see that it was infact working the way I would expect it to
        if (ticketsSold > 30){
            console.log("The film is sold out.")
            button.innerText = "Sold Out"
         }else{
        console.log(ticketsSold)
        console.log(film.id)
         fetch(`http://localhost:3000/films/${film.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                "tickets_sold": film.tickets_sold + 1
            })
        })//ends PATCH fetch
            .then(res => res.json())
            .then(editedFilm => {
                // if(ticketsSold == film.capacity){
                //     console.log("The film is sold out.")
                //     button.innerText = "Sold Out"
                // }else{
                ticketsSold = film.tickets_sold + 1
                availableTicketsSpan.innerText = film.capacity - ticketsSold
                // }
            })//ends second .then
        }//ends if else
    })// ends buyTicketBtn event listener
}//ends renderFilm()

})//ends DCL
//WHAT WE GET BACK FROM 2ND .THEN
// {id: "1", title: "The Giant Gila Monster", runtime: "108", capacity: 30, showtime: "04:00PM", …}
// capacity: 30
// description: "A giant lizard terrorizes a rural Texas community and a heroic teenager attempts to destroy the creature."
// id: "1"
// poster: "https://www.gstatic.com/tv/thumb/v22vodart/2157/p2157_v_v8_ab.jpg"
// runtime: "108"
// showtime: "04:00PM"
// tickets_sold: 28
// title: "The Giant Gila Monster"



// "id": "1",
// "title": "The Giant Gila Monster",
// "runtime": "108",
// "capacity": 30,
// "showtime": "04:00PM",
// "tickets_sold": 27,
// "description": "A giant lizard terrorizes a rural Texas community and a heroic teenager attempts to destroy the creature.",
// "poster": "https://www.gstatic.com/tv/thumb/v22vodart/2157/p2157_v_v8_ab.jpg"

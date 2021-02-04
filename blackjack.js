//let search = document.getElementById("button").value;
let type = document.getElementById("type")
let deckId = ""
let deckCount = ""
document.getElementById("button").addEventListener("click" , () =>{

    fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/`)
    .then((response) => (response.json())
    .then((json) =>{
        deckId = json.deck_id;
        deckCount = json.remaining;
        console.log(json)
        

    }))

})

document.getElementById("hit").addEventListener("click" , draw)

function draw() //owner, faceup
{
    if(deckId != "")
    {
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/`)
    .then((response) => (response.json())
    .then((json) =>{
            console.log(json)
            deckCount = json.remaining;
            
            document.getElementById("deck").style.height = `calc(139 + ${deckCount})px`
            document.body.append(document.getElementById("deck"))
            let card = document.createElement("div");
            card.classList.add("card")
            card.innerHTML = `
            <img class = "card" src = "${json.cards[0].image}"></img>
            `
            document.body.append(card)
        }))
    }
}



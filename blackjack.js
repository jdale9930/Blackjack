//let search = document.getElementById("button").value;
let type = document.getElementById("type")
let deckId = ""
let deckCount = ""
let gameState = false;

fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/`)
    .then((response) => (response.json())
    .then((json) =>{
        deckId = json.deck_id;
        deckCount = json.remaining;
        console.log(json)
    }))


document.getElementById("button").addEventListener("click" , () =>{
    let clear = document.getElementsByClassName("newCard");
    console.log(clear)
    for(let i = clear.length - 1; i >= 0; i--)
    {
        clear[i].remove();
    }
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`)
    .then((response) => (response.json())
    .then((json) =>{
         deckCount = json.remaining;
         console.log(deckCount);      
     })
     .then((response) =>{
         deckSize()
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
            deckSize();
            // let decksize = 139 + Math.floor(deckCount / 2);
            // document.getElementById("deck").style.height = `${decksize}px`;
            let card = document.createElement("div");
            card.classList.add("newCard")
            card.classList.add("card")
            card.innerHTML = `
            <img class = "card" src = "${json.cards[0].image}"></img>
            `
            document.getElementById(`playerHand`).append(card)
        }))
    }
}

function deckSize()
{
    let decksize = 139 + Math.floor(deckCount / 2);
    document.getElementById("deck").style.height = `${decksize}px`;
}


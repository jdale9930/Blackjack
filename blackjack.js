//let search = document.getElementById("button").value;
//let type = document.getElementById("type")
let deckId = ""
let deckCount = ""
let gameState = false;
playerTotal = 0;
cpuTotal = 0;
console.log(parseInt("king"))
fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/`)
    .then((response) => (response.json())
    .then((json) =>{
        deckId = json.deck_id;
        deckCount = json.remaining;
        console.log(json)
    }))


document.getElementById("button").addEventListener("click" , () =>{
    game()
    playerTotal = 0;
    cpuTotal = 0;
    // let clear = document.getElementsByClassName("newCard");
    // //console.log(clear)
    // for(let i = clear.length - 1; i >= 0; i--)
    // {
    //     clear[i].remove();
    // }
    // fetch(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`)
    // .then((response) => (response.json())
    // .then((json) =>{
    //      deckCount = json.remaining;
    //      console.log(deckCount);      
    //  })
    //  .then((response) =>{
    //      deckSize()
    //     let deal1 = window.setTimeout(() =>{
    //         draw("player", "faceDown")
    //     }, 500)
    //     let deal2 = window.setTimeout(() =>{
    //         draw("cpu", "faceDown")
    //     }, 1000)
    //     let deal3 = window.setTimeout(() =>{
    //         draw("player", "faceup")
    //     }, 1500)
    //     let deal4 = window.setTimeout(() =>{
    //         draw("cpu", "faceup")
    //     }, 2000)
    //  }))
})

document.getElementById("hit").addEventListener("click" , () =>{
    draw("player" , "faceup")
})

function draw(target, faceup) //owner, faceup
{
    if(deckId != "")
    {
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/`)
    .then((response) => (response.json())
    .then((json) =>{
                //console.log(json)
            deckCount = json.remaining;
            deckSize();
            let card = document.createElement("div");
            card.classList.add("newCard", `${json.cards[0].value}` , `${json.cards[0].suit}` , `${target}`, "card")
                //console.log(json.cards[0].code)
            card.setAttribute('value', json.cards[0].value)
            card.setAttribute('code', json.cards[0].code);
            card.innerHTML = `
            <img id = "image${card.getAttribute('code')}" class = "card"  src = "${json.cards[0].image}"></img>
            `
                //console.log("pls work" ,card.getAttribute('value'))
            document.getElementById(`${target}Hand`).append(card)
            
            if(faceup === "faceDown")
            {
                 document.getElementById(`image${card.getAttribute('code')}`).classList.add("hidden")
                 card.classList.add("faceDown")

                 if(target === "player")
                 {
                    card.addEventListener("mouseenter" , e =>{
                        document.getElementById(`image${e.target.getAttribute('code')}`).classList.remove("hidden")
                    })
                    card.addEventListener("mouseleave" , e =>{
                        document.getElementById(`image${e.target.getAttribute('code')}`).classList.add("hidden")
                    })
                }
                
            }
        }))
    }
}

function deckSize()
{
    let decksize = 139 + Math.floor(deckCount / 2);
    document.getElementById("deck").style.height = `${decksize}px`;
}

function game()
{
    let clear = document.getElementsByClassName("newCard");
    //console.log(clear)
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
        let deal1 = window.setTimeout(() =>{
            draw("player", "faceDown")
        }, 500)
        let deal2 = window.setTimeout(() =>{
            draw("cpu", "faceDown")
        }, 1000)
        let deal3 = window.setTimeout(() =>{
            draw("player", "faceup")
        }, 1500)
        let deal4 = window.setTimeout(() =>{
            draw("cpu", "faceup")
            let buttonHidden = document.getElementsByClassName("turnButton");
        }, 2000)
        let buttonTimer = window.setTimeout(() =>{
            let buttonHidden = document.getElementsByClassName("turnButton");
        for(let i = 0; i < buttonHidden.length; i++)
        {
            
            buttonHidden[i].classList.remove("hidden")
        }
        }, 2500)
     }))
}

function handCounter(target)
{
    playerTotal = 0;
    cpuTotal = 0;
    let array = document.getElementsByClassName(`${target}`)
    for(i = 0; i <array.length; i++)
    {
        if(target === "player")
        {
            if(isNaN(array[i].getAttribute('value')) == false)
            {
                playerTotal = playerTotal + parseInt(array[i].getAttribute('value'));
                console.log(playerTotal , array[i].getAttribute('value'))
            }

            else if(array[i].getAttribute('value') != "ACE")
            {
                playerTotal = playerTotal + 10;
                console.log(playerTotal , array[i].getAttribute('value') , 'face card') 

            }

            else
            {
                if(playerTotal + 10 <= 21)
                {
                    playerTotal = playerTotal + 10;  
                    console.log(playerTotal , array[i].getAttribute('value'))
                
                }
                else
                {
                    playerTotal = playerTotal + 1;
                    console.log(playerTotal , array[i].getAttribute('value'))

                }
            }
        }
        if(target === "cpu")
        {
            if(isNaN(array[i].getAttribute('value')) == false)
            {
                cpuTotal = cpuTotal + parseInt(array[i].getAttribute('value'));
                console.log(cpuTotal , array[i].getAttribute('value'))
            }

            else if(array[i].getAttribute('value') != "ACE")
            {
                cpuTotal = cpuTotal + 10;
                console.log(cpuTotal , array[i].getAttribute('value') , 'face card') 

            }

            else
            {
                if(playerTotal + 10 <= 21)
                {
                    cpuTotal = cpuTotal + 10;  
                    console.log(cpuTotal , array[i].getAttribute('value'))
                
                }
                else
                {
                    cpuTotal = cpuTotal + 1;
                    console.log(cpuTotal , array[i].getAttribute('value'))

                }
            }
        } 
    }
}

function gameover(result)
{
    if(result === "win")
    {
        document.getElementById('result').innerText("You Win!")
    }
    else
    {
        document.getElementById('result').innerText("You Lose")

    }
}
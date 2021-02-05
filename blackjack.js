//let search = document.getElementById("button").value;
//let type = document.getElementById("type")
let deckId = ""
let deckCount = ""
playerTotal = 0;
cpuTotal = 0;
cpuHold = false;
playerHold = false;
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
    playerHold = false;
    cpuHold = false;
    document.getElementById("result").innerText = "";
    document.getElementById("hit").classList.add('hidden')
    document.getElementById("hold").classList.add('hidden')
    document.getElementById("button").classList.add('hidden')
    document.getElementById("cpuChoice").innerText = ''

    })

document.getElementById("hit").addEventListener("click" , () =>{
    draw("player" , "faceup")
    document.getElementById("hit").classList.add('hidden')
    document.getElementById("hold").classList.add('hidden')
    //handCounter("player")
    console.log(playerTotal)
    let turnTimer = setTimeout(() =>{
        handCounter("player")
        if(playerTotal > 21)
    {
        gameover("lose")
    }

    if(cpuHold === true)
    {
        document.getElementById("hit").classList.remove('hidden')
        document.getElementById("hold").classList.remove('hidden')
    }
    else{
        cpuTurn()
    }
    }, 1000)
})

document.getElementById("hold").addEventListener("click" , () =>{
    playerHold = true;
    if(cpuHold === true)
    {
        gameover("calculate")
    }
    else
    {
        cpuTurn()
    }

})

function draw(target, faceup) //owner, faceup
{
    if(deckId != "")
    {
        //try block
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
            handCounter("cpu");
            handCounter("player");
            if(cpuTotal === 21 || playerTotal === 21)
            {
                if(cpuTotal === 21)
                {
                    if(playerTotal === 21)
                    {
                        gameover("tie")
                    }
                    else
                    {
                        gameover("lose")
                    }
                }
                else
                {
                    gameover("win")
                }
            }
            else
            {
                let buttonHidden = document.getElementsByClassName("turnButton");
                for(let i = 0; i < buttonHidden.length; i++)
                {
                
                    buttonHidden[i].classList.remove("hidden")
                    document.getElementById("button").classList.remove('hidden')

                }
            }
            }, 2500)
            
     }))
}

function handCounter(target)
{
    playerTotal = 0;
    cpuTotal = 0;
    let aceCounter = 0;
    let array = document.getElementsByClassName(`${target}`)
    for(i = 0; i <array.length; i++)
    {
        if(target === "player")
        {
            if(isNaN(array[i].getAttribute('value')) == false)
            {
                playerTotal = playerTotal + parseInt(array[i].getAttribute('value'));
                //console.log(playerTotal , array[i].getAttribute('value'))
            }

            else if(array[i].getAttribute('value') != "ACE")
            {
                playerTotal = playerTotal + 10;
                //console.log(playerTotal , array[i].getAttribute('value') , 'face card') 
            }

            else
            {
                playerTotal = playerTotal + 1;
                //console.log(playerTotal , array[i].getAttribute('value'))
                aceCounter = aceCounter + 1;
            }
        }
        if(target === "cpu")
        {
            if(isNaN(array[i].getAttribute('value')) == false)
            {
                cpuTotal = cpuTotal + parseInt(array[i].getAttribute('value'));
                //console.log(cpuTotal , array[i].getAttribute('value'))
            }

            else if(array[i].getAttribute('value') != "ACE")
            {
                cpuTotal = cpuTotal + 10;
                //console.log(cpuTotal , array[i].getAttribute('value') , 'face card') 

            }

            else
            {
                cpuTotal = cpuTotal + 1;
                //console.log(cpuTotal , array[i].getAttribute('value'))
            }
        } 
    }
    if(aceCounter != 0 && target === "player")
    {
        for(let i = 0; i < aceCounter; i++)
        {
            if(playerTotal + 10 <= 21)
            {
                playerTotal = playerTotal + 10;
            } 
        }
    }
    if(aceCounter != 0 && target === "cpu")
    {
        for(let i = 0; i < aceCounter; i++)
        {
            if(cpuTotal + 10 <= 21)
            {
                cpuTotal = cpuTotal + 10;
            } 
        }
    }
    console.log("playerTotal", playerTotal)
    console.log("cpuTotal", cpuTotal)
}

function cpuTurn()
{
    handCounter("cpu")
    if(cpuHold === false)
    {
        if(cpuTotal <= 11)
        {
            document.getElementById("cpuChoice").innerText = 'Computer says "Hit me!"'
            let cpuDelay1 = setTimeout(() =>{    
                draw("cpu" , "faceup")

            }, 1000)

            let cpuDelay2 = setTimeout(() =>{
                handCounter("cpu")
                if(cpuTotal > 21)
                {
                    gameover("win")
                    document.getElementById("cpuChoice").innerText = 'Computer says "I lost!"'
                    cpuHold = true;
                }
            }, 2000)
        }
        else
        {
            let cpuRNG = Math.floor(Math.random()*10 + 1)
            handCounter("cpu")
            if(cpuRNG < (21 - cpuTotal))
            {
                document.getElementById("cpuChoice").innerText = 'Computer says "Hit me!"'
                let cpuDelay3 = setTimeout(() =>{    
                draw("cpu" , "faceup")

                }, 1000)

                let cpuDelay4 = setTimeout(() =>{
                    handCounter("cpu")
                    if(cpuTotal > 21)
                    {
                        gameover("win")
                        document.getElementById("cpuChoice").innerText = 'Computer says "I lost!"'
                        cpuHold = true;
                    }
                }, 2000)
            }
            else
            {
                let cpuDelay5 = setTimeout(() =>{
                    document.getElementById("cpuChoice").innerText = 'Computer says "I hold!"'
                    cpuHold = true;
                    if(playerHold === true)
                    {
                        gameover("calculate")
                    }
                }, 1000)
            }
        }
    }
    // if(playerHold === true && cpuHold === false)
    // {
    //     let cpuDelay7 = setTimeout(() =>{
    //         cpuTurn()
    //     }, 3000)
    // }
    // else
    // {
        let cpuDelay6 = setTimeout(()=>{
            if(playerHold === true && cpuHold === false)
            {
                cpuTurn()
            }
            else{
            document.getElementById("hit").classList.remove('hidden')
            document.getElementById("hold").classList.remove('hidden')
            document.getElementById("cpuChoice").innerText = "";
            }
        }, 3000)
    
}

function gameover(result)
{
    let clear = document.getElementsByClassName("newCard")
    for(let i = clear.length - 1; i >= 0; i--)
    {
        document.getElementById(`image${clear[i].getAttribute('code')}`).classList.remove('hidden')
    }

    if(result === "win")
    {
        document.getElementById('result').innerText = "You Win!"
    }
    else if(result === "lose")
    {
        document.getElementById('result').innerText = "You Lose!"
    }
    else if(result === "tie")
    {
        document.getElementById('result').innerText = "You Tied!"
    }
    else if(result === "calculate")
    {
        handCounter("player")
        let pTotal = playerTotal;
        handCounter("cpu")
        let cTotal = cpuTotal;
        if(cTotal > pTotal)
        {
            document.getElementById('result').innerText = "You Lose!"
        }
        else if(cTotal < pTotal)
        {
            document.getElementById('result').innerText = "You Win!"
        }
        else
        {
            document.getElementById('result').innerText = "You Tied!"
        }
    }
    document.getElementById("hit").classList.add('hidden')
    document.getElementById("hold").classList.add('hidden')
    document.getElementById("button").classList.remove('hidden')


    
}
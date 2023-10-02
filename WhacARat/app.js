const gamespace = document.querySelectorAll('.square');
const creature = document.querySelectorAll('.creature');
const creatureRare = document.querySelectorAll('.creatureRare');
const creature1 = document.querySelectorAll('.creature1');
const creature2 = document.querySelectorAll('.creature2');
const creature3 = document.querySelectorAll('.creature3');
const sinner = document.querySelectorAll('.sinner');
const score = document.querySelector('#score');
const miss = document.querySelector('#miss');
// I know I can put these images as an array and set values but no :).

let globalInterval = null;
let result = 0;
let total = 0;
let hitPos;
let audio = new Audio('./sounds/wet.mp3');
let missaudio = new Audio('./sounds/teleport.mp3');
let laser = new Audio('./sounds/laser.mp3');
let misses = 0;
// Global variables (Needed).

function randomCreatureSpot()
{
    gamespace.forEach(square => {
        square.classList.remove('creature');
        square.classList.remove('creatureRare');
        square.classList.remove('creature1');
        square.classList.remove('creature2');
        square.classList.remove('creature3');
        square.classList.remove('sinner');
    });
    // This is for the image tiles for the squares.

    let randomPos = gamespace[Math.floor(Math.random() * 9)];
    // console.log(randomPos);
    // Testing to see if creature will be random for every call.

    randomPos.classList.add('creature');
    hitPos = randomPos.id;
    // Using randomizer to create a random position variable, this variable is
    // used to add in the first creature, variable hitPos is set to randomPos variable
    // to accurately calculate score.

    // This is the Nested If Statement to change game speed, text-color, and image.
    if (total > 6) {
        clearInterval(globalInterval);
        globalInterval = setInterval(randomCreatureSpot, 750);
        document.getElementById("score").style.color = "green";
        randomPos.classList.add('creatureRare');
        if (total > 15) {
            clearInterval(globalInterval);
            globalInterval = setInterval(randomCreatureSpot, 500);
            document.getElementById("score").style.color = "orange";
            randomPos.classList.add('creature1');
            if (total > 23) {
                clearInterval(globalInterval);
                globalInterval = setInterval(randomCreatureSpot, 325);
                document.getElementById("score").style.color = "red";
                randomPos.classList.add('creature2');
                if (total > 30) {
                    clearInterval(globalInterval);
                    globalInterval = setInterval(randomCreatureSpot, 200);
                    document.getElementById("score").style.color = "purple";
                    randomPos.classList.add('creature3');
                    if (total > 35) {
                        clearInterval(globalInterval);
                        globalInterval = setInterval(randomCreatureSpot, 75);
                        document.getElementById("score").style.color = "gold";
                        randomPos.classList.add('sinner');
                    }
                }
            }
        }
    }
}

gamespace.forEach(square => {
    // Everytime a successful creature hit.
    // Everytime a miss occurs.
    square.addEventListener('mousedown', () => {
        if (square.id == hitPos) {
            console.log('Hit Documented');
            result++;
            total++;
            audio.play();
            score.textContent = result;
            hitPos = null;
        }
        else {
            if (globalInterval != null) {
                // Kinda janky workaround to prevent player from getting "misses" before the game has started.
                // Only works if globalInterval value is not null.
                console.log("MISS!");
                misses++;
                miss.textContent = misses;
                missaudio.play();
            }
        }
    })
})

function moveCreature()
{
    // Setting base speed of creature to 1000 (1 second).
    globalInterval = setInterval(randomCreatureSpot, 1000);

    let turnOff = document.getElementById("start");
    turnOff.disabled = true;
    // Disables the option for player to press start multiple times, would cause many issues...
}

function toggleMute() {
    // Toggles off the annoying sounds if player dislikes
    audio.muted = !audio.muted;
    missaudio.muted = !missaudio.muted;

    if (audio.muted == true) {
        let muteAll = document.getElementById("mute");
        muteAll.textContent = "Unmute";
    }
    else {
        let muteAll = document.getElementById("mute");
        muteAll.textContent = "Mute";
    }
}

function resetAll()
{
    // Simple game reset with score/miss results.
    window.alert("Your Score is: " + result);
    window.alert("You Missed: " + misses);
    location.reload();
}
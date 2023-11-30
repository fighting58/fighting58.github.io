function generatePuzzle() {
    // 표 초기화
    clearTable();
    clearCanvas();
    clearPoints();

    // 표 생성
    const table = document.getElementById('puzzleTable');
    const usedNumbersRow = new Set();
    const usedNumbersCol = new Set();
    for (let i = 0; i < 6; i++) {
        const row = table.insertRow();
        for (let j = 0; j < 6; j++) {
            const cell = row.insertCell();
            if (i === 0 && j === 0) {
                cell.textContent = '×';
                cell.classList.add("operationSymbol")
            } else if (i === 0) {
                let randomNumber;
                do {
                randomNumber =randomIntFromInterval(1,9);
                } while (usedNumbersRow.has(randomNumber));
                usedNumbersRow.add(randomNumber);
                cell.textContent = randomNumber;
                cell.classList.add("calculationItem")
            } else if (j === 0) {
                let randomNumber;
                do {
                randomNumber = randomIntFromInterval(1,9);
                } while (usedNumbersCol.has(randomNumber));
                usedNumbersCol.add(randomNumber);
                cell.textContent = randomNumber;
                cell.classList.add("calculationItem")             
            } else {
                const input = document.createElement('input');
                input.type = 'text';
                cell.appendChild(input);
            }
        }
    }
}

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function clearTable() {
    const table = document.getElementById('puzzleTable');
    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }
}

function clearCanvas() {
    const canvas = document.querySelector("canvas");
    if (canvas) {
        canvas.parentNode.removeChild(canvas);
    }
}

function clearPoints() {
    const scoreText = document.getElementById('scoreboard');
    scoreText.textContent = ''
}

function checkAnswers() {
    const table = document.getElementById('puzzleTable');
    let score = 0;
    clearCanvas();

    for (let i = 1; i < table.rows.length; i++) {
        for (let j = 1; j < table.rows[i].cells.length; j++) {
            const firstRowSum = parseInt(table.rows[i].cells[0].textContent, 10);
            const firstColSum = parseInt(table.rows[0].cells[j].textContent, 10);
            const userInput = parseInt(table.rows[i].cells[j].querySelector('input').value, 10);
            if (userInput !== firstRowSum * firstColSum) {
                table.rows[i].cells[j].querySelector('input').classList.add('red-text');
            } else {
                table.rows[i].cells[j].querySelector('input').classList.remove('red-text');
                score++;
            }
        }
    }
    const scoreText = document.getElementById('scoreboard');
    let scorePoint = score * 4;
    let html_score = [`와~~ 굉장해요!! <br> <span id="displayingScore100" blink=True>${scorePoint} 점!!</span>`,
                        `조금만 더 노력하세요~ <br> <span id="displayingScoreOver80">${scorePoint} 점!!</span>`,
                        `집중력이 부족해요.. <br> <span id="displayingScoreUnder80" blink=true>${scorePoint} 점!!</span>`
                    ]
    let idx = (scorePoint > 99) ? 0 : (scorePoint >=80 ? 1 : 2)
    scoreText.innerHTML = html_score[idx];
    
    createFireworksEffect(100, scorePoint);
}

/**
* Function to create a fireworks effect.
*
* @param {number} numParticles - The number of particles to create for the fireworks effect.
*/
function createFireworksEffect(numParticles, score) {
    // Create a canvas element
    const canvas = document.createElement("canvas");
    const table = document.getElementById('puzzleTable');
    const tableLeft = table.offsetLeft;
    const tableTop = table.offsetTop;
    const tableWidth = table.offsetWidth;
    const tableHeight = table.offsetHeight;

    canvas.width = tableWidth;
    canvas.height = tableHeight;
    canvas.width = tableWidth;
    canvas.height = tableHeight;

    // Position the canvas above the table
    canvas.style.position = "absolute";
    canvas.style.left = `${tableLeft}px`;
    canvas.style.top = `${tableTop}px`;
    canvas.style.zIndex = "2";
    document.body.appendChild(canvas);

    // Get the 2D rendering context
    const ctx = canvas.getContext("2d");

    // Array to store the particles
    const particles = [];

    // Function to create a particle
    function createParticle(x, y) {
        const particle = {
            x: x,
            y: y,
            size: Math.random() * 4 + 1,
            speedX: Math.random() * 8 - 4,
            speedY: Math.random() * 8 - 4,
            color: `hsl(${Math.random() * 360}, 50%, 50%)`
        };
        particles.push(particle);
    }

    // Function to animate the particles
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < particles.length; i++) {
            const particle = particles[i];

            particle.x += particle.speedX;
            particle.y += particle.speedY;
            particle.size -= 0.05;

            if (particle.size <= 0) {
                particles.splice(i, 1);
                i--;
                continue;
            }

            ctx.fillStyle = particle.color;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();
        }
        requestAnimationFrame(animateParticles);
    }

    // Function to simulate mouse click events
    function simulateClickEvents() {
        const canvasRect = canvas.getBoundingClientRect();

        function simulateClick() {
            const randomX = Math.random() * canvas.width;
            const randomY = Math.random() * canvas.height;

            const event = new MouseEvent("customclick", {
                bubbles: true,
                clientX: canvasRect.left + randomX,
                clientY: canvasRect.top + randomY,
            });

            canvas.dispatchEvent(event);
        }

        let clickCounter = 0;
        const clickInterval = setInterval(() => {
            simulateClick();
            clickCounter++;

            if (clickCounter >= numParticles) {
                clearInterval(clickInterval);
            }
        }, 100); // Interval set to 1000 milliseconds (1 second) for 5 clicks in 5 seconds
    }

    // Function to handle mouse click event
    function handleClick(event) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        for (let i = 0; i < numParticles; i++) {
            createParticle(mouseX, mouseY);
        }
    }

    // Add event listener for mouse click
    canvas.addEventListener("customclick", handleClick);

    if (score >= 99) {
        simulateClickEvents();
        animateParticles();
    }
}

function setBackgroundImage() {
    const body = document.body;
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const scoreboard = document.getElementById('scoreboard') 
    const scoreboardTop = scoreboard.offsetTop
    const scoreboardHeight = scoreboard.offsetHeight

    if (screenWidth > screenHeight) {
        // 가로형 배경 이미지 설정
        body.style.backgroundImage = 'url("images/pokemon-bulbasaur_landscape.jpg")';
    } else {
        // 세로형 배경 이미지 설정
        body.style.backgroundImage = 'url("images/bulbasaur_150x128.png")';
        body.style.backgroundPosition = `center ${scoreboardTop + scoreboardHeight - 80}px`
    }
}

window.onload = function() {
generatePuzzle();
};

setBackgroundImage();

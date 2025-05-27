let pawns = []
let dimSquares = 60;
let occupiedSquares = []

function setup() {
    createCanvas(480, 480);
    generateRandomPositions();
}

function draw() {
    drawTable();
    drawPawns();
}

function drawTable() {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            let x = i * dimSquares;
            let y = j * dimSquares;

            if ((i + j) % 2 === 0) {
                fill("white");
            } else {
                fill("black");
            }

            rect(x, y, dimSquares, dimSquares);
        }
    }
}

function makePawns(i, j, color) {
    return {
        i: i,
        j: j,
        color: color,
        x: i * dimSquares + dimSquares / 2,
        y: j * dimSquares + dimSquares / 2,
        ray: dimSquares / 3
    };
}


function drawPawns() {
    for (let pawn of pawns)
        drawSmileyFace(pawn.x, pawn.y, pawn.ray, pawn.color);

}

function drawSmileyFace(x, y, r, color) {
    let diameter = r * 2
    stroke(0)
    fill(color)
    circle(x, y, diameter)

    // ochi
    fill("white");
    circle(x - r / 2, y - r / 3, r / 2);
    circle(x + r / 2, y - r / 3, r / 2);

    // pupile
    fill("black");
    circle(x - r / 2, y - r / 3, r / 4); 
    circle(x + r / 2, y - r / 3, r / 4); 


    // gura
    fill("red");
    arc(x, y + r / 6, r, r / 2, 0, PI);

    
}

function randomPosition() {
    return [floor(random(0, 8)), floor(random(0, 8))]
}

function isOccupied(i, j) {
    for (let p of pawns) {
        if (p.i === i && p.j === j) {
            return true;
        }
    }
    return false
}

function generateRandomPositions() {
    while (occupiedSquares.length <= 16) {
        let [i, j] = randomPosition()
        if (!isOccupied(i, j)) {
            occupiedSquares.push([i, j])
            let color
            if (occupiedSquares.length <= 8)
                color = "white"
            else color = "gray"
            pawns.push(makePawns(i, j, color))
        }
    }
}
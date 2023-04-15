let field = document.querySelector('.field');
let gameMap = [];

//заполнение массива
for (let i = 0; i < 20; i++) {
    gameMap.push([]);

    for (let j = 0; j < 20; j++) {
        gameMap[i][j] = {
            x: j,
            y: i,
            value: 'wall'
        }
    }
}

//добавление комнат
let roomCount = 0;
let room = 10;
let floorMap = [];
while (roomCount < room) {
    let randomRow = Math.floor(Math.random() * 20);
    let randomCol = Math.floor(Math.random() * 20);

    gameMap[randomRow][randomCol].value = 'floor';

    let randomWidth = Math.floor(Math.random() * 8);
    let randomHeight = Math.floor(Math.random() * 8);

    for (let i = 0; i < randomHeight; i++) {
        if (randomRow + i < 20) {
            gameMap[randomRow + i][randomCol].value = 'floor';
            floorMap.push({ row: randomRow + i, col: randomCol });
            for (let j = 0; j < randomWidth; j++) {
                if (randomCol + j < 20) {
                    gameMap[randomRow][randomCol].value = 'floor';
                    gameMap[randomRow + i][randomCol + j].value = 'floor';
                    floorMap.push({ row: randomRow + i, col: randomCol + j });
                }
            }
        }
    }

    roomCount++;
}

let randomPlace = Math.floor(Math.random() * floorMap.length);
let spawnGG = floorMap[randomPlace];
gameMap[spawnGG.row][spawnGG.col].value = 'gg';

// отрисовка карты
function renderMap() {
    for (let i = 0; i < 20; i++) { //row
        for (let j = 0; j < 20; j++) { //col
            const wall = document.createElement('div');
            const gg = document.createElement('div');
            if (gameMap[i][j].value == 'floor') {
                wall.classList.add('tile');
                field.append(wall);
            } else if (gameMap[j][i].value == 'gg') {
                gg.classList.add('tileP');
                field.append(gg);
            } else {
                wall.classList.add('tileW');
                field.append(wall);
            }
        }
    }
}

//управление
document.addEventListener('keydown', (e) => keyDownHandler(e.code));

function keyDownHandler(e) {
    switch (e) {
        case 'KeyW':
            field.innerHTML = '';
            spawnGG.row = spawnGG.row + 1;
            renderMap();
            break;
        case 'KeyS':
            field.innerHTML = '';
            spawnGG.row = spawnGG.row - 1;
            renderMap();
            break;
        case 'KeyA':
            field.innerHTML = '';
            spawnGG.col = spawnGG.col - 1;
            renderMap();
            break;
        case 'KeyD':
            field.innerHTML = '';
            spawnGG.col = spawnGG.col + 1;
            renderMap();
            break;
    }
}

renderMap();
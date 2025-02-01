export function placeShips(ships, board) {
    // Жёстко заданные позиции кораблей
    const predefinedPositions = [
        { startRow: 0, startCol: 0, orientation: 'horizontal', length: 4 }, // 4-палубный
        { startRow: 2, startCol: 0, orientation: 'horizontal', length: 3 }, // 3-палубный 1
        { startRow: 4, startCol: 5, orientation: 'vertical', length: 3 },   // 3-палубный 2
        { startRow: 6, startCol: 0, orientation: 'horizontal', length: 2 }, // 2-палубный 1
        { startRow: 8, startCol: 3, orientation: 'horizontal', length: 2 }, // 2-палубный 2
        { startRow: 5, startCol: 9, orientation: 'vertical', length: 2 },   // 2-палубный 3
        { startRow: 9, startCol: 0, orientation: 'horizontal', length: 1 }, // 1-палубный 1
        { startRow: 9, startCol: 2, orientation: 'horizontal', length: 1 }, // 1-палубный 2
        { startRow: 9, startCol: 4, orientation: 'horizontal', length: 1 }, // 1-палубный 3
        { startRow: 9, startCol: 6, orientation: 'horizontal', length: 1 }  // 1-палубный 4
    ];

    if (ships.length !== predefinedPositions.length) {
        console.error('Количество кораблей не совпадает с количеством позиций.');
        return;
    }

    // Размещаем корабли по заранее определённым координатам
    for (let i = 0; i < ships.length; i++) {
        const ship = ships[i];
        const position = predefinedPositions[i];

        // Проверяем, подходит ли длина
        if (ship.length !== position.length) {
            console.error(`Ошибка: длина корабля №${i + 1} не соответствует заданной позиции.`);
            continue;
        }

        // Проверяем возможность размещения (на всякий случай)
        if (canPlaceShip(ship, position.startRow, position.startCol, position.orientation, board)) {
            placeShip(ship, position.startRow, position.startCol, position.orientation, board);
            console.log(`Корабль №${i + 1} размещён на (${position.startRow}, ${position.startCol}) с ориентацией ${position.orientation}`);
        } else {
            console.error(`Не удалось разместить корабль №${i + 1} на (${position.startRow}, ${position.startCol}).`);
        }
    }
}

// Проверка возможности размещения
function canPlaceShip(ship, startRow, startCol, orientation, board) {
    for (let i = 0; i < ship.length; i++) {
        const row = orientation === 'horizontal' ? startRow : startRow + i;
        const col = orientation === 'horizontal' ? startCol + i : startCol;

        if (row >= 10 || col >= 10) return false;

        // Проверка на занятость и соседство
        for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
                const r = row + dr;
                const c = col + dc;
                if (r >= 0 && r < 10 && c >= 0 && c < 10 && board.isCellOccupied(r, c)) {
                    return false;
                }
            }
        }
    }
    return true;
}

// Размещение корабля
function placeShip(ship, startRow, startCol, orientation, board) {
    ship.coordinates = [];

    for (let i = 0; i < ship.length; i++) {
        const row = orientation === 'horizontal' ? startRow : startRow + i;
        const col = orientation === 'horizontal' ? startCol + i : startCol;

        ship.coordinates.push({ row, col });
        board.placeShip(row, col, ship);
    }

    ship.isPlaced = true;
}
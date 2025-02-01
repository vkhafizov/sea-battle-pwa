export function placeShips(ships, board) {
    const orientations = ['horizontal', 'vertical'];

    for (const ship of ships) {
        let placed = false;
        let attempts = 0;

        while (!placed && attempts < 1000) {
            try {
                // Выбираем случайную ориентацию
                const orientation = orientations[Math.floor(Math.random() * 2)];

                // Ограничиваем стартовую позицию, чтобы корабль не выходил за границы
                const maxStartRow = orientation === 'horizontal' ? 10 : 10 - ship.length;
                const maxStartCol = orientation === 'horizontal' ? 10 - ship.length : 10;

                // Выбираем случайную стартовую позицию
                const startRow = Math.floor(Math.random() * maxStartRow);
                const startCol = Math.floor(Math.random() * maxStartCol);

                // Проверяем, можно ли разместить корабль
                if (canPlaceShip(ship, startRow, startCol, orientation, board)) {
                    // Размещаем корабль
                    placeShip(ship, startRow, startCol, orientation, board);
                    placed = true;
                }
            } catch (error) {
                console.error(error);
            } finally {
                attempts++;
            }
        }

        if (!placed) {
            console.error(`Не удалось разместить корабль длиной ${ship.length}`);
        }
    }
}

// Проверяет, можно ли разместить корабль
function canPlaceShip(ship, startRow, startCol, orientation, board) {
    for (let i = 0; i < ship.length; i++) {
        const row = orientation === 'horizontal' ? startRow : startRow + i;
        const col = orientation === 'horizontal' ? startCol + i : startCol;

        // Проверяем, что клетка не занята и не выходит за границы
        if (row >= 10 || col >= 10 || board.isCellOccupied(row, col)) {
            return false;
        }
    }
    return true;
}

// Размещает корабль на поле
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
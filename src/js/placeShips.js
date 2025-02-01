export function placeShips(ships, board) {
    // Жестко заданные позиции для каждого корабля
    const predefinedPositions = [
        { row: 0, col: 0, orientation: 'horizontal', length: 4 }, // 4-палубный
        { row: 2, col: 0, orientation: 'horizontal', length: 3 }, // 3-палубный 1
        { row: 4, col: 5, orientation: 'vertical', length: 3 },   // 3-палубный 2
        { row: 6, col: 0, orientation: 'horizontal', length: 2 }, // 2-палубный 1
        { row: 8, col: 3, orientation: 'horizontal', length: 2 }, // 2-палубный 2
        { row: 5, col: 9, orientation: 'vertical', length: 2 },   // 2-палубный 3
        { row: 9, col: 0, orientation: 'horizontal', length: 1 }, // 1-палубный 1
        { row: 9, col: 2, orientation: 'horizontal', length: 1 }, // 1-палубный 2
        { row: 9, col: 4, orientation: 'horizontal', length: 1 }, // 1-палубный 3
        { row: 9, col: 6, orientation: 'horizontal', length: 1 }  // 1-палубный 4
    ];

    for (let i = 0; i < ships.length; i++) {
        const ship = ships[i];
        const position = predefinedPositions[i];

        // Просто размещаем корабль без проверок
        ship.coordinates = [];

        for (let j = 0; j < ship.length; j++) {
            const row = position.orientation === 'horizontal' ? position.row : position.row + j;
            const col = position.orientation === 'horizontal' ? position.col + j : position.col;

            ship.coordinates.push({ row, col });
            board.placeShip(row, col, ship);  // Просто размещаем корабль
        }

        ship.isPlaced = true;
    }
}
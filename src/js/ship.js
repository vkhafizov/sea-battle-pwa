export class Ship {
    constructor(length) {
        this.length = length; // Длина корабля
        this.hits = 0;        // Количество попаданий
        this.coordinates = []; // Координаты корабля на поле
        this.isPlaced = false; // Флаг, указывающий, размещен ли корабль
    }

    // Размещение корабля на поле
    place(startRow, startCol, orientation, board) {
        this.coordinates = []; // Очищаем предыдущие координаты

        // Определяем координаты корабля в зависимости от ориентации
        for (let i = 0; i < this.length; i++) {
            if (orientation === 'horizontal') {
                this.coordinates.push({ row: startRow, col: startCol + i });
            } else if (orientation === 'vertical') {
                this.coordinates.push({ row: startRow + i, col: startCol });
            }
        }

        // Проверяем, что корабль не выходит за пределы поля
        if (this.coordinates.some(coord => coord.row < 0 || coord.row >= 10 || coord.col < 0 || coord.col >= 10)) {
            throw new Error('Корабль выходит за пределы поля');
        }

        // Проверяем, что корабль не пересекается с другими кораблями
        for (const coord of this.coordinates) {
            if (board.isCellOccupied(coord.row, coord.col)) {
                throw new Error('Корабль пересекается с другим кораблем');
            }
        }

        // Размещаем корабль на поле
        for (const coord of this.coordinates) {
            board.placeShip(coord.row, coord.col, this);
        }

        this.isPlaced = true;
    }

    // Проверка, попал ли выстрел в корабль
    isHit(row, col) {
        const isHit = this.coordinates.some(coord => coord.row === row && coord.col === col);
        if (isHit) {
            this.hits++; // Увеличиваем количество попаданий
        }
        return isHit;
    }

    // Проверка, потоплен ли корабль
    isSunk() {
        return this.hits >= this.length;
    }
}
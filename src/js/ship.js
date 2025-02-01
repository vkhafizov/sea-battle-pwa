export class Ship {
    constructor(length) {
        this.length = length;
        this.hits = 0;
        this.coordinates = [];
        this.isPlaced = false;
    }

    place(startRow, startCol, orientation, board) {
        this.coordinates = []; // Очищаем предыдущие координаты

        for (let i = 0; i < this.length; i++) {
            let row, col;

            if (orientation === 'horizontal') {
                row = startRow;
                col = startCol + i;
            } else if (orientation === 'vertical') {
                row = startRow + i;
                col = startCol;
            } else {
                throw new Error('Неправильная ориентация корабля');
            }

            // Проверка на выход за границы поля
            if (row < 0 || row >= 10 || col < 0 || col >= 10) {
                throw new Error('Корабль выходит за пределы поля');
            }

            // Проверка на пересечение с другими кораблями
            if (board.isCellOccupied(row, col)) {
                throw new Error('Корабль пересекается с другим кораблем');
            }

            this.coordinates.push({ row, col });
        }

        // Размещаем корабль на поле
        for (const coord of this.coordinates) {
            board.placeShip(coord.row, coord.col, this);
        }

        this.isPlaced = true;
    }

    isHit(row, col) {
        const isHit = this.coordinates.some(coord => coord.row === row && coord.col === col);
        if (isHit) {
            this.hits++;
        }
        return isHit;
    }

    isSunk() {
        return this.hits >= this.length;
    }
}
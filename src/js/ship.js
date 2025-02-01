export class Ship {
    constructor(length) {
        this.length = length;
        this.hits = 0;
        this.coordinates = [];
        this.isPlaced = false;
    }

    place(startRow, startCol, orientation, board) {
        const newCoordinates = [];

        for (let i = 0; i < this.length; i++) {
            const row = orientation === 'horizontal' ? startRow : startRow + i;
            const col = orientation === 'horizontal' ? startCol + i : startCol;

            if (row < 0 || row >= 10 || col < 0 || col >= 10) {
                throw new Error('Корабль выходит за пределы поля');
            }

            if (board.isCellOccupied(row, col)) {
                throw new Error('Корабль пересекается с другим кораблем');
            }

            newCoordinates.push({ row, col, isHit: false });
        }

        this.coordinates = newCoordinates;

        // Размещаем корабль на поле
        for (const coord of this.coordinates) {
            board.placeShip(coord.row, coord.col, this);
        }

        if (!board.ships.includes(this)) {
            board.ships.push(this);
        }

        this.isPlaced = true;
    }

    isHit(row, col) {
        const hitCoord = this.coordinates.find(coord => coord.row === row && coord.col === col);
        if (hitCoord && !hitCoord.isHit) {
            hitCoord.isHit = true;
            this.hits++;
            return true;
        }
        return false;
    }

    isSunk() {
        return this.coordinates.every(coord => coord.isHit);
    }
}
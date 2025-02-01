import { Ship } from './ship.js';
import { placeShips } from './placeShips.js';

export class Player {
    constructor() {
        this.ships = [];
        this.initializeShips();
    }

    initializeShips() {
        this.ships = [
            new Ship(4), // 1 четырехпалубный
            new Ship(3), new Ship(3), // 2 трехпалубных
            new Ship(2), new Ship(2), new Ship(2), // 3 двухпалубных
            new Ship(1), new Ship(1), new Ship(1), new Ship(1) // 4 однопалубных
        ];
    }

    placeShips(board) {
        placeShips(this.ships, board);
    }

    receiveAttack(row, col) {
        for (const ship of this.ships) {
            if (ship.isHit(row, col)) {
                console.log(`Игрок: попадание в корабль на (${row}, ${col})`);
                return true;
            }
        }
        console.log(`Игрок: промах по (${row}, ${col})`);
        return false;
    }

    allShipsSunk() {
        return this.ships.every(ship => ship.isSunk());
    }
}
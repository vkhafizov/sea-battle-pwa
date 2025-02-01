import { Ship } from './ship.js';

export class Bot {
    constructor() {
        this.ships = [];
        this.initializeShips();
        this.availableShots = [];
        this.initializeShots();
    }

    initializeShips() {
        this.ships = [
            new Ship(4), // 1 четырехпалубный
            new Ship(3), new Ship(3), // 2 трехпалубных
            new Ship(2), new Ship(2), new Ship(2), // 3 двухпалубных
            new Ship(1), new Ship(1), new Ship(1), new Ship(1) // 4 однопалубных
        ];
    }

    initializeShots() {
        for (let row = 0; row < 10; row++) {
            for (let col = 0; col < 10; col++) {
                this.availableShots.push({ row, col });
            }
        }
    }

    placeShips(board) {
        for (const ship of this.ships) {
            let placed = false;
            let attempts = 0; // Ограничим количество попыток

            while (!placed && attempts < 100) {
                try {
                    const row = Math.floor(Math.random() * 10);
                    const col = Math.floor(Math.random() * 10);
                    const orientation = Math.random() < 0.5 ? 'horizontal' : 'vertical';
                    ship.place(row, col, orientation, board);
                    placed = true;
                } catch (error) {
                    attempts++; // Увеличиваем счетчик попыток
                }
            }

            if (!placed) {
                console.error(`Не удалось разместить корабль длиной ${ship.length}`);
            }
        }
    }

    makeMove() {
        const index = Math.floor(Math.random() * this.availableShots.length);
        const shot = this.availableShots.splice(index, 1)[0];
        return shot;
    }

    receiveAttack(row, col) {
        for (const ship of this.ships) {
            if (ship.isHit(row, col)) {
                console.log(`Бот: попадание в корабль на (${row}, ${col})`);
                return true;
            }
        }
        console.log(`Бот: промах по (${row}, ${col})`);
        return false;
    }

    allShipsSunk() {
        return this.ships.every(ship => ship.isSunk());
    }
}
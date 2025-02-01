import { Ship } from './ship.js';

export class Player {
    constructor() {
        this.ships = []; // Массив кораблей игрока
        this.initializeShips(); // Инициализация кораблей
    }

    // Инициализация кораблей
    initializeShips() {
        // Создаем корабли разной длины
        this.ships.push(new Ship(4)); // 1 корабль длиной 4 клетки
        this.ships.push(new Ship(3)); // 2 корабля длиной 3 клетки
        this.ships.push(new Ship(3));
        this.ships.push(new Ship(2)); // 3 корабля длиной 2 клетки
        this.ships.push(new Ship(2));
        this.ships.push(new Ship(2));
        this.ships.push(new Ship(1)); // 4 корабля длиной 1 клетка
        this.ships.push(new Ship(1));
        this.ships.push(new Ship(1));
        this.ships.push(new Ship(1));
    }

    // Размещение кораблей на поле
    placeShips(board) {
    for (const ship of this.ships) {
        let placed = false;
        while (!placed) {
            try {
                const row = Math.floor(Math.random() * 10);
                const col = Math.floor(Math.random() * 10);
                const orientation = Math.random() < 0.5 ? 'horizontal' : 'vertical';
                ship.place(row, col, orientation, board);
                placed = true;
            } catch (error) {
                // Если размещение не удалось, пробуем снова
            }
        }
    }
}

    // Обработка выстрела бота
    receiveAttack(row, col) {
        // Проверяем, попал ли выстрел в какой-либо корабль
        for (const ship of this.ships) {
            if (ship.isHit(row, col)) {
                console.log(`Игрок: попадание в корабль на (${row}, ${col})`);
                return true; // Попадание
            }
        }
        console.log(`Игрок: промах по (${row}, ${col})`);
        return false; // Промах
    }

    // Проверка, все ли корабли игрока потоплены
    allShipsSunk() {
        return this.ships.every(ship => ship.isSunk());
    }
}
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
        // Временная реализация: размещаем корабли вручную
        // В будущем можно добавить логику для автоматического или интерактивного размещения
        this.ships[0].place(0, 0, 'horizontal', board); // Корабль длиной 4
        this.ships[1].place(2, 2, 'vertical', board);   // Корабль длиной 3
        this.ships[2].place(4, 5, 'horizontal', board); // Корабль длиной 3
        this.ships[3].place(6, 0, 'vertical', board);   // Корабль длиной 2
        this.ships[4].place(8, 3, 'horizontal', board); // Корабль длиной 2
        this.ships[5].place(9, 7, 'vertical', board);   // Корабль длиной 2
        this.ships[6].place(1, 9, 'horizontal', board); // Корабль длиной 1
        this.ships[7].place(3, 7, 'horizontal', board); // Корабль длиной 1
        this.ships[8].place(5, 9, 'horizontal', board); // Корабль длиной 1
        this.ships[9].place(7, 9, 'horizontal', board); // Корабль длиной 1
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
import { Ship } from './ship.js';

export class Bot {
    constructor() {
        this.ships = []; // Массив кораблей бота
        this.initializeShips(); // Инициализация кораблей
        this.availableShots = []; // Доступные для выстрела клетки
        this.initializeShots(); // Инициализация доступных выстрелов
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

    // Инициализация доступных выстрелов
    initializeShots() {
        // Создаем список всех возможных клеток для выстрела
        for (let row = 0; row < 10; row++) {
            for (let col = 0; col < 10; col++) {
                this.availableShots.push({ row, col });
            }
        }
    }

    // Размещение кораблей на поле
    placeShips(board) {
        for (const ship of this.ships) {
            let placed = false;
            while (!placed) {
                try {
                    // Генерируем случайные координаты и ориентацию
                    const row = Math.floor(Math.random() * 10);
                    const col = Math.floor(Math.random() * 10);
                    const orientation = Math.random() < 0.5 ? 'horizontal' : 'vertical';

                    // Пытаемся разместить корабль
                    ship.place(row, col, orientation, board);
                    placed = true;
                } catch (error) {
                    // Если размещение не удалось, пробуем снова
                }
            }
        }
    }

    // Совершение выстрела
    makeMove() {
        // Выбираем случайную клетку из доступных
        const index = Math.floor(Math.random() * this.availableShots.length);
        const shot = this.availableShots.splice(index, 1)[0]; // Удаляем клетку из доступных
        return shot;
    }

    // Обработка выстрела игрока
    receiveAttack(row, col) {
        // Проверяем, попал ли выстрел в какой-либо корабль
        for (const ship of this.ships) {
            if (ship.isHit(row, col)) {
                console.log(`Бот: попадание в корабль на (${row}, ${col})`);
                return true; // Попадание
            }
        }
        console.log(`Бот: промах по (${row}, ${col})`);
        return false; // Промах
    }

    // Проверка, все ли корабли бота потоплены
    allShipsSunk() {
        return this.ships.every(ship => ship.isSunk());
    }
}
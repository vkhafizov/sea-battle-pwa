export class Board {
    constructor(boardId) {
        this.boardId = boardId; // ID элемента поля (например, 'player-board' или 'bot-board')
        this.element = document.getElementById(boardId); // Элемент DOM для поля
        this.cells = []; // Массив клеток поля
        this.ships = []; // Массив кораблей на поле
        this.initialize(); // Инициализация поля
    }

    // Инициализация поля
    initialize() {
        // Создаем сетку 10x10
        this.element.innerHTML = ''; // Очищаем поле
        this.cells = []; // Очищаем массив клеток

        for (let row = 0; row < 10; row++) {
            const rowCells = [];
            for (let col = 0; col < 10; col++) {
                const cell = document.createElement('div');
                cell.dataset.row = row;
                cell.dataset.col = col;
                rowCells.push(cell);
                this.element.appendChild(cell);
            }
            this.cells.push(rowCells);
        }
    }

    // Размещение корабля на поле
    placeShip(row, col, ship) {
        if (this.isCellOccupied(row, col)) {
            throw new Error('Клетка уже занята');
        }

        // Добавляем корабль в массив кораблей
        this.ships.push(ship);

        // Помечаем клетку как занятую
        this.cells[row][col].classList.add('ship');
    }

    // Проверка, занята ли клетка
    isCellOccupied(row, col) {
        return this.cells[row][col].classList.contains('ship');
    }

    // Обработка выстрела
    receiveAttack(row, col) {
        const cell = this.cells[row][col];

        // Проверяем, попал ли выстрел в корабль
        if (this.isCellOccupied(row, col)) {
            cell.classList.add('hit'); // Помечаем клетку как попадание
            return true;
        } else {
            cell.classList.add('miss'); // Помечаем клетку как промах
            return false;
        }
    }

    // Отрисовка поля
    render() {
        for (let row = 0; row < 10; row++) {
            for (let col = 0; col < 10; col++) {
                const cell = this.cells[row][col];
                cell.className = ''; // Очищаем классы клетки

                if (this.isCellOccupied(row, col)) {
                    cell.classList.add('ship');
                }

                if (cell.classList.contains('hit')) {
                    cell.classList.add('hit');
                } else if (cell.classList.contains('miss')) {
                    cell.classList.add('miss');
                }
            }
        }
    }
}
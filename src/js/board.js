export class Board {
    constructor(boardId) {
        this.boardId = boardId;
        this.element = document.getElementById(boardId);
        this.cells = [];
        this.ships = [];
        this.initialize();
    }

    initialize() {
        this.element.innerHTML = '';
        this.cells = [];

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

    placeShip(row, col, ship) {
        if (this.isCellOccupied(row, col)) {
            throw new Error('Клетка уже занята');
        }
        this.ships.push(ship);
        this.cells[row][col].classList.add('ship');
    }

    isCellOccupied(row, col) {
        return this.cells[row][col].classList.contains('ship');
    }

    receiveAttack(row, col) {
        const cell = this.cells[row][col];
        if (this.isCellOccupied(row, col)) {
            cell.classList.add('hit');
            return true;
        } else {
            cell.classList.add('miss');
            return false;
        }
    }

    render() {
  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      const cell = this.cells[row][col];
      cell.className = ''; // Сбрасываем классы

      // Если клетка принадлежит кораблю и не поражена — добавляем класс `ship`
      if (this.isCellOccupied(row, col) && !cell.classList.contains('hit')) {
        cell.classList.add('ship');
      }

      // Добавляем классы для попаданий и промахов
      if (cell.classList.contains('hit')) {
        cell.classList.add('hit');
      } else if (cell.classList.contains('miss')) {
        cell.classList.add('miss');
      }
    }
  }
}
}
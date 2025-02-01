import { Player } from './player.js';
import { Bot } from './bot.js';
import { Board } from './board.js';

export class Game {
    constructor() {
        this.player = new Player();
        this.bot = new Bot();

        this.playerBoard = new Board('player-board');
        this.botBoard = new Board('bot-board');

        this.isGameOver = false;
        this.currentPlayer = 'player';
    }

    start() {
  // Очищаем предыдущие поля
  this.playerBoard.initialize();
  this.botBoard.initialize();

  // Размещаем корабли
  this.player.placeShips(this.playerBoard);
  this.bot.placeShips(this.botBoard);

  // Принудительная отрисовка
  this.playerBoard.render();
  this.botBoard.render();
}

    startPlayerTurn() {
        if (this.isGameOver) return;

        console.log('Ход игрока');

        // Добавляем обработчик кликов на поле бота
        this.botBoard.element.addEventListener('click', this.handlePlayerClick.bind(this));
    }

    handlePlayerClick(event) {
        if (this.isGameOver) return;

        const cell = event.target;
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);

        // Игрок делает выстрел
        const isHit = this.bot.receiveAttack(row, col);

        // Обновляем поле бота
        this.botBoard.render();

        // Проверяем, выиграл ли игрок
        if (this.bot.allShipsSunk()) {
            this.endGame('player');
            return;
        }

        // Переход к ходу бота
        if (!isHit) {
            this.currentPlayer = 'bot';
            this.startBotTurn();
        }
    }

    startBotTurn() {
        if (this.isGameOver) return;

        console.log('Ход бота');

        // Бот делает выстрел
        const { row, col } = this.bot.makeMove();
        const isHit = this.player.receiveAttack(row, col);

        // Обновляем поле игрока
        this.playerBoard.render();

        // Проверяем, выиграл ли бот
        if (this.player.allShipsSunk()) {
            this.endGame('bot');
            return;
        }

        // Переход к ходу игрока
        if (!isHit) {
            this.currentPlayer = 'player';
            this.startPlayerTurn();
        } else {
            this.startBotTurn(); // Бот ходит снова, если попал
        }
    }

    endGame(winner) {
        this.isGameOver = true;
        console.log(`Игра окончена. Победитель: ${winner}`);

        // Отключаем обработчики кликов
        this.botBoard.element.removeEventListener('click', this.handlePlayerClick);

        // Выводим сообщение о победе
        const messageElement = document.getElementById('message');
        messageElement.textContent = winner === 'player' ? 'Вы выиграли!' : 'Бот выиграл!';
    }
}
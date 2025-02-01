import { Game } from './game.js';

document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-button');
    const gameContainer = document.querySelector('.game-container');
    const messageElement = document.getElementById('message');

    let game;

    startButton.addEventListener('click', () => {
        // Скрываем кнопку и показываем игровое поле
        startButton.style.display = 'none';
        gameContainer.style.display = 'flex';
        messageElement.textContent = '';

        // Создаем новую игру
        game = new Game();
        game.start();
    });
});
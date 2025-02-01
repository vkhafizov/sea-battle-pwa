import { Game } from './game.js';

// Инициализация приложения
document.addEventListener('DOMContentLoaded', () => {
    // Создаем экземпляр игры
    const game = new Game();

    // Запускаем игру
    game.start();
});
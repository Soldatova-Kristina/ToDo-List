#  Todo App

Простое приложение для создания и управления списком задач.  
Реализовано с нуля на чистом JavaScript без библиотек.

```md
## Демонстрация

https://soldatova-kristina.github.io/ToDo-List/

##  Стек технологий

- HTML5
- CSS3 (переменные, кастомные чекбоксы, адаптивность)
- JavaScript (ES6+, модули)
- Методология БЭМ

## Структура проекта

assets/
├── icons/              // SVG-иконки интерфейса
│   ├── add.svg
│   ├── Clipboard.svg
│   ├── icon plus.svg
│   ├── Logo.svg
│   ├── trash act.svg
│   └── trash noAct.svg
├── preview.png         // Скриншот интерфейса (для README)

css/
└── style.css           // Основные стили

js/
├── layout.js           // Отвечает за создание DOM-элементов
├── logic.js            // Логика: добавление, удаление задач, счётчики
└── main.js             // Точка входа, инициализация layout + logic

index.html              // Главный HTML-файл
README.md               // Описание проекта

# Сухум Хаус — Hotel Website

React + Vite проект.

## Структура файлов

```
src/
├── App.jsx / App.css          — корневой компонент + дизайн-система
├── main.jsx / index.css       — точка входа
└── components/
    ├── Navbar/                — фиксированная навигация
    ├── Hero/                  — слайдер с эффектом Ken Burns
    ├── About/                 — секция "О нас" + карточки
    ├── Galleries/             — 3 фотогалереи с вкладками
    ├── Map/                   — Яндекс.Карты
    └── Footer/                — контакты
```

## Что нужно сделать

### 1. Фотографии
Положите фото в папки:
- `src/assets/main/` → `1.jpg`, `2.jpg`, `3.jpg`, `4.jpg` (слайдер на главной)
- `src/assets/gallery/` → `1.jpg` … `6.jpg` (основная галерея)
- `src/assets/kitchen/` → `1.jpg` … `4.jpg` (кухня)
- `src/assets/nearby/` → `1.jpg` … `6.jpg` (парк и пляж)

Количество фото можно изменить в `Galleries.jsx`:
```js
const GALLERIES = [
  { slides: makeSlides('/src/assets/gallery', 6) },   // число 6 = кол-во фото
  ...
]
```

### 2. Яндекс.Карты API ключ
В файле `Map.jsx` замените:
```
apikey=YOUR_API_KEY
```
на ваш ключ с [developer.tech.yandex.ru](https://developer.tech.yandex.ru/)

### 3. Координаты отеля
В `Map.jsx` измените:
```js
const HOTEL_COORDS = [43.0010, 41.0153]  // [широта, долгота]
```

### 4. Контакты
Обновите телефон, email и адрес в:
- `Navbar.jsx` (кнопка «Забронировать»)
- `Footer.jsx` (массив CONTACTS)
- `Map.jsx` (balloon placemark)

## Запуск

```bash
npm install
npm run dev
```

# Сервис поиска фильмов через API кинопоиска.
Сервис умеет по фильтрам искать фильмы, представленные в сервисе "Кинопоиск", а также предоставляет возможность сохранять фильмы в список избранных.

## Запуск проекта

### Установка зависимостей
Перед запуском проекта необходимо установить все зависимости: `npm i`.

### Создание файла окружения .env
Необходимо в корне проекта создать файл .env и записать туда две переменных:
```
REACT_APP_API_TOKEN = 'Ваш токен для api.kinopoisk.dev'
REACT_APP_API_HOST = 'https://api.kinopoisk.dev/'
```
Для тестирования приложения можно скопировать содержимое .env.default и поместить содержимое в файл .env.

### Запуск приложения
Для старта приложения необходимо прописать команду `npm run start`. Программа запустится локально

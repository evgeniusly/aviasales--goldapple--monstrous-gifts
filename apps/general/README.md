# Devcom SPA General App

Центральное приложение для работы со спецами на React и Modern.js.

## Полезная информация

- [Документация Modern.js](https://modernjs.dev/guides/get-started/introduction.html)

## Структура приложения

Приложение представляет собой базовую структуру Modern.js:

- [./src] - Код клиентской части приложения.
- [./api/lambda] - API приложения, реализованное на Modern.js BFF.
- [./server] - Контроллер BFF
- [./shared] - Общие модули, используемые как в клиентской, так и в серверной части приложения.

## Установка

Для работы с проектом вам потребуется завести ключ для работы с `@kosyanmedia`.
От вас потребуется поместить ваш токен Github на чтение пакетов в `~/.yarnrc.yml`:

```yaml
npmScopes:
  kosyanmedia:
    npmAlwaysAuth: true
    npmAuthToken: <ваш токен>
```

Более подробно на [Github](https://docs.github.com/en/packages/learn-github-packages/introduction-to-github-packages).

Далее установите зависимости:

```bash
yarn install
```

## Конфигурация

Приложение использует переменные окружения, которые хранятся в файле `.env`.

- `MODERN__DEADLINE_DATE` - Дата окончания спецов в формате `YYYY-MM-DD`.
- `MODERN__ALTCRAFT__USERNAME` - Имя пользователя для Altcraft.
- `MODERN__ALTCRAFT__PASSWORD` - Пароль для Altcraft.
- `MODERN__ALTCRAFT__CAMPAIGN` - Идентификатор кампании в Altcraft.
- `MODERN__SMART_CAPTCHA__SITE_KEY` - Site Key для Yandex Smart Captcha (клиентская часть).
- `MODERN__SMART_CAPTCHA__SERVER_KEY` - Server Key для Yandex Smart Captcha (серверная валидация).
- `MODERN__SMART_CAPTCHA__SKIP` - Флаг, указывающий, нужно ли пропускать проверку Smart Captcha (используется для дебага).
- `MODERN__SMART_CAPTCHA__HEADER_NAME` - Имя заголовка для проверки Smart Captcha. Опциональный параметр, по умолчанию `x-smart-captcha-token`.
- `MODERN__USE_SMART_CAPTCHA` - Используем SmartCaptcha вместо Altcha.

### Режим S3

Ряд функционала приложения зависит от хранения файлов в S3-совместимом хранилище и требует дополнительных переменных окружения:

- `MODERN__S3__ENDPOINT` - URL S3-совместимого хранилища.
- `MODERN__S3__ACCESS_KEY_ID` - Ключ доступа к S3.
- `MODERN__S3__SECRET_ACCESS_KEY` - Секретный ключ доступа к S3.
- `MODERN__S3__BUCKET_NAME` - Имя бакета для хранения файлов.

## Начало работы

Запустите приложение в режиме разработки:

```bash
yarn start:dev
```

Если вы запускаете приложение в прод-сборке, то не забудьте положить `.env` файл в папку `.output`.

## Эндпоинты API

Приложение предоставляет следующие эндпоинты API:

- `/api/smart-captcha/config` - Получение конфигурации Smart Captcha.
- `[GET] /api/subscriptions` - Получение списка подписок.
- `[POST] /api/subscriptions/aviasales` - Регистрация на рассылку от Авиасейлс.
- `[POST] /api/subscriptions/partner` - Регистрация на рассылку от партнера.
- `[POST] /api/subscriptions/register` - Регистрация в рассылке и конкурсе.
- `[POST] /api/upload` - Загрузка файла.

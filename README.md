# Devcom Spec Blueprint

Шаблон для будущих спецпроектов Авиасейлс.

## Структура

- [./apps/general] - Основное приложение, реализованное на React & Modern.js.

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

## Разработка

### Дев-режим

Перед дебагом приложения, убедитесь, что у вас есть файл `.env` в корне приложения (`/apps/general`), который содержит следующие переменные окружения:

- `MODERN__DEADLINE_DATE` - Дата окончания спецов в формате `YYYY-MM-DD`.
- `MODERN__ALTCRAFT__USERNAME` - Имя пользователя для Altcraft.
- `MODERN__ALTCRAFT__PASSWORD` - Пароль для Altcraft.
- `MODERN__ALTCRAFT__CAMPAIGN` - Идентификатор кампании в Altcraft.
- `MODERN__SMART_CAPTCHA__SITE_KEY` - Site Key для Yandex Smart Captcha (клиентская часть).
- `MODERN__SMART_CAPTCHA__SERVER_KEY` - Server Key для Yandex Smart Captcha (серверная валидация).
- `MODERN__SMART_CAPTCHA__SKIP` - Флаг, указывающий, нужно ли пропускать проверку Smart Captcha (используется для дебага).
- `MODERN__SMART_CAPTCHA__HEADER_NAME` - Имя заголовка для проверки Smart Captcha. Опциональный параметр, по умолчанию `x-smart-captcha-token`.
- `MODERN__SITE_URL` - Базовый URL сайта для генерации мета-тегов социальных сетей и ссылок на статические ресурсы. По умолчанию `http://localhost:8080`.

Далее смело запускайте:

```bash
yarn start:dev
```

### Прод-режим

Если вы запускаете приложение в прод-сборке, то не забудьте положить `.env` файл в папку `.output`.

## Работа с мета-тегами

### Базовые мета-теги

Базовые мета-теги для социальных сетей (Open Graph, Twitter Cards) и SEO настраиваются в корневом лайауте (`src/routes/layout.tsx`). Они используют константы из `src/defs/consts/meta.const.ts`:

```typescript
export const meta = {
  url: SITE_URL,
  siteName: 'siteName',
  title: 'Title',
  description: 'description',
}
```

Эти значения автоматически применяются ко всем страницам и включают:

- Базовый title и description
- Open Graph теги для социальных сетей
- Twitter Cards
- Иконки сайта
- URL для изображений предпросмотра

### Кастомные мета-теги на страницах

Для переопределения мета-тегов на конкретных страницах используйте компонент `Helmet` из `@modern-js/runtime/head`. Пример из `src/routes/result/page.tsx`:

```tsx
import { Helmet } from '@modern-js/runtime/head'

const Page = () => {
  return (
    <div>
      <Helmet>
        <title>Результат</title>
        <meta name="description" content="Кастомное описание страницы результата" />
        <meta property="og:title" content="Результат спецпроекта" />
      </Helmet>
      {/* Контент страницы */}
    </div>
  )
}
```

**Важно:** Мета-теги, заданные через `Helmet` на странице, переопределяют базовые теги из лайаута. Остальные базовые теги (которые не переопределены) остаются активными.

# Interview

## Зміст

- [JavaScript](#javascript)
- [CSS](#css)
- [React](#react)
- [Redux](#redux)
- [TypeScript](#typescript)
- [Тестування](#тестування)
- [Build tools](#build-tools)
- [Git](#git)
- [GraphQL](#graphql)
- [Next.js](#nextjs)

---

# JavaScript

## 1.1 Які є методи зберігання даних у браузері?

### Основні варіанти
- `localStorage`
- `sessionStorage`
- `cookies`
- `IndexedDB` — для великих обсягів даних
- `WebSQL` — застарілий

### `localStorage`
- Зберігає дані безстроково, поки користувач сам не видалить.
- Доступний лише на тому ж домені.
- Обсяг: приблизно `5–10 MB`.
- Дані **не відправляються** на сервер з кожним HTTP-запитом.

### `sessionStorage`
- Зберігає дані лише на час сесії вкладки.
- Доступний лише в межах тієї ж вкладки.
- Обсяг: приблизно `5 MB`.
- Дані **не відправляються** на сервер.

### `cookies`
- Можуть бути сесійними або з терміном дії (`expires`, `max-age`).
- Дані **автоматично відправляються** на сервер з кожним HTTP-запитом.
- Обсяг: до `4 KB` на cookie.
- Використовуються для аутентифікації, налаштувань, аналітики.

### Висновок
- `localStorage` / `sessionStorage` — для зберігання даних на клієнті.
- `cookies` — коли дані повинні брати участь у взаємодії клієнт ↔ сервер.

---

## 1.2 Які є способи декларування функцій? У чому відмінність стрілочної функції?

### Function Declaration
```js
function sum(a, b) {
  return a + b;
}
```

### Function Expression
```js
const sum = function (a, b) {
  return a + b;
};
```

### Arrow Function
```js
const sum = (a, b) => {
  return a + b;
};
```

### Відмінності стрілочної функції
1. Не має власного `this`, `arguments`, `super`, `new.target`.
2. Не може використовуватись як конструктор (`new`).
3. Має коротший синтаксис.
4. Не має власного `prototype`.

---

## 1.3 Event loop, macrotask, microtask

**Event loop** — це механізм, який забезпечує асинхронне виконання коду в JavaScript.

### Як працює
1. Синхронний код потрапляє у `call stack`.
2. Асинхронні операції передаються в `Web APIs`.
3. Після завершення callback потрапляє в чергу:
   - `microtask queue`
   - `macrotask queue`
4. Якщо `call stack` порожній:
   - спочатку виконуються **всі microtasks**
   - потім **одна macrotask**
5. Цикл повторюється.

### Microtasks
- `Promise.then/catch/finally`
- `queueMicrotask`
- `MutationObserver`

### Macrotasks
- `setTimeout`
- `setInterval`
- `I/O`
- `UI events`

### Важливо
- Мікрозадачі виконуються **перед** макрозадачами.
- Синхронний код виконується першим.

### Observable
За замовчуванням `Observable` виконується синхронно.

```js
import { Observable } from "rxjs";

const observable = new Observable((subscriber) => {
  console.log("Observable executor");
  subscriber.next(1);
  subscriber.complete();
});

console.log("Before subscribe");
observable.subscribe((value) => {
  console.log("Observable next", value);
});
console.log("After subscribe");
```

### Вивід
```txt
Before subscribe
Observable executor
Observable next 1
After subscribe
```

---

## 1.4 Нестроге порівняння

```js
console.log(false == []); // true
console.log(false == {}); // false
console.log(undefined == null); // true
```

---

## 1.5 Що таке наслідування?

Наслідування — це механізм, який дозволяє одному об’єкту або класу отримувати властивості та методи іншого.

### Прототипне наслідування
```js
function Counter() {
  this.count = 0;
}

Counter.prototype.increment = function () {
  return this.count++;
};
```

### Наслідування через клас
```js
class Animal {
  eat() {
    console.log("eating");
  }
}

class Dog extends Animal {
  bark() {
    console.log("woof");
  }
}
```

---

## 1.6 Як отримати параметри з URL?

```js
const search = new URLSearchParams(location.search);
const params = Object.fromEntries(search.entries());

console.log(params);
```

---

# CSS

## 2.1 Що таке `clamp()`?

`clamp(min, preferred, max)` дозволяє задавати адаптивне значення в межах мінімуму і максимуму.

```css
.h1 {
  font-size: clamp(1.8rem, 10vw, 5rem);
}
```

---

## 2.2 Як змінити стиль списку, який містить певний елемент?

Через `:has()`.

```html
<ul>
  <li>1</li>
  <li>2 <span>2222</span></li>
  <li>3 <span>1111</span></li>
  <li>4</li>
  <li>5</li>
</ul>
```

```css
ul li:has(span) {
  color: red;
}
```

---

## 2.3 Які є відносні величини в CSS?

- `em` — відносно розміру шрифту батьківського елемента
- `rem` — відносно розміру шрифту кореневого елемента
- `vw` — 1% ширини viewport
- `vh` — 1% висоти viewport

---

## 2.4 Чому `vh` на мобільному може давати скрол? Як виправити?

На мобільному висота viewport змінюється через адресний рядок браузера.  
Краще використовувати `dvh`.

```css
.device {
  height: 100vh;
  height: 100dvh;
}
```

---

## 2.5 `display: flex` і `display: grid` — в чому різниця?

### `flex`
- Одновимірний layout
- Працює або по рядку, або по колонці

### `grid`
- Двовимірний layout
- Працює і по рядках, і по колонках

---

## 2.6 Як зробити однакові відступи між елементами у flex і grid?

Через `gap`.

### Flex
```css
.row {
  display: flex;
  gap: 16px;
}
```

### Grid
```css
.grid {
  display: grid;
  gap: 16px;
}
```

---

## 2.7 Що таке `grid-template-areas`? Чи є аналог у flex?

`grid-template-areas` дозволяє візуально описати розташування блоків у grid.

```css
.grid {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main";
}
```

У `flex` прямого аналога немає.

---

# React

## 3.1 Virtual DOM

**Virtual DOM** — це легка копія реального DOM, яка існує в пам’яті.

### Як працює
1. При зміні `state` або `props` створюється новий Virtual DOM.
2. React порівнює старий і новий Virtual DOM.
3. Знаходить мінімальні зміни.
4. Оновлює лише потрібні частини реального DOM.

### Переваги
- Менше дорогих DOM-операцій
- Швидше оновлення UI
- Зручніша розробка

---

## 3.2 Події в React

У React події працюють через `SyntheticEvent` і `event delegation`.

### Як це працює
1. У JSX пишемо `onClick`, `onChange`, `onKeyDown` — React реєструє їх у Fiber-дереві.
2. Коли відбувся клік, браузер генерує нативний `click` event на елементі і починає його поширення.
3. Нативний event доходить до `#root`, де React має свій єдиний listener.
4. React отримує нативний event і створює `SyntheticEvent` — обгортку з уніфікованим API (`preventDefault`, `stopPropagation`, `nativeEvent`).
5. React самостійно обходить Fiber-дерево і викликає потрібні handlers у правильному порядку (capture → bubble).

React реєструє listeners у `#root` елементі для конкретних типів подій (click, keydown, scroll тощо) при ініціалізації (ReactDOM.createRoot), тобто заздалегідь знає які типи подій слухати

### Ключова ідея
- Fiber-дерево — сховище handlers (зберігається при рендері)
- #root listener — єдина точка входу для всіх браузерних подій
- SyntheticEvent — місток між нативним event і handlers у Fiber

### Що таке Fiber-вузол
Кожен компонент у React має свій Fiber-вузол — об'єкт, який зберігає:
- тип компонента
- поточний state і props
- посилання на батьківський, дочірній та сусідній вузол
- список зареєстрованих обробників подій (onClick тощо)
Fiber-дерево — внутрішнє представлення Virtual DOM у вигляді зв'язаного списку вузлів.

### Схема flow
```jsx
Fiber-дерево (при рендері)
  └── зберігає onClick, onChange тощо як властивості вузлів
      (не підв'язані до браузера напряму)

Юзер клікає
  └── браузер генерує нативний event
      └── event бабблить до #root
          └── спрацьовує React listener
              └── React створює SyntheticEvent
                  └── обходить Fiber-дерево
                      └── знаходить відповідні handlers
                          └── викликає їх (capture → bubble)
```

### Важливо
- Працюють `preventDefault()` і `stopPropagation()`
- Є фази `capture` і `bubble`

```jsx
<div
  onClickCapture={() => console.log("div capture")}
  onClick={() => console.log("div bubble")}
>
  <button
    onClickCapture={() => console.log("button capture")}
    onClick={() => console.log("button bubble")}
  >
    Click
  </button>
</div>
```

Порядок:
```txt
div capture
button capture
button bubble
div bubble
```

---

## 3.3 Методи життєвого циклу і відповідники у функціональних компонентах

- `componentDidMount` → `useEffect(() => {}, [])`
- `componentDidUpdate` → `useEffect(() => {}, [deps])`
- `componentWillUnmount` → `useEffect(() => () => {}, [])`
- `shouldComponentUpdate` → `React.memo`
- `getSnapshotBeforeUpdate` → `useLayoutEffect`

---

## 3.4 Що таке хуки?

Хуки — це функції React, які дозволяють використовувати state та інші можливості React у функціональних компонентах.

### Основні хуки
- `useState` — локальний стан
- `useEffect` — побічні ефекти
- `useContext` — доступ до контексту
- `useRef` — посилання на DOM або стабільне значення
- `useMemo` — мемоізація обчислень
- `useCallback` — мемоізація функцій
- `useReducer` — складніший state management
- `useLayoutEffect` — синхронний ефект до відмальовування

### Приклади
```js
useEffect(() => {}, []); // один раз при mount
useEffect(() => {}); // при кожному render
useEffect(() => {}, [deps]); // при mount і коли змінюється deps
useEffect(() => {
  return () => {};
}, []); // cleanup при unmount
```

---

## 3.5 Техніки оптимізації в React

- `useMemo`
- `useCallback`
- `React.memo`
- `React.lazy`

---

## 3.6 Prop drilling — що це?

`Prop drilling` — це передача даних через багато рівнів компонентів, навіть якщо проміжним компонентам ці дані не потрібні.

### Альтернативи
- `Context API`
- `Redux`
- інші state-менеджери

---

## 3.7 Що таке HOC?

**HOC (Higher-Order Component)** — це функція, яка приймає компонент і повертає новий компонент з додатковою логікою.

---

# Redux

## 4.1 Загальна логіка Redux

Redux — це бібліотека для централізованого керування станом.

### Основні поняття
- **Store** — єдине джерело стану
- **Action** — об’єкт, який описує подію
- **Reducer** — чиста функція, яка повертає новий state
- **Middleware** — проміжна логіка між `dispatch` і `reducer`

### Схема
```txt
UI -> dispatch(action) -> middleware -> reducer -> store -> UI
```

### Приклад action
```js
{ type: "INCREMENT", payload: 1 }
```

---

# TypeScript

## 5.1 `interface` і `type`: яка різниця?

| Можливість | interface | type |
|---|---|---|
| Наслідування | `extends` | через `&` |
| Declaration merging | Так | Ні |
| Union / tuple | Ні | Так |

---

## 5.2 Що таке Generics?

**Generics** дозволяють писати універсальний типобезпечний код.

### Для чого потрібні
- Повторне використання логіки
- Гнучкість
- Типобезпека на етапі компіляції

---

# Тестування

## 6.1 Які види тестування є?

1. **Unit**
2. **Integration**
3. **E2E**
4. **Snapshot**
5. **Regression**
6. **Smoke**
7. **Manual**
8. **Performance**

### Найчастіше в сучасній розробці
- Unit
- Integration
- E2E
- Snapshot

---

# Build tools

## 7. Питання по білд тулзам

> Додати окремо за потреби.

---

# Git

## 8.1 Як відредагувати повідомлення попереднього коміту?

```bash
git commit --amend -m "draft 08"
```

---

## 8.2 Способи видалення / скасування комітів

### `git rebase`
- Переписує історію
- Дає змогу змінювати порядок, squash, edit
- Небезпечно для спільних гілок

### `git reset`
- Переміщує `HEAD` на інший коміт
- Може залишити зміни або видалити їх повністю (`--hard`)

### `git revert`
- Створює новий коміт, який скасовує зміни попереднього
- Безпечно для спільних гілок

---

# GraphQL

## Що таке GraphQL?

**GraphQL** — це підхід / мова запитів до API, яка дозволяє запитувати дані потрібної форми.

## Чим відрізняється від REST?

### REST
- Архітектурний стиль
- Окремі endpoints для ресурсів
- Використовує HTTP-методи: `GET`, `POST`, `PUT`, `DELETE`

### Приклади REST
- `GET /users`
- `GET /users/1`
- `POST /users`
- `PUT /users/1`

## WebSocket
Протокол постійного двостороннього з’єднання в реальному часі.

---

## Apollo Client

Apollo Client — це клієнтська бібліотека для роботи з GraphQL.

### Що вміє
- виконує `query`, `mutation`, `subscription`
- кешує дані
- керує `loading` / `error`
- оновлює UI

### Основний кеш
- `InMemoryCache`
- Нормалізований кеш по `__typename + id`

### `fetchPolicy`
- `cache-first` — спочатку кеш, потім мережа
- `cache-and-network` — кеш + фоновий запит
- `network-only` — завжди мережа, але пише в кеш
- `no-cache` — завжди мережа, в кеш не пише
- `cache-only` — тільки кеш
- `standby` — запит призупинений

### Що зазвичай краще використовувати
- Списки / контент, що рідко змінюється: `cache-first` або `cache-and-network`
- Дашборди / часто змінні дані: `cache-and-network` або `network-only`
- Чутливі дані: `no-cache`

### Важливо
Потрібно налаштовувати:
- `typePolicies`
- `keyFields`

---

# Next.js

## 1. Що таке Next.js?

**Next.js** — це фреймворк на базі React для створення веб-застосунків.

### Для чого потрібен
- Маршрутизація з коробки (`file-based routing`)
- Підтримка `SSR`, `SSG`, `ISR`, `CSR`
- Кращий SEO
- Вища продуктивність
- Backend-функції в одному проєкті:
  - API Routes
  - Server Actions
  - Middleware

---

## 2. Роутери в Next.js

### `src/pages` — Pages Router
- file-based routing
- підтримує:
  - `getServerSideProps`
  - `getStaticProps`
  - `getStaticPaths`
- зазвичай гідрується майже вся сторінка

### `src/app` — App Router
- базується на **React Server Components**
- за замовчуванням компоненти є **Server Components**
- **Client Components** позначаються директивою `"use client"`
- гідруються лише Client Components

---

## 3. Типи рендерингу

### CSR
**Client-Side Rendering** — рендер у браузері після завантаження JS.

### SSR
**Server-Side Rendering** — HTML генерується на сервері на кожен запит.

### SSG
**Static Site Generation** — HTML генерується під час білду.

### ISR
**Incremental Static Regeneration** — гібрид між SSG і періодичним оновленням через `revalidate`.

### У Pages Router
- `getServerSideProps` — SSR
- `getStaticProps` — SSG
- `getStaticPaths` — динамічні SSG-сторінки

### У App Router
- SSR / SSG керуються через:
  - Server Components
  - `fetch`
  - `cache`
  - `revalidate`
- Client Components додають CSR-частину

App Router (app/) — сучасний рекомендований підхід у Next.js. Порівняно з Pages Router 
   (pages/) він має такі переваги:

   •  React Server Components за замовчуванням — менше JavaScript надсилається в браузер.
   •  Вкладені layout-компоненти — спільний UI не перемонтовується під час навігації.
   •  Streaming і Suspense — сторінка може завантажуватися частинами.
   •  Простіше отримання даних без getServerSideProps і getStaticProps:

   tsx
     export default async function UsersPage() {
         const users = await getUsers();
         return <UserList users={users} />;
     }

   •  Спеціальні файли для станів маршруту:
     •  loading.tsx
     •  error.tsx
     •  not-found.tsx
     •  layout.tsx
   •  Route Handlers через route.ts замість pages/api.
   •  Зручніша робота з metadata, кешуванням і серверними діями.
   •  Підтримка parallel та intercepted routes для складних інтерфейсів.

   Коли Pages Router ще доречний

   pages/ простіший для старих або невеликих проєктів і має зрілу екосистему. Але для нового
    проєкту краще використовувати app/, оскільки саме його Next.js активно розвиває.
---

## 4. Різниця в коді: SSG / ISR vs SSR

### ISR / SSG
```ts
export const revalidate = 60;
```

### SSR
```ts
export const dynamic = "force-dynamic";
```

### SSR з Apollo Client
```ts
export const dynamic = "force-dynamic";

getClient().query({
  query: QUERY,
  context: {
    fetchOptions: {
      cache: "no-store",
    },
  },
});
```

### Висновок
- `revalidate` → ISR / кешований серверний рендер
- `dynamic = "force-dynamic"` + `cache: "no-store"` → SSR

---

## 5. Компоненти в App Router

### Server Components
- рендеряться на сервері
- не гідруються
- не мають доступу до `window`, `localStorage`

### Client Components
- позначаються `"use client"`
- працюють у браузері
- мають `state`, `effects`, event handlers
- гідруються

---

## 6. Що таке hydration?

**Hydration** — це процес, коли React у браузері підключає JS до HTML, згенерованого на сервері, щоб сторінка стала інтерактивною.

### Кроки
1. Сервер віддає HTML
2. Браузер завантажує JS
3. React підв’язує події і стан

### У Next.js
- у **Client Components** гідрація є
- у **Server Components** гідрації немає

---

## 7. Що важливо знати на співбесіді

- У Next.js можна комбінувати різні стратегії рендерингу
- `SSG` — для статичного контенту
- `SSR` — для максимально свіжих даних
- App Router зменшує обсяг клієнтського JS

### Різниця SSG vs SSR у Server Components

#### SSG
- HTML згенерований наперед або закешований
- сторінка зазвичай віддається швидше
- дані можуть бути трохи застарілими до `revalidate`

#### SSR
- HTML генерується на кожен запит
- дані максимально свіжі
- відповідь може бути повільнішою, бо сервер чекає дані

### ─── SSR ───────────────────────────────────────────────
```ts
    // route segment — force-dynamic відключає будь-яке кешування сторінки
    export const dynamic = "force-dynamic";

    // fetch — cache: "no-store" відключає кешування запиту
    async function getData() {
      const res = await fetch("https://api.example.com/data", {
        cache: "no-store",
      });
      return res.json();
    }
```
### ─── SSG ───────────────────────────────────────────────
```ts
    // app/products/page.tsx
    // route segment: нічого не вказувати — дефолт Next.js = SSG
    // або явно:
    export const dynamic = "force-static";

    async function getData() {
      const res = await fetch("https://api.example.com/products", {
        cache: "force-cache", // кешується назавжди, до наступного білду
      });
      return res.json();
    }

    export default async function ProductsPage() {
      const data = await getData();
      return <ul>{data.map(item => <li key={item.id}>{item.name}</li>)}</ul>;
    }
```
### ─── ISR ───────────────────────────────────────────────
```ts
    // app/news/page.tsx
    // route segment: вказати revalidate — сторінка оновлюється кожні N секунд

    export const revalidate = 60;

    async function getData() {
      const res = await fetch("https://api.example.com/news", {
        next: { revalidate: 60 }, // кеш живе 60 секунд, потім запит повторюється
      });
      return res.json();
    }

    export default async function NewsPage() {
      const data = await getData();
      return <ul>{data.map(item => <li key={item.id}>{item.title}</li>)}</ul>;
    }
```
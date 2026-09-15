# Plan: Next.js Project Structure Best Practices

# Next.js Project Structure Best Practices
## (Приклад: бібліотека книг і авторів)

---

## Структура директорій

```
src/
├── app/                              # App Router — сторінки + API
│   ├── layout.tsx                   # Root layout (Server Component)
│   ├── page.tsx                     # Головна сторінка
│   │
│   ├── books/                       # Маршрут /books
│   │   ├── page.tsx                 # Список книг (SSR)
│   │   └── [id]/
│   │       └── page.tsx             # Деталь книги (SSR)
│   │
│   ├── authors/                     # Маршрут /authors
│   │   ├── page.tsx                 # Список авторів (SSR)
│   │   └── [id]/
│   │       └── page.tsx             # Профіль автора + його книги (SSR)
│   │
│   └── api/                         # API Routes (Next.js Route Handlers)
│       ├── books/
│       │   └── route.ts             # GET /api/books, POST /api/books
│       └── authors/
│           └── route.ts             # GET /api/authors
│
├── components/
│   ├── ui/                          # Атомарні компоненти (НЕ специфічні для домену)
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   └── index.ts
│   │   ├── Input/
│   │   ├── Card/
│   │   ├── Badge/
│   │   └── Spinner/
│   │
│   ├── layout/                      # Структурні компоненти
│   │   ├── Header/
│   │   ├── Footer/
│   │   └── PageWrapper/
│   │
│   ├── books/                       # Доменні компоненти для книг
│   │   ├── BookCard/
│   │   │   ├── BookCard.tsx         # Server Component (за замовчуванням)
│   │   │   └── index.ts
│   │   ├── BookList/
│   │   │   ├── BookList.tsx         # Server Component
│   │   │   └── index.ts
│   │   ├── BookDetail/
│   │   └── BookFilters/
│   │       ├── BookFilters.tsx      # 'use client' — фільтри інтерактивні
│   │       └── index.ts
│   │
│   └── authors/                     # Доменні компоненти для авторів
│       ├── AuthorCard/
│       │   └── AuthorCard.tsx       # Server Component
│       ├── AuthorList/
│       └── AuthorDetail/
│           └── AuthorDetail.tsx     # Server Component
│
├── lib/                             # Конфігурації, клієнти, утиліти
│   ├── apollo/
│   │   ├── client.ts               # Apollo Client factory (singleton для CSR)
│   │   ├── rsc-client.ts           # Apollo для React Server Components
│   │   └── ApolloProvider.tsx      # 'use client' — обгортка для дерева
│   │
│   └── graphql/
│       ├── queries/
│       │   ├── books.ts            # gql`query GetBooks { ... }`
│       │   └── authors.ts          # gql`query GetAuthors { ... }`
│       └── mutations/
│           ├── books.ts
│           └── authors.ts
│
├── hooks/                           # Кастомні хуки (тільки для CSR)
│   ├── useBookSearch.ts            # useQuery під капотом
│   └── useAuthorFilter.ts
│
├── types/                           # TypeScript типи / інтерфейси
│   ├── book.ts
│   ├── author.ts
│   └── api.ts
│
└── utils/                           # Чисті утиліти (без залежностей від React)
    ├── formatDate.ts
    └── formatters.ts
```

---

## SSR vs CSR — правило розміщення

| Тип | Де живе | Коли використовувати |
|-----|---------|---------------------|
| **Server Component** | `app/**`, `components/**` (без директиви) | Дані з БД/API, SEO-контент, немає стану/подій |
| **Client Component** | `'use client'` директива вгорі файлу | `useState`, `useEffect`, обробники подій, браузерні API |

**Приклад розподілу для сторінки автора:**
```
app/authors/[id]/page.tsx        ← SSR: fetch автора через Apollo RSC client
    └── AuthorDetail.tsx          ← SSR: рендер статичної інфи
        ├── BookList.tsx          ← SSR: список книг автора
        └── AuthorContactForm.tsx ← CSR: 'use client', форма з useState
```

---

## Apollo Client — де і як підключати

### `lib/apollo/client.ts` — для Client Components (singleton):
```ts
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

let client: ApolloClient<any> | null = null;

export function getApolloClient() {
  if (!client) {
    client = new ApolloClient({
      link: new HttpLink({ uri: '/api/graphql' }),
      cache: new InMemoryCache(),
    });
  }
  return client;
}
```

### `lib/apollo/rsc-client.ts` — для Server Components (без кешу між запитами):
```ts
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

export function getServerApolloClient() {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: process.env.GRAPHQL_URL,         // прямо до GraphQL сервера
      headers: { 'ssr': 'true' },
    }),
  });
}
```

### `lib/apollo/ApolloProvider.tsx` — обгортка для CSR дерева:
```ts
'use client';
import { ApolloProvider } from '@apollo/client';
import { getApolloClient } from './client';

export function AppApolloProvider({ children }: { children: React.ReactNode }) {
  return <ApolloProvider client={getApolloClient()}>{children}</ApolloProvider>;
}
```

### Підключення в `app/layout.tsx`:
```ts
// Це Server Component — ApolloProvider підключається як leaf
import { AppApolloProvider } from '@/lib/apollo/ApolloProvider';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <AppApolloProvider>{children}</AppApolloProvider>
      </body>
    </html>
  );
}
```

---

## Де живуть GraphQL запити

### `lib/graphql/queries/authors.ts`:
```ts
import { gql } from '@apollo/client';

export const GET_AUTHORS = gql`
  query GetAuthors {
    authors { id name bio }
  }
`;

export const GET_AUTHOR = gql`
  query GetAuthor($id: ID!) {
    author(id: $id) {
      id name bio photo
      books { id title coverUrl year }
    }
  }
`;
```

---

## Ключові правила

1. **`components/ui/`** — тільки атомарні, без бізнес-логіки. `Button`, `Input`, `Card` завжди Server Components якщо немає `onClick`.
2. **`components/{domain}/`** — конкретні для домену. Якщо потрібна інтерактивність — лише ця частина отримує `'use client'`, а не весь модуль.
3. **`hooks/`** — виключно клієнтські хуки. Завжди існують поряд з `'use client'` компонентами.
4. **`lib/apollo/`** — один рівень абстракції між сторінками і Apollo, щоб легко міняти транспорт.
5. **API Routes** (`app/api/`) — для webhook-ів, BFF endpoints, або якщо GraphQL сервер розташований у тому ж Next.js проекті.
6. **Запити GraphQL** — лише в `lib/graphql/queries/` та `mutations/`, ніколи не inline в компонентах.
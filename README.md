# Gift Selection Catalog

Сервіс підбору подарунків з каталогом, фільтрацією за тегами/подіями та особистим кабінетом.

## Запуск

```bash
# 1. Підняти PostgreSQL
docker compose -f backend/compose.yaml up -d

# 2. Запустити бекенд
cd backend
./mvnw spring-boot:run
```

Swagger UI: [http://localhost:8080/api/swagger-ui.html](http://localhost:8080/api/swagger-ui.html)

## API

| Метод | Endpoint | Доступ | Опис |
|-------|----------|--------|------|
| POST | `/api/auth/register` | public | Реєстрація |
| POST | `/api/auth/login` | public | Логін |
| GET | `/api/profile` | JWT | Профіль користувача |
| PUT | `/api/profile` | JWT | Оновити ПІБ |
| GET | `/api/gifts` | public | Пошук/фільтрація подарунків |
| GET | `/api/gifts/{id}` | public | Подарунок за ID |
| POST | `/api/admin/gifts` | JWT | Створити подарунок |
| PUT | `/api/admin/gifts/{id}` | JWT | Оновити подарунок |
| DELETE | `/api/admin/gifts/{id}` | JWT | Видалити подарунок |

## ER-діаграма

```mermaid
erDiagram
    users {
        bigserial id PK
        varchar full_name
        varchar email UK
        varchar password_hash
        timestamptz created_at
    }

    gifts {
        bigserial id PK
        varchar name
        text description
        integer price_cents
        text photo_url
        integer stock_quantity
    }

    tags {
        bigserial id PK
        varchar name UK
    }

    events {
        bigserial id PK
        varchar name
        date event_date
    }

    gifts_tags {
        bigint gift_id FK
        bigint tag_id FK
    }

    gifts_events {
        bigint gift_id FK
        bigint event_id FK
    }

    gifts ||--o{ gifts_tags : "has"
    tags ||--o{ gifts_tags : "tagged in"
    gifts ||--o{ gifts_events : "suitable for"
    events ||--o{ gifts_events : "includes"
```

## Технології

- Java 17, Spring Boot 4, Spring Security (JWT), Spring Data JPA
- PostgreSQL, Flyway (міграції)
- MapStruct (маппінг), Lombok
- Springdoc OpenAPI (Swagger UI)

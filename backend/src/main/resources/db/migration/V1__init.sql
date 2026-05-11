create table users
(
    id            bigserial primary key,
    full_name     varchar(255)             not null,
    email         varchar(255)             not null unique,
    password_hash varchar(255)             not null,
    created_at    timestamp with time zone not null default now()
);

create index idx_users_email on users (email);

create table gifts
(
    id             bigserial primary key,
    name           varchar(255) not null,
    description    text,
    price_cents    integer      not null,
    photo_url      text,
    stock_quantity integer      not null default 0,
    min_age        integer,
    max_age        integer
);

create index idx_gifts_name on gifts (name);
create index idx_gifts_price_cents on gifts (price_cents);

create table events
(
    id         bigserial primary key,
    name       varchar(255) not null,
    event_date date
);

create table tags
(
    id   bigserial primary key,
    name varchar(64) not null unique
);

create table gifts_tags
(
    gift_id bigint not null references gifts (id) on delete cascade,
    tag_id  bigint not null references tags (id),
    primary key (gift_id, tag_id)
);

create table gifts_events
(
    gift_id  bigint not null references gifts (id) on delete cascade,
    event_id bigint not null references events (id),
    primary key (gift_id, event_id)
);
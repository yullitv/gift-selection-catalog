create extension if not exists pgcrypto;

alter table users
    add column if not exists share_token varchar(64) unique;

update users
set share_token = encode(gen_random_bytes(32), 'hex')
where share_token is null;

alter table users
    alter column share_token set not null;

create index if not exists idx_users_share_token on users (share_token);

create table wishlists
(
    id         bigserial primary key,
    user_id    bigint                   not null references users (id) on delete cascade,
    gift_id    bigint                   not null references gifts (id) on delete cascade,
    created_at timestamp with time zone not null default now(),
    constraint uk_wishlists_user_gift unique (user_id, gift_id)
);

create index idx_wishlists_user_id on wishlists (user_id);

create table cart_items
(
    id         bigserial primary key,
    user_id    bigint                   not null references users (id) on delete cascade,
    gift_id    bigint                   not null references gifts (id) on delete cascade,
    quantity   integer                  not null,
    created_at timestamp with time zone not null default now(),
    updated_at timestamp with time zone not null default now(),
    constraint uk_cart_items_user_gift unique (user_id, gift_id),
    constraint chk_cart_items_quantity_positive check (quantity > 0)
);

create index idx_cart_items_user_id on cart_items (user_id);

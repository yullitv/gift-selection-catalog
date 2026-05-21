CREATE TABLE orders
(
    id           BIGSERIAL PRIMARY KEY,
    user_id      BIGINT                   NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    total_cents  INTEGER                  NOT NULL,
    status       VARCHAR(32)              NOT NULL,
    created_at   TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at   TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    CONSTRAINT chk_orders_total_positive CHECK (total_cents >= 0)
);

CREATE INDEX idx_orders_user_id_created_at ON orders (user_id, created_at DESC);

CREATE TABLE order_items
(
    id          BIGSERIAL PRIMARY KEY,
    order_id    BIGINT  NOT NULL REFERENCES orders (id) ON DELETE CASCADE,
    gift_id     BIGINT  NOT NULL REFERENCES gifts (id),
    gift_name   VARCHAR(255) NOT NULL,
    photo_url   TEXT,
    quantity    INTEGER NOT NULL,
    price_cents INTEGER NOT NULL,
    CONSTRAINT chk_order_items_quantity_positive CHECK (quantity > 0),
    CONSTRAINT chk_order_items_price_positive CHECK (price_cents >= 0)
);

CREATE INDEX idx_order_items_order_id ON order_items (order_id);

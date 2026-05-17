CREATE TABLE cart_items
(
    id         BIGSERIAL PRIMARY KEY,
    user_id    BIGINT                   NOT NULL,
    gift_id    BIGINT                   NOT NULL,
    quantity   INTEGER                  NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL,

    CONSTRAINT fk_cart_items_user
        FOREIGN KEY (user_id) REFERENCES users (id),

    CONSTRAINT fk_cart_items_gift
        FOREIGN KEY (gift_id) REFERENCES gifts (id),

    CONSTRAINT uq_cart_items_user_gift
        UNIQUE (user_id, gift_id),

    CONSTRAINT chk_cart_items_quantity_positive
        CHECK (quantity > 0)
);
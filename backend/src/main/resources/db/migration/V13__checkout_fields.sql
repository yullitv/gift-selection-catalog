
ALTER TABLE orders
    ADD COLUMN recipient_full_name VARCHAR(255),
    ADD COLUMN recipient_phone      VARCHAR(32),
    ADD COLUMN recipient_email      VARCHAR(255),

    ADD COLUMN delivery_type        VARCHAR(32),

    ADD COLUMN np_city_ref          VARCHAR(64),
    ADD COLUMN np_city_name         VARCHAR(255),
    ADD COLUMN np_warehouse_ref     VARCHAR(64),
    ADD COLUMN np_warehouse_name    VARCHAR(255),

    ADD COLUMN courier_address      TEXT,

    ADD COLUMN payment_method       VARCHAR(32),
    ADD COLUMN payment_status       VARCHAR(32);

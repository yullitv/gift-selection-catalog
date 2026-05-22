CREATE TABLE gift_images
(
    id         BIGSERIAL PRIMARY KEY,
    gift_id    BIGINT  NOT NULL,
    image_url  TEXT    NOT NULL,
    sort_order INT     NOT NULL DEFAULT 0,
    is_primary BOOLEAN NOT NULL DEFAULT FALSE,

    CONSTRAINT fk_gift_images_gift
        FOREIGN KEY (gift_id)
            REFERENCES gifts (id)
            ON DELETE CASCADE
);

CREATE INDEX idx_gift_images_gift_id ON gift_images (gift_id);

-- Migrate existing single photo_url into gift_images for backward compatibility
INSERT INTO gift_images (gift_id, image_url, sort_order, is_primary)
SELECT id, photo_url, 0, TRUE
FROM gifts
WHERE photo_url IS NOT NULL
  AND photo_url <> '';

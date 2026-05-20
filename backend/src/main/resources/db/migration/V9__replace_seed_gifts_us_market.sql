-- Replace Ukrainian seed catalog with US / English market products and Cloudinary images.
-- Does not touch users, roles, or auth data. No categories table in current schema.

-- ============ CLEANUP (dependency order) ============
DELETE FROM cart_items;
DELETE FROM gift_images;
DELETE FROM gifts_tags;
DELETE FROM gifts_events;
DELETE FROM gift_target_audiences;
DELETE FROM gifts;
DELETE FROM tags;

ALTER SEQUENCE gifts_id_seq RESTART WITH 1;
ALTER SEQUENCE tags_id_seq RESTART WITH 1;
ALTER SEQUENCE gift_images_id_seq RESTART WITH 1;

-- ============ TAGS ============
INSERT INTO tags (name) VALUES
    ('jewelry'),
    ('bracelet'),
    ('birthstone'),
    ('personalized'),
    ('gift'),
    ('for-her'),
    ('watch'),
    ('rose-gold'),
    ('elegant'),
    ('fashion'),
    ('luxury'),
    ('scarf'),
    ('stole'),
    ('cashmere'),
    ('winter'),
    ('bag'),
    ('handbag'),
    ('quilted'),
    ('perfume'),
    ('jasmine'),
    ('floral'),
    ('feminine'),
    ('cosmetics'),
    ('lipstick'),
    ('nude'),
    ('makeup'),
    ('beauty'),
    ('skincare'),
    ('serum'),
    ('hydration'),
    ('selfcare'),
    ('pajamas'),
    ('satin'),
    ('sleepwear'),
    ('comfort'),
    ('candle'),
    ('vanilla'),
    ('soy'),
    ('aromatherapy'),
    ('home')
ON CONFLICT (name) DO NOTHING;

-- ============ GIFTS ============
INSERT INTO gifts (id, name, description, price_cents, photo_url, stock_quantity, min_age, max_age)
VALUES
    (1, 'Birthstone Bracelet',
     'Personalized bracelet featuring sparkling birthstones for meaningful gifting.',
     2999,
     'https://res.cloudinary.com/dokapsvao/image/upload/v1779304509/Birthstone-Bracelet-pink-color-floral-givheart_cprmmt.png',
     25, 16, NULL),

    (2, 'Elegant Rose Gold Mesh Watch',
     'Sophisticated rose gold watch with slim mesh strap and minimalist dial.',
     8999,
     'https://res.cloudinary.com/dokapsvao/image/upload/v1779306985/Elegant-Rose-Gold-Mesh-Watch-catalogue-givheart_f1wut0.png',
     30, 16, NULL),

    (3, 'Cashmere Winter Stole',
     'Soft and warm cashmere stole designed for elegant winter layering.',
     6499,
     'https://res.cloudinary.com/dokapsvao/image/upload/v1779307326/Cashmere-Winter-Stole-green-for-her-givheart_lbjsfx.png',
     20, 16, NULL),

    (4, 'Quilted Chain Shoulder Bag',
     'Chic quilted handbag with elegant chain strap and timeless design.',
     7999,
     'https://res.cloudinary.com/dokapsvao/image/upload/v1779307450/Quilted-Chain-Shoulder-Bag-milky-color-givheart_t9hauh.png',
     28, 16, NULL),

    (5, 'Floral Jasmine Perfume',
     'Feminine jasmine fragrance with soft floral and romantic notes.',
     5499,
     'https://res.cloudinary.com/dokapsvao/image/upload/v1779307542/Floral-Jasmine-Perfume-givheart_s6scqg.png',
     35, 16, NULL),

    (6, 'Luxury Nude Lipstick Set',
     'Premium nude lipstick collection with rich pigments and soft texture.',
     3999,
     'https://res.cloudinary.com/dokapsvao/image/upload/v1779307641/Luxury-Nude-Lipstick-Set-deep-colors-givheart_gku1us.png',
     40, 16, NULL),

    (7, 'Hydrating Hyaluronic Serum',
     'Intensive hydrating serum formulated with hyaluronic acid for glowing skin.',
     3499,
     'https://res.cloudinary.com/dokapsvao/image/upload/v1779307770/Hydrating-Hyaluronic-Serum-givheart-catalogue_y5su7p.png',
     32, 16, NULL),

    (8, 'Satin Pajama Set',
     'Elegant satin pajama set combining softness, comfort, and style.',
     5999,
     'https://res.cloudinary.com/dokapsvao/image/upload/v1779307996/Satin-Pajama-Set-pastelle-color-givheart_rrqkg8.png',
     22, 16, NULL),

    (9, 'Vanilla Scented Soy Candle',
     'Hand-poured soy candle with comforting vanilla aroma.',
     2499,
     'https://res.cloudinary.com/dokapsvao/image/upload/v1779308114/Vanilla-Scented-Soy-Candle-givheart-box_eta5tp.png',
     38, 16, NULL);

SELECT setval('gifts_id_seq', (SELECT MAX(id) FROM gifts));

-- ============ TARGET AUDIENCES (WOMAN) ============
INSERT INTO gift_target_audiences (gift_id, audience)
SELECT id, 'WOMAN' FROM gifts;

-- ============ GIFTS <-> TAGS ============
INSERT INTO gifts_tags (gift_id, tag_id)
SELECT g.id, t.id FROM gifts g, tags t
WHERE g.name = 'Birthstone Bracelet'
  AND t.name IN ('jewelry', 'bracelet', 'birthstone', 'personalized', 'gift', 'for-her');

INSERT INTO gifts_tags (gift_id, tag_id)
SELECT g.id, t.id FROM gifts g, tags t
WHERE g.name = 'Elegant Rose Gold Mesh Watch'
  AND t.name IN ('watch', 'rose-gold', 'elegant', 'fashion', 'luxury', 'for-her');

INSERT INTO gifts_tags (gift_id, tag_id)
SELECT g.id, t.id FROM gifts g, tags t
WHERE g.name = 'Cashmere Winter Stole'
  AND t.name IN ('scarf', 'stole', 'cashmere', 'winter', 'luxury', 'for-her');

INSERT INTO gifts_tags (gift_id, tag_id)
SELECT g.id, t.id FROM gifts g, tags t
WHERE g.name = 'Quilted Chain Shoulder Bag'
  AND t.name IN ('bag', 'handbag', 'quilted', 'luxury', 'fashion', 'for-her');

INSERT INTO gifts_tags (gift_id, tag_id)
SELECT g.id, t.id FROM gifts g, tags t
WHERE g.name = 'Floral Jasmine Perfume'
  AND t.name IN ('perfume', 'jasmine', 'floral', 'feminine', 'luxury', 'for-her');

INSERT INTO gifts_tags (gift_id, tag_id)
SELECT g.id, t.id FROM gifts g, tags t
WHERE g.name = 'Luxury Nude Lipstick Set'
  AND t.name IN ('cosmetics', 'lipstick', 'nude', 'makeup', 'beauty', 'for-her');

INSERT INTO gifts_tags (gift_id, tag_id)
SELECT g.id, t.id FROM gifts g, tags t
WHERE g.name = 'Hydrating Hyaluronic Serum'
  AND t.name IN ('skincare', 'serum', 'hydration', 'beauty', 'selfcare', 'for-her');

INSERT INTO gifts_tags (gift_id, tag_id)
SELECT g.id, t.id FROM gifts g, tags t
WHERE g.name = 'Satin Pajama Set'
  AND t.name IN ('pajamas', 'satin', 'sleepwear', 'luxury', 'comfort', 'for-her');

INSERT INTO gifts_tags (gift_id, tag_id)
SELECT g.id, t.id FROM gifts g, tags t
WHERE g.name = 'Vanilla Scented Soy Candle'
  AND t.name IN ('candle', 'vanilla', 'soy', 'aromatherapy', 'home', 'for-her');

-- ============ GIFT IMAGES ============
-- 1. Birthstone Bracelet
INSERT INTO gift_images (gift_id, image_url, sort_order, is_primary) VALUES
    (1, 'https://res.cloudinary.com/dokapsvao/image/upload/v1779304509/Birthstone-Bracelet-pink-color-floral-givheart_cprmmt.png', 0, TRUE),
    (1, 'https://res.cloudinary.com/dokapsvao/image/upload/v1779304509/Birthstone-Bracelet-white-color-floral-givheart_ra6ml8.png', 1, FALSE),
    (1, 'https://res.cloudinary.com/dokapsvao/image/upload/v1779304508/Birthstone-Bracelet-deep-blue-color-floral-givheart_kxtlor.png', 2, FALSE);

-- 2. Elegant Rose Gold Mesh Watch
INSERT INTO gift_images (gift_id, image_url, sort_order, is_primary) VALUES
    (2, 'https://res.cloudinary.com/dokapsvao/image/upload/v1779306985/Elegant-Rose-Gold-Mesh-Watch-catalogue-givheart_f1wut0.png', 0, TRUE),
    (2, 'https://res.cloudinary.com/dokapsvao/image/upload/v1779306985/Elegant-Rose-Gold-Mesh-Watch-with-metal-strap-givheart_ia3aww.png', 1, FALSE),
    (2, 'https://res.cloudinary.com/dokapsvao/image/upload/v1779306985/Elegant-Rose-Gold-Mesh-Watch-with-red-leather-strap-givheart_bems0z.png', 2, FALSE),
    (2, 'https://res.cloudinary.com/dokapsvao/image/upload/v1779306985/Elegant-Rose-Gold-Mesh-Watch-with-red-leather-strap-in-the-box-givheart_f7imyz.png', 3, FALSE),
    (2, 'https://res.cloudinary.com/dokapsvao/image/upload/v1779306985/Elegant-Rose-Gold-Mesh-Watch-with-rose-gold-metal-strap-givheart_satopf.png', 4, FALSE);

-- 3. Cashmere Winter Stole
INSERT INTO gift_images (gift_id, image_url, sort_order, is_primary) VALUES
    (3, 'https://res.cloudinary.com/dokapsvao/image/upload/v1779307326/Cashmere-Winter-Stole-green-for-her-givheart_lbjsfx.png', 0, TRUE),
    (3, 'https://res.cloudinary.com/dokapsvao/image/upload/v1779307326/Cashmere-Winter-Stole-purple-for-her-givheart_mz7tyv.png', 1, FALSE),
    (3, 'https://res.cloudinary.com/dokapsvao/image/upload/v1779307321/Cashmere-Winter-Stole-light-brown-for-her-givheart_x3qbej.png', 2, FALSE),
    (3, 'https://res.cloudinary.com/dokapsvao/image/upload/v1779307320/Cashmere-Winter-Stole-dark-brown-for-her-givheart_soko5t.png', 3, FALSE);

-- 4. Quilted Chain Shoulder Bag
INSERT INTO gift_images (gift_id, image_url, sort_order, is_primary) VALUES
    (4, 'https://res.cloudinary.com/dokapsvao/image/upload/v1779307450/Quilted-Chain-Shoulder-Bag-milky-color-givheart_t9hauh.png', 0, TRUE),
    (4, 'https://res.cloudinary.com/dokapsvao/image/upload/v1779307449/Quilted-Chain-Shoulder-Bag-black-color-givheart_lcaait.png', 1, FALSE),
    (4, 'https://res.cloudinary.com/dokapsvao/image/upload/v1779307448/Quilted-Chain-Shoulder-Bag-pink-color-givheart_otfr48.png', 2, FALSE);

-- 5. Floral Jasmine Perfume
INSERT INTO gift_images (gift_id, image_url, sort_order, is_primary) VALUES
    (5, 'https://res.cloudinary.com/dokapsvao/image/upload/v1779307542/Floral-Jasmine-Perfume-givheart_s6scqg.png', 0, TRUE);

-- 6. Luxury Nude Lipstick Set
INSERT INTO gift_images (gift_id, image_url, sort_order, is_primary) VALUES
    (6, 'https://res.cloudinary.com/dokapsvao/image/upload/v1779307641/Luxury-Nude-Lipstick-Set-deep-colors-givheart_gku1us.png', 0, TRUE),
    (6, 'https://res.cloudinary.com/dokapsvao/image/upload/v1779307641/Luxury-Nude-Lipstick-Set-light-colors-givheart_ccg6nj.png', 1, FALSE);

-- 7. Hydrating Hyaluronic Serum
INSERT INTO gift_images (gift_id, image_url, sort_order, is_primary) VALUES
    (7, 'https://res.cloudinary.com/dokapsvao/image/upload/v1779307770/Hydrating-Hyaluronic-Serum-givheart-catalogue_y5su7p.png', 0, TRUE),
    (7, 'https://res.cloudinary.com/dokapsvao/image/upload/v1779307774/Hydrating-Hyaluronic-Serum-givheart_ewvvbr.png', 1, FALSE),
    (7, 'https://res.cloudinary.com/dokapsvao/image/upload/v1779307772/Hydrating-Hyaluronic-Serum-givheart-for-her_bu63xl.png', 2, FALSE);

-- 8. Satin Pajama Set
INSERT INTO gift_images (gift_id, image_url, sort_order, is_primary) VALUES
    (8, 'https://res.cloudinary.com/dokapsvao/image/upload/v1779307996/Satin-Pajama-Set-pastelle-color-givheart_rrqkg8.png', 0, TRUE),
    (8, 'https://res.cloudinary.com/dokapsvao/image/upload/v1779307979/Satin-Pajama-Set-pastelle-color-pants-givheart_heatr4.png', 1, FALSE),
    (8, 'https://res.cloudinary.com/dokapsvao/image/upload/v1779307988/Satin-Pajama-Set-grey-color-pants-givheart_no5f0h.png', 2, FALSE);

-- 9. Vanilla Scented Soy Candle
INSERT INTO gift_images (gift_id, image_url, sort_order, is_primary) VALUES
    (9, 'https://res.cloudinary.com/dokapsvao/image/upload/v1779308114/Vanilla-Scented-Soy-Candle-givheart-box_eta5tp.png', 0, TRUE),
    (9, 'https://res.cloudinary.com/dokapsvao/image/upload/v1779308120/Vanilla-mikl-Scented-Soy-Candle-givheart_vsbetd.png', 1, FALSE),
    (9, 'https://res.cloudinary.com/dokapsvao/image/upload/v1779308117/Vanilla-Scented-Soy-Candle-givheart-rose_dq5me4.png', 2, FALSE);

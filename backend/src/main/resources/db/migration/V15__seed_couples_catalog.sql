-- Couples catalog seed (runs after V14 children & teens catalog).
-- Idempotent: skips rows that already exist.

-- ============ TAGS ============
INSERT INTO tags (name) VALUES
    ('couples'),
    ('rings'),
    ('minimalist'),
    ('jewelry'),
    ('matching'),
    ('clothing'),
    ('hoodies'),
    ('cozy'),
    ('personalized'),
    ('embroidery'),
    ('sweatshirts')
ON CONFLICT (name) DO NOTHING;

-- ============ GIFTS ============
INSERT INTO gifts (name, description, price_cents, photo_url, stock_quantity, min_age, max_age)
SELECT 'Matching Minimalist Rings',
       'Simple and elegant matching rings designed for everyday couple wear.',
       4999,
       'https://res.cloudinary.com/dokapsvao/image/upload/v1779921765/Matching-Minimalist-Rings-catalogue-givheart_lcxgnb.png',
       22, 18, 40
WHERE NOT EXISTS (SELECT 1 FROM gifts WHERE name = 'Matching Minimalist Rings');

INSERT INTO gifts (name, description, price_cents, photo_url, stock_quantity, min_age, max_age)
SELECT 'Matching Hoodie Set',
       'Cozy couple hoodies designed for comfort and coordinated style.',
       6999,
       'https://res.cloudinary.com/dokapsvao/image/upload/v1779921858/Matching-Hoodie-Set-black-black-gym-partners-givheart_sg41fr.png',
       18, 16, 35
WHERE NOT EXISTS (SELECT 1 FROM gifts WHERE name = 'Matching Hoodie Set');

INSERT INTO gifts (name, description, price_cents, photo_url, stock_quantity, min_age, max_age)
SELECT 'Personalized Embroidered Sweatshirts',
       'Custom sweatshirts embroidered with names, dates, or special messages.',
       7499,
       'https://res.cloudinary.com/dokapsvao/image/upload/v1779921936/Personalized-Embroidered-Sweatshirts-his-name-her-name-black-givheart_ci18te.png',
       16, 16, 35
WHERE NOT EXISTS (SELECT 1 FROM gifts WHERE name = 'Personalized Embroidered Sweatshirts');

SELECT setval('gifts_id_seq', (SELECT MAX(id) FROM gifts));

-- ============ TARGET AUDIENCES (COUPLE) ============
INSERT INTO gift_target_audiences (gift_id, audience)
SELECT g.id, 'COUPLE'
FROM gifts g
WHERE g.name IN (
    'Matching Minimalist Rings',
    'Matching Hoodie Set',
    'Personalized Embroidered Sweatshirts'
)
ON CONFLICT DO NOTHING;

-- ============ GIFTS <-> TAGS ============
INSERT INTO gifts_tags (gift_id, tag_id)
SELECT g.id, t.id FROM gifts g, tags t
WHERE g.name = 'Matching Minimalist Rings'
  AND t.name IN ('couples', 'rings', 'minimalist', 'jewelry', 'matching')
ON CONFLICT DO NOTHING;

INSERT INTO gifts_tags (gift_id, tag_id)
SELECT g.id, t.id FROM gifts g, tags t
WHERE g.name = 'Matching Hoodie Set'
  AND t.name IN ('couples', 'clothing', 'hoodies', 'matching', 'cozy')
ON CONFLICT DO NOTHING;

INSERT INTO gifts_tags (gift_id, tag_id)
SELECT g.id, t.id FROM gifts g, tags t
WHERE g.name = 'Personalized Embroidered Sweatshirts'
  AND t.name IN ('couples', 'clothing', 'personalized', 'embroidery', 'sweatshirts')
ON CONFLICT DO NOTHING;

-- ============ GIFT IMAGES ============
-- 1. Matching Minimalist Rings
INSERT INTO gift_images (gift_id, image_url, sort_order, is_primary)
SELECT g.id, v.image_url, v.sort_order, v.is_primary
FROM gifts g
CROSS JOIN (VALUES
    ('https://res.cloudinary.com/dokapsvao/image/upload/v1779921765/Matching-Minimalist-Rings-catalogue-givheart_lcxgnb.png', 0, TRUE),
    ('https://res.cloudinary.com/dokapsvao/image/upload/v1779921766/Matching-Minimalist-Rings-black-silver-shining-givheart_frcqdd.png', 1, FALSE),
    ('https://res.cloudinary.com/dokapsvao/image/upload/v1779921771/Matching-Minimalist-Rings-black-silver-givheart_yr9jzm.png', 2, FALSE)
) AS v(image_url, sort_order, is_primary)
WHERE g.name = 'Matching Minimalist Rings'
  AND NOT EXISTS (
      SELECT 1 FROM gift_images gi WHERE gi.gift_id = g.id AND gi.image_url = v.image_url
  );

-- 2. Matching Hoodie Set
INSERT INTO gift_images (gift_id, image_url, sort_order, is_primary)
SELECT g.id, v.image_url, v.sort_order, v.is_primary
FROM gifts g
CROSS JOIN (VALUES
    ('https://res.cloudinary.com/dokapsvao/image/upload/v1779921858/Matching-Hoodie-Set-black-black-gym-partners-givheart_sg41fr.png', 0, TRUE),
    ('https://res.cloudinary.com/dokapsvao/image/upload/v1779921854/Matching-Hoodie-Set-black-black-queen-king-givheart_cmv0kv.png', 1, FALSE)
) AS v(image_url, sort_order, is_primary)
WHERE g.name = 'Matching Hoodie Set'
  AND NOT EXISTS (
      SELECT 1 FROM gift_images gi WHERE gi.gift_id = g.id AND gi.image_url = v.image_url
  );

-- 3. Personalized Embroidered Sweatshirts
INSERT INTO gift_images (gift_id, image_url, sort_order, is_primary)
SELECT g.id, v.image_url, v.sort_order, v.is_primary
FROM gifts g
CROSS JOIN (VALUES
    ('https://res.cloudinary.com/dokapsvao/image/upload/v1779921936/Personalized-Embroidered-Sweatshirts-his-name-her-name-black-givheart_ci18te.png', 0, TRUE),
    ('https://res.cloudinary.com/dokapsvao/image/upload/v1779921944/Personalized-Embroidered-Sweatshirts-his-name-her-name-white-givheart_kiybqo.png', 1, FALSE),
    ('https://res.cloudinary.com/dokapsvao/image/upload/v1779921934/Personalized-Embroidered-Sweatshirts-his-name-her-name-lovers-givheart_tgk9om.png', 2, FALSE)
) AS v(image_url, sort_order, is_primary)
WHERE g.name = 'Personalized Embroidered Sweatshirts'
  AND NOT EXISTS (
      SELECT 1 FROM gift_images gi WHERE gi.gift_id = g.id AND gi.image_url = v.image_url
  );

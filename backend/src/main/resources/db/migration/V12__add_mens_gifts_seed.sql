-- Men's catalog seed (runs after V9 women's catalog).
-- Idempotent: skips rows that already exist.

-- ============ TAGS ============
INSERT INTO tags (name) VALUES
    ('wallet'),
    ('leather'),
    ('bifold'),
    ('classic'),
    ('mens-accessories'),
    ('stainless-steel'),
    ('menswear'),
    ('necklace'),
    ('chain'),
    ('belt'),
    ('formal'),
    ('cardholder'),
    ('slim'),
    ('minimalist'),
    ('woody'),
    ('masculine'),
    ('fragrance'),
    ('beard'),
    ('grooming'),
    ('oil'),
    ('growth'),
    ('mens-care'),
    ('shaving'),
    ('razor')
ON CONFLICT (name) DO NOTHING;

-- ============ GIFTS ============
INSERT INTO gifts (name, description, price_cents, photo_url, stock_quantity, min_age, max_age)
SELECT 'Genuine Leather Bifold Wallet',
       'Classic bifold wallet crafted from premium leather with multiple compartments for everyday use.',
       4599,
       'https://res.cloudinary.com/dokapsvao/image/upload/v1779454121/Genuine-leather-bifold-wallet-deep-green-givheart_omd6qs.png',
       40, 16, NULL
WHERE NOT EXISTS (SELECT 1 FROM gifts WHERE name = 'Genuine Leather Bifold Wallet');

INSERT INTO gifts (name, description, price_cents, photo_url, stock_quantity, min_age, max_age)
SELECT 'Classic Stainless Steel Watch',
       'Timeless wristwatch with stainless steel case and versatile everyday design.',
       8999,
       'https://res.cloudinary.com/dokapsvao/image/upload/v1779454278/Classic-stainless-steel-watch-green-screen-givheart_nxl99j.png',
       25, 16, NULL
WHERE NOT EXISTS (SELECT 1 FROM gifts WHERE name = 'Classic Stainless Steel Watch');

INSERT INTO gifts (name, description, price_cents, photo_url, stock_quantity, min_age, max_age)
SELECT 'Stainless Steel Chain Necklace',
       'Masculine chain necklace crafted from durable stainless steel.',
       3499,
       'https://res.cloudinary.com/dokapsvao/image/upload/v1779454380/Stainless-steel-chain-necklace-silver-givheart_rrl30d.png',
       35, 16, NULL
WHERE NOT EXISTS (SELECT 1 FROM gifts WHERE name = 'Stainless Steel Chain Necklace');

INSERT INTO gifts (name, description, price_cents, photo_url, stock_quantity, min_age, max_age)
SELECT 'Classic Leather Belt',
       'Timeless leather belt suitable for both casual and formal outfits.',
       3999,
       'https://res.cloudinary.com/dokapsvao/image/upload/v1779454476/Classic-leather-belt-black-color-givheart_htokpj.png',
       30, 16, NULL
WHERE NOT EXISTS (SELECT 1 FROM gifts WHERE name = 'Classic Leather Belt');

INSERT INTO gifts (name, description, price_cents, photo_url, stock_quantity, min_age, max_age)
SELECT 'Slim Leather Cardholder',
       'Compact leather cardholder designed for minimalist everyday carry.',
       2999,
       'https://res.cloudinary.com/dokapsvao/image/upload/v1779454586/Slim-leather-cardholder-deep-brown-givheart_rpgdjr.png',
       45, 16, NULL
WHERE NOT EXISTS (SELECT 1 FROM gifts WHERE name = 'Slim Leather Cardholder');

INSERT INTO gifts (name, description, price_cents, photo_url, stock_quantity, min_age, max_age)
SELECT 'Woody Masculine Fragrance',
       'Deep woody perfume with rich, warm, and masculine notes.',
       5499,
       'https://res.cloudinary.com/dokapsvao/image/upload/v1779454690/Woody-masculine-fragrance-full-givheart_jmg1pi.png',
       28, 16, NULL
WHERE NOT EXISTS (SELECT 1 FROM gifts WHERE name = 'Woody Masculine Fragrance');

INSERT INTO gifts (name, description, price_cents, photo_url, stock_quantity, min_age, max_age)
SELECT 'Beard Growth Oil',
       'Nourishing oil designed to stimulate beard growth and hydration.',
       2499,
       'https://res.cloudinary.com/dokapsvao/image/upload/v1779454836/Beard-growth-oil-givheart_kwen6o.png',
       50, 16, NULL
WHERE NOT EXISTS (SELECT 1 FROM gifts WHERE name = 'Beard Growth Oil');

INSERT INTO gifts (name, description, price_cents, photo_url, stock_quantity, min_age, max_age)
SELECT 'Classic Safety Razor Kit',
       'Traditional shaving kit featuring a precision safety razor.',
       4299,
       'https://res.cloudinary.com/dokapsvao/image/upload/v1779454934/Classic-safety-razor-kit-givheart_hmx4jg.png',
       22, 18, NULL
WHERE NOT EXISTS (SELECT 1 FROM gifts WHERE name = 'Classic Safety Razor Kit');

SELECT setval('gifts_id_seq', (SELECT MAX(id) FROM gifts));

-- ============ TARGET AUDIENCES (MAN) ============
INSERT INTO gift_target_audiences (gift_id, audience)
SELECT g.id, 'MAN'
FROM gifts g
WHERE g.name IN (
    'Genuine Leather Bifold Wallet',
    'Classic Stainless Steel Watch',
    'Stainless Steel Chain Necklace',
    'Classic Leather Belt',
    'Slim Leather Cardholder',
    'Woody Masculine Fragrance',
    'Beard Growth Oil',
    'Classic Safety Razor Kit'
)
ON CONFLICT DO NOTHING;

-- ============ GIFTS <-> TAGS ============
INSERT INTO gifts_tags (gift_id, tag_id)
SELECT g.id, t.id FROM gifts g, tags t
WHERE g.name = 'Genuine Leather Bifold Wallet'
  AND t.name IN ('wallet', 'leather', 'bifold', 'classic', 'mens-accessories')
ON CONFLICT DO NOTHING;

INSERT INTO gifts_tags (gift_id, tag_id)
SELECT g.id, t.id FROM gifts g, tags t
WHERE g.name = 'Classic Stainless Steel Watch'
  AND t.name IN ('watch', 'stainless-steel', 'classic', 'menswear', 'elegant')
ON CONFLICT DO NOTHING;

INSERT INTO gifts_tags (gift_id, tag_id)
SELECT g.id, t.id FROM gifts g, tags t
WHERE g.name = 'Stainless Steel Chain Necklace'
  AND t.name IN ('jewelry', 'necklace', 'chain', 'stainless-steel', 'mens-accessories')
ON CONFLICT DO NOTHING;

INSERT INTO gifts_tags (gift_id, tag_id)
SELECT g.id, t.id FROM gifts g, tags t
WHERE g.name = 'Classic Leather Belt'
  AND t.name IN ('belt', 'leather', 'classic', 'menswear', 'formal')
ON CONFLICT DO NOTHING;

INSERT INTO gifts_tags (gift_id, tag_id)
SELECT g.id, t.id FROM gifts g, tags t
WHERE g.name = 'Slim Leather Cardholder'
  AND t.name IN ('cardholder', 'leather', 'slim', 'minimalist', 'mens-accessories')
ON CONFLICT DO NOTHING;

INSERT INTO gifts_tags (gift_id, tag_id)
SELECT g.id, t.id FROM gifts g, tags t
WHERE g.name = 'Woody Masculine Fragrance'
  AND t.name IN ('perfume', 'woody', 'masculine', 'fragrance', 'menswear')
ON CONFLICT DO NOTHING;

INSERT INTO gifts_tags (gift_id, tag_id)
SELECT g.id, t.id FROM gifts g, tags t
WHERE g.name = 'Beard Growth Oil'
  AND t.name IN ('beard', 'grooming', 'oil', 'growth', 'mens-care')
ON CONFLICT DO NOTHING;

INSERT INTO gifts_tags (gift_id, tag_id)
SELECT g.id, t.id FROM gifts g, tags t
WHERE g.name = 'Classic Safety Razor Kit'
  AND t.name IN ('shaving', 'razor', 'grooming', 'classic', 'mens-care')
ON CONFLICT DO NOTHING;

-- ============ GIFT IMAGES ============
-- 1. Genuine Leather Bifold Wallet
INSERT INTO gift_images (gift_id, image_url, sort_order, is_primary)
SELECT g.id, 'https://res.cloudinary.com/dokapsvao/image/upload/v1779454121/Genuine-leather-bifold-wallet-deep-green-givheart_omd6qs.png', 0, TRUE
FROM gifts g WHERE g.name = 'Genuine Leather Bifold Wallet'
  AND NOT EXISTS (
      SELECT 1 FROM gift_images gi
      WHERE gi.gift_id = g.id
        AND gi.image_url = 'https://res.cloudinary.com/dokapsvao/image/upload/v1779454121/Genuine-leather-bifold-wallet-deep-green-givheart_omd6qs.png'
  );

INSERT INTO gift_images (gift_id, image_url, sort_order, is_primary)
SELECT g.id, 'https://res.cloudinary.com/dokapsvao/image/upload/v1779454121/Genuine-leather-bifold-wallet-deep-brown-givheart_wrgshq.png', 1, FALSE
FROM gifts g WHERE g.name = 'Genuine Leather Bifold Wallet'
  AND NOT EXISTS (
      SELECT 1 FROM gift_images gi
      WHERE gi.gift_id = g.id
        AND gi.image_url = 'https://res.cloudinary.com/dokapsvao/image/upload/v1779454121/Genuine-leather-bifold-wallet-deep-brown-givheart_wrgshq.png'
  );

INSERT INTO gift_images (gift_id, image_url, sort_order, is_primary)
SELECT g.id, 'https://res.cloudinary.com/dokapsvao/image/upload/v1779454121/Genuine-leather-bifold-black-rombs-green-givheart_ntxirj.png', 2, FALSE
FROM gifts g WHERE g.name = 'Genuine Leather Bifold Wallet'
  AND NOT EXISTS (
      SELECT 1 FROM gift_images gi
      WHERE gi.gift_id = g.id
        AND gi.image_url = 'https://res.cloudinary.com/dokapsvao/image/upload/v1779454121/Genuine-leather-bifold-black-rombs-green-givheart_ntxirj.png'
  );

INSERT INTO gift_images (gift_id, image_url, sort_order, is_primary)
SELECT g.id, 'https://res.cloudinary.com/dokapsvao/image/upload/v1779454121/Genuine-leather-bifold-wallet-black-givheart_e1xgoa.png', 3, FALSE
FROM gifts g WHERE g.name = 'Genuine Leather Bifold Wallet'
  AND NOT EXISTS (
      SELECT 1 FROM gift_images gi
      WHERE gi.gift_id = g.id
        AND gi.image_url = 'https://res.cloudinary.com/dokapsvao/image/upload/v1779454121/Genuine-leather-bifold-wallet-black-givheart_e1xgoa.png'
  );

-- 2. Classic Stainless Steel Watch
INSERT INTO gift_images (gift_id, image_url, sort_order, is_primary)
SELECT g.id, v.image_url, v.sort_order, v.is_primary
FROM gifts g
CROSS JOIN (VALUES
    ('https://res.cloudinary.com/dokapsvao/image/upload/v1779454278/Classic-stainless-steel-watch-green-screen-givheart_nxl99j.png', 0, TRUE),
    ('https://res.cloudinary.com/dokapsvao/image/upload/v1779454276/Classic-stainless-steel-watch-green-screen-right-side-givheart_pv3xmy.png', 1, FALSE),
    ('https://res.cloudinary.com/dokapsvao/image/upload/v1779454275/Classic-stainless-steel-watch-green-screen-back-givheart_ug8nfo.png', 2, FALSE)
) AS v(image_url, sort_order, is_primary)
WHERE g.name = 'Classic Stainless Steel Watch'
  AND NOT EXISTS (
      SELECT 1 FROM gift_images gi WHERE gi.gift_id = g.id AND gi.image_url = v.image_url
  );

-- 3. Stainless Steel Chain Necklace
INSERT INTO gift_images (gift_id, image_url, sort_order, is_primary)
SELECT g.id, v.image_url, v.sort_order, v.is_primary
FROM gifts g
CROSS JOIN (VALUES
    ('https://res.cloudinary.com/dokapsvao/image/upload/v1779454380/Stainless-steel-chain-necklace-silver-givheart_rrl30d.png', 0, TRUE),
    ('https://res.cloudinary.com/dokapsvao/image/upload/v1779454376/Stainless-necklace-silver-givheart_x4zlrv.png', 1, FALSE),
    ('https://res.cloudinary.com/dokapsvao/image/upload/v1779454377/Stainless-necklace-silver-sizes-givheart_vzur5j.png', 2, FALSE)
) AS v(image_url, sort_order, is_primary)
WHERE g.name = 'Stainless Steel Chain Necklace'
  AND NOT EXISTS (
      SELECT 1 FROM gift_images gi WHERE gi.gift_id = g.id AND gi.image_url = v.image_url
  );

-- 4. Classic Leather Belt
INSERT INTO gift_images (gift_id, image_url, sort_order, is_primary)
SELECT g.id, v.image_url, v.sort_order, v.is_primary
FROM gifts g
CROSS JOIN (VALUES
    ('https://res.cloudinary.com/dokapsvao/image/upload/v1779454476/Classic-leather-belt-black-color-givheart_htokpj.png', 0, TRUE),
    ('https://res.cloudinary.com/dokapsvao/image/upload/v1779454466/Classic-leather-belt-brown-man-color-givheart_wyw4sl.png', 1, FALSE),
    ('https://res.cloudinary.com/dokapsvao/image/upload/v1779454464/Classic-leather-belt-brown-color-givheart_wr46yq.png', 2, FALSE)
) AS v(image_url, sort_order, is_primary)
WHERE g.name = 'Classic Leather Belt'
  AND NOT EXISTS (
      SELECT 1 FROM gift_images gi WHERE gi.gift_id = g.id AND gi.image_url = v.image_url
  );

-- 5. Slim Leather Cardholder
INSERT INTO gift_images (gift_id, image_url, sort_order, is_primary)
SELECT g.id, v.image_url, v.sort_order, v.is_primary
FROM gifts g
CROSS JOIN (VALUES
    ('https://res.cloudinary.com/dokapsvao/image/upload/v1779454586/Slim-leather-cardholder-deep-brown-givheart_rpgdjr.png', 0, TRUE),
    ('https://res.cloudinary.com/dokapsvao/image/upload/v1779454596/Slim-leather-cardholder-brown-givheart_wj1txd.png', 1, FALSE),
    ('https://res.cloudinary.com/dokapsvao/image/upload/v1779454600/Slim-leather-cardholder-light-beige-givheart_wnrszf.png', 2, FALSE)
) AS v(image_url, sort_order, is_primary)
WHERE g.name = 'Slim Leather Cardholder'
  AND NOT EXISTS (
      SELECT 1 FROM gift_images gi WHERE gi.gift_id = g.id AND gi.image_url = v.image_url
  );

-- 6. Woody Masculine Fragrance
INSERT INTO gift_images (gift_id, image_url, sort_order, is_primary)
SELECT g.id, v.image_url, v.sort_order, v.is_primary
FROM gifts g
CROSS JOIN (VALUES
    ('https://res.cloudinary.com/dokapsvao/image/upload/v1779454690/Woody-masculine-fragrance-full-givheart_jmg1pi.png', 0, TRUE),
    ('https://res.cloudinary.com/dokapsvao/image/upload/v1779454688/Woody-masculine-fragrance-givheart_leterg.png', 1, FALSE)
) AS v(image_url, sort_order, is_primary)
WHERE g.name = 'Woody Masculine Fragrance'
  AND NOT EXISTS (
      SELECT 1 FROM gift_images gi WHERE gi.gift_id = g.id AND gi.image_url = v.image_url
  );

-- 7. Beard Growth Oil
INSERT INTO gift_images (gift_id, image_url, sort_order, is_primary)
SELECT g.id, v.image_url, v.sort_order, v.is_primary
FROM gifts g
CROSS JOIN (VALUES
    ('https://res.cloudinary.com/dokapsvao/image/upload/v1779454836/Beard-growth-oil-givheart_kwen6o.png', 0, TRUE),
    ('https://res.cloudinary.com/dokapsvao/image/upload/v1779454832/Beard-growth-oil-givheart-citrus_dnw4nv.png', 1, FALSE),
    ('https://res.cloudinary.com/dokapsvao/image/upload/v1779454829/Beard-growth-oil-givheart-full_zdranh.png', 2, FALSE)
) AS v(image_url, sort_order, is_primary)
WHERE g.name = 'Beard Growth Oil'
  AND NOT EXISTS (
      SELECT 1 FROM gift_images gi WHERE gi.gift_id = g.id AND gi.image_url = v.image_url
  );

-- 8. Classic Safety Razor Kit
INSERT INTO gift_images (gift_id, image_url, sort_order, is_primary)
SELECT g.id, v.image_url, v.sort_order, v.is_primary
FROM gifts g
CROSS JOIN (VALUES
    ('https://res.cloudinary.com/dokapsvao/image/upload/v1779454934/Classic-safety-razor-kit-givheart_hmx4jg.png', 0, TRUE)
) AS v(image_url, sort_order, is_primary)
WHERE g.name = 'Classic Safety Razor Kit'
  AND NOT EXISTS (
      SELECT 1 FROM gift_images gi WHERE gi.gift_id = g.id AND gi.image_url = v.image_url
  );

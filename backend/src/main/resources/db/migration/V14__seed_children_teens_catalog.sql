
INSERT INTO tags (name) VALUES
    ('toy'),
    ('plush'),
    ('interactive'),
    ('kids'),
    ('educational'),
    ('constructor'),
    ('STEM'),
    ('building'),
    ('board-game'),
    ('family'),
    ('strategy'),
    ('fun'),
    ('puzzle'),
    ('landscape'),
    ('500-piece'),
    ('relaxing'),
    ('coloring-book'),
    ('anime'),
    ('art'),
    ('teens'),
    ('books'),
    ('adventure'),
    ('reading'),
    ('storytelling'),
    ('slime'),
    ('DIY'),
    ('sensory'),
    ('science'),
    ('volcano'),
    ('experiment'),
    ('jewelry'),
    ('bracelet'),
    ('charms'),
    ('girls'),
    ('cute')
ON CONFLICT (name) DO NOTHING;

-- ============ GIFTS ============
INSERT INTO gifts (name, description, price_cents, photo_url, stock_quantity, min_age, max_age)
SELECT 'Interactive Plush Toy',
       'Soft interactive toy that responds to touch or sound, designed for comfort and play.',
       3299,
       'https://res.cloudinary.com/dokapsvao/image/upload/v1779918786/Interactive-plush-toy-girl-with-rabit-givheart_ernyiv.png',
       35, 3, 10
WHERE NOT EXISTS (SELECT 1 FROM gifts WHERE name = 'Interactive Plush Toy');

INSERT INTO gifts (name, description, price_cents, photo_url, stock_quantity, min_age, max_age)
SELECT 'STEM Engineering Building Kit',
       'Educational construction kit that develops engineering and problem-solving skills.',
       4799,
       'https://res.cloudinary.com/dokapsvao/image/upload/v1779918891/STEM-engineering-building-kit-box-givheart-owl_firnzz.png',
       28, 7, 14
WHERE NOT EXISTS (SELECT 1 FROM gifts WHERE name = 'STEM Engineering Building Kit');

INSERT INTO gifts (name, description, price_cents, photo_url, stock_quantity, min_age, max_age)
SELECT 'Family Strategy Board Game',
       'Engaging board game focused on strategy and family fun.',
       3899,
       'https://res.cloudinary.com/dokapsvao/image/upload/v1779918966/Family-strategy-board-game-full-back-side-givheart_intnjs.png',
       32, 8, 16
WHERE NOT EXISTS (SELECT 1 FROM gifts WHERE name = 'Family Strategy Board Game');

INSERT INTO gifts (name, description, price_cents, photo_url, stock_quantity, min_age, max_age)
SELECT '500-Piece Landscape Puzzle',
       'Classic puzzle featuring beautiful natural landscape imagery.',
       2499,
       'https://res.cloudinary.com/dokapsvao/image/upload/v1779919100/500-piece-landscape-puzzle-harry-potter-givheart_xnlekf.png',
       40, 8, 16
WHERE NOT EXISTS (SELECT 1 FROM gifts WHERE name = '500-Piece Landscape Puzzle');

INSERT INTO gifts (name, description, price_cents, photo_url, stock_quantity, min_age, max_age)
SELECT 'Anime Coloring Book',
       'Coloring book featuring popular anime-style characters and scenes.',
       1899,
       'https://res.cloudinary.com/dokapsvao/image/upload/v1779919193/Anime-coloring-book-front-givheart_kmblbr.png',
       50, 8, 16
WHERE NOT EXISTS (SELECT 1 FROM gifts WHERE name = 'Anime Coloring Book');

INSERT INTO gifts (name, description, price_cents, photo_url, stock_quantity, min_age, max_age)
SELECT 'Illustrated Adventure Novel',
       'Engaging storybook with illustrations for young readers.',
       2199,
       'https://res.cloudinary.com/dokapsvao/image/upload/v1779919256/Illustrated-adventure-novel-set-of-books-front-givheart_lfnxkt.png',
       45, 7, 13
WHERE NOT EXISTS (SELECT 1 FROM gifts WHERE name = 'Illustrated Adventure Novel');

INSERT INTO gifts (name, description, price_cents, photo_url, stock_quantity, min_age, max_age)
SELECT 'DIY Slime Creation Set',
       'Fun slime-making kit with colors, textures, and additives.',
       2799,
       'https://res.cloudinary.com/dokapsvao/image/upload/v1779919354/DIY-slime-creation-set-box-givheart-working-process_elgqoo.png',
       38, 6, 12
WHERE NOT EXISTS (SELECT 1 FROM gifts WHERE name = 'DIY Slime Creation Set');

INSERT INTO gifts (name, description, price_cents, photo_url, stock_quantity, min_age, max_age)
SELECT 'Volcano Science Experiment Kit',
       'STEM kit that demonstrates volcanic eruption experiments.',
       3499,
       'https://res.cloudinary.com/dokapsvao/image/upload/v1779919561/Volcano-science-experiment-kit-box-givheart_yiha8f.png',
       30, 7, 14
WHERE NOT EXISTS (SELECT 1 FROM gifts WHERE name = 'Volcano Science Experiment Kit');

INSERT INTO gifts (name, description, price_cents, photo_url, stock_quantity, min_age, max_age)
SELECT 'Charm Bracelet Set',
       'Jewelry set with colorful charms for creative styling.',
       2999,
       'https://res.cloudinary.com/dokapsvao/image/upload/v1779919622/Charm-bracelet-set-box-givheart-collection-box_zrljze.png',
       34, 8, 16
WHERE NOT EXISTS (SELECT 1 FROM gifts WHERE name = 'Charm Bracelet Set');

SELECT setval('gifts_id_seq', (SELECT MAX(id) FROM gifts));

-- ============ TARGET AUDIENCES (CHILD) ============
INSERT INTO gift_target_audiences (gift_id, audience)
SELECT g.id, 'CHILD'
FROM gifts g
WHERE g.name IN (
    'Interactive Plush Toy',
    'STEM Engineering Building Kit',
    'Family Strategy Board Game',
    '500-Piece Landscape Puzzle',
    'Anime Coloring Book',
    'Illustrated Adventure Novel',
    'DIY Slime Creation Set',
    'Volcano Science Experiment Kit',
    'Charm Bracelet Set'
)
ON CONFLICT DO NOTHING;

-- ============ GIFTS <-> TAGS ============
INSERT INTO gifts_tags (gift_id, tag_id)
SELECT g.id, t.id FROM gifts g, tags t
WHERE g.name = 'Interactive Plush Toy'
  AND t.name IN ('toy', 'plush', 'interactive', 'kids', 'educational')
ON CONFLICT DO NOTHING;

INSERT INTO gifts_tags (gift_id, tag_id)
SELECT g.id, t.id FROM gifts g, tags t
WHERE g.name = 'STEM Engineering Building Kit'
  AND t.name IN ('constructor', 'STEM', 'building', 'educational', 'kids')
ON CONFLICT DO NOTHING;

INSERT INTO gifts_tags (gift_id, tag_id)
SELECT g.id, t.id FROM gifts g, tags t
WHERE g.name = 'Family Strategy Board Game'
  AND t.name IN ('board-game', 'family', 'strategy', 'kids', 'fun')
ON CONFLICT DO NOTHING;

INSERT INTO gifts_tags (gift_id, tag_id)
SELECT g.id, t.id FROM gifts g, tags t
WHERE g.name = '500-Piece Landscape Puzzle'
  AND t.name IN ('puzzle', 'landscape', '500-piece', 'kids', 'relaxing')
ON CONFLICT DO NOTHING;

INSERT INTO gifts_tags (gift_id, tag_id)
SELECT g.id, t.id FROM gifts g, tags t
WHERE g.name = 'Anime Coloring Book'
  AND t.name IN ('coloring-book', 'anime', 'art', 'kids', 'teens')
ON CONFLICT DO NOTHING;

INSERT INTO gifts_tags (gift_id, tag_id)
SELECT g.id, t.id FROM gifts g, tags t
WHERE g.name = 'Illustrated Adventure Novel'
  AND t.name IN ('books', 'adventure', 'kids', 'reading', 'storytelling')
ON CONFLICT DO NOTHING;

INSERT INTO gifts_tags (gift_id, tag_id)
SELECT g.id, t.id FROM gifts g, tags t
WHERE g.name = 'DIY Slime Creation Set'
  AND t.name IN ('slime', 'DIY', 'sensory', 'kids', 'fun')
ON CONFLICT DO NOTHING;

INSERT INTO gifts_tags (gift_id, tag_id)
SELECT g.id, t.id FROM gifts g, tags t
WHERE g.name = 'Volcano Science Experiment Kit'
  AND t.name IN ('science', 'volcano', 'STEM', 'kids', 'experiment')
ON CONFLICT DO NOTHING;

INSERT INTO gifts_tags (gift_id, tag_id)
SELECT g.id, t.id FROM gifts g, tags t
WHERE g.name = 'Charm Bracelet Set'
  AND t.name IN ('jewelry', 'bracelet', 'charms', 'girls', 'cute')
ON CONFLICT DO NOTHING;

-- ============ GIFT IMAGES ============
-- 1. Interactive Plush Toy
INSERT INTO gift_images (gift_id, image_url, sort_order, is_primary)
SELECT g.id, v.image_url, v.sort_order, v.is_primary
FROM gifts g
CROSS JOIN (VALUES
    ('https://res.cloudinary.com/dokapsvao/image/upload/v1779918786/Interactive-plush-toy-girl-with-rabit-givheart_ernyiv.png', 0, TRUE),
    ('https://res.cloudinary.com/dokapsvao/image/upload/v1779918786/Interactive-plush-toy-collage-givheart_j7vvh9.png', 1, FALSE),
    ('https://res.cloudinary.com/dokapsvao/image/upload/v1779918786/Interactive-plush-toy-rabit-givheart_eucsdc.png', 2, FALSE)
) AS v(image_url, sort_order, is_primary)
WHERE g.name = 'Interactive Plush Toy'
  AND NOT EXISTS (
      SELECT 1 FROM gift_images gi WHERE gi.gift_id = g.id AND gi.image_url = v.image_url
  );

-- 2. STEM Engineering Building Kit
INSERT INTO gift_images (gift_id, image_url, sort_order, is_primary)
SELECT g.id, v.image_url, v.sort_order, v.is_primary
FROM gifts g
CROSS JOIN (VALUES
    ('https://res.cloudinary.com/dokapsvao/image/upload/v1779918891/STEM-engineering-building-kit-box-givheart-owl_firnzz.png', 0, TRUE),
    ('https://res.cloudinary.com/dokapsvao/image/upload/v1779918893/STEM-engineering-building-kit-box-givheart_lqp7ea.png', 1, FALSE),
    ('https://res.cloudinary.com/dokapsvao/image/upload/v1779918885/STEM-engineering-building-kit-box-givheart-full-set-owl_rswu3q.png', 2, FALSE)
) AS v(image_url, sort_order, is_primary)
WHERE g.name = 'STEM Engineering Building Kit'
  AND NOT EXISTS (
      SELECT 1 FROM gift_images gi WHERE gi.gift_id = g.id AND gi.image_url = v.image_url
  );

-- 3. Family Strategy Board Game
INSERT INTO gift_images (gift_id, image_url, sort_order, is_primary)
SELECT g.id, v.image_url, v.sort_order, v.is_primary
FROM gifts g
CROSS JOIN (VALUES
    ('https://res.cloudinary.com/dokapsvao/image/upload/v1779918966/Family-strategy-board-game-full-back-side-givheart_intnjs.png', 0, TRUE),
    ('https://res.cloudinary.com/dokapsvao/image/upload/v1779918965/Family-strategy-board-game-box-givheart_lgd91g.png', 1, FALSE),
    ('https://res.cloudinary.com/dokapsvao/image/upload/v1779918969/Family-strategy-board-game-close-up-givheart_xaa5tg.png', 2, FALSE)
) AS v(image_url, sort_order, is_primary)
WHERE g.name = 'Family Strategy Board Game'
  AND NOT EXISTS (
      SELECT 1 FROM gift_images gi WHERE gi.gift_id = g.id AND gi.image_url = v.image_url
  );

-- 4. 500-Piece Landscape Puzzle
INSERT INTO gift_images (gift_id, image_url, sort_order, is_primary)
SELECT g.id, v.image_url, v.sort_order, v.is_primary
FROM gifts g
CROSS JOIN (VALUES
    ('https://res.cloudinary.com/dokapsvao/image/upload/v1779919100/500-piece-landscape-puzzle-harry-potter-givheart_xnlekf.png', 0, TRUE),
    ('https://res.cloudinary.com/dokapsvao/image/upload/v1779919086/500-piece-landscape-puzzle-harry-potter-givheart-progress_systvv.png', 1, FALSE),
    ('https://res.cloudinary.com/dokapsvao/image/upload/v1779919099/500-piece-landscape-puzzle-harry-potter-givheart-picture_fgtmh1.png', 2, FALSE)
) AS v(image_url, sort_order, is_primary)
WHERE g.name = '500-Piece Landscape Puzzle'
  AND NOT EXISTS (
      SELECT 1 FROM gift_images gi WHERE gi.gift_id = g.id AND gi.image_url = v.image_url
  );

-- 5. Anime Coloring Book
INSERT INTO gift_images (gift_id, image_url, sort_order, is_primary)
SELECT g.id, v.image_url, v.sort_order, v.is_primary
FROM gifts g
CROSS JOIN (VALUES
    ('https://res.cloudinary.com/dokapsvao/image/upload/v1779919193/Anime-coloring-book-front-givheart_kmblbr.png', 0, TRUE),
    ('https://res.cloudinary.com/dokapsvao/image/upload/v1779919188/Anime-coloring-book-front-givheart-samples_vnlfjl.png', 1, FALSE),
    ('https://res.cloudinary.com/dokapsvao/image/upload/v1779919186/Anime-coloring-book-front-givheart-sample-case_py7dot.png', 2, FALSE)
) AS v(image_url, sort_order, is_primary)
WHERE g.name = 'Anime Coloring Book'
  AND NOT EXISTS (
      SELECT 1 FROM gift_images gi WHERE gi.gift_id = g.id AND gi.image_url = v.image_url
  );

-- 6. Illustrated Adventure Novel
INSERT INTO gift_images (gift_id, image_url, sort_order, is_primary)
SELECT g.id, v.image_url, v.sort_order, v.is_primary
FROM gifts g
CROSS JOIN (VALUES
    ('https://res.cloudinary.com/dokapsvao/image/upload/v1779919256/Illustrated-adventure-novel-set-of-books-front-givheart_lfnxkt.png', 0, TRUE),
    ('https://res.cloudinary.com/dokapsvao/image/upload/v1779919276/Illustrated-adventure-novel-red-front-givheart_fx06ex.png', 1, FALSE),
    ('https://res.cloudinary.com/dokapsvao/image/upload/v1779919270/Illustrated-adventure-novel-light-blue-front-givheart_bqdjkp.png', 2, FALSE)
) AS v(image_url, sort_order, is_primary)
WHERE g.name = 'Illustrated Adventure Novel'
  AND NOT EXISTS (
      SELECT 1 FROM gift_images gi WHERE gi.gift_id = g.id AND gi.image_url = v.image_url
  );

-- 7. DIY Slime Creation Set
INSERT INTO gift_images (gift_id, image_url, sort_order, is_primary)
SELECT g.id, v.image_url, v.sort_order, v.is_primary
FROM gifts g
CROSS JOIN (VALUES
    ('https://res.cloudinary.com/dokapsvao/image/upload/v1779919354/DIY-slime-creation-set-box-givheart-working-process_elgqoo.png', 0, TRUE),
    ('https://res.cloudinary.com/dokapsvao/image/upload/v1779919367/DIY-slime-creation-set-box-givheart_wr6gr2.png', 1, FALSE),
    ('https://res.cloudinary.com/dokapsvao/image/upload/v1779919360/DIY-slime-creation-set-box-givheart-hands-slime_v3litg.png', 2, FALSE)
) AS v(image_url, sort_order, is_primary)
WHERE g.name = 'DIY Slime Creation Set'
  AND NOT EXISTS (
      SELECT 1 FROM gift_images gi WHERE gi.gift_id = g.id AND gi.image_url = v.image_url
  );

-- 8. Volcano Science Experiment Kit
INSERT INTO gift_images (gift_id, image_url, sort_order, is_primary)
SELECT g.id, v.image_url, v.sort_order, v.is_primary
FROM gifts g
CROSS JOIN (VALUES
    ('https://res.cloudinary.com/dokapsvao/image/upload/v1779919561/Volcano-science-experiment-kit-box-givheart_yiha8f.png', 0, TRUE),
    ('https://res.cloudinary.com/dokapsvao/image/upload/v1779919558/Volcano-science-experiment-kit-box-givheart-how-to-make_rt3fcl.png', 1, FALSE),
    ('https://res.cloudinary.com/dokapsvao/image/upload/v1779919544/Volcano-science-experiment-kit-box-givheart-learning_ejwqb8.png', 2, FALSE)
) AS v(image_url, sort_order, is_primary)
WHERE g.name = 'Volcano Science Experiment Kit'
  AND NOT EXISTS (
      SELECT 1 FROM gift_images gi WHERE gi.gift_id = g.id AND gi.image_url = v.image_url
  );

-- 9. Charm Bracelet Set
INSERT INTO gift_images (gift_id, image_url, sort_order, is_primary)
SELECT g.id, v.image_url, v.sort_order, v.is_primary
FROM gifts g
CROSS JOIN (VALUES
    ('https://res.cloudinary.com/dokapsvao/image/upload/v1779919622/Charm-bracelet-set-box-givheart-collection-box_zrljze.png', 0, TRUE),
    ('https://res.cloudinary.com/dokapsvao/image/upload/v1779919637/Charm-bracelet-set-box-givheart_l24oi3.png', 1, FALSE),
    ('https://res.cloudinary.com/dokapsvao/image/upload/v1779919634/Charm-bracelet-set-box-givheart-collection_kbfq36.png', 2, FALSE)
) AS v(image_url, sort_order, is_primary)
WHERE g.name = 'Charm Bracelet Set'
  AND NOT EXISTS (
      SELECT 1 FROM gift_images gi WHERE gi.gift_id = g.id AND gi.image_url = v.image_url
  );

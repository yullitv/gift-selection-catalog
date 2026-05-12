-- ============ TAGS ============
insert into tags (name) values
    ('техніка'),
    ('декор'),
    ('для дітей'),
    ('книги'),
    ('спорт'),
    ('кухня'),
    ('одяг'),
    ('ігри'),
    ('краса'),
    ('подорожі');

-- ============ EVENTS ============
insert into events (name, event_date) values
    ('День народження', null),
    ('Новий рік', '2026-12-31'),
    ('8 Березня', '2026-03-08'),
    ('День Валентина', '2026-02-14'),
    ('Різдво', '2026-12-25');

-- ============ GIFTS (20 items) ============
insert into gifts (name, description, price_cents, photo_url, stock_quantity, min_age, max_age) values
    ('Bluetooth навушники', 'Бездротові навушники з шумозаглушенням', 249900, null, 15, 14, 99),
    ('Настільна лампа LED', 'Стильна лампа з регулюванням яскравості', 89900, null, 30, 18, 99),
    ('Набір LEGO City', 'Конструктор для дітей від 6 років, 500 деталей', 179900, null, 10, 6, 14),
    ('Книга "Кобзар"', 'Збірка поезій Тараса Шевченка, подарункове видання', 45000, null, 50, 12, 99),
    ('Фітнес-браслет', 'Трекер активності з пульсометром та GPS', 149900, null, 20, 14, 99),
    ('Набір спецій', 'Колекція з 12 екзотичних спецій у дерев''яній коробці', 69900, null, 25, 18, 99),
    ('Кашемірований шарф', 'Теплий шарф з натурального кашеміру', 199900, null, 12, 16, 99),
    ('Настільна гра Monopoly', 'Класична монополія, українська версія', 89900, null, 40, 8, 99),
    ('Набір косметики', 'Подарунковий набір: крем, сироватка та маска', 129900, null, 18, 16, 99),
    ('Чемодан для подорожей', 'Легкий валізу на колесах, ручна поклажа', 299900, null, 8, 18, 99),
    ('Розумна колонка', 'Портативна колонка з голосовим помічником', 199900, null, 22, 14, 99),
    ('Ароматична свічка', 'Натуральна свічка з ароматом лаванди, 200г', 35000, null, 60, 12, 99),
    ('Плюшевий ведмедик', 'М''яка іграшка 40 см, гіпоалергенна', 59900, null, 35, 1, 10),
    ('Електронна книга', 'E-reader з підсвіткою та 16 ГБ пам''яті', 399900, null, 7, 10, 99),
    ('Йога-килимок', 'Професійний килимок 6 мм з сумкою', 79900, null, 28, 14, 99),
    ('Кавова кружка з підігрівом', 'Розумна кружка що тримає температуру', 119900, null, 15, 16, 99),
    ('Дитячий рюкзак', 'Яскравий рюкзак з динозаврами для школи', 49900, null, 45, 6, 12),
    ('Пазл 1000 деталей', 'Краєвид Карпатських гір', 39900, null, 55, 8, 99),
    ('Набір для малювання', '72 кольорових олівці та скетчбук', 89900, null, 20, 4, 14),
    ('Подарункова карта Steam', 'Цифровий код на 500 грн', 50000, null, 100, 12, 35);

-- ============ GIFTS <-> TAGS ============
insert into gifts_tags (gift_id, tag_id)
select g.id, t.id from gifts g, tags t where g.name = 'Bluetooth навушники' and t.name = 'техніка'
union all
select g.id, t.id from gifts g, tags t where g.name = 'Настільна лампа LED' and t.name = 'декор'
union all
select g.id, t.id from gifts g, tags t where g.name = 'Настільна лампа LED' and t.name = 'техніка'
union all
select g.id, t.id from gifts g, tags t where g.name = 'Набір LEGO City' and t.name = 'для дітей'
union all
select g.id, t.id from gifts g, tags t where g.name = 'Набір LEGO City' and t.name = 'ігри'
union all
select g.id, t.id from gifts g, tags t where g.name = 'Книга "Кобзар"' and t.name = 'книги'
union all
select g.id, t.id from gifts g, tags t where g.name = 'Фітнес-браслет' and t.name = 'спорт'
union all
select g.id, t.id from gifts g, tags t where g.name = 'Фітнес-браслет' and t.name = 'техніка'
union all
select g.id, t.id from gifts g, tags t where g.name = 'Набір спецій' and t.name = 'кухня'
union all
select g.id, t.id from gifts g, tags t where g.name = 'Кашемірований шарф' and t.name = 'одяг'
union all
select g.id, t.id from gifts g, tags t where g.name = 'Настільна гра Monopoly' and t.name = 'ігри'
union all
select g.id, t.id from gifts g, tags t where g.name = 'Набір косметики' and t.name = 'краса'
union all
select g.id, t.id from gifts g, tags t where g.name = 'Чемодан для подорожей' and t.name = 'подорожі'
union all
select g.id, t.id from gifts g, tags t where g.name = 'Розумна колонка' and t.name = 'техніка'
union all
select g.id, t.id from gifts g, tags t where g.name = 'Ароматична свічка' and t.name = 'декор'
union all
select g.id, t.id from gifts g, tags t where g.name = 'Плюшевий ведмедик' and t.name = 'для дітей'
union all
select g.id, t.id from gifts g, tags t where g.name = 'Електронна книга' and t.name = 'техніка'
union all
select g.id, t.id from gifts g, tags t where g.name = 'Електронна книга' and t.name = 'книги'
union all
select g.id, t.id from gifts g, tags t where g.name = 'Йога-килимок' and t.name = 'спорт'
union all
select g.id, t.id from gifts g, tags t where g.name = 'Кавова кружка з підігрівом' and t.name = 'кухня'
union all
select g.id, t.id from gifts g, tags t where g.name = 'Кавова кружка з підігрівом' and t.name = 'техніка'
union all
select g.id, t.id from gifts g, tags t where g.name = 'Дитячий рюкзак' and t.name = 'для дітей'
union all
select g.id, t.id from gifts g, tags t where g.name = 'Пазл 1000 деталей' and t.name = 'ігри'
union all
select g.id, t.id from gifts g, tags t where g.name = 'Набір для малювання' and t.name = 'для дітей'
union all
select g.id, t.id from gifts g, tags t where g.name = 'Подарункова карта Steam' and t.name = 'ігри'
union all
select g.id, t.id from gifts g, tags t where g.name = 'Подарункова карта Steam' and t.name = 'техніка';

-- ============ GIFTS <-> EVENTS ============
insert into gifts_events (gift_id, event_id)
select g.id, e.id from gifts g, events e where g.name = 'Bluetooth навушники' and e.name = 'День народження'
union all
select g.id, e.id from gifts g, events e where g.name = 'Bluetooth навушники' and e.name = 'Новий рік'
union all
select g.id, e.id from gifts g, events e where g.name = 'Набір LEGO City' and e.name = 'День народження'
union all
select g.id, e.id from gifts g, events e where g.name = 'Набір LEGO City' and e.name = 'Новий рік'
union all
select g.id, e.id from gifts g, events e where g.name = 'Книга "Кобзар"' and e.name = 'День народження'
union all
select g.id, e.id from gifts g, events e where g.name = 'Набір косметики' and e.name = '8 Березня'
union all
select g.id, e.id from gifts g, events e where g.name = 'Набір косметики' and e.name = 'День Валентина'
union all
select g.id, e.id from gifts g, events e where g.name = 'Кашемірований шарф' and e.name = 'Різдво'
union all
select g.id, e.id from gifts g, events e where g.name = 'Кашемірований шарф' and e.name = 'Новий рік'
union all
select g.id, e.id from gifts g, events e where g.name = 'Ароматична свічка' and e.name = 'День Валентина'
union all
select g.id, e.id from gifts g, events e where g.name = 'Ароматична свічка' and e.name = 'Різдво'
union all
select g.id, e.id from gifts g, events e where g.name = 'Настільна гра Monopoly' and e.name = 'Новий рік'
union all
select g.id, e.id from gifts g, events e where g.name = 'Настільна гра Monopoly' and e.name = 'День народження'
union all
select g.id, e.id from gifts g, events e where g.name = 'Плюшевий ведмедик' and e.name = 'День народження'
union all
select g.id, e.id from gifts g, events e where g.name = 'Плюшевий ведмедик' and e.name = 'День Валентина'
union all
select g.id, e.id from gifts g, events e where g.name = 'Розумна колонка' and e.name = 'Новий рік'
union all
select g.id, e.id from gifts g, events e where g.name = 'Чемодан для подорожей' and e.name = 'День народження'
union all
select g.id, e.id from gifts g, events e where g.name = 'Фітнес-браслет' and e.name = 'День народження'
union all
select g.id, e.id from gifts g, events e where g.name = 'Фітнес-браслет' and e.name = '8 Березня'
union all
select g.id, e.id from gifts g, events e where g.name = 'Подарункова карта Steam' and e.name = 'День народження'
union all
select g.id, e.id from gifts g, events e where g.name = 'Подарункова карта Steam' and e.name = 'Новий рік';

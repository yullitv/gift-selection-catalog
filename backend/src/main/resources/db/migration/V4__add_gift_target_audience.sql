create table gift_target_audiences
(
    gift_id  bigint      not null references gifts (id) on delete cascade,
    audience varchar(32) not null,
    primary key (gift_id, audience)
);

create index idx_gift_target_audiences_audience on gift_target_audiences (audience);

insert into gift_target_audiences (gift_id, audience) select id, 'MAN' from gifts where name = 'Bluetooth навушники';
insert into gift_target_audiences (gift_id, audience) select id, 'COUPLE' from gifts where name = 'Настільна лампа LED';
insert into gift_target_audiences (gift_id, audience) select id, 'CHILD' from gifts where name = 'Набір LEGO City';
insert into gift_target_audiences (gift_id, audience) select id, 'MAN' from gifts where name = 'Книга "Кобзар"';
insert into gift_target_audiences (gift_id, audience) select id, 'WOMAN' from gifts where name = 'Фітнес-браслет';
insert into gift_target_audiences (gift_id, audience) select id, 'COUPLE' from gifts where name = 'Набір спецій';
insert into gift_target_audiences (gift_id, audience) select id, 'WOMAN' from gifts where name = 'Кашемірований шарф';
insert into gift_target_audiences (gift_id, audience) select id, 'CHILD' from gifts where name = 'Настільна гра Monopoly';
insert into gift_target_audiences (gift_id, audience) select id, 'WOMAN' from gifts where name = 'Набір косметики';
insert into gift_target_audiences (gift_id, audience) select id, 'COUPLE' from gifts where name = 'Чемодан для подорожей';
insert into gift_target_audiences (gift_id, audience) select id, 'MAN' from gifts where name = 'Розумна колонка';
insert into gift_target_audiences (gift_id, audience) select id, 'WOMAN' from gifts where name = 'Ароматична свічка';
insert into gift_target_audiences (gift_id, audience) select id, 'CHILD' from gifts where name = 'Плюшевий ведмедик';
insert into gift_target_audiences (gift_id, audience) select id, 'MAN' from gifts where name = 'Електронна книга';
insert into gift_target_audiences (gift_id, audience) select id, 'WOMAN' from gifts where name = 'Йога-килимок';
insert into gift_target_audiences (gift_id, audience) select id, 'COUPLE' from gifts where name = 'Кавова кружка з підігрівом';
insert into gift_target_audiences (gift_id, audience) select id, 'CHILD' from gifts where name = 'Дитячий рюкзак';
insert into gift_target_audiences (gift_id, audience) select id, 'COUPLE' from gifts where name = 'Пазл 1000 деталей';
insert into gift_target_audiences (gift_id, audience) select id, 'CHILD' from gifts where name = 'Набір для малювання';
insert into gift_target_audiences (gift_id, audience) select id, 'MAN' from gifts where name = 'Подарункова карта Steam';

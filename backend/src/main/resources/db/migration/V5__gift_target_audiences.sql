-- Idempotent repair: fixes partial runs and "table already exists" after merging V4+V5.
-- Safe if gift_target_audiences already exists and/or legacy gifts.target_audience is gone.

create table if not exists gift_target_audiences
(
    gift_id  bigint      not null references gifts (id) on delete cascade,
    audience varchar(32) not null,
    primary key (gift_id, audience)
);

create index if not exists idx_gift_target_audiences_audience on gift_target_audiences (audience);

do
$$
    begin
        if exists (select 1
                   from information_schema.columns
                   where table_schema = 'public'
                     and table_name = 'gifts'
                     and column_name = 'target_audience') then
            insert into gift_target_audiences (gift_id, audience)
            select id, target_audience
            from gifts
            on conflict do nothing;
        end if;
    end
$$;

insert into gift_target_audiences (gift_id, audience) select id, 'MAN' from gifts where name = 'Bluetooth навушники' on conflict do nothing;
insert into gift_target_audiences (gift_id, audience) select id, 'COUPLE' from gifts where name = 'Настільна лампа LED' on conflict do nothing;
insert into gift_target_audiences (gift_id, audience) select id, 'CHILD' from gifts where name = 'Набір LEGO City' on conflict do nothing;
insert into gift_target_audiences (gift_id, audience) select id, 'MAN' from gifts where name = 'Книга "Кобзар"' on conflict do nothing;
insert into gift_target_audiences (gift_id, audience) select id, 'WOMAN' from gifts where name = 'Фітнес-браслет' on conflict do nothing;
insert into gift_target_audiences (gift_id, audience) select id, 'COUPLE' from gifts where name = 'Набір спецій' on conflict do nothing;
insert into gift_target_audiences (gift_id, audience) select id, 'WOMAN' from gifts where name = 'Кашемірований шарф' on conflict do nothing;
insert into gift_target_audiences (gift_id, audience) select id, 'CHILD' from gifts where name = 'Настільна гра Monopoly' on conflict do nothing;
insert into gift_target_audiences (gift_id, audience) select id, 'WOMAN' from gifts where name = 'Набір косметики' on conflict do nothing;
insert into gift_target_audiences (gift_id, audience) select id, 'COUPLE' from gifts where name = 'Чемодан для подорожей' on conflict do nothing;
insert into gift_target_audiences (gift_id, audience) select id, 'MAN' from gifts where name = 'Розумна колонка' on conflict do nothing;
insert into gift_target_audiences (gift_id, audience) select id, 'WOMAN' from gifts where name = 'Ароматична свічка' on conflict do nothing;
insert into gift_target_audiences (gift_id, audience) select id, 'CHILD' from gifts where name = 'Плюшевий ведмедик' on conflict do nothing;
insert into gift_target_audiences (gift_id, audience) select id, 'MAN' from gifts where name = 'Електронна книга' on conflict do nothing;
insert into gift_target_audiences (gift_id, audience) select id, 'WOMAN' from gifts where name = 'Йога-килимок' on conflict do nothing;
insert into gift_target_audiences (gift_id, audience) select id, 'COUPLE' from gifts where name = 'Кавова кружка з підігрівом' on conflict do nothing;
insert into gift_target_audiences (gift_id, audience) select id, 'CHILD' from gifts where name = 'Дитячий рюкзак' on conflict do nothing;
insert into gift_target_audiences (gift_id, audience) select id, 'COUPLE' from gifts where name = 'Пазл 1000 деталей' on conflict do nothing;
insert into gift_target_audiences (gift_id, audience) select id, 'CHILD' from gifts where name = 'Набір для малювання' on conflict do nothing;
insert into gift_target_audiences (gift_id, audience) select id, 'MAN' from gifts where name = 'Подарункова карта Steam' on conflict do nothing;

drop index if exists idx_gifts_target_audience;
alter table gifts drop column if exists target_audience;

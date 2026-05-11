alter table users add column role varchar(32) not null default 'USER';

-- Dev admin (password: Admin299team)
insert into users (full_name, email, password_hash, role, created_at)
values ('Admin', 'admin229@mate.com',
        '$2a$10$M4s9NoTCn2X35e3PKvkp3eQBfWFtvvJhbJPTmWZG1yeD5N/ydTUDG',
        'ADMIN', now());

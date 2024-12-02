create table if not exists post
(
    id      integer not null
        constraint post_pk
            primary key autoincrement,
    subject text not null,
    content text not null
);

create table if not exists cars (
    id integer not null constraint cars_pk primary key autoincrement ,
    make text not null ,
    model text not null ,
    year integer not null
);

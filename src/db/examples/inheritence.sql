CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    currency_id UUID NOT NULL,
    foreign key (currency_id) references currencies(id)
);

CREATE TABLE books (
    author VARCHAR(255) NOT NULL,
    sold_times INTEGER NOT NULL
) INHERITS (items);

CREATE TABLE laptops (
    cpu VARCHAR(255) NOT NULL,
    ram VARCHAR(255) NOT NULL
) INHERITS (items);


insert into public.books (name, price, author, sold_times, currency_id) values ('atomic_habits',100,'suresh', 10, '156435e1-3c59-4b20-bf5b-2b2a90320969');
insert into laptops (name, price, cpu, ram, currency_id) values ('dell-inspiron',10000,'i5', '16gb', '156435e1-3c59-4b20-bf5b-2b2a90320969')

select * from items
select * from books
select * from laptops
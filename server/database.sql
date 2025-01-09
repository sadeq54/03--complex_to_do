


create database todo;

create table todos(
    id varchar(255) primary key,
    user_email varchar(255),
    title varchar(30),
    progress INT,
    date varchar(300)
);
Create table users(
    email varchar(255) primary key,
    hashed_password varchar(255)
)


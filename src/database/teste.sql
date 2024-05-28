create database dreamTeam;
use dreamTeam;

create table usuario (
idUsuario int primary key auto_increment,
nome varchar(45),
email varchar(100),
senha varchar(100)
);

select * from usuario;
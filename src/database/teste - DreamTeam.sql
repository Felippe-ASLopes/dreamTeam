create database dreamTeam;
use dreamTeam;

create table usuario (
idUsuario int primary key auto_increment,
nome varchar(45),
email varchar(100),
senha varchar(100),
dinheiro decimal(5,2)
);

create table jogador (
idJogador int primary key auto_increment,
nome varchar(45),
valor decimal(5,2)
);

insert into jogador values
(default, 'Lebron James', 30),
(default, 'Kyrie Irving', 15);

select * from usuario;
select * from jogador;
create database dreamTeam;
use dreamTeam;

create table usuario (
idUsuario int primary key auto_increment,
nomeTime varchar(24),
email varchar(256),
senha char(32),
dinheiro decimal(5,2)
);

create table rodada (
idRodada int primary key auto_increment,
inicio datetime,
fim datetime
);

create table timeNBA (
idTime int primary key auto_increment,
cidade varchar(24),
nomeTimeNba varchar(24)
);

create table partida (
idPartida int auto_increment,
fkRodada int,
fkTimeCasa int,
fkTimeFora int,
constraint fkRodadaPartida foreign key (fkRodada) references rodada (idRodada),
constraint fkTimeCasaPartida foreign key (fkTimeCasa) references timeNba (idTime),
constraint fkTimeForaPartida foreign key (fkTimeFora) references timeNba (idTime),
constraint pkPartida primary key (idPartida, fkRodada)
);

create table posicao (
idPosicao int primary key auto_increment,
sigla char(2)
);

create table jogador (
idJogador int primary key auto_increment,
fkTime int,
nomeJogador varchar(45),
sobrenome varchar(45),
fkPosicao int,
preco decimal(5,2),
constraint fkTimeJogador foreign key (fkTime) references timeNba (idTime),
constraint fkPosicaoJogador foreign key (fkPosicao) references posicao (idPosicao)
);

create table estatistica (
fkPartida int,
fkJogador int,
ponto int,
assistencia int,
rebote int,
bloqueio int,
roubo int,
turnOver int,
falta int,
constraint fkPartidaEstatistica foreign key (fkPartida) references partida (idPartida),
constraint fkJogadorEstatistica foreign key (fkJogador) references jogador (idJogador)
);

create table timeUsuario (
fkUsuario int,
fkRodada int,
fkJogador1 int,
fkJogador2 int,
fkJogador3 int,
fkJogador4 int,
fkJogador5 int,
constraint fkUsuarioTime foreign key (fkUsuario) references usuario (idUsuario),
constraint fkRodadaTime foreign key (fkRodada) references rodada (idRodada),
constraint fkjogador1Time foreign key (fkJogador1) references jogador (idJogador),
constraint fkjogador2Time foreign key (fkJogador2) references jogador (idJogador),
constraint fkjogador3Time foreign key (fkJogador3) references jogador (idJogador),
constraint fkjogador4Time foreign key (fkJogador4) references jogador (idJogador),
constraint fkjogador5Time foreign key (fkJogador5) references jogador (idJogador),
constraint pkTime primary key (fkUsuario, fkRodada)
);

insert into posicao (sigla) values
('PG'),
('SG'),
('SF'),
('PF'),
('C');

insert into timeNba (cidade, nome) values
('Los Angeles', 'Lakers'),
('Boston', 'Celtics'),
('Dallas', 'Mavericks'),
('Minnesota', 'Timberwolves');

insert into jogador (fkTime, nome, sobrenome, fkPosicao, preco) values
(1, 'LeBron', 'James', 3, 30.00),
(3, 'Kyrie', 'Irving', 1, 15.00),
(2, 'Jayson', 'Tatum', 3, 25.00),
(1, 'Anthony', 'Davis', 5, 25.00),
(4, 'Anthony', 'Edwards', 5, 15.00);

select idJogador, nomeJogador, sobrenome, sigla, preco, cidade, nomeTimeNba from jogador 
    join timeNba on fkTime = idTime
    join posicao on fkPosicao = idPosicao;

select * from usuario;
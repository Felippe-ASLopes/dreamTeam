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
valor decimal(5,2),
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

insert into timeNba (cidade, nomeTimeNba) values
('Brooklyn', 'Nets');

insert into jogador (fkTime, nomeJogador, sobrenome, fkPosicao, preco) values
(5, 'Ben', 'Simmons', 1, 5.00);

select idJogador, nomeJogador, sobrenome, sigla, preco, cidade, nomeTimeNba from jogador
join timeNba on fkTime = idTime
join posicao on fkPosicao = idPosicao order by idJogador;

select * from usuario;
select * from jogador;
select * from timeNBA;
select * from timeUsuario;
select * from rodada;

select nomeTime, fkrodada, jogador1.nomeJogador as 'PG', jogador2.nomeJogador as 'SG', jogador3.nomeJogador as 'SF', jogador4.nomeJogador as 'PF', jogador5.nomeJogador as 'C' from timeUsuario
join usuario on fkusuario = idUsuario
join rodada on fkRodada
join jogador as jogador1 on fkJogador1 = jogador1.idJogador
join jogador as jogador2 on fkJogador2 = jogador2.idJogador
join jogador as jogador3 on fkJogador3 = jogador3.idJogador
join jogador as jogador4 on fkJogador4 = jogador4.idJogador
join jogador as jogador5 on fkJogador5 = jogador5.idJogador;

truncate table timeUsuario;
create database dreamTeam;
use dreamTeam;

create user 'API'@'localhost' identified by 'webDataViz0API';
grant insert, select, update on dreamTeam.* to 'API'@'localhost';
show grants for 'API'@'localhost';

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
urlImagem varchar(150),
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
('Los Angeles', 'Lakers'),
('Boston', 'Celtics'),
('Dallas', 'Mavericks'),
('Minnesota', 'Timberwolves'),
('Brooklyn', 'Nets'),
('Milwaukee', 'Bucks'),
(null, 'Golden State Warriors');

insert into jogador (fkTime, nomeJogador, sobrenome, fkPosicao, preco, urlImagem) values
(1, 'LeBron', 'James', 3, 30.00, 'https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/1966.png&w=350&h=254'),
(3, 'Kyrie', 'Irving', 1, 15.00, 'https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/6442.png&w=350&h=254'),
(2, 'Jayson', 'Tatum', 3, 25.00, 'https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/4065648.png&w=350&h=254'),
(1, 'Anthony', 'Davis', 5, 25.00, 'https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/6583.png&w=350&h=254'),
(4, 'Anthony', 'Edwards', 2, 15.00, 'https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/4594268.png&w=350&h=254'),
(5, 'Ben', 'Simmons', 1, 5.00, 'https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/3907387.png&w=350&h=254'),
(3, 'Luka' , 'Dončić', 2, 30, 'https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/3945274.png&w=350&h=254'),
(6, 'Giannis', 'Antetokounmpo', 4, 25, 'https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/3032977.png&w=350&h=254'),
(7, 'Stephen', 'Curry', 1, 30, 'https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/3975.png&w=350&h=254');

insert into rodada values
(default, '2024-12-30 00:00:00', '2024-12-30 23:59:59');

select * from usuario;
select * from jogador;
select * from timeNBA;
select * from timeUsuario;
select * from rodada;

select idJogador, nomeJogador, sobrenome, sigla, preco, cidade, nomeTimeNba from jogador
join timeNba on fkTime = idTime
join posicao on fkPosicao = idPosicao order by idJogador;

select nomeTime, fkrodada as 'Rodada', 
concat(j1.nomeJogador, ' ', j1.sobrenome) as 'PG', 
concat(j2.nomeJogador, ' ', j2.sobrenome) as 'SG', 
concat(j3.nomeJogador, ' ', j3.sobrenome) as 'SF', 
concat(j4.nomeJogador, ' ', j4.sobrenome) as 'PF', 
concat(j5.nomeJogador, ' ', j5.sobrenome) as 'C',
valor 
from timeUsuario
join usuario on fkusuario = idUsuario
join rodada on fkRodada
join jogador as j1 on fkJogador1 = j1.idJogador
join jogador as j2 on fkJogador2 = j2.idJogador
join jogador as j3 on fkJogador3 = j3.idJogador
join jogador as j4 on fkJogador4 = j4.idJogador
join jogador as j5 on fkJogador5 = j5.idJogador;

select idRodada, date(inicio) as 'dataInicio', time(inicio) as 'horaInicio', date(fim) as 'dataFim', time(fim) as 'horaFim' from rodada;

-- COMANDOS PARA TESTE --
-- update usuario set dinheiro = 999.99 where idUsuario = 1; --
truncate table timeUsuario;
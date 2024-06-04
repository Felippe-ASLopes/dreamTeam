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
fkRodada int,
fkJogador int,
ponto int,
assistencia int,
rebote int,
bloqueio int,
roubo int,
turnOver int,
falta int,
pontuacaoJogador decimal(5,2),
constraint fkRodadaEstatistica foreign key (fkRodada) references rodada (idRodada),
constraint fkJogadorEstatistica foreign key (fkJogador) references jogador (idJogador),
constraint pkEstatistica primary key (fkRodada, fkJogador)
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
pontuacao decimal(5,2),
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
(7, 'Stephen', 'Curry', 1, 30, 'https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/3975.png&w=350&h=254'),
(1, 'Damian', 'Lillard', 1, 15, 'https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/6606.png&w=350&h=254'),
(1, 'James', 'Harden', 2, 15, 'https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/3992.png&w=350&h=254'),
(1, 'Bam', 'Adebayo', 5, 10, 'https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/4066261.png&w=350&h=254'),
(1, 'Nikola', 'Jokic', 5, 20, 'https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/3112335.png&w=350&h=254'),
(1, 'Jimmy', 'Butler', 3, 15, 'https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/6430.png&w=350&h=254'),
(1, 'Kevin', 'Durant', 4, 30, 'https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/3202.png&w=350&h=254');

insert into rodada values
(default, '2024-12-31 23:59:59', '2024-01-01 00:00:00');

insert into usuario values
(default, 'Admin', 'a', md5('a'), 500);

select * from usuario;
select * from jogador;
select * from timeNBA;
select * from timeUsuario;
select * from rodada;
select * from estatistica;

update usuario set senha = md5('teste2') where idUsuario = 3;

select idJogador, nomeJogador, sobrenome, sigla, preco, cidade, nomeTimeNba from jogador
join timeNba on fkTime = idTime
join posicao on fkPosicao = idPosicao order by idJogador;

select nomeTime, fkrodada as 'Rodada', 
concat(j1.nomeJogador, ' ', j1.sobrenome) as 'PG', 
concat(j2.nomeJogador, ' ', j2.sobrenome) as 'SG', 
concat(j3.nomeJogador, ' ', j3.sobrenome) as 'SF', 
concat(j4.nomeJogador, ' ', j4.sobrenome) as 'PF', 
concat(j5.nomeJogador, ' ', j5.sobrenome) as 'C',
valor,
pontuacao
from timeUsuario
join usuario on fkusuario = idUsuario
join jogador as j1 on fkJogador1 = j1.idJogador
join jogador as j2 on fkJogador2 = j2.idJogador
join jogador as j3 on fkJogador3 = j3.idJogador
join jogador as j4 on fkJogador4 = j4.idJogador
join jogador as j5 on fkJogador5 = j5.idJogador
WHERE fkRodada = (SELECT MAX(fkRodada) FROM timeUsuario);

SELECT * FROM timeUsuario
WHERE fkRodada = (SELECT MAX(fkRodada) FROM timeUsuario);

SELECT fkJogador, ROUND(AVG(pontuacaoJogador), 2) AS mediaPontuacao
FROM estatistica
GROUP BY fkJogador;

SELECT fkRodada, concat(nomeJogador, ' ', sobrenome) as 'Nome jogador', ponto, assistencia, rebote, bloqueio, roubo, turnOver, falta FROM estatistica
join jogador on fkJogador = idJogador
WHERE fkRodada = (SELECT MAX(fkRodada) FROM estatistica);

SELECT * FROM estatistica WHERE fkRodada = (SELECT MAX(fkRodada) FROM estatistica);

SELECT fkUsuario, fkRodada, pontuacao FROM timeUsuario WHERE fkRodada = 1 and fkUsuario = 1;

SELECT MAX(fkRodada) 
FROM timeUsuario;

SELECT nomeTime, fkJogador1, fkJogador2, fkJogador3, fkJogador4, fkJogador5, pontuacao, valor FROM timeUsuario JOIN usuario on fkUsuario = idUsuario
        WHERE fkRodada = 1;


-- COMANDOS PARA TESTE --
-- truncate table estatistica;
-- update jogador set preco = preco - 1 where idJogador = 1; --
-- drop database dreamteam; --
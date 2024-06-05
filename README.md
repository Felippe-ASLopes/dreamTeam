# Dream-Team
Projeto individual do 1° semestre de análise e desenvolvimento de sistemas.

Tema: NBA
O projeto foi desenvolvido se baseando em fantasy games, onde são usados estatísticas de jogos reais para gerar uma pontuação e valorização dos jogadores e dos times, criando um sistema competitivo e desafiando o olhar analítico e estratégico dos usuários.

Desenvolvido com uso da API Web-Data-Viz, disponibilizada em: 'https://github.com/BandTec/web-data-viz', pela equipe da SPTech.

Como testar?

1- Clone o repositório.
2- Execute os comandos do 'script - DreamTeam', em: './src/database/script - DreamTeam.sql'.
(É necessário ter o mySql server instalado)
3- Execute um terminal na pasta raiz do repositório e execute o seguinte comando: 'npm i'.
(É necessário ter o Node.js instalado)
4- Após a instalação dos módulos do node no repositório, execute o comando: 'npm start'.
5- Acesse o site pelo seu navegador padrão, usando o endereço indicado no terminal; por padrão: 'http://localhost:3333/'.
6- Acesse a página home por meio do botão 'login' ou 'Monte seu time'.
7- Crie uma conta, monte seu time, envie para o banco e atualize se necessário.
8- Entre na conta Admin criada no passo 2, as credenciais por padrão são: email: 'admin' senha: 'admin', sem aspas simples.
9- Feche o mercado, gere estatísticas e abra o mercado novamente.
(Observe que o valor dos jogadores e as pontuações, junto com a pontuação e dinheiro do time já foram atualizadas)
10- Acesse a página 'Ranking' e analise as estatísticas, pontuações, valores e times criados.

As estatísticas são geradas aleatoriamente em: './public/js/funcAdmin.js' e calculadas em: './public/js/funcPontuacao.js'
Algumas imagens de jogadores podem ficar indisponíveis, visto que são retiradas do site:'https://www.espn.com.br/nba/jogador/...'
for (i = 0; i < 5; i++) {
    let posicao = 'Guard'

    if (i == 2) {
        posicao = 'Guard ou Forward'
    }

    if (i == 3 || i == 4) {
        posicao = 'Forward'
    }
    
    aside_user.innerHTML += `
    <div id="jogador${i}" class="div_jogador">
        <p>Adicione um ${posicao}</p>
    </div>`
}
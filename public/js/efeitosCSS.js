// EFEITO HOVER NO MENU ESQUERDO
// MOUSE OVER
jogador0.addEventListener('mouseover', function() {
    jogador0.classList.add('jogador_hover')
    div_jogador0.classList.add('add_jogador_hover')
    div_img_jogador0.classList.add('add_img_jogador_hover')
    span_nome_jogador0.classList.add('nome_jogador_hover')
})
jogador1.addEventListener('mouseover', function() {
    jogador1.classList.add('jogador_hover')
    div_jogador1.classList.add('add_jogador_hover')
    div_img_jogador1.classList.add('add_img_jogador_hover')
    span_nome_jogador1.classList.add('nome_jogador_hover')
})
jogador2.addEventListener('mouseover', function() {
    jogador2.classList.add('jogador_hover')
    div_jogador2.classList.add('add_jogador_hover')
    div_img_jogador2.classList.add('add_img_jogador_hover')
    span_nome_jogador2.classList.add('nome_jogador_hover')
})
jogador3.addEventListener('mouseover', function() {
    jogador3.classList.add('jogador_hover')
    div_jogador3.classList.add('add_jogador_hover')
    div_img_jogador3.classList.add('add_img_jogador_hover')
    span_nome_jogador3.classList.add('nome_jogador_hover')
})
jogador4.addEventListener('mouseover', function() {
    jogador4.classList.add('jogador_hover')
    div_jogador4.classList.add('add_jogador_hover')
    div_img_jogador4.classList.add('add_img_jogador_hover')
    span_nome_jogador4.classList.add('nome_jogador_hover')
})

// MOUSE OUT
jogador0.addEventListener('mouseout', function() {
    jogador0.classList.remove('jogador_hover')
    div_jogador0.classList.remove('add_jogador_hover')
    div_img_jogador0.classList.remove('add_img_jogador_hover')
    span_nome_jogador0.classList.remove('nome_jogador_hover')
})
jogador1.addEventListener('mouseout', function() {
    jogador1.classList.remove('jogador_hover')
    div_jogador1.classList.remove('add_jogador_hover')
    div_img_jogador1.classList.remove('add_img_jogador_hover')
    span_nome_jogador1.classList.remove('nome_jogador_hover')
})
jogador2.addEventListener('mouseout', function() {
    jogador2.classList.remove('jogador_hover')
    div_jogador2.classList.remove('add_jogador_hover')
    div_img_jogador2.classList.remove('add_img_jogador_hover')
    span_nome_jogador2.classList.remove('nome_jogador_hover')
})
jogador3.addEventListener('mouseout', function() {
    jogador3.classList.remove('jogador_hover')
    div_jogador3.classList.remove('add_jogador_hover')
    div_img_jogador3.classList.remove('add_img_jogador_hover')
    span_nome_jogador3.classList.remove('nome_jogador_hover')
})
jogador4.addEventListener('mouseout', function() {
    jogador4.classList.remove('jogador_hover')
    div_jogador4.classList.remove('add_jogador_hover')
    div_img_jogador4.classList.remove('add_img_jogador_hover')
    span_nome_jogador4.classList.remove('nome_jogador_hover')
})

// EFEITO HOVER NA QUADRA
// MOUSE OVER
div_jogador0.addEventListener('mouseover', function() {
    jogador0.classList.add('jogador_hover')
    div_jogador0.classList.add('add_jogador_hover')
    div_img_jogador0.classList.add('add_img_jogador_hover')
    span_nome_jogador0.classList.add('nome_jogador_hover')
})
div_jogador1.addEventListener('mouseover', function() {
    jogador1.classList.add('jogador_hover')
    div_jogador1.classList.add('add_jogador_hover')
    div_img_jogador1.classList.add('add_img_jogador_hover')
    span_nome_jogador1.classList.add('nome_jogador_hover')
})
div_jogador2.addEventListener('mouseover', function() {
    jogador2.classList.add('jogador_hover')
    div_jogador2.classList.add('add_jogador_hover')
    div_img_jogador2.classList.add('add_img_jogador_hover')
    span_nome_jogador2.classList.add('nome_jogador_hover')
})
div_jogador3.addEventListener('mouseover', function() {
    jogador3.classList.add('jogador_hover')
    div_jogador3.classList.add('add_jogador_hover')
    div_img_jogador3.classList.add('add_img_jogador_hover')
    span_nome_jogador3.classList.add('nome_jogador_hover')
})
div_jogador4.addEventListener('mouseover', function() {
    jogador4.classList.add('jogador_hover')
    div_jogador4.classList.add('add_jogador_hover')
    div_img_jogador4.classList.add('add_img_jogador_hover')
    span_nome_jogador4.classList.add('nome_jogador_hover')
})

// MOUSE OUT
div_jogador0.addEventListener('mouseout', function() {
    jogador0.classList.remove('jogador_hover')
    div_jogador0.classList.remove('add_jogador_hover')
    div_img_jogador0.classList.remove('add_img_jogador_hover')
    span_nome_jogador0.classList.remove('nome_jogador_hover')
})
div_jogador1.addEventListener('mouseout', function() {
    jogador1.classList.remove('jogador_hover')
    div_jogador1.classList.remove('add_jogador_hover')
    div_img_jogador1.classList.remove('add_img_jogador_hover')
    span_nome_jogador1.classList.remove('nome_jogador_hover')
})
div_jogador2.addEventListener('mouseout', function() {
    jogador2.classList.remove('jogador_hover')
    div_jogador2.classList.remove('add_jogador_hover')
    div_img_jogador2.classList.remove('add_img_jogador_hover')
    span_nome_jogador2.classList.remove('nome_jogador_hover')
})
div_jogador3.addEventListener('mouseout', function() {
    jogador3.classList.remove('jogador_hover')
    div_jogador3.classList.remove('add_jogador_hover')
    div_img_jogador3.classList.remove('add_img_jogador_hover')
    span_nome_jogador3.classList.remove('nome_jogador_hover')
})
div_jogador4.addEventListener('mouseout', function() {
    jogador4.classList.remove('jogador_hover')
    div_jogador4.classList.remove('add_jogador_hover')
    div_img_jogador4.classList.remove('add_img_jogador_hover')
    span_nome_jogador4.classList.remove('nome_jogador_hover')
})

// DRAGGING DE ELEMENTOS
// const dropZone = document.querySelectorAll('.add_jogador')
const dropZone = document.querySelector('#div_jogador2')

document.addEventListener('dragstart', function(e) {
    // const teste = e.target.textContent
    e.target.classList.add('dragging')
})

document.addEventListener('dragend', function(e) {
    e.target.classList.remove('dragging')
})

dropZone.addEventListener('dragenter', function() {
    console.log('teste')
})
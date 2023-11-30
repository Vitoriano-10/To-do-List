
// VARIAVEIS QUE NAO MUDAM O VALOR
const input = document.querySelector('.input-text')
const btn = document.querySelector('.btn')
const listaCompleta = document.querySelector('.lista')

// VARIAVEIS QUE MUDAM O VALOR
let minhasTarefas = [] // ARRAY


// ACIONAR O BOTÃO COM A TECLA ENTER
addEventListener('keypress', function(e)  {
    if(e.key === 'Enter')
    btn.click()
})

// ACIONAR O BOTAO COM O CLICK DO MOUSE
btn.addEventListener('click', adicionarNovaTarefa)


//  FUNÇÃO PARA ADICIONAR ITENS NO ARRAY
function adicionarNovaTarefa() {
    if(input.value === ''){
        alert("Preencha o campo vazio!")
    }else{
        minhasTarefas.push({
            tarefa: input.value,
            concluido: false
        })

        input.value = ''

        mostrarTarefas()

    }
}

// FUNÇÃO PARA MOSTRAR OS ITEM NA UL
function mostrarTarefas() {
    let novoItemNaLista = ''

    minhasTarefas.forEach( (item, posicao) => {
        novoItemNaLista = novoItemNaLista +`

        <li class="tarefa ${item.concluido && 'feito'}">
            <img src="./Img/verificado.jpg" alt="verificado" onclick = 'concluirTarefa (
            ${posicao})'>
            <p>${item.tarefa}</p>
            <img src="./Img/lixo.jpg" alt="lixinho" onclick="deletarItem(${posicao})">
        </li>
        `
    }) 

    listaCompleta.innerHTML = novoItemNaLista

    // PARTE DO NAVEGADOR PRA SALVAR OS DADOS 
    //JSON.stringify - transforma em string
    localStorage.setItem('lista', JSON.stringify(minhasTarefas))
}

// ADICIONAR O CLICK NA LIXEIRA PARA ACIONAR A FUNÇÃO DE DELETAR -  onclick="deletarItem()" 

// ADICIONAR A FUNÇAO DE DELETAR NA IMG DA LIXEIRA
function deletarItem(posicao) {
    // splice serve pra deletar os itens do arra - posicao 1 localização do item no array e a localização 2 é quantos itens vao ser deletador a partir da localização 
    minhasTarefas.splice(posicao,1)

    // dps ele tem que ir na lista ja alterada e deletar a partir dela
    mostrarTarefas()
}

function concluirTarefa(posicao) {
    minhasTarefas[posicao].concluido = !minhasTarefas[posicao].concluido

    mostrarTarefas()
}


// FUNÇÃO PARA APARECER OS DADOS SALVOS DA PAGINA
function recarregarTarefas() {
    const tarefasDoLocaleStorage = localStorage.getItem('lista')

    if(tarefasDoLocaleStorage){
        // JSON.parso transforma em objeto
        minhasTarefas = JSON.parse(tarefasDoLocaleStorage)
    }
    

    mostrarTarefas()
}

// TODA VEZ QUE A PAGINA RECARREGAR VAI CHAMAR A FUNÇAO 
recarregarTarefas()

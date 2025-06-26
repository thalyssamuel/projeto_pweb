const body = document.body;

const container = document.createElement('div');
container.classList.add('container');
body.appendChild(container);

const entradaDiv = document.createElement('div');
entradaDiv.classList.add('entrada');
container.appendChild(entradaDiv);

const inputTexto = document.createElement('input');
inputTexto.type = 'text';
inputTexto.id = 'texto';
inputTexto.placeholder = 'Nome da tarefa';
entradaDiv.appendChild(inputTexto);

const botaoAdicionar = document.createElement('button');
botaoAdicionar.textContent = 'Adicionar';
entradaDiv.appendChild(botaoAdicionar);

const resultDiv = document.createElement('div');
resultDiv.id = 'result';
container.appendChild(resultDiv);

const ulLista = document.createElement('ul');
resultDiv.appendChild(ulLista);

const removerDiv = document.createElement('div');
removerDiv.classList.add('remover');
container.appendChild(removerDiv);

const botaoRemover = document.createElement('button');
botaoRemover.textContent = 'Remover';
removerDiv.appendChild(botaoRemover);

const botaoModoEscuro = document.createElement('button');
botaoModoEscuro.textContent = 'Modo Escuro';
botaoModoEscuro.style.width = '300px';
botaoModoEscuro.style.padding = '0.75rem';
botaoModoEscuro.style.marginTop = '1rem';
botaoModoEscuro.style.borderRadius = '10px';
botaoModoEscuro.style.fontWeight = 'bold';
botaoModoEscuro.style.cursor = 'pointer';
botaoModoEscuro.style.backgroundColor = '#000';
botaoModoEscuro.style.color = '#fff';
botaoModoEscuro.style.transition = 'background-color 0.3s ease';
container.appendChild(botaoModoEscuro);

let listaTarefas = [];

function atualizarLista() {
  ulLista.innerHTML = '';
  listaTarefas.forEach(tarefa => {
    const li = document.createElement('li');
    li.textContent = tarefa;
    ulLista.appendChild(li);
  });
  localStorage.setItem('tarefas', JSON.stringify(listaTarefas));
}

function adicionar() {
  const valor = inputTexto.value.trim();
  if (valor !== '') {
    listaTarefas.push(valor);
    atualizarLista();
    inputTexto.value = '';
    inputTexto.focus();
  }
}

function remover() {
  if (listaTarefas.length > 0) {
    listaTarefas.pop();
    atualizarLista();
  }
}

function aplicarModoEscuro(ativo) {
  if (ativo) {
    document.body.classList.add('dark');
    botaoModoEscuro.textContent = 'Modo Claro';
    botaoModoEscuro.style.backgroundColor = '#eee';
    botaoModoEscuro.style.color = '#000';
  } else {
    document.body.classList.remove('dark');
    botaoModoEscuro.textContent = 'Modo Escuro';
    botaoModoEscuro.style.backgroundColor = '#000';
    botaoModoEscuro.style.color = '#fff';
  }
  localStorage.setItem('modoEscuro', ativo ? 'true' : 'false');
}

botaoModoEscuro.addEventListener('click', () => {
  const escuroAtivo = document.body.classList.contains('dark');
  aplicarModoEscuro(!escuroAtivo);
});

botaoAdicionar.addEventListener('click', adicionar);
botaoRemover.addEventListener('click', remover);

inputTexto.addEventListener('keypress', e => {
  if (e.key === 'Enter') {
    adicionar();
  }
});

const tarefasSalvas = localStorage.getItem('tarefas');
if (tarefasSalvas) {
  listaTarefas = JSON.parse(tarefasSalvas);
  atualizarLista();
}

const modoEscuroSalvo = localStorage.getItem('modoEscuro');
aplicarModoEscuro(modoEscuroSalvo === 'true');

let clientes = [];
let visitas = [];

// Função para cadastrar cliente
function cadastrarCliente() {
    const nomeCliente = document.getElementById('nomeCliente').value;
    if (nomeCliente) {
        clientes.push(nomeCliente);
        atualizarClientes();
        alert('Cliente cadastrado com sucesso!');
        document.getElementById('nomeCliente').value = '';
    } else {
        alert('Por favor, insira o nome do cliente.');
    }
}

// Atualiza as opções de cliente nos selects
function atualizarClientes() {
    const clienteSelect = document.getElementById('cliente');
    const clienteRelatorioSelect = document.getElementById('clienteRelatorio');
    clienteSelect.innerHTML = '<option value="">Selecione um cliente</option>';
    clienteRelatorioSelect.innerHTML = '<option value="">Selecione um cliente</option>';

    clientes.forEach((cliente, index) => {
        const option = `<option value="${index}">${cliente}</option>`;
        clienteSelect.innerHTML += option;
        clienteRelatorioSelect.innerHTML += option;
    });
}

// Função para gerar campos de inserção de dados conforme a quantidade de pontos
function gerarCampos() {
    const pontos = document.getElementById('pontos').value;
    const formPontos = document.getElementById('formPontos');
    formPontos.innerHTML = '';

    if (pontos > 0) {
        for (let i = 1; i <= pontos; i++) {
            formPontos.innerHTML += `<label for="ponto${i}">Ponto ${i}:</label><input type="text" id="ponto${i}" name="ponto${i}" required>`;
        }
    } else {
        alert('Por favor, insira a quantidade de pontos.');
    }
}

// Função para salvar os dados da visita
function salvarDados() {
    const cliente = document.getElementById('cliente').value;
    const dataVisita = document.getElementById('dataVisita').value;
    const pontos = document.getElementById('pontos').value;

    if (cliente && dataVisita && pontos) {
        let dadosVisita = { cliente, dataVisita, pontos: [] };
        for (let i = 1; i <= pontos; i++) {
            dadosVisita.pontos.push(document.getElementById(`ponto${i}`).value);
        }
        visitas.push(dadosVisita);
        alert('Dados da visita salvos com sucesso!');
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}

// Função para gerar relatório
function gerarRelatorio() {
    const cliente = document.getElementById('clienteRelatorio').value;
    const dataInicio = document.getElementById('dataInicio').value;
    const dataFim = document.getElementById('dataFim').value;
    const resultadoRelatorio = document.getElementById('resultadoRelatorio');

    resultadoRelatorio.innerHTML = '';

    let relatorioFiltrado = visitas.filter(v => v.cliente == cliente && (!dataInicio || new Date(v.dataVisita) >= new Date(dataInicio)) && (!dataFim || new Date(v.dataVisita) <= new Date(dataFim)));

    if (relatorioFiltrado.length > 0) {
        relatorioFiltrado.forEach(v => {
            resultadoRelatorio.innerHTML += `<h3>Visita em ${v.dataVisita}</h3>`;
            v.pontos.forEach((ponto, index) => {
                resultadoRelatorio.innerHTML += `<p>Ponto ${index + 1}: ${ponto}</p>`;
            });
        });
    } else {
        resultadoRelatorio.innerHTML = '<p>Nenhum relatório encontrado para o período.</p>';
    }
}

// Função para abrir a aba correspondente
function openTab(tabId) {
    const tabs = document.getElementsByClassName('form-section');
    const tabButtons = document.getElementsByClassName('tab');
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].style.display = 'none';
        tabButtons[i].classList.remove('active');
    }
    document.getElementById(tabId).style.display = 'block';
    document.querySelector(`.tab[onclick="openTab('${tabId}')"]`).classList.add('active');
}
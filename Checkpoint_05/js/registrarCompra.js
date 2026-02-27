import { formatarMoeda } from "./formatarMoeda.js";

document.addEventListener('DOMContentLoaded', () => {

    const form = document.querySelector('#registroVenda');
    const dados = document.querySelector('#dadosVendas');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const nomeCliente = document.querySelector('#nomeCliente').value.trim();
        const email = document.querySelector('#email').value.trim();
        const tipoCliente = document.querySelector('#tipoCliente').value;

        if (tipoCliente == '0') {
            alert('Selecione um tipo de cliente')
            document.querySelector('#tipoCliente').focus();
            return
        }

        const gameSelect = document.querySelector('#nomeGame');
        const valorOriginal = Number(gameSelect.value);
        const nomeGame = gameSelect.options[gameSelect.selectedIndex].text.split('-')[0].trim();



        if (nomeGame == '0') {
            alert('Selecione o Game')
            document.querySelector('#nomeGame').focus();
            return
        }

        const parcelas = document.querySelector('#parcelas').value;

        if (parcelas == '0') {
            alert('Selecione a quantidade de parcelas');
            document.querySelector('#parcelas').focus();
            return;
        }

        let descontoPerc
        if (tipoCliente === 'A') {
            descontoPerc = 0;
        } else if (tipoCliente === 'B') {
            descontoPerc = 10;
        } else {
            descontoPerc = 20;
        }

        const porcentagem = valorOriginal * (descontoPerc / 100);
        const valorComDesconto = valorOriginal - porcentagem;
        const valorDasParcelas = valorComDesconto / parcelas;


        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${nomeCliente}</td>
            <td>${email}</td>
            <td>${tipoCliente}</td>
            <td>${nomeGame}</td>
            <td>${parcelas}</td>
            <td>${formatarMoeda(valorOriginal)}</td>
            <td>${formatarMoeda(porcentagem)}</td>
            <td>${formatarMoeda(valorComDesconto)}</td>
            <td>${parcelas}x de ${formatarMoeda(valorDasParcelas)}</td>
        `;

        dados.prepend(tr);

        const dataAtual = new Date();
        document.querySelector('#dataAtualizacao').textContent = ` 
        Dados Atuaizados em: ${dataAtual.toLocaleDateString()} - ${dataAtual.toLocaleTimeString()}`;

        form.reset();
        form.nomeCliente.focus();

    })
})
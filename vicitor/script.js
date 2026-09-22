// Gabarito com as respostas corretas de cada questão
const gabarito = {
    q1: 'a', // h1
    q2: 'a', // HTML, CSS
    q3: 'd', // PHP
    q4: 'c', // color
    q5: 'a'  // img
};
 
const btnEnviar = document.getElementById('btnEnviar');
const mensagemErro = document.getElementById('mensagemErro');
const inputNome = document.getElementById('nome');
const inputGmail = document.getElementById('gmail');
 
btnEnviar.addEventListener('click', () => {
    const nome = inputNome.value.trim();
    const gmail = inputGmail.value.trim();
 
    // Verifica se nome e gmail foram preenchidos
    let todasPreenchidas = nome !== '' && gmail !== '';
 
    // Verifica se todas as 5 questões foram respondidas
    for (let i = 1; i <= 5; i++) {
        const selecionado = document.querySelector(`input[name="q${i}"]:checked`);
        if (!selecionado) {
            todasPreenchidas = false;
            break;
        }
    }
 
    if (!todasPreenchidas) {
        mensagemErro.textContent = 'Preencha todos os campos';
        return;
    }
 
    mensagemErro.textContent = '';
 
    let acertos = 0;
    let linhasRespostas = '';
 
    // Percorre as 5 questões (q1 a q5)
    for (let i = 1; i <= 5; i++) {
        const nomeGrupo = 'q' + i;
        const selecionado = document.querySelector(`input[name="${nomeGrupo}"]:checked`);
        const resposta = selecionado.value;
        const correta = gabarito[nomeGrupo];
 
        let linha;
        if (resposta === correta) {
            acertos++;
            linha = `${i}-${resposta} certo`;
        } else {
            linha = `${i}-${resposta} errado, a resposta correta é ${correta}`;
        }
 
        linhasRespostas += `${linha}\n`;
    }
 
    const conteudo = `Nome: ${nome}\nGmail: ${gmail}\nQuantidade de acertos: ${acertos}/5\n${linhasRespostas}`;
 
    // Gera e baixa o arquivo .txt
    const blob = new Blob([conteudo], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'resultado.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
});
// Espera o DOM (estrutura da página) estar completamente carregado
document.addEventListener('DOMContentLoaded', function() {
    // Seleciona os elementos do HTML
    const numDiceInput = document.getElementById('numDice');
    const diceTypeSelect = document.getElementById('diceType');
    const rollButton = document.getElementById('rollButton');
    const totalResultSpan = document.getElementById('totalResult');
    const individualRollsSpan = document.getElementById('individualRolls');

    // Adiciona um "ouvinte de evento" ao botão de rolar
    // Quando o botão for clicado, a função anônima será executada
    rollButton.addEventListener('click', function() {
        const numDice = parseInt(numDiceInput.value); // Pega o número de dados e converte para inteiro
        const diceType = parseInt(diceTypeSelect.value); // Pega o tipo de dado e converte para inteiro

        let total = 0;
        let individualResults = [];

        // Loop para rolar cada dado individualmente
        for (let i = 0; i < numDice; i++) {
            // Math.random() gera um número entre 0 (inclusivo) e 1 (exclusivo)
            // Math.floor() arredonda para baixo para o inteiro mais próximo
            // Então, Math.floor(Math.random() * diceType) dá um número de 0 a (diceType - 1)
            // Adicionamos 1 para ter o resultado de 1 a diceType
            const roll = Math.floor(Math.random() * diceType) + 1;
            individualResults.push(roll); // Adiciona o resultado individual ao array
            total += roll; // Soma ao total
        }

        // Atualiza os elementos na página com os resultados
        totalResultSpan.textContent = total;
        individualRollsSpan.textContent = individualResults.join(', '); // Ex: "4, 2, 6"
    });
});
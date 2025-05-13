document.addEventListener('DOMContentLoaded', function() {
    const navButtons = document.querySelectorAll('.nav-button');
    const sections = document.querySelectorAll('main > section'); // Pega todas as seções filhas diretas do main

    // Função para mostrar uma seção e esconder as outras
    function showSection(targetId) {
        sections.forEach(section => {
            if (section.id === targetId) {
                section.classList.remove('hidden-section');
                section.classList.add('active-section');
            } else {
                section.classList.remove('active-section');
                section.classList.add('hidden-section');
            }
        });
    }

    // Adiciona evento de clique para cada botão de navegação
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetSectionId = this.dataset.target; // Pega o valor de 'data-target'
            showSection(targetSectionId);
        });
    });

    // Opcional: Mostrar a primeira seção por padrão (ou a que tiver 'active-section')
    // Se nenhuma seção tiver 'active-section' no HTML, descomente a linha abaixo
    // para mostrar a primeira seção da lista de botões (ou defina uma específica).
    // if (navButtons.length > 0) {
    //     showSection(navButtons[0].dataset.target);
    // }
});
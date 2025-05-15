// js/wiki.js

document.addEventListener('DOMContentLoaded', function() {

    const wikiLinks = document.querySelectorAll('.wiki-sidebar .wiki-link');
    // Referências aos elementos onde o conteúdo será exibido
    const wikiTopicTitleElement = document.getElementById('wiki-topic-title');
    const wikiTopicHtmlContentElement = document.getElementById('wiki-topic-html-content');

    // Variável para armazenar os dados da wiki depois de carregados
    let wikiData = null;

    // --- Função para carregar o arquivo JSON da Wiki ---
    async function loadWikiContent() {
        try {
            // Caminho para o seu arquivo JSON
            const response = await fetch('data/wiki-content.json');
            if (!response.ok) { // Verifica se a resposta HTTP foi bem-sucedida (código 200-299)
                throw new Error(`Erro ao carregar wiki: ${response.statusText} (${response.status})`);
            }
            wikiData = await response.json(); // Transforma a resposta em objeto JSON
            console.log("Wiki content loaded successfully:", wikiData);

            // Tenta exibir o tópico inicial após carregar os dados
            const initialActiveLink = document.querySelector('.wiki-sidebar .wiki-link.active');
            if (initialActiveLink) {
                 const initialTopicKey = initialActiveLink.dataset.contentId;
                 displayWikiTopic(initialTopicKey);
            } else if (wikiLinks.length > 0) {
                 // Se nenhum link estiver ativo por padrão, exibe o primeiro tópico do JSON
                 const firstTopicKey = wikiLinks[0].dataset.contentId; // Usa a chave do primeiro link
                 displayWikiTopic(firstTopicKey);
                 updateSidebarActiveLink(firstTopicKey);
            }


        } catch (error) {
            console.error("Failed to load wiki content:", error);
            // Exibe uma mensagem de erro na área de conteúdo
            if (wikiTopicTitleElement) wikiTopicTitleElement.textContent = "Erro ao Carregar Wiki";
            if (wikiTopicHtmlContentElement) wikiTopicHtmlContentElement.innerHTML = "<p>Não foi possível carregar o conteúdo da wiki. Por favor, tente novamente mais tarde.</p>";
             // Desabilita os links da sidebar
            wikiLinks.forEach(link => link.style.pointerEvents = 'none');
        }
    }


    // --- Função para exibir um tópico específico com base na chave ---
    function displayWikiTopic(topicKey) {
        // Verifica se os dados da wiki foram carregados e se a chave existe
        if (wikiData && wikiData[topicKey]) {
            const topic = wikiData[topicKey];

            // Atualiza o título e o conteúdo HTML
            if (wikiTopicTitleElement) wikiTopicTitleElement.textContent = topic.title || "Tópico Sem Título";
            if (wikiTopicHtmlContentElement) wikiTopicHtmlContentElement.innerHTML = topic.htmlContent || "<p>Conteúdo não disponível.</p>";

             // Rolar para o topo da área de conteúdo da wiki (opcional)
             if (wikiTopicTitleElement) { // Verifica se o título existe para rolar para ele
                wikiTopicTitleElement.scrollIntoView({ behavior: 'smooth' });
             } else { // Fallback
                const wikiContentArea = document.querySelector('.wiki-content');
                 if (wikiContentArea) {
                    wikiContentArea.scrollTop = 0;
                 }
             }

        } else if (wikiData && typeof wikiData[topicKey] === 'undefined') {
             // Caso a chave do link exista na sidebar, mas não nos dados carregados
             if (wikiTopicTitleElement) wikiTopicTitleElement.textContent = "Tópico Não Encontrado";
             if (wikiTopicHtmlContentElement) wikiTopicHtmlContentElement.innerHTML = "<p>O conteúdo para este tópico ainda não foi adicionado.</p>";
             console.warn(`Conteúdo para a chave "${topicKey}" não encontrado nos dados da wiki.`);

        } else {
            // Caso os dados da wiki ainda não tenham sido carregados
            if (wikiTopicTitleElement) wikiTopicTitleElement.textContent = "Carregando...";
            if (wikiTopicHtmlContentElement) wikiTopicHtmlContentElement.innerHTML = "<p>Aguardando o carregamento do conteúdo...</p>";
             console.warn("Tentou exibir tópico antes do carregamento da wiki ou dados ausentes.");
        }
    }

    // --- Função para atualizar o estado ativo dos links da sidebar ---
    function updateSidebarActiveLink(activeTopicKey) {
        wikiLinks.forEach(link => {
            const linkTopicKey = link.dataset.contentId;
            if (linkTopicKey === activeTopicKey) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }


    // Adiciona ouvintes de evento a cada link da sidebar
    wikiLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Impede a navegação padrão

            const targetTopicKey = this.dataset.contentId; // Pega a chave do tópico
            displayWikiTopic(targetTopicKey); // Exibe o tópico
            updateSidebarActiveLink(targetTopicKey); // Atualiza o link ativo
        });
    });

    // --- Lógica de inicialização ---
    // Inicia o carregamento do conteúdo da wiki quando a página é carregada
    loadWikiContent();

});
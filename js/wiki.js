// js/wiki.js

document.addEventListener('DOMContentLoaded', function() {

    const wikiLinks = document.querySelectorAll('.wiki-sidebar .wiki-link');
    const wikiTopicTitleElement = document.getElementById('wiki-topic-title');
    const wikiTopicHtmlContentElement = document.getElementById('wiki-topic-html-content');
    const submenuToggles = document.querySelectorAll('.wiki-sidebar .submenu-toggle'); // Seleciona todos os botões toggle

    let wikiData = null;

    // --- Função para carregar o arquivo JSON da Wiki ---
    async function loadWikiContent() {
        // ... (código igual ao anterior) ...
        try {
            const response = await fetch('data/wiki-content.json');
            if (!response.ok) {
                throw new Error(`Erro ao carregar wiki: ${response.statusText} (${response.status})`);
            }
            wikiData = await response.json();
            console.log("Wiki content loaded successfully:", wikiData);

            // Após carregar, tenta exibir o tópico inicial
            // Primeiro verifica se há um link ativo no HTML por padrão
            const initialActiveLink = document.querySelector('.wiki-sidebar .wiki-link.active');
            if (initialActiveLink) {
                 const initialTopicKey = initialActiveLink.dataset.contentId;
                 displayWikiTopic(initialTopicKey);
                 updateSidebarActiveLink(initialTopicKey); // Garante que o estado ativo está correto
                 // Opcional: Expandir o sub-menu se o link inicial estiver dentro de um
                 const parentSubmenu = initialActiveLink.closest('.submenu');
                 if (parentSubmenu) {
                     const parentSubmenuLi = parentSubmenu.closest('.has-submenu');
                     if (parentSubmenuLi) {
                         parentSubmenuLi.classList.add('expanded');
                         const toggleBtn = parentSubmenuLi.querySelector('.submenu-toggle');
                         if (toggleBtn) toggleBtn.textContent = '-'; // Atualiza texto do toggle
                         parentSubmenu.classList.remove('hidden');
                     }
                 }

            } else if (wikiLinks.length > 0) {
                 // Se nenhum link estiver ativo por padrão, exibe o primeiro tópico do primeiro link
                 const firstLink = wikiLinks[0];
                 const firstTopicKey = firstLink.dataset.contentId;
                 displayWikiTopic(firstTopicKey);
                 updateSidebarActiveLink(firstTopicKey); // Marca o primeiro link como ativo
            }


        } catch (error) {
            console.error("Failed to load wiki content:", error);
             if (wikiTopicTitleElement) wikiTopicTitleElement.textContent = "Erro ao Carregar Wiki";
             if (wikiTopicHtmlContentElement) wikiTopicHtmlContentElement.innerHTML = "<p>Não foi possível carregar o conteúdo da wiki. Por favor, tente novamente mais tarde.</p>";
             wikiLinks.forEach(link => link.style.pointerEvents = 'none'); // Desabilita links
             submenuToggles.forEach(toggle => toggle.style.pointerEvents = 'none'); // Desabilita toggles
        }
    }


    // --- Função para exibir um tópico específico com base na chave ---
    function displayWikiTopic(topicKey) {
        // ... (código igual ao anterior) ...
         if (wikiData && wikiData[topicKey]) {
            const topic = wikiData[topicKey];
            if (wikiTopicTitleElement) wikiTopicTitleElement.textContent = topic.title || "Tópico Sem Título";
            if (wikiTopicHtmlContentElement) wikiTopicHtmlContentElement.innerHTML = topic.htmlContent || "<p>Conteúdo não disponível.</p>";

             // Rolar para o topo da área de conteúdo da wiki
             const wikiContentArea = document.querySelector('.wiki-content');
             if (wikiContentArea) {
                wikiContentArea.scrollTop = 0; // Rola o conteúdo da div .wiki-content
             } else { // Fallback para rolar a janela inteira
                 const wikiSection = document.getElementById('wiki-section');
                  if (wikiSection) {
                    window.scrollTo({
                        top: wikiSection.offsetTop - (document.querySelector('header')?.offsetHeight || 0), // Rola para o topo da seção
                        behavior: 'smooth'
                    });
                  }
             }

        } else if (wikiData && typeof wikiData[topicKey] === 'undefined') {
             if (wikiTopicTitleElement) wikiTopicTitleElement.textContent = "Tópico Não Encontrado";
             if (wikiTopicHtmlContentElement) wikiTopicHtmlContentElement.innerHTML = "<p>O conteúdo para este tópico ainda não foi adicionado.</p>";
             console.warn(`Conteúdo para a chave "${topicKey}" não encontrado nos dados da wiki.`);
        } else {
             if (wikiTopicTitleElement) wikiTopicTitleElement.textContent = "Carregando...";
             if (wikiTopicHtmlContentElement) wikiTopicHtmlContentElement.innerHTML = "<p>Aguardando o carregamento do conteúdo...</p>";
             console.warn("Tentou exibir tópico antes do carregamento da wiki ou dados ausentes.");
        }
    }

    // --- Função para atualizar o estado ativo dos links da sidebar ---
    function updateSidebarActiveLink(activeTopicKey) {
        wikiLinks.forEach(link => {
            link.classList.remove('active'); // Remove a classe 'active' de todos os links
        });

        // Encontra o link correspondente ao tópico ativo e adiciona a classe 'active'
        const activeLink = document.querySelector(`.wiki-sidebar .wiki-link[data-content-id="${activeTopicKey}"]`);
        if (activeLink) {
            activeLink.classList.add('active');

            // Opcional: Garante que o sub-menu pai do link ativo esteja expandido
            const parentSubmenu = activeLink.closest('.submenu');
            if (parentSubmenu) {
                 // Encontra o <li> pai que contém o sub-menu
                 const parentSubmenuLi = parentSubmenu.closest('.has-submenu');
                 if (parentSubmenuLi && !parentSubmenuLi.classList.contains('expanded')) {
                     // Expande se ainda não estiver expandido
                     parentSubmenuLi.classList.add('expanded');
                     parentSubmenu.classList.remove('hidden');
                      const toggleBtn = parentSubmenuLi.querySelector('.submenu-toggle');
                     if (toggleBtn) toggleBtn.textContent = '-'; // Atualiza texto do toggle
                 }
            }
        }
    }


    // Adiciona ouvintes de evento a cada link da sidebar (principal ou sub-link)
    wikiLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();

            const targetTopicKey = this.dataset.contentId;
            displayWikiTopic(targetTopicKey);
            updateSidebarActiveLink(targetTopicKey);
        });
    });

    // --- Adiciona ouvintes de evento aos botões de expandir/recolher ---
    submenuToggles.forEach(button => {
        button.addEventListener('click', function() {
            // Encontra o <li> pai com a classe has-submenu
            const parentLi = this.closest('li.has-submenu');
            if (parentLi) {
                // Encontra a sub-lista (<ul>) dentro deste <li>
                const submenuUl = parentLi.querySelector('.submenu');
                if (submenuUl) {
                    // Alterna a classe 'hidden' na sub-lista
                    submenuUl.classList.toggle('hidden');
                    // Alterna a classe 'expanded' no <li> pai (para estilização)
                    parentLi.classList.toggle('expanded');

                    // Atualiza o texto do botão toggle (+/-)
                    if (submenuUl.classList.contains('hidden')) {
                        this.textContent = '+';
                    } else {
                        this.textContent = '-';
                    }
                }
            }
        });
    });


    // --- Lógica de inicialização ---
    // Inicia o carregamento do conteúdo da wiki quando a página é carregada
    loadWikiContent();

});
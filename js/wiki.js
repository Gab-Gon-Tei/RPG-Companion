// js/wiki.js
document.addEventListener('DOMContentLoaded', function() {

    // Seleciona todos os links da barra lateral da wiki (links individuais, não os headers de submenu)
    const wikiLinks = document.querySelectorAll('.wiki-sidebar .wiki-link');
    // Seleciona os elementos onde o título e conteúdo do tópico serão exibidos
    const wikiTopicTitleElement = document.getElementById('wiki-topic-title');
    const wikiTopicHtmlContentElement = document.getElementById('wiki-topic-html-content');
    // Seleciona todos os botões de expandir/recolher sub-menus
    const submenuToggles = document.querySelectorAll('.wiki-sidebar .submenu-toggle');
    // Seleciona todas as sub-listas (os ULs que são sub-menus)
    const submenus = document.querySelectorAll('.wiki-sidebar ul.submenu');


    // Variável para armazenar os dados da wiki depois de carregados
    let wikiData = null;

    // --- Função para carregar o arquivo JSON da Wiki ---
    async function loadWikiContent() {
        console.log("loadWikiContent: Iniciando carregamento do JSON."); // DEBUG
        try {
            // Caminho para o seu arquivo JSON
            const response = await fetch('data/wiki-content.json');
            if (!response.ok) { // Verifica se a resposta HTTP foi bem-sucedida (código 200-299)
                throw new Error(`Erro HTTP: ${response.status} ${response.statusText}`);
            }
            wikiData = await response.json(); // Transforma a resposta em objeto JSON
            console.log("loadWikiContent: Wiki content loaded successfully:", wikiData); // DEBUG

            // Tenta exibir o tópico inicial após carregar os dados
            // Primeiro verifica se há um link ativo no HTML por padrão
            const initialActiveLink = document.querySelector('.wiki-sidebar .wiki-link.active');
            if (initialActiveLink) {
                 const initialTopicKey = initialActiveLink.dataset.contentId;
                 console.log("loadWikiContent: Link ativo inicial encontrado, exibindo tópico:", initialTopicKey); // DEBUG
                 displayWikiTopic(initialTopicKey);
                 updateSidebarActiveLink(initialTopicKey); // Garante que o estado ativo visual está correto

                 // Opcional: Expande o sub-menu se o link inicial estiver dentro de um
                 const parentSubmenu = initialActiveLink.closest('.submenu');
                 if (parentSubmenu) {
                     const parentSubmenuLi = parentSubmenu.closest('.has-submenu');
                     if (parentSubmenuLi && parentSubmenuLi.classList.contains('has-submenu')) { // Garante que encontrou o LI correto
                          console.log("loadWikiContent: Link ativo inicial dentro de um submenu, expandindo pai."); // DEBUG
                         parentSubmenuLi.classList.add('expanded'); // Marca o LI pai como expandido
                         // Encontra o botão toggle dentro do LI pai
                         const toggleBtn = parentSubmenuLi.querySelector('.submenu-toggle');
                         if (toggleBtn) toggleBtn.textContent = '-'; // Atualiza texto do toggle
                         // Remove a classe 'hidden' do UL submenu (se estava lá)
                         parentSubmenu.classList.remove('hidden');
                     }
                 }

            } else if (wikiLinks.length > 0) {
                 // Se nenhum link estiver ativo por padrão, exibe o primeiro tópico do primeiro link da lista wikiLinks
                 const firstLink = wikiLinks[0];
                 const firstTopicKey = firstLink.dataset.contentId;
                 console.log("loadWikiContent: Nenhum link ativo inicial, exibindo o primeiro:", firstTopicKey); // DEBUG
                 displayWikiTopic(firstTopicKey);
                 updateSidebarActiveLink(firstTopicKey); // Marca o primeiro link como ativo
            } else {
                console.warn("loadWikiContent: Nenhum link .wiki-link encontrado na sidebar."); // DEBUG
            }


        } catch (error) {
            console.error("loadWikiContent: Falha ao carregar o conteúdo da wiki:", error); // DEBUG
            // Exibe uma mensagem de erro na área de conteúdo
            if (wikiTopicTitleElement) wikiTopicTitleElement.textContent = "Erro ao Carregar Wiki";
            if (wikiTopicHtmlContentElement) wikiTopicHtmlContentElement.innerHTML = "<p>Não foi possível carregar o conteúdo da wiki. Por favor, verifique o arquivo JSON e a conexão.</p>";
             // Desabilita os links e toggles para evitar mais erros
            wikiLinks.forEach(link => link.style.pointerEvents = 'none');
            submenuToggles.forEach(toggle => toggle.style.pointerEvents = 'none');
        }
    }


    // --- Função para exibir um tópico específico com base na chave ---
    function displayWikiTopic(topicKey) {
        console.log("displayWikiTopic: Tentando exibir tópico com chave:", topicKey); // DEBUG
        // Verifica se os dados da wiki foram carregados e se a chave existe
        if (wikiData && wikiData[topicKey]) {
            const topic = wikiData[topicKey];
            console.log("displayWikiTopic: Dados do tópico encontrados:", topic); // DEBUG

            // Atualiza o título e o conteúdo HTML
            if (wikiTopicTitleElement) wikiTopicTitleElement.textContent = topic.title || "Tópico Sem Título";
            // Usamos innerHTML porque o conteúdo JSON pode conter tags HTML (parágrafos, listas, etc.)
            if (wikiTopicHtmlContentElement) wikiTopicHtmlContentElement.innerHTML = topic.htmlContent || "<p>Conteúdo não disponível.</p>";

             // Rolar para o topo da área de conteúdo da wiki
             const wikiContentArea = document.querySelector('.wiki-content');
             if (wikiContentArea) {
                 // Tenta rolar a div .wiki-content se for possível (se ela tiver overflow)
                 wikiContentArea.scrollTop = 0;
                 console.log("displayWikiTopic: Rolando div .wiki-content para o topo."); // DEBUG
             } else if (wikiTopicTitleElement) { // Fallback: Rolar para o título do tópico
                 console.log("displayWikiTopic: Rolando para o título do tópico."); // DEBUG
                 wikiTopicTitleElement.scrollIntoView({ behavior: 'smooth', block: 'start' }); // Rola para o topo do elemento
             } else {
                 console.warn("displayWikiTopic: Não foi possível rolar para o topo da área de conteúdo."); // DEBUG
             }


        } else if (wikiData && typeof wikiData[topicKey] === 'undefined') {
             // Caso a chave do link exista na sidebar, mas não nos dados carregados
             console.warn(`displayWikiTopic: Conteúdo para a chave "${topicKey}" não encontrado nos dados carregados.`); // DEBUG
             if (wikiTopicTitleElement) wikiTopicTitleElement.textContent = "Tópico Não Encontrado";
             if (wikiTopicHtmlContentElement) wikiTopicHtmlContentElement.innerHTML = "<p>O conteúdo para este tópico ainda não foi adicionado ao arquivo JSON, ou a chave no link está incorreta.</p>";

        } else {
            // Caso os dados da wiki ainda não tenham sido carregados
             console.warn("displayWikiTopic: Tentou exibir tópico antes do carregamento da wiki ou wikiData é nulo."); // DEBUG
             if (wikiTopicTitleElement) wikiTopicTitleElement.textContent = "Carregando...";
             if (wikiTopicHtmlContentElement) wikiTopicHtmlContentElement.innerHTML = "<p>Aguardando o carregamento do conteúdo...</p>";
        }
    }

    // --- Função para atualizar o estado ativo dos links da sidebar ---
    function updateSidebarActiveLink(activeTopicKey) {
        console.log("updateSidebarActiveLink: Marcando link com data-content-id:", activeTopicKey, "como ativo."); // DEBUG
        wikiLinks.forEach(link => {
            link.classList.remove('active'); // Remove a classe 'active' de todos os links
        });

        // Encontra o link correspondente ao tópico ativo e adiciona a classe 'active'
        // Usamos querySelector para encontrar o link específico pelo seu data-content-id
        const activeLink = document.querySelector(`.wiki-sidebar .wiki-link[data-content-id="${activeTopicKey}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
            console.log("updateSidebarActiveLink: Link encontrado e marcado como ativo:", activeLink); // DEBUG

            // Opcional: Garante que o sub-menu pai do link ativo esteja expandido
            const parentSubmenu = activeLink.closest('.submenu'); // Encontra o UL.submenu pai
            if (parentSubmenu) {
                 console.log("updateSidebarActiveLink: Link ativo dentro de um submenu."); // DEBUG
                 // Encontra o <li> pai que contém o sub-menu
                 const parentSubmenuLi = parentSubmenu.closest('li.has-submenu');
                 if (parentSubmenuLi && parentSubmenuLi.classList.contains('has-submenu')) {
                     console.log("updateSidebarActiveLink: Expandindo LI pai do submenu."); // DEBUG
                     parentSubmenuLi.classList.add('expanded'); // Marca o LI pai como expandido
                      // Encontra o botão toggle dentro do LI pai
                     const toggleBtn = parentSubmenuLi.querySelector('.submenu-toggle');
                     if (toggleBtn) toggleBtn.textContent = '-'; // Atualiza texto do toggle
                     // Remove a classe 'hidden' do UL submenu (se estava lá)
                     parentSubmenu.classList.remove('hidden');
                 } else {
                      console.warn("updateSidebarActiveLink: LI.has-submenu pai não encontrado para o link ativo dentro do submenu."); // DEBUG
                 }
            } else {
                 console.log("updateSidebarActiveLink: Link ativo não está dentro de um submenu."); // DEBUG
            }
        } else {
            console.warn(`updateSidebarActiveLink: Link com data-content-id="${activeTopicKey}" não encontrado na sidebar.`); // DEBUG
        }
    }


    // --- Adiciona ouvintes de evento a cada link da sidebar (principal ou sub-link) ---
    wikiLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Impede a navegação padrão da tag <a>

            const targetTopicKey = this.dataset.contentId; // Pega a chave do tópico do atributo data-content-id
            console.log("Link da wiki clicado. Chave:", targetTopicKey); // DEBUG
            displayWikiTopic(targetTopicKey); // Exibe o tópico
            updateSidebarActiveLink(targetTopicKey); // Atualiza o link ativo
        });
    });

    // --- Adiciona ouvintes de evento aos botões de expandir/recolher ---
    submenuToggles.forEach(button => {
        button.addEventListener('click', function() {
            // Encontra o <li> pai mais próximo com a classe has-submenu
            const parentLi = this.closest('li.has-submenu');
             console.log("Botão toggle clicado! Botão:", this, "LI pai encontrado:", parentLi); // DEBUG
            if (parentLi && parentLi.classList.contains('has-submenu')) { // Verifica se encontrou e é o LI correto
                // Encontra a sub-lista (<ul>) dentro deste <li> que tem a classe 'submenu'
                const submenuUl = parentLi.querySelector('ul.submenu'); // Adiciona 'ul' para ser mais específico
                console.log("Submenu UL encontrado:", submenuUl); // DEBUG
                if (submenuUl) {
                    // Alterna a classe 'hidden' na sub-lista (controla display: none via CSS)
                    submenuUl.classList.toggle('hidden');
                    // Alterna a classe 'expanded' no <li> pai (pode ser usado para estilização, e JS usa para inicialização)
                    parentLi.classList.toggle('expanded'); // <--- Esta linha estava faltando

                    // Atualiza o texto do botão toggle (+/-)
                    if (submenuUl.classList.contains('hidden')) {
                        this.textContent = '+';
                        console.log("Submenu escondido. Toggle text: +"); // DEBUG
                    } else {
                        this.textContent = '-';
                         console.log("Submenu mostrado. Toggle text: -"); // DEBUG
                    }
                } else {
                     console.warn("Submenu UL com classe '.submenu' não encontrado dentro do LI pai:", parentLi); // DEBUG
                }
            } else {
                console.warn("LI com classe '.has-submenu' pai não encontrado ou incorreto para o botão toggle:", this); // DEBUG
            }
        });
    });

     // --- Garante que todos os submenus comecem escondidos ---
     // Embora a classe 'hidden' já esteja no HTML, isso garante
     // que o estado visual inicial no navegador seja correto.
     submenus.forEach(submenu => {
         if (!submenu.classList.contains('hidden')) {
             submenu.classList.add('hidden');
         }
     });
     // Garante que os toggles comecem com '+'
     submenuToggles.forEach(toggle => {
         const parentLi = toggle.closest('li.has-submenu');
         const submenuUl = parentLi ? parentLi.querySelector('ul.submenu') : null;
          if (submenuUl && submenuUl.classList.contains('hidden')) {
             toggle.textContent = '+';
         }
     });


    // --- Lógica de inicialização ---
    // Inicia o carregamento do conteúdo da wiki quando a página é carregada
    loadWikiContent();

}); // Fim do DOMContentLoaded
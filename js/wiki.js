// js/wiki.js
console.log("DEBUG: --- Iniciando script wiki.js ---"); // LOG GERAL 1

document.addEventListener('DOMContentLoaded', function() {
    console.log("DEBUG: DOMContentLoaded disparado em wiki.js"); // LOG GERAL 2

    // --- SELEÇÃO DE ELEMENTOS ---
    const wikiLinks = document.querySelectorAll('.wiki-sidebar .wiki-link');
    console.log("DEBUG: wikiLinks encontrados:", wikiLinks); // DEBUG 1

    const wikiTopicTitleElement = document.getElementById('wiki-topic-title');
    console.log("DEBUG: wikiTopicTitleElement encontrado:", wikiTopicTitleElement); // DEBUG 2

    const wikiTopicHtmlContentElement = document.getElementById('wiki-topic-html-content');
    console.log("DEBUG: wikiTopicHtmlContentElement encontrado:", wikiTopicHtmlContentElement); // DEBUG 3

    const submenuToggles = document.querySelectorAll('.wiki-sidebar .submenu-toggle');
    console.log("DEBUG: submenuToggles encontrados:", submenuToggles); // DEBUG 4

    const submenus = document.querySelectorAll('.wiki-sidebar ul.submenu');
    console.log("DEBUG: submenus encontrados:", submenus); // DEBUG 5

    // --- VARIÁVEIS GLOBAIS ---
    let wikiData = null;

    // --- FUNÇÕES (loadWikiContent, displayWikiTopic, updateSidebarActiveLink, rollCompanionDie - APENAS SE EXISTIR NO HTML/PLANO FUTURO, REMOVI DO WIKI.JS, ELE DEVE ESTAR EM CHARACTER.JS OU UM NOVO SCRIPT SEPARADO) ---
    // NOTE: Removi a função rollCompanionDie e spendHitDice e outras de companion daqui.
    // Elas NÃO deveriam estar no wiki.js. Se você as copiou acidentalmente para cá, remova-as.
    // O wiki.js deve conter apenas lógica para a wiki.

    // --- Função para carregar o arquivo JSON da Wiki ---
    async function loadWikiContent() {
        console.log("DEBUG: loadWikiContent: Iniciando carregamento do JSON.");
        try {
            const response = await fetch('data/wiki-content.json');
            if (!response.ok) {
                 console.error(`DEBUG: loadWikiContent: Erro HTTP: ${response.status} ${response.statusText}`); // DEBUG ERRO
                throw new Error(`Erro HTTP: ${response.status} ${response.statusText}`);
            }
            wikiData = await response.json();
            console.log("DEBUG: loadWikiContent: Wiki content loaded successfully:", wikiData); // DEBUG

            // Tenta exibir o tópico inicial após carregar os dados
            const initialActiveLink = document.querySelector('.wiki-sidebar .wiki-link.active');
            if (initialActiveLink) {
                 const initialTopicKey = initialActiveLink.dataset.contentId;
                 console.log("DEBUG: loadWikiContent: Link ativo inicial encontrado, exibindo tópico:", initialTopicKey);
                 displayWikiTopic(initialTopicKey);
                 updateSidebarActiveLink(initialTopicKey); // Garante que o estado ativo visual está correto

                 // Expande o sub-menu se o link inicial estiver dentro de um
                 const parentSubmenu = initialActiveLink.closest('.submenu');
                 if (parentSubmenu) {
                     const parentSubmenuLi = parentSubmenu.closest('li.has-submenu');
                     if (parentSubmenuLi) { // Simplificado a verificação aqui
                          console.log("DEBUG: loadWikiContent: Link ativo inicial dentro de um submenu, expandindo pai.");
                         parentSubmenuLi.classList.add('expanded');
                         const toggleBtn = parentSubmenuLi.querySelector('.submenu-toggle');
                         if (toggleBtn) toggleBtn.textContent = '-';
                         parentSubmenu.classList.remove('hidden');
                     }
                 }

            } else if (wikiLinks.length > 0) {
                 const firstLink = wikiLinks[0];
                 const firstTopicKey = firstLink.dataset.contentId;
                 console.log("DEBUG: loadWikiContent: Nenhum link ativo inicial, exibindo o primeiro:", firstTopicKey);
                 displayWikiTopic(firstTopicKey);
                 updateSidebarActiveLink(firstTopicKey);
            } else {
                console.warn("DEBUG: loadWikiContent: Nenhum link .wiki-link encontrado na sidebar.");
            }


        } catch (error) {
            console.error("DEBUG: loadWikiContent: FALHA CRÍTICA ao carregar ou processar wiki content:", error); // DEBUG ERRO CRÍTICO
             if (wikiTopicTitleElement) wikiTopicTitleElement.textContent = "Erro ao Carregar Wiki";
             if (wikiTopicHtmlContentElement) wikiTopicHtmlContentElement.innerHTML = "<p>Não foi possível carregar o conteúdo da wiki. Por favor, verifique o arquivo JSON e a conexão.</p>";
             // Desabilita os links e toggles para evitar mais erros
            wikiLinks.forEach(link => link.style.pointerEvents = 'none');
            submenuToggles.forEach(toggle => toggle.style.pointerEvents = 'none');
        }
    }


    // --- Função para exibir um tópico específico com base na chave ---
    function displayWikiTopic(topicKey) {
        console.log("DEBUG: displayWikiTopic: Tentando exibir tópico com chave:", topicKey);
        // Verifica se os dados da wiki foram carregados e se a chave existe
        if (wikiData && wikiData[topicKey]) {
            const topic = wikiData[topicKey];
            console.log("DEBUG: displayWikiTopic: Dados do tópico encontrados:", topic);

            if (wikiTopicTitleElement) wikiTopicTitleElement.textContent = topic.title || "Tópico Sem Título";
            if (wikiTopicHtmlContentElement) wikiTopicHtmlContentElement.innerHTML = topic.htmlContent || "<p>Conteúdo não disponível.</p>";

             const wikiContentArea = document.querySelector('.wiki-content');
             if (wikiContentArea) {
                 wikiContentArea.scrollTop = 0; // Rola a div .wiki-content
                 console.log("DEBUG: displayWikiTopic: Rolando div .wiki-content para o topo.");
             } else if (wikiTopicTitleElement) {
                 console.log("DEBUG: displayWikiTopic: Rolando para o título do tópico.");
                 wikiTopicTitleElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
             } else {
                 console.warn("DEBUG: displayWikiTopic: Não foi possível rolar para o topo da área de conteúdo.");
             }


        } else if (wikiData && typeof wikiData[topicKey] === 'undefined') {
             console.warn(`DEBUG: displayWikiTopic: Conteúdo para a chave "${topicKey}" não encontrado nos dados carregados.`);
             if (wikiTopicTitleElement) wikiTopicTitleElement.textContent = "Tópico Não Encontrado";
             if (wikiTopicHtmlContentElement) wikiTopicHtmlContentElement.innerHTML = "<p>O conteúdo para este tópico ainda não foi adicionado ao arquivo JSON, ou a chave no link está incorreta.</p>";

        } else {
             console.warn("DEBUG: displayWikiTopic: Tentou exibir tópico antes do carregamento da wiki ou wikiData é nulo.");
             if (wikiTopicTitleElement) wikiTopicTitleElement.textContent = "Carregando...";
             if (wikiTopicHtmlContentElement) wikiTopicHtmlContentElement.innerHTML = "<p>Aguardando o carregamento do conteúdo...</p>";
        }
    }

    // --- Função para atualizar o estado ativo dos links da sidebar ---
    function updateSidebarActiveLink(activeTopicKey) {
        console.log("DEBUG: updateSidebarActiveLink: Marcando link com data-content-id:", activeTopicKey, "como ativo.");
        wikiLinks.forEach(link => {
            link.classList.remove('active'); // Remove a classe 'active' de todos os links
        });

        const activeLink = document.querySelector(`.wiki-sidebar .wiki-link[data-content-id="${activeTopicKey}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
            console.log("DEBUG: updateSidebarActiveLink: Link encontrado e marcado como ativo:", activeLink);

            // Garante que o sub-menu pai do link ativo esteja expandido
            const parentSubmenu = activeLink.closest('.submenu'); // Encontra o UL.submenu pai
            if (parentSubmenu) {
                 console.log("DEBUG: updateSidebarActiveLink: Link ativo dentro de um submenu.");
                 const parentSubmenuLi = parentSubmenu.closest('li.has-submenu');
                 if (parentSubmenuLi) {
                     console.log("DEBUG: updateSidebarActiveLink: Expandindo LI pai do submenu.");
                     parentSubmenuLi.classList.add('expanded');
                     const toggleBtn = parentSubmenuLi.querySelector('.submenu-toggle');
                     if (toggleBtn) toggleBtn.textContent = '-';
                     parentSubmenu.classList.remove('hidden'); // Garante que o submenu está visível
                 }
            } else {
                 console.log("DEBUG: updateSidebarActiveLink: Link ativo não está dentro de um submenu.");
            }
        } else {
            console.warn(`DEBUG: updateSidebarActiveLink: Link com data-content-id="${activeTopicKey}" não encontrado na sidebar.`);
        }
    }


    // --- ADICIONA EVENT LISTENERS ---
    console.log("DEBUG: Anexando Event Listeners..."); // DEBUG 6

    // Ouvintes para links da sidebar (clicar em um link mostra o conteúdo)
    wikiLinks.forEach(link => {
        console.log("DEBUG: Anexando listener a link:", link); // DEBUG 7
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Impede a navegação padrão

            const targetTopicKey = this.dataset.contentId;
            console.log("DEBUG: Link da wiki clicado. Chave:", targetTopicKey);
            displayWikiTopic(targetTopicKey); // Exibe o tópico
            updateSidebarActiveLink(targetTopicKey); // Atualiza o link ativo
        });
    });
    console.log("DEBUG: Listeners de link anexados."); // DEBUG 8


    // Ouvintes para botões toggle (clicar expande/recolhe submenu)
    console.log("DEBUG: Preparando para anexar listeners a toggles:", submenuToggles); // DEBUG 9
    submenuToggles.forEach(button => {
        console.log("DEBUG: Anexando listener a toggle:", button); // DEBUG 10
        button.addEventListener('click', function() {
            console.log("DEBUG: Botão toggle clicado!", this);
            const parentLi = this.closest('li.has-submenu');
            console.log("DEBUG: Toggle - LI pai encontrado:", parentLi);
            if (parentLi) {
                const submenuUl = parentLi.querySelector('ul.submenu'); // Adiciona 'ul' para ser mais específico
                console.log("DEBUG: Toggle - Submenu UL encontrado:", submenuUl);
                if (submenuUl) {
                    submenuUl.classList.toggle('hidden');
                    parentLi.classList.toggle('expanded');

                    if (submenuUl.classList.contains('hidden')) {
                        this.textContent = '+';
                        console.log("DEBUG: Toggle - Submenu escondido. Toggle text: +");
                    } else {
                        this.textContent = '-';
                         console.log("DEBUG: Toggle - Submenu mostrado. Toggle text: -");
                    }
                } else {
                    console.warn("DEBUG: Toggle - Submenu UL com classe '.submenu' não encontrado dentro do LI pai:", parentLi);
                }
            } else {
                console.warn("DEBUG: Toggle - LI com classe '.has-submenu' pai não encontrado para o botão toggle:", this);
            }
        });
    });
    console.log("DEBUG: Listeners de toggle anexados."); // DEBUG 11


    // --- GARANTE ESTADO INICIAL CORRETO ---
    console.log("DEBUG: Garantindo estado inicial dos submenus..."); // DEBUG 12
    submenus.forEach(submenu => {
        // Garante que o submenu está escondido via classe (se não estiver expandido)
        const parentLi = submenu.closest('li.has-submenu');
        if (parentLi && !parentLi.classList.contains('expanded') && !submenu.classList.contains('hidden')) {
             submenu.classList.add('hidden');
        }
         // Se o HTML marcou como hidden mas o JS expandiu na inicialização (initialActiveLink), remove o hidden
         if (parentLi && parentLi.classList.contains('expanded') && submenu.classList.contains('hidden')) {
             submenu.classList.remove('hidden');
         }

    });
    // Garante que os toggles mostrem + ou - corretamente
     submenuToggles.forEach(toggle => {
         const parentLi = toggle.closest('li.has-submenu');
         const submenuUl = parentLi ? parentLi.querySelector('ul.submenu') : null;
          if (submenuUl && submenuUl.classList.contains('hidden')) {
             toggle.textContent = '+';
         } else if (submenuUl) { // Se o submenu existe e NÃO está hidden (ou seja, está visível/expandido)
             toggle.textContent = '-';
         }
     });
     console.log("DEBUG: Estado inicial dos submenus garantido."); // DEBUG 13


    // --- LÓGICA DE INICIALIZAÇÃO ---
    console.log("DEBUG: Chamando loadWikiContent..."); // DEBUG 14
    loadWikiContent();

    console.log("DEBUG: --- Script wiki.js finalizado (síncrono) ---"); // LOG GERAL 3

}); // Fim do DOMContentLoaded
console.log("DEBUG: --- Fim da declaração do listener DOMContentLoaded em wiki.js ---"); // LOG GERAL 4
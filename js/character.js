// js/character.js
document.addEventListener('DOMContentLoaded', function() {

    // --- LISTA DE IMAGENS PREDEFINIDAS ---
    // Adicione os caminhos para suas próprias imagens aqui!
    // Certifique-se de que estas imagens existam na sua pasta 'images/'
    const predefinedImages = [
        { value: '', text: 'Nenhuma Imagem', default: true }, // Opção padrão
        { value: 'images/placeholder.png', text: 'Placeholder (Exemplo)'}, // Exemplo de placeholder
        { value: 'images/sword.png', text: 'Espada Longa' },
        { value: 'images/axe.png', text: 'Machado de Batalha' },
        { value: 'images/light-armor.png', text: 'Armadura Leve' },
        { value: 'images/medium-armor.png', text: 'Armadura Média' },
        { value: 'images/heavy-armor.png', text: 'Armadura Pesada' },
        { value: 'images/shield.png', text: 'Escudo' },
        { value: 'images/staff.png', text: 'Cajado' },
        // Adicione mais objetos { value: 'caminho/da/imagem.png', text: 'Nome para o Select' }
    ];


    // --- REFERÊNCIAS DOS ELEMENTOS HTML ---
    // Ficha Principal e Inventário estão combinados aqui
    const characterFormFields = {
        // Cabeçalho
        charName: document.getElementById('charName'),
        charClassLevel: document.getElementById('charClassLevel'),
        charBackground: document.getElementById('charBackground'),
        playerName: document.getElementById('playerName'),
        charRace: document.getElementById('charRace'),
        charAlignment: document.getElementById('charAlignment'),
        charExperience: document.getElementById('charExperience'),

        // Atributos
        strengthScore: document.getElementById('strengthScore'),
        dexterityScore: document.getElementById('dexterityScore'),
        constitutionScore: document.getElementById('constitutionScore'),
        intelligenceScore: document.getElementById('intelligenceScore'),
        wisdomScore: document.getElementById('wisdomScore'),
        charismaScore: document.getElementById('charismaScore'),

        // Inspiração e Prof Bônus
        inspiration: document.getElementById('inspiration'),
        proficiencyBonus: document.getElementById('proficiencyBonus'),

        // Salvaguardas (checkboxes)
        strSaveProf: document.getElementById('strSaveProf'),
        dexSaveProf: document.getElementById('dexSaveProf'),
        conSaveProf: document.getElementById('conSaveProf'),
        intSaveProf: document.getElementById('intSaveProf'),
        wisSaveProf: document.getElementById('wisSaveProf'),
        chaSaveProf: document.getElementById('chaSaveProf'),

        // Perícias (checkboxes)
        acrobaticsProf: document.getElementById('acrobaticsProf'), // (Des)
        animalHandlingProf: document.getElementById('animalHandlingProf'), // (Sab)
        arcanaProf: document.getElementById('arcanaProf'), // (Int)
        athleticsProf: document.getElementById('athleticsProf'), // (For)
        deceptionProf: document.getElementById('deceptionProf'), // (Car)
        historyProf: document.getElementById('historyProf'), // (Int)
        insightProf: document.getElementById('insightProf'), // (Sab)
        intimidationProf: document.getElementById('intimidationProf'), // (Car)
        investigationProf: document.getElementById('investigationProf'), // (Int)
        medicineProf: document.getElementById('medicineProf'), // (Sab)
        natureProf: document.getElementById('natureProf'), // (Int)
        perceptionProf: document.getElementById('perceptionProf'), // (Sab)
        performanceProf: document.getElementById('performanceProf'), // (Car)
        persuasionProf: document.getElementById('persuasionProf'), // (Car)
        religionProf: document.getElementById('religionProf'), // (Int)
        sleightOfHandProf: document.getElementById('sleightOfHandProf'), // (Des)
        stealthProf: document.getElementById('stealthProf'), // (Des)
        survivalProf: document.getElementById('survivalProf'), // (Sab)

        // Outros na Ficha
        passiveWisdom: document.getElementById('passiveWisdom'), // Calculado
        armorClass: document.getElementById('armorClass'),
        initiative: document.getElementById('initiative'), // Calculado
        speed: document.getElementById('speed'),

        hpMax: document.getElementById('hpMax'),
        hpCurrent: document.getElementById('hpCurrent'),
        hpTemp: document.getElementById('hpTemp'),

        hitDiceTotal: document.getElementById('hitDiceTotal'),
        hitDiceCurrent: document.getElementById('hitDiceCurrent'),
        deathSaveSuccess1: document.querySelector('input[name="deathSaveSuccess1"]'), // Selecionado por name
        deathSaveSuccess2: document.querySelector('input[name="deathSaveSuccess2"]'),
        deathSaveSuccess3: document.querySelector('input[name="deathSaveSuccess3"]'),
        deathSaveFail1: document.querySelector('input[name="deathSaveFail1"]'),
        deathSaveFail2: document.querySelector('input[name="deathSaveFail2"]'),
        deathSaveFail3: document.querySelector('input[name="deathSaveFail3"]'),

        attacksSpells: document.getElementById('attacksSpells'),
        personalityTraits: document.getElementById('personalityTraits'),
        ideals: document.getElementById('ideals'),
        bonds: document.getElementById('bonds'),
        flaws: document.getElementById('flaws'),
        featuresTraits: document.getElementById('featuresTraits'),
        otherProficiencies: document.getElementById('otherProficiencies'),

        // Moeda
        cp: document.getElementById('cp'),
        sp: document.getElementById('sp'),
        ep: document.getElementById('ep'),
        gp: document.getElementById('gp'),
        pp: document.getElementById('pp'),
        equipmentList: document.getElementById('equipmentList'), // Lista simples no fim da ficha

        // --- CAMPOS DO INVENTÁRIO EQUIPADO (Adicionados!) ---
        // Mão Direita
        mainHandName: document.getElementById('main-hand-name'),
        mainHandDescription: document.getElementById('main-hand-description'),
        mainHandImageSelect: document.getElementById('main-hand-image-select'),
        mainHandImage: document.getElementById('main-hand-image'), // A tag <img> para display
        mainHandActive: document.getElementById('main-hand-active'), // Checkbox

        // Armadura
        armorName: document.getElementById('armor-name'),
        armorDescription: document.getElementById('armor-description'),
        armorBonusProf: document.getElementById('armor-bonus-prof'),
        armorImageSelect: document.getElementById('armor-image-select'),
        armorImage: document.getElementById('armor-image'), // A tag <img> para display

        // Mão Esquerda
        offHandName: document.getElementById('off-hand-name'),
        offHandDescription: document.getElementById('off-hand-description'),
        offHandImageSelect: document.getElementById('off-hand-image-select'),
        offHandImage: document.getElementById('off-hand-image'), // A tag <img> para display
        offHandActive: document.getElementById('off-hand-active'), // Checkbox

        // Lista de Inventário Completa (agora na seção de inventário)
        inventoryFullList: document.getElementById('inventory-full-list'),

        // Nota: Campos como attack/damage para armas equipadas podem ser adicionados aqui no futuro.
    };

    // Spans para modificadores calculados (sem alteração)
    const attributeModifiersSpans = {
        strengthMod: document.getElementById('strengthMod'),
        dexterityMod: document.getElementById('dexterityMod'),
        constitutionMod: document.getElementById('constitutionMod'),
        intelligenceMod: document.getElementById('intelligenceMod'),
        wisdomMod: document.getElementById('wisdomMod'),
        charismaMod: document.getElementById('charismaMod'),
    };

    // Spans para salvaguardas calculadas (sem alteração)
    const savingThrowModifiersSpans = {
        strSaveMod: document.getElementById('strSaveMod'),
        dexSaveMod: document.getElementById('dexSaveMod'),
        conSaveMod: document.getElementById('conSaveMod'),
        intSaveMod: document.getElementById('intSaveMod'),
        wisSaveMod: document.getElementById('wisSaveMod'),
        chaSaveMod: document.getElementById('chaSaveMod'),
    };

    // Spans para perícias calculadas (sem alteração)
    const skillModifiersSpans = {
        acrobaticsMod: { span: document.getElementById('acrobaticsMod'), attr: 'dexterity' },
        animalHandlingMod: { span: document.getElementById('animalHandlingMod'), attr: 'wisdom' },
        arcanaMod: { span: document('arcanaMod'), attr: 'intelligence' },
        athleticsMod: { span: document.getElementById('athleticsMod'), attr: 'strength' },
        deceptionMod: { span: document.getElementById('deceptionMod'), attr: 'charisma' },
        historyMod: { span: document.getElementById('historyMod'), attr: 'intelligence' },
        insightMod: { span: document.getElementById('insightMod'), attr: 'wisdom' },
        intimidationMod: { span: document.getElementById('intimidationMod'), attr: 'charisma' },
        investigationMod: { span: document.getElementById('investigationMod'), attr: 'intelligence' },
        medicineMod: { span: document.getElementById('medicineMod'), attr: 'wisdom' },
        natureMod: { span: document.getElementById('natureMod'), attr: 'intelligence' },
        perceptionMod: { span: document.getElementById('perceptionMod'), attr: 'wisdom' },
        performanceMod: { span: document.getElementById('performanceMod'), attr: 'charisma' },
        persuasionMod: { span: document.getElementById('persuasionMod'), attr: 'charisma' },
        religionMod: { span: document.getElementById('religionMod'), attr: 'intelligence' },
        sleightOfHandMod: { span: document.getElementById('sleightOfHandMod'), attr: 'dexterity' },
        stealthMod: { span: document.getElementById('stealthMod'), attr: 'dexterity' },
        survivalMod: { span: document.getElementById('survivalMod'), attr: 'wisdom' },
    };

    // Elementos do Companion (sem alteração)
    const companionElements = {
        statusDiv: document.getElementById('companionStatus'),
        controlsDiv: document.getElementById('companionControls'),
        charName: document.getElementById('companionTopName'), // Top Bar
        ac: document.getElementById('companionTopAC'),         // Top Bar
        speed: document.getElementById('companionTopSpeed'),     // Top Bar
        currentHP: document.getElementById('companionCurrentHP'), // Status Central
        maxHP: document.getElementById('companionMaxHP'),     // Status Central
        tempHP: document.getElementById('companionTempHP'),     // Status Central
        hpChangeValue: document.getElementById('hpChangeValue'), // Ações HP/Temp
        applyDamageButton: document.getElementById('applyDamageButton'), // Ações HP/Temp
        applyHealingButton: document.getElementById('applyHealingButton'), // Ações HP/Temp
        tempHpValue: document.getElementById('tempHpValue'), // Ações HP/Temp
        addTempHpButton: document.getElementById('addTempHpButton'), // Ações HP/Temp
        removeTempHpButton: document.getElementById('removeTempHpButton'), // Ações HP/Temp
        // Hit Dice (agora apenas para o controle no companion)
        hitDiceToSpend: document.getElementById('hitDiceToSpend'), // Ações DV
        hitDiceTypeSpend: document.getElementById('hitDiceTypeSpend'), // Ações DV
        spendHitDiceButton: document.getElementById('spendHitDiceButton'), // Ações DV
        hitDiceHealResult: document.getElementById('hitDiceHealResult'), // Ações DV
        // Death Saves no Companion
        dsS1: document.getElementById('compDeathSaveSuccess1'), // Death Saves
        dsS2: document.getElementById('compDeathSaveSuccess2'), // Death Saves
        dsS3: document.getElementById('compDeathSaveSuccess3'), // Death Saves
        dsF1: document.getElementById('compDeathSaveFail1'), // Death Saves
        dsF2: document.getElementById('compDeathSaveFail2'), // Death Saves
        dsF3: document.getElementById('compDeathSaveFail3'), // Death Saves
        // Mini Rolador
        diceResultDisplay: document.getElementById('companionDiceResult'), // Mini Rolador
        diceButtons: document.querySelectorAll('.comp-dice-button'), // Mini Rolador
        // Salvar Companion
        saveCompanionChangesButton: document.getElementById('saveCompanionChangesButton'),
    };


    // --- VARIÁVEIS DE CONTROLE ---
    const saveButton = document.getElementById('saveCharacterButton'); // Botão salvar da ficha
    const loadButton = document.getElementById('loadCharacterButton'); // Botão carregar da ficha
    const newButton = document.getElementById('newCharacterButton'); // Botão novo da ficha
    const saveInventoryButton = document.getElementById('saveInventoryButton'); // NOVO botão salvar do inventário

    const characterStorageKey = 'rpgCompanion_characterData_dnd5e';
    // Variável para armazenar o estado atual do personagem para o companion e outras lógicas
    let currentCharacterData = null;


    // --- FUNÇÕES DE CÁLCULO (sem alteração) ---
    function getAbilityModifier(score) { /* ... */ }
    function getProficiencyBonus(level) { /* ... */ }
    function getCharacterLevel() { /* ... */ }
    function updateAbilityModifiers() { /* ... */ }
    function updateProficiencyBonus() { /* ... */ }
    function updateSavingThrows() { /* ... */ }
    function updateSkills() { /* ... */ }
    function updateInitiative() { /* ... */ }
    function updatePassivePerception() { /* ... */ }

    // Função agregadora para atualizar tudo que é calculado
    function calculateAllDerivedStats() {
        updateAbilityModifiers();
        updateProficiencyBonus();
        updateSavingThrows();
        updateSkills();
        updateInitiative();
        updatePassivePerception();
    }

    // --- FUNÇÕES DE INVENTÁRIO EQUIPADO ---

    // Função para popular os selects de imagem
    function populateImageSelects() {
        console.log("populateImageSelects: Populando selects de imagem."); // DEBUG
        const selects = [
            characterFormFields.mainHandImageSelect,
            characterFormFields.armorImageSelect,
            characterFormFields.offHandImageSelect
        ];

        selects.forEach(select => {
            if (select) {
                select.innerHTML = ''; // Limpa opções existentes
                predefinedImages.forEach(img => {
                    const option = document.createElement('option');
                    option.value = img.value;
                    option.textContent = img.text;
                    // Opcional: Marcar uma como selecionada por padrão se houver 'default: true'
                     if (img.default) {
                         option.selected = true;
                     }
                    select.appendChild(option);
                });
                 // Dispara o evento 'change' para atualizar a imagem inicial
                 // Isso garante que a imagem padrão seja exibida ao carregar
                 select.dispatchEvent(new Event('change'));
            } else {
                console.warn("populateImageSelects: Elemento select de imagem não encontrado!"); // DEBUG
            }
        });
         console.log("populateImageSelects: Selects de imagem populados e imagens iniciais atualizadas."); // DEBUG
    }

    // Função para atualizar a tag <img> quando o select muda
    function updateEquippedImage(selectElement) {
        if (!selectElement) {
             console.warn("updateEquippedImage: Elemento select inválido recebido."); // DEBUG
             return;
        }
        const imageUrl = selectElement.value;
        // O ID da tag <img> deve ser o ID do select, mas sem '-select'
        const imageElementId = selectElement.id.replace('-select', '');
        const imageElement = document.getElementById(imageElementId);

        if (imageElement && imageElement.tagName === 'IMG') {
            imageElement.src = imageUrl || ''; // Define a URL da imagem, ou string vazia para o atributo src se "Nenhuma Imagem"
             // Define o alt da imagem com o texto da opção selecionada
            imageElement.alt = selectElement.options[selectElement.selectedIndex].text || selectElement.id.replace('-image-select', '');
            console.log(`updateEquippedImage: Imagem para ${imageElementId} atualizada para "${imageUrl}".`); // DEBUG
        } else {
            console.warn(`updateEquippedImage: Tag <img> com ID "${imageElementId}" não encontrada.`); // DEBUG
        }
    }


    // --- FUNÇÕES PRINCIPAIS (SALVAR/CARREGAR/LIMPAR) ---

    // FUNÇÃO PARA SALVAR PERSONAGEM (Inclui todos os campos em characterFormFields)
    function saveCharacter() {
        console.log("saveCharacter: Iniciando salvamento."); // DEBUG
        const characterData = {};

        // Itera sobre TODOS os campos definidos em characterFormFields
        for (const key in characterFormFields) {
            const field = characterFormFields[key];
            if (field) { // Verifica se o elemento HTML foi encontrado
                if (field.type === 'checkbox') {
                    characterData[key] = field.checked;
                } else if (field.tagName === 'SELECT') { // Trata selects (incluindo os de imagem)
                     characterData[key] = field.value;
                } else if (field.tagName === 'IMG') {
                     // Não salvamos a tag <img> em si, o valor vem do SELECT
                     // characterData[key] = field.src; // Não é necessário salvar a URL aqui
                 } else if (field.type === 'number' && field.readOnly) {
                     // Campos numéricos somente leitura (calculados) - salvamos o valor
                     characterData[key] = parseFloat(field.value) || 0;
                 }
                 else if (field.type === 'number') {
                     // Campos numéricos editáveis - salvamos o valor numérico ou string vazia
                    characterData[key] = field.valueAsNumber === null || isNaN(field.valueAsNumber) ? "" : field.valueAsNumber;
                }
                 else {
                    // Inputs de texto e textareas
                    characterData[key] = field.value;
                }
            } else {
                 console.warn(`saveCharacter: Elemento HTML para a chave "${key}" não encontrado em characterFormFields.`); // DEBUG
            }
        }

        // currentCharacterData = JSON.parse(JSON.stringify(characterData)); // Atualiza o objeto global após salvar (opcional)

        localStorage.setItem(characterStorageKey, JSON.stringify(characterData));
        console.log("saveCharacter: Dados salvos:", characterData); // DEBUG
        alert('Personagem salvo com sucesso!');
    }

    // FUNÇÃO PARA CARREGAR PERSONAGEM (Inclui todos os campos e atualiza views)
    function loadCharacter() {
        console.log("loadCharacter: Tentando carregar dados do localStorage."); // DEBUG
        const savedDataString = localStorage.getItem(characterStorageKey);

        if (savedDataString) {
            try {
                const characterData = JSON.parse(savedDataString);
                console("loadCharacter: Dados brutos carregados do localStorage:", characterData); // DEBUG

                // Itera sobre os dados carregados para preencher TODOS os campos em characterFormFields
                for (const key in characterData) {
                    const field = characterFormFields[key]; // Pega a referência do elemento HTML
                    if (field) { // Verifica se o elemento HTML foi encontrado no DOM
                        if (field.type === 'checkbox') {
                            field.checked = characterData[key];
                        } else if (field.tagName === 'SELECT') { // Trata selects
                             field.value = characterData[key];
                             // Se for um select de imagem, atualiza a tag <img> correspondente
                             if (field.classList.contains('image-selector')) {
                                 updateEquippedImage(field); // Chama a função para mudar a imagem
                             }
                         } else if (field.tagName === 'IMG') {
                            // Não preenchemos a tag <img> diretamente do savedData,
                            // ela é atualizada pela mudança do select correspondente
                            // field.src = characterData[key] || ''; // NÃO FAZER ISSO
                         }
                        else {
                            // Preenche inputs de texto, number, textarea
                            if (characterData[key] !== "" && characterData[key] !== null && typeof characterData[key] !== 'undefined') {
                                field.value = characterData[key];
                            } else {
                                field.value = ''; // Garante que campos vazios no save fiquem vazios no load
                            }
                        }
                    } else {
                         console.warn(`loadCharacter: Campo "${key}" encontrado nos dados salvos, mas elemento HTML correspondente não encontrado em characterFormFields.`); // DEBUG
                    }
                }

                // Recalcula todos os stats derivados com base nos dados que acabaram de ser preenchidos nos inputs
                calculateAllDerivedStats();
                console.log("loadCharacter: Stats derivados recalculados."); // DEBUG

                // Atualiza o objeto global que o companion usa
                currentCharacterData = JSON.parse(JSON.stringify(characterData)); // Cria uma cópia profunda
                console.log("loadCharacter: currentCharacterData atualizado:", currentCharacterData); // DEBUG

                // Popula o companion view com os dados carregados
                populateCompanionView(characterData);
                console.log("loadCharacter: Companion view populado."); // DEBUG

                // Nota: A view do inventário no HTML já foi populada pelo loop acima,
                // pois os campos de inventário estão em characterFormFields.
                // populateInventoryHtml(characterData) // Não precisamos mais desta função separada para popular

                alert('Personagem carregado!');
                console.log("loadCharacter: Carregamento concluído com sucesso."); // DEBUG

            } catch (e) {
                console.error("loadCharacter: ERRO CRÍTICO ao parsear ou processar dados do localStorage:", e); // DEBUG ERRO
                alert('Erro ao carregar personagem salvo. Os dados podem estar corrompidos.');
                // Opcional: localStorage.removeItem(characterStorageKey); // Limpa dados corrompidos
                // Limpa a ficha e companion view se houver erro no carregamento
                clearCharacterSheet(); // Isso vai limpar tudo e popular views com null/vazio
                 console.log("loadCharacter: Ficha limpa devido a erro no carregamento."); // DEBUG
            }
        } else {
            console.log("loadCharacter: Nenhum personagem salvo encontrado no localStorage."); // DEBUG
            populateCompanionView(null); // Garante que o companion mostre a mensagem "Carregue..."
            // A ficha e inventário já devem estar vazios por padrão no HTML ou após um clear
            alert('Nenhum personagem salvo encontrado.');
        }
    }

    // FUNÇÃO PARA LIMPAR A FICHA COMPLETA (Inclui Inventário)
    function clearCharacterSheet() {
        console.log("clearCharacterSheet: Limpando ficha e inventário."); // DEBUG
        if (confirm("Tem certeza que deseja limpar todos os campos da ficha e inventário? Dados não salvos serão perdidos.")) {
            // Itera sobre TODOS os campos definidos em characterFormFields
            for (const key in characterFormFields) {
                const field = characterFormFields[key];
                if (field) { // Verifica se o elemento HTML foi encontrado
                    // Limpa campos que não são somente leitura
                    if (!field.readOnly) {
                        if (field.type === 'checkbox') {
                            field.checked = false;
                        } else if (field.tagName === 'SELECT') {
                            // Reseta selects para a primeira opção (geralmente "Selecionar Imagem..." ou vazio)
                           field.selectedIndex = 0;
                           // Se for select de imagem, atualiza a imagem
                           if (field.classList.contains('image-selector')) {
                               updateEquippedImage(field); // Chama a função para voltar a imagem padrão
                           }
                        } else if (field.tagName === 'IMG') {
                             // Não limpamos a tag <img> diretamente, ela é limpa pelo select
                             // field.src = ''; // NÃO FAZER ISSO
                        }
                         else {
                            field.value = ''; // Limpa inputs de texto, number, textareas
                        }
                    }
                } else {
                     console.warn(`clearCharacterSheet: Elemento HTML para a chave "${key}" não encontrado em characterFormFields.`); // DEBUG
                }
            }

            calculateAllDerivedStats(); // Recalcula (vai zerar os campos calculados, exceto prof bonus inicial)
             console.log("clearCharacterSheet: Stats derivados recalculados."); // DEBUG

            // Cria um objeto de dados vazio e popula o companion view
            const emptyCharacterData = getEmptyCharacterDataForCompanion(); // Esta função já pega valores zerados/padrão do HTML
            populateCompanionView(emptyCharacterData);
             console.log("clearCharacterSheet: Companion view populado com dados vazios."); // DEBUG

            // A view do inventário HTML já foi limpa pelo loop acima.
            // populateInventoryHtml(getInventoryDataFromHtml()); // Não precisa mais desta função

            alert('Ficha e Inventário limpos. Pronto para um novo personagem!');
             console.log("clearCharacterSheet: Limpeza concluída."); // DEBUG
        }
    }


    // --- FUNÇÕES DO COMPANION (Sem alteração na lógica) ---

    // Função para popular o Companion View
    function populateCompanionView(characterData) {
        console.log("populateCompanionView: Chamada com characterData:", characterData); // DEBUG

        if (!characterData || Object.keys(characterData).length === 0) {
            console.log("populateCompanionView: Nenhum dado de personagem encontrado, mostrando statusDiv."); // DEBUG
            if (companionElements.statusDiv) companionElements.statusDiv.style.display = 'block';
            if (companionElements.controlsDiv) companionElements.controlsDiv.style.display = 'none';
            currentCharacterData = null; // Usa currentCharacterData global
            return;
        }
        console.log("populateCompanionView: Dados de personagem recebidos, mostrando controlsDiv."); // DEBUG
        if (companionElements.statusDiv) companionElements.statusDiv.style.display = 'none';
        if (companionElements.controlsDiv) companionElements.controlsDiv.style.display = 'block';

        // currentCharacterData = JSON.parse(JSON.stringify(characterData)); // Já atualizado em loadCharacter

        // Usar o objeto characterData diretamente para popular a view
        if (companionElements.charName) companionElements.charName.textContent = characterData.charName || "N/A";
        // Pega CA, Speed, Initiative diretamente dos campos CALCULADOS/ENTRADOS na ficha principal
        if (companionElements.ac && characterFormFields.armorClass) companionElements.ac.textContent = characterFormFields.armorClass.value || "--";
        if (companionElements.speed && characterFormFields.speed) companionElements.speed.textContent = characterFormFields.speed.value || "--";
        if (companionElements.initiative && characterFormFields.initiative) companionElements.initiative.textContent = characterFormFields.initiative.value || "--"; // Pega o calculado

        if (companionElements.maxHP) companionElements.maxHP.textContent = characterData.hpMax || 0;
        if (companionElements.currentHP) companionElements.currentHP.textContent = characterData.hpCurrent || 0;
        if (companionElements.tempHP) companionElements.tempHP.textContent = characterData.hpTemp || 0;
        if (companionElements.removeTempHpButton) companionElements.removeTempHpButton.style.display = (characterData.hpTemp && characterData.hpTemp > 0) ? 'inline-block' : 'none';

        if (companionElements.dsS1) companionElements.dsS1.checked = characterData.deathSaveSuccess1 || false;
        if (companionElements.dsS2) companionElements.dsS2.checked = characterData.deathSaveSuccess2 || false;
        if (companionElements.dsS3) companionElements.dsS3.checked = characterData.deathSaveSuccess3 || false;
        if (companionElements.dsF1) companionElements.dsF1.checked = characterData.deathSaveFail1 || false;
        if (companionElements.dsF2) companionElements.dsF2.checked = characterData.deathSaveFail2 || false;
        if (companionElements.dsF3) companionElements.dsF3.checked = characterData.deathSaveFail3 || false;

        // Popula select de Dados de Vida para o companion
         if (companionElements.hitDiceTypeSpend && characterFormFields.hitDiceTotal) {
            companionElements.hitDiceTypeSpend.innerHTML = '';
            const hitDiceString = characterFormFields.hitDiceTotal.value || ""; // Pega da ficha principal
            const diceTypes = new Set();
            const diceRegex = /d(\d+)/g;
            let match;
            while((match = diceRegex.exec(hitDiceString)) !== null) {
                diceTypes.add(`d${match[1]}`);
            }
            // Fallback se nada for encontrado (pode tentar adivinhar dado de vida pela classe/nível se necessário no futuro)
            if (diceTypes.size === 0) {
                diceTypes.add('d8'); // Default genérico
            }
            diceTypes.forEach(dtype => {
                const option = document.createElement('option');
                option.value = dtype;
                option.textContent = dtype;
                companionElements.hitDiceTypeSpend.appendChild(option); // Usar appendChild é mais robusto
            });
            // Adicionar uma opção padrão se o select ainda estiver vazio
            if (companionElements.hitDiceTypeSpend.options.length === 0) {
                 const defaultOption = document.createElement('option');
                 defaultOption.value = 'd8';
                 defaultOption.textContent = 'd8';
                 companionElements.hitDiceTypeSpend.appendChild(defaultOption);
            }
        } else if (companionElements.hitDiceTypeSpend) {
             companionElements.hitDiceTypeSpend.innerHTML = '<option value="d8">d8</option>'; // Garante pelo menos uma opção
        }


        // Limpar resultado do mini rolador ao popular/carregar
        if (companionElements.diceResultDisplay) {
            companionElements.diceResultDisplay.textContent = '--';
        }
        // Limpar resultado de cura de DV
        if (companionElements.hitDiceHealResult) {
            companionElements.hitDiceHealResult.textContent = '';
        }
         console.log("populateCompanionView: View populada."); // DEBUG
    }

     // Funções de ação do companion (Dano, Cura, TempHP, etc.)
    function applyDamage() {
        if (!currentCharacterData || !companionElements.hpChangeValue || !companionElements.currentHP || !companionElements.tempHP) return;
        const damage = parseInt(companionElements.hpChangeValue.value);
        if (isNaN(damage) || damage <= 0) {
             console.log("applyDamage: Valor de dano inválido."); // DEBUG
            return;
        }
         console.log(`applyDamage: Aplicando ${damage} de dano.`); // DEBUG

        let currentHp = parseInt(currentCharacterData.hpCurrent || 0);
        let tempHp = parseInt(currentCharacterData.hpTemp || 0);

        if (tempHp > 0) {
            if (damage <= tempHp) {
                tempHp -= damage;
                 console.log(`applyDamage: Dano absorvido por PV Temp. PV Temp restantes: ${tempHp}.`); // DEBUG
            } else {
                 const remainingDamage = damage - tempHp;
                 console.log(`applyDamage: PV Temp esgotados (${tempHp}). Dano restante: ${remainingDamage}.`); // DEBUG
                currentHp -= remainingDamage;
                tempHp = 0;
            }
        } else {
            currentHp -= damage;
             console.log(`applyDamage: Dano direto. PV Atuais: ${currentHp}.`); // DEBUG
        }
        currentHp = Math.max(0, currentHp); // HP não pode ser negativo (geralmente)

        currentCharacterData.hpCurrent = currentHp;
        currentCharacterData.hpTemp = tempHp;
        updateCompanionHPDisplay();
        companionElements.hpChangeValue.value = '';
         console.log(`applyDamage: Status final - PV Atuais: ${currentCharacterData.hpCurrent}, PV Temp: ${currentCharacterData.hpTemp}.`); // DEBUG
    }

    function applyHealing() {
        if (!currentCharacterData || !companionElements.hpChangeValue || !companionElements.currentHP || !companionElements.maxHP) return;
        const healing = parseInt(companionElements.hpChangeValue.value);
        if (isNaN(healing) || healing <= 0) {
            console.log("applyHealing: Valor de cura inválido."); // DEBUG
            return;
        }
        console.log(`applyHealing: Aplicando ${healing} de cura.`); // DEBUG

        let currentHp = parseInt(currentCharacterData.hpCurrent || 0);
        const maxHp = parseInt(currentCharacterData.hpMax || 0);

        currentHp = Math.min(maxHp, currentHp + healing);
        console(`applyHealing: PV Atuais antes: ${currentCharacterData.hpCurrent}. PV Max: ${maxHp}. PV Atuais depois: ${currentHp}.`); // DEBUG

        currentCharacterData.hpCurrent = currentHp;
        updateCompanionHPDisplay();
        companionElements.hpChangeValue.value = '';
    }

    function addOrSetTempHP() {
        if (!currentCharacterData || !companionElements.tempHpValue) return;
        const amount = parseInt(companionElements.tempHpValue.value);
        if (isNaN(amount) || amount < 0) {
            console.log("addOrSetTempHP: Valor de PV Temp inválido."); // DEBUG
            return;
        }
        console.log(`addOrSetTempHP: Definindo/Adicionando ${amount} PV Temp.`); // DEBUG

        // Regra D&D 5e: PV temporários não acumulam, você pega o maior valor.
        // Se quiser que acumule, mude a lógica aqui.
        const newTempHp = Math.max(currentCharacterData.hpTemp || 0, amount);
         if (newTempHp > (currentCharacterData.hpTemp || 0)) {
             currentCharacterData.hpTemp = newTempHp;
             console.log(`addOrSetTempHP: Novos PV Temp (${newTempHp}) são maiores ou iguais aos atuais. Definindo.`); // DEBUG
         } else {
             console.log(`addOrSetTempHP: Novos PV Temp (${amount}) são menores que os atuais (${currentCharacterData.hpTemp}). Mantendo atuais.`); // DEBUG
         }

        updateCompanionHPDisplay();
        companionElements.tempHpValue.value = '';
    }

    function removeTempHP() {
        if (!currentCharacterData) return;
         console.log("removeTempHP: Removendo todos os PV Temp."); // DEBUG
        currentCharacterData.hpTemp = 0;
        updateCompanionHPDisplay();
    }

    function updateCompanionHPDisplay() {
        if (!currentCharacterData || !companionElements.currentHP || !companionElements.tempHP || !companionElements.removeTempHpButton) {
            console.warn("updateCompanionHPDisplay: Elementos do companion não encontrados para atualizar display."); // DEBUG
            return;
        }
        companionElements.currentHP.textContent = currentCharacterData.hpCurrent || 0;
        companionElements.tempHP.textContent = currentCharacterData.hpTemp || 0;
        // Mostra/esconde o botão 'Remover PV Temp'
        companionElements.removeTempHpButton.style.display = (currentCharacterData.hpTemp && characterData.hpTemp > 0) ? 'inline-block' : 'none';
        console.log(`updateCompanionHPDisplay: Display atualizado - PV Atuais: ${currentCharacterData.hpCurrent}, PV Temp: ${currentCharacterData.hpTemp}.`); // DEBUG
    }

    function spendHitDice() {
        if (!currentCharacterData || !companionElements.hitDiceToSpend || !companionElements.hitDiceTypeSpend || !companionElements.hitDiceHealResult || !characterFormFields.constitutionScore) {
            console.warn("spendHitDice: Elementos ou dados necessários não encontrados."); // DEBUG
            return;
        }
        const numDiceToSpend = parseInt(companionElements.hitDiceToSpend.value);
        const diceTypeString = companionElements.hitDiceTypeSpend.value; // Ex: "d8"
        const conScore = parseInt(characterFormFields.constitutionScore.value) || 10; // Pega da ficha
        const conMod = getAbilityModifier(conScore);

        if (isNaN(numDiceToSpend) || numDiceToSpend <= 0 || !diceTypeString) {
            alert("Por favor, insira um número válido de dados e selecione um tipo.");
             console.log("spendHitDice: Input de dados ou tipo inválido."); // DEBUG
            return;
        }
         console.log(`spendHitDice: Gastando ${numDiceToSpend}${diceTypeString}. CON Mod: ${conMod}.`); // DEBUG

        let totalHealed = 0;
        const diceSize = parseInt(diceTypeString.substring(1)); // "d8" -> 8
        if (isNaN(diceSize) || diceSize <= 0) {
            alert("Tipo de dado de vida inválido selecionado.");
             console.warn(`spendHitDice: Tipo de dado inválido: ${diceTypeString}.`); // DEBUG
            return;
        }

        // TODO: Adicionar lógica para decrementar a contagem REAL de dados de vida restantes (characterFormFields.hitDiceCurrent)
        // Isso exigiria uma estrutura de dados mais robusta para hitDiceCurrent (ex: "3d8", "1d10/1d6").

        for (let i = 0; i < numDiceToSpend; i++) {
            const roll = Math.floor(Math.random() * diceSize) + 1;
            totalHealed += Math.max(1, roll + conMod); // Cada dado cura no mínimo 1
             console.log(`spendHitDice: Rolagem individual ${i+1}: ${roll} + ${conMod} = ${roll + conMod} (min 1)`); // DEBUG
        }
        console.log(`spendHitDice: Total curado antes de aplicar: ${totalHealed} PV.`); // DEBUG
        companionElements.hitDiceHealResult.textContent = `+${totalHealed}`; // Exibe o total rolado + mod

        // Aplica a cura aos PVs Atuais (sempre limitada ao PV Máximo)
        let currentHp = parseInt(currentCharacterData.hpCurrent || 0);
        const maxHp = parseInt(currentCharacterData.hpMax || 0);
        currentHp = Math.min(maxHp, currentHp + totalHealed);
        console(`spendHitDice: PV Atuais antes: ${currentCharacterData.hpCurrent}. PV Max: ${maxHp}. PV Atuais depois: ${currentHp}.`); // DEBUG

        currentCharacterData.hpCurrent = currentHp;
        updateCompanionHPDisplay();
        // companionElements.hitDiceToSpend.value = 1; // Resetar input de dados a gastar

        alert(`Você gastou ${numDiceToSpend}${diceTypeString} e recuperou ${totalHealed} PV. (Lógica de contagem de dados de vida restantes ainda pendente)`);
    }

    // Sincroniza os dados relevantes do companion (currentCharacterData) de volta para os campos da ficha principal
    function saveCompanionChangesToMainSheet() {
        if (!currentCharacterData) {
            alert("Nenhum personagem ativo no companion para salvar mudanças.");
             console.warn("saveCompanionChangesToMainSheet: currentCharacterData é nulo. Não foi possível sincronizar."); // DEBUG
            return;
        }
        console.log("saveCompanionChangesToMainSheet: Sincronizando dados do companion para a ficha principal."); // DEBUG

        // Atualiza os campos relevantes na characterFormFields a partir de currentCharacterData
        // Adiciona verificações para garantir que os campos do formulário existem antes de tentar atribuir
        if (characterFormFields.hpCurrent && currentCharacterData.hpCurrent !== undefined) characterFormFields.hpCurrent.value = currentCharacterData.hpCurrent;
        if (characterFormFields.hpTemp && currentCharacterData.hpTemp !== undefined) characterFormFields.hpTemp.value = currentCharacterData.hpTemp;

        // Death Saves - Sincroniza os checkboxes do companion para os campos da ficha principal
        if (characterFormFields.deathSaveSuccess1 && companionElements.dsS1) characterFormFields.deathSaveSuccess1.checked = companionElements.dsS1.checked;
        if (characterFormFields.deathSaveSuccess2 && companionElements.dsS2) characterFormFields.deathSaveSuccess2.checked = companionElements.dsS2.checked;
        if (characterFormFields.deathSaveSuccess3 && companionElements.dsS3) characterFormFields.deathSaveSuccess3.checked = companionElements.dsS3.checked;
        if (characterFormFields.deathSaveFail1 && companionElements.dsF1) characterFormFields.deathSaveFail1.checked = companionElements.dsF1.checked;
        if (characterFormFields.deathSaveFail2 && companionElements.dsF2) characterFormFields.deathSaveFail2.checked = companionElements.dsF2.checked;
        if (characterFormFields.deathSaveFail3 && companionElements.dsF3) characterFormFields.deathSaveFail3.checked = companionElements.dsF3.checked;


        // TODO: Sincronizar hitDiceCurrent na ficha principal se a lógica for implementada

        // Salva TODO o personagem (ficha + inventário + companion data na ficha) no localStorage
        saveCharacter(); // A função saveCharacter já pega os valores atualizados de characterFormFields

        // alert("Mudanças do companion salvas na ficha e no localStorage!"); // saveCharacter já dá um alerta
         console.log("saveCompanionChangesToMainSheet: Sincronização completa e salvamento realizado."); // DEBUG
    }

     // Cria um objeto de dados vazio para popular companion/ficha
    function getEmptyCharacterDataForCompanion() {
        console.log("getEmptyCharacterDataForCompanion: Gerando dados vazios para companion."); // DEBUG
        const emptyData = {};
        // Lista de chaves que o companion espera ter (mesmo que vazias/zeradas)
        const fieldsToResetForCompanion = [
            'charName', 'armorClass', 'speed', 'hpMax', 'hpCurrent', 'hpTemp', 'hitDiceTotal', 'hitDiceCurrent',
            'deathSaveSuccess1', 'deathSaveSuccess2', 'deathSaveSuccess3',
            'deathSaveFail1', 'deathSaveFail2', 'deathSaveFail3'
        ];
        fieldsToResetForCompanion.forEach(key => {
            // Tenta pegar o valor atual dos campos da ficha (que foram limpos/zerados)
            const field = characterFormFields[key];
            if (field) {
                 if (field.type === 'checkbox') emptyData[key] = field.checked; // Pega o estado false
                 else if (field.type === 'number') emptyData[key] = field.valueAsNumber || 0; // Pega o valor 0 ou vazio
                 else if (field.tagName === 'SELECT') emptyData[key] = field.value || ''; // Pega o valor vazio
                 else emptyData[key] = field.value || ''; // Pega o valor vazio de texto/textarea
            } else {
                 // Se o campo NÃO está em characterFormFields mas é esperado pelo companion (improvável agora)
                 console.warn(`getEmptyCharacterDataForCompanion: Campo "${key}" esperado pelo companion não encontrado em characterFormFields.`); // DEBUG
                 if (key.includes('deathSave')) emptyData[key] = false;
                 else if (key.includes('hp') || key === 'armorClass') emptyData[key] = 0;
                 else emptyData[key] = ""; // Default para texto
            }
        });

        // Pega valores calculados diretamente dos campos da ficha se existirem
        if (characterFormFields.initiative) emptyData.initiative = characterFormFields.initiative.value || "--"; else emptyData.initiative = "--";
        if (characterFormFields.armorClass) emptyData.armorClass = characterFormFields.armorClass.value || "--"; else emptyData.armorClass = "--";
        if (characterFormFields.speed) emptyData.speed = characterFormFields.speed.value || "--"; else emptyData.speed = "--";
         if (characterFormFields.hitDiceTotal) emptyData.hitDiceTotal = characterFormFields.hitDiceTotal.value || "N/A"; else emptyData.hitDiceTotal = "N/A";
        // currentCharacterData = emptyData; // Atualiza o objeto global (já é feito em clearCharacterSheet)
         console.log("getEmptyCharacterDataForCompanion: Dados vazios gerados:", emptyData); // DEBUG
        return emptyData;
    }


    // --- EVENT LISTENERS ---

    // Event listeners para cálculos automáticos na Ficha (quando inputs mudam)
    ['strengthScore', 'dexterityScore', 'constitutionScore', 'intelligenceScore', 'wisdomScore', 'charismaScore'].forEach(id => {
        if (characterFormFields[id]) {
            characterFormFields[id].addEventListener('input', calculateAllDerivedStats);
        }
    });
    if (characterFormFields.charClassLevel) {
        characterFormFields.charClassLevel.addEventListener('input', calculateAllDerivedStats);
    }
    // Quando qualquer checkbox de proficiência muda, recalcula tudo
    document.querySelectorAll('.prof-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', calculateAllDerivedStats);
    });
    // Opcional: Recalcular stats quando CA ou Speed mudam (não afetam stats derivados padrão, mas podem afetar outros cálculos futuros)
    // if (characterFormFields.armorClass) characterFormFields.armorClass.addEventListener('input', calculateAllDerivedStats);
    // if (characterFormFields.speed) characterFormFields.speed.addEventListener('input', calculateAllDerivedStats);


    // Event listeners para botões da Ficha (Salvar, Carregar, Novo)
    if (saveButton) saveButton.addEventListener('click', saveCharacter);
    if (loadButton) loadButton.addEventListener('click', loadCharacter);
    if (newButton) newButton.addEventListener('click', clearCharacterSheet);


    // Event listeners para o Companion (Dano, Cura, PV Temp, DV, Salvar Companion)
    if (companionElements.applyDamageButton) companionElements.applyDamageButton.addEventListener('click', applyDamage);
    if (companionElements.applyHealingButton) companionElements.applyHealingButton.addEventListener('click', applyHealing);
    if (companionElements.addTempHpButton) companionElements.addTempHpButton.addEventListener('click', addOrSetTempHP);
    if (companionElements.removeTempHpButton) companionElements.removeTempHpButton.addEventListener('click', removeTempHP);
    if (companionElements.spendHitDiceButton) companionElements.spendHitDiceButton.addEventListener('click', spendHitDice);
    // CORRIGIDO: Listener para o botão Salvar Mudanças no Companion
    if (companionElements.saveCompanionChangesButton) companionElements.saveCompanionChangesButton.addEventListener('click', saveCompanionChangesToMainSheet);

    // Listener para os checkboxes de Death Save no Companion (sincroniza para currentCharacterData)
    document.querySelectorAll('.comp-ds').forEach(cb => {
        cb.addEventListener('change', function() {
            if (currentCharacterData) { // Sincroniza apenas se houver um personagem carregado
                const key = this.id.replace('comp', ''); // ex: "compDeathSaveSuccess1" -> "DeathSaveSuccess1"
                const dataKey = key.charAt(0).toLowerCase() + key.slice(1); // "DeathSaveSuccess1" -> "deathSaveSuccess1"
                if (typeof currentCharacterData[dataKey] !== 'undefined') {
                   currentCharacterData[dataKey] = this.checked;
                   console.log(`DEBUG: Companion Death Save "${dataKey}" mudado para ${this.checked}. Sincronizado internamente.`); // DEBUG
                } else {
                    console.warn(`DEBUG: Tentou sincronizar chave de death save inexistente no currentCharacterData: "${dataKey}"`); // DEBUG
                }
            } else {
                 console.warn("DEBUG: Companion Death Save mudado, mas nenhum personagem carregado para sincronizar."); // DEBUG
            }
        });
    });

     // Listener para os botões do mini rolador no Companion
    if (companionElements.diceButtons) {
        companionElements.diceButtons.forEach(button => {
            button.addEventListener('click', function(event) {
                 // Chama a função de rolar dado do companion
                 const dieType = event.target.dataset.die;
                 if (!dieType || !companionElements.diceResultDisplay) return;
                 const dieSize = parseInt(dieType);
                 const roll = Math.floor(Math.random() * dieSize) + 1;
                 companionElements.diceResultDisplay.textContent = roll;
                 // Efeito visual opcional
                 companionElements.diceResultDisplay.classList.add('dice-rolled');
                 setTimeout(() => {
                     if (companionElements.diceResultDisplay) { // Verifica se ainda existe
                        companionElements.diceResultDisplay.classList.remove('dice-rolled');
                     }
                 }, 500);
                 console.log(`DEBUG: Mini Rolador companion: Rolou d${dieSize}. Resultado: ${roll}.`); // DEBUG
            });
        });
    }


    // --- EVENT LISTENERS PARA O INVENTÁRIO ---

    // Listener para o botão Salvar Inventário
    if (saveInventoryButton) {
         saveInventoryButton.addEventListener('click', saveCharacter); // Botão salvar inventário chama a função geral de salvar
         console.log("DEBUG: Listener anexado ao botão Salvar Inventário."); // DEBUG
    }

    // Listeners para os selects de imagem - quando o valor muda, atualiza a imagem
    const imageSelects = [
         characterFormFields.mainHandImageSelect,
         characterFormFields.armorImageSelect,
         characterFormFields.offHandImageSelect
    ];
    imageSelects.forEach(select => {
        if (select) {
             console.log("DEBUG: Anexando listener 'change' a select de imagem:", select.id); // DEBUG
             select.addEventListener('change', function() {
                 updateEquippedImage(this); // 'this' refere-se ao select que disparou o evento
                 // Opcional: Chamar saveCharacter() automaticamente aqui para salvar a imagem ao mudar
                 // setTimeout(saveCharacter, 500); // Pequeno delay para não salvar a cada mudança rápida
             });
        }
    });

    // Listeners para inputs e checkboxes do inventário equipado - Opcional, para salvar automaticamente ao mudar
    // Descomente se quiser salvamento automático no inventário
    /*
    const inventoryFieldsToWatch = [
        characterFormFields.mainHandName, characterFormFields.mainHandDescription, characterFormFields.mainHandActive,
        characterFormFields.offHandName, characterFormFields.offHandDescription, offHandActive,
        characterFormFields.armorName, characterFormFields.armorDescription, characterFormFields.armorBonusProf,
        characterFormFields.inventoryFullList
    ];
    inventoryFieldsToWatch.forEach(field => {
        if (field) {
            const eventType = field.type === 'checkbox' ? 'change' : 'input';
            console.log(`DEBUG: Anexando listener '${eventType}' a campo do inventário:`, field.id); // DEBUG
            field.addEventListener(eventType, function() {
                 // Pequeno delay para não salvar a cada letra digitada
                 setTimeout(saveCharacter, 500); // Salvar toda a ficha
            });
        }
    });
    */


    // --- LÓGICA DE INICIALIZAÇÃO (Executada quando o DOM está pronto) ---
    console.log("DEBUG: Iniciando character.js - Bloco de inicialização."); // DEBUG

    // 1. Popula os selects de imagem assim que o DOM estiver pronto
    // Isso deve ser feito ANTES de tentar carregar dados salvos que definiriam a opção selecionada
    populateImageSelects();


    // 2. Calcula stats derivados iniciais.
    // Isso usa os valores ATUAIS nos campos (que podem ser padrão do HTML ou vazios).
    // Será recalculado se houver dados salvos.
    calculateAllDerivedStats();
    console.log("DEBUG: Stats derivados iniciais calculados.");


    // 3. Tenta carregar um personagem existente do localStorage
    const initiallySavedDataString = localStorage.getItem(characterStorageKey);
    console.log("DEBUG: Tentando carregar dados iniciais do localStorage.");
    if (initiallySavedDataString) {
        try {
            const characterData = JSON.parse(initiallySavedDataString);
            console.log("DEBUG: Dados iniciais carregados do localStorage:", characterData);

            // Preenche TODOS os campos referenciados em characterFormFields (ficha e inventário)
            // O loop em loadCharacter já faz isso. Chamamos loadCharacter para processar e popular views.
            loadCharacter(); // loadCharacter já preenche campos, recalcula, e popula companion

        } catch (e) {
            console.error("DEBUG: Inicialização: Erro CRÍTICO ao parsear ou processar dados do localStorage:", e); // DEBUG ERRO
            alert('Erro ao carregar personagem salvo. Os dados podem estar corrompidos. Limpando dados salvos.');
            localStorage.removeItem(characterStorageKey); // Limpa dados corrompidos
            // Limpa a ficha e companion view se houver erro no carregamento
            clearCharacterSheet(); // Isso vai limpar tudo e popular views com null/vazio
            console.log("DEBUG: Ficha limpa devido a erro no carregamento inicial."); // DEBUG
        }
    } else {
        console.log("DEBUG: Nenhum dado inicial no localStorage encontrado."); // DEBUG
        // Se não houver dados salvos, garante que o companion mostre estado vazio
        // A ficha e inventário já estão no estado limpo/vazio por padrão no HTML.
        populateCompanionView(getEmptyCharacterDataForCompanion()); // Passa dados vazios baseados no HTML atual
        console.log("DEBUG: Companion view populado com dados vazios."); // DEBUG
    }

    console.log("DEBUG: --- Script character.js finalizado (síncrono) ---");


}); // Fim do DOMContentLoaded
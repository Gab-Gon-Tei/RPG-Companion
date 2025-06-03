// js/character.js
console.log("DEBUG: --- Iniciando script character.js ---"); // LOG GERAL 1

document.addEventListener('DOMContentLoaded', function() {
    console.log("DEBUG: DOMContentLoaded disparado em character.js"); // LOG GERAL 2

    // --- LISTA DE IMAGENS PREDEFINIDAS ---
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
    console.log("DEBUG: characterFormFields populado.", characterFormFields); // DEBUG 3


    // Spans para modificadores calculados (sem alteração)
    const attributeModifiersSpans = {
        strengthMod: document.getElementById('strengthMod'),
        dexterityMod: document.getElementById('dexterityMod'),
        constitutionMod: document.getElementById('constitutionMod'),
        intelligenceMod: document.getElementById('intelligenceMod'),
        wisdomMod: document.getElementById('wisdomMod'),
        charismaMod: document.getElementById('charismaMod'),
    };
     console.log("DEBUG: attributeModifiersSpans populado.", attributeModifiersSpans); // DEBUG 4

    // Spans para salvaguardas calculadas (sem alteração)
    const savingThrowModifiersSpans = {
        strSaveMod: document.getElementById('strSaveMod'),
        dexSaveMod: document.getElementById('dexSaveMod'),
        conSaveMod: document.getElementById('conSaveMod'),
        intSaveMod: document.getElementById('intSaveMod'),
        wisSaveMod: document.getElementById('wisSaveMod'),
        chaSaveMod: document.getElementById('chaSaveMod'),
    };
     console.log("DEBUG: savingThrowModifiersSpans populado.", savingThrowModifiersSpans); // DEBUG 5

    // Spans para perícias calculadas (sem alteração)
    const skillModifiersSpans = {
        acrobaticsMod: { span: document.getElementById('acrobaticsMod'), attr: 'dexterity' },
        animalHandlingMod: { span: document.getElementById('animalHandlingMod'), attr: 'wisdom' },
        arcanaMod: { span: document.getElementById('arcanaMod'), attr: 'intelligence' },
        athleticsMod: { span: document.getElementById('athleticsMod'), attr: 'strength' },
        deceptionMod: { span: document.getElementById('deceptionMod'), attr: 'charisma' },
        historyMod: { span: document.getElementById('historyMod'), attr: 'intelligence' },
        insightMod: { span: document.getElementById('insightMod'), attr: 'wisdom' },
        intimidationMod: { span: document.getElementById('intimidationMod'), attr: 'charisma' },
        investigationMod: { span: document('investigationMod'), attr: 'intelligence' }, // <-- Possível erro aqui! document() em vez de document.getElementById()
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
     console.log("DEBUG: skillModifiersSpans populado.", skillModifiersSpans); // DEBUG 6


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
     console.log("DEBUG: companionElements populado.", companionElements); // DEBUG 7


    // --- VARIÁVEIS DE CONTROLE (Botões da Ficha e Inventário) ---
    const saveButton = document.getElementById('saveCharacterButton'); // Botão salvar da ficha
    console.log("DEBUG: Save Character Button found:", saveButton); // DEBUG BOTÃO 1
    const loadButton = document.getElementById('loadCharacterButton'); // Botão carregar da ficha
    console.log("DEBUG: Load Character Button found:", loadButton); // DEBUG BOTÃO 2
    const newButton = document.getElementById('newCharacterButton'); // Botão novo da ficha
    console.log("DEBUG: New Character Button found:", newButton); // DEBUG BOTÃO 3

    const saveInventoryButton = document.getElementById('saveInventoryButton'); // NOVO botão salvar do inventário
    console.log("DEBUG: Save Inventory Button found:", saveInventoryButton); // DEBUG BOTÃO 4


    const characterStorageKey = 'rpgCompanion_characterData_dnd5e';
    // Variável para armazenar o estado atual do personagem para o companion e outras lógicas
    let currentCharacterData = null;


    // --- FUNÇÕES DE CÁLCULO ---
    function getAbilityModifier(score) { if (score === null || typeof score === 'undefined' || isNaN(score)) return 0; return Math.floor((score - 10) / 2); }
    function getProficiencyBonus(level) { if (isNaN(level) || level === null || level < 1) return 2; if (level >= 1 && level <= 4) return 2; if (level >= 5 && level <= 8) return 3; if (level >= 9 && level <= 12) return 4; if (level >= 13 && level <= 16) return 5; if (level >= 17 && level <= 20) return 6; return 2; }
    function getCharacterLevel() { if (!characterFormFields.charClassLevel || !characterFormFields.charClassLevel.value) return 1; const classLevelString = characterFormFields.charClassLevel.value; const match = classLevelString.match(/\d+$/) || classLevelString.match(/\d+/); return match ? parseInt(match[0]) : 1; }
    function updateAbilityModifiers() { const scores = { strength: characterFormFields.strengthScore ? parseInt(characterFormFields.strengthScore.value) : null, dexterity: characterFormFields.dexterityScore ? parseInt(characterFormFields.dexterityScore.value) : null, constitution: characterFormFields.constitutionScore ? parseInt(characterFormFields.constitutionScore.value) : null, intelligence: characterFormFields.intelligenceScore ? parseInt(characterFormFields.intelligenceScore.value) : null, wisdom: characterFormFields.wisdomScore ? parseInt(characterFormFields.wisdomScore.value) : null, charisma: characterFormFields.charismaScore ? parseInt(characterFormFields.charismaScore.value) : null, }; for (const attr in scores) { const modifier = getAbilityModifier(scores[attr]); const spanId = `${attr}Mod`; if (attributeModifiersSpans[spanId]) { attributeModifiersSpans[spanId].textContent = (modifier >= 0 ? '+' : '') + modifier; } } }
    function updateProficiencyBonus() { const level = getCharacterLevel(); const bonus = getProficiencyBonus(level); if (characterFormFields.proficiencyBonus) { characterFormFields.proficiencyBonus.value = bonus; } return bonus; }
    function updateSavingThrows() { const profBonus = characterFormFields.proficiencyBonus ? (parseInt(characterFormFields.proficiencyBonus.value) || 0) : 0; const attributes = ['str', 'dex', 'con', 'int', 'wis', 'cha']; const fullAttributeNames = { str: 'strength', dex: 'dexterity', con: 'constitution', int: 'intelligence', wis: 'wisdom', cha: 'charisma' }; attributes.forEach(shortAttr => { const fullAttr = fullAttributeNames[shortAttr]; const scoreInput = characterFormFields[`${fullAttr}Score`]; const score = scoreInput ? parseInt(scoreInput.value) : null; const attrMod = getAbilityModifier(score); const profCheckbox = characterFormFields[`${shortAttr}SaveProf`]; const isProficient = profCheckbox ? profCheckbox.checked : false; const totalMod = attrMod + (isProficient ? profBonus : 0); const modSpan = savingThrowModifiersSpans[`${shortAttr}SaveMod`]; if (modSpan) { modSpan.textContent = (totalMod >= 0 ? '+' : '') + totalMod; } }); }
    function updateSkills() { const profBonus = characterFormFields.proficiencyBonus ? (parseInt(characterFormFields.proficiencyBonus.value) || 0) : 0; for (const skillKey in skillModifiersSpans) { const skillInfo = skillModifiersSpans[skillKey]; const profCheckboxId = `${skillKey.replace('Mod', 'Prof')}`; const profCheckbox = characterFormFields[profCheckboxId]; const scoreInput = characterFormFields[`${skillInfo.attr}Score`]; const score = scoreInput ? parseInt(scoreInput.value) : null; const attrMod = getAbilityModifier(score); const isProficient = profCheckbox ? profCheckbox.checked : false; const totalMod = attrMod + (isProficient ? profBonus : 0); if (skillInfo.span) { skillInfo.span.textContent = (totalMod >= 0 ? '+' : '') + totalMod; } } }
    function updateInitiative() { const dexScore = characterFormFields.dexterityScore ? parseInt(characterFormFields.dexterityScore.value) : null; const dexMod = getAbilityModifier(dexScore); if (characterFormFields.initiative) { characterFormFields.initiative.value = (dexMod >= 0 ? '+' : '') + dexMod; } }
    function updatePassivePerception() { const profBonus = characterFormFields.proficiencyBonus ? (parseInt(characterFormFields.proficiencyBonus.value) || 0) : 0; const wisScore = characterFormFields.wisdomScore ? parseInt(characterFormFields.wisdomScore.value) : null; const wisMod = getAbilityModifier(wisScore); let perceptionModValue = wisMod; if (characterFormFields.perceptionProf && characterFormFields.perceptionProf.checked) { perceptionModValue += profBonus; } const passivePerception = 10 + perceptionModValue; if (characterFormFields.passiveWisdom) { characterFormFields.passiveWisdom.value = passivePerception; } }
    function calculateAllDerivedStats() { updateAbilityModifiers(); updateProficiencyBonus(); updateSavingThrows(); updateSkills(); updateInitiative(); updatePassivePerception(); }

    // --- FUNÇÕES DE INVENTÁRIO EQUIPADO ---

    function populateImageSelects() {
        console.log("DEBUG: populateImageSelects: Populando selects de imagem.");
        const selects = [
            characterFormFields.mainHandImageSelect,
            characterFormFields.armorImageSelect,
            characterFormFields.offHandImageSelect
        ];
        selects.forEach(select => {
            if (select) {
                select.innerHTML = '';
                predefinedImages.forEach(img => {
                    const option = document.createElement('option');
                    option.value = img.value;
                    option.textContent = img.text;
                     if (img.default) { option.selected = true; }
                    select.appendChild(option);
                });
                 select.dispatchEvent(new Event('change')); // Dispara o evento 'change' para atualizar a imagem inicial
            } else { console.warn("DEBUG: populateImageSelects: Elemento select de imagem não encontrado!"); }
        });
         console.log("DEBUG: populateImageSelects: Selects de imagem populados e imagens iniciais atualizadas.");
    }

    function updateEquippedImage(selectElement) {
        if (!selectElement) { console.warn("DEBUG: updateEquippedImage: Elemento select inválido recebido."); return; }
        const imageUrl = selectElement.value;
        const imageElementId = selectElement.id.replace('-select', '');
        const imageElement = document.getElementById(imageElementId);
        if (imageElement && imageElement.tagName === 'IMG') {
            imageElement.src = imageUrl || '';
            imageElement.alt = selectElement.options[selectElement.selectedIndex].text || selectElement.id.replace('-image-select', '');
            console.log(`DEBUG: updateEquippedImage: Imagem para ${imageElementId} atualizada para "${imageUrl}".`);
        } else { console.warn(`DEBUG: updateEquippedImage: Tag <img> com ID "${imageElementId}" não encontrada.`); }
    }


    // --- FUNÇÕES PRINCIPAIS (SALVAR/CARREGAR/LIMPAR) ---

    function saveCharacter() {
        console.log("DEBUG: saveCharacter function called."); // DEBUG FUNCTION CALL 1
        const characterData = {};
        for (const key in characterFormFields) {
            const field = characterFormFields[key];
            if (field) {
                if (field.type === 'checkbox') { characterData[key] = field.checked; }
                else if (field.tagName === 'SELECT') { characterData[key] = field.value; }
                else if (field.tagName === 'IMG') { /* Ignore <img> tag */ }
                else if (field.type === 'number' && field.readOnly) { characterData[key] = parseFloat(field.value) || 0; }
                else if (field.type === 'number') { characterData[key] = field.valueAsNumber === null || isNaN(field.valueAsNumber) ? "" : field.valueAsNumber; }
                else { characterData[key] = field.value; }
            } else { console.warn(`DEBUG: saveCharacter: Elemento HTML para a chave "${key}" não encontrado.`); }
        }
        localStorage.setItem(characterStorageKey, JSON.stringify(characterData));
        console.log("DEBUG: saveCharacter: Dados salvos:", characterData);
        alert('Personagem salvo com sucesso!');
    }

    function loadCharacter() {
        console.log("DEBUG: loadCharacter function called."); // DEBUG FUNCTION CALL 2
        const savedDataString = localStorage.getItem(characterStorageKey);
        if (savedDataString) {
            try {
                const characterData = JSON.parse(savedDataString);
                console.log("DEBUG: loadCharacter: Dados brutos carregados do localStorage:", characterData);
                for (const key in characterData) {
                    const field = characterFormFields[key];
                    if (field) {
                        if (field.type === 'checkbox') { field.checked = characterData[key]; }
                        else if (field.tagName === 'SELECT') { field.value = characterData[key]; if (field.classList.contains('image-selector')) { updateEquippedImage(field); } }
                        else if (field.tagName === 'IMG') { /* Ignore */ }
                        else { if (characterData[key] !== "" && characterData[key] !== null && typeof characterData[key] !== 'undefined') { field.value = characterData[key]; } else { field.value = ''; } }
                    } else { console.warn(`DEBUG: loadCharacter: Campo "${key}" encontrado nos dados salvos, mas elemento HTML correspondente não encontrado.`); }
                }
                calculateAllDerivedStats();
                console.log("DEBUG: loadCharacter: Stats derivados recalculados.");
                currentCharacterData = JSON.parse(JSON.stringify(characterData)); // Atualiza o objeto global
                console.log("DEBUG: loadCharacter: currentCharacterData atualizado:", currentCharacterData);
                populateCompanionView(characterData);
                console.log("DEBUG: loadCharacter: Companion view populado.");
                alert('Personagem carregado!');
                console.log("DEBUG: loadCharacter: Carregamento concluído com sucesso.");
            } catch (e) { console.error("DEBUG: loadCharacter: ERRO CRÍTICO ao parsear ou processar dados do localStorage:", e); alert('Erro ao carregar personagem salvo. Os dados podem estar corrompidos.'); clearCharacterSheet(); console.log("DEBUG: loadCharacter: Ficha limpa devido a erro no carregamento."); }
        } else { console.log("DEBUG: loadCharacter: Nenhum personagem salvo encontrado no localStorage."); populateCompanionView(null); alert('Nenhum personagem salvo encontrado.'); }
    }

    function clearCharacterSheet() {
        console.log("DEBUG: clearCharacterSheet function called."); // DEBUG FUNCTION CALL 3
        if (confirm("Tem certeza que deseja limpar todos os campos da ficha e inventário? Dados não salvos serão perdidos.")) {
            for (const key in characterFormFields) {
                const field = characterFormFields[key];
                if (field) {
                    if (!field.readOnly) {
                        if (field.type === 'checkbox') { field.checked = false; }
                        else if (field.tagName === 'SELECT') { field.selectedIndex = 0; if (field.classList.contains('image-selector')) { updateEquippedImage(field); } }
                        else if (field.tagName === 'IMG') { /* Ignore */ }
                        else { field.value = ''; }
                    }
                } else { console.warn(`DEBUG: clearCharacterSheet: Elemento HTML para a chave "${key}" não encontrado.`); }
            }
            calculateAllDerivedStats();
            console.log("DEBUG: clearCharacterSheet: Stats derivados recalculados.");
            const emptyCharacterData = getEmptyCharacterDataForCompanion();
            populateCompanionView(emptyCharacterData);
            console.log("DEBUG: clearCharacterSheet: Companion view populado com dados vazios.");
            alert('Ficha e Inventário limpos. Pronto para um novo personagem!');
            console.log("DEBUG: clearCharacterSheet: Limpeza concluída.");
        }
    }

    // --- FUNÇÕES DO COMPANION ---
    function populateCompanionView(characterData) {
         console.log("DEBUG: populateCompanionView: Chamada com characterData:", characterData);
         if (!characterData || Object.keys(characterData).length === 0) { console.log("DEBUG: populateCompanionView: Nenhum dado de personagem encontrado, mostrando statusDiv."); if (companionElements.statusDiv) companionElements.statusDiv.style.display = 'block'; if (companionElements.controlsDiv) companionElements.controlsDiv.style.display = 'none'; currentCharacterData = null; return; }
         console.log("DEBUG: populateCompanionView: Dados de personagem recebidos, mostrando controlsDiv.");
         if (companionElements.statusDiv) companionElements.statusDiv.style.display = 'none'; if (companionElements.controlsDiv) companionElements.controlsDiv.style.display = 'block';
         if (companionElements.charName && characterData) companionElements.charName.textContent = characterData.charName || "N/A";
         if (companionElements.ac && characterFormFields.armorClass) companionElements.ac.textContent = characterFormFields.armorClass.value || "--";
         if (companionElements.speed && characterFormFields.speed) companionElements.speed.textContent = characterFormFields.speed.value || "--";
         if (companionElements.initiative && characterFormFields.initiative) companionElements.initiative.textContent = characterFormFields.initiative.value || "--"; // Pega o calculado
         if (companionElements.maxHP && characterData) companionElements.maxHP.textContent = characterData.hpMax || 0;
         if (companionElements.currentHP && characterData) companionElements.currentHP.textContent = characterData.hpCurrent || 0;
         if (companionElements.tempHP && characterData) companionElements.tempHP.textContent = characterData.hpTemp || 0;
         if (companionElements.removeTempHpButton && characterData) companionElements.removeTempHpButton.style.display = (characterData.hpTemp && characterData.hpTemp > 0) ? 'inline-block' : 'none';
         if (companionElements.dsS1 && characterData) companionElements.dsS1.checked = characterData.deathSaveSuccess1 || false;
         if (companionElements.dsS2 && characterData) companionElements.dsS2.checked = characterData.deathSaveSuccess2 || false;
         if (companionElements.dsS3 && characterData) companionElements.dsS3.checked = characterData.deathSaveSuccess3 || false;
         if (companionElements.dsF1 && characterData) companionElements.dsF1.checked = characterData.deathSaveFail1 || false;
         if (companionElements.dsF2 && characterData) companionElements.dsF2.checked = characterData.deathSaveFail2 || false;
         if (companionElements.dsF3 && characterData) companionElements.dsF3.checked = characterData.deathSaveFail3 || false;
         if (companionElements.hitDiceTypeSpend && characterFormFields.hitDiceTotal) { companionElements.hitDiceTypeSpend.innerHTML = ''; const hitDiceString = characterFormFields.hitDiceTotal.value || ""; const diceTypes = new Set(); const diceRegex = /d(\d+)/g; let match; while((match = diceRegex.exec(hitDiceString)) !== null) { diceTypes.add(`d${match[1]}`); } if (diceTypes.size === 0) { diceTypes.add('d8'); } diceTypes.forEach(dtype => { const option = document.createElement('option'); option.value = dtype; option.textContent = dtype; companionElements.hitDiceTypeSpend.appendChild(option); }); if (companionElements.hitDiceTypeSpend.options.length === 0) { const defaultOption = document.createElement('option'); defaultOption.value = 'd8'; defaultOption.textContent = 'd8'; companionElements.hitDiceTypeSpend.appendChild(defaultOption); } } else if (companionElements.hitDiceTypeSpend) { companionElements.hitDiceTypeSpend.innerHTML = '<option value="d8">d8</option>'; }
         if (companionElements.diceResultDisplay) { companionElements.diceResultDisplay.textContent = '--'; }
         if (companionElements.hitDiceHealResult) { companionElements.hitDiceHealResult.textContent = ''; }
         console.log("DEBUG: populateCompanionView: View populada.");
    }
     function applyDamage() { if (!currentCharacterData || !companionElements.hpChangeValue || !companionElements.currentHP || !companionElements.tempHP) { console.warn("applyDamage: Elementos ou dados necessários não encontrados."); return; } const damage = parseInt(companionElements.hpChangeValue.value); if (isNaN(damage) || damage <= 0) { console.log("applyDamage: Valor de dano inválido."); return; } console.log(`DEBUG: applyDamage: Aplicando ${damage} de dano.`); let currentHp = parseInt(currentCharacterData.hpCurrent || 0); let tempHp = parseInt(currentCharacterData.hpTemp || 0); if (tempHp > 0) { if (damage <= tempHp) { tempHp -= damage; console.log(`DEBUG: applyDamage: Dano absorvido por PV Temp. PV Temp restantes: ${tempHp}.`); } else { const remainingDamage = damage - tempHp; console.log(`DEBUG: applyDamage: PV Temp esgotados (${tempHp}). Dano restante: ${remainingDamage}.`); currentHp -= remainingDamage; tempHp = 0; } } else { currentHp -= damage; console.log(`DEBUG: applyDamage: Dano direto. PV Atuais: ${currentHp}.`); } currentHp = Math.max(0, currentHp); currentCharacterData.hpCurrent = currentHp; currentCharacterData.hpTemp = tempHp; updateCompanionHPDisplay(); companionElements.hpChangeValue.value = ''; console.log(`DEBUG: applyDamage: Status final - PV Atuais: ${currentCharacterData.hpCurrent}, PV Temp: ${currentCharacterData.hpTemp}.`); }
    function applyHealing() { if (!currentCharacterData || !companionElements.hpChangeValue || !companionElements.currentHP || !companionElements.maxHP) { console.warn("applyHealing: Elementos ou dados necessários não encontrados."); return; } const healing = parseInt(companionElements.hpChangeValue.value); if (isNaN(healing) || healing <= 0) { console.log("applyHealing: Valor de cura inválido."); return; } console.log(`DEBUG: applyHealing: Aplicando ${healing} de cura.`); let currentHp = parseInt(currentCharacterData.hpCurrent || 0); const maxHp = parseInt(currentCharacterData.hpMax || 0); currentHp = Math.min(maxHp, currentHp + healing); console.log(`DEBUG: applyHealing: PV Atuais antes: ${currentCharacterData.hpCurrent}. PV Max: ${maxHp}. PV Atuais depois: ${currentHp}.`); currentCharacterData.hpCurrent = currentHp; updateCompanionHPDisplay(); companionElements.hpChangeValue.value = ''; }
    function addOrSetTempHP() { if (!currentCharacterData || !companionElements.tempHpValue) { console.warn("addOrSetTempHP: Elementos ou dados necessários não encontrados."); return; } const amount = parseInt(companionElements.tempHpValue.value); if (isNaN(amount) || amount < 0) { console.log("addOrSetTempHP: Valor de PV Temp inválido."); return; } console.log(`DEBUG: addOrSetTempHP: Definindo/Adicionando ${amount} PV Temp.`); const newTempHp = Math.max(currentCharacterData.hpTemp || 0, amount); if (newTempHp > (currentCharacterData.hpTemp || 0)) { currentCharacterData.hpTemp = newTempHp; console.log(`DEBUG: addOrSetTempHP: Novos PV Temp (${newTempHp}) são maiores ou iguais aos atuais. Definindo.`); } else { console.log(`DEBUG: addOrSetTempHP: Novos PV Temp (${amount}) são menores que os atuais (${currentCharacterData.hpTemp}). Mantendo atuais.`); } updateCompanionHPDisplay(); companionElements.tempHpValue.value = ''; }
    function removeTempHP() { if (!currentCharacterData) { console.warn("removeTempHP: currentCharacterData é nulo."); return; } console.log("DEBUG: removeTempHP: Removendo todos os PV Temp."); currentCharacterData.hpTemp = 0; updateCompanionHPDisplay(); }
    function updateCompanionHPDisplay() { if (!currentCharacterData || !companionElements.currentHP || !companionElements.tempHP || !companionElements.removeTempHpButton) { console.warn("DEBUG: updateCompanionHPDisplay: Elementos do companion não encontrados para atualizar display."); return; } companionElements.currentHP.textContent = currentCharacterData.hpCurrent || 0; companionElements.tempHP.textContent = currentCharacterData.tempHP || 0; companionElements.removeTempHpButton.style.display = (currentCharacterData.tempHP && currentCharacterData.tempHP > 0) ? 'inline-block' : 'none'; console.log(`DEBUG: updateCompanionHPDisplay: Display atualizado - PV Atuais: ${currentCharacterData.currentHP}, PV Temp: ${currentCharacterData.tempHP}.`); }
    function spendHitDice() { if (!currentCharacterData || !companionElements.hitDiceToSpend || !companionElements.hitDiceTypeSpend || !companionElements.hitDiceHealResult || !characterFormFields.constitutionScore) { console.warn("DEBUG: spendHitDice: Elementos ou dados necessários não encontrados."); return; } const numDiceToSpend = parseInt(companionElements.hitDiceToSpend.value); const diceTypeString = companionElements.hitDiceTypeSpend.value; const conScore = parseInt(characterFormFields.constitutionScore.value) || 10; const conMod = getAbilityModifier(conScore); if (isNaN(numDiceToSpend) || numDiceToSpend <= 0 || !diceTypeString) { alert("Por favor, insira um número válido de dados e selecione um tipo."); console.log("DEBUG: spendHitDice: Input de dados ou tipo inválido."); return; } console.log(`DEBUG: spendHitDice: Gastando ${numDiceToSpend}${diceTypeString}. CON Mod: ${conMod}.`); let totalHealed = 0; const diceSize = parseInt(diceTypeString.substring(1)); if (isNaN(diceSize) || diceSize <= 0) { alert("Tipo de dado de vida inválido selecionado."); console.warn(`DEBUG: spendHitDice: Tipo de dado inválido: ${diceTypeString}.`); return; } for (let i = 0; i < numDiceToSpend; i++) { const roll = Math.floor(Math.random() * diceSize) + 1; totalHealed += Math.max(1, roll + conMod); console.log(`DEBUG: spendHitDice: Rolagem individual ${i+1}: ${roll} + ${conMod} = ${roll + conMod} (min 1)`); } console.log(`DEBUG: spendHitDice: Total curado antes de aplicar: ${totalHealed} PV.`); companionElements.hitDiceHealResult.textContent = `+${totalHealed}`; let currentHp = parseInt(currentCharacterData.currentHP || 0); const maxHp = parseInt(currentCharacterData.hpMax || 0); currentHp = Math.min(maxHp, currentHp + totalHealed); console.log(`DEBUG: spendHitDice: PV Atuais antes: ${currentCharacterData.currentHP}. PV Max: ${maxHp}. PV Atuais depois: ${currentHp}.`); currentCharacterData.currentHP = currentHp; updateCompanionHPDisplay(); alert(`Você gastou ${numDiceToSpend}${diceTypeString} e recuperou ${totalHealed} PV. (Lógica de contagem de dados de vida restantes ainda pendente)`); }
    function saveCompanionChangesToMainSheet() {
        console.log("DEBUG: saveCompanionChangesToMainSheet: Chamada."); // DEBUG FUNCTION CALL 4
        if (!currentCharacterData) { alert("Nenhum personagem ativo no companion para salvar mudanças."); console.warn("DEBUG: saveCompanionChangesToMainSheet: currentCharacterData é nulo. Não foi possível sincronizar."); return; }
        console.log("DEBUG: saveCompanionChangesToMainSheet: Sincronizando dados do companion para a ficha principal.");
        if (characterFormFields.hpCurrent && currentCharacterData.hpCurrent !== undefined) characterFormFields.hpCurrent.value = currentCharacterData.hpCurrent;
        if (characterFormFields.hpTemp && currentCharacterData.hpTemp !== undefined) characterFormFields.hpTemp.value = currentCharacterData.hpTemp;
        if (characterFormFields.deathSaveSuccess1 && companionElements.dsS1) characterFormFields.deathSaveSuccess1.checked = companionElements.dsS1.checked;
        if (characterFormFields.deathSaveSuccess2 && companionElements.dsS2) characterFormFields.deathSaveSuccess2.checked = companionElements.dsS2.checked;
        if (characterFormFields.deathSaveSuccess3 && companionElements.dsS3) characterFormFields.deathSaveSuccess3.checked = companionElements.dsS3.checked;
        if (characterFormFields.deathSaveFail1 && companionElements.dsF1) characterFormFields.deathSaveFail1.checked = companionElements.dsF1.checked;
        if (characterFormFields.deathSaveFail2 && companionElements.dsF2) characterFormFields.deathSaveFail2.checked = companionElements.dsF2.checked;
        if (characterFormFields.deathSaveFail3 && companionElements.dsF3) characterFormFields.deathSaveFail3.checked = companionElements.dsF3.checked;
        saveCharacter(); // Salva toda a ficha (incluindo inventário)
        console.log("DEBUG: saveCompanionChangesToMainSheet: Sincronização completa e salvamento realizado.");
    }
     function getEmptyCharacterDataForCompanion() {
        console.log("DEBUG: getEmptyCharacterDataForCompanion: Gerando dados vazios para companion.");
        const emptyData = {}; const fieldsToResetForCompanion = ['charName', 'armorClass', 'speed', 'hpMax', 'hpCurrent', 'hpTemp', 'hitDiceTotal', 'hitDiceCurrent', 'deathSaveSuccess1', 'deathSaveSuccess2', 'deathSaveSuccess3', 'deathSaveFail1', 'deathSaveFail2', 'deathSaveFail3']; fieldsToResetForCompanion.forEach(key => { const field = characterFormFields[key]; if (field) { if (field.type === 'checkbox') emptyData[key] = field.checked; else if (field.type === 'number') emptyData[key] = field.valueAsNumber || 0; else if (field.tagName === 'SELECT') emptyData[key] = field.value || ''; else emptyData[key] = field.value || ''; } else { console.warn(`DEBUG: getEmptyCharacterDataForCompanion: Campo "${key}" esperado pelo companion não encontrado em characterFormFields.`); if (key.includes('deathSave')) emptyData[key] = false; else if (key.includes('hp') || key === 'armorClass') emptyData[key] = 0; else emptyData[key] = ""; } });
        if (characterFormFields.initiative) emptyData.initiative = characterFormFields.initiative.value || "--"; else emptyData.initiative = "--";
        if (characterFormFields.armorClass) emptyData.armorClass = characterFormFields.armorClass.value || "--"; else emptyData.armorClass = "--";
        if (characterFormFields.speed) emptyData.speed = characterFormFields.speed.value || "--"; else emptyData.speed = "--";
        if (characterFormFields.hitDiceTotal) emptyData.hitDiceTotal = characterFormFields.hitDiceTotal.value || "N/A"; else emptyData.hitDiceTotal = "N/A";
        console.log("DEBUG: getEmptyCharacterDataForCompanion: Dados vazios gerados:", emptyData);
        return emptyData;
    }


    // --- ANEXAÇÃO DE EVENT LISTENERS ---
    console.log("DEBUG: Anexando Event Listeners..."); // DEBUG LISTENERS 1

    // Listeners para cálculos automáticos na Ficha (quando inputs mudam)
    ['strengthScore', 'dexterityScore', 'constitutionScore', 'intelligenceScore', 'wisdomScore', 'charismaScore'].forEach(id => {
        if (characterFormFields[id]) {
             console.log(`DEBUG: Anexando listener 'input' a ${id}`); // DEBUG LISTENERS
            characterFormFields[id].addEventListener('input', calculateAllDerivedStats);
        }
    });
    if (characterFormFields.charClassLevel) {
         console.log(`DEBUG: Anexando listener 'input' a charClassLevel`); // DEBUG LISTENERS
        characterFormFields.charClassLevel.addEventListener('input', calculateAllDerivedStats);
    }
    document.querySelectorAll('.prof-checkbox').forEach(checkbox => {
         console.log(`DEBUG: Anexando listener 'change' a checkbox proficiencia`); // DEBUG LISTENERS
        checkbox.addEventListener('change', calculateAllDerivedStats);
    });


    // Listeners para botões da Ficha (Salvar, Carregar, Novo)
    console.log("DEBUG: Anexando listeners a botões da Ficha."); // DEBUG LISTENERS 2
    if (saveButton) {
        saveButton.addEventListener('click', saveCharacter);
        console.log("DEBUG: Listener anexado ao botão Salvar Personagem."); // DEBUG LISTENERS 3
    } else { console.warn("DEBUG: Botão Salvar Personagem não encontrado."); }

    if (loadButton) {
        loadButton.addEventListener('click', loadCharacter);
         console.log("DEBUG: Listener anexado ao botão Carregar Personagem."); // DEBUG LISTENERS 4
    } else { console.warn("DEBUG: Botão Carregar Personagem não encontrado."); }

    if (newButton) {
        newButton.addEventListener('click', clearCharacterSheet);
         console.log("DEBUG: Listener anexado ao botão Novo Personagem."); // DEBUG LISTENERS 5
    } else { console.warn("DEBUG: Botão Novo Personagem não encontrado."); }


    // Listeners para o Companion
    console.log("DEBUG: Anexando listeners do Companion."); // DEBUG LISTENERS 6
     if (companionElements.applyDamageButton) companionElements.applyDamageButton.addEventListener('click', applyDamage); else console.warn("DEBUG: Botão applyDamageButton não encontrado.");
     if (companionElements.applyHealingButton) companionElements.applyHealingButton.addEventListener('click', applyHealing); else console.warn("DEBUG: Botão applyHealingButton não encontrado.");
     if (companionElements.addTempHpButton) companionElements.addTempHpButton.addEventListener('click', addOrSetTempHP); else console.warn("DEBUG: Botão addTempHpButton não encontrado.");
     if (companionElements.removeTempHpButton) companionElements.removeTempHpButton.addEventListener('click', removeTempHP); else console.warn("DEBUG: Botão removeTempHpButton não encontrado.");
     if (companionElements.spendHitDiceButton) companionElements.spendHitDiceButton.addEventListener('click', spendHitDice); else console.warn("DEBUG: Botão spendHitDiceButton não encontrado.");
     if (companionElements.saveCompanionChangesButton) companionElements.saveCompanionChangesButton.addEventListener('click', saveCompanionChangesToMainSheet); else console.warn("DEBUG: Botão saveCompanionChangesButton não encontrado.");

    document.querySelectorAll('.comp-ds').forEach(cb => {
         console.log("DEBUG: Anexando listener 'change' a checkbox de Death Save."); // DEBUG LISTENERS
         cb.addEventListener('change', function() {
             if (currentCharacterData) {
                 const key = this.id.replace('comp', '');
                 const dataKey = key.charAt(0).toLowerCase() + key.slice(1);
                 if (typeof currentCharacterData[dataKey] !== 'undefined') { currentCharacterData[dataKey] = this.checked; console.log(`DEBUG: Companion Death Save "${dataKey}" mudado para ${this.checked}. Sincronizado internamente.`); }
                 else { console.warn(`DEBUG: Tentou sincronizar chave de death save inexistente no currentCharacterData: "${dataKey}"`); }
             } else { console.warn("DEBUG: Companion Death Save mudado, mas nenhum personagem carregado para sincronizar."); }
         });
     });

     if (companionElements.diceButtons) {
         console.log("DEBUG: Anexando listeners aos botões de dado do mini rolador."); // DEBUG LISTENERS
        companionElements.diceButtons.forEach(button => {
            button.addEventListener('click', function(event) {
                 const dieType = event.target.dataset.die; if (!dieType || !companionElements.diceResultDisplay) return; const dieSize = parseInt(dieType); const roll = Math.floor(Math.random() * dieSize) + 1; companionElements.diceResultDisplay.textContent = roll; companionElements.diceResultDisplay.classList.add('dice-rolled'); setTimeout(() => { if (companionElements.diceResultDisplay) { companionElements.diceResultDisplay.classList.remove('dice-rolled'); } }, 500); console.log(`DEBUG: Mini Rolador companion: Rolou d${dieSize}. Resultado: ${roll}.`);
            });
        });
    } else { console.warn("DEBUG: Botões de dado do mini rolador não encontrados."); }


    // Listeners para o Inventário
    console.log("DEBUG: Anexando listeners do Inventário."); // DEBUG LISTENERS 7

    // Listener para o botão Salvar Inventário
    if (saveInventoryButton) {
         saveInventoryButton.addEventListener('click', saveCharacter);
         console.log("DEBUG: Listener anexado ao botão Salvar Inventário."); // DEBUG LISTENERS 8
    } else { console.warn("DEBUG: Botão Salvar Inventário não encontrado."); }

    // Listeners para os selects de imagem - quando o valor muda, atualiza a imagem
    const imageSelects = [
         characterFormFields.mainHandImageSelect,
         characterFormFields.armorImageSelect,
         characterFormFields.offHandImageSelect
    ];
    imageSelects.forEach(select => {
        if (select) {
             console.log("DEBUG: Anexando listener 'change' a select de imagem:", select.id); // DEBUG LISTENERS
             select.addEventListener('change', function() {
                 updateEquippedImage(this);
             });
        }
    });
    console.log("DEBUG: Listeners de selects de imagem anexados."); // DEBUG LISTENERS 9


    // --- LÓGICA DE INICIALIZAÇÃO (Executada quando o DOM está pronto) ---
    console.log("DEBUG: Iniciando character.js - Bloco de inicialização."); // DEBUG INIT 1

    // 1. Popula os selects de imagem assim que o DOM estiver pronto
    populateImageSelects();
    console.log("DEBUG: populateImageSelects chamado."); // DEBUG INIT 2

    // 2. Calcula stats derivados iniciais.
    calculateAllDerivedStats();
    console.log("DEBUG: calculateAllDerivedStats inicial chamado."); // DEBUG INIT 3


    // 3. Tenta carregar um personagem existente do localStorage
    const initiallySavedDataString = localStorage.getItem(characterStorageKey);
    console.log("DEBUG: Tentando carregar dados iniciais do localStorage."); // DEBUG INIT 4
    if (initiallySavedDataString) {
        try {
            const characterData = JSON.parse(initiallySavedDataString);
            console.log("DEBUG: Dados iniciais carregados do localStorage:", characterData); // DEBUG INIT 5
            // Chama loadCharacter para processar esses dados
            loadCharacter(); // loadCharacter já preenche campos, recalcula, e popula companion
             console.log("DEBUG: loadCharacter chamado na inicialização."); // DEBUG INIT 6

        } catch (e) {
            console.error("DEBUG: Inicialização: Erro CRÍTICO ao parsear ou processar dados do localStorage:", e); // DEBUG ERRO INIT
            alert('Erro ao carregar personagem salvo. Os dados podem estar corrompidos. Limpando dados salvos.');
            localStorage.removeItem(characterStorageKey); // Limpa dados corrompidos
            clearCharacterSheet(); // Limpa a ficha e companion view
            console.log("DEBUG: clearCharacterSheet chamado devido a erro na inicialização."); // DEBUG INIT 7
        }
    } else {
        console.log("DEBUG: Nenhum dado inicial no localStorage encontrado."); // DEBUG INIT 8
        // Se não houver dados salvos, garante que o companion mostre estado vazio
        populateCompanionView(getEmptyCharacterDataForCompanion()); // Popula Companion com dados vazios baseados no HTML atual
         console.log("DEBUG: populateCompanionView com dados vazios chamado na inicialização."); // DEBUG INIT 9
    }

    console.log("DEBUG: --- Script character.js finalizado (síncrono) ---"); // LOG GERAL 3


}); // Fim do DOMContentLoaded
console.log("DEBUG: --- Fim da declaração do listener DOMContentLoaded em character.js ---"); // LOG GERAL 4
document.addEventListener('DOMContentLoaded', function() {
    // ... (characterFormFields, attributeModifiersSpans, savingThrowModifiersSpans, skillModifiersSpans - sem alterações) ...
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

        // Salvaguardas (checkboxes e modificadores)
        strSaveProf: document.getElementById('strSaveProf'),
        dexSaveProf: document.getElementById('dexSaveProf'),
        conSaveProf: document.getElementById('conSaveProf'),
        intSaveProf: document.getElementById('intSaveProf'),
        wisSaveProf: document.getElementById('wisSaveProf'),
        chaSaveProf: document.getElementById('chaSaveProf'),

        // Perícias (checkboxes)
        acrobaticsProf: document.getElementById('acrobaticsProf'),
        animalHandlingProf: document.getElementById('animalHandlingProf'),
        arcanaProf: document.getElementById('arcanaProf'),
        athleticsProf: document.getElementById('athleticsProf'),
        deceptionProf: document.getElementById('deceptionProf'),
        historyProf: document.getElementById('historyProf'),
        insightProf: document.getElementById('insightProf'),
        intimidationProf: document.getElementById('intimidationProf'),
        investigationProf: document.getElementById('investigationProf'),
        medicineProf: document.getElementById('medicineProf'),
        natureProf: document.getElementById('natureProf'),
        perceptionProf: document.getElementById('perceptionProf'),
        performanceProf: document.getElementById('performanceProf'),
        persuasionProf: document.getElementById('persuasionProf'),
        religionProf: document.getElementById('religionProf'),
        sleightOfHandProf: document.getElementById('sleightOfHandProf'),
        stealthProf: document.getElementById('stealthProf'),
        survivalProf: document.getElementById('survivalProf'),

        passiveWisdom: document.getElementById('passiveWisdom'),
        armorClass: document.getElementById('armorClass'),
        initiative: document.getElementById('initiative'),
        speed: document.getElementById('speed'),

        hpMax: document.getElementById('hpMax'),
        hpCurrent: document.getElementById('hpCurrent'),
        hpTemp: document.getElementById('hpTemp'),

        hitDiceTotal: document.getElementById('hitDiceTotal'),
        hitDiceCurrent: document.getElementById('hitDiceCurrent'),
        deathSaveSuccess1: document.querySelector('input[name="deathSaveSuccess1"]'),
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
        cp: document.getElementById('cp'),
        sp: document.getElementById('sp'),
        ep: document.getElementById('ep'),
        gp: document.getElementById('gp'),
        pp: document.getElementById('pp'),
        equipmentList: document.getElementById('equipmentList'),
    };

    const attributeModifiersSpans = {
        strengthMod: document.getElementById('strengthMod'),
        dexterityMod: document.getElementById('dexterityMod'),
        constitutionMod: document.getElementById('constitutionMod'),
        intelligenceMod: document.getElementById('intelligenceMod'),
        wisdomMod: document.getElementById('wisdomMod'),
        charismaMod: document.getElementById('charismaMod'),
    };

    const savingThrowModifiersSpans = {
        strSaveMod: document.getElementById('strSaveMod'),
        dexSaveMod: document.getElementById('dexSaveMod'),
        conSaveMod: document.getElementById('conSaveMod'),
        intSaveMod: document.getElementById('intSaveMod'),
        wisSaveMod: document.getElementById('wisSaveMod'),
        chaSaveMod: document.getElementById('chaSaveMod'),
    };

    const skillModifiersSpans = {
        acrobaticsMod: { span: document.getElementById('acrobaticsMod'), attr: 'dexterity' },
        animalHandlingMod: { span: document.getElementById('animalHandlingMod'), attr: 'wisdom' },
        arcanaMod: { span: document.getElementById('arcanaMod'), attr: 'intelligence' },
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

    // CORREÇÃO 1 e 2: Atualizar IDs e remover referências a elementos inexistentes
    const companionElements = {
        statusDiv: document.getElementById('companionStatus'),
        controlsDiv: document.getElementById('companionControls'),
        // Top Bar
        charName: document.getElementById('companionTopName'), // ID CORRETO
        ac: document.getElementById('companionTopAC'),         // ID CORRETO
        speed: document.getElementById('companionTopSpeed'),     // ID CORRETO
        // Status Central
        currentHP: document.getElementById('companionCurrentHP'),
        maxHP: document.getElementById('companionMaxHP'),
        tempHP: document.getElementById('companionTempHP'),
        // Ações HP/Temp
        hpChangeValue: document.getElementById('hpChangeValue'),
        applyDamageButton: document.getElementById('applyDamageButton'),
        applyHealingButton: document.getElementById('applyHealingButton'),
        tempHpValue: document.getElementById('tempHpValue'),
        addTempHpButton: document.getElementById('addTempHpButton'),
        removeTempHpButton: document.getElementById('removeTempHpButton'),
        // Ações DV
        // hitDiceTotal: document.getElementById('companionHitDiceTotal'), // REMOVIDO (Elemento não existe mais no companion)
        // hitDiceCurrent: document.getElementById('companionHitDiceCurrent'), // REMOVIDO (Elemento não existe mais no companion)
        hitDiceToSpend: document.getElementById('hitDiceToSpend'),
        hitDiceTypeSpend: document.getElementById('hitDiceTypeSpend'),
        spendHitDiceButton: document.getElementById('spendHitDiceButton'),
        hitDiceHealResult: document.getElementById('hitDiceHealResult'),
        // Death Saves
        dsS1: document.getElementById('compDeathSaveSuccess1'),
        dsS2: document.getElementById('compDeathSaveSuccess2'),
        dsS3: document.getElementById('compDeathSaveSuccess3'),
        dsF1: document.getElementById('compDeathSaveFail1'),
        dsF2: document.getElementById('compDeathSaveFail2'),
        dsF3: document.getElementById('compDeathSaveFail3'),
        // Mini Rolador
        diceResultDisplay: document.getElementById('companionDiceResult'),
        diceButtons: document.querySelectorAll('.comp-dice-button'),
        // Salvar
        saveCompanionChangesButton: document.getElementById('saveCompanionChangesButton'),
    };

    const saveButton = document.getElementById('saveCharacterButton');
    const loadButton = document.getElementById('loadCharacterButton');
    const newButton = document.getElementById('newCharacterButton');
    const characterStorageKey = 'rpgCompanion_characterData_dnd5e';
    let currentCharacterForCompanion = null;

    // --- Funções de Cálculo (getAbilityModifier, getProficiencyBonus, etc.) ---
    // ... (sem alterações nessas funções) ...
     function getAbilityModifier(score) {
        if (score === null || typeof score === 'undefined' || isNaN(score)) return 0;
        return Math.floor((score - 10) / 2);
    }

    function getProficiencyBonus(level) {
        if (isNaN(level) || level === null || level < 1) return 2;
        if (level >= 1 && level <= 4) return 2;
        if (level >= 5 && level <= 8) return 3;
        if (level >= 9 && level <= 12) return 4;
        if (level >= 13 && level <= 16) return 5;
        if (level >= 17 && level <= 20) return 6;
        return 2;
    }

    function getCharacterLevel() {
        if (!characterFormFields.charClassLevel || !characterFormFields.charClassLevel.value) return 1;
        const classLevelString = characterFormFields.charClassLevel.value;
        const match = classLevelString.match(/\d+$/) || classLevelString.match(/\d+/);
        return match ? parseInt(match[0]) : 1;
    }

    function updateAbilityModifiers() {
        const scores = {
            strength: characterFormFields.strengthScore ? parseInt(characterFormFields.strengthScore.value) : null,
            dexterity: characterFormFields.dexterityScore ? parseInt(characterFormFields.dexterityScore.value) : null,
            constitution: characterFormFields.constitutionScore ? parseInt(characterFormFields.constitutionScore.value) : null,
            intelligence: characterFormFields.intelligenceScore ? parseInt(characterFormFields.intelligenceScore.value) : null,
            wisdom: characterFormFields.wisdomScore ? parseInt(characterFormFields.wisdomScore.value) : null,
            charisma: characterFormFields.charismaScore ? parseInt(characterFormFields.charismaScore.value) : null,
        };
        for (const attr in scores) {
            const modifier = getAbilityModifier(scores[attr]);
            const spanId = `${attr}Mod`;
            if (attributeModifiersSpans[spanId]) {
                attributeModifiersSpans[spanId].textContent = (modifier >= 0 ? '+' : '') + modifier;
            }
        }
    }

    function updateProficiencyBonus() {
        const level = getCharacterLevel();
        const bonus = getProficiencyBonus(level);
        if (characterFormFields.proficiencyBonus) {
            characterFormFields.proficiencyBonus.value = bonus;
        }
        return bonus;
    }

    function updateSavingThrows() {
        const profBonus = characterFormFields.proficiencyBonus ? (parseInt(characterFormFields.proficiencyBonus.value) || 0) : 0;
        const attributes = ['str', 'dex', 'con', 'int', 'wis', 'cha'];
        const fullAttributeNames = { str: 'strength', dex: 'dexterity', con: 'constitution', int: 'intelligence', wis: 'wisdom', cha: 'charisma' };

        attributes.forEach(shortAttr => {
            const fullAttr = fullAttributeNames[shortAttr];
            const scoreInput = characterFormFields[`${fullAttr}Score`];
            const score = scoreInput ? parseInt(scoreInput.value) : null;
            const attrMod = getAbilityModifier(score);
            const profCheckbox = characterFormFields[`${shortAttr}SaveProf`];
            const isProficient = profCheckbox ? profCheckbox.checked : false;
            const totalMod = attrMod + (isProficient ? profBonus : 0);
            const modSpan = savingThrowModifiersSpans[`${shortAttr}SaveMod`];
            if (modSpan) {
                modSpan.textContent = (totalMod >= 0 ? '+' : '') + totalMod;
            }
        });
    }

    function updateSkills() {
        const profBonus = characterFormFields.proficiencyBonus ? (parseInt(characterFormFields.proficiencyBonus.value) || 0) : 0;
        for (const skillKey in skillModifiersSpans) {
            const skillInfo = skillModifiersSpans[skillKey];
            const profCheckboxId = `${skillKey.replace('Mod', 'Prof')}`;
            const profCheckbox = characterFormFields[profCheckboxId];
            const scoreInput = characterFormFields[`${skillInfo.attr}Score`];
            const score = scoreInput ? parseInt(scoreInput.value) : null;
            const attrMod = getAbilityModifier(score);
            const isProficient = profCheckbox ? profCheckbox.checked : false;
            const totalMod = attrMod + (isProficient ? profBonus : 0);
            if (skillInfo.span) {
                skillInfo.span.textContent = (totalMod >= 0 ? '+' : '') + totalMod;
            }
        }
    }

    function updateInitiative() {
        const dexScore = characterFormFields.dexterityScore ? parseInt(characterFormFields.dexterityScore.value) : null;
        const dexMod = getAbilityModifier(dexScore);
        if (characterFormFields.initiative) {
            characterFormFields.initiative.value = (dexMod >= 0 ? '+' : '') + dexMod;
        }
    }

    function updatePassivePerception() {
        const profBonus = characterFormFields.proficiencyBonus ? (parseInt(characterFormFields.proficiencyBonus.value) || 0) : 0;
        const wisScore = characterFormFields.wisdomScore ? parseInt(characterFormFields.wisdomScore.value) : null;
        const wisMod = getAbilityModifier(wisScore);
        let perceptionModValue = wisMod;
        if (characterFormFields.perceptionProf && characterFormFields.perceptionProf.checked) {
            perceptionModValue += profBonus;
        }
        const passivePerception = 10 + perceptionModValue;
        if (characterFormFields.passiveWisdom) {
            characterFormFields.passiveWisdom.value = passivePerception;
        }
    }

    function calculateAllDerivedStats() {
        updateAbilityModifiers();
        updateProficiencyBonus();
        updateSavingThrows();
        updateSkills();
        updateInitiative();
        updatePassivePerception();
    }

    // --- Funções Principais (save, load, clear) ---
     function saveCharacter() {
        const characterData = {};
        for (const key in characterFormFields) {
            const field = characterFormFields[key];
            if (field) {
                if (field.type === 'checkbox') {
                    characterData[key] = field.checked;
                } else if (field.type === 'number' && field.readOnly) {
                    characterData[key] = parseFloat(field.value) || 0;
                } else if (field.type === 'number') {
                    characterData[key] = field.valueAsNumber === null || isNaN(field.valueAsNumber) ? "" : field.valueAsNumber;
                } else {
                    characterData[key] = field.value;
                }
            }
        }
        localStorage.setItem(characterStorageKey, JSON.stringify(characterData));
        alert('Personagem salvo com sucesso!');
        console.log("Dados Salvos:", characterData);
    }

    function loadCharacter() {
        const savedDataString = localStorage.getItem(characterStorageKey);
        if (savedDataString) {
            const characterData = JSON.parse(savedDataString);
            console.log("Dados Carregados:", characterData);
            for (const key in characterData) {
                const field = characterFormFields[key];
                if (field) {
                    if (field.type === 'checkbox') {
                        field.checked = characterData[key];
                    } else {
                        if (field.type === 'number' && (characterData[key] === "" || characterData[key] === null || typeof characterData[key] === 'undefined')) {
                            field.value = '';
                        } else {
                           field.value = characterData[key];
                        }
                    }
                }
            }
            calculateAllDerivedStats();
            populateCompanionView(characterData);
            alert('Personagem carregado!');
        } else {
            populateCompanionView(null);
            alert('Nenhum personagem salvo encontrado.');
        }
    }

    function clearCharacterSheet() {
        if (confirm("Tem certeza que deseja limpar todos os campos da ficha? Dados não salvos serão perdidos.")) {
            for (const key in characterFormFields) {
                const field = characterFormFields[key];
                if (field && !field.readOnly) {
                    if (field.type === 'checkbox') {
                        field.checked = false;
                    } else {
                        field.value = '';
                    }
                }
            }
            calculateAllDerivedStats();
            const emptyCharacterData = getEmptyCharacterDataForCompanion();
            populateCompanionView(emptyCharacterData);
            alert('Ficha limpa. Pronto para um novo personagem!');
        }
    }

    // --- Anexação de Event Listeners (Ficha Principal) ---
    ['strengthScore', 'dexterityScore', 'constitutionScore', 'intelligenceScore', 'wisdomScore', 'charismaScore'].forEach(id => {
        if (characterFormFields[id]) {
            characterFormFields[id].addEventListener('input', calculateAllDerivedStats);
        }
    });
    if (characterFormFields.charClassLevel) {
        characterFormFields.charClassLevel.addEventListener('input', calculateAllDerivedStats);
    }
    document.querySelectorAll('.prof-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', calculateAllDerivedStats);
    });

    if (saveButton) saveButton.addEventListener('click', saveCharacter);
    if (loadButton) loadButton.addEventListener('click', loadCharacter);
    if (newButton) newButton.addEventListener('click', clearCharacterSheet);


    // --- Funções do Companion ---

    // CORREÇÃO: Remover acesso a elementos inexistentes
    function populateCompanionView(characterData) {
        console.log("populateCompanionView chamada com characterData:", characterData)

        if (!characterData || Object.keys(characterData).length === 0) {
            console.log("Nenhum dado de personagem encontrado, mostrando statusDiv.");
            if (companionElements.statusDiv) companionElements.statusDiv.style.display = 'block';
            if (companionElements.controlsDiv) companionElements.controlsDiv.style.display = 'none';
            currentCharacterForCompanion = null;
            return;
        }
        console.log("Dados de personagem recebidos, mostrando controlsDiv.");
        if (companionElements.statusDiv) companionElements.statusDiv.style.display = 'none';
        if (companionElements.controlsDiv) companionElements.controlsDiv.style.display = 'block';

        currentCharacterForCompanion = JSON.parse(JSON.stringify(characterData));

        // Usar os elementos corretos de companionElements
        if (companionElements.charName) companionElements.charName.textContent = currentCharacterForCompanion.charName || "N/A";
        if (companionElements.ac) companionElements.ac.textContent = currentCharacterForCompanion.armorClass || "--";
        if (companionElements.speed) companionElements.speed.textContent = currentCharacterForCompanion.speed || "--";
        if (companionElements.maxHP) companionElements.maxHP.textContent = currentCharacterForCompanion.hpMax || 0;
        if (companionElements.currentHP) companionElements.currentHP.textContent = currentCharacterForCompanion.hpCurrent || 0;
        if (companionElements.tempHP) companionElements.tempHP.textContent = currentCharacterForCompanion.hpTemp || 0;
        if (companionElements.removeTempHpButton) companionElements.removeTempHpButton.style.display = (currentCharacterForCompanion.hpTemp && currentCharacterForCompanion.hpTemp > 0) ? 'inline-block' : 'none';

        if (companionElements.dsS1) companionElements.dsS1.checked = currentCharacterForCompanion.deathSaveSuccess1 || false;
        if (companionElements.dsS2) companionElements.dsS2.checked = currentCharacterForCompanion.deathSaveSuccess2 || false;
        if (companionElements.dsS3) companionElements.dsS3.checked = currentCharacterForCompanion.deathSaveSuccess3 || false;
        if (companionElements.dsF1) companionElements.dsF1.checked = currentCharacterForCompanion.deathSaveFail1 || false;
        if (companionElements.dsF2) companionElements.dsF2.checked = currentCharacterForCompanion.deathSaveFail2 || false;
        if (companionElements.dsF3) companionElements.dsF3.checked = currentCharacterForCompanion.deathSaveFail3 || false;

        // Popular select de Dados de Vida
        if (companionElements.hitDiceTypeSpend) {
            companionElements.hitDiceTypeSpend.innerHTML = '';
            const hitDiceString = currentCharacterForCompanion.hitDiceTotal || "";
            const diceTypes = new Set();
            const diceRegex = /d(\d+)/g;
            let match;
            while((match = diceRegex.exec(hitDiceString)) !== null) {
                diceTypes.add(`d${match[1]}`);
            }
            if (diceTypes.size === 0 && hitDiceString.match(/^\d+$/)) {
                diceTypes.add('d8'); // Default
            }
            diceTypes.forEach(dtype => {
                const option = document.createElement('option');
                option.value = dtype;
                option.textContent = dtype;
                companionElements.hitDiceTypeSpend.add(option);
            });
            if (companionElements.hitDiceTypeSpend.options.length === 0) {
                const defaultOption = document.createElement('option');
                defaultOption.value = 'd8';
                defaultOption.textContent = 'd8';
                companionElements.hitDiceTypeSpend.add(defaultOption);
            }
        }

        // Limpar resultado do mini rolador ao popular
        if (companionElements.diceResultDisplay) {
            companionElements.diceResultDisplay.textContent = '--';
        }
        // Limpar resultado de cura de DV
        if (companionElements.hitDiceHealResult) {
            companionElements.hitDiceHealResult.textContent = '';
        }
    }

    // CORREÇÃO 3: Renomear função para corresponder à chamada do listener
    function rollCompanionDie(event) { // Nome corrigido para singular
        const dieType = event.target.dataset.die;
        if (!dieType) return;

        const dieSize = parseInt(dieType);
        const roll = Math.floor(Math.random() * dieSize) + 1;

        if (companionElements.diceResultDisplay) {
            companionElements.diceResultDisplay.textContent = roll;
            companionElements.diceResultDisplay.classList.add('dice-rolled');
            setTimeout(() => {
                if (companionElements.diceResultDisplay) { // Verifica se ainda existe
                   companionElements.diceResultDisplay.classList.remove('dice-rolled');
                }
            }, 500);
        }
    }

    // ... (funções applyDamage, applyHealing, addOrSetTempHP, removeTempHP, updateCompanionHPDisplay, spendHitDice, saveCompanionChangesToMainSheet, getEmptyCharacterDataForCompanion - sem alterações necessárias aqui) ...
    function applyDamage() {
        if (!currentCharacterForCompanion || !companionElements.hpChangeValue || !companionElements.currentHP || !companionElements.tempHP) return;
        const damage = parseInt(companionElements.hpChangeValue.value);
        if (isNaN(damage) || damage <= 0) return;

        let currentHp = parseInt(currentCharacterForCompanion.hpCurrent || 0);
        let tempHp = parseInt(currentCharacterForCompanion.hpTemp || 0);

        if (tempHp > 0) {
            if (damage <= tempHp) {
                tempHp -= damage;
            } else {
                currentHp -= (damage - tempHp);
                tempHp = 0;
            }
        } else {
            currentHp -= damage;
        }
        currentHp = Math.max(0, currentHp);
        currentCharacterForCompanion.hpCurrent = currentHp;
        currentCharacterForCompanion.hpTemp = tempHp;
        updateCompanionHPDisplay();
        companionElements.hpChangeValue.value = '';
    }

    function applyHealing() {
        if (!currentCharacterForCompanion || !companionElements.hpChangeValue || !companionElements.currentHP || !companionElements.maxHP) return;
        const healing = parseInt(companionElements.hpChangeValue.value);
        if (isNaN(healing) || healing <= 0) return;

        let currentHp = parseInt(currentCharacterForCompanion.hpCurrent || 0);
        const maxHp = parseInt(currentCharacterForCompanion.hpMax || 0);
        currentHp = Math.min(maxHp, currentHp + healing);
        currentCharacterForCompanion.hpCurrent = currentHp;
        updateCompanionHPDisplay();
        companionElements.hpChangeValue.value = '';
    }

    function addOrSetTempHP() {
        if (!currentCharacterForCompanion || !companionElements.tempHpValue) return;
        const amount = parseInt(companionElements.tempHpValue.value);
        if (isNaN(amount) || amount < 0) return;
        currentCharacterForCompanion.hpTemp = Math.max(currentCharacterForCompanion.hpTemp || 0, amount);
        updateCompanionHPDisplay();
        companionElements.tempHpValue.value = '';
    }

    function removeTempHP() {
        if (!currentCharacterForCompanion) return;
        currentCharacterForCompanion.hpTemp = 0;
        updateCompanionHPDisplay();
    }

    function updateCompanionHPDisplay() {
        if (!currentCharacterForCompanion || !companionElements.currentHP || !companionElements.tempHP || !companionElements.removeTempHpButton) return;
        companionElements.currentHP.textContent = currentCharacterForCompanion.hpCurrent || 0;
        companionElements.tempHP.textContent = currentCharacterForCompanion.hpTemp || 0;
        companionElements.removeTempHpButton.style.display = (currentCharacterForCompanion.hpTemp && currentCharacterForCompanion.hpTemp > 0) ? 'inline-block' : 'none';
    }

    function spendHitDice() {
        if (!currentCharacterForCompanion || !companionElements.hitDiceToSpend || !companionElements.hitDiceTypeSpend || !companionElements.hitDiceHealResult) return;
        const numDiceToSpend = parseInt(companionElements.hitDiceToSpend.value);
        const diceTypeString = companionElements.hitDiceTypeSpend.value;
        const conScore = currentCharacterForCompanion.constitutionScore || 10;
        const conMod = getAbilityModifier(conScore);

        if (isNaN(numDiceToSpend) || numDiceToSpend <= 0 || !diceTypeString) {
            alert("Por favor, insira um número válido de dados e selecione um tipo.");
            return;
        }
        let totalHealed = 0;
        const diceSize = parseInt(diceTypeString.substring(1));
        if (isNaN(diceSize) || diceSize <= 0) {
            alert("Tipo de dado inválido selecionado.");
            return;
        }
        for (let i = 0; i < numDiceToSpend; i++) {
            const roll = Math.floor(Math.random() * diceSize) + 1;
            totalHealed += Math.max(1, roll + conMod);
        }
        companionElements.hitDiceHealResult.textContent = totalHealed;
        let currentHp = parseInt(currentCharacterForCompanion.hpCurrent || 0);
        const maxHp = parseInt(currentCharacterForCompanion.hpMax || 0);
        currentHp = Math.min(maxHp, currentHp + totalHealed);
        currentCharacterForCompanion.hpCurrent = currentHp;
        updateCompanionHPDisplay();
        alert(`Você gastou ${numDiceToSpend}${diceTypeString} e recuperou ${totalHealed} PV. (Lógica de contagem de dados de vida restantes ainda pendente)`);
    }

    function saveCompanionChangesToMainSheet() {
        if (!currentCharacterForCompanion) {
            alert("Nenhum personagem ativo no companion.");
            return;
        }
        // Verifica se os campos do formulário existem antes de tentar atribuir
        if (characterFormFields.hpCurrent) characterFormFields.hpCurrent.value = currentCharacterForCompanion.hpCurrent;
        if (characterFormFields.hpTemp) characterFormFields.hpTemp.value = currentCharacterForCompanion.hpTemp;
        if (characterFormFields.deathSaveSuccess1 && companionElements.dsS1) characterFormFields.deathSaveSuccess1.checked = companionElements.dsS1.checked;
        if (characterFormFields.deathSaveSuccess2 && companionElements.dsS2) characterFormFields.deathSaveSuccess2.checked = companionElements.dsS2.checked;
        if (characterFormFields.deathSaveSuccess3 && companionElements.dsS3) characterFormFields.deathSaveSuccess3.checked = companionElements.dsS3.checked;
        if (characterFormFields.deathSaveFail1 && companionElements.dsF1) characterFormFields.deathSaveFail1.checked = companionElements.dsF1.checked;
        if (characterFormFields.deathSaveFail2 && companionElements.dsF2) characterFormFields.deathSaveFail2.checked = companionElements.dsF2.checked;
        if (characterFormFields.deathSaveFail3 && companionElements.dsF3) characterFormFields.deathSaveFail3.checked = companionElements.dsF3.checked;
        saveCharacter(); // Chama a função que salva TUDO da ficha
        // alert("Mudanças do companion salvas na ficha e no localStorage!"); // saveCharacter já dá um alerta
    }

    function getEmptyCharacterDataForCompanion() {
        const emptyData = {};
        const fieldsToResetInCompanion = [
            'charName', 'armorClass', 'speed', 'hpMax', 'hpCurrent', 'hpTemp', 'hitDiceTotal', 'hitDiceCurrent',
            'deathSaveSuccess1', 'deathSaveSuccess2', 'deathSaveSuccess3',
            'deathSaveFail1', 'deathSaveFail2', 'deathSaveFail3'
        ];
        fieldsToResetInCompanion.forEach(key => {
            const field = characterFormFields[key];
            if (field) {
                if (field.type === 'checkbox') emptyData[key] = false;
                else if (field.type === 'number' || key.includes('hp') || key === 'armorClass') emptyData[key] = 0;
                else emptyData[key] = "";
            } else {
                 if (key.includes('deathSave')) emptyData[key] = false;
                 else if (key.includes('hp') || key === 'armorClass' || key.toLowerCase().includes('score')) emptyData[key] = 0;
                 else emptyData[key] = "";
            }
        });
        if (characterFormFields.initiative) {
            emptyData.initiative = characterFormFields.initiative.value || "--";
        } else {
            emptyData.initiative = "--";
        }
        return emptyData;
    }


    // --- Anexação de Event Listeners (Companion) ---
    // Adiciona verificações para garantir que o elemento existe antes de adicionar o listener
    if (companionElements.applyDamageButton) companionElements.applyDamageButton.addEventListener('click', applyDamage);
    if (companionElements.applyHealingButton) companionElements.applyHealingButton.addEventListener('click', applyHealing);
    if (companionElements.addTempHpButton) companionElements.addTempHpButton.addEventListener('click', addOrSetTempHP);
    if (companionElements.removeTempHpButton) companionElements.removeTempHpButton.addEventListener('click', removeTempHP);
    if (companionElements.spendHitDiceButton) companionElements.spendHitDiceButton.addEventListener('click', spendHitDice);
    if (companionElements.saveCompanionChangesButton) companionElements.saveCompanionChangesButton.addEventListener('click', saveCompanionChangesToMainSheet);

    // Listener do mini rolador (já corrigido acima para chamar rollCompanionDie)
    if (companionElements.diceButtons) {
        companionElements.diceButtons.forEach(button => {
            button.addEventListener('click', rollCompanionDie); // Chamando nome correto agora
        });
    }

    // Listener dos death saves do companion
    document.querySelectorAll('.comp-ds').forEach(cb => {
        cb.addEventListener('change', function() {
            if (currentCharacterForCompanion) {
                const key = this.id.replace('comp', '');
                const dataKey = key.charAt(0).toLowerCase() + key.slice(1);
                if (typeof currentCharacterForCompanion[dataKey] !== 'undefined') { // Verifica se a chave existe no objeto
                   currentCharacterForCompanion[dataKey] = this.checked;
                } else {
                    console.warn("Tentou atualizar chave de death save inexistente:", dataKey);
                }
            }
        });
    });

    // --- Bloco de Inicialização da Página ---
    console.log("Inicialização da página: Calculando stats derivados iniciais.");
    calculateAllDerivedStats();

    const initiallySavedDataString = localStorage.getItem(characterStorageKey);
    console.log("Inicialização da página: Tentando carregar dados iniciais do localStorage.");
    if (initiallySavedDataString) {
        try { // Adiciona try...catch para o caso de JSON inválido no localStorage
            const initiallyLoadedCharacterData = JSON.parse(initiallySavedDataString);
            console.log("Inicialização da página: Dados iniciais carregados:", initiallyLoadedCharacterData);

            // Preenche a ficha principal
            for (const key in initiallyLoadedCharacterData) {
                const field = characterFormFields[key];
                if (field) {
                    if (field.type === 'checkbox') {
                        field.checked = initiallyLoadedCharacterData[key];
                    } else {
                        if (field.type === 'number' && (initiallyLoadedCharacterData[key] === "" || initiallyLoadedCharacterData[key] === null || typeof initiallyLoadedCharacterData[key] === 'undefined')) {
                            field.value = '';
                        } else {
                           field.value = initiallyLoadedCharacterData[key];
                        }
                    }
                }
            }

            console.log("Inicialização da página: Recalculando stats com dados carregados.");
            calculateAllDerivedStats();

            console.log("Inicialização da página: Populando companion view com dados carregados.");
            populateCompanionView(initiallyLoadedCharacterData);
        } catch (e) {
             console.error("Erro ao parsear dados do localStorage:", e);
             localStorage.removeItem(characterStorageKey); // Remove dados inválidos
             populateCompanionView(null); // Limpa a view do companion
        }
    } else {
        console.log("Inicialização da página: Nenhum dado inicial no localStorage, populando companion com null.");
        populateCompanionView(null);
    }
});
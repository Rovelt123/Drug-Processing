var recipeName = document.getElementById('recipeName');
var ingredientInputs = document.getElementById('ingredientInputs');
var patienceInput = document.getElementById('patience');
var DegreesInput = document.getElementById('degrees');
var clickAudio = document.getElementById("click-audio");
var currentRecipe = null;
var recipeConfig = null;
var startDegrees = null;

window.addEventListener('message', function(event) {
    startDegrees = null;
    if (event.data.openUI) {
        recipeConfig = event.data.configrecipe;
        if (event.data.degrees == false) {
            updateUI(event.data.recipeName, event.data.title, false)
            
            
        } else {
            startDegrees = event.data.degrees 
            updateUI(event.data.recipeName, event.data.title, event.data.degrees)
        }
    }
});


function updateUI(recipe, recipetitle, thedegrees) {
    
    currentRecipe = recipe;
    recipetitle = recipetitle
    
    recipeName.textContent = recipetitle; 

    ingredientInputs.innerHTML = ''; 

    for (var ingredient in recipeConfig) {
        var inputField = document.createElement('input');
        inputField.type = 'number';
    
        var ingredientNameWithUnderscores = ingredient.replace(/_/g, ' ');
        var words = ingredientNameWithUnderscores.split(' ');
        var capitalizedWords = words.map(function(word) {
            return word.charAt(0).toUpperCase() + word.slice(1);
        });
        var capitalizedIngredientName = capitalizedWords.join(' ');
    
        inputField.placeholder = capitalizedIngredientName;
        inputField.name = ingredient;
        ingredientInputs.appendChild(inputField);
    }
    
    
    if (thedegrees) {
        
        DegreesInput.innerHTML = '';
        
        var otherinputField = document.createElement('input');
        otherinputField.type = 'number';
        //otherinputField.placeholder = "Degrees";
        otherinputField.name = ingredient;
        DegreesInput.appendChild(otherinputField);
        $('.degrees-container').show();
    } else{
        $('.degrees-container').hide();
    }

    $('.recipe-box').show();
}

var isRecipeCorrect = null;
var ingredients = {};
$(document).on('click', ".start-button", function() {
    clickAudio.play();
    if (!currentRecipe) {
        return;
    }

    for (var ingredient in recipeConfig) {
        var inputField = document.querySelector('[name="' + ingredient + '"]');
        if (inputField) {
            var inputValue = parseInt(inputField.value);

            ingredients[ingredient] = inputValue;
        }
    }
    isRecipeCorrect = checkRecipe(recipeConfig, ingredients);
    $('.recipe-box').hide();
    $('.confirm-box').show();
});

$(document).on('click', ".yes-button", function() {
    clickAudio.play();
    if (isRecipeCorrect == true) {
        $('.confirm-box').hide();
        $.post(`https://${GetParentResourceName()}/confirm`, JSON.stringify({ ingredients: ingredients, currentRecipe: currentRecipe, isRecipeCorrect: isRecipeCorrect, patience: patienceInput.value }));
    
    } else {
        $('.confirm-box').hide();
        $.post(`https://${GetParentResourceName()}/confirm`, JSON.stringify({ ingredients: false, currentRecipe: currentRecipe, isRecipeCorrect: isRecipeCorrect, patience: patienceInput.value}));

    }
});

$(document).on('click', ".no-button", function() {
    clickAudio.play();
    $('.confirm-box').hide();
    $.post(`https://${GetParentResourceName()}/cancel`, JSON.stringify({ ingredients: false, currentRecipe: currentRecipe, isRecipeCorrect: false, patience: patienceInput.value}));
});

$(document).on('click', ".close-button", function() {
    clickAudio.play();
    $('.confirm-box').hide();
    $('.recipe-box').hide();
    $.post(`https://${GetParentResourceName()}/close-menu`, JSON.stringify({ ingredients: false, currentRecipe: currentRecipe, isRecipeCorrect: false, patience: patienceInput.value}));
});

function checkRecipe(recipeConfig, userIngredients, degrees) {
    for (var ingredient in recipeConfig) {
        if (userIngredients[ingredient] !== recipeConfig[ingredient]) {
            return "Ingredients"; 
        }
    }
    if (parseInt(patienceInput.value) < 1 || patienceInput.value > 10) {
        return "Patience";
    }
    if (startDegrees) {
        if(parseInt(DegreesInput.value) !== startDegrees) {
            return "Degrees";
        }
    }
    return true;
}

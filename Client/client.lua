local InUi = false
local result = nil
local DoingDrugs = false

StartCraft = function(recipe, callback)
    if not InUi then
        Result = nil
        InUi = true 
        SendNUIMessage({
            openUI = true, 
            recipeName = recipe, 
            configrecipe = Config.Recipes[recipe].ingredients, 
            title = Config.Recipes[recipe].title, 
            degrees = Config.Recipes[recipe].degrees
        })
        while InUi do
            Wait(5)
            SetNuiFocus(InUi, true)
        end
        Wait(100)
        SetNuiFocus(false, false)
        TheCallBack = callback
        return Result
    end
end

RegisterNUICallback('close-menu', function(data, cb)
    Result = {ingredients = data.ingredients, finalproduct = data.currentRecipe, isRecipeCorrect = data.isRecipeCorrect, patience = data.patience}
    Wait(100)
    InUi = false
    return Result
end)

RegisterNUICallback('cancel', function(data, cb)
    Result = {ingredients = data.ingredients, finalproduct = data.currentRecipe, isRecipeCorrect = data.isRecipeCorrect, patience = data.patience}
    Wait(100)
    InUi = false
    return Result
end)

RegisterNUICallback('confirm', function(data, cb)
    InUi = false
    if data.isRecipeCorrect == true then
        Result = {ingredients = data.ingredients, finalproduct = data.currentRecipe, isRecipeCorrect = data.isRecipeCorrect, patience = data.patience}
    elseif data.isRecipeCorrect == "Ingredients" then
        Result = {ingredients = data.ingredients, finalproduct = data.currentRecipe, isRecipeCorrect = data.isRecipeCorrect, patience = data.patience}
    elseif data.isRecipeCorrect == "Patience" then
        Result = {ingredients = data.ingredients, finalproduct = data.currentRecipe, isRecipeCorrect = data.isRecipeCorrect, patience = data.patience}
    elseif data.isRecipeCorrect == "Degrees" then
        Result = {ingredients = data.ingredients, finalproduct = data.currentRecipe, isRecipeCorrect = data.isRecipeCorrect, patience = data.patience}
    end
    Wait(10)
    return Result
end)
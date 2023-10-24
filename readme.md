I DESCRIPE HOW THIS WORKS HERE:
    When you use the export, then theDrug must be the same as the table. 
    In this case the table is = theitem:
    theitem = {title = "THE TITLE OF THE ITEM", ingredients = {item1 = (A NUMBER), item2 = (A NUMBER)}, degrees = (FALSE OR A NUMBER)},
    So if you want to craft theitem then you have to do so:
    exports['Rovelt_DrugProcessing']:StartCraft("theitem") 


Client.lua:

RegisterNetEvent('Rovelt:client:CheckDrugs', function(callback, theDrug)
    TheCallBack = callback
    exports['Rovelt_DrugProcessing']:StartCraft(theDrug)
end)

RegisterCommand('testscript', function(source, args, rawCommand)
    if not DoingDrugs then
        local info = exports['Rovelt_DrugProcessing']:StartCraft(args[1])
        Wait(100)
        if info then
            if info.isRecipeCorrect == true then -- This is if the recipe is correct! (There is the following in the table info: ingredients, finalproduct, isRecipeCorrect, patience)
                DoingDrugs = true
                TaskStartScenarioInPlace(GetPlayerPed(-1), "PROP_HUMAN_PARKING_METER", 0, true)
                Wait(info.patience*5000)
                ClearPedTasksImmediately(GetPlayerPed(-1))
                TriggerServerEvent("Rovelt_RemoveItems", info.ingredients, info.finalproduct, info.patience)
                DoingDrugs = false
            else
                if info.isRecipeCorrect then
                    print("Something's wrong with your "..info.isRecipeCorrect)
                    DoingDrugs = false
                end
            end
        end
    else
        print("You can't do this right now!")
    end
end)




SERVER.LUA:
--local QBCore = exports["qb-core"]:GetCoreObject() -- IF QB-CORE

-- This example is made to QB-Core!
RegisterServerEvent('Rovelt_RemoveItems')
AddEventHandler('Rovelt_RemoveItems', function(ingredients, finalproduct, patience)
    local src = source
    local Player = QBCore.Functions.GetPlayer(src)
    local missingItems = {}  

    for k, v in pairs(ingredients) do
        local hasItem = Player.Functions.GetItemByName(k)
        if hasItem ~= nil then
            if not (hasItem.amount >= tonumber(v)) then
                table.insert(missingItems, {k, v}) 
            end
        else
            table.insert(missingItems, {k, v}) 
        end
    end

    if #missingItems > 0 then
        TriggerClientEvent('QBCore:Notify', src, "You don't have the items!", 'error', 5000)
    else
        for k, v in pairs(ingredients) do
            Player.Functions.RemoveItem(k, v)
        end
        TriggerClientEvent('inventory:client:ItemBox', src, QBCore.Shared.Items[finalproduct], "add", 1)
        Player.Functions.AddItem(finalproduct, 1*patience)
    end
end)
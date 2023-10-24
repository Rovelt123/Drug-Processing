Config = {}

Config.Recipes = {
    -- WEED:
    dried_weed = {title = "Dried Weed", ingredients = {weed = 5, bag = 1}, degrees = false},
    joint = {title = "Rolled Joints", ingredients = {dried_weed = 1, rolling_paper = 1}, degrees = false},

    -- COKE:
    unpackedcoke = {title = "Coke Paste", ingredients = {gasoline = 2, bakingsoda = 7, cokeleaf = 5}, degrees = false},
    coke = {title = "Bagged Coke", ingredients = {unpackedcoke = 1, bag = 7}, degrees = false},

    -- METH:
    methcrystal = {title = "Meth Crystals", ingredients = {pseudoephedrine = 10, drain_cleaner = 5}, degrees = 86},
    meth = {title = "Bagged Meth", ingredients = {methcrystal = 10, bag = 5}, degrees = false},
    
}
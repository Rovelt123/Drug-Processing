fx_version 'cerulean'
games { 'gta5' }

author 'Rovelt'
description 'Drug Processing script'
version '1.0'

client_scripts {
    'Client/client.lua'
}

exports {
    "StartCraft"
}

ui_page 'HTML/index.html'

files {
    'html/index.html',
    'html/script.js',
    'html/style.css',
    'html/click-sound.mp3'
}

shared_script 'Config.lua'

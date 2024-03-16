/*
    These words should be matched as both entire words and parts of other words.
*/

let HotThemes = [
    'influencer',
    'onlyfans',
    'tennis',
    'djokovic',
    'tesla',
    'musk',
    'bezos',
    'zuckerberg',
    'facebook',
    'instagram',
    'porn',
    'discord',
    'twitter',
    'youtube',
    'incendio a bologna'
]

HotThemes = HotThemes.map(hotTheme => hotTheme.toLowerCase())

/*
    These words should be matched as entire words for example 'mark zuckerberg sells meta' would be matched, 
    while 'mark zuckerberg sellsmeta' wouldn't, because meta is not a word in the latter phrase.
*/

let HotThemesWords = [
    'meta',
    'social',
    'x',
    'amazon',
    'cccp'
]

HotThemesWords = HotThemesWords.map(hotThemeWord => hotThemeWord.toLowerCase())

module.exports = {
    HotThemes,
    HotThemesWords
}

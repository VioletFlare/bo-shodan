/*
    These words should be matched as both entire words and parts of other words.
*/

const HotThemes = [
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
    'discord',
    'twitter',
    'youtube'
]

/*
    These words should be matched as entire words for example 'mark zuckerberg sells meta' would be matched, 
    while 'mark zuckerberg sellsmeta' wouldn't, because meta is not a word in the latter phrase.
*/

const HotThemesWords = [
    'meta',
    'social',
    'x'
]

module.exports = {
    HotThemes,
    HotThemesWords
}

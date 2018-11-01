/** shorty.js -- A dirty simple link-shortener. **/

const fs = require('fs')
const path = require('path')
const express = require('express')

const config_path = path.join(__dirname, 'config.json')
const config = parse(config_path)

var app = express()

app.get('/shorten/:link', function(req, res) {
    res.send(req)
})

app.get('/:link', function(req, res) {
    res.send(req.params.link)
})

app.listen(config.port)

/**
 * @desc Take a link and make it smol.
 * @param {string} link the link to shorten.
 * @returns {string} A smol-er link.
 */

function shorten(link) {
    newLink = function() {
        let anonLink = ''
        
        for (link_letter = 0; link_letter < config.link_length; link_letter++) {
            anonLink += String.fromCharCode([random(48, 57), random(65, 90), random(97, 122)][random(0, 2)])
        }

        return anonLink
    }()
}

/**
 * @desc Parse the configuration file.
 * @var {string} path_to_file the path to the file.
 * @return {obj} config object.
 */

function parse(path_to_file) {
    file = fs.readFileSync(path_to_file) 
    fileObj = JSON.parse(file)

    port = lookup(fileObj, 'port')
    link_length = lookup(fileObj, 'link_length')
    db_location = lookup(fileObj, 'db_location')
    db_name = lookup(fileObj, 'db_name')
    
    return {port: port, db_location: db_location, link_length: link_length, db_name: db_name}
}

/**
 * @desc Simple helper function.
 * @var {JSON obj} obj obj.
 * @var {string} key key.
 * @returns {obj | string | number | boolean}
 */

function lookup(obj, key) {
    return obj[key]
}

/**
 * @desc Generate a random int inclusive between min and max.
 * @param {int} min 
 * @param {int} max 
 * @return {int} random int between (inclusive) min and max.
 */

function random(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function fatal_err(msg, err) {
    console.log('[!] ' + msg)
    console.log(err)
    process.exit()
}
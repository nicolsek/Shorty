/** shorty.js -- A dirty simple link-shortener. **/

const fs = require('fs')
const path = require('path')
const nano = require('nano')
const express = require('express')

const config_path = path.join(__dirname, 'config.json')
const config = parse(config_path)

/**
 * @desc Parse the configuration file.
 */
function parse(path_to_file) {
    file = fs.readFileSync(path_to_file) 
    fileObj = JSON.parse(file)

    port = lookup(fileObj, 'port')
    db_location = lookup(fileObj, 'db_location')
}

/**
 * @desc Simple helper function.
 * @returns JSON Obj
 */
function lookup(obj, key) {
    return obj[key]
}
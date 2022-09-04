const fs = require('fs');
const fetch = require('node-fetch');
require('dotenv').config();

// Get the username from the .env file
const Username = process.env.USERNAMEWB || fs.readFileSync(`${__dirname}/../.env`).toString().split('\n')[0].split('=')[1];
const Password = process.env.PASSWORDWB || fs.readFileSync(`${__dirname}/../.env`).toString().split('\n')[1].split('=')[1];

const BaseUrl = 'https://api.wall-box.com/';
/**
 * The JWT Token with it expiration date
 */
const jwtToken = {
    value: '',
    expiration: 0,
};

/**
 * The function below is used to modify the jwtToken object
 * @param {String} token The token to be stored
 * @param {Date} expiration The expiration date of the token
 */
function setJwtToken(token, expiration) {
    jwtToken.value = token;
    jwtToken.expiration = expiration;
}

/**
 * The function below is used to generate the jwt Token for the API calls
 * @param {String} baseUrl The endpoint of the API Request
 * @param {String} method The method of the API Request
 * @param {Function} callback The callback function to be called after the API call
 * @returns {Promise} The promise of the API call
 */
async function getAuthToken(baseUrl, method, callback) {
    const url = new URL(baseUrl);
    return fetch(url, {
        method,
        headers: {
            Authorization: `Basic ${Buffer.from(`${Username}:${Password}`).toString('base64')}`,
            Accept: 'application/json',
        },
    })
        .then((response) => {
            if (response.status == 401) {
                throw new Error('Veuillez vérifier votre identifiant et votre mot de passe');
            }
            return response.json();
        })
        .then((data) => {
            callback(data);
        })
        .catch((error) => {
            console.warn(`\n${error.message}\n`);
            setTimeout(() => { }, 5000);
        });
}

/**
 * The function below is used to make the API calls
 * @param {String} baseUrl The endpoint of the API Request
 * @param {String} method The method of the API Request
 * @param {Function} callback The callback function to be called after the API call
 * @param {Object} body={} The body of the API Request
 * @returns {Promise} The promise of the API call
 */
async function fetchData(baseUrl, method, callback, body = {}) {
    const url = new URL(baseUrl);
    const params = {
        method,
        headers: {
            Authorization: `Bearer ${jwtToken.value}`,
            Accept: 'application/json',
        },
    };
    if (method === 'POST' || method === 'PUT') {
        params.body = JSON.stringify(body);
        params.headers['Content-Type'] = 'application/json';
    }

    return fetch(url, params)
        .then((response) => {
            if (response.status == 401) {
                throw new Error('Veuillez vérifier votre identifiant et votre mot de passe');
            }
            return response.json();
        })
        .then((data) => {
            callback(data);
        })
        .catch((error) => {
            console.warn(`\n${error.message}\n`);
            setTimeout(() => { }, 5000);
        });
}

// eslint-disable-next-line no-extend-native, func-names
String.prototype.replaceAll = function (search, replacement) {
    let target = this;
    while (target.indexOf(search) !== -1) {
        target = target.replace(search, replacement);
    }
    return target;
};

/**
 * A small fucntion to handle delay between API requests
 * @param {Number} ms The number of milliseconds to wait
 * @returns {Promise} The promise of the timeout
 */
// eslint-disable-next-line no-promise-executor-return
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

/**
 * This function add a message to the console and to the log file
 * @param {String} message The message to be logged
 */
function logger(message) {
    const log = message.replaceAll('\n', '');
    console.warn(`${new Date().toLocaleString()} - ${message}`);
    fs.appendFileSync(`${__dirname}/../logs.txt`, `${new Date().toLocaleString()} - ${log}\n`);
}

module.exports = {
    getAuthToken,
    setJwtToken,
    BaseUrl,
    jwtToken,
    fetchData,
    delay,
    logger,
};

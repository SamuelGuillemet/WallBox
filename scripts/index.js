/* eslint-disable no-constant-condition */
/* eslint-disable no-await-in-loop */
const inquirer = require('inquirer');
const { setJwtToken, getAuthToken, BaseUrl, jwtToken, fetchData, delay, logger } = require('./utils');
const { questionPuissance } = require('./input');

/**
 * Le courant max de charge du chargeur
 */
let maxChargingCurrent = 0;

/**
 * La puissance à partir de laquelle on veut charger
 */
let responsePuissance;

/**
 * Le seuil de puissance pour pouvoir arreter la charge
 */
const seuilPuissance = -1450;

/**
 * Compteur utile pour arreter la charge
 */
let stopCounter = 0;

/**
 * Set the value of maxChargingCurrent by function
 */
const setmaxChargingCurrent = (value) => {
    maxChargingCurrent = value;
};

/**
 * The function below is used to authenticate the user and setup the refurbishment of the token
 */
async function auth() {
    // Step 1 : Get the JWT Token
    await getAuthToken(`${BaseUrl}auth/token/user`, 'GET', (data) => {
        const expirationDate = new Date(data.ttl * 1000);
        setJwtToken(data.jwt, expirationDate);
        logger(`\nToken expires on ${jwtToken.expiration.toString()}\n`);
    });
    // Step 2 : Setup the interval to refresh the token
    setInterval(auth, jwtToken.expiration - Date.now());
}

/**
 * This function is used to set the amperage of the charger
 * @param {Number} value The value of the amperage
 */
async function setAmperage(value) {
    await fetchData(
        `${BaseUrl}v2/charger/342268`,
        'PUT',
        (data) => {
            logger(`Mise à jour du courant à : ${data.data.chargerData.maxChargingCurrent}`);
        },
        { maxChargingCurrent: value < 6 ? 6 : value },
    );
}

/**
 * This function is used to stop the charger
 */
async function switchOff() {
    await fetchData(`${BaseUrl}v3/chargers/342268/remote-action`, 'POST', () => {}, { action: 2 });
}

/**
 * This function is used to start the charger
 */
async function switchOn() {
    await fetchData(`${BaseUrl}v3/chargers/342268/remote-action`, 'POST', () => {}, { action: 1 });
}

/**
 * This function is used to get the power of the shelly
 */
async function getShellyPower() {
    const power = [];
    for (let i = 0; i < 5; i++) {
        await fetchData('http://192.168.1.87/status', 'GET', (data) => {
            power.push(data.total_power);
        });
        await delay(1000);
    }
    return Math.floor(power.reduce((a, b) => a + b, 0) / 5);
}

/**
 * The function below is used to start the script
 */
async function main1() {
    console.warn('Starting the script (Press CTRL+C to stop it)');
    // Step 1 : Authenticate
    await auth();
    await switchOff();
    // Step 2 : Get the power to start the charge
    const response = await inquirer.prompt(questionPuissance);
    responsePuissance = parseInt(response.puissance, 10);
    //
    main2();
}

/**
 * The function below is used to start the body of the script
 */
async function main2() {
    while (true) {
        let power = await getShellyPower();
        while (power > responsePuissance) {
            await delay(10000);
            power = await getShellyPower();
            logger(`Attente de lancement de la charge : Power : ${power}`);
        }
        await switchOn();
        setAmperage(6);
        delay(10000);
        while (true) {
            power = await getShellyPower();
            logger(`Puissance du Shelly : ${power}`);
            await fetchData(`${BaseUrl}chargers/config/342268`, 'GET', (data) => {
                logger(`Courent actuel : ${data.max_charging_current}`);
                setmaxChargingCurrent(data.max_charging_current);
            });
            if (power < -250) {
                await setAmperage(Math.floor(power / -250) + maxChargingCurrent);
            } else if (power > 0) {
                const newAmperage = maxChargingCurrent - Math.floor(power / 250);
                if (newAmperage > 6) {
                    await setAmperage(newAmperage);
                } else {
                    await setAmperage(6);
                    if (power > -(seuilPuissance - responsePuissance)) {
                        stopCounter += 1;
                        if (stopCounter > 3) {
                            break;
                        }
                    } else {
                        stopCounter = 0;
                    }
                }
            }
            await delay(1000);
        }
        stopCounter = 0;
        await switchOff();
    }
}

main1();

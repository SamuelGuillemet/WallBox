/* eslint-disable no-await-in-loop */
const {
    setJwtToken, getAuthToken, BaseUrl, jwtToken, fetchData, delay,
} = require('./utils');

let maxChargingCurrent = 0;

/**
 * Set the value of maxChargingCurrent by function
 */
const setmaxChargingCurrent = (value) => { maxChargingCurrent = value; };

/**
 * The function below is used to authenticate the user and setup the refurbishment of the token
 */
async function auth() {
    // Step 1 : Get the JWT Token
    await getAuthToken(`${BaseUrl}auth/token/user`, 'GET', (data) => {
        const expirationDate = new Date(data.ttl * 1000);
        setJwtToken(data.jwt, expirationDate);
        console.warn(`\nToken expires on ${jwtToken.expiration.toString()}\n`);
    });
    // Step 2 : Setup the interval to refresh the token
    setInterval(auth, jwtToken.expiration - Date.now());
}

/**
 * A simple array to store the energy values
 */
const energy = [
    {
        timestamp: Date.now(),
        energy: 0,
        green_energy: 0,
        diff: 0,
    },
];

/**
 * This function handle the retrieval of the last session
 */
async function getLastSession() {
    await fetchData(`${BaseUrl}v4/charger-last-sessions`, 'GET', (data) => {
        const timestamp = Date.now();
        energy.push({
            timestamp,
            energy: data.data[0].attributes.charging_energy,
            green_energy: data.data[0].attributes.charging_green_energy,
            diff: data.data[0].attributes.charging_energy - data.data[0].attributes.charging_green_energy,
        });
        console.warn(`Energy : ${data.data[0].attributes.charging_energy}`);
        console.warn(`Green Energy : ${data.data[0].attributes.charging_green_energy}`);
    });
}

/**
 * This function is used to set the amperage of the charger
 * @param {Number} value The value of the amperage
 */
async function setAmperage(value) {
    await fetchData(`${BaseUrl}v2/charger/342268`, 'PUT', (data) => {
        console.warn(`Amperage : ${data.data.chargerData.maxChargingCurrent}`);
    }, { maxChargingCurrent: value });
}

/**
 * The function below is used to start the script
 */
async function main() {
    console.warn('Starting the script (Press CTRL+C to stop it)');
    // Step 1 : Authenticate
    await auth();
    // Step 2 : Init of algorithm
    await getLastSession();
    console.warn('Init done\n');
    // Wait for 5 seconds
    await delay(5000);
    // eslint-disable-next-line no-constant-condition
    while (true) {
        // Step 3 : Get the status of the charger
        await fetchData(`${BaseUrl}chargers/config/342268`, 'GET', (data) => {
            console.warn(`Courent actuel : ${data.max_charging_current}`);
            setmaxChargingCurrent(data.max_charging_current);
        });
        // Step 4 : Get the last session
        await getLastSession();
        // Step 5 : Calculate the difference between the energy and the green energy and set the amperage
        if (energy.length > 2) {
            energy.shift();
        }
        if (energy[1].energy !== energy[0].energy) {
            const energyDiff = Math.abs(energy[1].diff - energy[0].diff);
            console.warn(`Energy diff : ${energyDiff}`);
            if (energyDiff > 0.05) {
                console.warn(`Consomation non verte, on diminue l\`amperage à ${maxChargingCurrent - 2}A`);
                setAmperage(maxChargingCurrent - 2);
            } else {
                console.warn(`Consommation non optimale, on augmente l\`amperage à ${maxChargingCurrent + 1}A`);
                setAmperage(maxChargingCurrent + 1);
            }
        }
        console.warn();
        // Step 6 : Wait 5 seconds
        await delay(10000);
    }
}

main();

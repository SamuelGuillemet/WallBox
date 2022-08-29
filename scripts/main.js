const {
    setJwtToken, getAuthToken, BaseUrl, jwtToken,
} = require('./utils');

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
 * This function is the heart of the script
 */
async function main() {
    // Step 1 : Authenticate
    await auth();
    // Step 2 : Get the status of the charger
    // eslint-disable-next-line no-constant-condition
    while (true) {
        // Do your stuff here
    }
}

main();

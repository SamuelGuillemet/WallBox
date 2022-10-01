# In this repository you will find all the ressources to control the Amperage of a WallBox through its API

## Description of the project :

```
TODO
```

---

## Documentation :
## Members

<dl>
<dt><a href="#maxChargingCurrent">maxChargingCurrent</a></dt>
<dd><p>Le courant max de charge du chargeur</p>
</dd>
<dt><a href="#responsePuissance">responsePuissance</a></dt>
<dd><p>La puissance à partir de laquelle on veut charger</p>
</dd>
<dt><a href="#stopCounter">stopCounter</a></dt>
<dd><p>Compteur utile pour arreter la charge</p>
</dd>
</dl>

## Constants

<dl>
<dt><a href="#seuilPuissance">seuilPuissance</a></dt>
<dd><p>Le seuil de puissance pour pouvoir arreter la charge</p>
</dd>
<dt><a href="#jwtToken">jwtToken</a></dt>
<dd><p>The JWT Token with it expiration date</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#setmaxChargingCurrent">setmaxChargingCurrent()</a></dt>
<dd><p>Set the value of maxChargingCurrent by function</p>
</dd>
<dt><a href="#auth">auth()</a></dt>
<dd><p>The function below is used to authenticate the user and setup the refurbishment of the token</p>
</dd>
<dt><a href="#setAmperage">setAmperage(value)</a></dt>
<dd><p>This function is used to set the amperage of the charger</p>
</dd>
<dt><a href="#switchOff">switchOff()</a></dt>
<dd><p>This function is used to stop the charger</p>
</dd>
<dt><a href="#switchOn">switchOn()</a></dt>
<dd><p>This function is used to start the charger</p>
</dd>
<dt><a href="#getShellyPower">getShellyPower()</a></dt>
<dd><p>This function is used to get the power of the shelly</p>
</dd>
<dt><a href="#main1">main1()</a></dt>
<dd><p>The function below is used to start the script</p>
</dd>
<dt><a href="#main2">main2()</a></dt>
<dd><p>The function below is used to start the body of the script</p>
</dd>
<dt><a href="#setJwtToken">setJwtToken(token, expiration)</a></dt>
<dd><p>The function below is used to modify the jwtToken object</p>
</dd>
<dt><a href="#getAuthToken">getAuthToken(baseUrl, method, callback)</a> ⇒ <code>Promise</code></dt>
<dd><p>The function below is used to generate the jwt Token for the API calls</p>
</dd>
<dt><a href="#fetchData">fetchData(baseUrl, method, callback, body)</a> ⇒ <code>Promise</code></dt>
<dd><p>The function below is used to make the API calls</p>
</dd>
<dt><a href="#delay">delay(ms)</a> ⇒ <code>Promise</code></dt>
<dd><p>A small fucntion to handle delay between API requests</p>
</dd>
<dt><a href="#logger">logger(message)</a></dt>
<dd><p>This function add a message to the console and to the log file</p>
</dd>
</dl>

<a name="maxChargingCurrent"></a>

## maxChargingCurrent
Le courant max de charge du chargeur

**Kind**: global variable  
<a name="responsePuissance"></a>

## responsePuissance
La puissance à partir de laquelle on veut charger

**Kind**: global variable  
<a name="stopCounter"></a>

## stopCounter
Compteur utile pour arreter la charge

**Kind**: global variable  
<a name="seuilPuissance"></a>

## seuilPuissance
Le seuil de puissance pour pouvoir arreter la charge

**Kind**: global constant  
<a name="jwtToken"></a>

## jwtToken
The JWT Token with it expiration date

**Kind**: global constant  
<a name="setmaxChargingCurrent"></a>

## setmaxChargingCurrent()
Set the value of maxChargingCurrent by function

**Kind**: global function  
<a name="auth"></a>

## auth()
The function below is used to authenticate the user and setup the refurbishment of the token

**Kind**: global function  
<a name="setAmperage"></a>

## setAmperage(value)
This function is used to set the amperage of the charger

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>Number</code> | The value of the amperage |

<a name="switchOff"></a>

## switchOff()
This function is used to stop the charger

**Kind**: global function  
<a name="switchOn"></a>

## switchOn()
This function is used to start the charger

**Kind**: global function  
<a name="getShellyPower"></a>

## getShellyPower()
This function is used to get the power of the shelly

**Kind**: global function  
<a name="main1"></a>

## main1()
The function below is used to start the script

**Kind**: global function  
<a name="main2"></a>

## main2()
The function below is used to start the body of the script

**Kind**: global function  
<a name="setJwtToken"></a>

## setJwtToken(token, expiration)
The function below is used to modify the jwtToken object

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| token | <code>String</code> | The token to be stored |
| expiration | <code>Date</code> | The expiration date of the token |

<a name="getAuthToken"></a>

## getAuthToken(baseUrl, method, callback) ⇒ <code>Promise</code>
The function below is used to generate the jwt Token for the API calls

**Kind**: global function  
**Returns**: <code>Promise</code> - The promise of the API call  

| Param | Type | Description |
| --- | --- | --- |
| baseUrl | <code>String</code> | The endpoint of the API Request |
| method | <code>String</code> | The method of the API Request |
| callback | <code>function</code> | The callback function to be called after the API call |

<a name="fetchData"></a>

## fetchData(baseUrl, method, callback, body) ⇒ <code>Promise</code>
The function below is used to make the API calls

**Kind**: global function  
**Returns**: <code>Promise</code> - The promise of the API call  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| baseUrl | <code>String</code> |  | The endpoint of the API Request |
| method | <code>String</code> |  | The method of the API Request |
| callback | <code>function</code> |  | The callback function to be called after the API call |
| body | <code>Object</code> | <code>{}</code> | The body of the API Request |

<a name="delay"></a>

## delay(ms) ⇒ <code>Promise</code>
A small fucntion to handle delay between API requests

**Kind**: global function  
**Returns**: <code>Promise</code> - The promise of the timeout  

| Param | Type | Description |
| --- | --- | --- |
| ms | <code>Number</code> | The number of milliseconds to wait |

<a name="logger"></a>

## logger(message)
This function add a message to the console and to the log file

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>String</code> | The message to be logged |


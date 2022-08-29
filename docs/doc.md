## Constants

<dl>
<dt><a href="#energy">energy</a></dt>
<dd><p>A simple array to store the energy values</p>
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
<dt><a href="#getLastSession">getLastSession()</a></dt>
<dd><p>This function handle the retrieval of the last session</p>
</dd>
<dt><a href="#setAmperage">setAmperage(value)</a></dt>
<dd><p>This function is used to set the amperage of the charger</p>
</dd>
<dt><a href="#main">main()</a></dt>
<dd><p>The function below is used to start the script</p>
</dd>
<dt><a href="#setJwtToken">setJwtToken(token, expiration)</a></dt>
<dd><p>The function below is used to modify the jwtToken object</p>
</dd>
<dt><a href="#getAuthToken">getAuthToken(baseUrl, method, callback)</a> ⇒ <code>Promise</code></dt>
<dd><p>The function below is used to generate the jwt Token for the API calls</p>
</dd>
<dt><a href="#fetchData">fetchData(baseUrl, method, callback, body)</a> ⇒ <code>Promise</code></dt>
<dd><p>The function below is used to generate the jwt Token for the API calls</p>
</dd>
<dt><a href="#delay">delay(ms)</a> ⇒ <code>Promise</code></dt>
<dd><p>A small fucntion to handle delay between API requests</p>
</dd>
</dl>

<a name="energy"></a>

## energy
A simple array to store the energy values

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
<a name="getLastSession"></a>

## getLastSession()
This function handle the retrieval of the last session

**Kind**: global function  
<a name="setAmperage"></a>

## setAmperage(value)
This function is used to set the amperage of the charger

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>Number</code> | The value of the amperage |

<a name="main"></a>

## main()
The function below is used to start the script

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
The function below is used to generate the jwt Token for the API calls

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


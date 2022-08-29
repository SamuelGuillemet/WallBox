## Constants

<dl>
<dt><a href="#jwtToken">jwtToken</a></dt>
<dd><p>The JWT Token with it expiration date</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#auth">auth()</a></dt>
<dd><p>The function below is used to authenticate the user and setup the refurbishment of the token</p>
</dd>
<dt><a href="#main">main()</a></dt>
<dd><p>This function is the heart of the script</p>
</dd>
<dt><a href="#setJwtToken">setJwtToken(token, expiration)</a></dt>
<dd><p>The function below is used to modify the jwtToken object</p>
</dd>
<dt><a href="#getAuthToken">getAuthToken(baseUrl, method, callback)</a> ⇒ <code>Promise</code></dt>
<dd><p>The function below is used to generate the jwt Token for the API calls</p>
</dd>
</dl>

<a name="jwtToken"></a>

## jwtToken
The JWT Token with it expiration date

**Kind**: global constant  
<a name="auth"></a>

## auth()
The function below is used to authenticate the user and setup the refurbishment of the token

**Kind**: global function  
<a name="main"></a>

## main()
This function is the heart of the script

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


# GET Data Request

Request the saved data from the servers. The file name is saved inside the game, but I don't know where it's located.

## Request

### Request directory

`/10.CTR_JWVJ_datastore/ds/1/data/:fileName`

### Request headers

`Authorization: AWS INSERT_API_KEY_HERE:INSERT_SIGNATURE_HERE`

## Response

### Response value codes  

`HTTP 200` - This indicates valid API key and signature, and the data is returned as a `binary/octet-stream`.  
`HTTP 403` - Indicates an invalid API key and/or signature.  
`HTTP 404` - Indicates that the file doesn't exist (Probably not happening on normal cases).  


# POST Data Request

Save new data to the servers. The file name increases by one for each request being made.  

The request is being made to the root of the server `/`.

## Request  

### Request type  

`multipart/form-data`

### Request structure

The following structure is an example of how it should look:  

```
----------BOUNDARY--------BOUNDARYID
Content-Disposition: form-data; name="key"

10.CTR_JWVJ_datastore/ds/1/data/12345678901-00007 // This last section increases for each request
----------BOUNDARY--------BOUNDARYID
Content-Disposition: form-data; name="acl"

private // Unknown purpose
----------BOUNDARY--------BOUNDARYID
Content-Disposition: form-data; name="AWSAccessKeyId"

AMAZONAPIKEY1234
----------BOUNDARY--------BOUNDARYID
Content-Disposition: form-data; name="policy"

// The following string is using base64
ewogICJleHBpcmF0aW9uIjogIjIwMjItMTAtMzBUMTU6MjM6MTguOTg5Mjc0WiIsCiAgImNvbmRpdGlvbnMiOiBbCiAgICB7ImJ1Y2tldCI6ICJjdHItand2ai1saXZlIiB9LAogICAgeyJhY2wiOiAicHJpdmF0ZSIgfSwKICAgIFsiZXEiLCAiJGtleSIsICIxMC5DVFJfSldWSl9kYXRhc3RvcmUvZHMvMS9kYXRhLzEyMzQ1Njc4OTAxLTAwMDA3Il0sCiAgICBbImNvbnRlbnQtbGVuZ3RoLXJhbmdlIiwgNDU0LCA0NTRdCiAgXQp9
----------BOUNDARY--------BOUNDARYID
Content-Disposition: form-data; name="signature"

uNiQuEsIgNaTuRePeRrEqUeSt123==
----------BOUNDARY--------BOUNDARYID
Content-Disposition: form-data; name="file"

// This section contains all the save data as binary
----------BOUNDARY--------B34F03DAD085D8D5----
```

The following structure contains the decrypted base64 data:  

```json
{
  "expiration": "2022-10-30T15:23:18.989274Z",
  "conditions": [
    {"bucket": "ctr-jwvj-live" },
    {"acl": "private" },
    ["eq", "$key", "10.CTR_JWVJ_datastore/ds/1/data/12345678901-00007"],
    ["content-length-range", 454, 454]
  ]
}
```

## Response

### Response value codes  

`HTTP 204` - This indicates valid request, and that the data was saved successfully. No data is returned  
`HTTP 403` - Indicates an invalid value in one or more keys.


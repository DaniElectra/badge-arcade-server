# Nintendo Badge Arcade server

An open-source implementation of the servers for Nintendo Badge Arcade.  

## Current status  

Nintendo Badge Arcade uses NEX as a communication method between the game and the servers. The previous servers I made weren't using NEX. Instead, they were more like a *patch* to store the game saves locally.  
Currently, I am working on implementing proper servers over NEX. You can find the current progress on the folders of this project:  

- `badge-arcade-authentication` contains the NEX authentication server.  
- `original` contains the original implementation.  

## How to use

First, download the project using `npm`:

```shell
npm install https://github.com/DaniElectra/badge-arcade-server
```

When the server is installed, copy the `example.config.json` to `config.json` and personalize it to your needs.

After that, run the server using NodeJS:  

```shell
node src/server.js
```

This will create the `data` folder, which will host the main data for each account.

Now, use a proxy server to redirect your traffic from your Nintendo 3DS to the server. If you will use `mitmproxy`, you can use the Python script available with the code:  

```shell
mitmproxy -s badge-arcade.py --no-http2
```

**Disclaimer**: the server doesn't *(currently)* retrieve any information from the official servers, and thus it will not contain your saves. You will need to provide it yourself by capturing the data using a proxy.  

## What works  

- [x] GET your saved data  
- [x] POST new data  
- [ ] Handle creating new accounts

## Internal workings  

Before connecting to the main server, some connections are made to Nintendo's BOSS servers to retrieve the following files:  

- `playinfo_v131.dat`: Unknown purpose. This file is **always** retrieved.  
- `data_v131.dat`: Yaz0 compressed SARC archive. It mostly contains text and dialogues. This file is only retrieved when there's a newer file on the server.  
- `allbadge_v131.dat`: Yaz0 compressed SARC archive. It contains all badges available in the game. I haven't been able to capture traffic to this file, so I suppose it's only retrieved on **creation of new accounts**.  

Except for `playinfo_v131.dat`, all of the files mentioned above can be found decrypted and decompressed inside the `extdata` of the game.

The main Badge Arcade server is hosted on an AWS S3 server, and it requires an Authorization key and a valid signature to allow processing the requests.  

Since the signature verification is private to the server, this project doesn't include it and thus, it will not verify valid connections for each user. However, we can make request verifications to ensure that valid requests are made and aren't tampered (this is still WIP).

You can check out detailed information about the requests that are made to the server here:  

- [GET Data Request](docs/get-data.md)
- [POST Data Request](docs/post-data.md)

## Credits  

- The reverse-engineering of the servers was made using [mitmproxy-nintendo](https://github.com/superwhiskers/mitmproxy-nintendo) and [boss-js](https://github.com/PretendoNetwork/boss-js).  
- The codebase of this project is based on Pretendo Network's [BOSS](https://github.com/PretendoNetwork/BOSS) servers.

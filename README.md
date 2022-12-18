# Nintendo Badge Arcade server

An open-source implementation of the servers for Nintendo Badge Arcade.  

## Current status  

Nintendo Badge Arcade uses NEX as a communication method between the game and the servers. The previous servers I made weren't using NEX. Instead, they were more like a *patch* to store the game saves locally.  

Currently, I am working on implementing proper servers over NEX. You can find the current progress on the folders of this project:  

- `badge-arcade-authentication` contains the NEX authentication server.  
- `badge-arcade-secure` contains the NEX secure server.  
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

- [x] Connect to the servers
- [ ] GET your saved data*  
- [ ] POST new data*  
- [x] Handle creating new accounts

\* This functionality hasn't been tested, but it should theoretically work.  

## Internal workings  

Documentation is being moved to [3dbrew](https://www.3dbrew.org/wiki/Nintendo_Badge_Arcade). You can check out the website to see the internal workings.

## Credits  

Special thanks to:
- The [Pretendo Network](https://github.com/PretendoNetwork) team and the developers of all of the reverse-engineering tools.  
- The documentation of the NEX protocol made by [kinnay](https://github.com/kinnay/NintendoClients/wiki).  

The codebase of this project is based on Pretendo Network's [BOSS](https://github.com/PretendoNetwork/BOSS) servers.  


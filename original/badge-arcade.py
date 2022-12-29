from mitmproxy import ctx
import mitmproxy.http

xmldata = '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?><nex_token><host>192.168.1.1</host><nex_password>nexpassword</nex_password><pid>PID</pid><port>59400</port><token>token</token></nex_token>'''

class LocalRedirect:
    def __init__(self):
        print("Nintendo Badge Arcade redirect activated!")

    def request(self, flow: mitmproxy.http.HTTPFlow):
        if 's3_bucket_name.datastoreurl.com' in flow.request.pretty_host:
            ctx.log.info("pretty_host is: %s" % flow.request.pretty_host)
            
            # Change these settings to your needs
            flow.request.host = "localhost"
            flow.request.port = 8080 # The AWS server port
            flow.request.scheme = "http"

        if flow.request.pretty_url == "https://account.pretendo.cc/v1/api/provider/nex_token/@me?game_server_id=00134600":
            ctx.log.info("pretty_host is: %s" % flow.request.pretty_host)
            flow.response = mitmproxy.http.Response.make(
                200,
                xmldata,
                {"Content-Type":"application/xml;charset=UTF-8"}
            )

addons = [
        LocalRedirect()
]


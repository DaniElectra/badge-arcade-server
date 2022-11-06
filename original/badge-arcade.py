from mitmproxy import ctx
import mitmproxy.http

class LocalRedirect:
    def __init__(self):
        print("Nintendo Badge Arcade redirect activated!")

    def request(self, flow: mitmproxy.http.HTTPFlow):
        if 'ctr-jwvj-live.s3.amazonaws.com' in flow.request.pretty_host:
            ctx.log.info("pretty_host is: %s" % flow.request.pretty_host)
            
            # Change these settings to your needs
            flow.request.host = "localhost"
            flow.request.port = 8080
            flow.request.scheme = "http"

addons = [
        LocalRedirect()
]


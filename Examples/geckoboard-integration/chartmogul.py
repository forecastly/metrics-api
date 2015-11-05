import urllib.request
import ssl
import base64
import json

import certifi

token = 'token'
secret = 'secret'

context = ssl.SSLContext(ssl.PROTOCOL_TLSv1_2)
context.verify_mode = ssl.CERT_REQUIRED
context.load_verify_locations(certifi.where())
httpsHandler = urllib.request.HTTPSHandler(context = context)

opener = urllib.request.build_opener(httpsHandler)

credentials = '%s:%s' % (token, secret)
authorization = 'Basic %s' % (base64.b64encode(credentials.encode('ascii')).decode('ascii'))
opener.addheaders = [('AUTHORIZATION', authorization)]

# Used globally for all urllib.request requests.
# If it doesn't fit your design, use opener directly.
urllib.request.install_opener(opener)

response = urllib.request.urlopen('https://api.chartmogul.com/v1/metrics/all?start-date=2015-01-01&end-date=2015-02-01')
json_response = json.loads(response.read().decode('utf-8'))

print(json.dumps(json_response, indent=2))

import urllib.request
import json

token = "api_token"
secret = "api_secret"

password_manager = urllib.request.HTTPPasswordMgrWithDefaultRealm()
password_manager.add_password(None, 'http://localhost:9292/v1/', token, secret)
http_handler = urllib.request.HTTPBasicAuthHandler(password_manager)
page_opener = urllib.request.build_opener(http_handler)
urllib.request.install_opener(page_opener)

req = urllib.request.Request(
  'https://api.chartmogul.com/v1/metrics/mrr?start-date=2015-06-27&end-date=2015-07-15',
  method='GET'
)

response = urllib.request.urlopen(req)
json_response = json.loads(response.readall().decode('utf-8'))

print(json.dumps(json_response, indent=2))


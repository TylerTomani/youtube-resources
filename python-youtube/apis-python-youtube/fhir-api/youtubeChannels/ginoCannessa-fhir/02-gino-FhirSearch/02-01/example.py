import requests
import json
fhir_url = 'http://hapi.fhir.org/baseR4/'
# search_params = {
#     'given':'eve'
# }
url = f'{fhir_url}metadata'
headers = {
    'Accept': 'application/fhir+json'
}
# response = requests.get(url, params=search_params,headers=headers)
response = requests.get(url,headers=headers)
if response.status_code == 200:
    fhir_data = response.json()
    pretty_data = json.dumps(fhir_data,indent=2)
    with open('../CapabilityStatment.json','w') as f:
        f.write(pretty_data)
        f.close()
    print(pretty_data)
else:
    print(f'Error: {response.status_code}')
    print(f'{response.text}')
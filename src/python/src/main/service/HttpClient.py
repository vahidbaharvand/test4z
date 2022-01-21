import requests
import json
from utility import get_test4z_connection

def post_request(method, payload):
      print("Test4z " + method + " request...")
      SESSION = get_test4z_connection()
      HEADERS={'content-type' : "application/json"}
      response = requests.post(
        SESSION["url"] + method,
        data=payload,
        auth=(SESSION["user"], SESSION["password"]),
        headers=HEADERS,
        verify=SESSION["ssl_verification"],
        timeout=SESSION["timeout"]
      )
      return response.json()

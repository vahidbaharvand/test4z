# Test4z http client for the API requests

import requests
import json
from utility import get_test4z_connection

def post_request(method, payload):
    try:
        print("\nTest4z " + method + " request...")
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
        print("Request completed")
        return response.json()
    except Exception:
            raise Exception("Unexpected error")

def get_request(method):
    try:
        print("\nTest4z " + method + " request...")
        SESSION = get_test4z_connection()
        HEADERS={'content-type' : "application/json"}
        response = requests.get(
            SESSION["url"] + method,
            auth=(SESSION["user"], SESSION["password"]),
            headers=HEADERS,
            verify=SESSION["ssl_verification"],
            timeout=SESSION["timeout"]
        )
        print("Request completed")
        return response.json()
    except Exception:
            raise Exception("Unexpected error")

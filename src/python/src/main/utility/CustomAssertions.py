def assertRequestSuccessful(response):
    if not 'data' in response:
        raise AssertionError(response)

def assertJobSuccessful(response):
    if not response['retcode'] in ["CC 0000", "CC 0004"]:
        raise AssertionError("Expected return code CC 0000 or CC 0004 but received: " + response['retcode'])

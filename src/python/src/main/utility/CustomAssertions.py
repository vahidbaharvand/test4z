def request_successful(response):
    if 'data' in response:
        return True
    else:
        raise AssertionError(response)

def job_successful(response):
    if response['retcode'] in ["CC 0000", "CC 0004"]:
        return True
    else:
        raise AssertionError("Expected return code CC 0000 or CC 0004 but received: " + response['retcode'])

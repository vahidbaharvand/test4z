import os

class CustomAssertions:
    def assertRequestSuccessful(self, response):
        if not 'data' in response:
            raise AssertionError(response)

    def assertJobSuccessful(self, response):
        if not response['retcode'] == "CC 0000":
            raise AssertionError("Expected return code CC 0000 but received: " + response['retcode'])

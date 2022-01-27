# Test4z Python Samples

This repository contains the UpdateSample of Test4z in Python and the tests are written using Pytest framework.

# Installations

1. Download Python from https://www.python.org/downloads

2. Restart the command prompt

3. Install pip from https://pip.pypa.io/en/stable/installation

4. Restart the command prompt

5. Install the following dependencies:

        ZOWE:
            pip install zowe

        PyTest:
            pip install pytest pytest-html
          
        Requests:
            pip install requests
         
        Polling:      
            pip install polling
            
        Json schema:
            pip install jsonschema
         
      
# Configuration 

1. Open the **src/python/config.cfg** file and fill in the parameters.


# Run Test4z Python Samples

1. Navigate to the test directory

      cd src/python/src/test/update 

2. Run the test using the following command:

      pytest -s  test_update_sample.py 

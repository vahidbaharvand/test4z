# Test4z Python Samples

This repository contains the UpdateSample of Test4z in Python and the tests are written using Pytest framework.

# Installations

1. Download Python from https://www.python.org/downloads

2. Install pip from https://pip.pypa.io/en/stable/installation

3. Install **PyTest** testing framework:
 
      pip install –U pytest pytest-html

4. Install **requests** to handle the API requests:
 
      pip install –U requests

5. Install **json validator**:
 
      pip install –U jsonschema 
      
# Configuration 

1. Open the **src/python/config.cfg** file and fill in the parameters.


# Run Test4z Python Samples

1. Navigate to the test directory

      cd src/python/src/test/update 

2. Run the test using the following command:

      pytest -s  test_update_sample.py 

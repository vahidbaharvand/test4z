# Test4z-Samples-Python
This repository contains the UpdateSample of Test4z in Python and the tests are written using Pytest framework.

# Installations

- Download Python from https://www.python.org/downloads

- Install pip from https://pip.pypa.io/en/stable/installation

- Install **PyTest** testing framework:
 
      pip install –U pytest pytest-html


- Install **requests** to handle API requests:
 
      pip install –U requests

- Install **json validator** framework:
 
      pip install –U jsonschema 
      
# Configuration 

- Open the **src/python/config.cfg** file and fill in the parameters.


# Run Test4z Python Samples

- Navigate to the test directory

      cd src/python/src/test/update 

- Run the test using the following command:

      pytest -s  test_update_sample.py 

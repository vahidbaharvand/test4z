# Test4z Python Samples

This repository contains the Test4z Update Sample in Python. The tests are written using the Pytest framework.

# Installing

1. Download Python from https://www.python.org/downloads

2. Restart the command prompt

3. Make sure you have pip installed by executing the following command:

        pip --version
    If it's not installed, install pip from https://pip.pypa.io/en/stable/installation

4. Restart the command prompt. Execute the following command to install the dependencies:

        python -m pip install -r requirements.txt        
      
# Configuration 

1. Open the **src/python/config.cfg** file and enter the required parameters.

# Run Test4z Python Samples

1. Navigate to the test directory

        cd src/python/src/test/update 

2. Run the test using the following command:

        pytest -s  test_update_sample.py 

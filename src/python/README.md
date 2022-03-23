# Test4z Python Samples

This repository contains the Test4z Update Sample in Python. The tests are written using the Pytest framework.

# Note
**Before installing the Test4z Python samples, make sure that you set up the Test4z Sample project on your system. Click [here](/README.md) for more information**

# Installing

1. Download Python 3 from https://www.python.org/downloads

2. Restart the command prompt

3. Make sure you have pip installed by executing the following command:

        pip --version
    If it's not installed, install pip from https://pip.pypa.io/en/stable/installation, or from a reliable source

4. Restart the command prompt. Execute the following command to install the dependencies:

        python -m pip install -r requirements.txt
   on macOS use python3 command instead of python as default may be an earlier version.

      
# Configuration 

1. Open the **src/python/config.cfg** file and enter the required parameters. TEST4Z host url must start with https://...

# Run Test4z Python Samples

1. Navigate to the test directory

        cd src/python/src/test/update 

2. Run the test using the following command:

        pytest -s  test_update_sample.py 

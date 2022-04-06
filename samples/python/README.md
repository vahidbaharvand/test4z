# Test4z Python Samples

This repository contains the Test4z Update Sample in Python. The tests are written using the Pytest framework.

## Note
Before continue to this installation, make sure you completed the following installations:
* [/Readme.md](/README.md)
* [/samples/README.md](/samples/README.md)

## Installing

1. Navigate to the Python directory **/test4z/samples/python**

        cd python

2. Download Python 3 from https://www.python.org/downloads

3. Restart the command prompt

4. Make sure you have pip installed by executing the following command:

        pip --version
    If it's not installed, install pip from https://pip.pypa.io/en/stable/installation, or from a reliable source       

5. Execute the following command to install the dependencies:

        python -m pip install -r requirements.txt
   on macOS use python3 command instead of python as default may be an earlier version.

      
# Configuration 

1. Open the **src/python/config.cfg** file and enter the required parameters. TEST4Z host url must start with https://...

# Run Test4z Python Samples

1. Navigate to the test directory /test4z/samples/python/src/test/update

        cd src/test/update/ 
        
2. Check service status by executing the following command:

        pytest -s  diagnostic_check.py 

2. Run the test using the following command:

        pytest -s  test_update_sample.py 

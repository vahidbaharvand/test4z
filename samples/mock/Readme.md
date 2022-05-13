# Mocking
This repository contains the mocking service for Test4z. Run the Test4z mocking service to use the Test4z samples when Test4z is not running on mainframe. Once the service is running, you can start the samples.

## Installing and Running the Mocking Service
1. Open a new terminal.
2. Navigate to the samples folder.
   ```
   cd samples
   ```
3. Install the mocking service.
   ```
   npm install
   ```
4. Submit the following command to start the mocking service.
   ```
   npm run startMock
   ```
Wait until the service starts.

## NodeJS Samples
Follow these steps to use the NodeJS samples with mocked Test4z:
1. Open a new terminal.
2. Navigate to the samples folder.
   ```
   cd samples
   ```
3. Run the sample as described in [Run the Samples](/samples/nodejs#run-the-samples).
### Note
It is not necessaty to install the samples.

## Python Samples
Follow these steps to use the Python samples with mocked Test4z:
1. Install Python and pip as described in [Installing](/samples/python/README.md#installing).
2. Submit the following command to configure the mocking service:
    ```
   cd src/main/.scripts/ && python set_mock.py && cd ../../..
   ```
3. Run the sample as described in [Run the Test4z Python Samples](/samples/python/README.md#run-test4z-python-samples).
### Note
It is not necessaty to configure Test4z and z/OSMF.

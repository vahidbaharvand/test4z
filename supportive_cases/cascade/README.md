# Test4z Cascade Samples

This test folder contains different scenarios covering cascading of jobs like running in parallel(concurrent jobs) and in sequence.

All the test suites execute 3 jobs namely TS4ZJOB1, TS4ZJOB2 which executes with return code 00/04 and TS4ZHRC with return code 12. 
The three sample files describe the way these jobs can be executed based on their dependencies on each other.

## Note
Before continue to this installation, make sure you completed the following installations:
* [/Readme.md](/README.md)

   
## Installation

1. Open a **new terminal** and run the following commands:
    
        cd supportive_cases/cascade
    
        npm install

2. Run the following command and enter the ZOSMF specific information. 
   Ask your mainframe administrator for the information.
   **You can skip this step if you ran this command before**

        npm run setZosmf

3. Run the following command and enter your HLQ:

        npm run setHlq
        
4. Open the [/supportive_cases/cascade/setup/script.sh](/supportive_cases/cascade/setup/script.sh) file and fill in the required parameters listed at the beginning of the file. Important: Make sure you use UPPER CASE for HLQ and Job Card fields.
                                                                 
5. Copy the JCL test files to your z/OS system by executing the following command: 

        npm run setup

## Run the samples

    cascade1 : The sample test suite describes that if the jobs are independent from each other they can also be run in parallel which means all of them will be executed simultaneously in different test blocks. It continues to execute all of them irrespective of the status of the tests.
          
    cascade2 : The sample test suite describes that if TS4ZJOB2 is dependent on the execution status TS4ZHRC then TS4ZJOB2 will be executed after validating the status of TS4ZHRC, and these kind of dependent tasks must be written inside single test block. If it fails anywhere then the remaining steps are not executed and the test is marked as failed.

    cascade3 : The sample test suite describes that if the jobs are independent from each other they can be executed in different test blocks. It continues to execute all of them irrespective of the status of the tests.
    

* Run the tests using the following command:

        npm run test <FILENAME>


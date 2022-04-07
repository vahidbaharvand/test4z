# Test4z DB2 Sample

Example use case scenario:

1. The test suite writes 10 random records to the DB2 database.
2. Within the job submission, the batch application selects the records from the DB2 table based on some filters and afterwards it updates the notification date of this particular subset of records to today.
3. It is expected to have n records that have notification date as today. An SQL query will be executed to pick these records and to assert the n number.
4. The test suite removes the 10 random rows within the cleanup process.


## Information
* This sample test suite uses @zowe/db2-for-zowe-cli for the DB2 communication.
* To be able to run the tests, at least one of the following conditions must be fulfilled:
    1. z/OSMF system and DB2 system are on the same LPAR
    2. In the SetupBatchAppDB2.sh file, specify the DB2 system (ex: *JOBPARM SYSAFF=HB01)
    
## Note
Before continue to this installation, make sure you completed the following installations:
* [/Readme.md](/README.md)

   
## Installation
1. Open a **new terminal** and run the following commands:
    
        cd special-samples/db2
    
        npm install
        
2. Run the following commands and enter the ZOSMF specific information. 
   Ask your mainframe administrator for the information.
   **You can skip this step if you ran these commands before**

        npx zowe config set profiles.lpar1.profiles.zosmf.properties.host
    
        npx zowe config set profiles.lpar1.profiles.zosmf.properties.port
    
        npx zowe config set --secure profiles.lpar1.profiles.zosmf.properties.user
    
        npx zowe config set --secure profiles.lpar1.profiles.zosmf.properties.password

3. Run the following commands and enter the ZOSMF specific information. 
   Ask your mainframe administrator for the information.

        npx zowe config set profiles.lpar1.profiles.db2.properties.host
    
        npx zowe config set profiles.lpar1.profiles.test4z.properties.port
    
        npx zowe config set profiles.lpar1.profiles.test4z.properties.database
    
        npx zowe config set profiles.lpar1.profiles.test4z.properties.hlq
    
        
        npx zowe config set --secure profiles.lpar1.profiles.db2.properties.user
    
        npx zowe config set --secure profiles.lpar1.profiles.db2.properties.password

        
4. Open the [/special-samples/db2/setup/script.sh](/special-samples/cascade/setup/script.sh)  file and fill in the required parameters listed at the beginning of the file. Important: Make sure you use UPPER CASE for HLQ and Job Card fields.
                                                                 
5. Copy the JCL test files to your z/OS system by executing the following command: 

        npm run setup
        
## Run the samples

* Run the tests using the following command:

        npm run test <FILENAME>


## Notes

1. During the `npm install`, some of the dependencies may throw errors, as long as `npm install` doesn't interrupt, this errors must be ignored.

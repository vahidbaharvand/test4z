# Test4z DB2 Sample

Example use case scenario:

1. The test suite writes 10 random records to the DB2 database.
2. Within the job submission, the batch application selects the records from the DB2 table based on some filters and afterwards it updates the notification date of this particular subset of records to today.
3. It is expected to have n records that have notification date as today. An SQL query will be executed to pick these records and to assert the n number.
4. The test suite removes the 10 random rows within the cleanup process.


### Information
* This sample test suite uses @zowe/db2-for-zowe-cli for the DB2 communication.
* To be able to run the tests, at least one of the following conditions must be fulfilled:
    1. z/OSMF system and DB2 system are on the same LPAR
    2. In the SetupBatchAppDB2.sh file, specify the DB2 system (ex: *JOBPARM SYSAFF=HB01)

### Prerequisites
Before you attempt to install&run the Test4z DB2 Sample project, ensure you meet the following prerequisites:

*   Visual Studio Code (VS Code) is installed.
*   Node.js is installed.
*   If you use Windows, ensure VS Code uses bash to execute shell (.sh) scripts. Follow these steps:
    *   Download and install Git BASH.
    *   In VS Code, open the command palette (Ctrl+Shift+P).
    *   Type and select “Terminal: Select Default Shell”.
    *   Select "Git Bash" as your default shell.
*   If you have VS Code running, restart it.
*   You may need to ask the following details to your mainframe administrator:
    *   DB2 create database, create/read/write table privileges with your mainframe account.
    *   DB2 connection details -check the installation section step 1 for the fields.

   
### Installing
Once you have met the prerequisites, follow these steps to install the Test4z Sample project on your local machine:

1. Open a new terminal in VS Code (Terminal > New Terminal) and install the project dependencies using the following command:

        npm install

2. Open the **src/setup-files/Db2-files/SetupBatchAppDB2.sh** file and fill in the required parameters listed at the beginning of the file. Important: Make sure you use UPPER CASE for HLQ and Job Card fields.

3. Open the zowe.config.json file and fill the fields under DB2 and zosmf tags.

4. Enter your Mainframe username and password by executing the following commands in the given order through the Terminal (enter the command, hit the enter key and you will be prompted to enter  your information):
        
        DB2 profile:
          npx zowe config set --secure profiles.lpar1.profiles.db2.properties.user 
          npx zowe config set --secure profiles.lpar1.profiles.db2.properties.password
          
        zosmf profile:
          npx zowe config set --secure profiles.lpar1.profiles.zosmf.properties.user 
          npx zowe config set --secure profiles.lpar1.profiles.zosmf.properties.password
             
5. Copy the required files to your z/OS system by executing the following command (**make sure all the necessary fields are filled as mentioned in the previous step**):
        
        npm run uploadDb2Files
        
   You created  a database and a blank table on the z/OS system along with the batch application files.
              
## Run Test4z DB2 Test Sample
After installing the Test4z DB2 Sample project and copying the required files to your z/OS system, you can start running the sample tests provided in this project. The sample tests use the sample DB2 database table that you created in your z/OS system. Follow these steps to run the sample tests:

  1. In VS Code, go to the src/test/samples/db2 directory.
  
     This folder contains a test file for a particular DB2 use case.

  2. Open the sample db2Sample.test.ts file.

  4. Run the test. Run the tests using the following command:

          npm run test db2Sample.test.ts 
  
If everything was set up properly, the sample test should pass.
 
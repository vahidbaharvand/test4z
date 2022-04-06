# Test4z Python Samples

This repository contains the Test4z Samples in NodeJS. 

# Note
Before continue to this installation, make sure you completed the following installations:
* [/Readme.md](/README.md)
* [/samples/README.md](/samples/README.md)

## Continue Installing

1. Run the following commands and enter the Test4z specific information. Ask your mainframe administrator for the information. Test4z is shipped with a self signed certificate. The rejectUnauthorized property is false by default.

        npx zowe config set profiles.lpar1.profiles.test4z.properties.host

        npx zowe config set profiles.lpar1.profiles.test4z.properties.port

        npx zowe config set profiles.lpar1.profiles.test4z.properties.hlq

        npx zowe config set --secure profiles.lpar1.profiles.test4z.properties.user

        npx zowe config set --secure profiles.lpar1.profiles.test4z.properties.password
    
2. Before running the samples, check Test4z Service health status by executing the following command:

        npm run diagnostic
        
    It controls the 7 main permissions that enable you to run the Test4z Samples
    
    | Permission | Description |
    | --- | --- |  
    **dsCreate**         | Checks whether the user ID has sufficient rights to create data sets
    **commandExec**      | Checks whether the user ID has sufficient rights to execute TSO commands through TSOCMD
    **fmpLoadLibExist**  | Checks whether the load library exists
    **fmpLoadLibValid**  | Checks whether the load library belongs to File Master Plus
    **fmpLoadLibAccess** | Checks whether the user ID has sufficient rights to access the load library
    **dsDelete**         | Checks whether the user ID has sufficient rights to delete existing data sets. If the user ID does not have sufficient rights to delete data sets, the Test4z APIs execute, but do not delete the temporary data sets created during execution
    **dsWrite**          | Checks whether the user ID has sufficient rights to write records in existing data sets
                              
    **Possible values for these controls : Pass, Fail and Skip**

## Test4z Test Samples

* In the code snippets folder, you can find small code snippets for each of the Tezt4z features. These functional snippets can lead you to create your own test suite
    * compare
    * copy
    * search
    * update
    
* In the business cases folder, you can find test suites of real world applications. Each sub folder has the use case explanation.
    * checkOrdering 
    
## Run the samples

* Run the tests using the following command:

        npm run test <FILENAME>

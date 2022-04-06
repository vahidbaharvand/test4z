# Test4z Sample
The Test4z sample project contains client-side installation of Test4z as well as a series of sample tests that use the Test4z API to run tests on data sets on your z/OS system.

Test4z leverages z/OSMF and Zowe to facilitate batch application testing for flat files on the z/OS platform. Installing Test4z on your z/OS system lets you perform certain operations on your data sets from a client machine. Currently, the following operations are supported:
* **Compare** records contained in two different versions of a data set.
* **Search** through records in a data set.
* **Update** records in a dataset
* **Copy** data set with filter, skip, limit possibilities

#SOME EXPLANATION OF THE SAMPLE TYPES

## Getting Started
Follow these instructions to set up the Test4z Sample project on your local machine.

### Prerequisites
Before you attempt to install the Test4z Sample project, ensure you meet the following prerequisites:

* Test4z is deployed, configured and running on your z/OS system.
* [Visual Studio Code](https://code.visualstudio.com/download) (VS Code) is installed.
* [Node.js](https://nodejs.org/en/download/) is installed.
* If you use Windows, ensure VS Code uses bash to execute shell (.sh) scripts. Follow these steps:
    1. Download and install [Git BASH](https://git-scm.com/download/win).
    2. In VS Code, select "Git Bash" as your default shell. Check [here](https://code.visualstudio.com/docs/editor/integrated-terminal#_terminal-profiles) for guidance.
* If you have VS Code running, restart it.

### Installing
Once you have met the prerequisites, 

1. Clone the repository to your local machine. In VS Code:
    1. Open the command palette (Ctrl+Shift+P). 
    2. Type and select "Git Clone".
    3. Enter the URL of this repository. 
    4. Use your GitHub access token. ([How to create a personal access token](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token))

2. Open the Test4z Project in VS Code:
    1. Go to File > Open Folder.
    2. Open the cloned git repository.
    
3. Choose one 

    * [Samples](/samples/README.md)
    * Special Samples:
        * [DB2](/special-samples/db2/README.md)
        * [Cascade](/special-samples/cascade/README.md)


 ## The Batch Application used in the Samples
You can search, compare, copy, and update sequential and VSAM files using Test4z. All the services available with Test4z have a sample provided that shows how to use the service. Each sample has also a readme file.

**Note:** Keep in mind that these are just samples and only meant to help you get started with Test4z.

For the samples, a batch application has been created and is submitted using Zowe. The batch application performs the following steps:

1. Filter out records from the main dataset based on the **TOTAL_CHECKS**, **ACTUAL_CHECKS**, and **PRODUCT_TYPE** parameters. The records are filtered according to the following criteria:
          
       (ACTUAL-CHECKS <= 3 AND TOTAL-CHECKS = 30 AND (PRODUCT-TYPE='S' OR PRODUCT-TYPE='C)) OR
       (ACTUAL-CHECKS <= 5 AND TOTAL-CHECKS = 50 AND (PRODUCT-TYPE='S' OR PRODUCT-TYPE='C)) OR
       (ACTUAL-CHECKS <= 8 AND TOTAL-CHECKS = 80 AND (PRODUCT-TYPE='S' OR PRODUCT-TYPE='C))
      
2. Modify the filtered records by setting the notification date to the current (today) date.
The modified records are then used by the sample test case.

 ## Additional
*  DB2 samples and DB2 specific readme.md file: [/src/test/samples/db2](./src/test/samples/db2)
 
*  Cascading (dependent job) samples and cascading specific readme.md file: [/src/test/samples/cascade](./src/test/samples/cascade)

 ## Notes
 
1. Exclude feature of the Compare endpoint requires a certain File Master Plus version 
   12.0 and the required PTF installation. Make sure you have the required PTF to be able to use the field exclusion.
  
## License
Visit [LICENSE.md](LICENSE.md) file.

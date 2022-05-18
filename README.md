# Test4z Sample
The Test4z sample project contains the client-side installation of Test4z and a series of sample tests that use the Test4z API to run tests on data sets on your z/OS system.

Test4z leverages z/OSMF and Zowe to facilitate batch application testing for files on the z/OS platform. Test4z lets you perform certain operations on your data sets from a client machine. Currently, the following operations are supported:
* **Compare** records contained in two different data sets.
* **Search** through records in a data set.
* **Update** records in a dataset.
* **Copy** data sets with the possibility of filtering, skipping, and limiting.

## Getting Started
Follow these instructions to set up the Test4z Sample project on your local machine.

### Prerequisites
Before you attempt to install the Test4z Sample project, ensure you meet the following prerequisites:

* Test4z is deployed, configured and running on your z/OS system. This is optional if you use the mock service.
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
    
3. To continue with the installation,  refer to the Readme of the specific location: 

    * [Samples](/samples/README.md)  ***(Test case samples that demonstrate the features and functions of Test4z using different languages and test frameworks.)***
    * Supportive Cases: ***(Handy test case samples that demonstrate various techniques, integrations, and subsystems)***
        * [DB2](/supportive_cases/db2/README.md)
        * [Job Cascade](/supportive_cases/cascade/README.md)
        * [Ca-View](/supportive_cases/ca-view/README.md)

## Notes
 
Exclude feature of the Compare endpoint requires a certain File Master Plus version 12.0 and the required PTF installation. Make sure you have the required PTF to be able to use the field exclusion.

## Compatibility
The following table show the compatibility matrix between the Test4z sample aproject and the Test4z service that runs on z/O.S
|Compatibility/Release|1.0|1.1.1|1.2.2|
|-----|----|----|----|
|Test4z service 1.0|YES|NO|NO|
|Test4z service 1.1.1|YES|YES|NO|
|Test4z service 1.2.2|YES|YES|YES|
  
## License
See the [LICENSE.md](LICENSE.md) file.

# Purpose of the sample
This test folder contains samples to download the reports from Web Viewer instance by using the caview-plugin-for-zowe when the job is submitted from Zowe.

# Prerequisites
Web-Viwer instance ready and running to collect the jobs submitted through zOSMF.

## Installation

1. Open a **new terminal** and run the following commands:
    
        cd supportive-cases/ca-view
    
        npm install

2. Run the following command by providing the username and password. 
   Ask your mainframe administrator for the information.
   **You can skip this step if you ran these commands before**

        $ zowe profiles create caview myProfile --protocol https --hostname lpar1.company.com --port 1443 --username johndoe --password secret

# Purpose of the sample
This test folder contains samples to download the reports from Web Viewer instance by using the caview-plugin-for-zowe when the job is submitted from Zowe.

# Prerequisites
Web-Viewer instance ready and running to collect the jobs submitted through zOSMF.

## Installation

1. Open a **new terminal** and run the following commands:
    
        cd supportive-cases/ca-view
    
        npm install

2. Run the following commands by providing the username and password. 
   Ask your mainframe administrator for the information.
   **You can skip this step if you ran these commands before**

       npx zowe config set --secure profiles.lpar1.profiles.caview.properties.user
       npx zowe config set --secure profiles.lpar1.profiles.caview.properties.password


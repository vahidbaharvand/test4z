#General Configuration
*****
* Open new terminal 

`cd samples`

`npm install`
*****

    npx zowe config set profiles.lpar1.profiles.zosmf.properties.host

    npx zowe config set profiles.lpar1.profiles.zosmf.properties.port

    npx zowe config set profiles.lpar1.profiles.zosmf.properties.hlq

    npx zowe config set --secure profiles.lpar1.profiles.zosmf.properties.user
 
    npx zowe config set --secure profiles.lpar1.profiles.zosmf.properties.password
***
* edit /setup/script.sh

* run following command

`npm run setup`
***
#NodeJS Samples
OPTIONAL (only for nodejes samples, skip for python)

    npx zowe config set profiles.lpar1.profiles.test4z.properties.host

    npx zowe config set profiles.lpar1.profiles.test4z.properties.port

    npx zowe config set profiles.lpar1.profiles.test4z.properties.hlq

    npx zowe config set --secure profiles.lpar1.profiles.test4z.properties.user

    npx zowe config set --secure profiles.lpar1.profiles.test4z.properties.password
***
Check service status by executing the following command:

    npm run diagnostic

***
run the following command for testing:

    npm run test compare
    npm run test copy
    npm run test search
    npm run test update
    
    npm run test checkordering    
***
#Python Samples

* Open new terminal 

* run following: 


    cd samples/python/src/test/update/

* fill config.cfg
* run following:


    pytest -s  test_update_sample.py 
    
***
#Cascade Samples

* Open new terminal 

* run following: 


    cd special-samples/cascade
    
    npm install


    npx zowe config set profiles.lpar1.profiles.zosmf.properties.host

    npx zowe config set profiles.lpar1.profiles.zosmf.properties.port

    npx zowe config set profiles.lpar1.profiles.zosmf.properties.hlq

    npx zowe config set --secure profiles.lpar1.profiles.zosmf.properties.user
 
    npx zowe config set --secure profiles.lpar1.profiles.zosmf.properties.password
    
* edit /setup/script.sh

* run following command:


    npm run setup
    
    npm run test db2Test
    
    npm run test cascade1
    
    npm run test cascade2
    
    npm runn test cascade3

***

#Db2 Samples

* Open new terminal 

* run following: 


    cd special-samples/db2
    
    npm install


    npx zowe config set profiles.lpar1.profiles.db2.properties.host

    npx zowe config set profiles.lpar1.profiles.test4z.properties.port

    npx zowe config set profiles.lpar1.profiles.test4z.properties.database

    npx zowe config set profiles.lpar1.profiles.test4z.properties.hlq



    npx zowe config set --secure profiles.lpar1.profiles.db2.properties.user

    npx zowe config set --secure profiles.lpar1.profiles.db2.properties.password

* edit /setup/script.sh

* run following command:


    npm run setup
    
    npm run test db2Test


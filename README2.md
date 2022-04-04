*****
Open new terminal 

`cd samples`

`npm install`
*****

`npx zowe config set profiles.lpar1.profiles.zosmf.properties.host <value>`

`npx zowe config set profiles.lpar1.profiles.zosmf.properties.port`

`npx zowe config set --secure profiles.lpar1.profiles.zosmf.properties.user`
 
`npx zowe config set --secure profiles.lpar1.profiles.zosmf.properties.password`
***
edit /setup/script.sh

run following command

`npm run setup`
***
OPTIONAL (only for nodejes samples, skip for python)

`npx zowe config set profiles.lpar1.profiles.test4z.properties.host`

`npx zowe config set profiles.lpar1.profiles.test4z.properties.port`

`npx zowe config set profiles.lpar1.profiles.test4z.properties.hlq`

`npx zowe config set --secure profiles.lpar1.profiles.test4z.properties.user`

`npx zowe config set --secure profiles.lpar1.profiles.test4z.properties.password`
***
Check service status by executing the following command:

`npm run diagnostic`

***
run the following command for testing:

    npm run test compare
    npm run test copy
    npm run test search
    npm run test update
    
    npm run test checkordering    
***
PYTHON

run following: 

    cd python/src/test/update/ 

fill config.cfg

    pytest -s  test_update_sample.py 
------------



db2:

`npx zowe config set profiles.lpar1.profiles.db2.properties.host`

`npx zowe config set profiles.lpar1.profiles.test4z.properties.port`

`npx zowe config set profiles.lpar1.profiles.test4z.properties.database`

`npx zowe config set profiles.lpar1.profiles.test4z.properties.hlq`



`npx zowe config set --secure profiles.lpar1.profiles.db2.properties.user`

`npx zowe config set --secure profiles.lpar1.profiles.db2.properties.password`

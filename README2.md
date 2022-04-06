
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


set -e

printf "\nPlease enter Test4z specific information when the command prompt asks\n"
npx zowe config set profiles.lpar1.profiles.test4z.properties.host
npx zowe config set profiles.lpar1.profiles.test4z.properties.port
npx zowe config set profiles.lpar1.profiles.test4z.properties.hlq
printf "(set http or https for the next command)\n"
npx zowe config set profiles.lpar1.profiles.test4z.properties.protocol
printf "\nEnter your mainframe username and password. To secure your credentials, the information you enter will be blank\n"
npx zowe config set --secure profiles.lpar1.profiles.test4z.properties.user
npx zowe config set --secure profiles.lpar1.profiles.test4z.properties.password
printf "\nTest4z information collected successfully\n\n"

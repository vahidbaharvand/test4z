set -e

printf "\nPlease enter Z/OSMF specific information when the command prompt asks\n"
npx zowe config set profiles.lpar1.profiles.zosmf.properties.host
npx zowe config set profiles.lpar1.profiles.zosmf.properties.port
printf "(set http or https for the next command)\n"
npx zowe config set profiles.lpar1.profiles.zosmf.properties.protocol
printf "\nEnter your mainframe username and password. To secure your credentials, the information you enter will be blank\n"
npx zowe config set --secure profiles.lpar1.profiles.zosmf.properties.user
npx zowe config set --secure profiles.lpar1.profiles.zosmf.properties.password
printf "\nZ/OSMF information collected successfully\n\n"

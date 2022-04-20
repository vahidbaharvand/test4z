#!/bin/bash
set -e

printf "\nPlease enter Z/OSMF HLQ when the command prompt asks\n"
npx zowe config set profiles.lpar1.profiles.zosmf.properties.hlq
printf "\nZ/OSMF HLQ information collected successfully\n\n"

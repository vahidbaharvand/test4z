#!/bin/bash
set -e
source ../../BaseScript.sh

############# IMPORTANT! UPDATE THE FOLLOWING PARAMETERS BEFORE RUNNING THIS SCRIPT: #############
hlq=""; #<--------------- The high-level qualifier of the mainframe user (as defined in the test4z profile in zowe.config.json )
storageClass=""; #<------------ Storage class for Test4z deployment (must be a permanent storage class)
jobcard="//JOB_NAME   JOB IDxxx,
//            'TEST4ZRN',
//             NOTIFY=\&SYSUID,
//        MSGLEVEL=(1,1)
/*JOBPARM SYSAFF=*"  #<----------- Customize this JOBCARD to your system specification. Consult your mainframe administrator if you are unsure what the jobcard should look like. NOTE: Prepend any special character with '\' (Example: &SYSUID ---> \&SYSUID)

#*************************************************************************************************
# UPDATE THE FOLLOWING PARAMETERS ! END
#*************************************************************************************************

#GLOBAL VARIABLES START - (DO NOT CHANGE)
tempDirectoryName="TEST4Z_TEMP";
hlqPlaceHolder='$$HLQ';
jobCardPlaceHolder='$$JOBCARD';
#GLOBAL VARIABLES END

#DATASET NAME DEF START - (DO NOT CHANGE)
TEST4Z_BATCHAPP_COPY="TEST4Z.BATCHAPP.COPY";
TEST4Z_BATCHAPP_JCL="TEST4Z.BATCHAPP.JCL";
TEST4Z_BATCHAPP_PGM="TEST4Z.BATCHAPP.PGM";
TEST4Z_BATCHAPP_DATA="TEST4Z.BATCHAPP.DATA";
TEST4Z_BATCHAPP_DBRMLIB="TEST4Z.BATCHAPP.DBRMLIB";
TEST4Z_BATCHAPP_LOADLIB="TEST4Z.BATCHAPP.LOADLIB";
#DATASET NAME DEF END

#MAIN START
createDirectory "$tempDirectoryName";
#Verify the length of each dataset
DSNValidation "$TEST4Z_BATCHAPP_COPY"
DSNValidation "$TEST4Z_BATCHAPP_JCL"
DSNValidation "$TEST4Z_BATCHAPP_PGM"
DSNValidation "$TEST4Z_BATCHAPP_DATA"
DSNValidation "$TEST4Z_BATCHAPP_LOADLIB"
DSNValidation "$TEST4Z_BATCHAPP_DBRMLIB"

#Params DATASET NAME - FILE PATH - DS TYPE - REPLACE_NEEDED?
upload "$TEST4Z_BATCHAPP_COPY" BROADCOM.TEST4Z.BATCHAPP.COPY PDS N
upload "$TEST4Z_BATCHAPP_JCL" BROADCOM.TEST4Z.BATCHAPP.JCL PDS Y
upload "$TEST4Z_BATCHAPP_PGM" BROADCOM.TEST4Z.BATCHAPP.PGM PDS N
upload "$TEST4Z_BATCHAPP_DATA" BROADCOM.TEST4Z.BATCHAPP.DATA PDS N
createteLibrary "$TEST4Z_BATCHAPP_LOADLIB"
create "$TEST4Z_BATCHAPP_DBRMLIB" PDS
compileCobol "$TEST4Z_BATCHAPP_JCL""(BUILD)";
removeDirectory "$tempDirectoryName";
printf "\n\n\nBash execution was successful: Sample data sets were successfully deployed to the mainframe.\n";
printf "Execute a test case, explore how it works and use it to build your own test cases.\n\n";
#MAIN END
#SCRIPT END

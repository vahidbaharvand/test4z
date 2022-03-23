pipeline
{
	agent {
        label 'test4z_sonar'
    }
	parameters {
        string(name: 'TEST_NAME', defaultValue: 'searchSlickoil', description: 'Name of test')
        string(name: 'ZOSMF_PORT', defaultValue: '1443', description: 'The z/OSMF server port.')
        string(name: 'ZOSMF_HOST', defaultValue: 'usilca31.lvn.broadcom.net', description: 'The z/OSMF server host name.')
        string(name: 'TEST4Z_HOST', defaultValue: 'ca32.lvn.broadcom.net', description: 'The Test4z server host.')
        choice(name: 'TEST4Z_PROTOCOL', choices: ['http', 'https'], description: 'The protocol used')
        string(name: 'TEST4Z_TYPE', defaultValue: 'basic', description: 'The Test4z server type.')
        string(name: 'TEST4Z_PORT', defaultValue: '6400', description: 'The Test4z server port.')
        string(name: 'TEST4Z_BASEPATH', defaultValue: '/api/v1/test4z', description: 'The Test4z basepath.')
        choice(name: 'TEST4Z_STRICTSSL', choices: ['true', 'false'], description: 'Strict SSL')
        string(name: 'TEST4Z_HLQ', defaultValue: 'PTCINCUB', description: 'HLQ of the test4z batchapp sample at mainframe.')
        choice(name: 'TEST4Z_REJECTUNAUTHORIZED', choices: ['true', 'false'], description: 'Reject self-signed certificates.')
    }
    //agent {label 'test4z_sonar'}
	stages {
        // stage('Clone Test4z project') {
        //     steps {
        //         // sh "rm /f /s /q test4z"
        //         // sh "rd /s /q test4z"
        //         //sh "git clone --branch SlickOilBatch https://github.com/BroadcomMFD/test4z.git"
        //         }
        // }

        stage('Install project dependencies') {
            steps {
                sh ''' cd test4z && npm install '''
                  }
        }

        // Set zowe config  of all related parameters
        stage('Set project configurations') {
            steps {
                // Set not secured parameters for zosmf profile 
                // Values are picked from the parameters to zowe.config.json
                sh "cd test4z && npx zowe config set profiles.lpar1.profiles.zosmf.properties.host ${ZOSMF_HOST} "
                sh " cd test4z && npx zowe config set profiles.lpar1.profiles.zosmf.properties.port ${ZOSMF_PORT} "
                
                // Set not secured parameters for test4z profile
                sh "cd test4z && npx zowe config set profiles.lpar1.profiles.test4z.properties.host ${TEST4Z_HOST} "
                sh "cd test4z && npx zowe config set profiles.lpar1.profiles.test4z.properties.protocol ${TEST4Z_PROTOCOL} "
                sh "cd test4z && npx zowe config set profiles.lpar1.profiles.test4z.properties.type ${TEST4Z_TYPE} "
                sh "cd test4z && npx zowe config set profiles.lpar1.profiles.test4z.properties.port ${TEST4Z_PORT} "
                sh "cd test4z && npx zowe config set profiles.lpar1.profiles.test4z.properties.basePath ${TEST4Z_BASEPATH} "
                sh "cd test4z && npx zowe config set profiles.lpar1.profiles.test4z.properties.strictSSL ${TEST4Z_STRICTSSL} "
                sh "cd test4z && npx zowe config set profiles.lpar1.profiles.test4z.properties.hlq ${TEST4Z_HLQ} "
                sh "cd test4z && npx zowe config set profiles.lpar1.profiles.test4z.properties.rejectUnauthorized ${TEST4Z_REJECTUNAUTHORIZED} "

                

                // Set secure parameters and credentials picked up from jenkins credential store
                withCredentials([usernamePassword(credentialsId: "zosmf_profile", usernameVariable: 'ZOWE_OPT_USER', passwordVariable: 'ZOWE_OPT_PASSWORD')]) {
                    // sh "cd test4z && npx zowe config set profiles.lpar1.profiles.zosmf.properties.user ${ZOWE_OPT_USER}"
                    // sh "cd test4z && npx zowe config set profiles.lpar1.profiles.zosmf.properties.password ${ZOWE_OPT_PASSWORD}"
					sh "cd test4z && npm run test ${TEST_NAME}.test.ts"
                }
                // withCredentials([usernamePassword(credentialsId: "zosmf_profile1", usernameVariable: 'ZOWE_OPT_USER', passwordVariable: 'ZOWE_OPT_PASSWORD')]){
                //     sh "cd test4z && npx zowe config set profiles.lpar1.profiles.test4z.properties.user ${ZOWE_OPT_USER}"
                //     sh "cd test4z && npx zowe config set profiles.lpar1.profiles.test4z.properties.password ${ZOWE_OPT_PASSWORD}"
        		// }   
            }
               
		}
		// stage('Run test') {
        //     steps {
        //         sh "cd test4z && npm run test ${TEST_NAME}.test.ts"
        //     }
		// }	
	}
}
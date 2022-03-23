pipeline
{
	parameters {
        string(name: 'TEST_NAME', defaultValue: 'searchSample', description: 'Name of test')
        string(name: 'ZOSMF_PORT', defaultValue: '0', description: 'The z/OSMF server port.')
        string(name: 'ZOSMF_HOST', defaultValue: '', description: 'The z/OSMF server host name.')
        string(name: 'TEST4Z_HOST', defaultValue: '', description: 'The Test4z server host.')
        choice(name: 'TEST4Z_PROTOCOL', choices: ['http', 'https'], description: 'The protocol used')
        string(name: 'TEST4Z_TYPE', defaultValue: 'basic', description: 'The Test4z server type.')
        string(name: 'TEST4Z_PORT', defaultValue: '0', description: 'The Test4z server port.')
        string(name: 'TEST4Z_BASEPATH', defaultValue: '/api/v1/test4z', description: 'The Test4z basepath.')
        choice(name: 'TEST4Z_STRICTSSL', choices: ['true', 'false'], description: 'Strict SSL')
        string(name: 'TEST4Z_HLQ', defaultValue: '', description: 'HLQ of the test4z batchapp sample at mainframe.')
        choice(name: 'TEST4Z_REJECTUNAUTHORIZED', choices: ['true', 'false'], description: 'Reject self-signed certificates.')
    }
    //agent {label 'test4z_sonar'}
	stages {
        stage('Clone Test4z project') {
            steps {
                bat "del /f /s /q test4z"
                bat "rd /s /q test4z"
                bat "git clone https://github.com/BroadcomMFD/test4z.git"
                }
        }

        stage('Install project dependencies') {
            steps {
                bat ''' cd test4z && npm install '''
                  }
        }

        // Set zowe config  of all related parameters
        stage('Set project configurations') {
            steps {
                // Set not secured parameters for zosmf profile 
                // Values are picked from the parameters to zowe.config.json
                bat "cd test4z && npx zowe config set profiles.lpar1.profiles.zosmf.properties.host ${ZOSMF_HOST} "
                bat " cd test4z && npx zowe config set profiles.lpar1.profiles.zosmf.properties.port ${ZOSMF_PORT} "
                
                // Set not secured parameters for test4z profile
                bat "cd test4z && npx zowe config set profiles.lpar1.profiles.test4z.properties.host ${TEST4Z_HOST} "
                bat "cd test4z && npx zowe config set profiles.lpar1.profiles.test4z.properties.protocol ${TEST4Z_PROTOCOL} "
                bat "cd test4z && npx zowe config set profiles.lpar1.profiles.test4z.properties.type ${TEST4Z_TYPE} "
                bat "cd test4z && npx zowe config set profiles.lpar1.profiles.test4z.properties.port ${TEST4Z_PORT} "
                bat "cd test4z && npx zowe config set profiles.lpar1.profiles.test4z.properties.basePath ${TEST4Z_BASEPATH} "
                bat "cd test4z && npx zowe config set profiles.lpar1.profiles.test4z.properties.strictSSL ${TEST4Z_STRICTSSL} "
                bat "cd test4z && npx zowe config set profiles.lpar1.profiles.test4z.properties.hlq ${TEST4Z_HLQ} "
                bat "cd test4z && npx zowe config set profiles.lpar1.profiles.test4z.properties.rejectUnauthorized ${TEST4Z_REJECTUNAUTHORIZED} "

                

                // Set secure parameters and credentials picked up from jenkins credential store
                withCredentials([usernamePassword(credentialsId: "zosmf_profile", usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                    bat "cd test4z && npx zowe config set --secure profiles.lpar1.profiles.zosmf.properties.user ${USERNAME}"
                    bat "cd test4z && npx zowe config set --secure profiles.lpar1.profiles.zosmf.properties.password ${PASSWORD}"
                }
                withCredentials([usernamePassword(credentialsId: "test4z_profile", usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]){
                    bat "cd test4z && npx zowe config set --secure profiles.lpar1.profiles.test4z.properties.user ${USERNAME}"
                    bat "cd test4z && npx zowe config set --secure profiles.lpar1.profiles.test4z.properties.password ${PASSWORD}"
        		}   
            }
               
		}
		stage('Run test') {
            steps {
                bat "cd test4z && npm run test ${TEST_NAME}.test.ts"
            }
		}	
	}
}
pipeline
{
    agent {label 'test4z_sonar'}
  	stages
  	{
		stage('Run test')
		{
            steps
            {
				timeout(time: 5, unit: 'MINUTES')
		 		{
		 			script
					{
        				git branch: '${BRANCH}', credentialsId: 'slickoilbatch', url: 'https://github.com/BroadcomMFD/test4z.git'
						sh 'chmod a+x ./*'             	
						withCredentials([
		 					usernamePassword(credentialsId: 'ptcincub-mainframe', 
                         	passwordVariable: 'PASS', 
                         	usernameVariable: 'USER')])
		 					{
								def remote = [name: 'test4z_sonar', host: env.HOST, user: USER, password: PASS, allowAnyHosts: true]
								sh "chmod +x slickoil.sh"
		 						sh "cd ${WORKSPACE} && ./slickoil.sh"
		 					}
					}			 	
		 		}   
            }
               
		}
	}
}
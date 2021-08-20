# Purpose of the sample
This test folder contains different scenarios covering cascading of jobs like running in parallel(concurrent jobs) and in sequence.

All the test suites execute 3 jobs namely ARGJOB1, ARGJOB2 which executes with return code 00/04 and ARGHRC with return code 12. 
The three sample files describe the way these jobs can be executed based on their dependencies on each other.

    * concurrentIndependentJobs : The sample test suite describes that if the jobs are independent from each other they can also be run in parallel which means all of them will be executed simultaneously in different test blocks. It continues to execute all of them irrespective of the status of the tests.
          
    * sequentialDependentJobs : The sample test suite describes that if ARGJOB2 is dependent on the execution status ARGHRC then ARGJOB2 will be executed after validating the status of ARGHRC, and these kind of dependent tasks must be written inside single test block. If it fails anywhere then the remaining steps are not executed and the test is marked as failed.

    * sequentialIndependentJobs : The sample test suite describes that if the jobs are independent from each other they can be executed in different test blocks. It continues to execute all of them irrespective of the status of the tests.
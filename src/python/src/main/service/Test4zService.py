import sys
import json
sys.path.append("../../main")
from zowe.zos_console_for_zowe_sdk import Console
from zowe.zos_jobs_for_zowe_sdk import Jobs
from polling import TimeoutException, poll
from utility import GetZosmfConnection, GetPollingTimeOut, GetPollingInterval
from .HttpClient import post_request
from model import CopyModel

# Job submission through ZOSMF
# Waits until the job return code collection and returns it
# @dataset - JCL dataset with the job/s
def SubmitJobNotify(dataset):
    connection = Jobs(GetZosmfConnection())
    try:
        job = connection.submit_from_mainframe(dataset)
        print("Batch application job submitted\nJobId: " + job['jobid'] + "\nWaiting for the return code...")
    except:
        raise Exception("An error occurred during the job submission. Check the ZOSMF access, health status and verify the config.cfg values")
    try:
        result = poll(
            lambda: connection.get_job_status(job['jobname'], job['jobid']),
            timeout=GetPollingTimeOut(),
            step=GetPollingInterval(),
            check_success=IsPollingSuccessful
        )
        print ("Return code: " + result['retcode'])
        return result['retcode']
    except TimeoutException:
        raise Exception("Timeout value exceeded by the function. Job return code could not be retrieved")
    except Exception:
        raise Exception("Unexpected error")

# Checks the given response status to see if the job execution completed
# @response - polling request response
# @returns - boolean status of the polling method
def IsPollingSuccessful(response):
    return response['status']=='OUTPUT'

# Copy the input dataset to the output dataset
# @inputDataset - Source dataset - the dataset which you want to copy
# @outputDataset - Target dataset - the result/output dataset
# @response - boolean success of the request
def copy(inputDataset, outputDataset):
    response = post_request("/copy", json.dumps(CopyModel(inputDataset, outputDataset).__dict__))
    if ('data' in response):
        print("Copy successful")
        return True
    else:
        raise Exception(response)

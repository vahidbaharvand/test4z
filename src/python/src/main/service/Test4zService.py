import sys
import json
sys.path.append("../../main")
from zowe.zos_console_for_zowe_sdk import Console
from zowe.zos_jobs_for_zowe_sdk import Jobs
from polling import TimeoutException, poll
from utility import get_zosmf_connection, get_polling_timeout, get_polling_interval
from .HttpClient import post_request
from model import CopyModel, SearchModel

# Job submission through ZOSMF
# Waits until the job return code collection and returns it
# @dataset - JCL dataset with the job/s
def submit_job_notify(dataset):
    connection = Jobs(get_zosmf_connection())
    try:
        job = connection.submit_from_mainframe(dataset)
        print("Batch application job submitted\nJobId: " + job['jobid'] + "\nWaiting for the return code...")
    except:
        raise Exception("An error occurred during the job submission. Check the ZOSMF access, health status and verify the config.cfg values")
    try:
        result = poll(
            lambda: connection.get_job_status(job['jobname'], job['jobid']),
            timeout=get_polling_timeout(),
            step=get_polling_interval(),
            check_success=is_polling_successful
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
def is_polling_successful(response):
    return response['status']=='OUTPUT'

# Copy the input dataset to the output dataset
# @inputDataset - Source dataset - the dataset which you want to copy
# @outputDataset - Target dataset - the result/output dataset
# @response - boolean success of the request
def copy(inputDataset, outputDataset):
    response = post_request("/copy", json.dumps(CopyModel(inputDataset, outputDataset).__dict__))
    if ('data' in response):
        print("Copy was successful")
        return True
    else:
        raise Exception(response)

# Reverting data back to the original state using the snapshot endpoint
# @inputDataset - Source dataset - the dataset which you have the backup data
# @outputDataset - Target dataset - the dataset which you want to override data from the source dataset (original dataset)
# @response - boolean success of the request
def roll_back_dataset(inputDataset, outputDataset):
    response = post_request("/copy", json.dumps(CopyModel(inputDataset, outputDataset).__dict__))
    if ('data' in response):
        print("Roll back was successful")
        return True
    else:
        raise Exception(response)

def search(dataset, copybook, filters, limit=0, offset=0):
    model = SearchModel(dataset, copybook, filters)
    response = post_request("/search", json.dumps(model, default = lambda x: x.__dict__))
    if ('Record' in response['data']):
        print("Search was successful")
        return response['data']['Record']
    else:
        raise Exception(response)

import sys
sys.path.append("../../main")
from zowe.zos_console_for_zowe_sdk import Console
from zowe.zos_jobs_for_zowe_sdk import Jobs
from polling import TimeoutException, poll
from utility import get_zosmf_connection, get_polling_timeout, get_polling_interval

# Job submission through ZOSMF
# Waits until the job return code and returns it
# @dataset - JCL dataset with the job/s
def zowe_submit_job_notify(dataset):
    connection = Jobs(get_zosmf_connection())
    try:
        job = connection.submit_from_mainframe(dataset)
        print("\nBatch application job submitted\nJobId: " + job['jobid'] + "\nWaiting for the return code...")
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

# Python polling check_success method,
# checks the job execution.
# @response - polling request response
# @returns - boolean status of the polling method
def is_polling_successful(response):
    try:
        return response['status']=='OUTPUT'
    except Exception:
        raise Exception("Unexpected error")

# Test4z Endpoint access methods

import sys
import json
sys.path.append("../../main")
from .HttpClient import post_request, get_request
from .ZoweClient import zowe_submit_job_notify
from model import CopyModel, SearchModel, UpdateModel, DiagnosticModel
from utility import get_prop

# Job submission through Z/OSMF
# @dataset - JCL dataset with the job/s
def submit_job_notify(dataset):
    return zowe_submit_job_notify(dataset)

# Copy the input dataset to the output dataset
# @inputDataset - Source dataset - the dataset which you want to copy
# @outputDataset - Target dataset - the result/output dataset
# @response - boolean success of the request
def copy(input_dataset, output_dataset):
    try:
        return post_request("/copy", json.dumps(CopyModel(input_dataset, output_dataset).__dict__))
    except Exception:
        raise Exception("Unexpected error")

# Reverting data back to the original state using the snapshot endpoint
# @inputDataset - Source dataset - the dataset which you have the backup data
# @outputDataset - Target dataset - the dataset which you want to override data from the source dataset (original dataset)
# @response - boolean success of the request
def roll_back_dataset(input_dataset, output_dataset):
     try:
         return copy(input_dataset, output_dataset)
     except Exception:
         raise Exception("Unexpected error")


# Search the dataset using the filter query
# @dataset: Input dataset to perform search
# @copybook: Layout dataset for the input dataset
# @filter: Search filter(s)
# @limit?: An optional parameter for paging the search output
# @offset?: An optional parameter for setting the offset to the search output
# @response: Records array
def search(dataset, copybook, filters, limit=0, offset=0):
    try:
        model = SearchModel(dataset, copybook, filters, limit, offset)
        return post_request("/search", json.dumps(model, default = lambda x: x.__dict__))
    except Exception:
        raise Exception("Unexpected error")

# Update dataset, with or without a filter(filter_criteria)
# @dataset: Input dataset to perform update
# @copybook: Layout dataset for the input dataset
# @update_criteria: Update conditions
# @filter_criteria: Filter object to narrow down the records before the update
# @response: Number of the records updated
def update(dataset, copybook, update_criteria, filter_criteria):
    try:
        model = UpdateModel(dataset, copybook, update_criteria, filter_criteria)
        return post_request("/update", json.dumps(model, default = lambda x: x.__dict__))
    except Exception:
        raise Exception("Unexpected error")

# Performs a set of controls to verify the health status of the Test4z Service components
# @response: Status of each privileges
def diagnostic():
    try:
      return get_request("/diagnostic")
    except Exception:
      raise Exception("Service is unavailable")

# Returns the given property from the given section
# @section: Section name in the config.cfg
# @prop: Property name in the particular section
# @response: Value of the property
def get_config_prop(section, prop):
    return get_prop(section, prop)

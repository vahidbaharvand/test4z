# /compare
Compare two data sets and return a list of changed, inserted and deleted lines. This function is intended for comparing older and newer versions of the same data set. 

Note that for partitioned data sets (PDS) you must pick two members to compare, not the entire partitioned data sets.

*This test folder contains an example use case of the **compare** endpoint.*

* First Test4z will ***create a snapshot*** of the main dataset. This creates a copy of the dataset that will be used as base for the compare function. 
* Once this is successful, Test4z ***submits a job*** ***through ZOWE*** to make changes in the main 
  dataset. This app will ***filter out*** records based on number of ***TOTAL-CHECKS***, ***ACTUAL-CHECKS*** and ***PRODUCT-TYPE***. (for the records that fall into this selection, **notification date will be changed to today**)
* After the change is done, Test4z runs ***compare*** of the two datasets in order to identify whether the changes happened as expected. 
  This compare looks into the ***total number*** of records in both datasets.
  We also make sure *no record was added/deleted*. Next we check if the number of changed records correlates with the batchapp run.
* Once these ***tests are done***, Test4z ***reverts back*** the changes by copying the backup dataset back to the main one. 

## Reference to BatchApp in Samples Descriptions
You can find detailed information about the batch application used in the samples [here](/README.md#the-batch-application-used-in-the-samples) under the Batch Application section.

# api doc

## Model call
    {
        "dataset1": "string",
        "dataset2": "string"
    }
    
    or
    
    {
        "dataset1": "string",
        "dataset2": "string",
        "copyBook": "string",
        "operation": "string",
        "fields": "string[]"
    }

## Parameters
### "dataset1"
Old data set.

### "dataset2"
New data set.

### "copyBook"
Optional - A String value representing the copybook name

### "operation" - keys: ["INCLUDE" or "EXCLUDE"]
Optional - String value for specifying the operation, exclude/include

### "fields"
Optional - String array for specifying the included/excluded field names    


## Example call #1
Compare records in the (older) MYHLQ.SHOP.INVENTRY(APRIL06) data set to records in the (newer) MYHLQ.SHOP.INVENTRY(APRIL07) data set.

    POST /api/v1/compare?
    {
        "dataset1": "MYHLQ.SHOP.INVENTRY(APRIL06)",
        "dataset2": "MYHLQ.SHOP.INVENTRY(APRIL07)"
    }

## Example output #1
Upon a successful API call a data object is returned containing the summary and report objects. The report lists all the individual changes that were made between in the new data set.

    {
        "data" : {
            "summary": {
                "insertedLines": 2,
                "deletedLines": 1,
                "matchedLines": 716,
                "changedLines": 1,
                "oldRecordsProcessed": 720,
                "newRecordsProcessed": 721
            },
            "report": [
                {
                    "type": "Change",
                    "compareRecord": {
                        "newContent": "Embroidered Bracelet - Gold",
                        "oldContent": "Hooped Earrings - Gold",
                        "newLineNum": 497,
                        "oldLineNum": 497
                    }                    
                },
                {
                    "type": "Insert",
                    "compareRecord": {
                        "newContent": "Chain Bracelet - Silver",
                        "oldContent": null,
                        "newLineNum": 721,
                        "oldLineNum": 0
                    }                    
                },
                {
                    "type": "Insert",
                    "compareRecord": {
                        "newContent": "Chain Bracelet - Gold",
                        "oldContent": null,
                        "newLineNum": 722,
                        "oldLineNum": 0
                    }                    
                },
                {
                    "type": "Delete",
                    "compareRecord": {
                        "newContent": null,
                        "oldContent": "Simple Ring - Platinum",
                        "newLineNum": 0,
                        "oldLineNum": 329
                    }                    
                }
            ]
        }
    }
    
## Example call #2
Compare records in the (older) MYHLQ.SHOP.INVENTRY(APRIL06) data set to records 
in the (newer) MYHLQ.SHOP.INVENTRY(APRIL07) data set. Exclude the changes in the DESCRIPTION field.


    POST /api/v1/compare?
    {
        "dataset1": "MYHLQ.SHOP.INVENTRY(APRIL06)",
        "dataset2": "MYHLQ.SHOP.INVENTRY(APRIL07)",
        "copyBook": "MYHLQ.SHOP.INVENTRY.COPY(APRIL)",
        "operation": "EXCLUDE",
        "fields": ["DESCRIPTION"]
    }

## Example output #2
Upon a successful API call a data object is returned containing the summary and report objects. The report lists all the individual changes that were made between in the new data set.

    {
        "data" : {
            "summary": {
                "insertedLines": 0,
                "deletedLines": 0,
                "matchedLines": 719,
                "changedLines": 1,
                "oldRecordsProcessed": 720,
                "newRecordsProcessed": 720
            },
            "report": [
                {
                    "type": "Change",
                    "compareRecord": {
                        "newContent": "Embroidered Bracelet - Gold",
                        "oldContent": "Hooped Earrings - Gold",
                        "newLineNum": 497,
                        "oldLineNum": 497
                    }                    
                }
            ]
        }
    }

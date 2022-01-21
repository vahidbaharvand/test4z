# /snapshot
Create copy of a data set.

*This test folder contains an example use case of the **snapshot** endpoint.*

* First Test4z will ***create a snapshot*** of the main dataset. This creates a copy of the dataset that will be used as backup. 
* Once this is successful, Test4z ***submits a job*** ***through ZOWE***  to make changes in the main dataset. This job ***filters out*** some records based on number of ***TOTAL-CHECKS, ACTUAL-CHECKS*** and ***PRODUCT-TYPE***. ***Notification date*** for these records is then ***changed*** to today. 
* Next Test4z ***runs a compare*** of the main dataset against the backup, where discrepancy is expected, as the main dataset was changed. 
* After the ***tests are run***, Test4z ***reverts back*** the changes by copying the backup dataset back to the main one.

## Reference to BatchApp in Samples Descriptions
You can find detailed information about the batch application used in the samples [here](/README.md#the-batch-application-used-in-the-samples) under the Batch Application section.

# api doc

## Model call
    {
        "inputDataset": "MYHLQ.SALEDATA.RECORDS1",
        "outputDataset": "MYHLQ.SALEDATA.RECORDS2"
    }

## Parameters
### "inputDataset"
The source data set to be copied.

### "outputDataset"
The target data set where the copy of the source data set is saved to.

## Example call
Create a snapshot of the MYHLQ.SALEDATA.RECORDS1 data set and save it to MYHLQ.ARCHIVE.APRIL05.RECORDS1.

    POST /api/v1/snapshot?
    {
        "inputDataset": "MYHLQ.SALEDATA.RECORDS1",
        "outputDataset": "MYHLQ.ARCHIVE.APRIL05.RECORDS1"
    }
 
## Example output
Upon a successful API call a data object is returned the success message

    {
        "data": "COPYDSN OK - \"MYHLQ.SALEDATA.RECORDS1\" dataset copied to \"MYHLQ.ARCHIVE.APRIL05.RECORDS1\".\n"
    }
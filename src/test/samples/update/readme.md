# /update
Update dataset with or without filtering the records.

*This test folder contains an example use case of the **update** endpoint.*

* First Test4z will ***create a snapshot*** of the main dataset. This creates a copy of the dataset that will be used as backup. 
* Once this is successful, Test4z ***submits a job***  ***through ZOWE***  to make changes in the main dataset. This job ***filters out*** some records based on number of ***TOTAL-CHECKS, ACTUAL-CHECKS*** and ***PRODUCT-TYPE***. ***Notification date*** for these records is then ***changed*** to today. 
* Next Test4z ***verifies*** that the ***notification dates*** were indeed ***changed*** and that this change happened only on the desired records. (The number of changed records is 13 in this case) 
* Then Test4z ***reverts the changes*** in main dataset back by overwriting it from the backup. 
* As next step Test4z ***updates a record*** in the main dataset, which did not fit in the selection before. This record should now be picked up by the batchapp as well. 
* Test4z ***submits*** the ***job***  ***through ZOWE*** , same as above. Test4z ***checks*** for number of ***updated records*** afterwards. There should be 14 of them. 
* After this ***verification is done***, Test4z ***reverts back*** the changes by copying the backup dataset back to the main one. 

## Reference to BatchApp in Samples Descriptions
You can find detailed information about the batch application used in the samples [here](/README.md#the-batch-application-used-in-the-samples)) under the Batch Application section.

# api doc

## Model call 
    {
        "dataSet": "string",
        "copyBook": "string",
        "updateCriteria": [
            {
                "fieldName": "string",
                "fieldOperator": "=, !=, >, >=, <, <=",
                "fieldType": "Character, Number, Text, Packed, Hexadecimal",
                "filterValue":"string",
                "targetValue":"string"
            }
        ],
        "filterCriteria": {
            "fieldName": "string",
            "fieldOperator": "=, !=, >, >=, <, <=",
            "fieldValue": "string",
            "fieldType": "Character, Number, Text, Packed, Hexadecimal"
        }
    }

# Parameters
## "dataSet"

    string

Name of the data set you want to update through.

## "copyBook"

    string

Name of a COBOL copy book that interprets the data set you want to update through.

## "updateCriteria"
Array of one or more update statements.

### "fieldName"

    string

Name of a field that is part of a record.

### "fieldOperator"

    =, !=, >, >=, <, <=

Comparison operator. 

### "fieldType"

    Character, Number, Text, Packed, Hexadecimal

Data type of the field.

### "filterValue"

    string

Value of the field.

### "targetValue"

    string

Value of the field after the update.

## "filterCriteria" (optional)
Array of one or more update statements.

### "fieldName"

    string

Name of a field that is part of a record.

### "fieldOperator"

    =, !=, >, >=, <, <=

Comparison operator. 

### "fieldType"

    Character, Number, Text, Packed, Hexadecimal

Data type of the field.

### "fieldValue"

    [string]

Values of the field.


## Example Call
Update the MYHLQ.SALEDATA.RECORDS1 dataset for records which are categorized as jewelry *and* update their discount field with 60.

    POST /api/v1/update?
    {
        "dataSet":"MYHLQ.SALEDATA.RECORDS1", 
        "copyBook":"MYHLQ.SALEDATA.COPY(salesrec)", 
        "updateCriteria":[
            {
                "fieldName":"DISCOUNT",
                "fieldOperator":"=",
                "fieldType":"Number",
                "filterValue":"0",
                "targetValue":"60"
            }
        ],
        "filterCriteria":{
            "fieldName":"TYPE", 
            "fieldOperator":"=", 
            "fieldValue": ["JEWELRY"], 
            "fieldType":"Text"
        }
    }
    
## Example output
Upon a successful API call a data object is returned containing the number of the records updated.

    {
        "data": {
            "recordsChanged": 5
        }
    }
    
#Limitations

> Update enpoint is not compatible with PDS-E type of datasets

> Update endpoint does not have a check for the field length. Before using this endpoint, make sure your targetValue parameters are not exceeding the length definition of your field in the copybook
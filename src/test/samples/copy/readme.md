# /copy
Creates a subset copy of the input dataset based on filter criteria. 'filterQuery' parameter
represents the filter criteria and leverages named fields as defined in a COBOL or PL/I
copybook. The optional 'offset' parameter can be used to indicate the record number to
start copying from. Also the optional 'limit' parameter bounds the number of records that
will be copied.

This test folder contains an example use case of the **copy** endpoint.The Copy API carries out the following procedure:

1. The API creates a copy of the main data set. This copy will be used as backup.
2. The API submits a job through ZOWE to make changes in the main data set. The job filters out some records based on the parameters: TOTAL-CHECKS, ACTUAL-CHECKS, and PRODUCT-TYPE.
3. The API changes the notification date of the filtered records to today.
4. The API copies part of the content of the main data set into the copy data set. The API copies the records that have the NOTIFICATION-DATE field set as today.
5. A search request gets the records from the copy data set to assert their number.
6. The API reverts back the changes by copying the content of the backup data set into the main data set.

## Reference to BatchApp in Samples Descriptions
You can find detailed information about the batch application used in the samples [here](/README.md#the-batch-application-used-in-the-samples) under the Batch Application section.

# api doc

## Model call
    {
        "inputDataset": "string",
        "outputDataset": "string",
        "limit": int,
        "skip": int,
        "copyBook": "string",
        "searchQuery":[
            {
                "FieldName": "string",
                "FieldOperator": "=, !=, >, >=, <, <=",
                "FieldType": "Character, Number, Text, Packed, Hexadecimal",
                "FieldValue": ["string"],
                "QueryOperator": "AND", "OR"
            }
        ]
    }
    
## Parameters
### "inputDataset"

    string

The source data set to be copied.

### "outputDataset"

    string

The target data set where the copy of the source data set is saved to.

### "copyBook" (Optional)

    string

Name of a COBOL copy book that interprets the data set you want to search through.

### "limit"

    int

The number of the records limited before copy.

### "skip"

    int

The number of the records will be skipped before copy

### "searchQuery" (Optional)
Array of one or more conditions used to search the data set for records that match these conditions.

### "FieldName"

    string

Name of a field that is part of a record.

### "FieldOperator"

    =, !=, >, >=, <, <=

Comparison operator. 

### "FieldType"

    Character, Number, Text, Packed, Hexadecimal

Data type of the field.

### "FieldValue"

    [string]

Values of the field.


    
## Example call
Create a snapshot of the MYHLQ.SALEDATA.RECORDS1 data set and save it to MYHLQ.ARCHIVE.APRIL05.RECORDS1.

    {
        "inputDataset": "MYHLQ.SALEDATA.RECORDS1",
        "outputDataset": "MYHLQ.ARCHIVE.APRIL05.RECORDS1",
        "limit": 10,
        "skip": 5,
        "copyBook": "MYHLQ.ARCHIVE.COPY(CUSTREC)",
        "searchQuery":[
            {
                "fieldName":"PRODUCT-TYPE",
                "fieldOperator":"=",
                "fieldValue":[
                    "D", "K"
                ],
                "fieldType":"Character"
            }
        ]
    }
    
## Example output
Upon a successful API call a data object is returned the success message

    {
        "data": "COPYDSN OK - \"MYHLQ.SALEDATA.RECORDS1\" dataset copied to \"MYHLQ.ARCHIVE.APRIL05.RECORDS1\".\n"
    }
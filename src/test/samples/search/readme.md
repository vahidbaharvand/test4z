# /search
Use conditional search to filter records in a dataset.

*This test folder contains an example use case of the **search** endpoint.* 

* First Test4z will ***create a snapshot*** of the main dataset. This creates a copy of the dataset that will be used to revert the changes after the tests are done. 
* Once this is successful, Test4z will ***filter out*** some records based on number of ***TOTAL-CHECKS, ACTUAL-CHECKS*** and ***PRODUCT-TYPE***. 
* Then Test4z ***submits a job*** ***through ZOWE*** . The batchapp looks for records fitting the selection criterion and ***changes the Notification Date*** in the main dataset to today for those. 
* Next Test4z ***filters out*** the records in the same way as before the batchapp run. Test4z verifies that the notification date was changed to today for those records. 
* Once these ***tests are done***, Test4z ***reverts back*** the changes by copying the backup dataset back to the main one.

## Reference to BatchApp in Samples Descriptions
You can find detailed information about the batch application used in the samples [here](/README.md#the-batch-application-used-in-the-samples) under the Batch Application section.

##Important TypeScript tip:
    This is an example return from the search endpoint.
    To be able to extract values from this result, you can use the following code:
    
    searchResult.records.Record[0].CUSTINREC["TOTAL-CHECKS"]
    This piece of code will return the TOTAL-CHECKS value of the first record from the CUSTINREC dataset
    
    {
       "data":{
          "Record":[
             {
                "number":3,
                "CUSTINREC":{
                   "TOTAL-CHECKS":30,
                   "CUST-NAME":"DIRMOND MARCHRNT",
                   "PRODUCT-TYPE":"S",
                   "REORDER-DATE":20170903,
                   "ACCOUNT-NUMBER":123456000003,
                   "ACTUAL-CHECKS":2,
                   "NOTIFICATION-DATE":20210112,
                   "CUST-ADDR":"345 BROADWAY STRT",
                   "FILLER":"",
                   "REORDERED":"T"
                }
             }
          ]
       }
    }
    

## Model call
    {
        "copyBook": "string",
        "dataSet": "string",
        "searchQuery": 
        [
            {
                "fieldName": "string",
                "fieldOperator": "=, !=, >, >=, <, <=",
                "fieldType": "Character, Number, Text, Packed, Hexidecimal",
                "fieldValue": "string",
                "queryOperator": "AND", "OR"
            }
        ]
    }

## Parameters
### "dataSet"

    string

Name of the data set you want to search through.

### "copyBook"

    string

Name of a COBOL copy book that interprets the data set you want to search through.

### "searchQuery"
Array of one or more conditions used to search the data set for records that match these conditions.

### "fieldName"

    string

Name of a field that is part of a record.

### "fieldOperator"

    =, !=, >, >=, <, <=

Comparison operator. 

### "fieldType"

    Character, Number, Text, Packed, Hexidecimal

Data type of the field.

### "fieldValue"

    string

Value of the field.

### "queryOperator"
Combine two filter criteria in your query

* AND - The AND operator specifies that the results must satisfy all the filter condition.
* OR - The OR operator specifies that the results must satisfy either of the two filters.

The QueryOperator parameter always controls the relationship between the filter criterion which specifies the parameter 
and the next filter criterion in the query.


# Use Multiple Filter Conditions

Combine multiple filter conditions to narrow down the results of your data set search. The QueryOperator parameter allows you to combine two or more search criteria using the AND and OR boolean operators. These operators control the relationship between different filters in your search query.

## Examples: Use the QueryOperator parameter to combine several filter criteria.
The following examples demonstrate the use of the QueryOperator parameter.

POST /api/v1/search?

### Example 1
In this example, the query returns results for all records that satisfy either of the following criteria:
* The records have the field value of **TOTAL-CHECKS > 30**.
* The **REORDER-DATE** is the current date.

####Example 1 call:

    {
        "copyBook": "MYHLQ.SHOP.INVENTRY(APRIL06)",
        "dataSet": "MYHLQ.SHOP.INVENTRY(APRIL06)",
        "searchQuery": 
        [		
            {
                "fieldName": "TOTAL-CHECKS",
                "fieldOperator": ">",
                "fieldType": "Number",
                "fieldValue": "30",
                "queryOperator": "AND"
            },
            {
                "fieldName": "REORDER-DATE",
                "fieldOperator": "=",
                "fieldType": "Number",
                "fieldValue": "Current_date" 
            }
        ]
    }

### Example 2
In this example, the query returns results for all records that satisfy either of the following criteria:
* The records have the field value of **TOTAL-CHECKS > 30** or **ACTUAL-CHECKS < 5**.
* The records have the field value of **REORDER-DATE** is the current date.

####Example 2 call:

    { 
    "copyBook": "MYHLQ.SHOP.INVENTRY(APRIL06)",
    "dataSet": "MYHLQ.SHOP.INVENTRY(APRIL06)",
    "searchQuery": 
    [
        {
            "fieldName": "TOTAL-CHECKS",
            "fieldOperator": ">",
            "fieldType": "Number",
            "fieldValue": "30",
            "queryOperator": "AND"
        },
        {
            "fieldName": "REORDER-DATE",
            "fieldOperator": "=",
            "fieldType": "Number",
            "fieldValue": "Current_date",
            "queryOperator": "OR"
        }
        {
            "fieldName": "ACTUAL-CHECKS",
            "fieldOperator": "<",
            "fieldType": "Number",
            "fieldValue": "5",
            "queryOperator": "AND"
        },
        {
            "fieldName": "REORDER-DATE",
            "fieldOperator": "=",
            "fieldType": "Number",
            "fieldValue": "Current_date"
        }
    ]
    }

### Example 3
In this example, the query returns results for all records that satisfy both of the following criteria:
* The records have the field value of **TOTAL-CHECKS > 30**.
* The records have the field value of **ACTUAL-CHECKS < 5** or **REORDER-DATE** is the current date.

####Example 3 call:

    {
        "copyBook": "MYHLQ.SHOP.INVENTRY(APRIL06)",
        "dataSet": "MYHLQ.SHOP.INVENTRY(APRIL06)",
        "searchQuery": 
        [
            {
                "fieldName": "TOTAL-CHECKS",
                "fieldOperator": ">",
                "fieldType": "Number",
                "fieldValue": "30",
                "queryOperator": "AND"
            },
            {
                "fieldName": "ACTUAL-CHECKS",
                "fieldOperator": "<",
                "fieldType": "Number",
                "fieldValue": "5",
                "queryOperator": "OR"
            },
            {
                "fieldName": "REORDER-DATE",
                "fieldOperator": "=",
                "fieldType": "Number",
                "fieldValue": "Current_date",
            }
        ]
    }

### Example Output
Upon a successful API call a data object is returned containing records in a nested JSON format.

    {
       "data":{
          "Record":[
             {
                "number":3,
                "CUSTINREC":{
                   "TOTAL-CHECKS":30,
                   "CUST-NAME":"DIRMOND MARCHRNT",
                   "PRODUCT-TYPE":"S",
                   "REORDER-DATE":20170903,
                   "ACCOUNT-NUMBER":123456000003,
                   "ACTUAL-CHECKS":2,
                   "NOTIFICATION-DATE":20210112,
                   "CUST-ADDR":"345 BROADWAY STRT",
                   "FILLER":"",
                   "REORDERED":"T"
                }
             }
          ],
          "dsn":"MYHLQ.SHOP.INVENTRY(APRIL06)"
       }
    }


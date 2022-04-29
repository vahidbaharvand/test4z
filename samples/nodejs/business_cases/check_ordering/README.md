## Description of the Application Under Test

**Check Reordering System**

Check reordering system in a bank ensures that clients always have enough checks in their checkbooks. The check reordering system looks for customers low on checks based on the client’s checkbook size and threshold of remaining checks. The system then issues a notification to the client and orders a new checkbook.

This is a snippet of input data for the batch application:

| RECORD-NUMBER	| CUST-NAME	            | CUST-ADDR             | ACCOUNT-NUMBER	| PRODUCT-TYPE	| TOTAL-CHECKS	| ACTUAL-CHECKS	| NOTIFICATION-DATE	| REORDER-DATE	| REORDERED	|
|---------------|-----------------------|-----------------------|-------------------|---------------|---------------|---------------|-------------------|---------------|-----------|
| 1	            | WILLAIM KLUGER	    | 956 NACHODSKA	        | 123456000001	    | S	| 50	| 10	| 20190706	| 20190701	| T	|  
| 2	            | ROALD DAHL KING	    | 731 GANDHI ROAD	    | 123456000002	    | C	| 80	| 10	| 20180809	| 20180802	| F	|  
| 3	            | DIAMOND MERCHANT	    | 345 BROADWAY STRT	    | 123456000003	    | S ❗	| 30 ❗	| 2	❗   | 20210112 ✅	| 20170903	| T	|  
| ... |
| ... |

❗ Matching condition for Check Reordering ✅ NOTIFICATION-DATE to be updated

[Full test data content](./__data__/Data.md)

> **NOTE:** Sample test data are stored in [__data__/zos/WORKSHOP.TEST4Z.DATA](./__data__/zos/WORKSHOP.TEST4Z.DATA) and [__data__/zos/WORKSHOP.TEST4Z.DATAL](./__data__/zos/WORKSHOP.TEST4Z.DATAL).

The data structure is described by the following COBOL copybook:

       01  CUSTINREC.
           05  CUST-NAME                PIC X(20).
           05  CUST-ADDR                PIC X(20).
           05  ACCOUNT-NUMBER           PIC X(12).
           05  PRODUCT-TYPE             PIC X(1).
               88 SAVINGS      VALUE      'S'.
               88 CURRENT      VALUE      'C'.
           05  TOTAL-CHECKS             PIC 9(02).
           05  ACTUAL-CHECKS            PIC 9(02).
           05  NOTIFICATION-DATE        PIC 9(08).
           05  REORDER-DATE             PIC 9(08).
           05  REORDERED                PIC X(1).
               88 YES          VALUE      'T'.
               88 NOT-YES      VALUE      'F'.
           05  FILLER                   PIC X(6). 

> **NOTE:** The copybook is stored here [src/zos/WORKSHOP.TEST4Z.COPY/CUSTREC](./src/zos/WORKSHOP.TEST4Z.COPY/CUSTREC).

The Check Reordering System uses following conditions to issue a customer notification.

        (PRODUCT-TYPE = ‘C’ OR PRODUCT-TYPE = ‘S’) AND
        ((ACTUAL-CHECKS <= 3 AND TOTAL-CHECKS = 30) OR
         (ACTUAL-CHECKS <= 5 AND TOTAL-CHECKS = 50) OR
         (ACTUAL-CHECKS <= 8 AND TOTAL-CHECKS = 80))

## Use Cases

A batch application has been created and is submitted using Zowe. The batch application performs the following steps:

1. Filter out records from the main dataset based on the **TOTAL_CHECKS**, **ACTUAL_CHECKS**, and **PRODUCT_TYPE** parameters. The records are filtered according to the following criteria:
          
       (ACTUAL-CHECKS <= 3 AND TOTAL-CHECKS = 30 AND (PRODUCT-TYPE='S' OR PRODUCT-TYPE='C)) OR
       (ACTUAL-CHECKS <= 5 AND TOTAL-CHECKS = 50 AND (PRODUCT-TYPE='S' OR PRODUCT-TYPE='C)) OR
       (ACTUAL-CHECKS <= 8 AND TOTAL-CHECKS = 80 AND (PRODUCT-TYPE='S' OR PRODUCT-TYPE='C))
      
2. Modify the filtered records by setting the notification date to the current (today) date.
The modified records are then used by the sample test case.


## Test Suite Steps

*This test folder contains an example use case of the **update** endpoint.*

Test4z will perform the following sequence:

1. ***Create a backup*** of the main data set. 
2. ***Submit a job***  ***through ZOWE***  to make changes in the main data set. This job ***filters out*** some records based on the values of ***TOTAL-CHECKS, ACTUAL-CHECKS*** and ***PRODUCT-TYPE***. The ***Notification date*** for these records is then ***changed*** to today. 
3. ***Verify*** that the ***notification dates*** were successfully ***changed*** and this change happened only on the desired records. In this case the amount of changed records is 24. 
4. ***Revert back the changes*** by copying the backup data set to the main data set. 
5. ***Update a record*** in the main data set, which did not fit in the selection before. This record should now be picked up by the batchapp as well. 
6. ***Submit*** one more time the ***job***  ***through ZOWE***.
7. ***Check*** the amount of ***updated records***. This should now be 25. 
8. ***Revert back the changes*** by copying the backup data set to the main data set. 

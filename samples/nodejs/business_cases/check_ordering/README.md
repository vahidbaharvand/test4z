## Description of the Application Under Test

**Check Reordering System**

The check reordering system in a bank ensures that clients always have enough checks in their checkbooks. The check reordering system looks for customers low on checks based on the client’s checkbook size and threshold of remaining checks. The system then issues a notification to the client and orders a new checkbook.


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

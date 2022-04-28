## Use Case

A batch application has been created and is submitted using Zowe. The batch application performs the following steps:

1. Filter out records from the main dataset based on the **TOTAL_CHECKS**, **ACTUAL_CHECKS**, and **PRODUCT_TYPE** parameters. The records are filtered according to the following criteria:
          
       (ACTUAL-CHECKS <= 3 AND TOTAL-CHECKS = 30 AND (PRODUCT-TYPE='S' OR PRODUCT-TYPE='C)) OR
       (ACTUAL-CHECKS <= 5 AND TOTAL-CHECKS = 50 AND (PRODUCT-TYPE='S' OR PRODUCT-TYPE='C)) OR
       (ACTUAL-CHECKS <= 8 AND TOTAL-CHECKS = 80 AND (PRODUCT-TYPE='S' OR PRODUCT-TYPE='C))
      
2. Modify the filtered records by setting the notification date to the current (today) date.
The modified records are then used by the sample test case.


## Test suite steps

*This test folder contains an example use case of the **update** endpoint.*

* First Test4z will ***create a backup*** of the main dataset. 
* Once this is successful, Test4z ***submits a job***  ***through ZOWE***  to make changes in the main dataset. This job ***filters out*** some records based on number of ***TOTAL-CHECKS, ACTUAL-CHECKS*** and ***PRODUCT-TYPE***. ***Notification date*** for these records is then ***changed*** to today. 
* Next Test4z ***verifies*** that the ***notification dates*** were indeed ***changed*** and this change happened only on the desired records. (The number of changed records is 24 in this case) 
* Then Test4z ***reverts the changes*** in main dataset back by overwriting it from the backup. 
* As next step Test4z ***updates a record*** in the main dataset, which did not fit in the selection before. This record should now be picked up by the batchapp as well. 
* Test4z ***submits*** the ***job***  ***through ZOWE*** , same as above. Test4z ***checks*** for number of ***updated records*** afterwards. There should be 25 of them. 
* After this ***verification is done***, Test4z ***reverts back*** the changes by copying the backup dataset back to the main one. 

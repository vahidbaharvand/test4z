##Data Validation Usability Exercise 

*   Create a test case using the provided data file and copybook:
    *   [HLQ].TEST4Z.BATCHAPP.CUSTIN
    *   [HLQ].TEST4Z.BATCHAPP.COPY(CUSTREC)
    
*   In the test case,
    *   Search through records looking for records with a product type of either ‘S’ or ‘C‘.
    *   Assert there are 67 records found.
    *   For each record assert that Actual Check Value is less than (Total Check Value + Threshold Value).  Threshold Value should be calculated based on the Total Check Value as follows:
        *   If Total Checks = 30 a value of 3 is assigned to Threshold Value. 
        *   If Total Checks = 50 a value of 5 is assigned to Threshold Value.
        *   If Total Checks = 80 a value of 8 is assigned to Threshold Value.

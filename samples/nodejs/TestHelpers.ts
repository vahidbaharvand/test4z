//Helper method to use in the test suites.

export class TestHelpers{
    /**
     * Returns rhe CUSTINREC (customer) records from the Test4z Search request
     * @param result - data field of the API result
     */
    static extractCustomers(result: any){
        return result.Record.map((customer: { CUSTINREC: any; }) => customer.CUSTINREC);
    }

    /**
     * Extract data from the the records by the given field name, to an array
     * @param customers - Records, as extractCustomers result
     * @param field - The field name for the value extraction
     */
    static extractDataByField(customers: any, field: string){
        return customers.map((a: { [x: string]: any; })=> a[field]);
    }

    /**
     * Returns NOTIFICATION-DATE field from the API result, using the extractCustomers and extractDataByField methods in a form of array
     * @param customers - data field of the API result
     */
    static getNotificationDates(customers: any){
         return this.extractDataByField(this.extractCustomers(customers),"NOTIFICATION-DATE");
    }

    /**
     * Returns ACCOUNT-NUMBER field from the API result, using the extractCustomers and extractDataByField methods in a form of array
     * @param customers - data field of the API result
     */
    static getAccountNumbers(customers: any){
        return this.extractDataByField(this.extractCustomers(customers),"ACCOUNT-NUMBER");
    }
}
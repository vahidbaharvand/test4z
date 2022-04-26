//DB2 database methods

import {IDB2Session, ExecuteSQL} from "@zowe/db2-for-zowe-cli";
import {Db2QueryResult} from "../models/Db2QueryResult";
import {SessionFactory} from "./SessionFactory";

export class Db2Service{
    /**
     * Returns the given property value under the db2 tag from the zowe config file
     * @param property - Property key to get it's value
     */
    static getProfileProp(property: string): any {
        return SessionFactory.getProfileProp("db2", property);
    }

    /**
     * Inserts 10 test records to the existing Test4z sample database
     * @param tableName - Table name the test records will be created
     */
    static generateDb2TestRecords(tableName: string){
        const insertPrefix = "INSERT INTO " + tableName;
        const insertColumnNames = " (CUST_NAME, CUST_ADDR, ACCOUNT_NUMBER, PRODUCT_TYPE, TOTAL_CHECKS, ACTUAL_CHECKS, NOTIFICATION_DATE, REORDER_DATE, REORDERED) VALUES ";
        const insertQuery: string =
            insertPrefix + insertColumnNames + "('WILLAIM KLUGER', 'PRAGUE', '1', 'C', 30, 2, '2019-12-28', '2019-12-28', 'F');" +
            insertPrefix + insertColumnNames + "('JOSEPH ANTHONY', 'LONDON', '2', 'C', 50, 4, '2019-12-28', '2019-12-28', 'F');" +
            insertPrefix + insertColumnNames + "('JON FELLOWS', 'VIENNA', '3', 'C', 80, 7, '2019-12-28', '2019-12-28', 'F');" +
            insertPrefix + insertColumnNames + "('JESSIE MOYER', 'VENICE', '4', 'K', 50, 5, '2019-12-28', '2019-12-28', 'F');" +
            insertPrefix + insertColumnNames + "('ASELA KHAN', 'MILAN', '5', 'B', 50, 4, '2019-12-28', '2019-12-28', 'F');" +
            insertPrefix + insertColumnNames + "('ROBIN MARLEY', 'PARIS', '6', 'B', 35, 3, '2019-12-28', '2019-12-28', 'F');" +
            insertPrefix + insertColumnNames + "('ALEX KINGHUM', 'TOKYO', '7', 'A', 70, 2, '2019-12-28', '2019-12-28', 'F');" +
            insertPrefix + insertColumnNames + "('DANIEL MATTHEW', 'BERLIN', '8', 'S', 42, 100, '2019-12-28', '2019-12-28', 'F');" +
            insertPrefix + insertColumnNames + "('ROALD DAHL KING', 'ZURICH', '9', 'U', 11, 10, '2019-12-28', '2019-12-28', 'F');" +
            insertPrefix + insertColumnNames + "('BETTINA MERCHANT', 'SYDNEY', '10', 'U', 22, 10, '2019-12-28', '2019-12-28', 'F');";

        return this.executeSQLQuery(insertQuery);
    }

    /**
     * Removes all the test records from the existing Test4z sample database
     * @param tableName - Table name all the test records will be removed
     */
    static removeDb2TestRecords(tableName: string){
        const truncateQuery = "TRUNCATE TABLE " + tableName;
        return this.executeSQLQuery(truncateQuery);
    }

    /**
     * Executes the given SQL Query and returns the response from the DB2 table
     * @param query - SQL query to be executed
     */
    static async executeSQLQuery(query: string): Promise<Db2QueryResult>{
        const result: any[] = [];
        let row;
        try {
            const db2Session: IDB2Session = await SessionFactory.getDb2Profile();
            const executor = new ExecuteSQL( db2Session);
            const response = executor.execute(query);
            while (!(row = response.next()).done) {
                result.push(row.value);
            }
            return new Db2QueryResult(true, result);
        }
        catch (e: any) {
            if (!e.mDetails.additionalDetails)
                e.mDetails.additionalDetails = "Error: Unknown error during db2 query execution";
            return new Db2QueryResult(false, e.mDetails.additionalDetails);
        }
    }
}

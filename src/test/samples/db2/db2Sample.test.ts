/* Copyright (c) 2021 Broadcom.
   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED
   FOR DETAILED INFORMATION ABOUT THIS TEST SUITE AND THE USE CASE, PLEASE CHECK THE readme.md

   Example test suite for DB2 use case
*/
import { Db2Service, Test4zService } from "@broadcom/test4z";

let tableName = "TEST4ZTB";
let batchAppJCLDataset = "TEST4ZDB.BATCHAPP.JCL(CUSTDB)"

describe("DB2-TEST - Batchapp validation", function () {
    beforeAll(async () => {
        //Test configuration
        const HLQ: any = await Db2Service.getProfileProp("hlq");
        tableName = HLQ + "." + tableName;
        batchAppJCLDataset = HLQ + "." + batchAppJCLDataset;

        //Insertion of the test records to the DB2 database
        const testDataGeneration = await Db2Service.generateDb2TestRecords(tableName);
        expect(testDataGeneration).toBeSuccessfulDb2();
    });

    test("DB2001 - Testing the cobol batch application which modifies the db2 table", async function () {
        //Execute Batch Application to modify the records in the DB2 table.
        const job = await Test4zService.submitJobUsingDataset(batchAppJCLDataset);
        expect(job).toBeSuccessful(); //Verify BatchApp JCL executed successfully

        const today = new Date().toISOString().slice(0, 10); //Get today's date in YYYY-MM-DD SQL format
        const recordsQuery = await Db2Service.executeSQLQuery("SELECT * FROM " + tableName + " WHERE NOTIFICATION_DATE='" + today + "'");
        expect(recordsQuery).toBeSuccessfulDb2();
        expect(recordsQuery.data[0].length).toBe(3);
    });

    afterAll(async () => {
        //Removing the test records from the DB2 dataset
        const testDataRemoval = Db2Service.removeDb2TestRecords(tableName);
        expect(testDataRemoval).toBeSuccessfulDb2();
    });
});
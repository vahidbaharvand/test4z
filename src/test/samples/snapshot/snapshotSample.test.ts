/* Copyright (c) 2021 Broadcom.
   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED
   FOR DETAILED INFORMATION ABOUT THIS TEST SUITE, PLEASE CHECK THE readme.md

   Example test suite for Test4z Snapshot feature.
*/
import { Test4zService, Filter, FilterBuilder, Types, Operators, QueryOperators, TestHelpers } from "@broadcom/test4z-node-package";

//Testing variables, the datasets
let mainDataset = "TEST4Z.BATCHAPP.CUSTIN";
let copyDataset = "TEST4Z.BATCHAPP.CUSTIN2";
let batchAppJCLDataset = "TEST4Z.BATCHAPP.JCL(CUSTSEQ)"
let copybook = "TEST4Z.BATCHAPP.COPY(CUSTREC)";

//Filter creation for the search request
const searchFilters: InstanceType<typeof Filter>[] = [
    new FilterBuilder()
            .Fieldname("TOTAL-CHECKS")
            .Operator(Operators.EQUAL)
            .Value(["30","50","80"])
            .Type(Types.NUMBER)
            .QueryOperator(QueryOperators.AND)
        .build(),
    new FilterBuilder()
            .Fieldname("ACTUAL-CHECKS")
            .Operator(Operators.LESSOREQUAL)
            .Value(["3","5","8"])
            .Type(Types.NUMBER)
            .QueryOperator(QueryOperators.AND)
        .build(),
    new FilterBuilder()
            .Fieldname("PRODUCT-TYPE")
            .Operator(Operators.EQUAL)
            .Value(["C","P"])
            .Type(Types.CHARACTER)
        .build()
];

describe("SNAPSHOT-TEST - Batchapp validation", function () {
    beforeAll(async () => {
        //Retrieve HLQ from config property
        const HLQ: any = await Test4zService.getProfileProp("hlq");
        mainDataset = HLQ+"."+mainDataset;
        copyDataset = HLQ+"."+copyDataset;
        batchAppJCLDataset = HLQ+"."+batchAppJCLDataset;
        copybook = HLQ+"."+copybook;
    });
    test("SNAPSHOT001 - Test using snapshot, job submit, search and roll-back-data", async function () {
        //Snapshot the specified main dataset to a specified output dataset.
        const result = await Test4zService.takeSnapShot(mainDataset, copyDataset);
        expect(result).toBeSuccessfulResult(); //Verify the API Request was successful

        //Execute Batch Application to modify the main dataset
        const  job = await Test4zService.submitJobUsingDataset(batchAppJCLDataset);
        expect(job).toBeSuccessful(); //Verify BatchApp JCL executed successfully

         //Pick some customers using the given inputs
        const oldDataset = await Test4zService.search(copyDataset, copybook, searchFilters);
        expect(oldDataset).toBeSuccessfulResult(); //Verify the API Request was successful
        const oldRecords = oldDataset.data;
        expect(oldRecords).toBeHaveTestData(); //Verify the API Result's Data contains records to test.

        //Pick some customers using the same inputs as used above.
        //The batchapp executed. So some changes are expected.
        const updatedDataset = await Test4zService.search(mainDataset, copybook, searchFilters);
        expect(updatedDataset).toBeSuccessfulResult(); //Verify the API Request was successful
        const updatedRecords = updatedDataset.data;
        expect(updatedRecords).toBeHaveTestData(); //Verify the API Result's Data contains records to test.


        expect(updatedRecords).not.toEqual(oldRecords); //Verify updated records are different than the old records.
        const todaysDate = new Date().toISOString().slice(0, 10).replace(/[-]/g, ""); //Get today's date in YYYYMMDD format
        expect(TestHelpers.getNotificationDates(updatedRecords)).toBeNotificationDatesEqualTo(todaysDate); //Verify all the notification dates were updated.
    });
    afterEach(async () => {
        //Since the BATCH app modified the original dataset,
        //rolling back changes by replacing the main dataset with the copy dataset
        const backupResult = await Test4zService.rollbackDataSet(copyDataset, mainDataset);
        expect(backupResult).toBeSuccessfulResult(); //Verify the API Request was successful
    });
});
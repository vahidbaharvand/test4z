/* Copyright (c) 2021 Broadcom.
   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED
   FOR DETAILED INFORMATION ABOUT THIS TEST SUITE AND THE USE CASE, PLEASE CHECK THE readme.md

   Example test suite for Test4z search feature
*/
import { Test4zService, Filter, Operators, Types, QueryOperators, FilterBuilder, TestHelpers } from "@broadcom/test4z";

//Testing variables, the datasets
let batchAppJCLDataset = "TEST4Z.BATCHAPP.JCL(CUSTSEQ)";
let mainDataset = "TEST4Z.BATCHAPP.CUSTIN";
let copyDataset = "TEST4Z.BATCHAPP.CUSTIN2";
let copybook = "TEST4Z.BATCHAPP.COPY(CUSTREC)";

//Filter creation for the search request
const filters: InstanceType<typeof Filter>[] = [
    new FilterBuilder()
            .Fieldname("ACTUAL-CHECKS")
            .Operator(Operators.LESSOREQUAL)
            .Value(["3"])
            .Type(Types.NUMBER)
            .QueryOperator(QueryOperators.AND)
        .build(),
    new FilterBuilder()
            .Fieldname("TOTAL-CHECKS")
            .Operator(Operators.EQUAL)
            .Value(["30"])
            .Type(Types.NUMBER)
            .QueryOperator(QueryOperators.AND)
        .build(),
    new FilterBuilder()
            .Fieldname("PRODUCT-TYPE")
            .Operator(Operators.EQUAL)
            .Value(["S,C"])
            .Type(Types.CHARACTER)
            .QueryOperator(QueryOperators.OR)
        .build(),
    new FilterBuilder()
            .Fieldname("ACTUAL-CHECKS")
            .Operator(Operators.LESSOREQUAL)
            .Value(["5"])
            .Type(Types.NUMBER)
            .QueryOperator(QueryOperators.AND)
        .build(),
    new FilterBuilder()
            .Fieldname("TOTAL-CHECKS")
            .Operator(Operators.EQUAL)
            .Value(["50"])
            .Type(Types.NUMBER)
            .QueryOperator(QueryOperators.AND)
        .build(),
    new FilterBuilder()
            .Fieldname("PRODUCT-TYPE")
            .Operator(Operators.EQUAL)
            .Value(["S,C"])
            .Type(Types.CHARACTER)
            .QueryOperator(QueryOperators.OR)
        .build(),
    new FilterBuilder()
            .Fieldname("ACTUAL-CHECKS")
            .Operator(Operators.LESSOREQUAL)
            .Value(["8"])
            .Type(Types.NUMBER)
            .QueryOperator(QueryOperators.AND)
        .build(),
    new FilterBuilder()
            .Fieldname("TOTAL-CHECKS")
            .Operator(Operators.EQUAL)
            .Value(["80"])
            .Type(Types.NUMBER)
            .QueryOperator(QueryOperators.AND)
        .build(),
    new FilterBuilder()
            .Fieldname("PRODUCT-TYPE")
            .Operator(Operators.EQUAL)
            .Value(["S,C"])
            .Type(Types.CHARACTER)
        .build(),
];

describe("SEARCH-TEST - Batchapp validation", function () {
    beforeAll(async () => {
        //Retrieve HLQ from config property
        const HLQ: any = await Test4zService.getProfileProp("hlq");
        mainDataset = HLQ+"."+mainDataset;
        copyDataset = HLQ+"."+copyDataset;
        batchAppJCLDataset = HLQ+"."+batchAppJCLDataset;
        copybook = HLQ+"."+copybook;
    });
    beforeEach(async () => {
        //Since the BATCH app will be updating the original data set, we want to make a copy of the data set before we modify it.
        //After the test, the data set copy will be used to revert the original data set back to its initial state.
        const result = await Test4zService.takeSnapShot(mainDataset, copyDataset);
        expect(result).toBeSuccessfulResult(); //Verify the API Request was successful
    });

    test("SEARCH001 - Test using snapshot, search, job submit and roll-back-data - basic", async function () {
        //Pick particular customers with the given inputs
        const searchResult1 = await Test4zService.search(mainDataset, copybook , filters);
        expect(searchResult1).toBeSuccessfulResult(); //Verify the API Request was successful
        const records = searchResult1.data;
        expect(records).toBeHaveTestData(); //Verify the API Result's Data contains records to test.
        expect(records.Record.length).toBe(24); //Verify number of the records

        //Execute Batch Application to modify the main data set
        const job = await Test4zService.submitJobUsingDataset(batchAppJCLDataset);
        expect(job).toBeSuccessful(); //Verify BatchApp JCL executed successfully

        //Pick the same customers using the same inputs as used above, to verify notification date values were updated
        const searchResult2 = await Test4zService.search(mainDataset, copybook , filters);
        expect(searchResult2).toBeSuccessfulResult(); //Verify the API Request was successful
        const records2 = searchResult2.data;
        expect(records2).toBeHaveTestData(); //Verify the API Result's Data contains records to test.
        expect(records2.Record.length).toBe(24); //Verify number of the records
        const todaysDate = new Date().toISOString().slice(0, 10).replace(/[-]/g, ""); //Get today's date in YYYYMMDD format
        expect(TestHelpers.getNotificationDates(records2)).toBeNotificationDatesEqualTo(todaysDate); //Verify all the notification dates were updated.
    });

    afterEach(async () => {
        //Since the BATCH app updated the original data set,
        //rolling back changes by replacing the main data set with the copy data set
        const backupResult = await Test4zService.rollbackDataSet(copyDataset, mainDataset);
        expect(backupResult).toBeSuccessfulResult(); //Verify the API Request was successful
    });
});

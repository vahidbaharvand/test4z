/* Copyright (c) 2021 Broadcom.
   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED
   FOR DETAILED INFORMATION ABOUT THIS TEST SUITE AND THE USE CASE, PLEASE CHECK THE readme.md

   Example test suite for Test4z update feature
*/
export {};
const { Test4zService, Filter, FilterBuilder, Operators, QueryOperators, UpdateCriteria, Types, UpdateModel, TestHelpers } = require("test4z-sdk");

//Testing variables, replace [HLQ] with the proper values
let batchAppJCLDataset = "TEST4Z.BATCHAPP.JCL(CUSTSEQ)";
let mainDataset = "TEST4Z.BATCHAPP.CUSTIN";
let copyDataset = "TEST4Z.BATCHAPP.CUSTIN2";
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
            .Value(["C,P"])
            .Type(Types.CHARACTER)
        .build()];

//Update input creation
const updateCriteria = new UpdateCriteria( "PRODUCT-TYPE", Operators.LIKE, Types.CHARACTER, "S","C");
const filterCriteria: InstanceType<typeof Filter> = new FilterBuilder().Fieldname("ACCOUNT-NUMBER").Operator(Operators.EQUAL).Value(["123456000003"]).Type(Types.CHARACTER)
    .build();
var updateModel: InstanceType<typeof UpdateModel>;

describe("UPDATE-TEST - Batchapp validation", function () {
    beforeAll(async () => {
        //Retrieve HLQ from config property
        const HLQ: any = await Test4zService.getProfileProp("hlq");
        mainDataset = HLQ+"."+mainDataset;
        copyDataset = HLQ+"."+copyDataset;
        batchAppJCLDataset = HLQ+"."+batchAppJCLDataset;
        copybook = HLQ+"."+copybook;
        updateModel = new UpdateModel(
            mainDataset,
            copybook,
            [
                updateCriteria
            ],
            filterCriteria
        )
    });
    beforeEach(async () => {
        //Since the BATCH app will be updating the original data set, we want to make a copy of the data set before we modify it.
        //After the test, the data set copy will be used to revert the original data set back to its initial state.
        const result = await Test4zService.takeSnapShot(mainDataset, copyDataset );
        expect(result).toBeSuccessfulResult(); //Verify the API Request was successful
    });

    test("UPDATE001 - Test using snapshot, job submit, search, update and roll-back-data", async function () {
        //Execute Batch Application to modify the main data set
        const job = await Test4zService.submitJobUsingDataset(batchAppJCLDataset);
        expect(job).toBeSuccessful(); //Verify BatchApp JCL executed successfully

        //Pick some customers using the given inputs
        const searchResult = await Test4zService.search(mainDataset, copybook, searchFilters);
        expect(searchResult).toBeSuccessfulResult(); //Verify the API Request was successful
        const records = searchResult.data;
        //Verify the number of the records changed after the batch application
        expect(records.Record.length).toBe(13);
        const todaysDate = new Date().toISOString().slice(0, 10).replace(/[-]/g, ""); //Get today's date in YYYYMMDD format
        expect(TestHelpers.getNotificationDates(records)).toBeNotificationDatesEqualTo(todaysDate); //Verify all the notification dates were updated today for the selected records

        //Roll back the changes by replacing the main data set with the copy data set
        const backupResult = await Test4zService.rollbackDataSet(copyDataset, mainDataset);
        expect(backupResult).toBeSuccessfulResult(); //Verify the API Request was successful

        //Update a particular record in the dataset, as the inputs defined above
        const updateResult = await Test4zService.update(updateModel);
        expect(updateResult).toBeSuccessfulResult(); //Verify the API Request was successful
        expect(updateResult.data.recordsChanged).toBe(1);//Verify number of the records updated

        //Execute Batch Application to modify the main data set
        const job2 = await Test4zService.submitJobUsingDataset(batchAppJCLDataset);
        expect(job2).toBeSuccessful(); //Verify the job submission was successful

        //Pick the same customers using the same inputs as used above,
        //to verify notification date values were updated
        const searchResult2 = await Test4zService.search(mainDataset, copybook, searchFilters);
        expect(searchResult2).toBeSuccessfulResult(); //Verify the API Request was successful
        const records2 = searchResult2.data;
        //Verify the number of the records changed after the batch application (it is +1 after the Update performed above)
        expect(records2.Record.length).toBe(14);
        expect(TestHelpers.getNotificationDates(records2)).toBeNotificationDatesEqualTo(todaysDate); //Verify all the notification dates were updated.
    });

    afterEach(async () => {
        //Since the BATCH app updated the original data set,
        //rolling back changes by replacing the main data set with the copy data set
        const backupResult = await Test4zService.rollbackDataSet(copyDataset, mainDataset);
        expect(backupResult).toBeSuccessfulResult(); //Verify the API Request was successful
    });
});
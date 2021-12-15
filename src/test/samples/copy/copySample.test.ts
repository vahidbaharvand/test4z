/* Copyright (c) 2021 Broadcom.
   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED
   FOR DETAILED INFORMATION ABOUT THIS TEST SUITE AND THE USE CASE, PLEASE CHECK THE readme.md

   Example test suite for Test4z copy feature
*/
import { Test4zService, CopyFilter, Filter, FilterBuilder, Operators, Types } from "@broadcom/test4z";

//Testing variables, the datasets
let mainDataset = "TEST4Z.BATCHAPP.CUSTIN";
let copyDataset = "TEST4Z.BATCHAPP.CUSTIN2";
let backupDataset = "TEST4Z.BATCHAPP.CUSTINBC";
let copybook = "TEST4Z.BATCHAPP.COPY(CUSTREC)";
let batchAppJCLDataset = "TEST4Z.BATCHAPP.JCL(CUSTSEQ)"
const date = new Date().toISOString().slice(0, 10).replace(/[-]/g, ""); //Get today's date in YYYYMMDD format
const filter: InstanceType<typeof Filter>[] = [
    new FilterBuilder()
        .Fieldname("NOTIFICATION-DATE")
        .Operator(Operators.EQUAL)
        .Value([date])
        .Type(Types.NUMBER)
        .build()
];
let copyFilter: InstanceType<typeof CopyFilter>;

describe("COPY-TEST - Batchapp validation", function () {
    beforeAll(async () => {
        //Retrieve HLQ from config property
        const HLQ: any = await Test4zService.getProfileProp("hlq");
        mainDataset = HLQ+"."+mainDataset;
        copyDataset = HLQ+"."+copyDataset;
        backupDataset = HLQ+"."+backupDataset;
        copybook = HLQ+"."+copybook;
        batchAppJCLDataset = HLQ+"."+batchAppJCLDataset;
        //Generate the copy filter
        copyFilter = new CopyFilter(copybook, filter);

        //Take a 1:1 copy from mainDataset to backupDataset
        const backupResult = await Test4zService.copy(mainDataset, backupDataset);
        expect(backupResult).toBeSuccessfulResult(); //Verify the API Request was successful
    });
    test("COPY001 - Test using copy, job submit, search and roll-back-data", async function () {
        //Execute Batch Application to modify the mainDataset
        const job = await Test4zService.submitJobUsingDataset(batchAppJCLDataset);
        expect(job).toBeSuccessful(); //Verify BatchApp JCL executed successfully

        //Create a subset of data from the mainDataset using the copy feature with the given filter
        const copyResult = await Test4zService.copy(mainDataset, copyDataset, 0, 0, copyFilter);
        expect(copyResult).toBeSuccessfulResult(); //Verify the API Request was successful

        //Search the data in the copyDataset to verify the number of the records
        const searchResult = await Test4zService.search(copyDataset, copybook , filter);
        expect(searchResult).toBeSuccessfulResult(); //Verify the API Request was successful
        const records = searchResult.data;
        expect(records.Record.length).toBe(24); //Verify number of the records affected by the batch application
    });
    afterEach(async () => {
        //Since the BATCH app modified the original dataset,
        //rolling back changes by replacing the mainDataset with the backupDataset
        const rollbackResult = await Test4zService.rollbackDataSet(backupDataset, mainDataset);
        expect(rollbackResult).toBeSuccessfulResult(); //Verify the API Request was successful
    });
});
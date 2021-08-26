/* Copyright (c) 2021 Broadcom.
   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED
   FOR DETAILED INFORMATION ABOUT THIS TEST SUITE AND THE USE CASE, PLEASE CHECK THE readme.md

   Example test suite for Test4z compare feature
*/
import { Test4zService } from "@broadcom/test4z";

//Testing variables, the datasets
let mainDataset = "TEST4Z.BATCHAPP.CUSTIN";
let copyDataset = "TEST4Z.BATCHAPP.CUSTIN2";
let batchAppJCLDataset = "TEST4Z.BATCHAPP.JCL(CUSTSEQ)"

describe("COMPARE-TEST - Batchapp validation", function () {
    beforeAll(async () => {
        //Retrieve HLQ from config property
         const HLQ: any = await Test4zService.getProfileProp("hlq");
         mainDataset = HLQ+"."+mainDataset;
         copyDataset = HLQ+"."+copyDataset;
         batchAppJCLDataset = HLQ+"."+batchAppJCLDataset;
    });
    test("COMPARE001 - Test using snapshot, job submit, compare and roll-back-data", async function () {
        //Take a Snapshot from mainDataset to copyDataset
        const snapshotResult = await Test4zService.takeSnapShot(mainDataset, copyDataset);
        expect(snapshotResult).toBeSuccessfulResult(); //Verify the API Request was successful

        //Execute Batch Application to modify the main dataset
        const job = await Test4zService.submitJobUsingDataset(batchAppJCLDataset);
        expect(job).toBeSuccessful(); //Verify BatchApp JCL executed successfully

        //Compare the mainDataset with the copyDataset to identify any changes.
        const compareResult = await Test4zService.compare(copyDataset, mainDataset);
        expect(compareResult).toBeSuccessfulResult(); //Verify the API Request was successful

        //Asserting the compare result summary
        expect(compareResult.data.summary.oldRecordsProcessed).toBe(75);
        expect(compareResult.data.summary.newRecordsProcessed).toBe(75);
        expect(compareResult.data.summary.insertedLines).toBe(0);
        expect(compareResult.data.summary.changedLines).toBe(24);
        expect(compareResult.data.summary.matchedLines).toBe(51);
        expect(compareResult.data.summary.deletedLines).toBe(0);
    });
    afterEach(async () => {
        //Since the BATCH app modified the original dataset,
        //rolling back changes by replacing the main dataset with the copy dataset
        const backupResult = await Test4zService.rollbackDataSet(copyDataset, mainDataset);
        expect(backupResult).toBeSuccessfulResult(); //Verify the API Request was successful
    });
});
/* Copyright (c) 2022 Broadcom.
   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED
   FOR DETAILED INFORMATION ABOUT THIS TEST SUITE AND THE USE CASE, PLEASE CHECK THE readme.md
   Example test suite for Test4z compare feature
*/
import { Test4zService } from "@broadcom/test4z";

//Testing variables, the datasets
let mainDataset = "TEST4Z.BATCHAPP.DATA(CUSTIN)";
let copyDataset = "TEST4Z.BATCHAPP.DATA(CUSTINT)";
let copybook = "TEST4Z.BATCHAPP.COPY(CUSTREC)";

describe("compare - Batchapp validation", function () {
    beforeAll(async () => {
        //Retrieve HLQ from config property
        const HLQ: any = await Test4zService.getProfileProp("hlq");
        mainDataset = HLQ+"."+mainDataset;
        copyDataset = HLQ+"."+copyDataset;
        copybook = HLQ+"."+copybook;
    });

    test("COMPARE001 - Test using snapshot, job submit, compare and roll-back-data", async function () {
        //Compare the mainDataset with the copyDataset to identify any changes.
        const compareResult = await Test4zService.compare(mainDataset, copyDataset);
        expect(compareResult).toBeSuccessfulResult(); //Verify the API Request was successful

        //Asserting the compare result summary
        expect(compareResult.data.summary.oldRecordsProcessed).toBe(75);
        expect(compareResult.data.summary.newRecordsProcessed).toBe(70);
        expect(compareResult.data.summary.insertedLines).toBe(0);
        expect(compareResult.data.summary.changedLines).toBe(6);
        expect(compareResult.data.summary.matchedLines).toBe(64);
        expect(compareResult.data.summary.deletedLines).toBe(5);
    });

    test("COMPARE002 - Test using snapshot, job submit, compare (with field include feature) and roll-back-data", async function () {
        //Compare the mainDataset with the copyDataset to identify any changes.
        //Notice the additional parameters in the compare request, the service only
        //considers the changes within the NOTIFICATION-DATE field, CUST-NAME field is a reference field without any changes.
        const compareResult = await Test4zService.compare(mainDataset, copyDataset, "INCLUDE", ["CUST-NAME","NOTIFICATION-DATE"], copybook);
        expect(compareResult).toBeSuccessfulResult(); //Verify the API Request was successful

        //Asserting the compare result summary
        expect(compareResult.data.summary.oldRecordsProcessed).toBe(75);
        expect(compareResult.data.summary.newRecordsProcessed).toBe(70);
        expect(compareResult.data.summary.insertedLines).toBe(0);
        expect(compareResult.data.summary.changedLines).toBe(6);
        expect(compareResult.data.summary.matchedLines).toBe(64);
        expect(compareResult.data.summary.deletedLines).toBe(5);
    });
});

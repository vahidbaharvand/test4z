/* Copyright (c) 2022 Broadcom.
   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED
   FOR DETAILED INFORMATION ABOUT THIS TEST SUITE AND THE USE CASE, PLEASE CHECK THE readme.md
   Example test suite for Test4z compare feature
*/
import {CompareResult, Test4zService} from "@broadcom/test4z";
import {FieldPair} from "@broadcom/test4z/lib/main/models/diffLayoutCompare/DiffLayoutCompareModel";

//Testing variables, the datasets
let mainDataset = "TEST4Z.BATCHAPP.DATA(CUSTIN)";
let copyDataset = "TEST4Z.BATCHAPP.DATA(CUSTINT)";
let copybook = "TEST4Z.BATCHAPP.COPY(CUSTREC)";
let dataset1 = "TEST4Z.BATCHAPP.DATA(CUSTINA)";
let dataset2 = "TEST4Z.BATCHAPP.DATA(CUSTINB)";
let copybook1 = "TEST4Z.BATCHAPP.COPY(CUSTINA)";
let copybook2 = "TEST4Z.BATCHAPP.COPY(CUSTINB)";

describe("COMPARE-TEST - Batchapp validation", function () {
    beforeAll(async () => {
        //Retrieve HLQ from config property
        const HLQ: any = await Test4zService.getProfileProp("test4z", "hlq");
        mainDataset = HLQ + "." + mainDataset;
        copyDataset = HLQ + "." + copyDataset;
        copybook = HLQ + "." + copybook;
        dataset1 = HLQ + "." + dataset1;
        dataset2 = HLQ + "." + dataset2;
        copybook1 = HLQ + "." + copybook1;
        copybook2 = HLQ + "." + copybook2;
    });

    function runAssertion(compareResult: CompareResult, oldRecordsProcessed: number, newRecordsProcessed: number,
                          insertedLines: number, changedLines: number, matchedLines: number, deletedLines: number) {
        expect(compareResult).toBeSuccessfulResult(); //Verify the API Request was successful

        //Asserting the compare result summary
        expect(compareResult.data.summary.oldRecordsProcessed).toBe(oldRecordsProcessed);
        expect(compareResult.data.summary.newRecordsProcessed).toBe(newRecordsProcessed);
        expect(compareResult.data.summary.insertedLines).toBe(insertedLines);
        expect(compareResult.data.summary.changedLines).toBe(changedLines);
        expect(compareResult.data.summary.matchedLines).toBe(matchedLines);
        expect(compareResult.data.summary.deletedLines).toBe(deletedLines);
    }


    test("COMPARE001 - Compare snippet", async function () {
        //Compare the mainDataset with the copyDataset to identify any changes.
        const compareResult = await Test4zService.compare(mainDataset, copyDataset);
        runAssertion(compareResult, 75, 70, 0, 6, 64, 5);
    });

    test("COMPARE002 - Compare snippet (with field include feature)", async function () {
        //Compare the mainDataset with the copyDataset to identify any changes.
        //Notice the additional parameters in the compare request, the service only
        //considers the changes within the NOTIFICATION-DATE field, CUST-NAME field is a reference
        // field without any changes.
        const compareResult = await Test4zService.compare(mainDataset, copyDataset, "INCLUDE",
            ["CUST-NAME", "NOTIFICATION-DATE"], copybook);
        runAssertion(compareResult, 75, 70, 0, 6, 64, 5);
    });

    test("COMPARE003 - Compare different layouts snippet (two datasets with two different layouts)",
        async function () {
            /**
             * Compare the dataset1 with dataset2, respectively those datasets have different layout represented
             * by copybook1 and copybook2. The fields that are filtering this compare are CUST-MAIL and CUST-EMAIL.
             */
            let fieldPairs: FieldPair[] = [new FieldPair("CUST-MAIL", "CUST-EMAIL")];

            const difLayoutCompareResult = await Test4zService.diffLayoutCompare(
                dataset1, dataset2, copybook1, copybook2, fieldPairs);
            runAssertion(difLayoutCompareResult, 20, 19, 4, 5, 10, 5);
        })
});

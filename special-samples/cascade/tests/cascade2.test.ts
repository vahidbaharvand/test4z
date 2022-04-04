/* Copyright (c) 2022 Broadcom.
   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED
   FOR DETAILED INFORMATION ABOUT THIS TEST SUITE AND THE USE CASE, PLEASE CHECK THE readme.md

   Example test suite for Dependent jobs running as a single test case
*/
import { Test4zService } from "@broadcom/test4z";

let TS4ZJB1 = "TEST4Z.BATCHAPP.CASCADE(TS4ZJB1)";
let TS4ZJB2 = "TEST4Z.BATCHAPP.CASCADE(TS4ZJB2)";
let TS4ZHRC = "TEST4Z.BATCHAPP.CASCADE(TS4ZHRC)";

describe('Dependent Jobs - Jobs are sequenced based on dependency', () => {
    beforeAll(async () => {
        //Retrieve HLQ from config property
        const HLQ: any = await Test4zService.getProfileProp("hlq");
        TS4ZJB1 = HLQ+"."+TS4ZJB1;
        TS4ZJB2 = HLQ+"."+TS4ZJB2;
        TS4ZHRC = HLQ+"."+TS4ZHRC;
    });
    test('DSEQ001 - Test should submit 3 jobs and expected to return RC = 00 or 04', async () => {
        const job1retCode: String = await Test4zService.submitJobUsingDataset(TS4ZJB1);
        expect(job1retCode).toBeSuccessful();

        // The job returns RC = 12, hence fails
        const RCHighretCode: String = await Test4zService.submitJobUsingDataset(TS4ZHRC);
        expect(RCHighretCode).toBeSuccessful();

        // This job will not be executed due to failure of job - TS4ZHRC
        const job2retCode: String = await Test4zService.submitJobUsingDataset(TS4ZJB2);
        expect(job2retCode).toBeSuccessful();
    })
});

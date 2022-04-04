/* Copyright (c) 2022 Broadcom.
   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED
   FOR DETAILED INFORMATION ABOUT THIS TEST SUITE AND THE USE CASE, PLEASE CHECK THE readme.md

   Example test suite for running independent jobs sequentially in multiple test blocks
*/
import { Test4zService } from "@broadcom/test4z";

let TS4ZJB1 = "TEST4Z.BATCHAPP.CASCADE(TS4ZJB1)";
let TS4ZJB2 = "TEST4Z.BATCHAPP.CASCADE(TS4ZJB2)";
let TS4ZHRC = "TEST4Z.BATCHAPP.CASCADE(TS4ZHRC)";

describe('Independent jobs - Test submits all 3 jobs sequentially', () => {
    beforeAll(async () => {
        //Retrieve HLQ from config property
        const HLQ: any = await Test4zService.getProfileProp("zosmf", "hlq");
        TS4ZJB1 = HLQ+"."+TS4ZJB1;
        TS4ZJB2 = HLQ+"."+TS4ZJB2;
        TS4ZHRC = HLQ+"."+TS4ZHRC;
    });
    test('ISEQ001 - Expected to return RC 00 or 04 ', async () => {
        const job1retCode: String = await Test4zService.submitJobUsingDataset(TS4ZJB1);
        expect(job1retCode).toMatch("0000|0004")
    })

    //The job is expected to fail as it returns high RC = 12
    test('ISEQ002 - Expected to return RC 00 or 04 but returns RC 12', async () => {
        const jobRCHighretcode: String = await Test4zService.submitJobUsingDataset(TS4ZHRC);
        expect(jobRCHighretcode).toMatch("0000|0004")
    })

    test('ISEQ003 - Expected to return RC 00 or 04', async () => {
        const jobRCHighretcode: String = await Test4zService.submitJobUsingDataset(TS4ZJB2);
        expect(jobRCHighretcode).toMatch("0000|0004")
    })
});

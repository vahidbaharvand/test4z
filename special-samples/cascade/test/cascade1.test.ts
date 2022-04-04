/* Copyright (c) 2022 Broadcom.
   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED
   FOR DETAILED INFORMATION ABOUT THIS TEST SUITE AND THE USE CASE, PLEASE CHECK THE readme.md

   Example test suite for Independent jobs running concurrently
*/
import { Test4zService } from "@broadcom/test4z";

let TS4ZJB1 = "TEST4Z.BATCHAPP.CASCADE(TS4ZJB1)";
let TS4ZJB2 = "TEST4Z.BATCHAPP.CASCADE(TS4ZJB2)";
let TS4ZHRC = "TEST4Z.BATCHAPP.CASCADE(TS4ZHRC)";

describe('Independent Jobs - Test submits all 3 jobs simultaneously ', () => {
    test.concurrent('CONCUR001 - The job is expected to return RC 00 or 04', async () => {
        const HLQ: any = await Test4zService.getProfileProp("zosmf", "hlq");
        const job2retCode: String = await Test4zService.sendJobZOSMF(HLQ+"."+TS4ZJB1);
        expect(job2retCode).toMatch("0000|0004")
    })
    test.concurrent('CONCUR002 - The job is expected to return RC 00 or 04 but returns RC 12 and hence fails', async () => {
        const HLQ: any = await Test4zService.getProfileProp("zosmf", "hlq");
        const job2retCode: String = await Test4zService.sendJobZOSMF(HLQ+"."+TS4ZHRC);
        expect(job2retCode).toMatch("0000|0004")
    })
    test.concurrent('CONCUR003 -The job is expected to return RC 00 or 04', async () => {
        const HLQ: any = await Test4zService.getProfileProp("zosmf", "hlq");
        const job2retCode: String = await Test4zService.sendJobZOSMF(HLQ+"."+TS4ZJB2);
        expect(job2retCode).toMatch("0000|0004")
    })
});

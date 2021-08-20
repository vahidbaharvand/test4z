/* Copyright (c) 2021 Broadcom.
   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED
   FOR DETAILED INFORMATION ABOUT THIS TEST SUITE AND THE USE CASE, PLEASE CHECK THE readme.md

   User experience test suite.
*/
export {};
const { Test4zService, Filter, Operators, Types, FilterBuilder } = require("test4z-sdk");

//Testing variables, replace [HLQ] with the proper values
let mainDataset = "TEST4Z.BATCHAPP.CUSTIN";
let copybook = "TEST4Z.BATCHAPP.COPY(CUSTREC)";

//Filter creation for the search request
const searchFilters: InstanceType<typeof Filter>[] = [];
const productType: InstanceType<typeof Filter> = new FilterBuilder().Fieldname("PRODUCT-TYPE").Operator(Operators.EQUAL).Value(["S", "C"]).Type(Types.CHARACTER)
    .build();
searchFilters.push(productType);

describe("UX TEST - Consistency check on actual check numbers", function () {
    beforeAll(async () => {
        //Retrieve HLQ from config property
        const HLQ: any = await Test4zService.getProfileProp("hlq");
        mainDataset = HLQ+"."+mainDataset;
        copybook = HLQ+"."+copybook;
    });
    test("UXTEST001 - Test using search", async function () {
        const searchResult = await Test4zService.search(mainDataset, copybook, searchFilters);
        expect(searchResult).toBeSuccessfulResult(); //Verify the API Request was successful
        const records = searchResult.data;
        expect(records).toBeHaveTestData(); //Verify the API Result's Data contains records to test
        expect(records.Record.length).toBe(67); //Verify the API Result's record count

        records.Record.forEach((record: any) => {
            const totalChecks: number = record.CUSTINREC["TOTAL-CHECKS"];  //Get TOTAL-CHECKS of the record
            const actualChecks: number = record.CUSTINREC["ACTUAL-CHECKS"];//Get ACTUAL-CHECKS of the record
            let threshold: number = 0;

            switch (totalChecks) {
                case 30: threshold = 3;break;
                case 50: threshold = 5;break;
                case 80: threshold = 8;break;
            }

            expect(actualChecks <= totalChecks + threshold).toBe(true); //Verify the data for each record
        })
    });
});

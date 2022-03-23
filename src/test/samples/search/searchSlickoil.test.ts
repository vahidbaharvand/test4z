/* Copyright (c) 2021 Broadcom.
   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED
   FOR DETAILED INFORMATION ABOUT THIS TEST SUITE AND THE USE CASE, PLEASE CHECK THE readme.md

   Example test suite for Test4z search feature
*/
import { Test4zService, Filter, Operators, Types, QueryOperators, FilterBuilder, TestHelpers } from "@broadcom/test4z";

//Testing variables, the datasets
let batchAppJCLDataset = "PTCINCUB.SLICK.JCL(ADD)";
let mainDataset = "PTCINCUB.SLICK.ACCTFILE";
let copybook = "PTCINCUB.SLICK.COBCOPY(ACCTFILE)";

//Filter creation for the search request
const filters: InstanceType<typeof Filter>[] = [
    
    new FilterBuilder()
            .Fieldname("ACCOUNT-ID")
            .Operator(Operators.EQUAL)
            .Value(["1015"])
            .Type(Types.NUMBER)
        .build(),
];

describe("SEARCH-TEST - Batchapp validation", function () {
    beforeAll(async () => {
        const HLQ: any = await Test4zService.getProfileProp("hlq");
        
    });
    beforeEach(async () => {
        
    });

    test("SEARCH001 - Test record addition - basic", async function () {
        
        const job = await Test4zService.submitJobUsingDataset(batchAppJCLDataset);
        expect(job).toBeSuccessful(); //Verify BatchApp JCL executed successfully

        //Pick the same customers using the same inputs as used above, to verify notification date values were updated
        const searchResult2 = await Test4zService.search(mainDataset, copybook , filters);
        expect(searchResult2).toBeSuccessfulResult(); //Verify the API Request was successful
        const records2 = searchResult2.data;
        expect(records2).toBeHaveTestData(); //Verify the API Result's Data contains records to test.
        
    });

    afterEach(async () => {
        
    });
});

/* Copyright (c) 2022 Broadcom.
   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED
   FOR DETAILED INFORMATION ABOUT THIS TEST SUITE AND THE USE CASE, PLEASE CHECK THE readme.md
   Example test suite for Test4z search feature
*/
import { Test4zService, Filter, Operators, Types, QueryOperators, FilterBuilder } from "@broadcom/test4z";

//Testing variables, the datasets
let mainDataset = "TEST4Z.BATCHAPP.DATA(CUSTIN)";
let copybook = "TEST4Z.BATCHAPP.COPY(CUSTREC)";

//Filter creation for the search request
const filters: InstanceType<typeof Filter>[] = [
    new FilterBuilder()
        .Fieldname("ACTUAL-CHECKS")
        .Operator(Operators.LESSOREQUAL)
        .Value(["3"])
        .Type(Types.NUMBER)
        .QueryOperator(QueryOperators.AND)
        .build(),
    new FilterBuilder()
        .Fieldname("PRODUCT-TYPE")
        .Operator(Operators.EQUAL)
        .Value(["S,C"])
        .Type(Types.CHARACTER)
        .QueryOperator(QueryOperators.OR)
        .build(),

];

describe("SEARCH-TEST - Batchapp validation", function () {
    beforeAll(async () => {
        //Retrieve HLQ from config property
        const HLQ: any = await Test4zService.getProfileProp("test4z", "hlq");
        mainDataset = HLQ+"."+mainDataset;
        copybook = HLQ+"."+copybook;
    });

    test("SEARCH001 - Test using snapshot, search, job submit and roll-back-data - basic", async function () {
        const searchResult1 = await Test4zService.search(mainDataset, copybook , filters);
        expect(searchResult1).toBeSuccessfulResult(); //Verify the API Request was successful
        const records = searchResult1.data;
        expect(records).toBeHaveTestData(); //Verify the API Result's Data contains records to test.
        expect(records.Record.length).toBe(22); //Verify number of the records
    });
});

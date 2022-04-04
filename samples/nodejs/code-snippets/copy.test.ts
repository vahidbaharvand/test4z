/* Copyright (c) 2022 Broadcom.
   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED
   FOR DETAILED INFORMATION ABOUT THIS TEST SUITE AND THE USE CASE, PLEASE CHECK THE readme.md
   Example test suite for Test4z copy feature
*/
import { Test4zService, CopyFilter, Filter, FilterBuilder, Operators, Types } from "@broadcom/test4z";

//Testing variables, the datasets
let mainDataset = "TEST4Z.BATCHAPP.DATA(CUSTIN)";
let copyDataset = "TEST4Z.BATCHAPP.DATA(CUSTINC)";
let copybook = "TEST4Z.BATCHAPP.COPY(CUSTREC)";
const filter: InstanceType<typeof Filter>[] = [
    new FilterBuilder()
        .Fieldname("ACTUAL-CHECKS")
        .Operator(Operators.LESSOREQUAL)
        .Value(["3"])
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
        copybook = HLQ+"."+copybook;
        //Generate the copy filter
        copyFilter = new CopyFilter(copybook, filter);
    });
    test("COPY001 - Test using copy, job submit, search and roll-back-data", async function () {
        //Create a subset of data from the mainDataset using the copy feature with the given filter
        const copyResult = await Test4zService.copy(mainDataset, copyDataset);
        expect(copyResult).toBeSuccessfulResult(); //Verify the API Request was successful
    });

    test("COPY001 - Test using copy, job submit, search and roll-back-data", async function () {
        //Create a subset of data from the mainDataset using the copy feature with the given filter
        const copyResult = await Test4zService.copy(mainDataset, copyDataset, 0, 0, copyFilter);
        expect(copyResult).toBeSuccessfulResult(); //Verify the API Request was successful
    });

});

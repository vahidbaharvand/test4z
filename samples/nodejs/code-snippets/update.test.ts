/* Copyright (c) 2022 Broadcom.
   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED
   FOR DETAILED INFORMATION ABOUT THIS TEST SUITE AND THE USE CASE, PLEASE CHECK THE readme.md
   Example test suite for Test4z update feature
*/
import { Test4zService, Filter, FilterBuilder, Operators, UpdateCriteria, Types, UpdateModel } from "@broadcom/test4z";

//Testing variables, replace [HLQ] with the proper values
let mainDataset = "TEST4Z.BATCHAPP.DATA(CUSTIN)";
let copybook = "TEST4Z.BATCHAPP.COPY(CUSTREC)";

//Update input creation
const updateCriteria = new UpdateCriteria( "PRODUCT-TYPE", Operators.LIKE, Types.CHARACTER, "B","B");
const filterCriteria: InstanceType<typeof Filter> = new FilterBuilder().Fieldname("ACCOUNT-NUMBER").Operator(Operators.EQUAL).Value(["123456000068"]).Type(Types.CHARACTER)
    .build();
var updateModel: InstanceType<typeof UpdateModel>;

describe("UPDATE-TEST - Batchapp validation", function () {
    beforeAll(async () => {
        //Retrieve HLQ from config property
        const HLQ: any = await Test4zService.getProfileProp("hlq");
        mainDataset = HLQ+"."+mainDataset;
        copybook = HLQ+"."+copybook;
        updateModel = new UpdateModel(mainDataset, copybook, [updateCriteria], filterCriteria)
    });


    test("UPDATE001 - Test using snapshot, job submit, search, update and roll-back-data", async function () {
        //Update a particular record in the dataset, as the inputs defined above
        const updateResult = await Test4zService.update(updateModel);
        expect(updateResult).toBeSuccessfulResult(); //Verify the API Request was successful
        expect(updateResult.data.recordsChanged).toBe(1);//Verify number of the records updated
    });
});

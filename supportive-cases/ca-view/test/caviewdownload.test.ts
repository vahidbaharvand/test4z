/* Copyright (c) 2021 Broadcom.
   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED
   FOR DETAILED INFORMATION ABOUT THIS TEST SUITE AND THE USE CASE, PLEASE CHECK THE readme.md

   Example test suite for Test4z WebViewer research
*/
import { Test4zService, Filter, Operators, Types, QueryOperators, FilterBuilder, TestHelpers } from "@broadcom/test4z";
import { Authentication, CrossReportIndexes, ExportRules, Reports, ReportContent, Repositories, Users, ViewRestClient, Features } from "@broadcom/caview-for-zowe-cli";
import {ITestEnvironment, TestEnvironment, TestCommon} from "@broadcom/caview-for-zowe-cli";
import { ICommandDefinition } from "@zowe/imperative";
import { hasUncaughtExceptionCaptureCallback } from "process";
//import { DownloadReport, ExportReport, GetUserDefinition, ListRepositories, ListReports, ListExportRules, ListReport } from "@broadcom/caview-for-zowe-cli";

//Testing variables, the datasets
let batchAppJCLDataset = "PTCINCUB.SPITFIRE.JCL(CUSTVIE2)";

describe("SAMPLE-TEST - Batchapp validation", function () {
    
       test("SAMPLE001 - Submission of a job through Zowe", async function () {
        //Execute Batch Application to modify the main data set
        const job = await Test4zService.submitJobUsingDataset(batchAppJCLDataset);
        expect(job).toBeSuccessful(); //Verify BatchApp JCL executed successfully
        const job1 = await Authentication.login(Session);

        expect(job1).toBeSuccessful();
        const repository = await Repositories.get

        const report = await Reports.


    });
});
describe("SAMPLE-APIs - Downloading Reports", function () {
    test("SAMPLE001 - Authentication", async function () {
     //Execute Batch Application to modify the main data set
     const job = await Test4zService.submitJobUsingDataset(batchAppJCLDataset);
     expect(job).toBeSuccessful(); //Verify BatchApp JCL executed successfully

 });
});


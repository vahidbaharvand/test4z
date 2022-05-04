/* Copyright (c) 2022 Broadcom.
   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED
   FOR DETAILED INFORMATION ABOUT THIS TEST SUITE AND THE USE CASE, PLEASE CHECK THE readme.md
*/
import {Repositories, IRepository, Reports, IReport, ReportContent, ViewRestClient} from "@broadcom/caview-for-zowe-cli";
import {Session,ISession} from "@zowe/imperative";
import { CAViewSessionFactory } from "../main/services/CAViewSessionFactory";
import { IResult } from "../main/services/IResult";

   test("Download Report", async function () {

           let session : Session =  new Session(await CAViewSessionFactory.getSession());
           let repository:Repositories = new Repositories(session);
           let repositoryList:IRepository[] =  await repository.list();
           expect(repositoryList.length).toBeGreaterThan(0);
           let repositoryID :number = repositoryList[0].id
           
           let reports:Reports = new Reports(session,repositoryID);
           let report:IReport[] = await reports.listReports();
           expect(report.length).toBeGreaterThan(0);
           let reportHandleID :string = report[0].handle; 

           let responsetxt:IResult = await ViewRestClient.getExpectJSON(session,"/v1/view/rptdata/"+repositoryID+"/"+reportHandleID) as IResult;
           let responsestring = "";
           for (let reportData of responsetxt.result["Report Data"]) {
               responsestring += reportData.data + "\n";
            }  
           console.log(responsestring);  
    });
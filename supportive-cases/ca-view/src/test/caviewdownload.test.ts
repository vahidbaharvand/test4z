/* Copyright (c) 2021 Broadcom.
   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED
   FOR DETAILED INFORMATION ABOUT THIS TEST SUITE AND THE USE CASE, PLEASE CHECK THE readme.md
*/
import {Repositories, IRepository, Reports, IReport, ReportContent} from "@broadcom/caview-for-zowe-cli";
import {Session,ISession} from "@zowe/imperative";
import { CAViewSessionFactory } from "../main/services/CASessionFactory";

   test("Get repository ID", async function () {

           let session : ISession =  await CAViewSessionFactory.getSession();
           let session1 = new Session(session);
           let repository:Repositories = new Repositories(session1);
           let repositoryList:IRepository[] =  await repository.list();
           let repositoryID :number = repositoryList[0].id
           if(repository.list() ==  null ) 
           {
              console.log ("Repository list is empty")
           }
           else {
              console.log("First Repository ID :"+repositoryList[0].id);
           }

           let reports:Reports = new Reports(session1,repositoryID);
           let report:IReport[] = await reports.listReports();
           let reportHandleID :string = report[0].handle; 
           console.log("Report Handle :"+report[0].handle);

           let reportcontent:ReportContent = new ReportContent(session1,repositoryID,reportHandleID);
           let report1:IReport[] = await reportcontent.download(".\CAVIEW2 report.pdf", false);
           console.log("Report Content is downloaded ");
    });
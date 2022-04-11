/* Copyright (c) 2021 Broadcom.
   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED
   FOR DETAILED INFORMATION ABOUT THIS TEST SUITE AND THE USE CASE, PLEASE CHECK THE readme.md
*/
import {Repositories, IRepository, Reports, IReport} from "@broadcom/caview-for-zowe-cli";
import {Session,ISession} from "@zowe/imperative";
import {ViewSession} from "@broadcom/caview-for-zowe-cli/lib/cli";

describe("CA-View report Demonstration", function () {
    
       test("Get repository ID", async function () {

           let session : ISession = { "hostname":"" , "port":2100 ,
               "user":"" , "password":"" ,
               "basePath":"web-viewer" , "protocol":"http" , "rejectUnauthorized":false, "type":"basic"};

           let repository:Repositories = new Repositories(new Session(session));
           let repositoryList:IRepository[] =  await repository.list();
           console.log("First Repository ID :: "+repositoryList[0].id);

           let reports:Reports = new Reports(new Session(session),1);
           let report:IReport[] = await reports.listReports();
           console.log("Report Handle :"+report[0].handle);
    });
});

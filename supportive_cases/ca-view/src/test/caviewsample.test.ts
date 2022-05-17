import {Repositories, IRepository, Reports, IReport, ViewRestClient} from "@broadcom/caview-for-zowe-cli";
import {IResult} from "../main/services/IResult";
import {Profiles, SessionFactory} from "@broadcom/test4z";
import {Session} from "@zowe/imperative";
import { Test4zService,Filter, Operators, Types, QueryOperators, FilterBuilder } from "@broadcom/test4z";
import {IJob, SubmitJobs, GetJobs, IJobFile} from "@zowe/cli";
import { assert } from "console";

let JCLDSName = "PTCINCUB.SPITFIRE.JCL(T4ZVIEW)";
 
test("Submit a job through ZOSMF and retrieve the contents", async function () {

    let zOSMFSession : Session = await SessionFactory.getSession(Profiles.zosmf);
    const job: IJob = await SubmitJobs.submitJobNotify(zOSMFSession, JCLDSName);
    expect(job.retcode).toMatch("CC 0000");

    let spoolcontent = {};
    const jobLogs: IJobFile[] = await GetJobs.getSpoolFilesForJob(zOSMFSession, job);
    for(const jobLog of jobLogs){
        if(jobLog.ddname === "SORTOUT"){
            spoolcontent = await GetJobs.getSpoolContent(zOSMFSession,jobLog);
        }
    }
    expect(spoolcontent).toContain("ALL RECORDS ARE SORTED");

});

    //    test("Retrieve the job logs from CA View", async function () {
    //     let session : Session = await SessionFactory.getSessionByName("caview");
    //     let repository:Repositories = new Repositories(session);
    //     let repositoryList:IRepository[] =  await repository.list();
    //     expect(repositoryList.length).toBeGreaterThan(0);
    //     let repositoryID :number = repositoryList[0].id
        
    //     let reports:Reports = new Reports(session,repositoryID);
    //     let report:IReport[] = await reports.listReports();
    //     expect(report.length).toBeGreaterThan(0);
    //     let reportHandleID :string = report[19].handle; 
    
    //     let responsetxt:IResult = await ViewRestClient.getExpectJSON(session,"/v1/view/rptdata/"+repositoryID+"/"+reportHandleID) as IResult;
    //     let responsestring = "";
    //     for (let reportData of responsetxt.result["Report Data"]) {
    //         responsestring += reportData.data + "\n";
    //      }  
    //     console.log("----JOB LOGS---- \n",responsestring);
    //});
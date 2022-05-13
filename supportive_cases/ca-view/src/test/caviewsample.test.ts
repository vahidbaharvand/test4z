import {Repositories, IRepository, Reports, IReport, ReportContent, ViewRestClient} from "@broadcom/caview-for-zowe-cli";
import { CAViewSessionFactory } from "../main/services/CAViewSessionFactory";
import { CASessionFactory } from "../main/services/CASessionFactory";
import {Session as SessionImp} from "@zowe/imperative"
import {AbstractSession} from "../../node_modules/@broadcom/test4z/node_modules/@zowe/imperative/lib/rest/src/session/AbstractSession";
import {Session} from "../../node_modules/@broadcom/test4z/node_modules/@zowe/imperative/lib/rest/src/session/Session";
import { IResult } from "../main/services/IResult";
import { Profiles, SessionFactory } from "@broadcom/test4z";
import {IJob, SubmitJobs, GetJobs} from "@zowe/zos-jobs-for-zowe-sdk";
import { ICommandDefinition } from "@zowe/imperative";
import { Test4zService,Filter, Operators, Types, QueryOperators, FilterBuilder } from "@broadcom/test4z";
import { listenerCount } from "process";
let TS4ZJB1 = "PTCINCUB.SPITFIRE.JCL(T4ZVIEW)";
 
test("Submit a job through ZOSMF", async function () {

    let zossession : Session = await SessionFactory.getSession(Profiles.zosmf);
    const jobretCode: String = await Test4zService.submitJobViaZOSMF(TS4ZJB1);
    expect(String(jobretCode)).toMatch(/CC 0000|CC 0004/);
    console.log(jobretCode);
    
    //const job: IJob = await SubmitJobs.submitJclNotify(zossession, TS4ZJB1);
    const sess: SessionFactory = await SessionFactory.getSession(Profiles.zosmf);
    const job: IJob = await SubmitJobs.submitJobNotify(sess,TS4ZJB1) 
    console.log("JOB ID:  "+ job.jobid);

    //console.log(await SubmitJobs.submitJobNotify(await SessionFactory.getSession(Profiles.zosmf),"PTCINCUB.SPITFIRE.JCL(T4ZVIEW)"));

    let jobid = console.log("JOB ID: "+job.jobid);
    let jobFile = await GetJobs.getJob(zossession,jobid);
    let output = await GetJobs.getSpoolContent(zossession,jobFile );
    console.log(output);
});

       test("Download Report", async function () {

        let session : SessionImp =  new SessionImp(await CAViewSessionFactory.getSession());
        let repository:Repositories = new Repositories(session);
        let repositoryList:IRepository[] =  await repository.list();
        expect(repositoryList.length).toBeGreaterThan(0);
        let repositoryID :number = repositoryList[0].id
        
        let reports:Reports = new Reports(session,repositoryID);
        let report:IReport[] = await reports.listReports();
        expect(report.length).toBeGreaterThan(0);
        let reportHandleID :string = report[19].handle; 
    
        let responsetxt:IResult = await ViewRestClient.getExpectJSON(session,"/v1/view/rptdata/"+repositoryID+"/"+reportHandleID) as IResult;
        let responsestring = "";
        for (let reportData of responsetxt.result["Report Data"]) {
            responsestring += reportData.data + "\n";
         }  
        console.log("The sorted records are",responsestring);  
        expect(responsestring).toBeHaveTestData;
    });
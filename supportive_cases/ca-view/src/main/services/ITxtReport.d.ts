import {ITxtReportData} from "./ITxtReportData";
export interface ITxtReport {
    id: string;
    rptHandle: string;
    filter: string;
    selNotes: string;
    selXFrm: string;
    smf: string;
    limit: string;
    record: string;
    page: string;
    sessionId: number;
    "Report Data": ITxtReportData[];
}

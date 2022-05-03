import {ITxtReport} from "./Itxtreport";
export interface ITxtReportMain {
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
    "Report Data": ITxtReport[];
}

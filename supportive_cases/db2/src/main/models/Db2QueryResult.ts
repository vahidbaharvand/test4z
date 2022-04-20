//Result model. It contains all the db2 query execution details

export class Db2QueryResult {
    success: boolean | undefined;
    data: any | undefined;

    constructor(success?: boolean, data?: any) {
        this.success = success;
        this.data = data;
    }
}
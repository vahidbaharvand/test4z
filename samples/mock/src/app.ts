import express, { Express, Request, Response } from 'express';
import bodyParser from "body-parser";
import { Test4zService } from "@broadcom/test4z";
import {parseRequest} from "./parser";
const app: Express = express();
const jsonParser = bodyParser.json();

(async () => {
    const basePath: any = await Test4zService.getProfileProp("test4z", "basePath");
    const port: any = await Test4zService.getProfileProp("test4z", "port");

    app.get(basePath + '/*', jsonParser, (req: Request, res: Response) => {

        console.log(req.url)
        //const response = parseRequest(req.url.replace(basePath, ""), JSON.stringify(req.body))
        //res.send(JSON.parse(response));
    });

    app.post(basePath + '/*', jsonParser, (req: Request, res: Response) => {

        console.log(req.url)
        //const response = parseRequest(req.url.replace(basePath, ""), JSON.stringify(req.body))
        //res.send(JSON.parse(response));
    });

    app.put("/zosmf/restjobs/jobs", jsonParser, (req: Request, res: Response) => {
        res.send(JSON.parse("{\"jobid\":\"JOB0000\",\"retcode\":\"CC 0000\",\"jobname\":\"CUSTSEQ\",\"status\":\"OUTPUT\"}"));
    });

    app.get("/zosmf/restjobs/jobs/CUSTSEQ/JOB0000", jsonParser, (req: Request, res: Response) => {
        res.send(JSON.parse("{\"jobid\":\"JOB0000\",\"retcode\":\"CC 0000\",\"jobname\":\"CUSTSEQ\",\"status\":\"OUTPUT\"}"));
    });


    app.listen(port, () => {
        console.log(`⚡️[server]: Server is running at https://localhost:` + port);
    });
})();

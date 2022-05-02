import * as definition from './definition.json'

export function parseRequest(url: any, body: any){
    console.log(body)
    // @ts-ignore
    const data: any = definition.default;
    let result = "UNDEFINED";
    try{
        if (data[url].filter((x: { requestBody: any; }) => x.requestBody == body)){
            return data[url].filter((x: { requestBody: any; }) => x.requestBody == body)[0].responseBody
        }
    } finally{
        return  result;
    }
}

import * as definition from './definition.json'
import * as error from './error.json'

export function parseRequest(url: string, body: string){
    try{
        url = url.replaceAll("/", "")
        const data: any = getData();
        if (data[url].filter((x: { requestBody: any; }) => x.requestBody == body)){
            return data[url].filter((x: { requestBody: any; }) => x.requestBody == body)[0].responseBody
        }
    } catch (e) {
        // @ts-ignore
        return error.default;
    }
}

function getData(){
    const todaysDate = new Date().toISOString().slice(0, 10).replace(/[-]/g, "");
    // @ts-ignore
    let data = JSON.stringify(definition.default);
    return JSON.parse(data.replaceAll("$NTFDTE", todaysDate))
}

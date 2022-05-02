import * as definition from './definition.json'

export function parseRequest(url: string, body: string){
    try{
        url = url.replaceAll("/", "")
        // @ts-ignore
        const data: any = definition.default;
        if (data[url].filter((x: { requestBody: any; }) => x.requestBody == body)){
            return data[url].filter((x: { requestBody: any; }) => x.requestBody == body)[0].responseBody
        }
    } catch (e) {
        return "error";
    }
}

import * as definition from './definition.json'
import * as error from './error.json'

export function parseRequest(url: string, body: string){
    try{
        url = url.replaceAll("/", "")
        console.log(url)
        console.log(body)
        // @ts-ignore
        const data: any = definition.default;
        if (data[url].filter((x: { requestBody: any; }) => x.requestBody == body)){
            return data[url].filter((x: { requestBody: any; }) => x.requestBody == body)[0].responseBody
        }
    } catch (e) {
        "error"
        // @ts-ignore
        return error.default;
    }
}

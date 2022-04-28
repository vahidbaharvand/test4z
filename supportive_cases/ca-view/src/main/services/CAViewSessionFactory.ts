import {ISession} from "@zowe/imperative";
import {SessionFactory}  from "@broadcom/test4z";

export class CAViewSessionFactory{
       public static async getSession(): Promise <ISession> { 
            const _hostname = await SessionFactory.getProfileProp("caview", "host")
            const _protocol = await SessionFactory.getProfileProp("caview", "protocol")
            const _port = await SessionFactory.getProfileProp("caview", "port")
            const _user = await SessionFactory.getProfileProp("caview", "user")
            const _password = await SessionFactory.getProfileProp("caview", "password")
            const _basePath = await SessionFactory.getProfileProp("caview", "basePath")
            const _rejectUnauthorized = await SessionFactory.getProfileProp("caview", "rejectUnauthorized")
                
            const session: ISession = {
            hostname: _hostname ? _hostname : "",
            protocol: _protocol ,
            port: _port ? _port : 0,
            user: _user ? _user : "",
            password: _password ? _password : "",
            basePath: _basePath ? _basePath : "",
            rejectUnauthorized: _rejectUnauthorized? _rejectUnauthorized:false, 
            type:"basic"
            };
            return session;
        }    
}
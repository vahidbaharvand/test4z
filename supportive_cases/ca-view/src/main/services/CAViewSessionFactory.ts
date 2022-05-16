import {SessionFactory}  from "@broadcom/test4z";
import {Session} from "@zowe/imperative";

export class CAViewSessionFactory{
       public static async getSession(): Promise <Session> { 
            return SessionFactory.getSessionByName("caview");
        }    
}
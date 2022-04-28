import {IDB2Session} from "@zowe/db2-for-zowe-cli/lib";
import {ProfileInfo} from "@zowe/imperative";
import { SessionFactory as Test4zSessionFactory }  from "@broadcom/test4z";


export class SessionFactory {
    static profInfo: Promise<ProfileInfo>;

    /**
     * Returns the DB2 profile by reading the information from the zowe config file, under the db2 tag
     */
    public static async getDb2Profile(): Promise<IDB2Session> {
        const _hostname = await Test4zSessionFactory.getProfileProp("db2", "host")
        const _port = await Test4zSessionFactory.getProfileProp("db2", "port")
        const _database = await Test4zSessionFactory.getProfileProp("db2", "database")
        const _user = await Test4zSessionFactory.getProfileProp("db2", "user")
        const _password = await Test4zSessionFactory.getProfileProp("db2", "password")

        const session: IDB2Session = {
            hostname: _hostname ? _hostname : "",
            port: _port ? _port : 0,
            user: _user ? _user : "",
            password: _password ? _password : "",
            database: _database ? _database : "",
        };
        return session;
    }



    /**
     * Get the properties for the given profile
     * @param property: property name
     * @returns any: Returns the value of the property
     */
    public static async getProfileProp(profileName: string, property : any) {
        return await Test4zSessionFactory.getProfileProp(profileName, property)
    }
}

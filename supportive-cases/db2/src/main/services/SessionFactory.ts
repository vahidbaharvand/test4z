import {IDB2Session} from "@zowe/db2-for-zowe-cli/lib";
import {IProfArgAttrs, ProfileInfo, Session,} from "@zowe/imperative";


export class SessionFactory {
    static profInfo: Promise<ProfileInfo>;

    /**
     * Returns the DB2 profile by reading the information from the zowe config file, under the db2 tag
     */
    public static async getDb2Profile(): Promise<IDB2Session> {
        const _hostname = await SessionFactory.getProfileProp("db2", "host")
        const _port = await this.getProfileProp("db2", "port")
        const _database = await this.getProfileProp("db2", "database")
        const _user = await this.getProfileProp("db2", "user")
        const _password = await this.getProfileProp("db2", "password")

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
     * Get the properties for test4z profile
     * @param property: property name
     * @returns any: Returns the value of the property
     */
    public static async getProfileProp(profileName: string, property : any) {
        let val;
        let args = await this.getProfileArgs(profileName);
        args.forEach(arg =>{
            if(arg.argName == property){
                val = arg.argValue;
            }
        })
        return val;
    }

    private static async getProfileArgs(profileName : string): Promise<IProfArgAttrs[]>{
        let profileInfo = await SessionFactory.getProfInfo();
        const defaultProfile = profileInfo.getDefaultProfile(profileName);
        let arg = profileInfo.mergeArgsForProfile(defaultProfile, { getSecureVals: true });
        return arg.knownArgs;
    }

    /**
     * Get the properties of the profile
     * @param profileName: Profile name
     * @returns IProfArgAttrs[]: Returns the properties as the array of arguments
     */
    private static async getProfInfo(): Promise<ProfileInfo>{
        if(!this.profInfo){
            this.profInfo =  this.getProfilePromise();
        }
        return this.profInfo;
    }

    private static async getProfilePromise() : Promise<ProfileInfo>{
        let profInfoOpts = {
            overrideWithEnv: true
        }
        let zoweProf = new ProfileInfo("zowe", profInfoOpts);
        await zoweProf.readProfilesFromDisk();
        return zoweProf;
    }
}

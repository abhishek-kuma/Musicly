import { Client, Account ,ID,Avatars,Databases, Query} from 'appwrite';
import { appWriteUrl, appWriteProjectId,appWriteChatCollectionId,appWriteDatabaseId ,appWriteUsersCollectionId} from './secrets';


class AuthService {
    
    client = new Client();
    
    account;
    
    constructor() {
        this.client
        .setEndpoint(appWriteUrl) // Your API Endpoint
        .setProject(appWriteProjectId) // Your project ID);
        this.account = new Account(this.client);
        
    }
    databases = new Databases(this.client);

    async getAvatar() {
        const avatars = new Avatars(this.client);
        const response = await avatars.getInitials();
        return response;
    }
    

    async signup({ email, password, name }: { email: string, password: string, name: string }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // call another method
                
                console.log("userAccount", userAccount);
                return this.signin({ email, password });

            } else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async signin({ email, password }: { email: string, password: string }) {
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }

        return null;
    }
    async logout() {

        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
    }

    async sendChat({content , senderId , receiverId ,senderName , receiverName}: {content:string , senderId:string , receiverId:string ,senderName:string , receiverName:string}){
        try {
            const chatdocs = await this.databases.createDocument(
                appWriteDatabaseId,
                appWriteChatCollectionId,
                ID.unique(),
                { 
                "content": content,
                "senderid":senderId ,
                "receiverid": receiverId ,
                "sendername": senderName,
                "receivername": receiverName ,
                }
            );

            console.log("Chat is send successfully",chatdocs);
            
        } catch (error) {
            console.log("Appwrite serive :: sendChat :: error", error);
        }
    }

    async getPrevMessages({userid,receiverid}: {userid:string,receiverid:string}){
        try {
            const response = await this.databases.listDocuments(
                appWriteDatabaseId,
                appWriteChatCollectionId,
                [
                    Query.orderDesc('$createdAt'),
                    Query.limit(100),
                    Query.equal("senderid",[userid,receiverid])
                ]
            )
            return response.documents;
            
        } catch (error) {
            console.log("Appwrite serive :: getPrevMessages :: error", error);
        }
    }

    async createUserDocument({userid,username,email}: {userid:string,username:string,email:string}){
        try {
            const response = await this.databases.createDocument(
                appWriteDatabaseId,
                appWriteUsersCollectionId,
                ID.unique(),
                { 
                "userid": userid,
                "username": username,
                "email": email,
                }
            );
            return response;
            
        } catch (error) {
            console.log("Appwrite serive :: createUserDocument :: error", error);
        }
    }

    async getUserDocument(){
        try {
            const response = await this.databases.listDocuments(
                appWriteDatabaseId,
                appWriteUsersCollectionId,
                [
                    Query.orderDesc('$createdAt'),
                    Query.limit(100),
                ]
            )
            console.log("response",response);
            return response.documents;
            
        } catch (error) {
            console.log("Appwrite serive :: getUserDocument :: error", error);
        }
    }

}
const authService = new AuthService();
export default authService;

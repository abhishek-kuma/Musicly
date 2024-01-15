import { Client, Account ,ID,Avatars} from 'appwrite';
import { appWriteUrl, appWriteProjectId } from './secrets';

class AuthService {
    
    client = new Client();
    
    account;

    constructor() {
        this.client
            .setEndpoint(appWriteUrl) // Your API Endpoint
            .setProject(appWriteProjectId) // Your project ID);
        this.account = new Account(this.client);

    }

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
}
const authService = new AuthService();
export default authService;

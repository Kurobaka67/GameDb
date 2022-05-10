import UsersService from "./local/UsersService";
import VideoGameService from "./local/VideoGameService";


export default class LocalServicesFactory {

    getUsersService() {
        return new UsersService();
    }
    getGamesService() {
        return new VideoGameService();
    }
    
}
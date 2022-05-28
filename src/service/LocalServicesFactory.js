import UsersService from "./myAPI/UsersService";
import VideoGameService from "./myAPI/VideoGameService";


export default class LocalServicesFactory {

    getUsersService() {
        return new UsersService();
    }
    getGamesService() {
        return new VideoGameService();
    }
    
}
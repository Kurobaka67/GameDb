import UsersService from "./igdb/UsersService";
import VideoGameService from "./igdb/VideoGameService";


export default class IGDBServicesFactory {
    
    constructor(http){
        this.http = http;
    }

    getUsersService() {
        return new UsersService();
    }
    getGamesService() {
        return new VideoGameService(this.http);
    }
    
}
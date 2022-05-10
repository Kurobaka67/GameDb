import LocalUsersService from "./local/UsersService";
import LocalVideoGameService from "./local/VideoGameService";
import IGDBUsersService from "./igdb/UsersService";
import IGDBVideoGameService from "./igdb/VideoGameService";


export default class ServicesFactory {

    constructor(type, config){
        this.type = type;
        this.config = config;
    }

    setType(type) {
        console.log(this.type);
        this.type = type;
        console.log(this.type);
    }

    getUsersService() {
        switch(this.type){
            case "igdb" : return new IGDBUsersService(this.config.http);
            case "local":
            default: return new LocalUsersService();
        }
        
    }
    getGamesService() {
        switch(this.type){
            case "igdb" : return new IGDBVideoGameService(this.config.http);
            case "local":
            default: return new LocalVideoGameService();
        }
        
    }
    
}
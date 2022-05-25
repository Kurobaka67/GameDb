import LocalUsersService from "./local/UsersService";
import LocalVideoGameService from "./local/VideoGameService";
import LocalPlatformsService from "./local/PlatformsService";
import MyAPIUsersService from "./myAPI/UsersService";
import MyAPIVideoGameService from "./myAPI/VideoGameService";
import MyAPIPlatformsService from "./myAPI/PlatformsService";
import IGDBUsersService from "./igdb/UsersService";
import IGDBVideoGameService from "./igdb/VideoGameService";
import IGDBPlatformsService from "./igdb/PlatformsService";
import RAWGUsersService from "./rawg/UsersService";
import RAWGVideoGameService from "./rawg/VideoGameService";
import RAWGPlatformsService from "./rawg/PlatformsService";


export default class ServicesFactory {

    constructor(type, config){
        this.type = type;
        this.config = config;
    }

    setType(type) {
        this.type = type;
    }

    getUsersService() {
        switch(this.type){
            case "igdb" : return new IGDBUsersService(this.config.http);
            case "rawg" : return new RAWGUsersService(this.config.http);
            case "my api" : return new MyAPIUsersService(this.config.http);
            case "local":
            default: return new LocalUsersService();
        }
    }
    getGamesService() {
        switch(this.type){
            case "igdb" : return new IGDBVideoGameService(this.config.http);
            case "rawg" : return new RAWGVideoGameService(this.config.http);
            case "my api" : return new MyAPIVideoGameService(this.config.http);
            case "local":
            default: return new LocalVideoGameService();
        }
    }
    getPlatformsService() {
        switch(this.type){
            case "igdb" : return new IGDBPlatformsService(this.config.http);
            case "rawg" : return new RAWGPlatformsService(this.config.http);
            case "my api" : return new MyAPIPlatformsService(this.config.http);
            case "local":
            default: return new LocalPlatformsService();
        }
        
    }
    
}
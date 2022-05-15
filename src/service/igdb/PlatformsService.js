//import axios from "axios";

export default class PlatformsService {
	static proxy = "https://cors-anywhere.herokuapp.com/";

	constructor(http){
		this.http = http;
	}

    getPlatforms(pageSize, pageOffset) {
		return this.http({
			method: 'post',
			url: PlatformsService.proxy + 'https://api.igdb.com/v4/platforms',
			headers: {
				'Accept': 'application/json',
				'Client-ID': 'd7kcsn1s16q196slfuxvehvh5ziobh',
				'Authorization': 'Bearer 5hxcw2du9fmde49uwv018wq49wj9gj',
			},
			data: "fields name,created_at,platform_logo,platform_logo.url; limit "+pageSize+"; offset "+pageOffset+";"
		})
		.then(response => {
			const data = response.data.map((d) => { return {
				id: d.id,
				name: d.name,
				image: d.platform_logo?.url?d.platform_logo.url:"https://tse2.mm.bing.net/th?id=OIP.yHrP1XP9nGoetObf102rvwHaFE&pid=Api",
				date: d.created_at
			}});
			return data;
		})
		.catch(err => {
			console.error(err);
		});
	}
	getPlatformsCount() {
		return this.http({
			method: 'post',
			url: PlatformsService.proxy + 'https://api.igdb.com/v4/platforms/count',
			headers: {
				'Accept': 'application/json',
				'Client-ID': 'd7kcsn1s16q196slfuxvehvh5ziobh',
				'Authorization': 'Bearer 5hxcw2du9fmde49uwv018wq49wj9gj',
			}
		})
		.then(response => {
			return response.data.count;
		})
		.catch(err => {
			console.error(err);
		});
	}
	getPlatformById(id) {
		return this.http({
			method: 'post',
			url: PlatformsService.proxy + 'https://api.igdb.com/v4/platforms',
			headers: {
				'Accept': 'application/json',
				'Client-ID': 'd7kcsn1s16q196slfuxvehvh5ziobh',
				'Authorization': 'Bearer 5hxcw2du9fmde49uwv018wq49wj9gj',
			},
			data: "fields name,created_at,platform_logo,platform_logo.url,summary; limit 1; where id = "+id+";"
		})
		.then(response => {
			const data = response.data.map((d) => { return {
				id: d.id,
				name: d.name,
				image: d.platform_logo?.url?d.platform_logo.url:"https://tse2.mm.bing.net/th?id=OIP.yHrP1XP9nGoetObf102rvwHaFE&pid=Api",
				date: d.created_at,
				description: d.summary
			}});
			return data[0];
		})
		.catch(err => {
			console.error(err);
		});
	}
	getLastPlatformsRelease(pageSize) {
		const now = Math.trunc(Date.now()/1000);
		const body = `fields name,created_at,platform_logo,platform_logo.url; where created_at != null & created_at < ${now}; sort created_at desc; limit ${pageSize};`;
		return this.http({
			method: 'post',
			url: PlatformsService.proxy + 'https://api.igdb.com/v4/platforms',
			headers: {
				'Accept': 'application/json',
				'Client-ID': 'd7kcsn1s16q196slfuxvehvh5ziobh',
				'Authorization': 'Bearer 5hxcw2du9fmde49uwv018wq49wj9gj',
			},
			data: body
		})
		.then(response => {
			var data = response.data.map((d) => { return {
				id: d.id,
				name: d.name,
				image: d.platform_logo?.url?d.platform_logo.url:"https://tse2.mm.bing.net/th?id=OIP.yHrP1XP9nGoetObf102rvwHaFE&pid=Api",
				date: d.created_at
			}});
			data.sort((g, h) => {
				const v = new Date(g.date) > new Date(h.date)?-1:1;
				return v;
			});
			data = data.slice(0, 4);
			return data;
		})
		.catch(err => {
			console.error(err);
		});
	}
	savePlatform(platform) {
		return this._getAllGames().then(d => {
			const r = d.filter((g) => g.id == platform.id);
			if(r.length > 0) {
				let g = r[0];
				g.rating = platform.rating;
				g.description = platform.description;
				g.publisher = platform.publisher;
				g.title = platform.title;
				g.genres = platform.genres;
				g.image = platform.image;
				return g;
			} else {
				platform.id = this.nextId();
				PlatformsService._platforms.push(platform);
				return platform;
			}
		});
	}
	searchPlatforms(pageSize, pageOffset, textSearch, rating) {
		const re = textSearch?new RegExp('.*'+this.escapeRegExp(textSearch)+'.*', 'i'):null;
		return this._getAllGames().then(d => {
			const r = d.filter((g) =>{
				return (!re || (re.test(g.title) || re.test(g.genres))) && (!rating || (g.rating > rating))
			});
			return r;
		});
	}
	deletePlatform(game) {
		var index = PlatformsService._games.findIndex(g => g.id == game.id);
		return this._getAllGames().then(d => {
			
			d.splice(index, 1);
		});
	}
	escapeRegExp(string) {
		return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
	}
	nextId() {
		let r = 0;
		PlatformsService._games.map((g) => {
			if(g.id > r){
				r = g.id;
			}
		});
		return ++r;
	}
}
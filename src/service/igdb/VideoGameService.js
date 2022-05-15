//import axios from "axios";

export default class VideoGameService {
	static proxy = "https://cors-anywhere.herokuapp.com/";

	constructor(http){
		this.http = http;
	}

    getGames(pageSize, pageOffset) {
		return this.http({
			method: 'post',
			url: VideoGameService.proxy + 'https://api.igdb.com/v4/games',
			headers: {
				'Accept': 'application/json',
				'Client-ID': 'd7kcsn1s16q196slfuxvehvh5ziobh',
				'Authorization': 'Bearer 5hxcw2du9fmde49uwv018wq49wj9gj',
			},
			data: "fields name,platforms.name,aggregated_rating,genres.name,summary,involved_companies.company.name,involved_companies.publisher,release_dates.human,first_release_date,cover.url,status; limit "+pageSize+"; offset "+pageOffset+";"
		})
		.then(response => {
			const data = response.data.map((d) => { return {
				id: d.id,
				title: d.name,
				image: d.cover?.url?d.cover.url:"https://tse2.mm.bing.net/th?id=OIP.yHrP1XP9nGoetObf102rvwHaFE&pid=Api",
				genres: d.genres?.map((g) => g.name),
				platforms: d.platforms?.map((p) => p.name),
				rating: d.aggregated_rating,
				description: d.summary,
				publisher: d.involved_companies?.filter((c) => c.publisher).map((c) => c.company.name).join(', '),
				release: d.first_release_date,
				status: d.status == 0?"AVAILABLE":"NONAVAILABLE"
			}});
			return data;
		})
		.catch(err => {
			console.error(err);
		});
	}
	getGamesCount(text) {
		if(text){
			return this.http({
				method: 'post',
				url: VideoGameService.proxy + 'https://api.igdb.com/v4/games/count',
				headers: {
					'Accept': 'application/json',
					'Client-ID': 'd7kcsn1s16q196slfuxvehvh5ziobh',
					'Authorization': 'Bearer 5hxcw2du9fmde49uwv018wq49wj9gj',
				},
				data: `search "${text}"`
			})
			.then(response => {
				return response.data.count;
			})
			.catch(err => {
				console.error(err);
			});
		}else {
			return this.http({
				method: 'post',
				url: VideoGameService.proxy + 'https://api.igdb.com/v4/games/count',
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
	}
	getGameById(id) {
		return this.http({
			method: 'post',
			url: VideoGameService.proxy + 'https://api.igdb.com/v4/games',
			headers: {
				'Accept': 'application/json',
				'Client-ID': 'd7kcsn1s16q196slfuxvehvh5ziobh',
				'Authorization': 'Bearer 5hxcw2du9fmde49uwv018wq49wj9gj',
			},
			data: "fields name,platforms.name,aggregated_rating,genres.name,summary,involved_companies.company.name,involved_companies.publisher,release_dates.human,first_release_date,cover.url,status; limit 1; where id = "+id+";"
		})
		.then(response => {
			const data = response.data.map((d) => { return {
				id: d.id,
				title: d.name,
				image: d.cover?.url,
				genres: d.genres?.map((g) => g.name),
				platforms: d.platforms?.map((p) => p.name),
				rating: d.aggregated_rating,
				description: d.summary,
				publisher: d.involved_companies?.filter((c) => c.publisher).map((c) => c.company.name).join(', '),
				release: d.first_release_date*1000,
				status: d.status == 0?"AVAILABLE":"NONAVAILABLE"
			}});
			return data[0];
		})
		.catch(err => {
			console.error(err);
		});
	}
	getLastGamesRelease(pageSize) {
		const now = Math.trunc(Date.now()/1000);
		const body = `fields name,platforms.name,aggregated_rating,genres.name,summary,involved_companies.company.name,involved_companies.publisher,release_dates.human,first_release_date,cover.url,status; where first_release_date != null & first_release_date < ${now}; sort first_release_date desc; limit ${pageSize};`;
		return this.http({
			method: 'post',
			url: VideoGameService.proxy + 'https://api.igdb.com/v4/games',
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
				title: d.name,
				image: d.cover?.url?d.cover.url:"https://tse2.mm.bing.net/th?id=OIP.yHrP1XP9nGoetObf102rvwHaFE&pid=Api",
				genres: d.genres?.map((g) => g.name),
				platforms: d.platforms?.map((p) => p.name),
				rating: d.aggregated_rating,
				description: d.summary,
				publisher: d.involved_companies?.filter((c) => c.publisher).map((c) => c.company.name).join(', '),
				release: d.human,
				status: d.status == 0?"AVAILABLE":"NONAVAILABLE"
			}});
			data.sort((g, h) => {
				const v = new Date(g.release) > new Date(h.release)?-1:1;
				return v;
			});
			data = data.slice(0, 4);
			return data;
		})
		.catch(err => {
			console.error(err);
		});
	}
	saveGame(game) {
		return this._getAllGames().then(d => {
			const r = d.filter((g) => g.id == game.id);
			if(r.length > 0) {
				let g = r[0];
				g.rating = game.rating;
				g.description = game.description;
				g.publisher = game.publisher;
				g.title = game.title;
				g.genres = game.genres;
				g.image = game.image;
				return g;
			} else {
				game.id = this.nextId();
				VideoGameService._games.push(game);
				return game;
			}
		});
	}
	searchGames(pageSize, pageOffset, textSearch) {
		//const re = textSearch?new RegExp('.*'+this.escapeRegExp(textSearch)+'.*', 'i'):null;
		return this.http({
			method: 'post',
			url: VideoGameService.proxy + 'https://api.igdb.com/v4/games',
			headers: {
				'Accept': 'application/json',
				'Client-ID': 'd7kcsn1s16q196slfuxvehvh5ziobh',
				'Authorization': 'Bearer 5hxcw2du9fmde49uwv018wq49wj9gj',
			},
			data: `fields name,platforms.name,aggregated_rating,genres.name,summary,involved_companies.company.name,involved_companies.publisher,release_dates.human,first_release_date,cover.url,status; search "${textSearch}"; limit ${pageSize}; offset ${pageOffset};`
		})
		.then(response => {
			var data = response.data.map((d) => { return {
				id: d.id,
				title: d.name,
				image: d.cover?.url?d.cover.url:"https://tse2.mm.bing.net/th?id=OIP.yHrP1XP9nGoetObf102rvwHaFE&pid=Api",
				genres: d.genres?.map((g) => g.name),
				platforms: d.platforms?.map((p) => p.name),
				rating: d.aggregated_rating,
				description: d.summary,
				publisher: d.involved_companies?.filter((c) => c.publisher).map((c) => c.company.name).join(', '),
				release: d.first_release_date,
				status: d.status == 0?"AVAILABLE":"NONAVAILABLE"
			}});
			return data;
		})
		.catch(err => {
			console.error(err);
		});
	}
	deleteGame(game) {
		var index = VideoGameService._games.findIndex(g => g.id == game.id);
		return this._getAllGames().then(d => {
			
			d.splice(index, 1);
		});
	}
	escapeRegExp(string) {
		return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
	}
	nextId() {
		let r = 0;
		VideoGameService._games.map((g) => {
			if(g.id > r){
				r = g.id;
			}
		});
		return ++r;
	}
}
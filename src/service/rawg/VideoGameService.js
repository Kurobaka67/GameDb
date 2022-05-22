//import axios from "axios";

export default class VideoGameService {

	constructor(http){
		this.http = http;
	}

    getGames(pageSize, pageOffset) {
		return this.http({
			method: 'get',
			url: `https://rawg.io/api/games?key=d511caa2f28d4c31a40efcfce5d9a5d9&page_size=${pageSize}&page=${pageOffset/9+1}`
		})
		.then(response => {
			const data = response.data.results.map((d) => { return {
				id: d.id,
				title: d.name,
				image: d.background_image?d.background_image:"https://tse2.mm.bing.net/th?id=OIP.yHrP1XP9nGoetObf102rvwHaFE&pid=Api",
				genres: d.genres?.map((g) => g.name),
				platforms: d.platforms?.map((p) => p.platform.name),
				rating: d.metacritic,
				publisher: d.publishers?.map((p) => p.name).join(', '),
				release: d.released,
				//status: d.status == 0?"AVAILABLE":"NONAVAILABLE"
			}});
			console.log(data);
			return data;
		})
		.catch(err => {
			console.error(err);
		});
	}
	getGamesCount(text) {
		if(text){
			return this.http({
				method: 'get',
				url: `https://rawg.io/api/games?key=d511caa2f28d4c31a40efcfce5d9a5d9&search=${text}`
			})
			.then(response => {
				return response.data.count;
			})
			.catch(err => {
				console.error(err);
			});
		}else {
			return this.http({
				method: 'get',
				url: 'https://rawg.io/api/games?key=d511caa2f28d4c31a40efcfce5d9a5d9'
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
			method: 'get',
			url: `https://rawg.io/api/games/${id}?key=d511caa2f28d4c31a40efcfce5d9a5d9`
		})
		.then(response => {
			return {
				id: response.data.id,
				title: response.data.name,
				image: response.data.background_image?response.data.background_image:"https://tse2.mm.bing.net/th?id=OIP.yHrP1XP9nGoetObf102rvwHaFE&pid=Api",
				genres: response.data.genres?.map((g) => g.name),
				platforms: response.data.platforms?.map((p) => p.platform.name),
				rating: response.data.metacritic,
				description: response.data.description_raw,
				publisher: response.data.publishers?.map((p) => p.name).join(', '),
				release: response.data.released,
				//status: d.status == 0?"AVAILABLE":"NONAVAILABLE"
			}
		})
		.catch(err => {
			console.error(err);
		});
	}
	getLastGamesRelease(pageSize) {
		return this.http({
			method: 'get',
			url: `https://rawg.io/api/games?key=d511caa2f28d4c31a40efcfce5d9a5d9&page_size=${pageSize}&ordering=-released`
		})
		.then(response => {
			var data = response.data.results.map((d) => { return {
				id: d.id,
				title: d.name,
				image: d.background_image?d.background_image:"https://tse2.mm.bing.net/th?id=OIP.yHrP1XP9nGoetObf102rvwHaFE&pid=Api",
				genres: d.genres?.map((g) => g.name),
				platforms: d.platforms?.map((p) => p.platform.name),
				rating: d.metacritic,
				publisher: d.publishers?.map((p) => p.name).join(', '),
				release: d.released,
				//status: d.status == 0?"AVAILABLE":"NONAVAILABLE"
			}});
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
			method: 'get',
			url: `https://rawg.io/api/games?key=d511caa2f28d4c31a40efcfce5d9a5d9&page_size=${pageSize}&page=${pageOffset/9+1}&search=${textSearch}`
		})
		.then(response => {
			var data = response.data.results.map((d) => { return {
				id: d.id,
				title: d.name,
				image: d.background_image?d.background_image:"https://tse2.mm.bing.net/th?id=OIP.yHrP1XP9nGoetObf102rvwHaFE&pid=Api",
				genres: d.genres?.map((g) => g.name),
				platforms: d.platforms?.map((p) => p.platform.name),
				rating: d.metacritic,
				description: d.description_raw,
				publisher: d.publishers?.map((p) => p.name).join(', '),
				release: d.released,
				//status: d.status == 0?"AVAILABLE":"NONAVAILABLE"
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
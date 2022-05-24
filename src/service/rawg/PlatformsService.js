//import axios from "axios";

export default class PlatformsService {

	constructor(http){
		this.http = http;
	}

    getPlatforms(pageSize, pageOffset) {
		return this.http({
			method: 'get',
			url: `https://rawg.io/api/platforms?key=d511caa2f28d4c31a40efcfce5d9a5d9&page_size=${pageSize}&page=${pageOffset/9+1}`
		})
		.then(response => {
			const data = response.data.results.map((d) => { return {
				id: d.id,
				name: d.name,
				image: d.image_background?d.image_background:"https://tse2.mm.bing.net/th?id=OIP.yHrP1XP9nGoetObf102rvwHaFE&pid=Api",
				date: d.year_start
			}});
			return data;
		})
		.catch(err => {
			console.error(err);
		});
	}
	getPlatformsCount() {
		return this.http({
			method: 'get',
			url: `https://rawg.io/api/platforms?key=d511caa2f28d4c31a40efcfce5d9a5d9`
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
			method: 'get',
			url: `https://rawg.io/api/platforms/${id}?key=d511caa2f28d4c31a40efcfce5d9a5d9`
		})
		.then(response => {
			return {
				id: response.data.id,
				name: response.data.name,
				image: response.data.image_background?response.data.image_background:"https://tse2.mm.bing.net/th?id=OIP.yHrP1XP9nGoetObf102rvwHaFE&pid=Api",
				date: response.data.year_start,
				description: response.data.description
		}})
		.catch(err => {
			console.error(err);
		});
	}
	getLastPlatformsRelease(pageSize) {
		return this.http({
			method: 'get',
			url: `https://rawg.io/api/platforms?key=d511caa2f28d4c31a40efcfce5d9a5d9&page_size=${pageSize}&ordering=-year_start`
		})
		.then(response => {
			var data = response.data.results.map((d) => { return {
				id: d.id,
				name: d.name,
				image: d.image_background?d.image_background:"https://tse2.mm.bing.net/th?id=OIP.yHrP1XP9nGoetObf102rvwHaFE&pid=Api",
				date: +d.year_start
			}});
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
				g.name = platform.name;
				g.image = platform.image;
				g.date = platform.date;
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
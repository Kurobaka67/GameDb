export default class VideoGameService {
	static _games = null;

	constructor(http){
		this.http = http;
	}

    _getAllGames() {
		if(VideoGameService._games == null) {
			return fetch('data/games.json').then(res => res.json()).then(d => {
				VideoGameService._games = d;
				return [...VideoGameService._games];
			});
		} else {
			return new Promise((resolve) => {
				resolve([...VideoGameService._games]);
			});
		}
	}
    getGames(pageSize, pageOffset) {
		return this.http({
			method: 'get',
			url: `http://localhost:3000/games?limit=${pageSize}&skip=${pageOffset}`
		})
		.then(response => {
			const data = response.data.map((d) => { return {
				id: d._id,
				title: d.title,
				image: d.image?d.image:"https://tse2.mm.bing.net/th?id=OIP.yHrP1XP9nGoetObf102rvwHaFE&pid=Api",
				genres: d.genres,
				platforms: d.platforms,
				rating: d.rating,
				description: d.description,
				publisher: d.publisher,
				release: d.release,
				status: d.status == 0?"AVAILABLE":"NONAVAILABLE"
			}});
			return data;
		})
		.catch(err => {
			console.error(err);
		});
	}
	getGameById(id) {
		return this.http({
			method: 'get',
			url: `http://localhost:3000/games/${id}`
		})
		.then(response => {
			return {
				id: response.data._id,
				title: response.data.title,
				image: response.data.image?response.data.image:"https://tse2.mm.bing.net/th?id=OIP.yHrP1XP9nGoetObf102rvwHaFE&pid=Api",
				genres: response.data.genres,
				platforms: response.data.platforms,
				rating: response.data.rating,
				description: response.data.description,
				publisher: response.data.publisher,
				release: response.data.release,
				status: response.data.status == 0?"AVAILABLE":"NONAVAILABLE"
			}
		})
		.catch(err => {
			console.error(err);
		});
	}
	getGamesCount() {
		return this._getAllGames().then(d => d.length);
	}
	getLastGamesRelease() {
		return this._getAllGames().then(d => {
			d.sort((g, h) => {
				const v = new Date(g.release) > new Date(h.release)?-1:1;
				return v;
			});
			d = d.slice(0, 4);
			return d;
		});
	}
	saveGame(game) {
		return this.http({
			method: 'put',
			url: `http://localhost:3000/games/${game.id}`,
			headers: {
				'Content-Type': 'application/json',
			},
			data: `{"title": "${game.title}", "image": "${game.image}", "rating": ${game.rating}, "release": "${game.release}", "platforms": ["${game.platforms.join("\",\"")}"], "description": "${game.description}", "publisher": "${game.publisher}", "genres": ["${game.genres.join("\",\"")}"], "status": "${game.status}"}`
		})
		.then(response => {
			return response
		})
		.catch(err => {
			console.error(err);
		});
	}
	searchGames(pageSize, pageOffset, textSearch, rating) {
		console.log(pageSize, pageOffset);
		const re = textSearch?new RegExp('.*'+this.escapeRegExp(textSearch)+'.*', 'i'):null;
		return this._getAllGames().then(d => {
			const r = d.filter((g) =>{
				return (!re || (re.test(g.title) || re.test(g.genres))) && (!rating || (g.rating > rating))
			});
			return r;
		});
	}
	deleteGame(game) {
		var index = VideoGameService._games.findIndex(g => g.id == game.id);
		console.log(index);
		return this._getAllGames().then(d => {
			d.splice(index, 1);
			VideoGameService._games = d;
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
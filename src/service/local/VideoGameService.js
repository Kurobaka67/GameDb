export default class VideoGameService {
	static _games = null;

    _getAllGames() {
		if(VideoGameService._games == null) {
			return fetch('data/games.json').then(res => res.json()).then(d => {
				VideoGameService._games = d.data;
				return [...VideoGameService._games];
			});
		} else {
			return new Promise((resolve) => {
				resolve([...VideoGameService._games]);
			});
		}
	}
    getGames() {
		return this._getAllGames();
	}
	getGameById(id) {
		return this._getAllGames().then(d => {
			const r = d.filter((g) => g.id == id);
			if(r.length > 0) {
				return r[0];
			} else {
				return null;
			}
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
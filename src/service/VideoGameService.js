export default class VideoGameService {
	static _games = null;

    _getAllGames() {
		if(VideoGameService._games == null) {
			return fetch('data/games.json').then(res => res.json()).then(d => {
				VideoGameService._games = d.data;
				return VideoGameService._games;
			});
		} else {
			return new Promise((resolve) => {
				resolve(VideoGameService._games);
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
				VideoGameService._games.push(game);
				return game;
			}
		});
	}
	searchGames(textSearch, rating) {
		const re = textSearch?new RegExp('.*'+this.escapeRegExp(textSearch)+'.*', 'i'):null;
		return this._getAllGames().then(d => {
			const r = d.filter((g) =>{
				return (!re || (re.test(g.title) || re.test(g.genres))) && (!rating || (g.rating > rating))
			});
			return r;
		});
	}
	escapeRegExp(string) {
		return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
	}
}
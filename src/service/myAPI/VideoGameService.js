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
				image: d.image,
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
				image: response.data.image,
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
		return this.http({
			method: 'get',
			url: `http://localhost:3000/games/count`
		})
		.then(response => {
			return response.data;
		})
		.catch(err => {
			console.error(err);
		});
	}
	getLastGamesRelease() {
		return this.http({
			method: 'get',
			url: `http://localhost:3000/games?sortedBy=release|-1&limit=4`
		})
		.then(response => {
			const data = response.data.map((d) => { return {
				id: d._id,
				title: d.title,
				image: d.image,
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
	createGame(game) {
		return this.http({
			method: 'post',
			url: `http://localhost:3000/games`,
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
		return this.http({
			method: 'get',
			url: `http://localhost:3000/games?title=${textSearch}&rating=${rating}&limit=${pageSize}&skip=${pageOffset}`
		})
		.then(response => {
			const data = response.data.map((d) => { return {
				id: d._id,
				title: d.title,
				image: d.image,
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
	deleteGame(game) {
		return this.http({
			method: 'delete',
			url: `http://localhost:3000/games/${game.id}`
		})
		.then(response => {
			return response
		})
		.catch(err => {
			console.error(err);
		});
	}
}
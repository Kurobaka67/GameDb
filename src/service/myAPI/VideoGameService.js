import UsersService from "./UsersService";

export default class VideoGameService {

	constructor(http){
		this.http = http;
	}

    getGames(pageSize, pageOffset) {
		return this.http({
			method: 'get',
			url: `http://localhost:3000/api/v1/games?limit=${pageSize}&skip=${pageOffset}`
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
			url: `http://localhost:3000/api/v1/games/${id}`
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
			url: `http://localhost:3000/api/v1/games/count`
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
			url: `http://localhost:3000/api/v1/games?sortedBy=release|-1&limit=4`,
			withCredentials: true
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
		const _currentUser = UsersService.getCurrentUser();
		if(_currentUser){
			return this.http({
				method: 'put',
				url: `http://localhost:3000/api/v1/games/${game.id}`,
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${_currentUser.key}`
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
		else{
			return new Promise(function(myResolve) {
				myResolve(); 
			});
		}
	}
	createGame(game) {
		const _currentUser = UsersService.getCurrentUser();
		if(_currentUser){
			return this.http({
				method: 'post',
				url: `http://localhost:3000/api/v1/games`,
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${_currentUser.key}`
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
		else{
			return new Promise(function(myResolve) {
				myResolve(); 
			});
		}
	}
	searchGames(pageSize, pageOffset, textSearch, rating) {
		return this.http({
			method: 'get',
			url: `http://localhost:3000/api/v1/games?title=${textSearch}&rating=${rating}&limit=${pageSize}&skip=${pageOffset}`
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
		const _currentUser = UsersService.getCurrentUser();
		if(_currentUser){
			return this.http({
				method: 'delete',
				url: `http://localhost:3000/api/v1/games/${game.id}`,
				headers: {
					'Authorization': `Bearer ${_currentUser.key}`
				},
				withCredentials: true
			})
			.then(response => {
				return response;
			})
			.catch(err => {
				console.error(err);
			});
		}
		else{
			return new Promise(function(myResolve) {
				myResolve(); 
			});
		}
	}
}
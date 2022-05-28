
export default class PlatformsService {

	constructor(http){
		this.http = http;
	}

    getPlatforms(pageSize, pageOffset) {
		return this.http({
			method: 'get',
			url: `http://localhost:3000/api/v1/platforms?limit=${pageSize}&skip=${pageOffset}`
		})
		.then(response => {
			const data = response.data.map((d) => { return {
				id: d._id,
				name: d.name,
				image: d.image,
				date: d.date,
				description: d.description
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
			url: `http://localhost:3000/api/v1/platforms/count`
		})
		.then(response => {
			return response.data;
		})
		.catch(err => {
			console.error(err);
		});
	}
	getPlatformById(id) {
		return this.http({
			method: 'get',
			url: `http://localhost:3000/api/v1/platforms/${id}`
		})
		.then(response => {
			return {
				id: response.data._id,
				name: response.data.name,
				image: response.data.image,
				date: response.data.date,
				description: response.data.description
			}
		})
		.catch(err => {
			console.error(err);
		});
	}
	getLastPlatformsRelease() {
		return this.http({
			method: 'get',
			url: `http://localhost:3000/api/v1/platforms?sortedBy=release|-1&limit=4`
		})
		.then(response => {
			const data = response.data.map((d) => { return {
				id: d._id,
				name: d.name,
				image: d.image,
				date: d.date,
				description: d.description
			}});
			return data;
		})
		.catch(err => {
			console.error(err);
		});
	}
	savePlatform(platform) {
		return this.http({
			method: 'put',
			url: `http://localhost:3000/api/v1/platforms/${platform.id}`,
			headers: {
				'Content-Type': 'application/json',
			},
			data: `{"name": "${platform.name}", "image": "${platform.image}", "date": "${platform.date}", "description": "${platform.description}"}`
		})
		.then(response => {
			return response
		})
		.catch(err => {
			console.error(err);
		});
	}
	createPlatform(platform) {
		return this.http({
			method: 'post',
			url: `http://localhost:3000/api/v1/platforms`,
			headers: {
				'Content-Type': 'application/json',
			},
			data: `{"name": "${platform.name}", "image": "${platform.image}", "date": "${platform.date}", "description": "${platform.description}"}`
		})
		.then(response => {
			return response
		})
		.catch(err => {
			console.error(err);
		});
	}
	searchPlatforms(pageSize, pageOffset, textSearch) {
		return this.http({
			method: 'get',
			url: `http://localhost:3000/api/v1/platforms?name=${textSearch}&limit=${pageSize}&skip=${pageOffset}`
		})
		.then(response => {
			const data = response.data.map((d) => { return {
				id: d._id,
				name: d.name,
				image: d.image,
				date: d.date,
				description: d.description
			}});
			return data;
		})
		.catch(err => {
			console.error(err);
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
		PlatformsService._platforms.map((p) => {
			if(p.id > r){
				r = p.id;
			}
		});
		return ++r;
	}
}
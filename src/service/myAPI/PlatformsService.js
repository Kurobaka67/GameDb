import UsersService from "./UsersService";

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
		const _currentUser = UsersService.getCurrentUser();
		if(_currentUser){
			return this.http({
				method: 'put',
				url: `http://localhost:3000/api/v1/platforms/${platform.id}`,
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${_currentUser.key}`
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
		else{
			return new Promise(function(myResolve) {
				myResolve(); 
			});
		}
	}
	createPlatform(platform) {
		const _currentUser = UsersService.getCurrentUser();
		if(_currentUser){
			return this.http({
				method: 'post',
				url: `http://localhost:3000/api/v1/platforms`,
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${_currentUser.key}`
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
		else{
			return new Promise(function(myResolve) {
				myResolve(); 
			});
		}
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
	deletePlatform(platform) {
		const _currentUser = UsersService.getCurrentUser();
		if(_currentUser){
			return this.http({
				method: 'delete',
				url: `http://localhost:3000/api/v1/platforms/${platform.id}`,
				headers: {
					'Authorization': `Bearer ${_currentUser.key}`
				}
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
}
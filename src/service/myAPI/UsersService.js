export default class UsersService {
    static _currentUser = JSON.parse(sessionStorage.getItem('user'));

	constructor(http){
		this.http = http;
	}

    getUsers() {
		if(UsersService._currentUser){
			return this.http({
				method: 'get',
				url: `http://localhost:3000/api/v1/users`,
				headers: {
					'Authorization': `Bearer ${UsersService._currentUser.key}`
				}
			})
			.then(response => {
				const data = response.data.map((d) => { return {
					id: d._id,
					identifiant: d.identifiant,
					email: d.email,
					password: d.password,
					role: d.role,
					icon: d.icon
				}});
				return data;
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
	getUser(id){
		if(UsersService._currentUser){
			return this.http({
				method: 'get',
				url: `http://localhost:3000/api/v1/users/${id}`,
				headers: {
					'Authorization': `Bearer ${UsersService._currentUser.key}`
				}
			})
			.then(response => {
				const data = response.data;
				return data;
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
	login(email, password) {
		const auth = btoa(email + ":" + password);
		return this.http({
			method: 'post',
			url: `http://localhost:3000/api/v1/users/login`,
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Basic '+auth
			},
			data: `{ "email": "${email}", "password": "${password}"}`,
			withCredentials: true
		})
		.then(response => {
			UsersService._currentUser = response.data;
			return response.data;
		})
		.catch(err => {
			console.error(err);
		});
	}
	signon(user) {
		return this.http({
			method: 'post',
			url: `http://localhost:3000/api/v1/users`,
			headers: {
				'Content-Type': 'application/json'
			},
			data: `{ "identifiant": "${user.identifiant}", "email": "${user.email}", "password": "${user.password}", "role": "${user.role}" }`,
			withCredentials: true
		})
		.then(response => {
			return response;
		})
		.catch(err => {
			console.error(err);
		});
	}
    static getCurrentUser() {
        return UsersService._currentUser;
    }
	saveUser(user){
		console.log(user._id);
		if(UsersService._currentUser){
			return this.http({
				method: 'put',
				url: `http://localhost:3000/api/v1/users/${user._id}`,
				headers: {
					'Authorization': `Bearer ${UsersService._currentUser.key}`
				},
				data: user
			})
			.then(response => {
				return response.data;
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
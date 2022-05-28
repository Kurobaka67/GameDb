export default class UsersService {
    static _currentUser = null;

	constructor(http){
		this.http = http;
	}

    getUsers() {
		return this.http({
			method: 'get',
			url: `http://localhost:3000/api/v1/users`
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
    static getCurrentUser() {
        return UsersService._currentUser;
    }

}
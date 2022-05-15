export default class UsersService {
	static _users = null;
    static _currentUser = null;

    _getAllUsers() {
		if(UsersService._users == null) {
			return fetch('data/users.json').then(res => res.json()).then(d => {
				UsersService._users = d.data;
				return [...UsersService._users];
			});
		} else {
			return new Promise((resolve) => {
				resolve([...UsersService._users]);
			});
		}
	}
    getUsers() {
		return this._getAllUsers();
	}
	login(email, password) {
        const sha256 = require("js-sha256").sha256;
        const v = sha256(password);
		return this._getAllUsers().then(d => {
			const r = d.filter((u) => {
                return (u.email == email) && (u.password.toUpperCase() == v.toUpperCase());
            });
			if(r.length > 0) {
                UsersService._currentUser = r[0];
				return r[0];
			} else {
				return null;
			}
		});
	}
    getCurrentUser() {
        return UsersService._currentUser;
    }

}

export default class PlatformsService {
	static _platforms = null;

	_getAllPlatforms() {
		if(PlatformsService._platforms == null) {
			return fetch('data/platforms.json').then(res => res.json()).then(d => {
				d.data.forEach((p) => p.image = "https://tse2.mm.bing.net/th?id=OIP.yHrP1XP9nGoetObf102rvwHaFE&pid=Api");
				PlatformsService._platforms = d.data;
				return [...PlatformsService._platforms];
			});
		} else {
			return new Promise((resolve) => {
				resolve([...PlatformsService._platforms]);
			});
		}
	}
    getPlatforms() {
		return this._getAllPlatforms();
	}
	getPlatformsCount() {
		return this._getAllPlatforms().then(d => d.length);
	}
	getPlatformById(id) {
		return this._getAllPlatforms().then(d => {
			const r = d.filter((p) => p.id == id);
			if(r.length > 0) {
				return r[0];
			} else {
				return null;
			}
		});
	}
	getLastPlatformsRelease() {
		return this._getAllPlatforms().then(d => {
			d = d.slice(0, 4);
			return d;
		});
	}
	savePlatform(platform) {
		return this._getAllPlatforms().then(d => {
			const r = d.filter((p) => p.id == platform.id);
			if(r.length > 0) {
				let p = r[0];
				p.description = platform.description;
				p.name = platform.name;
				p.image = platform.image;
				p.date = platform.date;
				return p;
			} else {
				platform.id = this.nextId();
				PlatformsService._platforms.push(platform);
				return platform;
			}
		});
	}
	searchPlatforms(pageSize, pageOffset, textSearch, rating) {
		const re = textSearch?new RegExp('.*'+this.escapeRegExp(textSearch)+'.*', 'i'):null;
		return this._getAllGames().then(d => {
			const r = d.filter((g) =>{
				return (!re || (re.test(g.title) || re.test(g.genres))) && (!rating || (g.rating > rating))
			});
			return r;
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
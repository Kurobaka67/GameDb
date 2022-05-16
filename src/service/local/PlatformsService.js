
export default class PlatformsService {
	static _platforms = null;

	_getAllPlatforms() {
		if(PlatformsService._platforms == null) {
			return fetch('data/platforms.json').then(res => res.json()).then(d => {
				PlatformsService._platforms = d.data;
				PlatformsService._platforms.image = "https://tse2.mm.bing.net/th?id=OIP.yHrP1XP9nGoetObf102rvwHaFE&pid=Api";
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
		return this.http({
			method: 'post',
			url: PlatformsService.proxy + 'https://api.igdb.com/v4/games',
			headers: {
				'Accept': 'application/json',
				'Client-ID': 'd7kcsn1s16q196slfuxvehvh5ziobh',
				'Authorization': 'Bearer 5hxcw2du9fmde49uwv018wq49wj9gj',
			},
			data: "fields name,platforms.name,aggregated_rating,genres.name,summary,involved_companies.company.name,involved_companies.publisher,release_dates.human,first_release_date,cover.url,status; limit 1; where id = "+id+";"
		})
		.then(response => {
			const data = response.data.map((d) => { return {
				id: d.id,
				title: d.name,
				image: d.cover?.url,
				genres: d.genres?.map((g) => g.name),
				platforms: d.platforms?.map((p) => p.name),
				rating: d.aggregated_rating,
				description: d.summary,
				publisher: d.involved_companies?.filter((c) => c.publisher).map((c) => c.company.name).join(', '),
				release: d.first_release_date,
				status: d.status == 0?"AVAILABLE":"NONAVAILABLE"
			}});
			return data[0];
		})
		.catch(err => {
			console.error(err);
		});
	}
	getLastPlatformsRelease() {
		return this._getAllPlatforms().then(d => {
			d = d.slice(0, 4);
			return d;
		});
	}
	savePlatform(platform) {
		return this._getAllGames().then(d => {
			const r = d.filter((g) => g.id == platform.id);
			if(r.length > 0) {
				let g = r[0];
				g.rating = platform.rating;
				g.description = platform.description;
				g.publisher = platform.publisher;
				g.title = platform.title;
				g.genres = platform.genres;
				g.image = platform.image;
				return g;
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
		PlatformsService._games.map((g) => {
			if(g.id > r){
				r = g.id;
			}
		});
		return ++r;
	}
}
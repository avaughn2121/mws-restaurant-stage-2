class IDBHelper {

	constructor(){

		this.dbPromise = idb.open('restaurants-db', 1, upgradeDB => {
			switch(upgradeDB.oldVersion){
			case 0: {
				var restObjStore = upgradeDB.createObjectStore('restaurants', {keyPath: 'id'});
			}
			}
		});
	}


	setRestaurants(restaurants) {
		this.dbPromise.then(db =>{
			let tx = db.transaction('restaurants', 'readwrite');
			let restObjStore = tx.objectStore('restaurants');

			restaurants.forEach(rest => {
				restObjStore.put(rest);
			});
			return tx.complete;
		}).then(function(){
			console.log('Restaurants have been added to objectstore.');
		});
	}

	getRestaurants(){
		return this.dbPromise.then(db =>{
			let tx = db.transaction('restaurants');
			let restObjStore = tx.objectStore('restaurants');

			return restObjStore.getAll();
		}).then(restaurants =>{
			if (!restaurants) console.log('No restaurants found!');

			else  console.log('Restaurants found!');

			return restaurants;
		});
	}

}

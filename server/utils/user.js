// [{
// 	id: '234567',
// 	name: 'Krittin',
// 	room: 'CAPT'
// }]


class Users{
	constructor(){
		this.users = [];
	}

	addUser(id,name,room){
		var user = {id,name,room};
		this.users.push(user);
		return user;
	}
 
	removeUser(id){
		//return user that was removed
		var userRemoved = this.getUser(id);
		if(userRemoved){
			this.users = this.users.filter((user)=>user.id !== id);
		}
		return userRemoved;
	}

	getUser(id){
		//return user using ID
		var users = this.users.filter((user)=>user.id===id);
		return users[0];
	}

	getUserList(room){
		var users = this.users.filter((user)=>user.room === room);
		var namesArray = users.map((user)=> user.name);
		return namesArray;
	}
}


module.exports= {Users};
// var me = new Person ('Krittin',25);
// console.log('this.name', me.name);
// console.log('this.age', me.age);
// console.log(me.getUserDescription());
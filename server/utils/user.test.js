const expect = require('expect');
const {Users} = require('./user.js');

describe('Users',()=>{
	var users;
	beforeEach(()=>{
		users = new Users();
		users.users=[{
			id: '1',
			name: 'Mike',
			room: 'NodeJs'
		},{
			id: '2',
			name: 'Krittin',
			room: 'REST API'
		},{
			id: '3',
			name: 'Nawat',
			room: 'NodeJs'
		}]
	})

	it('should add new user',()=>{
		var users = new Users();
		var user = {
			id: '123',
			name: 'Krittin',
			room: 'CAPT'
		}

		var res = users.addUser(user.id,user.name,user.room);

		expect(users.users).toEqual([user]);
	})

	it('should remove a user',()=>{
		var id = '2';
		expect(users.removeUser(id)).toEqual({
			id: '2',
			name: 'Krittin',
			room: 'REST API'
		});
	})

	it('should not remove a user',()=>{
		var id = '4';
		expect(users.removeUser(id)).toNotExist();
		expect(users.users.length).toBe(3);
	})


	it('should find user',()=>{
		var userId = '2';
		var user = users.getUser(userId);
		expect(user.id).toBe(userId);
	})

	it('should not find user',()=>{
		var userId = '4';
		var user = users.getUser(userId);
		expect(user).toNotExist();
	})

	it('should return name for nodeJs',()=>{
		var userList = users.getUserList('NodeJs');
		expect(userList).toEqual(['Mike','Nawat']);
	});

	it('should return name for REST API',()=>{
		var userList = users.getUserList('REST API');
		expect(userList).toEqual(['Krittin']);
	})


})
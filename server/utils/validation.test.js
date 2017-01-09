const expect = require('expect');
const {isRealString} = require('./validation.js');

describe('isRealString validation',()=>{
	it('should not give error',()=>{
		var params = {
			name: 'Krittin',
			room: 'CSC'
		}

		var resName = isRealString(params.name);
		var resRoom = isRealString(params.room);

		expect(resName).toBe(true);
		expect(resRoom).toBe(true);

	});

	it('should give an error',()=>{
		var params = {
			name: '   ',
			room: '    '
		}

		var resName = isRealString(params.name);
		var resRoom = isRealString(params.room);

		expect(resName).toBe(false);
		expect(resRoom).toBe(false);

	});

	it('should allow string with non-space characters',()=>{
		var params = {
			name: '   #   ',
			room: ' @ '
		}

		var resName = isRealString(params.name);
		var resRoom = isRealString(params.room);

		expect(resName).toBe(true);
		expect(resRoom).toBe(true);

	})
})
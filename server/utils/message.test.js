const expect = require('expect');

var {generateMessage} = require('./message.js');

describe('generateMessage Function',()=>{
	it('should generate correct message object',()=>{
		var res = generateMessage('Krittin','Hi');

		expect(res).toBeA('object');
		expect(res.from).toBe('Krittin');
		expect(res.text).toBe('Hi');
		expect(res.createdAt).toBeA('number');
	})

})
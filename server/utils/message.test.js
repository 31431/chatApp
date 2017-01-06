const expect = require('expect');

var {generateMessage,generateLocationMessage} = require('./message.js');

describe('generateMessage Function',()=>{
	it('should generate correct message object',()=>{
		var res = generateMessage('Krittin','Hi');

		expect(res).toBeA('object');
		expect(res.from).toBe('Krittin');
		expect(res.text).toBe('Hi');
		expect(res.createdAt).toBeA('number');
	})

})

describe('generateLocationMessage',()=>{
	it('should generate correct message object',()=>{
		var lat = 1.3070945;
		var long = 103.7732917;

		var res = generateLocationMessage('GoogleMap',lat,long);

		expect(res).toInclude({
			from: 'GoogleMap',
			url: `https://www.google.com.sg/maps?q=${lat},${long}`,
		});
		expect(res.createdAt).toBeA('number');

	})
})
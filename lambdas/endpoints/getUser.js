const Responses = require('../common/API_Responses');

exports.handler = async event =>{
	console.log('event', event)
	if(!event.pathParameters || !event.pathParameters.ID){
		//Failed without an id
		return Responses._400({message: 'Missing the ID from Path'})
	}
	let ID = event.pathParameters.ID;
	if(data[ID]){
		// Return the data
		console.log("Reference variable in YML")
		return Responses._200(data[ID])
	}
	// failed as ID not in the data
	return Responses._400({message: 'No ID in Data'});
}
const data = {
	1234: {name: 'Johan Alexander', age: 25, job: 'CEO'}
}
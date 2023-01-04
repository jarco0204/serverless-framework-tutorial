const Responses = require('../common/API_Responses');
const Dynamo = require('../common/Dynamo');

const tableName = process.env.tableName

exports.handler = async event =>{
	console.log('event', event)
	if(!event.pathParameters || !event.pathParameters.ID){
		//Failed without an id
		return Responses._400({message: 'Missing the ID from Path'})
	}
	let ID = event.pathParameters.ID;

    const user = await Dynamo.get(ID, tableName).catch(err =>{
        console.log("error in dynamo get", err);
        return null
    })

    if(!user){
        return Responses._400({message: 'Failed to get user by ID'})
    }

    return Responses._200({user})
}
const Responses = require("../common/API_Responses");
const S3 = require("../common/S3");

const bucket = process.env.bucket;

exports.handler = async (event) => {
  console.log("event", event);
  if (!event.pathParameters || !event.pathParameters.fileName) {
    //Failed without an fileName
    return Responses._400({ message: "Missing the fileName from Path" });
  }
  let fileName = event.pathParameters.ID;
  const data = JSON.parse(event.body);

  const newData = await S3.write(data, fileName, bucket).catch((err) => {
    console.log("Error in S3 write", err);
    return null;
  });

  if (!newData) {
    return Responses._400({ message: "Failed to write data by filename" });
  }

  return Responses._200({ newUser });
};

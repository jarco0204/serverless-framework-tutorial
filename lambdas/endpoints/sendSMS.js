const Responses = require("../common/API_Responses");
const AWS = require("aws-sdk");

const SNS = new AWS.SNS({ apiVersion: "2010-03-31" });

exports.handler = async (event) => {
  console.log("event: ", event);

  const body = JSON.parse(event.body);

  if (!body || !body.phoneNumber || !body.message) {
    return Responses._400({ message: "missing information" });
  }

  const AttributeParams = {
    attributes: {
      DefaultSMSType: "Promotional", // There are different types
    },
  };

  const MessageParams = {
    Message: body.message,
    PhoneNumber: body.phoneNumber,
  };

  try {
    await SNS.setSMSAttributes(AttributeParams).promise();
    await SNS.publish(MessageParams).promise();

    return Responses._200({ message: "text delivered by Pipe" });
  } catch (error) {
    console.log("erorr", error);
    return Responses._400({ message: "text failed" });
  }
};

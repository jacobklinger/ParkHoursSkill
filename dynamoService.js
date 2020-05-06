const AWS = require("aws-sdk");

const dynamoService = {};
const table = "ParkHours";

AWS.config.update({
    region: "us-east-1",
    endpoint: "https://dynamodb.us-east-1.amazonaws.com",
});

const client = new AWS.DynamoDB.DocumentClient();

dynamoService.getByDate = async function (date) {
    var params = {
        TableName: table,
        Key: { "Date": date }
    };

    var getRequest = client.get(params);
    data = await getRequest.promise();
    if (data.Item != null) {
        return JSON.parse(data.Item.ParkHours);
    }
    else {
        return {};
    }
}

module.exports = dynamoService;
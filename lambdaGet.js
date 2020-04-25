const AWS = require('aws-sdk');
const dynamoDbClient = new AWS.DynamoDB();

exports.handler = (event, context, callback) => {
    if (!event.requestContext.authorizer) {
        errorResponse('Authorization not configured', context.awsRequestId, callback);
        return;
    }
    const username = event.requestContext.authorizer.claims['cognito:username'];
    const queryInput = createQuery(username);
    console.log("query:'" + queryInput + "' username:'" + username + "'");
    dynamoDbClient.query(queryInput, function (err, data) {
        if (err) {
            errorResponse(err.message, context.awsRequestId, callback);
        } else {
            var datastr = JSON.stringify(data);
            console.log("Query results: " + datastr);
            callback(null, {
                statusCode: 200,
                body: datastr,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
                    'Access-Control-Allow-Headers': 'Origin,Content-Type,Accept'
                },
            });
        }
    });
};

function errorResponse(errorMessage, awsRequestId, callback) {
    callback(null, {
        statusCode: 500,
        body: JSON.stringify({
            Error: errorMessage,
            Reference: awsRequestId,
        }),
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
    });
}

function createQuery(username) {
    return {
        "TableName": "Items",
        "ScanIndexForward": false,
        "ConsistentRead": false,
        "KeyConditionExpression": "#10a92 = :10a92",
        "ProjectionExpression": "#10a90,#10a91",
        "ExpressionAttributeValues": {
            ":10a92": {
                "S": username
            }
        },
        "ExpressionAttributeNames": {
            "#10a90": "Time",
            "#10a91": "Text",
            "#10a92": "User"
        }
    }
}
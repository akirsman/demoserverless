# demoserverless
Simple (as it can be) serverless boilerplate with API Gateway, Lambda, DynamoDB and Cognito.

This project is a boilerplate of a web app based on Serverless Framework. It implements a Cognito user workflow of registration, sign-in and some calls to API Gateway REST API protected by Cognito.

UI is based on Skeleton.

Deployment:

[set some sitebucket's BucketName and s3sync's bucketName in serverless.yml to some unique URL of your choice]
serverless deploy
serverless info --verbose
[fill website/js/config.js with appropriate data]
serverless deploy

Then navigate to the bucket web hosting URL, register, signin etc.

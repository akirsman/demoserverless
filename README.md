# demoserverless
Simple (as it can be) serverless boilerplate with API Gateway, Lambda, DynamoDB and Cognito.

This project is a boilerplate of a web app based on Serverless Framework. It implements a Cognito user workflow of registration, sign-in and some calls to API Gateway REST API protected by Cognito.

UI is based on Skeleton.

Deployment:

1) clone this project
2) install this plugin: _npm i serverless-s3-sync_
3) set sitebucket's BucketName and s3sync's bucketName in serverless.yml to some unique URL of your choice
4) _serverless deploy_
5) _serverless info --verbose_
6) fill website/js/config.js with appropriate data
7) _serverless deploy_

Then navigate to the bucket web hosting URL, register, signin etc.

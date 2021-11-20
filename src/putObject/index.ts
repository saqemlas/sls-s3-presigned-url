import {Context} from 'aws-lambda/handler';
import {APIGatewayProxyEventV2, APIGatewayProxyStructuredResultV2} from 'aws-lambda/trigger/api-gateway-proxy';
import {S3Client, PutObjectCommandInput, PutObjectCommand} from '@aws-sdk/client-s3';
import {getSignedUrl} from '@aws-sdk/s3-request-presigner';
import {v4 as uuid} from 'uuid';

const bucketName: string = process.env.BUCKET_NAME || '';
const bucketKey: string = 'aws-logo2.png';

/// Good practice, never access credentials from env
const client: S3Client = new S3Client({region: process.env.REGION || 'eu-west-1'});

export const handler = async (event: APIGatewayProxyEventV2, context?: Context): Promise<APIGatewayProxyStructuredResultV2> => {
    console.log('Event', {event});
    const {requestContext, headers} = event;

    const getObjectInput: PutObjectCommandInput = {
        Bucket: bucketName,
        Key: bucketKey
    };

    const getObjectCommand: PutObjectCommand = new PutObjectCommand(getObjectInput);

    const url: string = await getSignedUrl(client, getObjectCommand, {expiresIn: 7200});

    return {
        statusCode: 200,
        ...headers,
        body: JSON.stringify({
            id: requestContext.requestId,
            presignedurl: url
        })
    };
};

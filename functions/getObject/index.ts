import {Context} from 'aws-lambda/handler';
import {APIGatewayProxyEventV2, APIGatewayProxyStructuredResultV2} from 'aws-lambda/trigger/api-gateway-proxy';
import {S3Client, GetObjectCommandInput, GetObjectCommand} from '@aws-sdk/client-s3';
import {getSignedUrl} from '@aws-sdk/s3-request-presigner';

const bucketName: string = process.env.BUCKET_NAME || '';
const bucketKey: string = 'aws-logo.png';

/// Good practice, never access credentials from env
const client: S3Client = new S3Client({region: process.env.REGION || 'eu-west-1'});

export const handler = async (event: APIGatewayProxyEventV2, context?: Context): Promise<APIGatewayProxyStructuredResultV2> => {
    console.log('Event', {event});
    const {requestContext, headers} = event;

    const getObjectInput: GetObjectCommandInput = {
        Bucket: bucketName,
        Key: bucketKey
    };

    const getObjectCommand: GetObjectCommand = new GetObjectCommand(getObjectInput);

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

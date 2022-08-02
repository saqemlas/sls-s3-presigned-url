# S3 Bucket Presigned Urls

## Info 

This handles deployment for a http api, integrated lambdas, and s3 bucket.

All objects by default are private. Only the object owner has permission to access specific objects or upload specific objects. However, the object owner can optionally share objects with others by creating a presigned URL, using their own security credentials, to grant time-limited permission to download the objects. Presigned URLs are also useful if you want your user/customer to be able to upload a specific object to your bucket, but you don't require them to have AWS security credentials or permissions.

When you create a presigned URL for your object, you must provide your security credentials, specify a bucket name, an object key, specify the HTTP method (GET to download the object, or PUT for uploading objects) and expiration date and time. The presigned URLs are valid only for the specified duration. That is, you must start the action before the expiration date and time. If the action consists of multiple steps, such as a multipart upload, all steps must be started before the expiration, otherwise you will receive an error when Amazon S3 attempts to start a step with an expired URL.

### Notes

- Anyone with valid security credentials can create a presigned URL. However, in order to successfully access an object, the presigned URL must be created by someone who has permission to perform the operation that the presigned URL is based upon.

- The credentials that you can use to create a presigned URL include:
  - IAM instance profile: Valid up to 6 hours
  - AWS Security Token Service : Valid up to 36 hours when signed with permanent credentials, such as the credentials of the AWS account root user or an IAM user
  - IAM user: Valid up to 7 days when using AWS Signature Version 4. To create a presigned URL that's valid for up to 7 days, first designate IAM user credentials (the access key and secret access key) to the SDK that you're using. Then, generate a presigned URL using AWS Signature Version 4.

- If you created a presigned URL using a temporary token, then the URL expires when the token expires, even if the URL was created with a later expiration time.

- Since presigned URLs grant access to your Amazon S3 buckets to whoever has the URL, we recommend that you protect them appropriately. For more details about protecting presigned URLs, see [Limiting presigned URL capabilities](https://docs.aws.amazon.com/AmazonS3/latest/userguide/using-presigned-url.html#PresignedUrlUploadObject-LimitCapabilities).

For more information...
- [AWS Documentation: S3 Bucket Overview](https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingBucket.html)
- [AWS Documentation: Sharing an object with a presigned URL](https://docs.aws.amazon.com/AmazonS3/latest/userguide/ShareObjectPreSignedURL.html)
- [AWS Documentation: Uploading objects using presigned URLs](https://docs.aws.amazon.com/AmazonS3/latest/userguide/PresignedUrlUploadObject.html)


## Architecture

<p align="center">
  <img src="/architecture-diagram.drawio.svg" />
</p>

## Usage 

### Credentials:
```bash
export AWS_PROFILE=<profile_name>
```

### Install Dependencies:

```bash
yarn run install
```

### Deploy:

```bash
yarn run deploy
```

### Remove:

```bash
yarn run remove
```

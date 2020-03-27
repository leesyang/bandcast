const AWS = require("aws-sdk");
const s3 = new AWS.S3(
    {
        accessKeyId : process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey : process.env.AWS_SECRET_ACCESS_KEY,
        useAccelerateEndpoint: true
    });

const s3params = {
    Bucket: process.env.AWS_BUCKET,
    Expires: 3600,
    ACL: 'bucket-owner-full-control'
}

module.exports = { s3, s3params };
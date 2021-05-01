import { AWS_KEY_ID, AWS_SECRET_KEY, AWS_BUCKET_NAME, AWS_REGION_NAME } from "@env";
import S3 from 'aws-sdk/clients/s3';
import RNFS from 'react-native-fs';
import { decode } from 'base64-arraybuffer';


export const uploadToS3 = (photo, callback) => {
    const file = {
        uri: photo.uri,
        name: photo.name,
        type: photo.type,
    };
    uploadImageOnS3(file, callback);
};

const uploadImageOnS3 = async (file, callback) => {
    const s3bucket = new S3({
        // TODO: FIX IT
        accessKeyId: "AKIA4QHTGTQKCG7DILAW",
        secretAccessKey: AWS_SECRET_KEY,
        Bucket: AWS_BUCKET_NAME,
        region: AWS_REGION_NAME,
        keyPrefix: 'images/',
        signatureVersion: 'v4',
    });
    const base64 = await RNFS.readFile(file.uri, 'base64');
    const arrayBuffer = decode(base64);
    s3bucket.createBucket(() => {
        const params = {
            Bucket: AWS_BUCKET_NAME,
            Key: file.name,
            Body: arrayBuffer,
            ContentDisposition: `inline;filename="${file.name}"`,
            ContentType: file.type,
        };
        s3bucket.upload(params, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                callback(data);
            }
        });
    });
};
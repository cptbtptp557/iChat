import OSS from "ali-oss";
import {uuid} from "../tool/uuid";

export const oss = () => {
    const {getUuid} = uuid();

    const client: OSS = new OSS({
        accessKeyId: 'LTAI5tGxPZ3hn1rbGVuyRdoQ',
        accessKeySecret: '4BIHxXF56YRZCAJTRUvGEgg9G0DtqG',
        region: 'oss-cn-shenzhen',
        bucket: 'ichatimage',
    })

    const getFile = async (event: any) => {
        await client.put(getUuid(10, 16), event.target.files[0])
            .then((result: any): void => {
                console.log('图片上传成功', result);
            }).catch(console.error);
    }

    return {
        getFile,
    }
}
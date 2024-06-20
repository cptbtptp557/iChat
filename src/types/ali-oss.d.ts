declare module 'ali-oss' {
    export default class OSS {
        constructor(options: OSS.Options);

        put(name: string, file: any, options?: OSS.PutOptions): Promise<OSS.PutResult>;
    }

    namespace OSS {
        interface Options {
            accessKeyId: string;
            accessKeySecret: string;
            region: string;
            bucket: string;
        }

        interface PutOptions {
            fileName: string | number;
            file: any;
        }

        interface PutResult {
            url: string;
        }
    }
}
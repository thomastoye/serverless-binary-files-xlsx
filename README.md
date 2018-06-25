# aws-nodejs-typescript-xlsx

Small example demonstrating how to return binary files using the Serverless framework, in this case Excel files.

When testing, you may need to `sls remove` and `sls deploy` again - seems like the changes don't always reach AWS.

## Steps

Want to return binary files in an existing project? Here's how:

* Install `serverless-apigw-binary`

```
$ npm install --save-dev serverless-apigw-binary
```

* Add `serverless-apigw-binary` plugin in `serverless.yml`

```
 plugins:
   - serverless-webpack
+  - serverless-apigw-binary
```

* Add plugin configuration in `serverless.yml`

```
plugins:
  - serverless-webpack
  - ...
  - serverless-apigw-binary

+custom:
+  apigwBinary:
+    types:
+      - '*/*'
```

* Convert your binary file to base64

```
const binary: Buffer = ...;
const output = binary.toString('base64');
```

Or if you're also working with the `xlsx` library, you can write directly to base64:

```
const output = XLSX.write(wb, { type: 'base64', bookType: 'xlsx' });
```


* Set `isBase64Encoded: true` and set the `Content-Type` and `Content-Disposition` headers on the response

```
export const xlsx: Handler = (event: APIGatewayEvent, context: Context, cb: Callback) => {
  const response = {
    statusCode: 200,
    body: output,
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': 'attachment; filename="hello.xlsx"',
    },
    isBase64Encoded: true,
  };

  cb(null, response);
}
```


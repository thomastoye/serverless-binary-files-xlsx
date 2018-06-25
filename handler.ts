import { APIGatewayEvent, Callback, Context, Handler } from 'aws-lambda';
import * as XLSX from 'xlsx';

const data = [
  [ 'Hello', 'World', 'Tell' ],
  [ '1', '2', '3']
];

const wb = XLSX.utils.book_new();

const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(data);

XLSX.utils.book_append_sheet(wb, ws, 'Sheet test');
XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(data), 'Another test');

const output = XLSX.write(wb, { type: 'base64', bookType: 'xlsx' });

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

export const hello: Handler = (event: APIGatewayEvent, context: Context, cb: Callback) => {
  cb(null, {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!',
      input: event,
    }),
  });
}


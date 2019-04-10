export const GraphQLUpload: {
  astNode: any;
  description: string;
  extensionASTNodes: any;
  inspect: Function;
  name: string;
  parseLiteral: Function;
  parseValue: Function;
  serialize: Function;
  toConfig: Function;
  toJSON: Function;
};
export function graphqlUploadExpress(options: any): any;
export function graphqlUploadKoa(options: any): any;
export function processRequest(request: any, response: any, { maxFieldSize = 1000000, maxFileSize = Infinity, maxFiles = Infinity }: any): void;

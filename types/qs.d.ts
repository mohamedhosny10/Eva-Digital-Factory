declare module 'qs' {
  interface IStringifyOptions {
    delimiter?: string;
    strictNullHandling?: boolean;
    skipNulls?: boolean;
    encode?: boolean;
    encodeValuesOnly?: boolean;
    serializeDate?: (date: Date) => string;
    format?: string;
    addQueryPrefix?: boolean;
    allowDots?: boolean;
    charset?: string;
    charsetSentinel?: boolean;
    filter?: Array<string | number> | ((prefix: string, value: any) => any);
    arrayFormat?: 'indices' | 'brackets' | 'repeat' | 'comma';
    indices?: boolean;
    sort?: (a: string, b: string) => number;
    serializeDate?: (date: Date) => string;
    format?: string;
    addQueryPrefix?: boolean;
    allowDots?: boolean;
    charset?: string;
    charsetSentinel?: boolean;
    filter?: Array<string | number> | ((prefix: string, value: any) => any);
    arrayFormat?: 'indices' | 'brackets' | 'repeat' | 'comma';
    indices?: boolean;
    sort?: (a: string, b: string) => number;
  }

  interface IParseOptions {
    delimiter?: string | RegExp;
    depth?: number;
    arrayLimit?: number;
    parseArrays?: boolean;
    allowPrototypes?: boolean;
    plainObjects?: boolean;
    allowDots?: boolean;
    allowPrototypes?: boolean;
    arrayLimit?: number;
    charset?: string;
    charsetSentinel?: boolean;
    comma?: boolean;
    decoder?: (str: string, defaultDecoder: any, charset: string, type: string) => any;
    delimiter?: string | RegExp;
    depth?: number;
    ignoreQueryPrefix?: boolean;
    interpretNumericEntities?: boolean;
    parameterLimit?: number;
    parseArrays?: boolean;
    parseNumbers?: boolean;
    parseBooleans?: boolean;
    plainObjects?: boolean;
    strictNullHandling?: boolean;
  }

  function stringify(obj: any, options?: IStringifyOptions): string;
  function parse(str: string, options?: IParseOptions): any;

  export = {
    stringify,
    parse
  };
}


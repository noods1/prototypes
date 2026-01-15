import * as t from '@babel/types';
import { OutputAsset } from 'rollup';
export interface StencilOutputAsset extends OutputAsset {
    exports?: string[];
    importedBindings?: {
        [key: string]: string[];
    };
    code?: string;
}
declare const TRANS_TAG_NAME = "transTagName";
declare const STENCIL_PROXY_CUSTOMELEMENT_FN_NAME = "proxyCustomElement";
declare const STENCIL_H_FUNCTION_NAME = "h";
declare function createTTNFn(node: t.Expression): t.CallExpression;
declare function createDefaultTTNFn(): t.ExpressionStatement;
declare function camelToDash(str: string): string;
declare function likeComponentName(str: string, components?: Array<string>): boolean;
export { TRANS_TAG_NAME, STENCIL_PROXY_CUSTOMELEMENT_FN_NAME, STENCIL_H_FUNCTION_NAME, createTTNFn, createDefaultTTNFn, camelToDash, likeComponentName, };

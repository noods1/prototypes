import { Plugin } from 'rollup';
interface TransDefineFunctionComponent {
    componentName?: string;
    className?: string;
}
interface StencilTransTagNameOfStencilCustomElementsOptions {
    transDefineFunctionComponents?: Array<TransDefineFunctionComponent>;
}
declare function transTagNameOfStencilCustomElements(options?: StencilTransTagNameOfStencilCustomElementsOptions): Plugin;
export { transTagNameOfStencilCustomElements };

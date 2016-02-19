/// <reference path="../type_definitions/deep-equal.d.ts" />

declare type subprop = (props: Object) => Object;
declare type updateWhenNotDeepEqualDecorator = (subprop?: (string|subprop)) => ClassDecorator;

interface Object extends Object {
    assign(...objs: Object[]): Object;
}

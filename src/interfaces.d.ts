/// <reference path="../type_definitions/deep-equal.d.ts" />

type subprop = (props: Object) => Object;
type updateWhenNotDeepEqualDecorator = (subprop?: string | subprop) => ClassDecorator;

interface Object {
    assign(...objs: Object[]): Object;
}

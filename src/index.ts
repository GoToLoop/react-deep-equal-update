/// <reference path="./interfaces.d.ts"/>

import * as deepEqual from "deep-equal";

export default function updateWhenNotDeepEqual(subprop?: (string|subprop)) {
    return function(target: any) {
        target.prototype.shouldComponentUpdate = function (nextProps: Object) {

            let _nextProps = nextProps;
            let _props = this.props;

            if (typeof subprop !== "undefined") {

                _nextProps = Object.assign({}, nextProps);
                _props = Object.assign({}, this.props);

                if (typeof subprop === "string") {
                    _nextProps = _nextProps[subprop];
                    _props = _props[subprop];
                } else if (typeof subprop === "function") {
                    _nextProps = subprop(_nextProps);
                    _props = subprop(_props);
                }
            }

            return !deepEqual(_nextProps, _props);
        };
        return target;
    };
};

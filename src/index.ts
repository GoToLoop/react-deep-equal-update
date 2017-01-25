/// <reference path="./interfaces.d.ts"/>

import * as deepEqual from 'deep-equal';

export default function updateWhenNotDeepEqual(subprop?: string | subprop, substate?: string | subprop): ClassDecorator {
    return <TFn extends Function>(target: TFn) => {
        target.prototype.shouldComponentUpdate = function (nextProps: Object) {
            let _nextProps = nextProps, _props = this.props;

            if (subprop) {
                _nextProps = Object.assign({}, nextProps);
                _props = Object.assign({}, this.props);

                if (typeof subprop === 'string') {
                    _nextProps = _nextProps[subprop];
                    _props = _props[subprop];
                } else {
                    _nextProps = subprop(_nextProps);
                    _props = subprop(_props);
                }
            }

            return !deepEqual(_nextProps, _props);
        };
    };
}

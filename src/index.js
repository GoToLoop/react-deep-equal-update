var deepEqual = require("deep-equal");
function updateWhenNotDeepEqual(subprop, substate) {
    return function (target) {
        target.prototype.shouldComponentUpdate = function (nextProps) {
            var _nextProps = nextProps;
            var _props = this.props;
            if (typeof subprop !== "undefined") {
                _nextProps = Object.assign({}, nextProps);
                _props = Object.assign({}, this.props);
                if (typeof subprop === "string") {
                    _nextProps = _nextProps[subprop];
                    _props = _props[subprop];
                }
                if (typeof subprop === "function") {
                    _nextProps = subprop(_nextProps);
                    _props = subprop(_props);
                }
            }
            var updateByProps = !deepEqual(_nextProps, _props);
            return updateByProps;
        };
        return target;
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = updateWhenNotDeepEqual;
;

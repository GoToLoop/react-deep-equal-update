var deepEqual = require("deep-equal");
function updateWhenNotDeepEqual(subprop) {
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
                else if (typeof subprop === "function") {
                    _nextProps = subprop(_nextProps);
                    _props = subprop(_props);
                }
            }
            return !deepEqual(_nextProps, _props);
        };
        return target;
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = updateWhenNotDeepEqual;

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var sinon = require("sinon");
var React = require("react");
var index_1 = require("../src/index");
var mockProps = {
    id: 1,
    subprop1: {
        subprop11: {
            subprop111: {
                val: "111"
            },
            subprop112: {
                val: "112"
            }
        },
        subprop12: {
            subprop121: {
                val: "121"
            },
            subprop122: {
                val: "122"
            }
        }
    }
};
describe("@updateWhenNotDeepEqual", function () {
    var sandbox;
    beforeEach(function () {
        sandbox = sinon.sandbox.create();
    });
    afterEach(function () {
        sandbox.restore();
    });
    it("Should implement shouldComponentUpdate", function () {
        var TestComponent = (function (_super) {
            __extends(TestComponent, _super);
            function TestComponent(props) {
                _super.call(this, props);
            }
            TestComponent.prototype.render = function () {
                return (React.createElement("div", null));
            };
            TestComponent = __decorate([
                index_1.default(), 
                __metadata('design:paramtypes', [Object])
            ], TestComponent);
            return TestComponent;
        })(React.Component);
        var component = new TestComponent(mockProps);
        var nextprops = Object.assign({}, mockProps, { id: 2 });
        console.log(component);
    });
    it("Should use sub-properties when type of suprop is a string", function () {
        var TestComponent = (function (_super) {
            __extends(TestComponent, _super);
            function TestComponent(props) {
                _super.call(this, props);
            }
            TestComponent.prototype.render = function () {
                return (React.createElement("div", null));
            };
            TestComponent = __decorate([
                index_1.default("subprop12"), 
                __metadata('design:paramtypes', [Object])
            ], TestComponent);
            return TestComponent;
        })(React.Component);
        var component = new TestComponent(mockProps);
        var nextprops = Object.assign({}, mockProps, { id: 2 });
    });
    it("Should use sub-properties when type of suprop is a function", function () {
        var TestComponent = (function (_super) {
            __extends(TestComponent, _super);
            function TestComponent(props) {
                _super.call(this, props);
            }
            TestComponent.prototype.render = function () {
                return (React.createElement("div", null));
            };
            TestComponent = __decorate([
                index_1.default(function (props) { return props.subprop1.subprop12.subprop121; }), 
                __metadata('design:paramtypes', [Object])
            ], TestComponent);
            return TestComponent;
        })(React.Component);
        var component = new TestComponent(mockProps);
        var nextprops = Object.assign({}, mockProps, { id: 2 });
    });
});

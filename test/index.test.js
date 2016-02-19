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
var jsdom = require("jsdom");
var g = global;
var document = jsdom.jsdom("<!doctype html><html><body></body></html>");
g.document = document;
g.window = document.parentWindow;
var chai_1 = require("chai");
var sinon = require("sinon");
var React = require("react");
var ReactDOM = require("react-dom");
var ReactTestUtils = require("react-addons-test-utils");
var index_1 = require("../src/index");
var mockProps = {
    id: "1",
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
        var ContainerComponent = (function (_super) {
            __extends(ContainerComponent, _super);
            function ContainerComponent(props) {
                _super.call(this, props);
                this.state = mockProps;
            }
            ContainerComponent.prototype.render = function () {
                return (React.createElement("div", null, React.createElement(TestComponent, React.__spread({}, this.state))));
            };
            return ContainerComponent;
        })(React.Component);
        var TestComponent = (function (_super) {
            __extends(TestComponent, _super);
            function TestComponent(props) {
                _super.call(this, props);
            }
            TestComponent.prototype.render = function () {
                return (React.createElement("div", {"id": this.props.id}));
            };
            TestComponent = __decorate([
                index_1.default(), 
                __metadata('design:paramtypes', [Object])
            ], TestComponent);
            return TestComponent;
        })(React.Component);
        var container = ReactTestUtils.renderIntoDocument(React.createElement(ContainerComponent, null));
        var containerNode = ReactDOM.findDOMNode(container);
        var nextprops = Object.assign({}, mockProps, { id: "2" });
        container.setState(nextprops);
        chai_1.expect(containerNode.textContent).eqls("2");
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

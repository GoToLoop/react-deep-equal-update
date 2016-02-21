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
g.document = jsdom.jsdom("<!doctype html><html><body></body></html>");
g.window = document.defaultView;
g.navigator = { userAgent: "node.js" };
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
var mockProps2 = {
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
                val: "121 UPDATED!"
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
    it("Should implement shouldComponentUpdate", function (done) {
        var TestComponent = (function (_super) {
            __extends(TestComponent, _super);
            function TestComponent(props) {
                _super.call(this, props);
            }
            TestComponent.prototype.render = function () {
                return (React.createElement("div", null, React.createElement("div", null, "subprop121: ", this.props.subprop1.subprop12.subprop121.val)));
            };
            TestComponent = __decorate([
                index_1.default(), 
                __metadata('design:paramtypes', [Object])
            ], TestComponent);
            return TestComponent;
        })(React.Component);
        var ContainerComponent = (function (_super) {
            __extends(ContainerComponent, _super);
            function ContainerComponent(props) {
                _super.call(this, props);
                this.state = { value: mockProps };
            }
            ContainerComponent.prototype.render = function () {
                return (React.createElement("div", null, React.createElement(TestComponent, React.__spread({}, this.state.value))));
            };
            return ContainerComponent;
        })(React.Component);
        var container = ReactTestUtils.renderIntoDocument(React.createElement(ContainerComponent, null));
        var testComponent = ReactTestUtils.findRenderedComponentWithType(container, TestComponent);
        var testComponentNode = ReactDOM.findDOMNode(testComponent);
        var renderSpy = sandbox.spy(testComponent, "render");
        var shouldComponentUpdateSpy = sandbox.spy(testComponent, "shouldComponentUpdate");
        chai_1.expect(testComponentNode.textContent).eql("subprop121: 121");
        chai_1.expect(renderSpy.callCount).eql(0);
        chai_1.expect(shouldComponentUpdateSpy.callCount).eql(0);
        container.setState({ value: mockProps2 }, function () {
            chai_1.expect(testComponentNode.textContent).eql("subprop121: 121 UPDATED!");
            chai_1.expect(renderSpy.callCount).eql(1);
            chai_1.expect(shouldComponentUpdateSpy.callCount).eql(1);
        });
        container.setState({ value: mockProps2 }, function () {
            chai_1.expect(testComponentNode.textContent).eql("subprop121: 121 UPDATED!");
            chai_1.expect(renderSpy.callCount).eql(1);
            chai_1.expect(shouldComponentUpdateSpy.callCount).eql(2);
            done();
        });
    });
    it("Should use sub-properties when type of suprop is a string", function (done) {
        var TestComponent = (function (_super) {
            __extends(TestComponent, _super);
            function TestComponent(props) {
                _super.call(this, props);
            }
            TestComponent.prototype.render = function () {
                return (React.createElement("div", null, React.createElement("div", null, "subprop121: ", this.props.subprop1.subprop12.subprop121.val)));
            };
            TestComponent = __decorate([
                index_1.default("subprop1"), 
                __metadata('design:paramtypes', [Object])
            ], TestComponent);
            return TestComponent;
        })(React.Component);
        var ContainerComponent = (function (_super) {
            __extends(ContainerComponent, _super);
            function ContainerComponent(props) {
                _super.call(this, props);
                this.state = { value: mockProps };
            }
            ContainerComponent.prototype.render = function () {
                return (React.createElement("div", null, React.createElement(TestComponent, React.__spread({}, this.state.value))));
            };
            return ContainerComponent;
        })(React.Component);
        var container = ReactTestUtils.renderIntoDocument(React.createElement(ContainerComponent, null));
        var testComponent = ReactTestUtils.findRenderedComponentWithType(container, TestComponent);
        var testComponentNode = ReactDOM.findDOMNode(testComponent);
        var renderSpy = sandbox.spy(testComponent, "render");
        var shouldComponentUpdateSpy = sandbox.spy(testComponent, "shouldComponentUpdate");
        chai_1.expect(testComponentNode.textContent).eql("subprop121: 121");
        chai_1.expect(renderSpy.callCount).eql(0);
        chai_1.expect(shouldComponentUpdateSpy.callCount).eql(0);
        container.setState({ value: mockProps2 }, function () {
            chai_1.expect(testComponentNode.textContent).eql("subprop121: 121 UPDATED!");
            chai_1.expect(renderSpy.callCount).eql(1);
            chai_1.expect(shouldComponentUpdateSpy.callCount).eql(1);
        });
        container.setState({ value: mockProps2 }, function () {
            chai_1.expect(testComponentNode.textContent).eql("subprop121: 121 UPDATED!");
            chai_1.expect(renderSpy.callCount).eql(1);
            chai_1.expect(shouldComponentUpdateSpy.callCount).eql(2);
            done();
        });
    });
    it("Should use sub-properties when type of suprop is a function", function (done) {
        var TestComponent = (function (_super) {
            __extends(TestComponent, _super);
            function TestComponent(props) {
                _super.call(this, props);
            }
            TestComponent.prototype.render = function () {
                return (React.createElement("div", null, React.createElement("div", null, "subprop121: ", this.props.subprop1.subprop12.subprop121.val)));
            };
            TestComponent = __decorate([
                index_1.default(function (props) { return props.subprop1.subprop12.subprop121; }), 
                __metadata('design:paramtypes', [Object])
            ], TestComponent);
            return TestComponent;
        })(React.Component);
        var ContainerComponent = (function (_super) {
            __extends(ContainerComponent, _super);
            function ContainerComponent(props) {
                _super.call(this, props);
                this.state = { value: mockProps };
            }
            ContainerComponent.prototype.render = function () {
                return (React.createElement("div", null, React.createElement(TestComponent, React.__spread({}, this.state.value))));
            };
            return ContainerComponent;
        })(React.Component);
        var container = ReactTestUtils.renderIntoDocument(React.createElement(ContainerComponent, null));
        var testComponent = ReactTestUtils.findRenderedComponentWithType(container, TestComponent);
        var testComponentNode = ReactDOM.findDOMNode(testComponent);
        var renderSpy = sandbox.spy(testComponent, "render");
        var shouldComponentUpdateSpy = sandbox.spy(testComponent, "shouldComponentUpdate");
        chai_1.expect(testComponentNode.textContent).eql("subprop121: 121");
        chai_1.expect(renderSpy.callCount).eql(0);
        chai_1.expect(shouldComponentUpdateSpy.callCount).eql(0);
        container.setState({ value: mockProps2 }, function () {
            chai_1.expect(testComponentNode.textContent).eql("subprop121: 121 UPDATED!");
            chai_1.expect(renderSpy.callCount).eql(1);
            chai_1.expect(shouldComponentUpdateSpy.callCount).eql(1);
        });
        container.setState({ value: mockProps2 }, function () {
            chai_1.expect(testComponentNode.textContent).eql("subprop121: 121 UPDATED!");
            chai_1.expect(renderSpy.callCount).eql(1);
            chai_1.expect(shouldComponentUpdateSpy.callCount).eql(2);
            done();
        });
    });
});

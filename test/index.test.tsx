/// <reference path="../typings/browser.d.ts" />
/// <reference path="../src/interfaces.d.ts"/>

import * as jsdom from "jsdom";
let g: any = global;
g.document = jsdom.jsdom("<!doctype html><html><body></body></html>");
g.window = document.defaultView;
g.navigator = { userAgent: "node.js" };

import { expect } from "chai";
import * as sinon from "sinon";
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as ReactTestUtils from "react-addons-test-utils";
import updateWhenNotDeepEqual from "../src/index";

interface TestProps {
    id: string;
    subprop1: {
        subprop11: {
            subprop111: {
                val: string;
            },
            subprop112?: {
                val: string;
            }
        },
        subprop12?: {
            subprop121: {
                val: string;
            },
            subprop122?: {
                val: string;
            }
        };
    };
}

interface TestState {
    value: TestProps;
}

let mockProps: TestProps = {
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

let mockProps2: TestProps = {
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

describe("@updateWhenNotDeepEqual", () => {

    let sandbox: Sinon.SinonSandbox;

    beforeEach(() => {
        sandbox = sinon.sandbox.create();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it("Should implement shouldComponentUpdate", (done) => {

        @updateWhenNotDeepEqual()
        class TestComponent extends React.Component<TestProps, void> {

            constructor(props: TestProps) {
                super(props);
            }

            public render() {
                return (
                    <div>
                        <div>subprop121: {this.props.subprop1.subprop12.subprop121.val}</div>
                    </div>
                );
            }
        }

        class ContainerComponent extends React.Component<any, TestState> {

            constructor(props: any) {
                super(props);
                this.state = { value: mockProps };
            }

            public render() {
                return (<div><TestComponent {...this.state.value} /></div>);
            }
        }

        // 1. Render component with mockProps
        let container = ReactTestUtils.renderIntoDocument(<ContainerComponent />);
        let testComponent = ReactTestUtils.findRenderedComponentWithType(container, TestComponent);
        let testComponentNode = ReactDOM.findDOMNode(testComponent);
        let renderSpy = sandbox.spy(testComponent, "render");
        let shouldComponentUpdateSpy = sandbox.spy(testComponent, "shouldComponentUpdate");

        // 2. Assert component has been rendered with mockProps
        expect(testComponentNode.textContent).eql("subprop121: 121");
        expect(renderSpy.callCount).eql(0);
        expect(shouldComponentUpdateSpy.callCount).eql(0);

        // 3. Update parent state so component recieve new props
        // Assert component has been rendered with nextprops
        container.setState({ value : mockProps2 }, () => {
            expect(testComponentNode.textContent).eql("subprop121: 121 UPDATED!");
            expect(renderSpy.callCount).eql(1);
            expect(shouldComponentUpdateSpy.callCount).eql(1);
        });

        // 4. Update parent state using exact same state
        // Assert component has NOT been rendered again thanks to @updateWhenNotDeepEqual
        container.setState({ value : mockProps2 }, () => {
            expect(testComponentNode.textContent).eql("subprop121: 121 UPDATED!");
            expect(renderSpy.callCount).eql(1);
            expect(shouldComponentUpdateSpy.callCount).eql(2);
            done();
        });

    });

    it("Should use sub-properties when type of suprop is a string", (done) => {

        @updateWhenNotDeepEqual("subprop1")
        class TestComponent extends React.Component<TestProps, void> {

            constructor(props: TestProps) {
                super(props);
            }

            public render() {
                return (
                    <div>
                        <div>subprop121: {this.props.subprop1.subprop12.subprop121.val}</div>
                    </div>
                );
            }
        }

        class ContainerComponent extends React.Component<any, TestState> {

            constructor(props: any) {
                super(props);
                this.state = { value: mockProps };
            }

            public render() {
                return (<div><TestComponent {...this.state.value} /></div>);
            }
        }

        // 1. Render component with mockProps
        let container = ReactTestUtils.renderIntoDocument(<ContainerComponent />);
        let testComponent = ReactTestUtils.findRenderedComponentWithType(container, TestComponent);
        let testComponentNode = ReactDOM.findDOMNode(testComponent);
        let renderSpy = sandbox.spy(testComponent, "render");
        let shouldComponentUpdateSpy = sandbox.spy(testComponent, "shouldComponentUpdate");

        // 2. Assert component has been rendered with mockProps
        expect(testComponentNode.textContent).eql("subprop121: 121");
        expect(renderSpy.callCount).eql(0);
        expect(shouldComponentUpdateSpy.callCount).eql(0);

        // 3. Update parent state so component recieve new props
        // Assert component has been rendered with nextprops
        container.setState({ value : mockProps2 }, () => {
            expect(testComponentNode.textContent).eql("subprop121: 121 UPDATED!");
            expect(renderSpy.callCount).eql(1);
            expect(shouldComponentUpdateSpy.callCount).eql(1);
        });

        // 4. Update parent state using exact same state
        // Assert component has NOT been rendered again thanks to @updateWhenNotDeepEqual
        container.setState({ value : mockProps2 }, () => {
            expect(testComponentNode.textContent).eql("subprop121: 121 UPDATED!");
            expect(renderSpy.callCount).eql(1);
            expect(shouldComponentUpdateSpy.callCount).eql(2);
            done();
        });

    });

    it("Should use sub-properties when type of suprop is a function", (done) => {

        @updateWhenNotDeepEqual((props: TestProps) => { return props.subprop1.subprop12.subprop121; })
        class TestComponent extends React.Component<TestProps, void> {

            constructor(props: TestProps) {
                super(props);
            }

            public render() {
                return (
                    <div>
                        <div>subprop121: {this.props.subprop1.subprop12.subprop121.val}</div>
                    </div>
                );
            }
        }

        class ContainerComponent extends React.Component<any, TestState> {

            constructor(props: any) {
                super(props);
                this.state = { value: mockProps };
            }

            public render() {
                return (<div><TestComponent {...this.state.value} /></div>);
            }
        }

        // 1. Render component with mockProps
        let container = ReactTestUtils.renderIntoDocument(<ContainerComponent />);
        let testComponent = ReactTestUtils.findRenderedComponentWithType(container, TestComponent);
        let testComponentNode = ReactDOM.findDOMNode(testComponent);
        let renderSpy = sandbox.spy(testComponent, "render");
        let shouldComponentUpdateSpy = sandbox.spy(testComponent, "shouldComponentUpdate");

        // 2. Assert component has been rendered with mockProps
        expect(testComponentNode.textContent).eql("subprop121: 121");
        expect(renderSpy.callCount).eql(0);
        expect(shouldComponentUpdateSpy.callCount).eql(0);

        // 3. Update parent state so component recieve new props
        // Assert component has been rendered with nextprops
        container.setState({ value : mockProps2 }, () => {
            expect(testComponentNode.textContent).eql("subprop121: 121 UPDATED!");
            expect(renderSpy.callCount).eql(1);
            expect(shouldComponentUpdateSpy.callCount).eql(1);
        });

        // 4. Update parent state using exact same state
        // Assert component has NOT been rendered again thanks to @updateWhenNotDeepEqual
        container.setState({ value : mockProps2 }, () => {
            expect(testComponentNode.textContent).eql("subprop121: 121 UPDATED!");
            expect(renderSpy.callCount).eql(1);
            expect(shouldComponentUpdateSpy.callCount).eql(2);
            done();
        });

    });

});

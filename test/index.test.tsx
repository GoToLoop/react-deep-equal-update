/// <reference path="../typings/browser.d.ts" />
/// <reference path="../src/interfaces.d.ts"/>

import * as jsdom from "jsdom";
let g: any = global;
let document: any = jsdom.jsdom("<!doctype html><html><body></body></html>");
g.document = document;
g.window = document.parentWindow;

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

describe("@updateWhenNotDeepEqual", () => {

    let sandbox: Sinon.SinonSandbox;

    beforeEach(() => {
        sandbox = sinon.sandbox.create();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it("Should implement shouldComponentUpdate", () => {

        @updateWhenNotDeepEqual()
        class TestComponent extends React.Component<TestProps, void> {

            constructor(props: TestProps) {
                super(props);
            }

            public render() {
                return (<div id={this.props.id}></div>);
            }
        }

        class ContainerComponent extends React.Component<any, TestProps> {

            constructor(props: any) {
                super(props);
                this.state = mockProps;
            }

            public render() {
                return (<div><TestComponent {...this.state} /></div>);
            }
        }

        // 1. Render component with mockProps
        let container = ReactTestUtils.renderIntoDocument(<ContainerComponent />);
        let containerNode = ReactDOM.findDOMNode(container);

        // 2. Assert component has been rendered
        // TODO

        // 3. Update parent state so component recieve new propros
        let nextprops = Object.assign({}, mockProps, { id: "2" });
        container.setState(nextprops);

        // 4. Assert component has been rendered with nextprops
        // TODO
        expect(containerNode.textContent).eqls("2");

        // 5. Update parent state using exact same state
        container.setState(nextprops);

        // 6. Assert component has NOT been rendered again thanks to @updateWhenNotDeepEqual
        // TODO
        expect(containerNode.textContent).eqls("2");

    });

    it("Should use sub-properties when type of suprop is a string", () => {

        @updateWhenNotDeepEqual("subprop1")
        class TestComponent extends React.Component<TestProps, void> {

            constructor(props: TestProps) {
                super(props);
            }

            public render() {
                return (<div id={this.props.id}></div>);
            }
        }

        class ContainerComponent extends React.Component<any, TestProps> {

            constructor(props: any) {
                super(props);
                this.state = mockProps;
            }

            public render() {
                return (<div><TestComponent {...this.state} /></div>);
            }
        }

        // 1. Render component with mockProps
        let container = ReactTestUtils.renderIntoDocument(<ContainerComponent />);
        let containerNode = ReactDOM.findDOMNode(container);

        // 2. Assert component has been rendered
        // TODO

        // 3. Update parent state so component recieve new propros
        let nextprops = Object.assign({}, mockProps, { id: "2" });
        container.setState(nextprops);

        // 4. Assert component has been rendered with nextprops
        // TODO
        expect(containerNode.textContent).eqls("2");

        // 5. Update parent state using exact same state
        container.setState(nextprops);

        // 6. Assert component has NOT been rendered again thanks to @updateWhenNotDeepEqual
        // TODO
        expect(containerNode.textContent).eqls("2");

    });

    it("Should use sub-properties when type of suprop is a function", () => {

        @updateWhenNotDeepEqual((props: TestProps) => { return props.subprop1.subprop12.subprop122; })
        class TestComponent extends React.Component<TestProps, void> {

            constructor(props: TestProps) {
                super(props);
            }

            public render() {
                return (<div id={this.props.id}></div>);
            }
        }

        class ContainerComponent extends React.Component<any, TestProps> {

            constructor(props: any) {
                super(props);
                this.state = mockProps;
            }

            public render() {
                return (<div><TestComponent {...this.state} /></div>);
            }
        }

        // 1. Render component with mockProps
        let container = ReactTestUtils.renderIntoDocument(<ContainerComponent />);
        let containerNode = ReactDOM.findDOMNode(container);

        // 2. Assert component has been rendered
        // TODO

        // 3. Update parent state so component recieve new propros
        let nextprops = Object.assign({}, mockProps, { id: "2" });
        container.setState(nextprops);

        // 4. Assert component has been rendered with nextprops
        // TODO
        expect(containerNode.textContent).eqls("2");

        // 5. Update parent state using exact same state
        container.setState(nextprops);

        // 6. Assert component has NOT been rendered again thanks to @updateWhenNotDeepEqual
        // TODO
        expect(containerNode.textContent).eqls("2");

    });

});

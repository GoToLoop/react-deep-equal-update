/// <reference path="../typings/main.d.ts" />
/// <reference path="../src/interfaces.d.ts"/>

import { expect } from "chai";
import * as React from "react";
import updateWhenNotDeepEqual from "../src/index";

interface TestProps {
    id: number;
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

describe("@updateWhenNotDeepEqual", () => {

    it("Should implement shouldComponentUpdate", () => {

        @updateWhenNotDeepEqual()
        class TestComponent extends React.Component<TestProps, void> {

            constructor(props: TestProps) {
                super(props);
            }

            public render() {
                return (<div></div>);
            }
        }

        let component = new TestComponent(mockProps);
        let nextprops = Object.assign({}, mockProps, { id: 2 });
        // TODO expect()

    });

    it("Should use sub-properties when type of suprop is a string", () => {

        @updateWhenNotDeepEqual("subprop12")
        class TestComponent extends React.Component<TestProps, void> {

            constructor(props: TestProps) {
                super(props);
            }

            public render() {
                return (<div></div>);
            }
        }

        let component = new TestComponent(mockProps);
        let nextprops = Object.assign({}, mockProps, { id: 2 });
        // TODO expect()

    });

    it("Should use sub-properties when type of suprop is a function", () => {

        @updateWhenNotDeepEqual((props: TestProps) => { return props.subprop1.subprop12.subprop121; })
        class TestComponent extends React.Component<TestProps, void> {

            constructor(props: TestProps) {
                super(props);
            }

            public render() {
                return (<div></div>);
            }
        }

        let component = new TestComponent(mockProps);
        let nextprops = Object.assign({}, mockProps, { id: 2 });
        // TODO expect()

    });

});

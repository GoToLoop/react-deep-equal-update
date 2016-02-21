# `@updateWhenNotDeepEqual`

[![Build Status](https://secure.travis-ci.org/remojansen/react-deep-equal-update.svg?branch=master)](https://travis-ci.org/remojansen/react-deep-equal-update)
[![Coverage Status](https://coveralls.io/repos/github/remojansen/react-deep-equal-update/badge.svg?branch=master)](https://coveralls.io/github/remojansen/react-deep-equal-update?branch=master)
[![npm version](https://badge.fury.io/js/react-deep-equal-update.svg)](https://badge.fury.io/js/react-deep-equal-update)
[![Dependencies](https://david-dm.org/remojansen/react-deep-equal-update.svg)](https://david-dm.org/remojansen/react-deep-equal-update#info=dependencies)
[![img](https://david-dm.org/remojansen/react-deep-equal-update/dev-status.svg)](https://david-dm.org/remojansen/react-deep-equal-update/#info=devDependencies)
[![img](https://david-dm.org/remojansen/react-deep-equal-update/peer-status.svg)](https://david-dm.org/remojansen/react-deep-equal-update/#info=peerDependenciess)

A decorator that uses [deep-equal](https://www.npmjs.com/package/deep-equal) 
to determine if a component should be updated.

## How it works?
> **Note: This documentation contains TypeScript examples but you 
should be able to use this library with Babel as well.**

Imagine that the props of a component have the following interface:

```
interface TestProps {
    id: number;
    subprop1: {
        subprop11: {
            subprop111: {
                value: string;
            },
            subprop112?: {
                value: string;
            }
        },
        subprop12?: {
            subprop121: {
                value: string;
            },
            subprop122?: {
                value: string;
            }
        };
    };
}
```

If we want to re-render the component only when its properties
change we would need to use a deep-equality check (or immutables) 
and implement the [`shouldComponentUpdate`](http://bit.ly/1QnAYEH) 
method.

> By default, `shouldComponentUpdate` always returns `true` to prevent 
subtle bugs when state is mutated in place, but if you are careful 
to always treat state as immutable and to read only from props and
state in `render()` then you can override `shouldComponentUpdate` with 
an implementation that compares the old props and state to their 
replacements.

This small module helps you to achieve that using a decorator named
`updateWhenNotDeepEqual`:

### Working with properties
```
import * as React from "react";
import updateWhenNotDeepEqual from "../src/decorator";

@updateWhenNotDeepEqual()
class TestComponent extends React.Component<TestProps, void> {

    constructor(props: TestProps) {
        super(props);
    }

    public render() {
        return (<div></div>);
    }
}
```
### Working with direct sub-properties
If you just want to re-render the component when one of its direct sub-properties
has been updated you can pass the name od the sup-property to the decorator:

```
@updateWhenNotDeepEqual("subprop12")
class TestComponent extends React.Component<TestProps, void> {

    constructor(props: TestProps) {
        super(props);
    }

    public render() {
        return (<div></div>);
    }
}
```

### Working with deep sub-properties
Finally, if you just want to re-render the component when one of its deep
sub-properties has been updated you can pass the name od the sup-property 
to the decorator:
```
@updateWhenNotDeepEqual((props: TestProps) => { return props.subprop1.subprop12.subprop121; })
class TestComponent extends React.Component<TestProps, void> {

    constructor(props: TestProps) {
        super(props);
    }

    public render() {
        return (<div></div>);
    }
}
```

> **Note: The `updateWhenNotDeepEqual` decorator asumes that your components have properties 
and NO STATE the implementation of `shouldComponentUpdate` ignores the component's state.**

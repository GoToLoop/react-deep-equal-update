/// <reference path="./react-deep-equal-update.d.ts" />

import updateWhenNotDeepEqual from "react-deep-equal-update";

@updateWhenNotDeepEqual()
class Component1 { /* do nothing */ }

@updateWhenNotDeepEqual("subprop")
class Component2 { /* do nothing */ }

@updateWhenNotDeepEqual((props: Object) => { return props["subprop"]["subprop"]; })
class Component3 { /* do nothing */ }

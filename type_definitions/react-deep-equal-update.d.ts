// Type definitions for react-deep-equal-update
// Project: https://github.com/remojansen/react-deep-equal-update
// Definitions by: remojansen <https://github.com/remojansen>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

declare module "react-deep-equal-update" {

    type subprop = (props: Object) => Object;
    type updateDecorator = (subprop?: (string|subprop)) => ClassDecorator;

    let updateWhenNotDeepEqual: updateDecorator;
    export default updateWhenNotDeepEqual;
}

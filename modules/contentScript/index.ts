import { render } from "preact";
import { Extension } from "./Extension";
import { getOrCreateDomNodeWithId } from "./utils/getOrCreateDomNode";

const root = getOrCreateDomNodeWithId("unrickroll", "div", document.body);

render(Extension(), root);

console.log("Hello from the Unrickroll extension!");

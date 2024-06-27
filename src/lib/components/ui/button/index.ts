import type { Button } from "bits-ui";
import Root from "./button.svelte";

type Props = Button.Props;
type Events = Button.Events;

export {
	Root,
	type Props,
	type Events,
	//
	Root as Button,
	type Props as ButtonProps,
	type Events as ButtonEvents,
};

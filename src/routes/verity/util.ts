import type { Room } from "./+page.svelte";

interface RoomState {
	inside: string;
	outside: string;
	toAdd(): string;
	toRemove(): string;
	swap(from: string, to: string): void;
}

const compositions: Record<string, string> = {
	circle: "c",
	square: "s",
	triangle: "t",
	sphere: "cc",
	cube: "ss",
	pyramid: "tt",
	cone: "ct",
	cylinder: "cs",
	prism: "st",
};

export const reverseMappings = Object.entries(compositions).reduce<Record<string, string>>(
	(all, [key, value]) => ({ ...all, [value]: key }),
	{},
);

export function isDisabled(room: Room, shape: string, side: number) {
	if (room.selected[side] === shape) return false;

	const initialCount = room.shapes.length / 3;

	const components: Record<string, number> = {
		c: initialCount,
		s: initialCount,
		t: initialCount,
	};

	for (const shape of room.selected) {
		for (const component of compositions[shape] ?? []) {
			components[component]--;
		}
	}

	const composition = compositions[shape];

	const counts: Record<string, number> = {
		c: composition.match(/c/g)?.length ?? 0,
		s: composition.match(/s/g)?.length ?? 0,
		t: composition.match(/t/g)?.length ?? 0,
	};

	for (const count of Object.keys(counts)) {
		if (components[count] < counts[count]) return true;
	}

	return false;
}

const state: RoomState = {
	inside: "",
	outside: "",
	toAdd() {
		return "cst"
			.replace(this.inside, "")
			.split("")
			.filter((c) => !this.outside.includes(c))
			.join("");
	},
	toRemove() {
		if (this.outside.includes(this.inside)) {
			return this.inside;
		}

		if (new Set(this.outside).size === 1) {
			return this.outside[0];
		}

		return "";
	},
	swap(toRemove, toAdd) {
		this.outside = this.outside.replace(toRemove, toAdd);
	},
};

const states = [{ ...state }, { ...state }, { ...state }];

export function solve(inside: string[], outside: string[]) {
	const steps = [];

	inside.forEach((shape, i) => (states[i].inside = compositions[shape]));
	outside.forEach((shape, i) => (states[i].outside = compositions[shape]));

	while (true) {
		const swaps = evaluate();
		if (!swaps) break;

		const e = {
			dissect: [
				{ value: swaps.componentA, side: swaps.sideA },
				{ value: swaps.componentB, side: swaps.sideB },
				{ value: null, side: 3 - (swaps.sideA + swaps.sideB) },
			].sort((a, b) => a.side - b.side),
		};

		steps.push(e);

		states[swaps.sideA].swap(swaps.componentA, swaps.componentB);
		states[swaps.sideB].swap(swaps.componentB, swaps.componentA);

		steps.push({
			stage: states.map((state, i) => ({
				value: state.outside.split("").sort().join(""),
				side: i,
			})),
		});
	}

	return steps;
}

function evaluate() {
	const swaps = {
		sideA: -1,
		sideB: -1,
		componentA: "",
		componentB: "",
	};

	swaps.sideA = states.findIndex((state) => {
		swaps.componentA = state.toRemove();
		return !!swaps.componentA;
	});

	if (swaps.componentA === "") return null;

	swaps.sideB = states.findIndex((state, i) => {
		swaps.componentB = state.toRemove();

		return (
			i !== swaps.sideA &&
			state.toAdd().includes(swaps.componentA) &&
			swaps.componentB !== state.inside
		);
	});

	if (swaps.sideB === -1) {
		swaps.sideB = states.findIndex((state) => state.toAdd().includes(swaps.componentA));
		swaps.componentB = states[swaps.sideB].toRemove();
	}

	return swaps;
}

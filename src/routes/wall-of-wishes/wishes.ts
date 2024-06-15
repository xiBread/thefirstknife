import symbols from "./symbols";

interface Wish {
	description: string;
	flavorText: string;
	pattern: (string | null)[][];
}

const ___ = null;

// prettier-ignore
const [
	$01, $02, $03, $04,
	$05, $06, $07, $08,
	$09, $10, $11, $12,
	$13, $14, $15, $16
] = symbols;

export default [
	{
		description: "Grant an Ethereal Key",
		flavorText: "You wish to feed an addiction.",
		pattern: [
			[$01, $01, $14, $14, $14],
			[$01, $01, ___, $14, $14],
			[$06, $06, ___, $04, $04],
			[$06, $06, $10, $04, $04],
		],
	},
	{
		description: '"Numbers of Power" emblem',
		flavorText: "You wish to help a friend in need.",
		pattern: [
			[$03, ___, $11, ___, $03],
			[$03, ___, $11, ___, $03],
			[$02, ___, $10, ___, $03],
			[$02, ___, $10, ___, $06],
		],
	},
	{
		description: "Chest between Morgeth and Vault",
		flavorText: "You wish for material validation.",
		pattern: [
			[$01, ___, $01, ___, $01],
			[___, $05, ___, $05, ___],
			[$09, ___, $09, ___, $09],
			[___, $13, ___, $13, ___],
		],
	},
	{
		description: "Shuro Chi checkpoint",
		flavorText: "You wish to stay here forever.",
		pattern: [
			[$15, $16, $16, $16, $13],
			[$07, $15, $08, $13, $07],
			[$07, $13, ___, $15, $07],
			[$13, $06, $06, $06, $15],
		],
	},
	{
		description: "Morgeth checkpoint",
		flavorText: "You wish to stay here forever.",
		pattern: [
			[$06, $12, $15, $12, $06],
			[___, $09, $16, $09, ___],
			[___, $09, $15, $09, ___],
			[$06, $12, $15, $12, $06],
		],
	},
	{
		description: "Vault checkpoint",
		flavorText: "You wish to stay here forever.",
		pattern: [
			[$10, $13, $16, $13, $10],
			[$01, $10, ___, $10, $01],
			[$01, ___, ___, ___, $01],
			[$11, $11, $11, $11, $11],
		],
	},
	{
		description: "Riven checkpoint",
		flavorText: "You wish to stay here forever.",
		pattern: [
			[$16, $04, $12, ___, $06],
			[$09, ___, ___, $07, $15],
			[$09, ___, $14, $07, $15],
			[$16, $04, $12, ___, $06],
		],
	},
	{
		description: '"Hope for the Future" song',
		flavorText: "You wish to open your mind to new ideas.",
		pattern: [
			[___, $12, $14, $11, ___],
			[___, $12, $14, $11, ___],
			[___, $12, $16, $11, ___],
			[___, $12, $14, $11, ___],
		],
	},
	{
		description: "Failsafe dialogue",
		flavorText: "You wish for the means to feed an addiction.",
		pattern: [
			[___, ___, ___, ___, ___],
			[___, $02, $02, $02, ___],
			[___, $02, $02, $14, ___],
			[___, ___, ___, ___, ___],
		],
	},
	{
		description: "Drifter dialogue",
		flavorText: "You wish for love and support.",
		pattern: [
			[$02, $02, ___, ___, $02],
			[$02, $12, $12, ___, $04],
			[$02, ___, $07, $07, $04],
			[___, ___, ___, $04, $04],
		],
	},
	{
		description: "Confetti effect on precision kills",
		flavorText: "You wish for others to celebrate your success.",
		pattern: [
			[$15, $15, ___, $16, $16],
			[$15, ___, $02, $06, $16],
			[$09, ___, $02, ___, $06],
			[$09, $09, ___, $06, $06],
		],
	},
	{
		description: "Random head ornaments",
		flavorText: "You wish to look athletic and elegant.",
		pattern: [
			[$01, ___, ___, ___, $09],
			[$01, $01, $09, $09, $09],
			[$04, $04, $12, $15, $15],
			[$04, ___, ___, ___, $15],
		],
	},
	{
		description: "Petra's Run (Flawless)",
		flavorText: "You wish for a promising future",
		pattern: [
			[$13, $02, $14, $15, $08],
			[$13, $02, ___, $15, $08],
			[$08, $15, ___, $02, $13],
			[$08, $15, ___, $02, $13],
		],
	},
	{
		description: "Spawn Corrupted Eggs",
		flavorText: "You wish to move the hands of time",
		pattern: [
			[$06, $10, $14, $09, $05],
			[___, ___, $16, ___, ___],
			[$01, ___, $06, $08, ___],
			[$06, $09, ___, ___, $11],
		],
	},
] satisfies Wish[];

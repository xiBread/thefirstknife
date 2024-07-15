const basePerks = [
	[
		1476923952, // Assassin
		1476923953, // Inmost Light
		1476923954, // Ophidian
	],
	[
		1476923955, // Star-Eater
		1476923956, // Synthoceps
		1476923957, // Verity
	],
];

export const classItemHashes = [
	2809120022, // Relativism
	2273643087, // Solipsism
	266021826, // Stocism
];

export const perkHashes = {
	[classItemHashes[0]]: [
		[
			...basePerks[0],
			3751917999, // Dragon
			3751917998, // Galanor
			3751917997, // Foetracer
			3751917996, // Caliban
			3751917995, // Renewal
		],
		[
			...basePerks[1],
			3751917994, // Cyrtarachne
			3751917993, // Gyrfalcon
			3751917992, // Liar
			3751917991, // Wormhusk
			3751917990, // Coyote
		],
	],
	[classItemHashes[1]]: [
		[
			...basePerks[0],
			183430248, // Stag
			183430255, // Filaments
			183430252, // Necrotic
			183430253, // Osmiomancy
			183430250, // Apotheosis
		],
		[
			...basePerks[1],
			183430251, // Vesper
			183430254, // Harmony
			183430249, // Starfire
			183430246, // Swarm
			183430247, // Claw
		],
	],
	[classItemHashes[2]]: [
		[
			...basePerks[0],
			3573490509, // Severance
			3573490508, // Hoarfrost
			3573490511, // Eternal Warrior
			3573490510, // Abeyant
			3573490505, // Bear
		],
		[
			...basePerks[1],
			3573490504, // Contact
			3573490507, // Scars
			3573490506, // Horn
			3573490501, // Alpha Lupi
			3573490500, // Armamentarium
		],
	],
};

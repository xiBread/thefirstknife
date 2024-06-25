<script lang="ts">
	const { small = false } = $props();
</script>

<div
	class="spinner pointer-events-none relative opacity-50 transition-opacity duration-[250ms] *:absolute *:size-full *:fill-white {small
		? 'size-6'
		: 'size-12'}"
>
	<svg viewBox="0 0 62.08 71.68">
		<polygon class="a" points="30.04 59.7 10.87 48.64 1 54.34 30.04 71.1 30.04 59.7" />
		<polygon class="e" points="1 17.34 10.87 23.04 30.04 11.97 30.04 0.58 1 17.34" />
		<polygon class="f" points="9.87 46.91 9.87 24.77 0 19.07 0 52.6 9.87 46.91" />
		<polygon class="d" points="32.04 0.58 32.04 11.97 51.2 23.04 61.08 17.34 32.04 0.58" />
		<polygon class="b" points="61.08 54.34 51.2 48.64 32.04 59.7 32.04 71.1 61.08 54.34" />
		<polygon class="c" points="52.2 24.77 52.2 46.91 62.08 52.6 62.08 19.07 52.2 24.77" />
	</svg>

	<svg viewBox="0 0 62.08 71.68">
		<polygon class="c" points="21.8 29.35 30.04 24.59 30.04 14.32 12.9 24.21 21.8 29.35" />
		<polygon class="b" points="20.8 40.6 20.8 31.08 11.9 25.95 11.9 45.73 20.8 40.6" />
		<polygon class="d" points="32.04 14.32 32.04 24.59 40.28 29.35 49.17 24.21 32.04 14.32" />
		<polygon class="e" points="41.28 31.08 41.28 40.6 50.17 45.73 50.17 25.95 41.28 31.08" />
		<polygon class="a" points="30.04 47.09 21.8 42.33 12.9 47.47 30.04 57.36 30.04 47.09" />
		<polygon class="f" points="40.28 42.33 32.04 47.09 32.04 57.36 49.17 47.47 40.28 42.33" />
	</svg>
</div>

<style>
	/* prettier-ignore */
	.spinner svg {
		top: 0;
		left: 0;

		&:first-child {
			.a { animation: slice-a 3s linear infinite; }
			.b { animation: slice-b 3s linear infinite; }
			.c { animation: slice-c 3s linear infinite; }
			.d { animation: slice-d 3s linear infinite; }
			.e { animation: slice-e 3s linear infinite; }
			.f { animation: slice-f 3s linear infinite; }
		}

		&:last-child {
			.a { animation: slice-a 1.5s linear infinite; }
			.b { animation: slice-b 1.5s linear infinite; }
			.c { animation: slice-c 1.5s linear infinite; }
			.d { animation: slice-d 1.5s linear infinite; }
			.e { animation: slice-e 1.5s linear infinite; }
			.f { animation: slice-f 1.5s linear infinite; }
		}
	}

	/* prettier-ignore */
	@keyframes slice-a {
		0% { opacity: 1; }
		17% { opacity: 0; }
		33% { opacity: 0; }
		50% { opacity: 0; }
		67% { opacity: 0; }
		83% { opacity: 0; }
		100% { opacity: 1; }
	}

	/* prettier-ignore */
	@keyframes slice-b {
		0% { opacity: 0; }
		17% { opacity: 1; }
		33% { opacity: 0; }
		50% { opacity: 0; }
		67% { opacity: 0; }
		83% { opacity: 0; }
		100% { opacity: 0; }
	}

	/* prettier-ignore */
	@keyframes slice-c {
		0% { opacity: 0; }
		17% { opacity: 0; }
		33% { opacity: 1; }
		50% { opacity: 0; }
		67% { opacity: 0; }
		83% { opacity: 0; }
		100% { opacity: 0; }
	}

	/* prettier-ignore */
	@keyframes slice-d {
		0% { opacity: 0; }
		17% { opacity: 0; }
		33% { opacity: 0; }
		50% { opacity: 1; }
		67% { opacity: 0; }
		83% { opacity: 0; }
		100% { opacity: 0; }
	}

	/* prettier-ignore */
	@keyframes slice-e {
		0% { opacity: 0; }
		17% { opacity: 0; }
		33% { opacity: 0; }
		50% { opacity: 0; }
		67% { opacity: 1; }
		83% { opacity: 0; }
		100% { opacity: 0; }
	}

	/* prettier-ignore */
	@keyframes slice-f {
		0% { opacity: 0; }
		17% { opacity: 0; }
		33% { opacity: 0; }
		50% { opacity: 0; }
		67% { opacity: 0; }
		83% { opacity: 1; }
		100% { opacity: 0; }
	}
</style>

import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		name: 'PI calculation'
	}
});

export default app;
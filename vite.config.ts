import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';
/** @type {import('vite').UserConfig} */

export default defineConfig({
	plugins: [
		sveltekit(),
		tailwindcss(),
		SvelteKitPWA({
			registerType: 'autoUpdate',
			devOptions: {
				enabled: true,
				type: 'module'
			},
			manifest: {
				name: 'Recipe Website',
				short_name: 'RecipeWeb',
				start_url: '/',
				icons: [
					{
						src: '/icons/manifest-icon-192.maskable.png',
						sizes: '192x192',
						type: 'image/png',
						purpose: 'any'
					},
					{
						src: '/icons/manifest-icon-192.maskable.png',
						sizes: '192x192',
						type: 'image/png',
						purpose: 'maskable'
					},
					{
						src: '/icons/manifest-icon-512.maskable.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'any'
					},
					{
						src: '/icons/manifest-icon-512.maskable.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'maskable'
					}
				],
				theme_color: '#000000',
				background_color: '#ffffff',
				display: 'standalone',
				orientation: 'portrait'
			},
			workbox: {
				navigateFallback: '/',
				cleanupOutdatedCaches: true,
				globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,woff,woff2}'],
				runtimeCaching: [
					{
						urlPattern: ({ url }) =>
							url.origin === 'https://www.themealdb.com' &&
							url.pathname.startsWith('/api/json/v1/1/'),
						handler: 'StaleWhileRevalidate',
						options: {
							cacheName: 'mealdb-api',
							cacheableResponse: { statuses: [0, 200] },
							expiration: {
								maxEntries: 200,
								maxAgeSeconds: 60 * 60 * 24 * 7 
							}
						}
					},
					{
						urlPattern: ({ request }) => request.destination === 'image',
						handler: 'CacheFirst',
						options: {
							cacheName: 'images',
							cacheableResponse: { statuses: [0, 200] },
							expiration: {
								maxEntries: 300,
								maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
							}
						}
					}
				]
			}
		})
	]
});

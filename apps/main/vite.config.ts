import electron from 'vite-plugin-electron/simple';
import pkg from './package.json';
import { defineConfig } from 'vite';

export default defineConfig(({ command, mode }) => {
    const isServe = command === 'serve';
    const isBuild = command === 'build';
    const sourcemap = isServe;

    return {
        plugins: [
            electron({
                main: {
                    entry: 'src/main.ts',
                    vite: {
                        define: {
                            'process.env.APP_ENV': JSON.stringify(mode),
                        },
                        build: {
                            sourcemap,
                            minify: false,
                            outDir: 'app/main',
                            assetsDir: 'assets',
                            rollupOptions: {
                                // Some third-party Node.js libraries may not be built correctly by Vite, especially `C/C++` addons,
                                // we can use `external` to exclude them to ensure they work correctly.
                                // Others need to put them in `dependencies` to ensure they are collected into `app.asar` after the app is built.
                                // Of course, this is not absolute, just this way is relatively simple. :)
                                external: Object.keys('dependencies' in pkg ? pkg.dependencies : {}),
                            },
                        },
                    },
                },
                preload: {
                    // Shortcut of `build.rollupOptions.input`.
                    // Preload scripts may contain Web assets, so use the `build.rollupOptions.input` instead `build.lib.entry`.
                    input: ['src/preload/index.ts'],
                    vite: {
                        define: {
                            'process.env.APP_ENV': JSON.stringify(mode),
                        },
                        build: {
                            sourcemap: sourcemap ? 'inline' : undefined,
                            minify: isBuild,
                            outDir: 'app/preload',
                            rollupOptions: {
                                external: Object.keys('dependencies' in pkg ? pkg.dependencies : {}),
                            },
                        },
                    },
                },
            }),
        ],
    };
});

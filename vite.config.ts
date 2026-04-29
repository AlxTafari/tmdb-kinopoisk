import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@/': `${path.resolve(__dirname, 'src')}/`,
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: '@use "variables" as *;\n',
                loadPaths: [path.resolve(__dirname, 'src/shared/styles')],
            },
        },
    },
})
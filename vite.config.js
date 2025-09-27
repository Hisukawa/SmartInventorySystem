import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [
        laravel({
            input: "resources/js/app.jsx",
            refresh: true,
        }),
        react(),
    ],
    server: {
        // host: "192.168.1.25", // Listen on all network interfaces (0.0.0.0)
        host: "127.0.0.1", // Manually changes
        port: 5173, // optional, default Vite port
        strictPort: true, // fail if port is already in usephp artisan serve --host=0.0.0.0 --port=8000
        cors: true, // ✅ allow cross-origin requests
    },
});

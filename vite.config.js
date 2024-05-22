import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            "/api": {
                target: "https://api.themoviedb.org/3",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ""),
                configure: (proxy, options) => {
                    proxy.on("proxyReq", (proxyReq, req, res) => {
                        proxyReq.setHeader(
                            "Authorization",
                            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYmE3NGQzZTI4YTg0MDIyZjlhZmJjZmRlMmNiNDdjYyIsInN1YiI6IjY2NDYzNTg0ZmE2OWY2NDBhZTk1MzljYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.57YZg6Yx6-cxGWIqH-Z_W4oy1WHDGekDcU1tARrULk0"
                        );
                        proxyReq.setHeader("accept", "application/json");
                    });
                },
            },
        },
    },
});

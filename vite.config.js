    // import { defineConfig } from "vite";
    // import react from "@vitejs/plugin-react";

    // export default defineConfig({
    // plugins: [react()],
    // resolve: {
    //     alias: {
    //     "@": "/src",
    //     },
    // },
    // esbuild: {
    //     loader: "jsx",
    //     include: /src\/.*\.jsx?$/, // Allow JSX in .js and .jsx files
    // },
    // server: {
    //     allowedHosts: ["all"], 
    //     host: true, 
    // },
    // });

    import { defineConfig } from "vite";
    import react from "@vitejs/plugin-react";
    
    export default defineConfig({
      plugins: [react()],
      resolve: {
        alias: {
          "@": "/src",
        },
      },
      esbuild: {
        loader: "jsx",
        include: /src\/.*\.jsx?$/,
      },
      server: {
        host: "0.0.0.0", // Allows access from external networks
        port: 5173, // Ensure this matches your ngrok port
        strictPort: true,
        cors: true, // Enables CORS
        hmr: {
          clientPort: 443, // Ensures HMR works with HTTPS/ngrok
        },
        allowedHosts: ["fa95-112-133-220-140.ngrok-free.app", ".ngrok-free.app", "*"], // Allow ngrok domains
      },
    });
    
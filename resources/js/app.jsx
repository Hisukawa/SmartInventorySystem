import "../css/app.css";
import "./bootstrap";

import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot } from "react-dom/client";
import { Toaster } from "sonner"; // ✅ import Toaster globally

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx")
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <>
                <App {...props} />
                <Toaster
                    position="top-right"
                    richColors
                    closeButton
                    expand
                    toastOptions={{
                        style: {
                            backgroundColor: "hsl(142, 34%, 51%)",
                            color: "white",
                            borderRadius: "0.75rem",
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                        },
                    }}
                />
            </>
        );
    },
    progress: {
        color: "#4B5563",
    },
});

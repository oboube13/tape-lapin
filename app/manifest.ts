import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Tape le lapin !",
    short_name: "Tape le lapin",
    description:
      "Un petit jeu de jardin tout doux : tape le lapin qui sort de son trou.",
    start_url: "/",
    display: "standalone",
    orientation: "any",
    background_color: "#c6edff",
    theme_color: "#aee4ff",
    lang: "fr",
    categories: ["games", "education"],
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
  };
}

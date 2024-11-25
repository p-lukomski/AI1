type AppState = {
    currentStyle: string;
    availableStyles: Record<string, string>;
};

const appState: AppState = {
    currentStyle: "page1",
    availableStyles: {
        page1: "css/page1.css",
        page2: "css/page2.css",
        page3: "css/page3.css",
    },
};

function changeStyle(styleName: string) {
    const head = document.querySelector("head");
    const existingLink = document.getElementById("theme-stylesheet") as HTMLLinkElement;

    if (existingLink) {
        head?.removeChild(existingLink);
    }

    const newLink = document.createElement("link");
    newLink.id = "theme-stylesheet";
    newLink.rel = "stylesheet";
    newLink.href = appState.availableStyles[styleName];
    head?.appendChild(newLink);

    appState.currentStyle = styleName;
}

function initializeStyleLinks() {
    const container = document.getElementById("style-links");
    if (container) {
        container.innerHTML = "";

        for (const styleName in appState.availableStyles) {
            const link = document.createElement("a");
            link.href = "#";
            link.textContent = `Zmień na ${styleName} `;
            link.addEventListener("click", (e) => {
                e.preventDefault();
                changeStyle(styleName);
            });

            container.appendChild(link);
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    initializeStyleLinks();
    changeStyle(appState.currentStyle);
});

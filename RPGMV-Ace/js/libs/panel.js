// HTML5 Game Player - Iframe-based (Simple & Robust)
// Self-invoking anonymous function to encapsulate the script and avoid global scope pollution.
(function () {
    // --- DOM Element References ---
    const playReloadButton = document.getElementById("playReloadButton");
    const playButtonLabel = document.getElementById("playButtonLabel");
    const playButtonIcon = document.getElementById("playButtonIcon");
    const stopButton = document.getElementById("stopButton");
    const fullscreenButton = document.getElementById("fullscreenButton");
    const toggleGamepadButton = document.getElementById("toggleGamepadButton");
    const virtualGamepad = document.getElementById("virtualGamepad");
    const playerContainer = document.getElementById("playerContainer");
    const controlsBar = document.getElementById("controlsBar");
    const controlsHandle = document.getElementById("controlsHandle");
    const volumeSlider = document.getElementById("volumeSlider");
    const muteButton = document.getElementById("muteButton");
    const volumeIcon = document.getElementById("volumeIcon");
    const muteIcon = document.getElementById("muteIcon");
    const gameCoverOverlay = document.getElementById("gameCoverOverlay");
    const playOverlayButton = document.getElementById("playOverlayButton");
    const coverArtImage = document.getElementById("coverArtImage");
    const gameScreen = document.getElementById("gameScreen");

    // --- State Variables ---
    let isPlaying = false;
    let isGamepadVisible = false;
    let controlsHideTimeout = null;
    let lastKnownVolume = 100;

    // --- Configuration ---
    const BLOCK_GAME_INPUT_WHEN_GAMEPAD_ACTIVE = true;
    const GAME_HTML_TEMPLATE = document.getElementById("gameTemplate"); // Embedded game HTML
    const COVER_IMAGE_FORMATS = ["cover.png", "cover.jpg", "cover.jpeg", "cover.webp", "cover.gif"];

    // --- Constants ---
    const PLAY_ICON_SVG = `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>`;
    const RELOAD_ICON_SVG = `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>`;

    // --- Cover Art Loading ---
    function loadCoverArt() {
        let currentFormatIndex = 0;

        function tryLoadNextFormat() {
            if (currentFormatIndex >= COVER_IMAGE_FORMATS.length) {
                coverArtImage.classList.add("no-image");
                return;
            }

            const coverPath = "./" + COVER_IMAGE_FORMATS[currentFormatIndex];
            const testImage = new Image();

            testImage.onload = () => {
                coverArtImage.src = coverPath;
                coverArtImage.classList.remove("no-image");
            };

            testImage.onerror = () => {
                currentFormatIndex++;
                tryLoadNextFormat();
            };

            testImage.src = coverPath;
        }

        tryLoadNextFormat();
    }

    function showCoverOverlay() {
        gameCoverOverlay.classList.remove("hidden");
    }

    function hideCoverOverlay() {
        gameCoverOverlay.classList.add("hidden");
    }

    loadCoverArt();

    // --- Controls Bar Visibility Logic ---
    function hideControlsBar() {
        if (isPlaying && document.fullscreenElement) {
            controlsBar.classList.add("controls-bar--hidden");
            controlsHandle.classList.remove("hidden");
        }
    }

    function showControlsAndResetHideTimer() {
        controlsHandle.classList.add("hidden");
        controlsBar.classList.remove("controls-bar--hidden");
        clearTimeout(controlsHideTimeout);
        if (isPlaying && document.fullscreenElement) {
            controlsHideTimeout = setTimeout(hideControlsBar, 3000);
        }
    }

    // --- Core Player Event Listeners ---
    playReloadButton.addEventListener("click", () => {
        hideCoverOverlay();
        const iframe = document.getElementById("gameIframe");

        // Load embedded HTML from template
        if (GAME_HTML_TEMPLATE) {
            const gameHTML = GAME_HTML_TEMPLATE.innerHTML.trim();
            iframe.srcdoc = gameHTML;
        }

        if (!isPlaying) {
            isPlaying = true;
            playButtonLabel.textContent = "Reload";
            playReloadButton.title = "Reload";
            playButtonIcon.innerHTML = RELOAD_ICON_SVG;
            playReloadButton.setAttribute("aria-pressed", "true");
            showControlsAndResetHideTimer();
        }
        iframe.addEventListener(
            "load",
            () => {
                focusGameIframe();
                updateVolume(volumeSlider.value);
            },
            { once: true }
        );
    });

    playOverlayButton.addEventListener("click", () => {
        hideCoverOverlay();
        const iframe = document.getElementById("gameIframe");

        // Load embedded HTML from template
        if (GAME_HTML_TEMPLATE) {
            const gameHTML = GAME_HTML_TEMPLATE.innerHTML.trim();
            iframe.srcdoc = gameHTML;
        }

        isPlaying = true;
        playButtonLabel.textContent = "Reload";
        playReloadButton.title = "Reload";
        playButtonIcon.innerHTML = RELOAD_ICON_SVG;
        playReloadButton.setAttribute("aria-pressed", "true");
        showControlsAndResetHideTimer();

        iframe.addEventListener(
            "load",
            () => {
                focusGameIframe();
                updateVolume(volumeSlider.value);
            },
            { once: true }
        );
    });

    stopButton.addEventListener("click", () => {
        showCoverOverlay();

        const iframe = document.getElementById("gameIframe");
        const parent = iframe.parentNode;

        // Try to stop audio before destroying iframe
        try {
            if (iframe.contentWindow && iframe.contentWindow.AudioManager) {
                iframe.contentWindow.AudioManager.stopAll();
            }
        } catch (e) {
            console.warn("Failed to stop audio:", e);
        }

        setTimeout(() => {
            const newIframe = document.createElement("iframe");
            newIframe.id = "gameIframe";
            newIframe.style.cssText = "width: 100%; height: 100%; border: 0; display: block;";
            newIframe.allow = "autoplay; fullscreen";
            newIframe.allowFullscreen = true;

            parent.replaceChild(newIframe, iframe);
        }, 100);

        isPlaying = false;
        playButtonLabel.textContent = "Play";
        playReloadButton.title = "Play";
        playButtonIcon.innerHTML = PLAY_ICON_SVG;
        playReloadButton.setAttribute("aria-pressed", "false");

        clearTimeout(controlsHideTimeout);
        controlsBar.classList.remove("controls-bar--hidden");
        controlsHandle.classList.add("hidden");
        isGamepadVisible = false;
        virtualGamepad.classList.add("hidden");
        toggleGamepadButton.setAttribute("aria-pressed", "false");

        updateGameInputBlocking();
    });

    // --- Fullscreen Toggle ---
    fullscreenButton.addEventListener("click", async () => {
        if (!document.fullscreenElement) {
            try {
                await playerContainer.requestFullscreen();

                if (screen.orientation && screen.orientation.lock) {
                    try {
                        await screen.orientation.lock("landscape");
                        console.log("Screen locked to landscape");
                    } catch (err) {
                        console.warn("Orientation lock failed:", err);
                    }
                }
            } catch (e) {
                console.warn("Fullscreen request failed:", e);
            }
        } else {
            document.exitFullscreen();

            if (screen.orientation && screen.orientation.unlock) {
                try {
                    screen.orientation.unlock();
                    console.log("Screen orientation unlocked");
                } catch (err) {
                    console.warn("Orientation unlock failed:", err);
                }
            }
        }
    });

    document.addEventListener("fullscreenchange", () => {
        if (document.fullscreenElement) {
            showControlsAndResetHideTimer();
        } else {
            clearTimeout(controlsHideTimeout);
            controlsBar.classList.remove("controls-bar--hidden");
            controlsHandle.classList.add("hidden");
        }
    });

    // --- Gamepad Toggle ---
    toggleGamepadButton.addEventListener("click", () => {
        if (!isPlaying) return;

        isGamepadVisible = !isGamepadVisible;
        virtualGamepad.classList.toggle("hidden", !isGamepadVisible);
        toggleGamepadButton.setAttribute("aria-pressed", String(isGamepadVisible));

        updateGameInputBlocking();

        if (isPlaying && document.fullscreenElement) {
            showControlsAndResetHideTimer();
        }
    });

    // --- Function to Block/Unblock Game Input ---
    function updateGameInputBlocking() {
        const iframe = document.getElementById("gameIframe");
        if (!iframe) return;

        if (BLOCK_GAME_INPUT_WHEN_GAMEPAD_ACTIVE && isGamepadVisible) {
            iframe.style.pointerEvents = "none";
        } else {
            iframe.style.pointerEvents = "auto";
        }
    }

    updateGameInputBlocking();

    // --- Controls Bar Auto-hide Events ---
    controlsHandle.addEventListener("click", () => {
        showControlsAndResetHideTimer();
    });

    controlsBar.addEventListener("mouseenter", () => {
        if (isPlaying && document.fullscreenElement) {
            clearTimeout(controlsHideTimeout);
        }
    });

    controlsBar.addEventListener("mouseleave", () => {
        if (isPlaying && document.fullscreenElement) {
            clearTimeout(controlsHideTimeout);
            controlsHideTimeout = setTimeout(hideControlsBar, 3000);
        }
    });

    controlsHandle.addEventListener(
        "touchend",
        () => {
            showControlsAndResetHideTimer();
        },
        { passive: true }
    );

    let controlBarTouchActive = false;

    controlsBar.addEventListener(
        "touchstart",
        () => {
            if (isPlaying && document.fullscreenElement) {
                controlBarTouchActive = true;
                clearTimeout(controlsHideTimeout);
            }
        },
        { passive: true }
    );

    controlsBar.addEventListener(
        "touchmove",
        () => {
            if (isPlaying && document.fullscreenElement) {
                clearTimeout(controlsHideTimeout);
            }
        },
        { passive: true }
    );

    controlsBar.addEventListener(
        "touchend",
        () => {
            if (isPlaying && document.fullscreenElement) {
                controlBarTouchActive = false;
                clearTimeout(controlsHideTimeout);
                controlsHideTimeout = setTimeout(hideControlsBar, 3000);
            }
        },
        { passive: true }
    );

    controlsBar.addEventListener(
        "touchcancel",
        () => {
            if (isPlaying && document.fullscreenElement) {
                controlBarTouchActive = false;
                clearTimeout(controlsHideTimeout);
                controlsHideTimeout = setTimeout(hideControlsBar, 3000);
            }
        },
        { passive: true }
    );

    // --- Volume Control Logic ---
    function updateVolume(volume) {
        const numericVolume = parseInt(volume, 10);

        if (numericVolume > 0) {
            lastKnownVolume = numericVolume;
        }

        volumeSlider.value = numericVolume;

        // Direct access to game iframe (same-origin via srcdoc)
        try {
            const iframe = document.getElementById("gameIframe");
            if (iframe && iframe.contentWindow) {
                const gameWindow = iframe.contentWindow;

                // Try to access AudioManager directly (RPG Maker MV/MZ)
                if (gameWindow.AudioManager) {
                    gameWindow.AudioManager.masterVolume = numericVolume / 100;
                }
                // Fallback for older RPG Maker versions
                else if (gameWindow.WebAudio && gameWindow.WebAudio._masterVolume !== undefined) {
                    gameWindow.WebAudio._masterVolume = numericVolume / 100;
                }
            }
        } catch (e) {
            console.warn("Direct volume control failed:", e);
        }

        volumeIcon.classList.toggle("hidden", numericVolume === 0);
        muteIcon.classList.toggle("hidden", numericVolume > 0);
        muteButton.title = numericVolume === 0 ? "Unmute" : "Mute";
    }

    volumeSlider.addEventListener("input", () => {
        updateVolume(volumeSlider.value);
    });

    muteButton.addEventListener("click", () => {
        const currentVolume = parseInt(volumeSlider.value, 10);
        if (currentVolume === 0) {
            updateVolume(lastKnownVolume);
        } else {
            updateVolume(0);
        }
    });

    // --- Communication with Game Iframe (Direct Access - Same Origin) ---
    function sendKeyToGame(key, isDown = true) {
        try {
            const iframe = document.getElementById("gameIframe");
            if (!iframe || !iframe.contentWindow) return;

            const gameWindow = iframe.contentWindow;

            // Direct access to RPG Maker Input system
            if (gameWindow.Input && gameWindow.Input.keyMapper) {
                const keyCodeMap = {
                    ArrowUp: 38,
                    ArrowDown: 40,
                    ArrowLeft: 37,
                    ArrowRight: 39,
                    Enter: 13,
                    Escape: 27,
                    Shift: 16,
                    Space: 32,
                    PageUp: 33,
                    PageDown: 34,
                };

                const keyCode = keyCodeMap[key];
                if (!keyCode) return;

                const buttonName = gameWindow.Input.keyMapper[keyCode];
                if (!buttonName) return;

                if (isDown) {
                    gameWindow.Input._currentState[buttonName] = true;
                } else {
                    gameWindow.Input._currentState[buttonName] = false;
                }
            }
        } catch (e) {
            console.warn("Direct key input failed:", e);
        }
    }

    // --- Virtual Gamepad Multitouch Logic ---
    let activeTouches = [];
    const pressedKeys = new Set();

    function handleTouchUpdate(event) {
        event.preventDefault();
        activeTouches = event.touches;
    }

    function processGamepadState() {
        if (!isGamepadVisible) {
            if (pressedKeys.size > 0) {
                for (const key of pressedKeys) sendKeyToGame(key, false);
                pressedKeys.clear();
                virtualGamepad.querySelectorAll("button.active").forEach((btn) => btn.classList.remove("active"));
            }
            requestAnimationFrame(processGamepadState);
            return;
        }

        const keysThisFrame = new Set();
        const buttonsToActivate = new Set();

        for (let i = 0; i < activeTouches.length; i++) {
            const touch = activeTouches[i];
            const element = document.elementFromPoint(touch.clientX, touch.clientY);
            if (!element) continue;
            const button = element.closest("button[data-key], button[data-key-diag]");
            if (!button) continue;

            if (button.dataset.keyDiag) {
                const diagonalKeys = button.dataset.keyDiag.split(",");
                diagonalKeys.forEach((key) => {
                    keysThisFrame.add(key);
                    const cardinalBtn = virtualGamepad.querySelector(`.dpad button[data-key="${key}"]`);
                    if (cardinalBtn) buttonsToActivate.add(cardinalBtn);
                });
            } else if (button.dataset.key) {
                keysThisFrame.add(button.dataset.key);
                buttonsToActivate.add(button);
            }
        }

        for (const key of pressedKeys) {
            if (!keysThisFrame.has(key)) {
                sendKeyToGame(key, false);
                pressedKeys.delete(key);
            }
        }

        for (const key of keysThisFrame) {
            if (!pressedKeys.has(key)) {
                sendKeyToGame(key, true);
                pressedKeys.add(key);
            }
        }

        virtualGamepad.querySelectorAll("button[data-key]").forEach((btn) => {
            btn.classList.toggle("active", buttonsToActivate.has(btn));
        });

        requestAnimationFrame(processGamepadState);
    }

    virtualGamepad.addEventListener("touchstart", handleTouchUpdate, { passive: false });
    virtualGamepad.addEventListener("touchmove", handleTouchUpdate, { passive: false });
    virtualGamepad.addEventListener("touchend", handleTouchUpdate, { passive: false });
    virtualGamepad.addEventListener("touchcancel", handleTouchUpdate, { passive: false });
    virtualGamepad.addEventListener("contextmenu", (ev) => ev.preventDefault());

    requestAnimationFrame(processGamepadState);

    // --- Physical Keyboard Input Forwarding ---
    const allowedKeys = [
        "ArrowUp",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight",
        "Shift",
        "Escape",
        "Enter",
        "Space",
        "PageUp",
        "PageDown",
    ];

    window.addEventListener(
        "keydown",
        (ev) => {
            if (!isPlaying || !allowedKeys.includes(ev.key)) return;
            ev.preventDefault();
            sendKeyToGame(ev.key, true);
        },
        { capture: true }
    );

    window.addEventListener(
        "keyup",
        (ev) => {
            if (!isPlaying || !allowedKeys.includes(ev.key)) return;
            ev.preventDefault();
            sendKeyToGame(ev.key, false);
        },
        { capture: true }
    );

    // --- Utility Functions ---
    function focusGameIframe() {
        try {
            const iframe = document.getElementById("gameIframe");
            if (iframe && iframe.contentWindow) {
                iframe.contentWindow.focus();
            }
        } catch (e) {
            // Cross-origin restrictions expected
        }
    }

    gameScreen.addEventListener("click", focusGameIframe);
})();

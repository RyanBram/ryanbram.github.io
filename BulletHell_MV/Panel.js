// Self-invoking anonymous function to encapsulate the script and avoid global scope pollution.
(function () {
    // --- DOM Element References ---
    const gameIframe = document.getElementById("gameIframe");
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

    // --- State Variables ---
    let isPlaying = false;
    let isGamepadVisible = false;
    let controlsHideTimeout = null;
    let lastKnownVolume = 100;

    // --- Constants ---
    const COVER_URL = "./cover.html";
    const GAME_URL = "./game.html";
    const PLAY_ICON_SVG = `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>`;
    const RELOAD_ICON_SVG = `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>`;

    // --- Controls Bar Visibility Logic ---

    // Hides the control bar, typically in fullscreen mode after a delay.
    function hideControlsBar() {
        if (isPlaying && document.fullscreenElement) {
            controlsBar.classList.add("controls-bar--hidden");
            controlsHandle.classList.remove("hidden");
        }
    }

    // Shows the control bar and resets the auto-hide timer.
    function showControlsAndResetHideTimer() {
        controlsHandle.classList.add("hidden");
        controlsBar.classList.remove("controls-bar--hidden");
        clearTimeout(controlsHideTimeout);
        if (isPlaying && document.fullscreenElement) {
            controlsHideTimeout = setTimeout(hideControlsBar, 3000); // Hide after 3 seconds of inactivity.
        }
    }

    // --- Core Player Event Listeners ---

    // Handles the Play/Reload button click.
    playReloadButton.addEventListener("click", () => {
        gameIframe.src = GAME_URL; // Load or reload the game.
        if (!isPlaying) {
            isPlaying = true;
            playButtonLabel.textContent = "Reload";
            playReloadButton.title = "Reload";
            playButtonIcon.innerHTML = RELOAD_ICON_SVG;
            playReloadButton.setAttribute("aria-pressed", "true");
            showControlsAndResetHideTimer(); // Start the auto-hide logic.
        }
        gameIframe.addEventListener(
            "load",
            () => {
                focusGameIframe();
                // Set and send the initial volume value to the game.
                updateVolume(volumeSlider.value);
            },
            { once: true }
        );
    });

    // Handles the Stop button click.
    stopButton.addEventListener("click", () => {
        gameIframe.src = COVER_URL;
        isPlaying = false;
        playButtonLabel.textContent = "Play";
        playReloadButton.title = "Play";
        playButtonIcon.innerHTML = PLAY_ICON_SVG;
        playReloadButton.setAttribute("aria-pressed", "false");
        postMessageToGame({ type: "player-stop" });

        // Ensure controls are visible and the hide timer is cleared when stopping.
        clearTimeout(controlsHideTimeout);
        controlsBar.classList.remove("controls-bar--hidden");
        controlsHandle.classList.add("hidden");
        isGamepadVisible = false;
        virtualGamepad.classList.add("hidden");
        toggleGamepadButton.setAttribute("aria-pressed", "false");
    });

    // --- Fullscreen and Gamepad Toggle ---

    // Handles the Fullscreen button click.
    fullscreenButton.addEventListener("click", async () => {
        if (!document.fullscreenElement) {
            try {
                await playerContainer.requestFullscreen();
            } catch (e) {
                console.warn("Fullscreen request failed:", e);
            }
        } else {
            document.exitFullscreen();
        }
    });

    // Adjusts control bar visibility when fullscreen state changes.
    document.addEventListener("fullscreenchange", () => {
        if (document.fullscreenElement) {
            showControlsAndResetHideTimer(); // Entered fullscreen, start hide timer if playing.
        } else {
            clearTimeout(controlsHideTimeout); // Exited fullscreen, cancel timer and show controls.
            controlsBar.classList.remove("controls-bar--hidden");
            controlsHandle.classList.add("hidden");
        }
    });

    // Toggles the visibility of the virtual gamepad.
    toggleGamepadButton.addEventListener("click", () => {
        if (!isPlaying) return; // <-- TAMBAHKAN BARIS INI

        isGamepadVisible = !isGamepadVisible;
        virtualGamepad.classList.toggle("hidden", !isGamepadVisible);
        toggleGamepadButton.setAttribute("aria-pressed", String(isGamepadVisible));
    });

    // --- Controls Bar Mouse Events for Auto-hide ---
    controlsHandle.addEventListener("click", showControlsAndResetHideTimer);

    controlsBar.addEventListener("mouseenter", () => {
        if (isPlaying && document.fullscreenElement) {
            clearTimeout(controlsHideTimeout); // Pause auto-hide on hover.
        }
    });

    controlsBar.addEventListener("mouseleave", () => {
        if (isPlaying && document.fullscreenElement) {
            clearTimeout(controlsHideTimeout); // Reset timer on mouse leave.
            controlsHideTimeout = setTimeout(hideControlsBar, 3000);
        }
    });

    // --- Volume Control Logic ---

    // Updates volume, UI elements, and sends a message to the game.
    function updateVolume(volume) {
        const numericVolume = parseInt(volume, 10);
        // Store the last non-zero volume for unmuting.
        if (numericVolume > 0) {
            lastKnownVolume = numericVolume;
        }
        volumeSlider.value = numericVolume;
        postMessageToGame({ type: "volume", value: numericVolume });
        // Toggle mute/unmute icons.
        volumeIcon.classList.toggle("hidden", numericVolume === 0);
        muteIcon.classList.toggle("hidden", numericVolume > 0);
        muteButton.title = numericVolume === 0 ? "Unmute" : "Mute";
    }

    // Listener for the volume slider input.
    volumeSlider.addEventListener("input", () => {
        updateVolume(volumeSlider.value);
    });

    // Listener for the mute button click.
    muteButton.addEventListener("click", () => {
        const currentVolume = parseInt(volumeSlider.value, 10);
        if (currentVolume === 0) {
            updateVolume(lastKnownVolume); // Unmute to the last known volume.
        } else {
            updateVolume(0); // Mute the volume.
        }
    });

    // --- Communication with Game Iframe ---

    // Sends a message to the game iframe via postMessage.
    function postMessageToGame(message) {
        try {
            gameIframe.contentWindow.postMessage(message, "*");
        } catch (e) {
            console.warn("postMessage to iframe failed:", e);
        }
    }

    // Dispatches a synthetic KeyboardEvent to the game iframe.
    function dispatchKeyEventToIframe(key, eventType = "keydown") {
        try {
            const contentWin = gameIframe.contentWindow;
            if (!contentWin) return;
            const keyboardEvent = new KeyboardEvent(eventType, { key, bubbles: true });
            contentWin.dispatchEvent(keyboardEvent);
        } catch (e) {
            // This can fail due to cross-origin restrictions, which is expected.
        }
    }

    // Primary function to send a key event, using both postMessage and dispatchEvent.
    function sendKeyEvent(key, isDown = true) {
        const eventType = isDown ? "keydown" : "keyup";
        postMessageToGame({ type: "key", key, keyEvent: eventType });
        dispatchKeyEventToIframe(key, eventType);
    }

    // --- Virtual Gamepad Multitouch Logic ---
    let activeTouches = [];
    const pressedKeys = new Set(); // Tracks keys currently held down by touch.

    // Updates the list of active touches.
    function handleTouchUpdate(event) {
        event.preventDefault();
        activeTouches = event.touches;
    }

    // Main loop to process gamepad state based on active touches.
    function processGamepadState() {
        // If gamepad is not visible, release all keys and stop processing.
        if (!isGamepadVisible) {
            if (pressedKeys.size > 0) {
                for (const key of pressedKeys) sendKeyEvent(key, false);
                pressedKeys.clear();
                virtualGamepad.querySelectorAll("button.active").forEach((btn) => btn.classList.remove("active"));
            }
            requestAnimationFrame(processGamepadState);
            return;
        }

        const keysThisFrame = new Set(); // Keys that should be pressed this frame.
        const buttonsToActivate = new Set(); // UI buttons to highlight.

        // Determine which buttons are being touched.
        for (let i = 0; i < activeTouches.length; i++) {
            const touch = activeTouches[i];
            const element = document.elementFromPoint(touch.clientX, touch.clientY);
            if (!element) continue;
            const button = element.closest("button[data-key], button[data-key-diag]");
            if (!button) continue;

            // Handle diagonal buttons by adding both cardinal directions.
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

        // Release keys that are no longer touched.
        for (const key of pressedKeys) {
            if (!keysThisFrame.has(key)) {
                sendKeyEvent(key, false);
                pressedKeys.delete(key);
            }
        }

        // Press new keys that are now touched.
        for (const key of keysThisFrame) {
            if (!pressedKeys.has(key)) {
                sendKeyEvent(key, true);
                pressedKeys.add(key);
            }
        }

        // Update the visual state (highlight) of the gamepad buttons.
        virtualGamepad.querySelectorAll("button[data-key]").forEach((btn) => {
            btn.classList.toggle("active", buttonsToActivate.has(btn));
        });

        requestAnimationFrame(processGamepadState); // Continue the loop.
    }

    // Attach touch event listeners to the gamepad area.
    virtualGamepad.addEventListener("touchstart", handleTouchUpdate, { passive: false });
    virtualGamepad.addEventListener("touchmove", handleTouchUpdate, { passive: false });
    virtualGamepad.addEventListener("touchend", handleTouchUpdate, { passive: false });
    virtualGamepad.addEventListener("touchcancel", handleTouchUpdate, { passive: false });
    virtualGamepad.addEventListener("contextmenu", (ev) => ev.preventDefault()); // Prevent right-click menu.

    requestAnimationFrame(processGamepadState); // Start the gamepad processing loop.

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

    // Capture keydown events and forward them to the game.
    window.addEventListener(
        "keydown",
        (ev) => {
            if (!isPlaying || !allowedKeys.includes(ev.key)) return;
            ev.preventDefault();
            sendKeyEvent(ev.key, true);
        },
        { capture: true }
    );

    // Capture keyup events and forward them to the game.
    window.addEventListener(
        "keyup",
        (ev) => {
            if (!isPlaying || !allowedKeys.includes(ev.key)) return;
            ev.preventDefault();
            sendKeyEvent(ev.key, false);
        },
        { capture: true }
    );

    // --- Utility Functions ---
    // Attempts to focus the game iframe to allow direct keyboard input.
    function focusGameIframe() {
        try {
            gameIframe.contentWindow.focus();
        } catch (e) {
            // This can fail due to cross-origin restrictions, which is expected.
        }
    }

    // Add a click listener to the screen area to focus the iframe.
    document.getElementById("gameScreen").addEventListener("click", focusGameIframe);
})();

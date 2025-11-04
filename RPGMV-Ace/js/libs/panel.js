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
    const coverArtBackground = document.getElementById("coverArtBackground");

    // --- State Variables ---
    let isPlaying = false;
    let isGamepadVisible = false;
    let controlsHideTimeout = null;
    let lastKnownVolume = 100;

    // --- Configuration ---
    // Set to true to block mouse/touch input to game when virtual gamepad is active
    // Set to false to allow both virtual gamepad and gamepad input simultaneously
    const BLOCK_GAME_INPUT_WHEN_GAMEPAD_ACTIVE = true;
    const GAME_PATH = "./index.html";
    const COVER_IMAGE_FORMATS = ["cover.png", "cover.jpg", "cover.jpeg", "cover.webp", "cover.gif"];

    // --- Constants ---
    const PLAY_ICON_SVG = `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>`;
    const RELOAD_ICON_SVG = `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>`;

    // --- Cover Art Loading (NW.js compatible version) ---
    function loadCoverArt() {
        let currentFormatIndex = 0;

        // Debug: Log environment
        console.log("Loading cover art...");
        console.log("NW.js detected:", typeof nw !== "undefined" && nw.App);

        function tryLoadNextFormat() {
            if (currentFormatIndex >= COVER_IMAGE_FORMATS.length) {
                // No cover art found, use placeholder
                console.warn("No cover art found after trying all formats");
                coverArtBackground.classList.add("no-image");
                return;
            }

            // Get absolute path for better NW.js compatibility
            const coverFileName = COVER_IMAGE_FORMATS[currentFormatIndex];
            const coverPath = getCoverPath(coverFileName);

            console.log(`Trying to load: ${coverFileName} from ${coverPath}`);

            const testImage = new Image();

            testImage.onload = () => {
                console.log(`✓ Cover loaded successfully: ${coverFileName}`);
                // Use background-image instead of img src for better compatibility
                coverArtBackground.style.backgroundImage = `url("${coverPath}")`;
                coverArtBackground.classList.remove("no-image");
            };

            testImage.onerror = () => {
                console.log(`✗ Failed to load: ${coverFileName}, trying next...`);
                currentFormatIndex++;
                tryLoadNextFormat();
            };

            testImage.src = coverPath;
        }

        tryLoadNextFormat();
    }

    // Helper function to get proper cover path (works in both web and NW.js)
    function getCoverPath(filename) {
        // Check if running in NW.js environment
        if (typeof nw !== "undefined" && nw.App) {
            // NW.js: Simple and reliable approach
            try {
                // Just use relative path - NW.js handles it correctly
                // when the HTML file is in the same directory as the cover
                return filename; // Remove the ./ prefix for NW.js
            } catch (e) {
                console.error("NW.js: Error getting cover path:", e);
                return "./" + filename;
            }
        } else {
            // Regular web browser: use relative path with ./
            return "./" + filename;
        }
    }

    // Show cover overlay
    function showCoverOverlay() {
        gameCoverOverlay.classList.remove("hidden");
    }

    // Hide cover overlay
    function hideCoverOverlay() {
        gameCoverOverlay.classList.add("hidden");
    }

    // Initialize cover art on page load
    loadCoverArt();

    // --- Icon Loading (optional, removes link if not found) ---
    function loadIcon() {
        const iconPath = getCoverPath("icon/icon.png");

        console.log("Loading icon...");

        const testImage = new Image();

        testImage.onload = () => {
            console.log("✓ Icon loaded successfully");
        };

        testImage.onerror = () => {
            console.log("✗ Icon not found, removing icon links");
            // Remove icon links to avoid browser errors
            const iconLinks = document.querySelectorAll('link[rel="icon"], link[rel="apple-touch-icon"]');
            iconLinks.forEach((link) => link.remove());
        };

        testImage.src = iconPath;
    }

    // Initialize icon check on page load
    loadIcon();

    // --- Game Title Loading (from System.json) ---
    function loadGameTitle() {
        fetch("./data/System.json")
            .then((response) => {
                if (!response.ok) throw new Error("Network response was not ok");
                return response.json();
            })
            .then((data) => {
                if (data.gameTitle) {
                    document.title = data.gameTitle;
                    console.log("Game title loaded:", data.gameTitle);
                } else {
                    document.title = "HTML5 Player";
                    console.log("No gameTitle found, using default");
                }
            })
            .catch((error) => {
                console.warn("Failed to load System.json, using default title:", error);
                document.title = "HTML5 Player";
            });
    }

    // Initialize game title on page load
    loadGameTitle();

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
        hideCoverOverlay(); // Hide cover overlay when playing
        const iframe = document.getElementById("gameIframe");
        iframe.src = GAME_PATH; // Load or reload the game.
        if (!isPlaying) {
            isPlaying = true;
            playButtonLabel.textContent = "Reload";
            playReloadButton.title = "Reload";
            playButtonIcon.innerHTML = RELOAD_ICON_SVG;
            playReloadButton.setAttribute("aria-pressed", "true");
            showControlsAndResetHideTimer(); // Start the auto-hide logic.
        }
        iframe.addEventListener(
            "load",
            () => {
                focusGameIframe();
                // Set and send the initial volume value to the game.
                updateVolume(volumeSlider.value);
            },
            { once: true }
        );
    });

    // Play button on overlay
    playOverlayButton.addEventListener("click", () => {
        hideCoverOverlay();
        const iframe = document.getElementById("gameIframe");
        iframe.src = GAME_PATH;
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
    }); // Handles the Stop button click.
    stopButton.addEventListener("click", () => {
        showCoverOverlay(); // Show cover overlay

        // Force cleanup: Remove and recreate iframe for complete memory cleanup
        const iframe = document.getElementById("gameIframe");
        const parent = iframe.parentNode;

        // Send stop message before destroying (game can cleanup)
        postMessageToGame({ type: "player-stop" });

        // Small delay to let game receive stop message
        setTimeout(() => {
            // Create new iframe
            const newIframe = document.createElement("iframe");
            newIframe.id = "gameIframe";
            newIframe.className = "game-iframe";
            newIframe.src = "about:blank";
            newIframe.allowFullscreen = true;

            // Replace old iframe with new one (forces complete cleanup)
            parent.replaceChild(newIframe, iframe);
        }, 100);

        isPlaying = false;
        playButtonLabel.textContent = "Play";
        playReloadButton.title = "Play";
        playButtonIcon.innerHTML = RELOAD_ICON_SVG;
        playReloadButton.setAttribute("aria-pressed", "false");

        // Ensure controls are visible and the hide timer is cleared when stopping.
        clearTimeout(controlsHideTimeout);
        controlsBar.classList.remove("controls-bar--hidden");
        controlsHandle.classList.add("hidden");
        isGamepadVisible = false;
        virtualGamepad.classList.add("hidden");
        toggleGamepadButton.setAttribute("aria-pressed", "false");

        // Reset game input blocking when stopping
        updateGameInputBlocking();
    });

    // --- Fullscreen and Gamepad Toggle ---

    // Handles the Fullscreen button click.
    fullscreenButton.addEventListener("click", async () => {
        if (!document.fullscreenElement) {
            try {
                await playerContainer.requestFullscreen();

                // Force landscape orientation on mobile devices
                if (screen.orientation && screen.orientation.lock) {
                    try {
                        await screen.orientation.lock("landscape");
                        console.log("Screen locked to landscape");
                    } catch (err) {
                        console.warn("Orientation lock failed (may need user gesture):", err);
                    }
                }
            } catch (e) {
                console.warn("Fullscreen request failed:", e);
            }
        } else {
            document.exitFullscreen();

            // Unlock orientation when exiting fullscreen
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

    // Adjusts control bar visibility when fullscreen state changes.
    document.addEventListener("fullscreenchange", () => {
        if (document.fullscreenElement) {
            // Entered fullscreen
            showControlsAndResetHideTimer();
        } else {
            // Exited fullscreen
            clearTimeout(controlsHideTimeout);
            controlsBar.classList.remove("controls-bar--hidden");
            controlsHandle.classList.add("hidden");
        }
    });

    // Toggles the visibility of the virtual gamepad.
    toggleGamepadButton.addEventListener("click", () => {
        if (!isPlaying) return;

        isGamepadVisible = !isGamepadVisible;
        virtualGamepad.classList.toggle("hidden", !isGamepadVisible);
        toggleGamepadButton.setAttribute("aria-pressed", String(isGamepadVisible));

        // Block or unblock game input based on configuration
        updateGameInputBlocking();

        // Reset auto-hide timer after toggling gamepad in fullscreen
        if (isPlaying && document.fullscreenElement) {
            showControlsAndResetHideTimer();
        }
    });

    // --- Function to Block/Unblock Game Input ---
    function updateGameInputBlocking() {
        const iframe = document.getElementById("gameIframe");
        if (!iframe) return;

        if (BLOCK_GAME_INPUT_WHEN_GAMEPAD_ACTIVE && isGamepadVisible) {
            // Block mouse and touch input to game iframe
            iframe.style.pointerEvents = "none";
        } else {
            // Allow mouse and touch input to game iframe
            iframe.style.pointerEvents = "auto";
        }
    }

    // Initialize blocking state on page load
    updateGameInputBlocking();

    // --- Controls Bar Mouse Events for Auto-hide ---
    // Only handle can show controls (mouse or touch)
    controlsHandle.addEventListener("click", () => {
        showControlsAndResetHideTimer();
    });

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

    // --- Controls Bar Touch Events for Auto-hide ---
    // Only handle can show controls on touch (game screen touch is blocked to avoid interference)

    // Touch on handle to show controls
    controlsHandle.addEventListener(
        "touchend",
        () => {
            showControlsAndResetHideTimer();
        },
        { passive: true }
    );

    // Touch on control bar itself pauses auto-hide completely until touch ends
    let controlBarTouchActive = false;

    controlsBar.addEventListener(
        "touchstart",
        () => {
            if (isPlaying && document.fullscreenElement) {
                controlBarTouchActive = true;
                clearTimeout(controlsHideTimeout); // Pause auto-hide while touching.
            }
        },
        { passive: true }
    );

    controlsBar.addEventListener(
        "touchmove",
        () => {
            if (isPlaying && document.fullscreenElement) {
                // Keep clearing timeout while dragging (e.g., volume slider)
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
                clearTimeout(controlsHideTimeout); // Reset timer after touch ends.
                controlsHideTimeout = setTimeout(hideControlsBar, 3000);
            }
        },
        { passive: true }
    );

    // Also handle touchcancel in case touch is interrupted
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
            const iframe = document.getElementById("gameIframe");
            if (iframe && iframe.contentWindow) {
                iframe.contentWindow.postMessage(message, "*");
            }
        } catch (e) {
            console.warn("postMessage to iframe failed:", e);
        }
    }

    // Dispatches a synthetic KeyboardEvent to the game iframe.
    function dispatchKeyEventToIframe(key, eventType = "keydown") {
        try {
            const iframe = document.getElementById("gameIframe");
            if (!iframe) return;
            const contentWin = iframe.contentWindow;
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
            const iframe = document.getElementById("gameIframe");
            if (iframe && iframe.contentWindow) {
                iframe.contentWindow.focus();
            }
        } catch (e) {
            // This can fail due to cross-origin restrictions, which is expected.
        }
    }

    // Add a click listener to the screen area to focus the iframe.
    document.getElementById("gameScreen").addEventListener("click", focusGameIframe);
})();

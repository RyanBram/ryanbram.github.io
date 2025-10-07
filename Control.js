            window.addEventListener("message", (event) => {
                const { type, key, keyEvent, value } = event.data;

                if (type === "key" && key && keyEvent) {
                    if (!window.Input || !window.Input.keyMapper) {
                        return;
                    }

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

                    const buttonName = window.Input.keyMapper[keyCode];
                    if (!buttonName) return;

                    if (keyEvent === "keydown") {
                        window.Input._currentState[buttonName] = true;
                    } else if (keyEvent === "keyup") {
                        window.Input._currentState[buttonName] = false;
                    }
                } else if (type === "volume") {
                    if (window.AudioManager) {
                        window.AudioManager.masterVolume = parseInt(value, 10) / 100;
                    }
                }
            });
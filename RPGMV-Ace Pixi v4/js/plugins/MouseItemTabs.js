/*:
 * @plugindesc Mengubah alur Scene Item untuk mouse & touch agar lebih ringkas (v1.3).
 * @author Gemini
 * @target MV
 *
 * @help
 * Plugin ini (MouseItemTabs.js) mengubah alur Scene_Item khusus untuk
 * pengguna mouse dan touch agar lebih intuitif seperti "tab".
 *
 * v1.3: Memperbaiki bug di mana mengklik Kategori dengan mouse/touch
 * memutar dua SE (Cursor dan OK) sekaligus. Sekarang, ia hanya
 * memutar SE Cursor. Alur keyboard tetap memutar SE OK.
 *
 * v1.2: Memperbaiki bug di mana Kategori tidak bisa diklik (atau tidak
 * memicu update) setelah List Item diklik.
 */

(function () {
    // --- Bagian 1: Fungsi Generik untuk Memproses Sentuhan Meski Jendela Non-Aktif ---

    var processTouchAlways = function () {
        if (this.isOpen() && this.visible) {
            if (TouchInput.isTriggered() && this.isTouchedInsideFrame()) {
                this._touching = true;
                this.onTouch(true);
            } else if (TouchInput.isCancelled()) {
                if (this.isCancelEnabled()) {
                    this.processCancel();
                }
            } else if (this._touching) {
                if (TouchInput.isPressed()) {
                    this.onTouch(false);
                } else {
                    this._touching = false;
                }
            }
        } else {
            this._touching = false;
        }
    };

    Window_ItemList.prototype.processTouchAlways = processTouchAlways;
    Window_ItemCategory.prototype.processTouchAlways = processTouchAlways;

    // --- Bagian 2: Scene_Item.update (Dimodifikasi untuk v1.6 - Metode Deteksi Robust) ---

    var _Scene_Item_update = Scene_Item.prototype.update;
    Scene_Item.prototype.update = function () {
        _Scene_Item_update.call(this); // Panggil fungsi update asli

        // --- Logika dari v1.2 (Tab Kategori/Item) ---
        if (this._categoryWindow && this._itemWindow) {
            if (this._categoryWindow.active) {
                this._itemWindow.processTouchAlways();
            } else if (this._itemWindow.active) {
                this._categoryWindow.processTouchAlways();
            }
        }

        // --- Logika Tambahan v1.6 (Klik di luar Aktor = Cancel, metode robust) ---
        // Cek jika jendela aktor aktif dan ada input sentuhan/mouse
        if (this._actorWindow && this._actorWindow.active && TouchInput.isTriggered()) {
            // --- INI PERBAIKANNYA ---
            // Kita tidak perlu menghitung (x, y) secara manual.
            // Kita cukup tanyakan pada jendela aktor apakah sentuhan
            // (yang sudah dikonversi) ada DI DALAM bingkainya.

            if (!this._actorWindow.isTouchedInsideFrame()) {
                // Jika TIDAK di dalam, berarti sentuhan ada DI LUAR.
                // Ini jauh lebih akurat dan kompatibel dengan plugin skala.
                SoundManager.playCancel();
                this.onActorCancel();
            }
        }
    };

    // --- Bagian 3: Logika "Tab" (OK Handler untuk Kategori) ---
    // (Modifikasi v1.3: Mencegah 'OK' SE saat disentuh)

    // Alias fungsi 'processOk' yang asli (dari Window_Command)
    var _Window_ItemCategory_processOk_original = Window_ItemCategory.prototype.processOk;

    // Tulis ulang (overwrite) 'processOk' untuk Window_ItemCategory
    Window_ItemCategory.prototype.processOk = function () {
        // Cek apakah ini dipicu oleh sentuhan
        // '_touching' adalah flag internal dari Window_Selectable
        var isTouchEvent = TouchInput.isTriggered() || this._touching;

        if (isTouchEvent) {
            // --- Ini adalah alur Mouse/Touch ---
            this._isTouchOk = true; // Set flag untuk Scene_Item

            // Jalankan logika 'processOk' dari Window_Command secara manual,
            // TAPI HILANGKAN 'this.playOkSound()'.
            if (this.isCurrentItemEnabled()) {
                // this.playOkSound(); // <-- SENGAJA DIHILANGKAN (INI PERBAIKANNYA)
                this.updateInputData();
                this.deactivate();
                this.callOkHandler(); // Ini akan memanggil Scene_Item.onCategoryOk
            } else {
                this.playBuzzerSound();
            }

            // Reset flag setelah selesai
            this._isTouchOk = false;
        } else {
            // --- Ini adalah alur Keyboard ---
            this._isTouchOk = false; // Pastikan flag false

            // Panggil fungsi 'processOk' yang asli, yang akan
            // memainkan suara OK dan menjalankan alur keyboard.
            _Window_ItemCategory_processOk_original.call(this);
        }
    };

    // Alias 'onCategoryOk' di Scene_Item (Sama seperti v1.2)
    // Ini membaca flag '_isTouchOk' yang di-set di atas.
    var _Scene_Item_onCategoryOk = Scene_Item.prototype.onCategoryOk;
    Scene_Item.prototype.onCategoryOk = function () {
        if (this._categoryWindow && this._categoryWindow._isTouchOk) {
            // Perilaku Mouse/Touch:
            this._itemWindow.setCategory(this._categoryWindow.currentExt());
            this._itemWindow.select(0);
            this._categoryWindow.activate();
            this._itemWindow.deactivate();
        } else {
            // Perilaku Keyboard (Original):
            _Scene_Item_onCategoryOk.call(this);
        }
    };

    // --- Bagian 4: Logika "Aktivasi & Paksa OK" (onTouch Handlers) ---
    // (Tidak berubah dari v1.2)

    // onTouch untuk Window_ItemList (Ini hanya untuk "merebut" fokus)
    var _Window_ItemList_onTouch = Window_ItemList.prototype.onTouch;
    Window_ItemList.prototype.onTouch = function (triggered) {
        if (!this.active && triggered && this.isTouchedInsideFrame()) {
            var x = this.canvasToLocalX(TouchInput.x);
            var y = this.canvasToLocalY(TouchInput.y);
            var hitIndex = this.hitTest(x, y);
            if (hitIndex >= 0) {
                this.activate();
                if (SceneManager._scene && SceneManager._scene._categoryWindow) {
                    SceneManager._scene._categoryWindow.deactivate();
                }
            }
        }
        _Window_ItemList_onTouch.call(this, triggered);
    };

    // onTouch untuk Window_ItemCategory
    var _Window_ItemCategory_onTouch = Window_ItemCategory.prototype.onTouch;
    Window_ItemCategory.prototype.onTouch = function (triggered) {
        // 1. Jalankan logika onTouch asli (ini akan memilih item DAN memutar SE CURSOR)
        _Window_ItemCategory_onTouch.call(this, triggered);

        // 2. Sekarang, cek apakah ini adalah klik 'triggered'
        if (this.isTouchedInsideFrame() && triggered && this.isOkEnabled()) {
            var x = this.canvasToLocalX(TouchInput.x);
            var y = this.canvasToLocalY(TouchInput.y);
            var hitIndex = this.hitTest(x, y);

            if (hitIndex >= 0) {
                // 3. PAKSA panggil processOk()
                // (yang sekarang sudah dimodifikasi di Bagian 3)
                this.processOk();
            }
        }
    };
})();

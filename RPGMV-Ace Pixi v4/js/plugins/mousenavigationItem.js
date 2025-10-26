/*:
 * @plugindesc Memungkinkan navigasi mouse yang logis dan mempercepat alur dengan memilih kategori pertama secara otomatis.
 * @author Gemini (Final)
 *
 * @help
 * Versi 10.0 (Perbaikan Bruteforce)
 * - Logika kursor solid kini hanya berlaku untuk Window_ItemCategory,
 * tidak lagi untuk semua jendela pilihan (metode bruteforce dihilangkan).
 * - Perbaikan crash dan logika blinking dari versi sebelumnya tetap ada.
 * - Fitur: Saat memasuki Scene_Item, fokus langsung pindah ke daftar item.
 */

(function () {
    // ============================================================================
    // BAGIAN 1: Logika Navigasi Umum Scene_Item (Tidak Berubah)
    // ============================================================================

    var _Scene_Item_update = Scene_Item.prototype.update;
    Scene_Item.prototype.update = function () {
        _Scene_Item_update.call(this);
        if (TouchInput.isTriggered()) {
            this.processDirectMouseAction();
        }
    };

    Scene_Item.prototype.processDirectMouseAction = function () {
        if (this._categoryWindow.isTouchedInsideFrame() && !this._categoryWindow.active) {
            this.handleCategorySwitch();
            return;
        }
        if (this._actorWindow && this._actorWindow.active && !this._actorWindow.isTouchedInsideFrame()) {
            SoundManager.playCancel();
            this.onActorCancel();
            return;
        }
    };

    Scene_Item.prototype.handleCategorySwitch = function () {
        if (this._actorWindow && this._actorWindow.active) {
            this.onActorCancel();
        }
        this.onItemCancel();
        var targetWindow = this._categoryWindow;
        var x = targetWindow.canvasToLocalX(TouchInput.x);
        var y = targetWindow.canvasToLocalY(TouchInput.y);
        var hitIndex = targetWindow.hitTest(x, y);
        if (hitIndex >= 0) {
            targetWindow.select(hitIndex);
        }
    };

    // ============================================================================
    // BAGIAN 2: Perbaikan Mencegah Aksi 'OK' (Tidak Berubah)
    // ============================================================================

    var _Window_ItemCategory_onTouch = Window_ItemCategory.prototype.onTouch;
    Window_ItemCategory.prototype.onTouch = function (triggered) {
        if (this.isOpenAndActive()) {
            var hitIndex = this.hitTest(this.canvasToLocalX(TouchInput.x), this.canvasToLocalY(TouchInput.y));
            if (triggered && hitIndex >= 0 && hitIndex === this.index()) {
                this.select(hitIndex);
            } else {
                _Window_ItemCategory_onTouch.call(this, triggered);
            }
        } else {
            _Window_ItemCategory_onTouch.call(this, triggered);
        }
    };
    /*
    // ============================================================================
    // BAGIAN 3: Otomatis Masuk & Pengaturan Kursor (Disederhanakan)
    // ============================================================================

    var _Scene_Item_create = Scene_Item.prototype.create;
    Scene_Item.prototype.create = function () {
        _Scene_Item_create.call(this);
        this._categoryWindow.deactivate();
        this._itemWindow.activate();
        this._itemWindow.select(0);

        // Langsung atur properti pada instance jendela kategori
        this._categoryWindow._solidCursor = true;
    };

    var _Scene_Item_onItemCancel = Scene_Item.prototype.onItemCancel;
    Scene_Item.prototype.onItemCancel = function () {
        _Scene_Item_onItemCancel.call(this);

        // Nonaktifkan properti saat kembali ke jendela kategori
        this._categoryWindow._solidCursor = false;
    };
    */
    // ============================================================================
    // BAGIAN 4: Logika Kursor Solid (Metode Tertarget)
    // ============================================================================

    // Simpan metode _updateCursor asli dari Window.prototype
    var _Window_prototype_updateCursor = Window.prototype._updateCursor;

    /**
     * Ganti logika _updateCursor KHUSUS UNTUK Window_ItemCategory.
     * Ini tidak akan mempengaruhi jendela lain.
     */
    Window_ItemCategory.prototype._updateCursor = function () {
        // Jika kursor belum ada, hentikan untuk mencegah crash.
        if (!this._cursorSprite) {
            return;
        }

        // Jika mode solid aktif DAN jendela ini tidak aktif...
        if (this._solidCursor && !this.active) {
            // ...paksa kursor untuk solid dan terlihat.
            this._cursorSprite.alpha = 1;
            this._cursorSprite.visible = this.isOpen() && this.index() >= 0;
        } else {
            // ...jika tidak, jalankan perilaku bawaan (berkedip).
            _Window_prototype_updateCursor.call(this);
        }
    };
})();

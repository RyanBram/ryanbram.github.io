//=============================================================================
// Proper_Hybrid_ItemWindows_v3.js
//=============================================================================
// Memberikan alur navigasi terpisah untuk keyboard dan mouse di Scene_Item.
// Versi ini memperbaiki error 'undefined' dan menstabilkan logika.
//=============================================================================

/*:
 * @target MV MZ
 * @plugindesc Memberikan alur navigasi yang berbeda untuk keyboard dan mouse di Scene_Item.
 * @author [Nama Anda]
 *
 * @help [version 3.0.0]
 * Plugin ini untuk RPG Maker MV dan MZ.
 *
 * FITUR:
 * - Pengguna Keyboard:
 * - Pilih kategori, tekan OK/Enter untuk pindah ke daftar item.
 * - Tekan Cancel dari daftar item untuk kembali ke pemilihan kategori.
 * - Alur ini terasa alami dan sesuai standar RPG Maker.
 *
 * - Pengguna Mouse/Sentuh:
 * - Dapat mengklik kategori atau item kapan saja tanpa ada jendela yang terkunci.
 * - Mengklik kategori akan langsung memperbarui daftar item.
 *
 */

(() => {
    "use strict";

    //-------------------------------------------------------------------------
    // Window_ItemCategory
    //-------------------------------------------------------------------------

    // Selalu perbarui item list berdasarkan kategori yang dipilih.
    const _Window_ItemCategory_update = Window_ItemCategory.prototype.update;
    Window_ItemCategory.prototype.update = function () {
        _Window_ItemCategory_update.apply(this, arguments);
        if (this._itemWindow) {
            this._itemWindow.setCategory(this.currentSymbol());
        }
    };

    // Logika khusus saat jendela ini disentuh/di-klik.
    const _Window_ItemCategory_processTouch = Window_ItemCategory.prototype.processTouch;
    Window_ItemCategory.prototype.processTouch = function () {
        if (this.isOpenAndActive() && TouchInput.isTriggered()) {
            const lastIndex = this.index();
            _Window_ItemCategory_processTouch.apply(this, arguments);

            if (this.index() !== lastIndex) {
                // Masuk ke "Mode Mouse": aktifkan kedua jendela
                this.activate();
                this._itemWindow.activate();
                if (this._itemWindow.maxItems() > 0) {
                    this._itemWindow.select(0);
                } else {
                    this.select(this.index());
                }
            }
        } else {
            _Window_ItemCategory_processTouch.apply(this, arguments);
        }
    };

    //-------------------------------------------------------------------------
    // Window_ItemList
    //-------------------------------------------------------------------------

    // [PERBAIKAN KUNCI #1]
    // Tambahkan metode untuk menyimpan referensi ke jendela kategori.
    Window_ItemList.prototype.setCategoryWindow = function (categoryWindow) {
        this._categoryWindow = categoryWindow;
    };

    // Logika khusus saat daftar item di-klik.
    const _Window_ItemList_processTouch = Window_ItemList.prototype.processTouch;
    Window_ItemList.prototype.processTouch = function () {
        if (this.isOpenAndActive() && TouchInput.isTriggered()) {
            // Sekarang this._categoryWindow sudah pasti terdefinisi
            if (this._categoryWindow) {
                this._categoryWindow.activate();
            }
        }
        _Window_ItemList_processTouch.apply(this, arguments);
    };

    //-------------------------------------------------------------------------
    // Scene_Item
    // Mengatur alur kerja utama.
    //-------------------------------------------------------------------------

    // Saat scene dibuat, atur untuk "Mode Keyboard"
    const _Scene_Item_create = Scene_Item.prototype.create;
    Scene_Item.prototype.create = function () {
        _Scene_Item_create.apply(this, arguments);

        // [PERBAIKAN KUNCI #2]
        // Setelah kedua jendela dibuat, kita hubungkan referensinya.
        this._itemWindow.setCategoryWindow(this._categoryWindow);
        this._categoryWindow.setItemWindow(this._itemWindow);

        // Atur state awal untuk alur keyboard
        this._itemWindow.deactivate();
        this._itemWindow.deselect();
    };

    // Handler 'cancel' dari item list sekarang akan kembali ke kategori (Mode Keyboard)
    const _Scene_Item_createItemWindow = Scene_Item.prototype.createItemWindow;
    Scene_Item.prototype.createItemWindow = function () {
        _Scene_Item_createItemWindow.apply(this, arguments);
        this._itemWindow.setHandler("cancel", this.onItemCancel.bind(this));
    };

    // Handler 'ok' dari kategori sekarang akan pindah ke daftar item (Mode Keyboard)
    Scene_Item.prototype.onCategoryOk = function () {
        if (this._itemWindow.maxItems() === 0) {
            SoundManager.playBuzzer();
            this.activateCategoryWindow(); // Tetap aktif di jendela kategori
            return;
        }
        this._categoryWindow.deactivate();
        this._itemWindow.activate();
        this._itemWindow.select(0);
    };

    // Fungsi untuk kembali dari daftar item ke kategori (Mode Keyboard)
    Scene_Item.prototype.onItemCancel = function () {
        this._itemWindow.deselect();
        this._itemWindow.deactivate();
        this._categoryWindow.activate();
    };
})();

/*:
 * @plugindesc Menyempurnakan navigasi mouse di Scene_Item, dengan logika dan visual yang konsisten.
 * @author Gemini (Final)
 *
 * @help
 * Versi 15.0
 * * PERBAIKAN FINAL: Mengintegrasikan kembali logika dari versi awal untuk
 * memastikan mouse selalu bisa memilih kategori, bahkan setelah keyboard
 * memindahkan fokus ke daftar item. Ini adalah gabungan dari semua fitur.
 *
 * FITUR UTAMA:
 *
 * 1. INTERAKSI MOUSE KONSISTEN:
 * - Jendela kategori item selalu merespons klik mouse, tidak peduli
 * di mana fokus keyboard berada.
 *
 * 2. MENCEGAH AKSI "OK" PADA KLIK MOUSE KEDUA:
 * - Mengklik kategori yang sudah aktif dengan mouse tidak akan melakukan apa-apa.
 *
 * 3. KURSOR AWAL BERKEDIP:
 * - Kursor pada item pertama akan berkedip dengan benar saat masuk ke menu.
 *
 * 4. NAVIGASI MOUSE YANG MULUS:
 * - Pengalaman navigasi yang intuitif untuk daftar item dan kategori.
 *
 * 5. BATAL DENGAN KLIK DI LUAR JENDELA:
 * - Saat jendela aktor aktif, mengklik di luar akan membatalkan pilihan.
 */

(function () {
    // ============================================================================
    // BAGIAN 1: MODIFIKASI INTI PADA SCENE_ITEM
    // ============================================================================

    var _Scene_Item_create = Scene_Item.prototype.create;
    Scene_Item.prototype.create = function () {
        _Scene_Item_create.call(this);
        this._categoryWindow.setHandler("ok", this.onCategoryChange.bind(this));
        this._categoryWindow.setHandler("cancel", this.popScene.bind(this));
        this._itemWindow.setCategoryWindow(this._categoryWindow);
        this._categoryWindow.activate();
        this._itemWindow.activate();
        this._itemWindow.select(0);
    };

    Scene_Item.prototype.onCategoryChange = function () {
        this._itemWindow.activate();
        this._itemWindow.select(0);
    };

    Scene_Item.prototype.onCategoryOk = function () {
        // Panggil handler 'ok' dari category window, yang sudah kita atur ke onCategoryChange
        this._categoryWindow.callHandler("ok");
    };

    Scene_Item.prototype.onItemCancel = function () {
        this._categoryWindow.activate();
    };

    // ============================================================================
    // BAGIAN 2: MODIFIKASI PADA JENDELA-JENDELA
    // ============================================================================

    var _Window_ItemList_initialize = Window_ItemList.prototype.initialize;
    Window_ItemList.prototype.initialize = function (x, y, width, height) {
        _Window_ItemList_initialize.call(this, x, y, width, height);
        this._categoryWindow = null;
    };

    Window_ItemList.prototype.setCategoryWindow = function (categoryWindow) {
        this._categoryWindow = categoryWindow;
    };

    var _Window_ItemList_update = Window_ItemList.prototype.update;
    Window_ItemList.prototype.update = function () {
        _Window_ItemList_update.call(this);
        if (this._categoryWindow && this.active) {
            this.setCategory(this._categoryWindow.currentSymbol());
        }
    };

    Window_ItemCategory.prototype.onTouch = function (triggered) {
        if (this.isOpenAndActive()) {
            var lastIndex = this.index();
            var x = this.canvasToLocalX(TouchInput.x);
            var y = this.canvasToLocalY(TouchInput.y);
            var hitIndex = this.hitTest(x, y);

            if (hitIndex >= 0) {
                if (triggered) {
                    if (hitIndex === this.index()) {
                        return;
                    } else {
                        this.select(hitIndex);
                        if (this.isOkEnabled()) {
                            this.callHandler("ok");
                        }
                    }
                } else if (this.index() !== hitIndex) {
                    this.select(hitIndex);
                }
            }
        }
    };

    // ============================================================================
    // BAGIAN 3: LOGIKA UPDATE UTAMA & INTERAKSI MOUSE (GABUNGAN)
    // ============================================================================

    var _Scene_Item_update = Scene_Item.prototype.update;
    Scene_Item.prototype.update = function () {
        _Scene_Item_update.call(this);
        if (TouchInput.isTriggered()) {
            this.processDirectMouseAction();
        }
    };

    /**
     * [BARU] Fungsi terpusat untuk menangani semua aksi mouse,
     * menggabungkan logika dari versi awal dan versi terbaru.
     */
    Scene_Item.prototype.processDirectMouseAction = function () {
        // PRIORITAS 1: [Logika dari Versi 5] Mengklik kategori saat fokus ada di tempat lain.
        // Kondisi diubah: Cek jika JENDELA ITEM yang aktif (fokus keyboard).
        if (this._categoryWindow.isTouchedInsideFrame() && this._itemWindow.active) {
            // Kita panggil onItemCancel untuk mengembalikan fokus keyboard ke kategori...
            this.onItemCancel();
            // ...kemudian paksa jendela kategori untuk memproses sentuhan itu.
            this._categoryWindow.processTouch();
            return;
        }

        // PRIORITAS 2: [Logika dari Versi 5] Membatalkan dari jendela aktor.
        if (this._actorWindow && this._actorWindow.active && !this._actorWindow.isTouchedInsideFrame()) {
            SoundManager.playCancel();
            this.onActorCancel();
            return;
        }
    };
})();

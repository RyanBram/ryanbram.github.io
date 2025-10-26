/*:
 * @plugindesc Memungkinkan navigasi mouse yang logis dan mempercepat alur dengan memilih kategori pertama secara otomatis.
 * @author Gemini (Final)
 *
 * @help
 * Versi 8.0
 * - Perubahan Internal: Metode untuk langsung masuk ke daftar item diubah dari
 * simulasi 'OK' menjadi pengaturan fokus langsung. Perilaku untuk pemain
 * tetap sama, namun kode menjadi lebih lugas.
 * - Fitur: Saat memasuki Scene_Item, fokus akan langsung pindah ke
 * jendela daftar item.
 * - Perbaikan: Mengklik kategori item yang sedang aktif dengan mouse atau sentuhan
 * tidak akan lagi memicu proses 'OK'.
 * - Fitur Lama: Saat jendela pemilihan aktor aktif, mengklik di luar
 * jendela tersebut akan dianggap sebagai perintah "cancel".
 */

(function() {

    // ============================================================================
    // BAGIAN 1: Logika Navigasi Umum Scene_Item (Plugin Asli)
    // ============================================================================

    // Simpan fungsi update asli dari Scene_Item
    var _Scene_Item_update = Scene_Item.prototype.update;
    Scene_Item.prototype.update = function() {
        _Scene_Item_update.call(this);
        if (TouchInput.isTriggered()) {
            this.processDirectMouseAction();
        }
    };

    /**
     * Memproses semua logika navigasi mouse dalam satu fungsi.
     * Urutan pengecekan di sini sangat penting.
     */
    Scene_Item.prototype.processDirectMouseAction = function() {
        // AKSI PRIORITAS 1: Secara spesifik mengklik kategori lain untuk beralih.
        if (this._categoryWindow.isTouchedInsideFrame() && !this._categoryWindow.active) {
            this.handleCategorySwitch();
            return; // Hentikan proses, karena aksi sudah dilakukan.
        }

        // AKSI PRIORITAS 2: Membatalkan pemilihan aktor dengan mengklik di luar jendelanya.
        if (this._actorWindow && this._actorWindow.active && !this._actorWindow.isTouchedInsideFrame()) {
            SoundManager.playCancel();
            this.onActorCancel();
            return; // Hentikan proses, karena aksi sudah dilakukan.
        }
    };

    /**
     * Menangani logika untuk beralih kategori secara langsung.
     */
    Scene_Item.prototype.handleCategorySwitch = function() {
        // Batalkan pemilihan aktor jika aktif.
        if (this._actorWindow && this._actorWindow.active) {
            this.onActorCancel();
        }
        
        // Batalkan pemilihan item untuk kembali ke kategori.
        this.onItemCancel();

        // Tentukan kategori yang diklik dan pilih.
        var targetWindow = this._categoryWindow;
        var x = targetWindow.canvasToLocalX(TouchInput.x);
        var y = targetWindow.canvasToLocalY(TouchInput.y);
        var hitIndex = targetWindow.hitTest(x, y);

        if (hitIndex >= 0) {
            targetWindow.select(hitIndex);
        }
    };

    // ============================================================================
    // BAGIAN 2: Perbaikan untuk Mencegah Aksi 'OK' (Pembaruan)
    // ============================================================================

    // Alias metode onTouch asli yang diwarisi oleh Window_ItemCategory
    var _Window_ItemCategory_onTouch = Window_ItemCategory.prototype.onTouch;
    
    /**
     * Mengganti logika onTouch khusus untuk jendela kategori item.
     */
    Window_ItemCategory.prototype.onTouch = function(triggered) {
        if (this.isOpenAndActive()) {
            var hitIndex = this.hitTest(this.canvasToLocalX(TouchInput.x), this.canvasToLocalY(TouchInput.y));
            
            // Cek apakah input adalah 'klik' (triggered) pada item yang sama yang sudah dipilih.
            if (triggered && hitIndex >= 0 && hitIndex === this.index()) {
                // Jika ya, JANGAN panggil processOk().
                // Kita hanya memastikan item tersebut dipilih (untuk membuat highlight solid).
                this.select(hitIndex);
            } else {
                // Untuk semua kasus lain (klik item berbeda, hover, dll.),
                // jalankan logika bawaan yang normal.
                _Window_ItemCategory_onTouch.call(this, triggered);
            }
        } else {
            // Jika jendela tidak aktif, jalankan logika bawaan.
             _Window_ItemCategory_onTouch.call(this, triggered);
        }
    };

    // ============================================================================
    // BAGIAN 3: Otomatis Masuk ke Daftar Item (Metode Fokus Langsung)
    // ============================================================================

    // Alias metode create dari Scene_Item
    var _Scene_Item_create = Scene_Item.prototype.create;

    /**
     * Mengganti proses pembuatan Scene_Item untuk langsung memberikan fokus
     * ke jendela daftar item.
     */
    Scene_Item.prototype.create = function() {
        // Jalankan metode create asli untuk membangun semua jendela terlebih dahulu.
        _Scene_Item_create.call(this);
        
        // Langsung atur fokus ke jendela daftar item.
        this._categoryWindow.deactivate();
        this._itemWindow.activate();
        this._itemWindow.select(0);
    };

})();
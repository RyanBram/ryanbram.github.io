/*:
 * @plugindesc (Final + QoL) Navigasi mouse Scene_Menu dengan kursor selalu di atas.
 * @author Gemini (Berdasarkan masukan)
 *
 * @help
 * Versi 6.0
 * Ini adalah plugin lengkap untuk Scene_Menu.
 *
 * Fitur:
 * 1. Saat jendela pemilihan aktor aktif, klik di luar jendela tersebut
 * (termasuk di atas jendela perintah) akan dianggap "cancel".
 * 2. BARU: Setiap kali memilih Skill, Equip, Status, atau Formation,
 * kursor di jendela pemilihan aktor akan selalu dimulai dari aktor
 * paling atas, mengabaikan pilihan terakhir.
 */

(function() {

    //=========================================================================
    // BAGIAN 1: Logika "Klik di Luar untuk Cancel"
    //=========================================================================
    
    // Simpan fungsi update asli dari Scene_Menu
    var _Scene_Menu_update = Scene_Menu.prototype.update;
    Scene_Menu.prototype.update = function() {
        // Jalankan logika kita SEBELUM update bawaan untuk menangani input terlebih dahulu.
        if (this._statusWindow && this._statusWindow.active && TouchInput.isTriggered()) {
            // Jika klik terjadi di LUAR area jendela status/aktor...
            if (!this._statusWindow.isTouchedInsideFrame()) {
                // ...panggil proses cancel langsung dari jendela yang aktif.
                this._statusWindow.processCancel();
            }
        }
        
        // Jalankan update bawaan setelah logika kita selesai.
        _Scene_Menu_update.call(this);
    };

    //=========================================================================
    // BAGIAN 2: Logika "Selalu Pilih Aktor Teratas" (Fitur Baru)
    //=========================================================================

    /**
     * Mengganti fungsi bawaan saat memilih command Skill, Equip, atau Status.
     */
    Scene_Menu.prototype.commandPersonal = function() {
        this._statusWindow.setFormationMode(false);
        this._statusWindow.select(0); // << PERUBAHAN UTAMA: Pilih aktor di indeks 0
        this._statusWindow.activate();
        this._statusWindow.setHandler('ok',     this.onPersonalOk.bind(this));
        this._statusWindow.setHandler('cancel', this.onPersonalCancel.bind(this));
    };

    /**
     * Mengganti fungsi bawaan saat memilih command Formation.
     */
    Scene_Menu.prototype.commandFormation = function() {
        this._statusWindow.setFormationMode(true);
        this._statusWindow.select(0); // << PERUBAHAN UTAMA: Pilih aktor di indeks 0
        this._statusWindow.activate();
        this._statusWindow.setHandler('ok',     this.onFormationOk.bind(this));
        this._statusWindow.setHandler('cancel', this.onFormationCancel.bind(this));
    };

})();
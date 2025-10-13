/*:
 * @plugindesc Memungkinkan navigasi mouse yang logis dan intuitif di Scene_Skill.
 * @author Gemini
 *
 * @help
 * Plugin ini adalah "saudara" dari plugin navigasi Scene_Item.
 *
 * Fitur:
 * 1. Saat jendela daftar skill aktif, mengklik tipe skill lain akan
 * langsung beralih ke daftar skill tipe tersebut.
 * 2. Jika jendela pemilihan target (aktor) aktif, mengklik tipe skill
 * lain akan menutup jendela target terlebih dahulu sebelum beralih.
 * 3. Saat jendela pemilihan target (aktor) aktif, mengklik di area
 * manapun di luar jendela tersebut akan membatalkan pemilihan.
 */

(function () {
    // Simpan fungsi update asli dari Scene_Skill
    var _Scene_Skill_update = Scene_Skill.prototype.update;
    Scene_Skill.prototype.update = function () {
        _Scene_Skill_update.call(this);
        if (TouchInput.isTriggered()) {
            this.processDirectMouseAction_Skill();
        }
    };

    /**
     * Memproses semua logika navigasi mouse untuk Scene_Skill.
     * Menggunakan nama fungsi yang unik untuk menghindari konflik.
     */
    Scene_Skill.prototype.processDirectMouseAction_Skill = function () {
        // AKSI PRIORITAS 1: Secara spesifik mengklik tipe skill lain untuk beralih.
        // Cek this._skillTypeWindow, jendela spesifik untuk Scene_Skill.
        if (this._skillTypeWindow && this._skillTypeWindow.isTouchedInsideFrame() && !this._skillTypeWindow.active) {
            this.handleSkillTypeSwitch();
            return;
        }

        // AKSI PRIORITAS 2: Membatalkan pemilihan aktor dengan mengklik di luar jendelanya.
        if (this._actorWindow && this._actorWindow.active && !this._actorWindow.isTouchedInsideFrame()) {
            SoundManager.playCancel();
            this.onActorCancel();
            return;
        }
    };

    /**
     * Menangani logika untuk beralih tipe skill secara langsung.
     */
    Scene_Skill.prototype.handleSkillTypeSwitch = function () {
        // Batalkan pemilihan aktor jika aktif.
        if (this._actorWindow && this._actorWindow.active) {
            this.onActorCancel();
        }

        // Batalkan pemilihan skill untuk kembali ke tipe skill.
        // Scene_Skill menggunakan onItemCancel() yang diwarisi dari Scene_ItemBase.
        this.onItemCancel();

        // Tentukan tipe skill yang diklik.
        var targetWindow = this._skillTypeWindow;
        var x = targetWindow.canvasToLocalX(TouchInput.x);
        var y = targetWindow.canvasToLocalY(TouchInput.y);
        var hitIndex = targetWindow.hitTest(x, y);

        if (hitIndex >= 0) {
            targetWindow.select(hitIndex);
        }

        // Jalankan aksi 'OK' untuk tipe skill baru.
        if (targetWindow.isOkEnabled()) {
            targetWindow.callOkHandler();
        }
    };
})();

/*:
 * @plugindesc Mengubah alur Scene Skill untuk mouse & touch agar lebih ringkas (v1.5).
 * @author Gemini
 * @target MV
 *
 * @help
 * Plugin ini (MouseSkillTabs.js) mengubah alur Scene_Skill khusus untuk
 * pengguna mouse dan touch agar lebih intuitif seperti "tab".
 *
 * Dibuat berdasarkan logika MouseItemTabs.js.
 *
 * v1.5: Memperbaiki bug Issue 1 & 2 (lagi).
 * Deskripsi bug: Saat Window_SkillList (yang tidak aktif) diklik,
 * ia merebut fokus (list berkedip, type solid) TAPI juga langsung
 * menggunakan skill (memanggil processOk).
 *
 * Perbaikan:
 * Logika 1:1 dari MouseItemTabs.js DIPERTAHANKAN untuk
 * Window_SkillType.onTouch (jendela yang aktif).
 *
 * Logika 1:1 SENGAJA DILANGGAR untuk Window_SkillList.onTouch
 * (jendela yang tidak aktif). Fungsinya dimodifikasi agar HANYA
 * merebut fokus dan memilih item, TANPA memanggil _Window_SkillList_onTouch
 * (yang akan memicu processOk).
 *
 * v1.4: Gagal memperbaiki karena masih 1:1.
 * v1.3: Perbaikan suara SE.
 */

(function () {
    // --- Bagian 1: Fungsi Generik untuk Memproses Sentuhan Meski Jendela Non-Aktif ---
    // (Tidak berubah)

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

    Window_SkillList.prototype.processTouchAlways = processTouchAlways;
    Window_SkillType.prototype.processTouchAlways = processTouchAlways;

    // --- Bagian 2: Scene_Skill.update ---
    // (Tidak berubah, logika ini sudah benar)

    var _Scene_Skill_update = Scene_Skill.prototype.update;
    Scene_Skill.prototype.update = function () {
        _Scene_Skill_update.call(this);

        if (this._skillTypeWindow && this._skillWindow) {
            if (this._skillTypeWindow.active) {
                this._skillWindow.processTouchAlways();
            } else if (this._skillWindow.active) {
                this._skillTypeWindow.processTouchAlways();
            }
        }

        if (this._actorWindow && this._actorWindow.active && TouchInput.isTriggered()) {
            if (!this._actorWindow.isTouchedInsideFrame()) {
                SoundManager.playCancel();
                this.onActorCancel();
            }
        }
    };

    // --- Bagian 3: Logika "Tab" (OK Handler untuk Tipe Skill) ---
    // (Tidak berubah, ini 1:1 dari MouseItemTabs.js)

    var _Window_SkillType_processOk_original = Window_SkillType.prototype.processOk;
    Window_SkillType.prototype.processOk = function () {
        var isTouchEvent = TouchInput.isTriggered() || this._touching;

        if (isTouchEvent) {
            this._isTouchOk = true;
            if (this.isCurrentItemEnabled()) {
                // this.playOkSound(); // <-- Dihilangkan (v1.3)
                this.updateInputData();
                this.deactivate();
                this.callOkHandler();
            } else {
                this.playBuzzerSound();
            }
            this._isTouchOk = false;
        } else {
            this._isTouchOk = false;
            _Window_SkillType_processOk_original.call(this);
        }
    };

    // (Ini juga 1:1 dari MouseItemTabs.js, v1.0)
    var _Scene_Skill_onSkillTypeOk = Scene_Skill.prototype.onSkillTypeOk;
    Scene_Skill.prototype.onSkillTypeOk = function () {
        if (this._skillTypeWindow && this._skillTypeWindow._isTouchOk) {
            // Perilaku Mouse/Touch: (Port 1:1 dari Scene_Item.onCategoryOk)
            this._skillWindow.setSkillTypeId(this._skillTypeWindow.currentExt());
            this._skillWindow.select(0);
            this._skillTypeWindow.activate(); // Tipe tetap aktif
            this._skillWindow.deactivate(); // List dinonaktifkan
        } else {
            // Perilaku Keyboard (Original):
            _Scene_Skill_onSkillTypeOk.call(this);
        }
    };

    // --- Bagian 4: Logika "Aktivasi & Paksa OK" (onTouch Handlers) ---

    // onTouch untuk Window_SkillList (Jendela Inaktif)
    // (*** INI BAGIAN YANG DIPERBAIKI (v1.5) - TIDAK 1:1 ***)
    var _Window_SkillList_onTouch = Window_SkillList.prototype.onTouch;
    Window_SkillList.prototype.onTouch = function (triggered) {
        // Cek jika ini adalah klik 'triggered' saat jendela TIDAK aktif
        if (!this.active && triggered && this.isTouchedInsideFrame()) {
            var x = this.canvasToLocalX(TouchInput.x);
            var y = this.canvasToLocalY(TouchInput.y);
            var hitIndex = this.hitTest(x, y);

            if (hitIndex >= 0) {
                // --- INI PERBAIKANNYA ---
                // Kita HANYA ingin merebut fokus (swap tab)

                // 1. Aktifkan diri sendiri (List jadi berkedip)
                this.activate();

                // 2. Nonaktifkan jendela Type (Type jadi solid)
                if (SceneManager._scene && SceneManager._scene._skillTypeWindow) {
                    SceneManager._scene._skillTypeWindow.deactivate();
                }

                // 3. Pilih item yang disentuh (manual, dari logic onTouch asli)
                if (this.index() !== hitIndex) {
                    this.select(hitIndex);
                    SoundManager.playCursor();
                }

                // 4. SELESAI.
                // JANGAN panggil _Window_SkillList_onTouch.call(this, triggered);
                // karena itu akan memanggil processOk() dan MENGGUNAKAN skill.
                return;
            }
        }

        // Jika jendela SUDAH aktif (atau bukan 'triggered'),
        // jalankan logika asli (yang akan memanggil processOk/use skill)
        _Window_SkillList_onTouch.call(this, triggered);
    };

    // onTouch untuk Window_SkillType (Jendela Aktif)
    // (Ini adalah port 1:1 dari Window_ItemCategory.onTouch)
    var _Window_SkillType_onTouch = Window_SkillType.prototype.onTouch;
    Window_SkillType.prototype.onTouch = function (triggered) {
        // 1. Jalankan logika onTouch asli (ini akan memilih item DAN memutar SE CURSOR)
        _Window_SkillType_onTouch.call(this, triggered);

        // 2. Sekarang, cek apakah ini adalah klik 'triggered'
        if (this.isTouchedInsideFrame() && triggered && this.isOkEnabled()) {
            var x = this.canvasToLocalX(TouchInput.x);
            var y = this.canvasToLocalY(TouchInput.y);
            var hitIndex = this.hitTest(x, y);

            if (hitIndex >= 0) {
                // 3. PAKSA panggil processOk() (Ini aman, akan memanggil onSkillTypeOk)
                this.processOk();
            }
        }
    };
})();

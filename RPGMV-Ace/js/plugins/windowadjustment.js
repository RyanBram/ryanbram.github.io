/*:
 * @plugindesc Menyesuaikan beberapa window agar lebarnya sesuai UI dan tingginya sesuai layar. Versi diperbarui.
 * @author Gemini
 *
 * @help
 * Plugin ini adalah tambahan untuk Community_Basic.js.
 * Fungsinya adalah untuk membuat beberapa window (seperti Window_Message,
 * window di battle screen, dan Window_ChoiceList) menggunakan
 * Graphics.boxWidth untuk lebar dan Graphics.height untuk tinggi.
 *
 * Ini akan memastikan window-window tersebut tetap berada di posisi
 * atas atau bawah layar, tidak ikut terskala secara vertikal
 * bersama UI lainnya.
 *
 * --- FITUR BARU ---
 * Versi ini menambahkan penyesuaian untuk window di layar pertempuran:
 * - Window_BattleSkill
 * - Window_BattleItem
 * - Window_BattleActor
 * - Window_BattleEnemy
 *
 * --- LOGIKA PENYESUAIAN ---
 * - Window_BattleSkill, Window_BattleItem, dan Window_BattleEnemy akan
 * menyesuaikan posisi dan ukurannya dengan Window_ActorCommand.
 * - Window_BattleActor (window untuk memilih target aktor) akan
 * menyesuaikan posisi dan ukurannya dengan Window_BattleStatus.
 *
 * Pastikan plugin ini ditempatkan di bawah Community_Basic.js
 * di Plugin Manager.
 */

(function () {
    "use strict";

    //=============================================================================
    // Window_Message
    //=============================================================================

    var _Window_Message_updatePlacement = Window_Message.prototype.updatePlacement;
    Window_Message.prototype.updatePlacement = function () {
        _Window_Message_updatePlacement.call(this);
        var offsetY = (Graphics.height - Graphics.boxHeight) / 2;
        var y = 0;
        switch (this._positionType) {
            case 0: // Top
                y = -offsetY;
                break;
            case 1: // Middle
                y = (Graphics.height - this.height) / 2;
                break;
            case 2: // Bottom
                y = Graphics.height - this.height - offsetY;
                break;
        }
        this.y = y;
    };

    //=============================================================================
    // Window_ChoiceList
    //=============================================================================

    var _Window_ChoiceList_updatePlacement = Window_ChoiceList.prototype.updatePlacement;
    Window_ChoiceList.prototype.updatePlacement = function () {
        _Window_ChoiceList_updatePlacement.call(this);
        var positionType = $gameMessage.choicePositionType();
        var messageY = this._messageWindow.y;
        var messageHeight = this._messageWindow.height;

        switch (positionType) {
            case 0: // Left
                this.x = 0;
                break;
            case 1: // Middle
                this.x = (Graphics.boxWidth - this.width) / 2;
                break;
            case 2: // Right
                this.x = Graphics.boxWidth - this.width;
                break;
        }

        if (messageY >= Graphics.height / 2) {
            this.y = messageY - this.height;
        } else {
            this.y = messageY + messageHeight;
        }
    };

    //=============================================================================
    // Battle Screen Windows (Penyesuaian Baru)
    //=============================================================================

    /**
     * Mengganti metode createAllWindows untuk menyesuaikan posisi semua window pertempuran
     * setelah mereka dibuat.
     */
    var _Scene_Battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
    Scene_Battle.prototype.createAllWindows = function () {
        // Jalankan metode asli terlebih dahulu untuk membuat semua window
        _Scene_Battle_createAllWindows.call(this);

        // Atur opacity window status menjadi 0 (sepenuhnya transparan).
        if (this._statusWindow) {
            this._statusWindow.opacity = 0;
        }

        // Lakukan hal yang sama untuk window pemilihan aktor agar konsisten.
        if (this._actorWindow) {
            this._actorWindow.opacity = 0;
        }

        // Hitung offset vertikal untuk "black bars"
        var offsetY = (Graphics.height - Graphics.boxHeight) / 2;

        // Sesuaikan window yang menempel di atas (Help Window)
        if (this._helpWindow) {
            this._helpWindow.y = -offsetY;
        }

        // Sesuaikan window utama yang menempel di bawah
        if (this._statusWindow) {
            this._statusWindow.y = Graphics.height - this._statusWindow.height - offsetY;
        }
        if (this._partyCommandWindow) {
            this._partyCommandWindow.y = Graphics.height - this._partyCommandWindow.height - offsetY;
        }
        if (this._actorCommandWindow) {
            this._actorCommandWindow.y = Graphics.height - this._actorCommandWindow.height - offsetY;
        }

        // --- IMPLEMENTASI FITUR BARU (MODIFIKASI FINAL) ---
        // Atur agar window Skill, Item, dan Enemy memiliki geometri yang
        // sama persis dengan Actor Command Window.
        if (this._actorCommandWindow) {
            var actorCommandGeo = this._actorCommandWindow;
            var windowsToAlign = [this._skillWindow, this._itemWindow, this._enemyWindow];

            windowsToAlign.forEach(function (win) {
                if (win) {
                    win.x = actorCommandGeo.x;
                    win.y = actorCommandGeo.y;
                    win.width = actorCommandGeo.width;
                    win.height = actorCommandGeo.height;
                }
            });
        }

        // Atur agar window Actor (pemilihan target) memiliki geometri yang
        // sama persis dengan Status Window.
        if (this._statusWindow && this._actorWindow) {
            var statusGeo = this._statusWindow;
            this._actorWindow.x = statusGeo.x;
            this._actorWindow.y = statusGeo.y;
            this._actorWindow.width = statusGeo.width;
            this._actorWindow.height = statusGeo.height;
        }
    };

    /**
     * Mengganti metode updateStatusWindowPosition untuk memastikan semua window terkait
     * tetap sinkron posisinya setiap kali Status Window diperbarui.
     */
    var _Scene_Battle_updateStatusWindowPosition = Scene_Battle.prototype.updateStatusWindowPosition;
    Scene_Battle.prototype.updateStatusWindowPosition = function () {
        // Jalankan metode asli terlebih dahulu
        _Scene_Battle_updateStatusWindowPosition.call(this);

        var statusWindow = this._statusWindow;
        if (statusWindow) {
            var offsetY = (Graphics.height - Graphics.boxHeight) / 2;
            // Paksa Status Window untuk selalu menempel di bagian paling bawah layar
            statusWindow.y = Graphics.height - statusWindow.height - offsetY;

            // --- SINKRONISASI LANJUTAN (MODIFIKASI FINAL) ---
            // Sinkronisasi posisi Y untuk window Skill, Item, dan Enemy dengan Actor Command Window
            if (this._actorCommandWindow) {
                var actorCommandY = this._actorCommandWindow.y;
                var windowsToSync = [this._skillWindow, this._itemWindow, this._enemyWindow];
                windowsToSync.forEach(function (win) {
                    if (win) {
                        win.y = actorCommandY;
                    }
                });
            }

            // Sinkronisasi posisi Y untuk window Actor dengan Status Window
            if (this._actorWindow) {
                this._actorWindow.y = statusWindow.y;
            }
        }
    };

    Scene_Battle.prototype.updateWindowPositions = function () {
        // Dengan mengganti fungsi ini, kita mencegah engine menjalankan logika
        // `statusX = this._partyCommandWindow.width / 2;` yang menyebabkan pergeseran.

        // Kita hanya perlu memastikan posisi status window terkunci.
        // Posisi X-nya HARUS selalu sama dengan lebar command window.
        if (this._statusWindow) {
            this._statusWindow.x = this._partyCommandWindow.width;
        }
    };
})();

Window_PartyCommand.prototype.windowWidth = function () {
    return Window_ActorCommand.prototype.windowWidth.call(Window_ActorCommand.prototype);
};

Window_PartyCommand.prototype.maxCols = function () {
    // Terdapat 2 perintah utama: Serang dan Kabur
    return 1;
};

Window_PartyCommand.prototype.numVisibleRows = function () {
    return 4;
};

//=============================================================================
// Penyesuaian Tinggi untuk Window_PartyCommand
//=============================================================================

/**
 * Mendefinisikan jumlah baris perintah yang sebenarnya ada.
 * Untuk Party Command, biasanya ada 2: Bertarung dan Kabur.
 */
Window_PartyCommand.prototype.numVisibleRows = function () {
    return 3;
};

/**
 * Memaksa tinggi total window agar sama dengan window yang memiliki 4 baris.
 * Ini memastikan konsistensi tinggi dengan Window_BattleStatus.
 */
Window_PartyCommand.prototype.windowHeight = function () {
    return this.fittingHeight(4);
};

/**
 * Menghitung dan meregangkan tinggi setiap item perintah.
 * Logikanya adalah membagi total tinggi untuk 4 baris dengan jumlah baris
 * yang sebenarnya ada (yaitu 2), sehingga 2 perintah mengisi ruang untuk 4.
 */
Window_PartyCommand.prototype.itemHeight = function () {
    // Ambil total tinggi konten yang tersedia untuk 4 baris.
    var totalContentHeight = 4 * this.lineHeight();

    // Bagi total tinggi tersebut dengan jumlah baris yang sebenarnya akan ditampilkan.
    return Math.floor(totalContentHeight / this.numVisibleRows());
};

// Atur jumlah kolom yang Anda inginkan (misal: 2)
Window_ActorCommand.prototype.maxCols = function () {
    return 2;
};

// Atur jumlah baris perintah yang sebenarnya ada (misal: 3 untuk Attack, Skill, Guard)
Window_ActorCommand.prototype.numVisibleRows = function () {
    return 3;
};

// Lebar window dihitung secara dinamis dari jumlah kolom
Window_ActorCommand.prototype.windowWidth = function () {
    return 192 * this.maxCols();
};

// Tinggi window disamakan dengan window yang punya 4 baris (seperti Window_BattleStatus)
Window_ActorCommand.prototype.windowHeight = function () {
    return this.fittingHeight(4);
};

// Hapus itemHeight yang lama, dan gunakan yang ini.
Window_ActorCommand.prototype.itemHeight = function () {
    // Ambil total tinggi konten yang tersedia untuk 4 baris.
    // Rumus: 4 baris dikali tinggi per baris (default 36px).
    var totalContentHeight = 4 * this.lineHeight();

    // Bagi total tinggi tersebut dengan jumlah baris yang sebenarnya akan ditampilkan (yaitu 3).
    return Math.floor(totalContentHeight / this.numVisibleRows());
};

//=============================================================================
// Penyesuaian Kolom untuk Window di Battle
//=============================================================================

/**
 * Mengatur jumlah kolom maksimal untuk window daftar skill di battle menjadi 1.
 */
Window_BattleSkill.prototype.maxCols = function () {
    return 1;
};

/**
 * Mengatur jumlah kolom maksimal untuk window daftar item di battle menjadi 1.
 */
Window_BattleItem.prototype.maxCols = function () {
    return 1;
};

/**
 * Mengatur jumlah kolom maksimal untuk window daftar target musuh menjadi 1.
 */
Window_BattleEnemy.prototype.maxCols = function () {
    return 1;
};

// Simpan referensi ke fungsi asli Scene_Battle
var _Scene_Battle_startActorCommandSelection = Scene_Battle.prototype.startActorCommandSelection;
var _Scene_Battle_startPartyCommandSelection = Scene_Battle.prototype.startPartyCommandSelection;

/**
 * Saat jendela perintah aktor (Attack, Skill, etc.) aktif,
 * sesuaikan posisi DAN LEBAR dari jendela status.
 */
Scene_Battle.prototype.startActorCommandSelection = function () {
    // Jalankan fungsi aslinya terlebih dahulu
    _Scene_Battle_startActorCommandSelection.call(this);

    // Sekarang, lakukan penyesuaian kustom kita
    var actorCommandWindow = this._actorCommandWindow;
    var statusWindow = this._statusWindow;
    var actorWindow = this._actorWindow; // Tambahkan referensi ke window aktor

    var newX = actorCommandWindow.width;
    var newWidth = Graphics.boxWidth - actorCommandWindow.width;

    if (statusWindow) {
        statusWindow.x = newX;
        statusWindow.width = newWidth;
        statusWindow.refresh();
    }
    // Tambahkan blok ini untuk menyesuaikan window aktor juga
    if (actorWindow) {
        actorWindow.x = newX;
        actorWindow.width = newWidth;
        actorWindow.refresh();
    }
};

/**
 * Saat kembali ke jendela perintah party (Fight, Escape),
 * kembalikan posisi DAN LEBAR jendela status ke keadaan semula.
 */
Scene_Battle.prototype.startPartyCommandSelection = function () {
    // Jalankan fungsi aslinya
    _Scene_Battle_startPartyCommandSelection.call(this);

    // Lakukan penyesuaian kustom
    var partyCommandWindow = this._partyCommandWindow;
    var statusWindow = this._statusWindow;
    var actorWindow = this._actorWindow; // Tambahkan referensi ke window aktor

    var newX = partyCommandWindow.width;
    var newWidth = Graphics.boxWidth - partyCommandWindow.width;

    if (statusWindow) {
        statusWindow.x = newX;
        statusWindow.width = newWidth;
        statusWindow.refresh();
    }
    // Tambahkan blok ini untuk menyesuaikan window aktor juga
    if (actorWindow) {
        actorWindow.x = newX;
        actorWindow.width = newWidth;
        actorWindow.refresh();
    }
};

//=============================================================================
// Penyesuaian Posisi Teks Vertikal (Metode Spesifik)
//=============================================================================

/**
 * Menggambar ulang item untuk Window_PartyCommand agar teks berada di tengah vertikal.
 */
Window_PartyCommand.prototype.drawItem = function (index) {
    var rect = this.itemRect(index); // Gunakan itemRect untuk mendapatkan seluruh area
    var align = this.itemTextAlign();
    this.resetTextColor();
    this.changePaintOpacity(this.isCommandEnabled(index));

    // Hitung posisi Y baru di tengah area item
    var newY = rect.y + (rect.height - this.lineHeight()) / 2;

    // Gambar teks dengan padding manual dan posisi Y baru
    this.drawText(
        this.commandName(index),
        rect.x + this.textPadding(),
        newY,
        rect.width - this.textPadding() * 2,
        align
    );
};

/**
 * Menggambar ulang item untuk Window_ActorCommand agar teks berada di tengah vertikal.
 */
Window_ActorCommand.prototype.drawItem = function (index) {
    var rect = this.itemRect(index); // Gunakan itemRect untuk mendapatkan seluruh area
    var align = this.itemTextAlign();
    this.resetTextColor();
    this.changePaintOpacity(this.isCommandEnabled(index));

    // Hitung posisi Y baru di tengah area item
    var newY = rect.y + (rect.height - this.lineHeight()) / 2;

    // Gambar teks dengan padding manual dan posisi Y baru
    this.drawText(
        this.commandName(index),
        rect.x + this.textPadding(),
        newY,
        rect.width - this.textPadding() * 2,
        align
    );
};

//=============================================================================
// Penyesuaian Tampilan HP, MP, dan TP (KHUSUS BATTLE)
//=============================================================================

/**
 * Menggambar ulang status HP Aktor KHUSUS untuk Window_BattleStatus.
 * GAUGE dan LABEL "HP" DIHILANGKAN.
 */
Window_BattleStatus.prototype.drawActorHp = function (actor, x, y, width) {
    width = width || 186;
    // Gauge dan label dihilangkan, hanya menyisakan angka.
    this.drawCurrentAndMax(actor.hp, actor.mhp, x, y, width, this.hpColor(actor), this.normalColor());
};

/**
 * Menggambar ulang status MP Aktor KHUSUS untuk Window_BattleStatus.
 * GAUGE dan LABEL "MP" DIHILANGKAN.
 */
Window_BattleStatus.prototype.drawActorMp = function (actor, x, y, width) {
    width = width || 186;
    // Gauge dan label dihilangkan, hanya menyisakan angka.
    this.drawCurrentAndMax(actor.mp, actor.mmp, x, y, width, this.mpColor(actor), this.normalColor());
};

/**
 * Menggambar ulang status TP Aktor KHUSUS untuk Window_BattleStatus.
 * HANYA LABEL "TP" YANG DIHILANGKAN.
 */
Window_BattleStatus.prototype.drawActorTp = function (actor, x, y, width) {
    width = width || 96;
    var color1 = this.tpGaugeColor1();
    var color2 = this.tpGaugeColor2();
    // Gauge tetap ada.
    this.drawGauge(x, y, width, actor.tpRate(), color1, color2);
    this.changeTextColor(this.tpColor(actor));
    // Label dihilangkan, hanya menyisakan angka.
    this.drawText(actor.tp, x + width - 64, y, 64, "right");
};

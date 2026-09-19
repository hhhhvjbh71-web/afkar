# ═══════════════════════════════════════════════════════════════
# update-version.ps1  —  تحديث تلقائي لـ version.json
# منصة الأستاذ علي محروس لتعليم اللغة الإنجليزية
#
# الاستخدام:
#   .\update-version.ps1
#
# ما يفعله:
#   1. يُولِّد رقم نسخة جديدة بصيغة: YYYYMMDD-HHmm
#   2. يكتب الـ version.json بالقيمة الجديدة
#   3. يُحدِّث قيم ?v= في index.html تلقائياً
#   4. يُحدِّث CACHE_VERSION في sw.js (PWA) تلقائياً
#   5. يُطبع النسخة القديمة والجديدة في الـ console
#
# بعد تشغيل هذا الـ script:
#   ارفع جميع الملفات — cache-buster.js سيتعرف على التحديث تلقائياً
# ═══════════════════════════════════════════════════════════════

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$VersionFile = Join-Path $ScriptDir "version.json"
$IndexFile   = Join-Path $ScriptDir "index.html"
$SwFile      = Join-Path $ScriptDir "sw.js"

# ── قراءة الـ version الحالية ─────────────────────────────────
$OldVersion = "غير محدد"
if (Test-Path $VersionFile) {
    try {
        $content = Get-Content $VersionFile -Raw -Encoding UTF8
        $json = $content | ConvertFrom-Json
        $OldVersion = $json.v
    } catch {
        Write-Warning "تعذّر قراءة version.json الحالي."
    }
}

# ── توليد الـ version الجديدة (تاريخ + وقت تلقائي) ──────────
$Now = Get-Date
$NewVersion = $Now.ToString("yyyyMMdd-HHmm")

# ── كتابة version.json ────────────────────────────────────────
$JsonContent = "{`n  `"v`": `"$NewVersion`"`n}`n"
[System.IO.File]::WriteAllText($VersionFile, $JsonContent, [System.Text.Encoding]::UTF8)

# ── تحديث ?v= في index.html تلقائياً ────────────────────────
if (Test-Path $IndexFile) {
    $indexContent = Get-Content $IndexFile -Raw -Encoding UTF8
    # استبدل أي ?v=XXXXXXXX-XXXX بالقيمة الجديدة
    $indexContent = $indexContent -replace '\?v=\d{8}-\d{4}', "?v=$NewVersion"
    [System.IO.File]::WriteAllText($IndexFile, $indexContent, [System.Text.Encoding]::UTF8)
    Write-Host "  تم تحديث ?v= في index.html" -ForegroundColor Green
}

# ── تحديث CACHE_VERSION في sw.js تلقائياً (Service Worker الخاص بالـ PWA) ──
if (Test-Path $SwFile) {
    $swContent = Get-Content $SwFile -Raw -Encoding UTF8
    $swContent = $swContent -replace "CACHE_VERSION = '\d{8}-\d{4}'", "CACHE_VERSION = '$NewVersion'"
    [System.IO.File]::WriteAllText($SwFile, $swContent, [System.Text.Encoding]::UTF8)
    Write-Host "  تم تحديث CACHE_VERSION في sw.js — الـ PWA سيكتشف النسخة الجديدة تلقائياً" -ForegroundColor Green
}

# ── طباعة النتيجة ─────────────────────────────────────────────
Write-Host ""
Write-Host "===============================================" -ForegroundColor Cyan
Write-Host "  OK - تم تحديث النسخة بنجاح!" -ForegroundColor Green
Write-Host "===============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "  النسخة القديمة : $OldVersion" -ForegroundColor Yellow
Write-Host "  النسخة الجديدة : $NewVersion" -ForegroundColor Green
Write-Host ""
Write-Host "  الخطوات التالية:" -ForegroundColor Cyan
Write-Host "     1. ارفع جميع الملفات المعدلة إلى Firebase" -ForegroundColor White
Write-Host "     2. version.json و index.html مُحدَّثان تلقائياً" -ForegroundColor White
Write-Host "     3. cache-buster.js سيتعرف على التحديث تلقائياً للمستخدمين" -ForegroundColor White
Write-Host "     4. تطبيق الـ PWA المثبّت سيسحب النسخة الجديدة تلقائياً (sw.js)" -ForegroundColor White
Write-Host ""

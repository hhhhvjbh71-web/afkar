// ═══════════════════════════════════════════════════════════════════════
//  pwa-install.js — تسجيل الـ Service Worker + نافذة تثبيت التطبيق (PWA)
//  منصة أفكار وأسرار — Ideas & Secrets Platform
// ═══════════════════════════════════════════════════════════════════════
//
//  هذا الملف إضافة مستقلة فوق النظام الحالي، ولا يعدّل أي وظيفة موجودة:
//   1) يسجّل sw.js لتفعيل خصائص الـ PWA (Installable + Offline fallback).
//   2) يعرض نافذة تثبيت احترافية (Bottom Sheet / Modal) عندما لا يكون
//      التطبيق مثبّتاً بعد، مع التعامل الصحيح مع اختلاف المتصفحات:
//        - Chrome / Edge / Android → زر تثبيت حقيقي عبر beforeinstallprompt.
//        - iOS Safari → لا يدعم beforeinstallprompt، فتظهر تعليمات يدوية
//          ("مشاركة" ثم "إضافة إلى الشاشة الرئيسية").
//        - متصفحات لا تدعم التثبيت إطلاقاً → لا تظهر أي نافذة (بدلاً من
//          زر لا يعمل).
//   3) بعد نجاح التثبيت، أو عند تشغيل الموقع بالفعل في وضع Standalone،
//      لا تظهر النافذة مرة أخرى أبداً.
// ═══════════════════════════════════════════════════════════════════════

(function () {
    'use strict';

    var SW_URL = 'sw.js';
    var POST_LOADER_DELAY_MS = 500;        // مهلة بسيطة بعد اختفاء شاشة التحميل
    var MAX_WAIT_MS = 10000;               // سقف أقصى للانتظار حتى لا تتعطل النافذة أبداً
    var SESSION_DISMISS_KEY = 'amPwaPromptDismissed'; // لمدة الجلسة الحالية فقط
    var INSTALLED_KEY = 'amPwaInstalled';

    var deferredPrompt = null;
    var modalEl = null;
    var modalShown = false;

    // ── تسجيل الـ Service Worker ──────────────────────────────────────
    var swRegistration = null;
    var lastSwUpdateCheck = 0;
    var SW_UPDATE_GAP_MS = 5 * 60 * 1000;   // بحد أقصى فحص كل 5 دقائق

    function checkSwUpdate() {
        if (!swRegistration) return;
        if (Date.now() - lastSwUpdateCheck < SW_UPDATE_GAP_MS) return;
        lastSwUpdateCheck = Date.now();
        try { swRegistration.update(); } catch (e) { }
    }

    function registerServiceWorker() {
        if (!('serviceWorker' in navigator)) return;
        window.addEventListener('load', function () {
            navigator.serviceWorker.register(SW_URL, { scope: '/', updateViaCache: 'none' })
                .then(function (reg) {
                    swRegistration = reg;
                    lastSwUpdateCheck = Date.now();

                    // فحص وجود نسخة جديدة من sw.js عند العودة إلى التطبيق
                    document.addEventListener('visibilitychange', function () {
                        if (!document.hidden) checkSwUpdate();
                    });
                    window.addEventListener('online', checkSwUpdate);
                })
                .catch(function (err) {
                    console.warn('[PWA] تعذّر تسجيل Service Worker:', err);
                });
        });
    }

    // ── اكتشاف وضع التشغيل الحالي (مثبّت / Standalone) ─────────────────
    function isStandaloneMode() {
        try {
            if (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) return true;
        } catch (e) { }
        if (window.navigator && window.navigator.standalone === true) return true; // iOS legacy
        if (document.referrer && document.referrer.indexOf('android-app://') === 0) return true;
        return false;
    }

    function isIOSDevice() {
        return /iphone|ipad|ipod/i.test(navigator.userAgent) && !window.MSStream;
    }

    function isIOSSafari() {
        var ua = navigator.userAgent || '';
        return isIOSDevice() && /safari/i.test(ua) && !/crios|fxios|edgios|opios|mercury/i.test(ua);
    }

    function markInstalled() {
        try { localStorage.setItem(INSTALLED_KEY, '1'); } catch (e) { }
    }

    function wasDismissedThisSession() {
        try { return sessionStorage.getItem(SESSION_DISMISS_KEY) === '1'; } catch (e) { return false; }
    }

    function dismissForSession() {
        try { sessionStorage.setItem(SESSION_DISMISS_KEY, '1'); } catch (e) { }
    }

    // ── بناء نافذة التثبيت (مرة واحدة فقط) ─────────────────────────────
    function buildModal() {
        if (modalEl) return modalEl;

        var style = document.createElement('style');
        style.setAttribute('data-am-pwa-style', '1');
        style.textContent =
            '#amPwaOverlay{position:fixed;inset:0;z-index:999990;background:rgba(6,10,20,.55);' +
            'backdrop-filter:blur(2px);opacity:0;pointer-events:none;transition:opacity .28s ease;}' +
            '#amPwaOverlay.am-open{opacity:1;pointer-events:auto;}' +
            '#amPwaSheet{position:fixed;left:50%;bottom:0;transform:translate(-50%,110%);width:100%;' +
            'max-width:420px;background:linear-gradient(165deg,#1E1440 0%,#120A22 70%,#170D2E 100%);' +
            'color:#FAF8FC;border-radius:20px 20px 0 0;padding:22px 20px calc(20px + env(safe-area-inset-bottom));' +
            'box-shadow:0 -12px 40px rgba(0,0,0,.45);font-family:"Tajawal","Inter",Arial,sans-serif;' +
            'transition:transform .32s cubic-bezier(.4,0,.2,1);z-index:999991;' +
            'border:1px solid rgba(167, 128, 245,.18);border-bottom:none;box-sizing:border-box;}' +
            '#amPwaOverlay.am-open #amPwaSheet{transform:translate(-50%,0);}' +
            '@media (min-width:640px){#amPwaSheet{bottom:auto;top:50%;transform:translate(-50%,-42%);' +
            'border-radius:20px;border-bottom:1px solid rgba(167, 128, 245,.18);opacity:0;transition:transform .32s cubic-bezier(.4,0,.2,1),opacity .28s ease;}' +
            '#amPwaOverlay.am-open #amPwaSheet{transform:translate(-50%,-50%);opacity:1;}}' +
            '#amPwaSheet .am-close{position:absolute;top:12px;inset-inline-end:14px;width:28px;height:28px;' +
            'border-radius:50%;background:rgba(255,255,255,.08);border:none;color:#9FB6DE;font-size:16px;' +
            'cursor:pointer;display:flex;align-items:center;justify-content:center;line-height:1;}' +
            '#amPwaSheet .am-close:hover{background:rgba(255,255,255,.16);color:#fff;}' +
            '#amPwaSheet .am-head{display:flex;align-items:center;gap:14px;margin-bottom:14px;}' +
            '#amPwaSheet .am-icon{width:54px;height:54px;border-radius:16px;flex:none;overflow:hidden;' +
            'box-shadow:0 6px 18px rgba(0,0,0,.35);border:1px solid rgba(167, 128, 245,.25);}' +
            '#amPwaSheet .am-icon img{width:100%;height:100%;object-fit:cover;display:block;}' +
            '#amPwaSheet h3{margin:0 0 3px;font-size:16.5px;font-weight:800;color:#FCD34D;}' +
            '#amPwaSheet .am-sub{margin:0;font-size:12.5px;color:#A780F5;font-weight:600;}' +
            '#amPwaSheet p.am-body{font-size:13.5px;line-height:1.7;color:#CFE0F7;margin:0 0 18px;}' +
            '#amPwaSheet .am-steps{margin:0 0 18px;padding:0;list-style:none;}' +
            '#amPwaSheet .am-steps li{display:flex;align-items:center;gap:10px;font-size:13px;' +
            'color:#CFE0F7;padding:8px 10px;background:rgba(167, 128, 245,.08);border-radius:10px;margin-bottom:8px;}' +
            '#amPwaSheet .am-steps li b{color:#FCD34D;font-weight:800;}' +
            '#amPwaSheet .am-steps svg{flex:none;}' +
            '#amPwaSheet .am-actions{display:flex;gap:10px;}' +
            '#amPwaSheet .am-btn-primary{flex:1;background:linear-gradient(135deg,#8B5CF6,#7C3AED);color:#fff;' +
            'border:none;padding:13px 16px;border-radius:12px;font-size:14px;font-weight:800;cursor:pointer;' +
            'box-shadow:0 8px 20px rgba(124, 58, 237,.35);font-family:inherit;}' +
            '#amPwaSheet .am-btn-primary:active{transform:translateY(1px);}' +
            '#amPwaSheet .am-btn-secondary{flex:none;background:transparent;color:#9FB6DE;border:1px solid rgba(156, 147, 173,.3);' +
            'padding:13px 16px;border-radius:12px;font-size:13.5px;font-weight:700;cursor:pointer;font-family:inherit;}' +
            '#amPwaSheet .am-btn-secondary:hover{color:#fff;border-color:rgba(156, 147, 173,.55);}' +
            '@media (prefers-reduced-motion:reduce){#amPwaSheet,#amPwaOverlay{transition:none !important;}}';
        document.head.appendChild(style);

        var overlay = document.createElement('div');
        overlay.id = 'amPwaOverlay';
        overlay.innerHTML =
            '<div id="amPwaSheet" role="dialog" aria-modal="true" aria-labelledby="amPwaTitle">' +
            '  <button type="button" class="am-close" id="amPwaClose" aria-label="إغلاق">✕</button>' +
            '  <div class="am-head">' +
            '    <div class="am-icon"><img src="icon-192.png" alt="أيقونة تطبيق أفكار وأسرار"></div>' +
            '    <div>' +
            '      <h3 id="amPwaTitle">تثبيت التطبيق</h3>' +
            '      <p class="am-sub">أفكار وأسرار — منصتك التعليمية</p>' +
            '    </div>' +
            '  </div>' +
            '  <div id="amPwaBody"></div>' +
            '  <div class="am-actions" id="amPwaActions"></div>' +
            '</div>';
        document.body.appendChild(overlay);

        overlay.addEventListener('click', function (e) {
            if (e.target === overlay) closeModal();
        });
        overlay.querySelector('#amPwaClose').addEventListener('click', closeModal);

        modalEl = overlay;
        return overlay;
    }

    function shareIconSvg() {
        return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">' +
            '<path d="M12 3v12" stroke="#A780F5" stroke-width="1.8" stroke-linecap="round"/>' +
            '<path d="M8 7l4-4 4 4" stroke="#A780F5" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>' +
            '<path d="M6 11v7a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-7" stroke="#A780F5" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>' +
            '</svg>';
    }

    function plusSquareSvg() {
        return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">' +
            '<rect x="3.5" y="3.5" width="17" height="17" rx="4" stroke="#A780F5" stroke-width="1.8"/>' +
            '<path d="M12 8v8M8 12h8" stroke="#A780F5" stroke-width="1.8" stroke-linecap="round"/>' +
            '</svg>';
    }

    // ── عرض النافذة في وضع "تثبيت تلقائي" (Chrome / Edge / Android) ────
    function showNativeModal() {
        var overlay = buildModal();
        overlay.querySelector('#amPwaBody').innerHTML =
            '<p class="am-body">استمتع بتجربة أسرع وأشبه بتطبيق حقيقي. ثبّت المنصة على جهازك للوصول السريع لكورساتك واختباراتك وواجباتك.</p>';
        overlay.querySelector('#amPwaActions').innerHTML =
            '<button type="button" class="am-btn-secondary" id="amPwaNotNow">مش دلوقتي</button>' +
            '<button type="button" class="am-btn-primary" id="amPwaInstallBtn">تثبيت التطبيق</button>';

        overlay.querySelector('#amPwaNotNow').addEventListener('click', closeAndDismiss);
        overlay.querySelector('#amPwaInstallBtn').addEventListener('click', function () {
            if (!deferredPrompt) { closeModal(); return; }
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then(function (choice) {
                if (choice && choice.outcome === 'accepted') markInstalled();
                deferredPrompt = null;
                closeModal();
            }).catch(function () { closeModal(); });
        });

        openModal();
    }

    // ── عرض النافذة في وضع "تعليمات يدوية" (iOS Safari) ────────────────
    function showIOSModal() {
        var overlay = buildModal();
        overlay.querySelector('#amPwaBody').innerHTML =
            '<p class="am-body">ثبّت المنصة على الشاشة الرئيسية لوصول سريع وسهل — تمامًا زي أي تطبيق.</p>' +
            '<ul class="am-steps">' +
            '  <li>' + shareIconSvg() + ' <span><b>1.</b> اضغط على زر <b>المشاركة</b> في شريط أدوات Safari</span></li>' +
            '  <li>' + plusSquareSvg() + ' <span><b>2.</b> انزل لتحت واضغط <b>"إضافة إلى الشاشة الرئيسية"</b></span></li>' +
            '</ul>';
        overlay.querySelector('#amPwaActions').innerHTML =
            '<button type="button" class="am-btn-primary" id="amPwaGotIt" style="flex:1;">تمام، فهمت</button>';

        overlay.querySelector('#amPwaGotIt').addEventListener('click', closeAndDismiss);
        openModal();
    }

    function openModal() {
        if (!modalEl || modalShown) return;
        modalShown = true;
        requestAnimationFrame(function () {
            modalEl.classList.add('am-open');
        });
    }

    function closeModal() {
        if (!modalEl) return;
        modalEl.classList.remove('am-open');
        modalShown = false;
    }

    function closeAndDismiss() {
        dismissForSession();
        closeModal();
    }

    // ── تحديد هل نعرض النافذة أصلاً، وبأي وضع ──────────────────────────
    function maybeShowPrompt() {
        if (isStandaloneMode()) { markInstalled(); return; }
        if (wasDismissedThisSession()) return;
        if (modalShown) return;

        if (deferredPrompt) {
            showNativeModal();
        } else if (isIOSSafari()) {
            showIOSModal();
        }
        // أي متصفح آخر لا يدعم التثبيت التلقائي ولا تعليمات iOS اليدوية
        // → لا نعرض شيئاً بدلاً من زر لا يعمل.
    }

    // ── الأحداث ─────────────────────────────────────────────────────────
    window.addEventListener('beforeinstallprompt', function (e) {
        e.preventDefault();
        deferredPrompt = e;
        if (!isStandaloneMode() && !wasDismissedThisSession() && !modalShown) {
            showNativeModal();
        }
    });

    window.addEventListener('appinstalled', function () {
        markInstalled();
        closeModal();
        deferredPrompt = null;
    });

    // ننتظر اختفاء شاشة التحميل الخاصة بالمنصة (#iraqi-loader) قبل عرض
    // نافذة التثبيت، حتى لا تظهر فوقها أو تزعج المستخدم أثناء التحميل.
    // مع سقف أقصى زمني احتياطي حتى لا تتعطل النافذة في أي سيناريو نادر.
    function waitForLoaderThenPrompt() {
        var deadline = Date.now() + MAX_WAIT_MS;
        function check() {
            var loader = document.getElementById('iraqi-loader');
            var loaderGone = !loader || !loader.parentNode;
            if (loaderGone || Date.now() >= deadline) {
                setTimeout(maybeShowPrompt, loaderGone ? POST_LOADER_DELAY_MS : 0);
                return;
            }
            setTimeout(check, 300);
        }
        check();
    }

    function init() {
        registerServiceWorker();

        if (isStandaloneMode()) {
            markInstalled();
            return;
        }

        waitForLoaderThenPrompt();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

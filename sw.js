// ═══════════════════════════════════════════════════════════════════════
//  sw.js — Service Worker (PWA)
//  منصة أفكار وأسرار — Ideas & Secrets Platform
// ═══════════════════════════════════════════════════════════════════════
//
//  الهدف: جعل المنصة قابلة للتثبيت (PWA) مع الحفاظ على وصول أي تحديث
//  جديد يُرفع على الاستضافة إلى المستخدم فوراً وبدون أي نسخة قديمة عالقة.
//
//  الاستراتيجية المستخدمة: Network First (لكل ملفات نفس الموقع)
//  ── لماذا هذه الاستراتيجية بالذات؟
//     المشروع يحتوي بالفعل على نظام "cache-buster.js" يقارن version.json
//     ويعمل Hard Reload + مسح كامل للـ Cache عند وجود تحديث أثناء فتح
//     الموقع. الدور المكمّل لهذا الـ Service Worker هو: في كل مرة يفتح
//     فيها المستخدم التطبيق (PWA) من جديد، يحاول دائماً جلب الملفات من
//     السيرفر أولاً (Network First)، ولا يستخدم النسخة المخزّنة إلا في
//     حالة عدم وجود اتصال بالإنترنت (Fallback فقط). هذا يضمن عدم بقاء
//     أي مستخدم على نسخة قديمة، مع توفير عمل أساسي بدون إنترنت.
//
//  ── تحديث الإصدار:
//     غيّر قيمة CACHE_VERSION مع كل نشر جديد (نفس فكرة version.json).
//     سكربتات update-version.sh / update-version.ps1 تقوم بتحديث هذه
//     القيمة تلقائياً — لا حاجة لتعديلها يدوياً في المعتاد.
// ═══════════════════════════════════════════════════════════════════════

'use strict';

const CACHE_VERSION = '20260916-1152';               // مرتبط بنظام إصدار المنصة (version.json)
const CACHE_NAME = 'ali-mahrous-pwa-' + CACHE_VERSION;
const CACHE_PREFIX = 'ali-mahrous-pwa-';

// ملفات أساسية فقط يتم تجهيزها مسبقاً (Precache) — تُستخدم فقط كـ fallback
// عند انعدام الاتصال بالإنترنت. متعمّداً قائمة صغيرة جداً وآمنة حتى لا
// يفشل التثبيت بسبب ملف غير موجود.
const PRECACHE_URLS = [
    'offline.html',
    'manifest.json',
    'icon-192.png',
    'icon-512.png'
];

// ── التثبيت: تجهيز الكاش الأساسي + تفعيل فوري (skipWaiting) ──────────
self.addEventListener('install', function (event) {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return Promise.all(
                PRECACHE_URLS.map(function (url) {
                    return cache.add(url).catch(function () {
                        // تجاهل أي ملف يفشل تحميله بدون فشل عملية التثبيت بالكامل
                    });
                })
            );
        })
    );
});

// ── التفعيل: حذف أي نسخ كاش قديمة + السيطرة الفورية على الصفحات ──────
self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(function (keys) {
            return Promise.all(
                keys.map(function (key) {
                    if (key.indexOf(CACHE_PREFIX) === 0 && key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                    return Promise.resolve();
                })
            );
        }).then(function () {
            return self.clients.claim();
        })
    );
});

// ── الجلب: Network First لكل طلبات نفس الموقع فقط ────────────────────
self.addEventListener('fetch', function (event) {
    const req = event.request;

    // لا نتدخل إطلاقاً في غير GET (حتى لا نؤثر على عمليات الكتابة/التسجيل)
    if (req.method !== 'GET') return;

    let url;
    try { url = new URL(req.url); } catch (e) { return; }

    // لا نتدخل في أي طلب خارج نفس الأصل (Firebase, Fonts, CDN...)
    // نتركه يعمل بشكل طبيعي تماماً كما لو لم يوجد Service Worker
    if (url.origin !== self.location.origin) return;

    // version.json هو مصدر الحقيقة لنظام cache-buster.js — يجب أن يصل
    // دائماً من الشبكة مباشرة بدون أي تدخل من الـ Service Worker
    if (/\/version\.json$/.test(url.pathname)) return;

    event.respondWith(networkFirst(req));
});

function networkFirst(req) {
    return fetch(req).then(function (fresh) {
        if (fresh && fresh.ok) {
            const copy = fresh.clone();
            caches.open(CACHE_NAME).then(function (cache) {
                cache.put(req, copy).catch(function () { });
            });
        }
        return fresh;
    }).catch(function () {
        return caches.match(req).then(function (cached) {
            if (cached) return cached;
            if (req.mode === 'navigate') {
                return caches.match('offline.html');
            }
            return Promise.reject('network-and-cache-miss');
        });
    });
}

#!/bin/bash
# ═══════════════════════════════════════════════════════════════
# update-version.sh  —  تحديث تلقائي لـ version.json
# منصة الأستاذ علي محروس لتعليم اللغة الإنجليزية
# للاستخدام على Mac/Linux
#
# الاستخدام:
#   chmod +x update-version.sh
#   ./update-version.sh
# ═══════════════════════════════════════════════════════════════

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
VERSION_FILE="$SCRIPT_DIR/version.json"
INDEX_FILE="$SCRIPT_DIR/index.html"
SW_FILE="$SCRIPT_DIR/sw.js"

# القيمة الحالية
OLD_VERSION="غير محدد"
if [ -f "$VERSION_FILE" ]; then
    OLD_VERSION=$(grep '"v"' "$VERSION_FILE" | sed 's/.*"v": "\(.*\)".*/\1/')
fi

# توليد نسخة جديدة تلقائياً من التاريخ والوقت الحالي
NEW_VERSION=$(date +"%Y%m%d-%H%M")

# كتابة version.json
printf '{\n  "v": "%s"\n}\n' "$NEW_VERSION" > "$VERSION_FILE"
echo "✅ تم تحديث version.json: $NEW_VERSION"

# تحديث ?v= في index.html تلقائياً
if [ -f "$INDEX_FILE" ]; then
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        sed -i '' "s/?v=[0-9]\{8\}-[0-9]\{4\}/?v=$NEW_VERSION/g" "$INDEX_FILE"
    else
        # Linux
        sed -i "s/?v=[0-9]\{8\}-[0-9]\{4\}/?v=$NEW_VERSION/g" "$INDEX_FILE"
    fi
    echo "✅ تم تحديث ?v= في index.html"
fi

# تحديث CACHE_VERSION في sw.js تلقائياً (Service Worker الخاص بالـ PWA)
if [ -f "$SW_FILE" ]; then
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        sed -i '' "s/CACHE_VERSION = '[0-9]\{8\}-[0-9]\{4\}'/CACHE_VERSION = '$NEW_VERSION'/g" "$SW_FILE"
    else
        # Linux
        sed -i "s/CACHE_VERSION = '[0-9]\{8\}-[0-9]\{4\}'/CACHE_VERSION = '$NEW_VERSION'/g" "$SW_FILE"
    fi
    echo "✅ تم تحديث CACHE_VERSION في sw.js — الـ PWA سيكتشف النسخة الجديدة تلقائياً"
fi

echo ""
echo "==============================================="
echo "  النسخة القديمة : $OLD_VERSION"
echo "  النسخة الجديدة : $NEW_VERSION"
echo "==============================================="
echo ""
echo "  الخطوات التالية:"
echo "     1. ارفع جميع الملفات إلى Firebase"
echo "     2. cache-buster.js سيتعرف على التحديث تلقائياً"
echo "     3. تطبيق الـ PWA المثبّت سيسحب النسخة الجديدة تلقائياً (sw.js)"
echo ""

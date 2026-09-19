// ═══════════════════════════════════════════════════════════════
// منصة أفكار وأسرار — Data
// ═══════════════════════════════════════════════════════════════

const SITE_CONFIG = {
    name: 'أفكار وأسرار',
    fullName: 'منصة أفكار وأسرار التعليمية',
    subtitle: 'منصتك التعليمية الشاملة',
    description: 'منصة أفكار وأسرار التعليمية — كورسات ومدرسون متنوعون، شروحات مبسّطة، تمارين تفاعلية واختبارات إلكترونية شاملة لكل المراحل الدراسية.',
    teacher: 'Mr. Ali Mahrous',
    year: 2026,
};

const QUIZ_DATA = {
    title: 'Unit 1 Exam — Grammar & Vocabulary',
    questions: [
        {
            id: 'q1',
            text: 'Choose the correct form: "She ___ to school every day."',
            options: ['go', 'goes', 'going', 'gone'],
            correct: 1
        },
        {
            id: 'q2',
            text: 'What is the synonym of the word "happy" ?',
            options: ['sad', 'joyful', 'angry', 'tired'],
            correct: 1
        },
        {
            id: 'q3',
            text: 'What is the correct past simple form of the verb "write" ?',
            options: ['writed', 'wrote', 'written', 'writing'],
            correct: 1
        },
        {
            id: 'q4',
            text: 'Which sentence uses the present perfect tense correctly ?',
            options: ['I have saw the film.', 'I have seen the film.', 'I has seen the film.', 'I seen the film.'],
            correct: 1
        },
        {
            id: 'q5',
            text: 'Choose the correct preposition: "She is good ___ drawing."',
            options: ['in', 'at', 'on', 'for'],
            correct: 1
        }
    ]
};

const TESTIMONIALS_DATA = [
    {
        name: 'أحمد محمد',
        initials: 'أم',
        text: 'الشرح واضح وسهل الفهم، والاختبارات بتساعدني أعرف مستواي الحقيقي. حصلت على أعلى درجة في المادة بفضل المنصة.',
        rating: 5,
        grade: 'الصف الثالث الثانوي'
    },
    {
        name: 'فاطمة علي',
        initials: 'فع',
        text: 'المنصة غيّرت نظرتي للمادة تمامًا. كنت باكرهها، ودلوقتي بقت من أحب المواد ليا!',
        rating: 5,
        grade: 'الصف الأول الثانوي'
    },
    {
        name: 'عمر حسن',
        initials: 'عح',
        text: 'أسلوب الشرح ممتاز — خطوة بخطوة. الملخصات وملفات الـ PDF مفيدة جدًا وقت المراجعة.',
        rating: 5,
        grade: 'الصف الثاني الثانوي'
    },
    {
        name: 'نور الدين',
        initials: 'ند',
        text: 'المنصة سهلة الاستخدام والكورسات منظّمة جدًا. بنصح بيها أي طالب.',
        rating: 4,
        grade: 'الصف الثالث الإعدادي'
    },
    {
        name: 'ياسمين خالد',
        initials: 'يخ',
        text: 'أفضل منصة تعليمية استخدمتها. الاختبارات التفاعلية ممتازة وبتجهّزني كويس جدًا للامتحان الحقيقي.',
        rating: 5,
        grade: 'الصف الثالث الثانوي'
    },
    {
        name: 'كريم سعيد',
        initials: 'كس',
        text: 'الشرح واضح والتمارين متدرّجة. لاحظت تحسّن كبير في مستواي في شهر واحد بس.',
        rating: 5,
        grade: 'الصف الأول الثانوي'
    }
];

const FEATURES_DATA = [
    {
        icon: '💡',
        title: 'شرح مبسّط وبالمفهوم',
        description: 'شرح تدريجي من الأساسيات، بيوضّح كل فكرة بأمثلة عملية بدل الحفظ الأعمى — عشان الفكرة توصلك مش تتحفظ.',
        colorClass: 'green'
    },
    {
        icon: '📚',
        title: 'تغطية كاملة للمنهج',
        description: 'تغطية شاملة لتمارين المنهج الرسمي وأقوى أسئلة الامتحانات والوزارة في السنوات السابقة.',
        colorClass: 'yellow'
    },
    {
        icon: '📝',
        title: 'اختبارات إلكترونية تفاعلية',
        description: 'اختبارات محاكية لآخر العام بتصحيح فوري ونموذج إجابة بيشرح كل خطوة صح ليه.',
        colorClass: 'blue'
    },
    {
        icon: '📄',
        title: 'ملازم وملخصات PDF حصرية',
        description: 'ملخصات ملوّنة لكل القواعد والمفردات المهمة، وخرائط ذهنية لكل درس — جاهزة للتحميل والطباعة.',
        colorClass: 'green'
    },
    {
        icon: '📊',
        title: 'تقارير أداء ومتابعة مستمرة',
        description: 'متابعة تفصيلية لتقدّم كل طالب ودرجاته عشان نضمن له أعلى مستوى من التفوّق.',
        colorClass: 'yellow'
    },
    {
        icon: '💬',
        title: 'دعم تعليمي وأسئلة وأجوبة',
        description: 'فريق دعم متخصص متاح على مدار الساعة للإجابة على كل استفسارات الطلاب وحل أصعب المشاكل.',
        colorClass: 'blue'
    }
];

const STAGES_DATA = [
    {
        id: 'stage-3sec',
        title: 'الصف الثالث الثانوي',
        subtitle: 'مسار اللغة الإنجليزية',
        gradeTag: 'تالتة ثانوي',
        icon: '🎯',
        description: 'منهج كامل مع مراجعات ليلة الامتحان، بنك أسئلة الوزارة، وامتحانات نموذجية على الكتيّب.',
        tags: ['القواعد', 'فهم المقروء', 'مهارات الكتابة', 'بناء المفردات']
    },
    {
        id: 'stage-2sec',
        title: 'الصف الثاني الثانوي',
        subtitle: 'علمي وأدبي',
        gradeTag: 'تانية ثانوي',
        icon: '📊',
        description: 'شرح تفصيلي للقواعد، كتابة المقال، فهم المقروء، والمفردات التطبيقية.',
        tags: ['تراكيب القواعد', 'كتابة المقال', 'فهم المقروء', 'المفردات']
    },
    {
        id: 'stage-1sec',
        title: 'الصف الأول الثانوي',
        subtitle: 'عام وأزهري',
        gradeTag: 'أولى ثانوي',
        icon: '📖',
        description: 'أساس قوي للغة الإنجليزية في المرحلة الثانوية: قواعد، قراءة، كتابة، ومحادثة.',
        tags: ['أساسيات القواعد', 'مهارات القراءة', 'أساسيات الكتابة', 'مفردات يومية']
    },
    {
        id: 'stage-1prep',
        title: 'الصف الأول الإعدادي',
        subtitle: 'المرحلة الإعدادية',
        gradeTag: 'أولى إعدادي',
        icon: '🔤',
        description: 'بداية التفوّق في المرحلة الإعدادية — قواعد أساسية، إملاء، ومحادثة بسيطة.',
        tags: ['القواعد الأساسية', 'الإملاء والنطق', 'محادثة بسيطة', 'مفردات أساسية']
    },
    {
        id: 'stage-2prep',
        title: 'الصف الثاني الإعدادي',
        subtitle: 'المرحلة الإعدادية',
        gradeTag: 'تانية إعدادي',
        icon: '📊',
        description: 'أساس قوي في الأزمنة، تركيب الجملة، فقرات الفهم، وكتابة الخطابات.',
        tags: ['الأزمنة', 'تركيب الجملة', 'فهم المقروء', 'كتابة الخطابات']
    },
    {
        id: 'stage-3prep',
        title: 'الصف الثالث الإعدادي',
        subtitle: 'شهادة الإعدادية',
        gradeTag: 'تالتة إعدادي',
        icon: '🗣️',
        description: 'شرح متعمّق لمنهج الإعدادية يضمن الدرجة النهائية والتأهل للثانوية بتفوّق.',
        tags: ['القواعد والتركيب', 'فقرات القراءة', 'الوظائف والمفردات', 'تمارين']
    },
    {
        id: 'stage-free',
        title: 'كورسات تأسيسية مجانية',
        subtitle: 'متاحة للجميع 🎁',
        gradeTag: 'مجاني',
        icon: '🎁',
        description: 'كورس تأسيسي وتعريفي مجاني 100% عشان تجرّب طريقة الشرح وتتقن أساسيات اللغة.',
        tags: ['أساسيات القواعد', 'أساسيات المفردات', 'جمل بسيطة', 'هدية المنصة']
    }
];

const FAQ_DATA = [
    {
        q: 'إزاي أسجّل وأبدأ أشاهد الكورسات؟',
        a: 'اضغط على زر "أنشئ حسابك" أعلى الصفحة وأدخل بياناتك (الاسم، رقم الهاتف، الصف الدراسي، وكلمة مرور من 6 أحرف). بعد التسجيل تقدر تشاهد الكورسات المجانية فورًا، أو تفعّل كورس صفّك بكود التفعيل.'
    },
    {
        q: 'إيه هو كود التفعيل وإزاي أحصل عليه؟',
        a: 'كود التفعيل هو كود خاص بيستخدم لفتح كورس مدفوع على المنصة مدى الحياة. تقدر تحصل عليه من مركز المدرّس أو بالتواصل مع فريق الدعم الفني مباشرة عبر واتساب.'
    },
    {
        q: 'هل الفيديوهات والملازم متاحة طول الترم الدراسي؟',
        a: 'أكيد! بمجرد ما تفعّل الكورس، كل الفيديوهات والاختبارات التفاعلية وملفات الـ PDF بتفضل متاحة ليك 24 ساعة طول الترم الدراسي — تقدر تشاهدها وتراجعها براحتك قد ما تحب.'
    },
    {
        q: 'هل المنصة فيها اختبارات إلكترونية بتصحيح فوري؟',
        a: 'أكيد! بعد كل وحدة ودرس فيه اختبار إلكتروني تفاعلي بيحاكي أحدث مواصفات امتحانات الوزارة، بتصحيح فوري ونموذج إجابة مفصّل بيوضح كل خطوة صح ليه.'
    },
    {
        q: 'هل المنصة بتشتغل على الموبايل والتابلت والكمبيوتر؟',
        a: 'أيوه، منصة أفكار وأسرار مصمَّمة تشتغل بسلاسة على كل الأجهزة: الموبايل والتابلت واللابتوب وأجهزة الكمبيوتر.'
    },
    {
        q: 'إزاي أقدر أتواصل مع فريق الدعم عشان أسأل وأتابع الواجبات؟',
        a: 'فيه فريق تعليمي متخصص، بالإضافة إلى جروبات واتساب وتيليجرام للطلاب المشتركين، للإجابة على كل الأسئلة وحل أصعب المشاكل ومتابعة الواجبات والاختبارات الدورية.'
    }
];

const STATS_DATA = [
    { icon: '👨‍🎓', number: 5000, suffix: '+', label: 'طالب متفوّق' },
    { icon: '📚', number: 150, suffix: '+', label: 'درس ومحاضرة' },
    { icon: '⏱️', number: 120, suffix: '+', label: 'ساعة محتوى تفاعلي' },
    { icon: '⭐', number: 99, suffix: '%', label: 'نسبة النجاح والتفوّق' },
];

const CURRENT_USER = {
    name: 'أحمد محمد',
    initials: 'أم',
    email: 'student@example.com',
    phone: '01012345678',
    grade: 'أولى ثانوي',
    enrolledCourses: ['english-grade1-term1', 'english-grade2-term1'],
    completedLessons: 5,
    totalLessons: 54,
    avgScore: 87,
};

const ACTIVITY_DATA = [
    { icon: '✅', text: 'أنهى درس "Present Perfect Tense"', time: 'قبل ساعتين', color: 'green' },
    { icon: '📝', text: 'حقّق 90% في اختبار القواعد', time: 'قبل 5 ساعات', color: 'yellow' },
    { icon: '🎥', text: 'شاهد درس "مهارات فهم المقروء"', time: 'أمس', color: 'blue' },
    { icon: '📄', text: 'حمّل ملخص الوحدة الأولى PDF', time: 'قبل يومين', color: 'red' },
    { icon: '🏆', text: 'أنهى الوحدة الأولى بنجاح', time: 'قبل 3 أيام', color: 'green' },
];

// ═══════════════════════════════════════════════════════════════
// ADMIN CONFIG
// ═══════════════════════════════════════════════════════════════
const ADMIN_EMAIL = 'admin@iraqi.com';
const ADMIN_PASSWORD = 'adm123';

// ═══════════════════════════════════════════════════════════════
// LESSONS DATABASE — localStorage CRUD
// ═══════════════════════════════════════════════════════════════
const LESSONS_KEY = 'iraqiplatform_lessons';
const CONTENTS_KEY = 'iraqiplatform_contents';

// ── Lessons ──────────────────────────────────────────────────

function getLessons() {
    try { return JSON.parse(localStorage.getItem(LESSONS_KEY)) || []; }
    catch (e) { return []; }
}

function saveLessons(lessons) {
    localStorage.setItem(LESSONS_KEY, JSON.stringify(lessons));
    if (typeof window.FirebaseService !== 'undefined' && window.FirebaseService.lessons) {
        try { (lessons || []).forEach(l => window.FirebaseService.lessons.saveLesson(l)); } catch (e) { }
    }
}

function getCourseLessons(courseId) {
    return getLessons()
        .filter(l => l.courseId === courseId)
        .sort((a, b) => (a.order || 0) - (b.order || 0));
}

function createLesson(courseId, data) {
    const lessons = getLessons();
    const courseLessons = getCourseLessons(courseId);
    const newLesson = {
        lessonId: 'lesson_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
        courseId: courseId,
        title: data.title || 'New Lesson',
        description: data.description || '',
        order: data.order || (courseLessons.length + 1),
        status: data.status || 'published',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };
    lessons.push(newLesson);
    saveLessons(lessons);
    return newLesson;
}

function updateLesson(lessonId, data) {
    const lessons = getLessons();
    const idx = lessons.findIndex(l => l.lessonId === lessonId);
    if (idx === -1) return null;
    lessons[idx] = {
        ...lessons[idx],
        ...data,
        lessonId: lessonId, // لا نغيّر الـ ID
        updatedAt: new Date().toISOString(),
    };
    saveLessons(lessons);
    return lessons[idx];
}

function deleteLesson(lessonId) {
    // حذف الدرس وجميع محتوياته
    const lessons = getLessons().filter(l => l.lessonId !== lessonId);
    saveLessons(lessons);
    const contents = getContents().filter(c => c.lessonId !== lessonId);
    saveContents(contents);
}

function reorderLessons(courseId, orderedIds) {
    const lessons = getLessons();
    orderedIds.forEach((id, index) => {
        const idx = lessons.findIndex(l => l.lessonId === id);
        if (idx !== -1) {
            lessons[idx].order = index + 1;
            lessons[idx].updatedAt = new Date().toISOString();
        }
    });
    saveLessons(lessons);
}

// ── Contents ─────────────────────────────────────────────────

function getContents() {
    try { return JSON.parse(localStorage.getItem(CONTENTS_KEY)) || []; }
    catch (e) { return []; }
}

function saveContents(contents) {
    localStorage.setItem(CONTENTS_KEY, JSON.stringify(contents));
    if (typeof window.FirebaseService !== 'undefined' && window.FirebaseService.lessons) {
        try { (contents || []).forEach(c => window.FirebaseService.lessons.saveContent(c)); } catch (e) { }
    }
}

function getLessonContents(lessonId) {
    return getContents()
        .filter(c => c.lessonId === lessonId)
        .sort((a, b) => (a.order || 0) - (b.order || 0));
}

function createContent(lessonId, data) {
    const contents = getContents();
    const lessonContents = getLessonContents(lessonId);
    const newContent = {
        contentId: 'content_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
        lessonId: lessonId,
        type: data.type || 'video',
        title: data.title || 'New Content',
        content: data.content || '',
        duration: data.duration || '',
        order: data.order || (lessonContents.length + 1),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };
    contents.push(newContent);
    saveContents(contents);
    return newContent;
}

function updateContent(contentId, data) {
    const contents = getContents();
    const idx = contents.findIndex(c => c.contentId === contentId);
    if (idx === -1) return null;
    contents[idx] = {
        ...contents[idx],
        ...data,
        contentId: contentId,
        updatedAt: new Date().toISOString(),
    };
    saveContents(contents);
    return contents[idx];
}

function deleteContent(contentId) {
    const contents = getContents().filter(c => c.contentId !== contentId);
    saveContents(contents);
}

function reorderContents(lessonId, orderedIds) {
    const contents = getContents();
    orderedIds.forEach((id, index) => {
        const idx = contents.findIndex(c => c.contentId === id);
        if (idx !== -1) {
            contents[idx].order = index + 1;
            contents[idx].updatedAt = new Date().toISOString();
        }
    });
    saveContents(contents);
}

// ── Content Type Config ───────────────────────────────────────
const CONTENT_TYPES = [
    { value: 'video', label: 'Video', icon: '🎥', badge: 'badge-primary' },
    { value: 'pdf', label: 'PDF Document', icon: '📄', badge: 'badge-danger' },
    { value: 'quiz', label: 'Quiz', icon: '📝', badge: 'badge-accent' },
    { value: 'text', label: 'Text / Notes', icon: '📋', badge: 'badge-success' },
];

function getContentTypeConfig(type) {
    return CONTENT_TYPES.find(t => t.value === type) || CONTENT_TYPES[0];
}

// ── Bridge Helper for Student View ────────────────────────────
function getEffectiveCoursePackages(course, isEnrolled) {
    if (!course) return [];

    function normalizeVideoUrl(url) {
        return String(url || '')
            .trim()
            .replace(/[?&]autoplay=false\b/g, '')
            .replace(/\/$/, '')
            .toLowerCase();
    }

    function uniqueSegments(segs) {
        var seen = {};
        return (Array.isArray(segs) ? segs : []).filter(function (s) {
            if (!s) return false;
            var bunnyId = String(s.bunnyVideoId || '').trim();
            var videoUrl = normalizeVideoUrl(s.videoUrl || s.content || '');
            if (!bunnyId && !videoUrl) return false;
            var key = bunnyId ? ('b:' + bunnyId) : ('u:' + videoUrl);
            if (seen[key]) return false;
            seen[key] = true;
            return true;
        });
    }

    // ── Check Enrollment Status ────────────────────────────────
    var enrolled = isEnrolled;
    if (enrolled === undefined) {
        try {
            var session = JSON.parse(localStorage.getItem('iraqiplatform_current_user') || 'null');
            if (session && Array.isArray(session.enrolledCourses)) {
                enrolled = session.enrolledCourses.some(function (id) {
                    return String(id) === String(course.id);
                });
            }
        } catch (e) { enrolled = false; }
    }
    var courseUnlocked = !!course.isFree || !!enrolled;

    // ── 1. If course has direct lessons (Firebase / Dashboard) ──
    if (Array.isArray(course.lessons) && course.lessons.length > 0) {
        var pkgs = course.lessons.map(function (dl, idx) {
            var lessonId = String(dl.id || ('l_' + course.id + '_' + idx));
            var segs = Array.isArray(dl.segments) && dl.segments.length > 0 ? dl.segments : [];
            var validSegs = uniqueSegments(segs);

            var rawVideo = dl.videoUrl || '';
            if (!rawVideo && dl.bunnyVideoId) {
                rawVideo = 'https://iframe.mediadelivery.net/embed/691851/' + dl.bunnyVideoId + '?autoplay=false';
            }
            if (rawVideo && validSegs.length === 1) {
                var onlySegUrl = validSegs[0].bunnyVideoId
                    ? ('https://iframe.mediadelivery.net/embed/691851/' + validSegs[0].bunnyVideoId)
                    : (validSegs[0].videoUrl || '');
                if (normalizeVideoUrl(onlySegUrl) === normalizeVideoUrl(rawVideo)) rawVideo = onlySegUrl;
            }
            if (!rawVideo && validSegs.length > 0) {
                var firstS = validSegs[0];
                rawVideo = firstS.bunnyVideoId
                    ? ('https://iframe.mediadelivery.net/embed/691851/' + firstS.bunnyVideoId + '?autoplay=false')
                    : (firstS.videoUrl || '');
            }

            var hasVideo = Boolean(rawVideo || validSegs.length > 0);
            var hasPdf = Boolean(dl.pdfUrl && dl.pdfUrl.trim() !== '');
            var hasQuiz = Boolean(dl.quizId != null && dl.quizId !== '');
            var contentType = hasVideo ? 'video' : (hasQuiz ? 'quiz' : (hasPdf ? 'pdf' : 'video'));

            var pkgLessons = [];

            // Multiple video segments
            if (validSegs.length > 1) {
                validSegs.forEach(function (seg, si) {
                    var sUrl = seg.bunnyVideoId
                        ? ('https://iframe.mediadelivery.net/embed/691851/' + seg.bunnyVideoId + '?autoplay=false')
                        : (seg.videoUrl || '');
                    pkgLessons.push({
                        id: String(seg.id || (lessonId + '_seg_' + si)),
                        lessonId: lessonId,
                        title: seg.title || (dl.title + ' — Part ' + (si + 1)),
                        description: dl.description || '',
                        type: 'video',
                        duration: seg.duration || dl.duration || '—',
                        content: sUrl,
                        videoUrl: sUrl,
                        bunnyVideoId: seg.bunnyVideoId || '',
                        segments: validSegs,
                        pdfUrl: dl.pdfUrl || '',
                        pdfName: dl.pdfName || '',
                        quizId: dl.quizId || null,
                        isCompleted: false,
                        isLocked: !courseUnlocked && (idx > 0 || si > 0)
                    });
                });
            } else {
                // Single segment or standard lesson
                var singleTitle = dl.title || (validSegs[0] && validSegs[0].title) || ('Lesson ' + (idx + 1));
                var singleDuration = (validSegs[0] && validSegs[0].duration) || dl.duration || '—';
                pkgLessons.push({
                    id: lessonId,
                    lessonId: lessonId,
                    title: singleTitle,
                    description: dl.description || '',
                    type: contentType,
                    duration: singleDuration,
                    content: rawVideo || dl.pdfUrl || String(dl.quizId || ''),
                    videoUrl: rawVideo,
                    bunnyVideoId: dl.bunnyVideoId || (validSegs[0] ? validSegs[0].bunnyVideoId : ''),
                    segments: validSegs,
                    pdfUrl: dl.pdfUrl || '',
                    pdfName: dl.pdfName || '',
                    quizId: dl.quizId || null,
                    isCompleted: false,
                    isLocked: !courseUnlocked && idx > 0
                });
            }

            return {
                id: 'pkg_' + lessonId,
                title: dl.title || ('Lesson ' + (idx + 1)),
                description: dl.description || '',
                lessons: pkgLessons
            };
        });

        if (pkgs.length > 0) return pkgs;
    }

    // ── 2. Bridge dashboard courses (getDashCoursePackages) ──
    if (typeof window.getDashCoursePackages === 'function') {
        var dashPkgs = window.getDashCoursePackages(course.id);
        if (dashPkgs && dashPkgs.length > 0) {
            return dashPkgs.map(function (pkg, pIdx) {
                return Object.assign({}, pkg, {
                    lessons: (pkg.lessons || []).map(function (l, idx) {
                        return Object.assign({}, l, {
                            isLocked: !courseUnlocked && (pIdx > 0 || idx > 0)
                        });
                    })
                });
            });
        }
    }

    // ── 3. Packages embedded in course ──
    if (Array.isArray(course.packages) && course.packages.length > 0) {
        return course.packages.map(function (pkg, pIdx) {
            return Object.assign({}, pkg, {
                lessons: (pkg.lessons || []).map(function (l, idx) {
                    return Object.assign({}, l, {
                        isLocked: l.isLocked || (!courseUnlocked && (pIdx > 0 || idx > 0))
                    });
                })
            });
        });
    }

    // ── 4. Dynamic local storage lessons (fallback) ──
    var dynamicLessons = typeof getCourseLessons === 'function' ? getCourseLessons(course.id) : [];
    if (dynamicLessons && dynamicLessons.length > 0) {
        return dynamicLessons.map(function (dl, idx) {
            var contents = typeof getLessonContents === 'function' ? getLessonContents(dl.lessonId) : [];
            return {
                id: dl.lessonId,
                title: dl.title || ('Lesson ' + (idx + 1)),
                description: dl.description || '',
                lessons: contents.length > 0
                    ? contents.map(function (c, cIdx) {
                        return {
                            id: c.contentId,
                            lessonId: dl.lessonId,
                            title: c.title || ('Content ' + (cIdx + 1)),
                            type: c.type || 'video',
                            duration: c.duration || '—',
                            content: c.content || '',
                            videoUrl: c.type === 'video' ? c.content : '',
                            pdfUrl: c.type === 'pdf' ? c.content : '',
                            quizId: c.type === 'quiz' ? c.content : null,
                            isCompleted: false,
                            isLocked: !courseUnlocked && (idx > 0 || cIdx > 0)
                        };
                    })
                    : [{
                        id: dl.lessonId,
                        lessonId: dl.lessonId,
                        title: dl.title || 'Lesson Content',
                        type: 'video',
                        duration: '—',
                        content: '',
                        isCompleted: false,
                        isLocked: !courseUnlocked && idx > 0
                    }]
            };
        });
    }

    return [];
}


// ── getAllCourses: fallback إذا لم يُحمَّل dashboard-bridge.js ──
if (typeof window !== 'undefined') {
    window.SITE_CONFIG = SITE_CONFIG;
    window.COURSES_DATA = typeof COURSES_DATA !== 'undefined' ? COURSES_DATA : [];
    window.STAGES_DATA = STAGES_DATA;
    window.FAQ_DATA = typeof FAQ_DATA !== 'undefined' ? FAQ_DATA : [];
    window.FEATURES_DATA = typeof FEATURES_DATA !== 'undefined' ? FEATURES_DATA : [];
    if (typeof window.getAllCourses !== 'function') {
        window.getAllCourses = function () { return window.COURSES_DATA; };
    }
}

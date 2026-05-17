// 1. وظيفة لجعل المنيو (Navbar) يتغير لونه عند السكرول
window.onscroll = function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = '#ffffff';
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = 'transparent'; // أو اللون الأساسي
    }
};

// 2. وظيفة للتأكد من حذف مشروع (تنبيه تأكيدي)
function confirmDelete(projectName) {
    return confirm(`هل أنت متأكد من حذف مشروع: ${projectName}؟`);
}

// 3. وظيفة لإظهار رسائل نجاح أو خطأ (Alerts) بشكل شيك
function showAlert(message, type = 'success') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `custom-alert ${type}`;
    alertDiv.innerHTML = message;
    document.body.appendChild(alertDiv);
    
    // تختفي بعد 3 ثواني
    setTimeout(() => {
        alertDiv.remove();
    }, 3000);
}

// 4. قراءة بيانات الـ URL (مفيدة جداً في الفلترة بين الصفحات)
const getQueryParam = (param) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
};
// بيانات المشاريع (قاعدة بيانات مؤقتة)
const projectsData = {
    "1": {
        title: "تشكيل المعادن بالزيادة (ISMF)",
        category: "هندسة الإنتاج والتصميم الميكانيكي",
        abstract: "دراسة تقنية التشكيل بالزيادة أحادي النقطة (SPIF) لسبائك الألمنيوم 1050، وفهم ظاهرة ترقق المعدن باستخدام ماكينات CNC وربطها بالمحاكاة الحاسوبية.",
        problem: "ارتفاع تكاليف القوالب المعدنية وصعوبة تعديل التصاميم في الطرق التقليدية.",
        solution: "استخدام تقنية ISMF التي تعتمد على مسارات مبرمجة للأداة مما يلغي الحاجة للقوالب تماماً.",
        aims: ["تحليل تأثير سرعة التغذية على الدقة", "دراسة ترقق السمك", "استخدام FEA للمحاكاة"],
        pdfUrl: "files/خلاص.pdf",
        team: [
            { name: "م/ علي عبد العزيز", role: "مشرف مساعد" },
            { name: "م/ محمد كوتة", role: "أخصائي CNC" }
        ],
        techData: { material: "Aluminum 1050", software: "MATLAB", machine: "Extron CNC" }
    }
    // هنا هنضيف المشروع رقم 2 و 3 بنفس الطريقة لما تبعتهم
};

// وظيفة تحديث الصفحة بالبيانات
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const projectId = params.get('id');

    if (projectId && projectsData[projectId]) {
        const p = projectsData[projectId];
        document.getElementById('p-title').innerText = p.title;
        document.getElementById('p-category').innerText = p.category;
        document.getElementById('p-abstract').innerText = p.abstract;
        document.getElementById('p-problem').innerText = p.problem;
        document.getElementById('p-solution').innerText = p.solution;
        document.getElementById('p-pdf-link').href = p.pdfUrl;

        // تحديث الأهداف
        const aimsList = document.getElementById('p-aims');
        aimsList.innerHTML = p.aims.map(aim => `<li>${aim}</li>`).join('');
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const projectId = params.get('id');

    if (projectId && projectsData[projectId]) {
        // كود المسح والتحديث اللي بعتهولك فوق
    } else {
        console.error("المشروع غير موجود أو الـ ID خطأ");
    }
});
function performSearch() {
    const query = document.getElementById('facultySearch').value.trim();
    
    // التحويل بناءً على الكلمة المكتوبة
    if (query.includes('هندسة')) {
        window.location.href = 'engineering.html';
    } else if (query.includes('نوعية') || query.includes('تربية')) {
        window.location.href = 'art-education.html'; // اسم الصفحة اللي هتعمليها للتربية النوعية
    } else if (query === "") {
        alert("من فضلك اكتب اسم الكلية أولاً");
    } else {
        alert("عذراً، هذه الكلية غير مضافة حالياً في النظام");
    }
}

// تشغيل البحث عند الضغط على Enter
document.getElementById('facultySearch')?.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        performSearch();
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    if (id && projectsData[id]) {
        const p = projectsData[id];
        document.getElementById('p-title').innerText = p.title;
        document.getElementById('p-category').innerText = p.category;
        document.getElementById('p-abstract').innerText = p.abstract;
        document.getElementById('p-problem').innerText = p.problem;
        document.getElementById('p-solution').innerText = p.solution;
        document.getElementById('p-pdf-link').href = p.pdfUrl;
        
        const teamHtml = p.team.map(name => `<li>${name}</li>`).join('');
        document.getElementById('p-team-list').innerHTML = teamHtml;
    }
});
// 1. قائمة المشاريع والصفحات (تأكد من أن الـ link يطابق اسم الملف عندك)
const projects = [
    { title: "أثر مياه صرف الألبان على البلطي", link: "projectview.html?id=dairy_waste", dept: "كلية العلوم" },
    { title: "المعالجة البيولوجية للمياه (Cenchrus ciliaris)", link: "projectview.html?id=bio_treatment", dept: "كلية العلوم" },
    { title: "البلاستيك الحيوي من قشور الموز", link: "projectview.html?id=plastic", dept: "كلية العلوم" },
    { title: "مشروع الأساسات Foundation Project", link: "projectview.html?id=foundation", dept: "هندسة مدنية" },
    { title: "كلية العلوم", link: "science.html", dept: "الأقسام" },
    { title: "الهندسة المدنية", link: "civil_projects.html", dept: "الأقسام" }
];

function liveSearch() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const resultsContainer = document.getElementById('searchResults');
    
    if (input.length === 0) {
        resultsContainer.style.display = "none";
        return;
    }

    const filtered = projects.filter(p => p.title.toLowerCase().includes(input));

    if (filtered.length > 0) {
        // توليد النتائج مع التأكد من أن كل رابط (<a>) يحتوي على مسار صحيح
        resultsContainer.innerHTML = filtered.map(p => `
            <a href="${p.link}" class="search-item">
                <div class="search-item-info">
                    <span class="search-item-title">${p.title}</span>
                    <span class="search-item-dept">${p.dept}</span>
                </div>
                <i class="fas fa-chevron-left"></i>
            </a>
        `).join('');
        resultsContainer.style.display = "block";
    } else {
        resultsContainer.innerHTML = '<div class="search-item" style="color:#94a3b8;">لا توجد نتائج مطابقة..</div>';
        resultsContainer.style.display = "block";
    }
}

// 2. كود إضافي للتأكد من إغلاق القائمة عند الضغط خارجها
document.addEventListener('click', function(event) {
    const searchWrapper = document.querySelector('.search-wrapper');
    const resultsContainer = document.getElementById('searchResults');
    if (!searchWrapper.contains(event.target)) {
        resultsContainer.style.display = 'none';
    }
});
function logout() {
    // مسح البيانات من المتصفح
    localStorage.removeItem('role');
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('userName');

    // توجيه المستخدم للرئيسية
    window.location.href = "index.html";
}
// 1. وظيفة تسجيل الخروج الموحدة
function logout() {
    localStorage.clear(); // مسح كل البيانات
    window.location.href = "index.html";
}

// 2. تحديث شكل النيف بار بناءً على حالة الدخول
document.addEventListener('DOMContentLoaded', function() {
    const navControls = document.querySelector('.nav-controls');
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const role = localStorage.getItem('role');

    if (isLoggedIn === 'true' && navControls) {
        if (role === 'admin') {
            navControls.innerHTML = `
                <a href="admin.html" class="btn btn-team">لوحة التحكم</a>
                <button onclick="logout()" class="btn-logout" style="margin-right:10px; background:#ef4444; color:white; border:none; padding:8px 15px; border-radius:8px; cursor:pointer;">خروج</button>
            `;
        } else {
            navControls.innerHTML = `
                <span style="color:white; margin-left:10px;">مرحباً ${localStorage.getItem('userName') || 'طالب'}</span>
                <button onclick="logout()" class="btn-logout" style="background:#ef4444; color:white; border:none; padding:8px 15px; border-radius:8px; cursor:pointer;">خروج</button>
            `;
        }
    }
});
// 1. تغيير خلفية النيف بار عند السكرول
window.onscroll = function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.background = '#ffffff';
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            navbar.style.background = 'white'; // لضمان الوضوح دائماً
        }
    }
};

// 2. إدارة جلسة المستخدم (Login/Logout)
document.addEventListener('DOMContentLoaded', function() {
    const navControls = document.querySelector('.nav-controls');
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const role = localStorage.getItem('role');
    const userName = localStorage.getItem('userName') || 'طالب';

    if (isLoggedIn === 'true' && navControls) {
        let controlsHTML = `<span class="user-welcome">مرحباً، ${userName}</span>`;
        
        if (role === 'admin') {
            controlsHTML += `<a href="admin.html" class="btn-admin-nav">لوحة التحكم</a>`;
        }
        
        controlsHTML += `<button onclick="logout()" class="btn-logout-main">خروج</button>`;
        navControls.innerHTML = controlsHTML;
    }
});

function logout() {
    if(confirm("هل تريد تسجيل الخروج؟")) {
        localStorage.clear();
        window.location.href = "index.html";
    }
}
const videoContainer = document.getElementById('videoContainer');

if (data.embed_id === "R9KOnS_bQf0") {
    // لو هو مشروع مدني المقفول، هنعرض بوستر فخم مع زرار انتقال لليوتيوب
    videoContainer.innerHTML = `
        <div style="position: absolute; width:100%; height:100%; background: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.7)), url('https://img.youtube.com/vi/${data.embed_id}/maxresdefault.jpg') center/cover; z-index:1;"></div>
        <a href="${data.youtube_url}" target="_blank" style="position: relative; z-index: 2; text-decoration: none; background: #ef4444; color: white; padding: 15px 30px; border-radius: 50px; font-weight: bold; font-size: 16px; display: flex; align-items: center; gap: 10px; box-shadow: 0 4px 15px rgba(239, 68, 68, 0.4); transition: 0.3s;">
            <i class="fab fa-youtube" style="font-size: 24px;"></i> مشاهدة العرض المباشر على YouTube
        </a>
    `;
} else {
    // لو أي مشروع تاني وفيديوه شغال عادي، هيعرض الـ iframe الطبيعي
    videoContainer.innerHTML = `
        <iframe src="https://www.youtube.com/embed/${data.embed_id}" width="100%" height="100%" style="border:none;" allowfullscreen></iframe>
    `;
}
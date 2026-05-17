// وظائف فتح وقفل نافذة الشات
function toggleChat() {
    const chatBox = document.querySelector('.chat-box');
    chatBox.style.display = (chatBox.style.display === 'block') ? 'none' : 'block';
}

document.getElementById('chat-circle').addEventListener('click', toggleChat);
document.querySelector('.chat-box-toggle').addEventListener('click', toggleChat);

// التعامل مع إرسال الرسائل وربط Gemini API
const chatForm = document.querySelector('.chat-input form');
const chatInput = document.getElementById('chat-input');
const chatLogs = document.querySelector('.chat-logs');

chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const msg = chatInput.value.trim();
    if (!msg) return;

    appendMessage(msg, 'user');
    chatInput.value = '';

    // إظهار علامة "جاري التفكير..."
    appendMessage("...", 'ai-temp');

    try {
        const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=YOUR_API_KEY', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: "أنت مساعد ذكي لمنصة Projexa لجامعة بورسعيد. أجب باختصار وودودة: " + msg }] }]
            })
        });
        
        const data = await response.json();
        const aiMsg = data.candidates[0].content.parts[0].text;
        
        // مسح علامة التفكير وإضافة الرد الحقيقي
        document.querySelector('.ai-temp').remove();
        appendMessage(aiMsg, 'ai');
    } catch (error) {
        if(document.querySelector('.ai-temp')) document.querySelector('.ai-temp').remove();
        appendMessage("عذراً، واجهت مشكلة في الاتصال بـ Gemini.", 'ai');
    }
});

function appendMessage(text, type) {
    const div = document.createElement('div');
    div.classList.add('chat-msg', type);
    div.innerHTML = `<div class="cm-msg-text">${text}</div>`;
    chatLogs.appendChild(div);
    chatLogs.scrollTop = chatLogs.scrollHeight;
}
// كود التحقق من صلاحية الأدمن عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const userRole = params.get('role');

    if (userRole === 'admin') {
        // 1. إظهار كل العناصر التي تحمل كلاس admin-only
        const adminElements = document.querySelectorAll('.admin-only');
        adminElements.forEach(el => {
            el.style.display = 'block'; 
        });

        // 2. إضافة رسالة ترحيبية في الكونسول للتأكد
        console.log("تم تسجيل الدخول كمسؤول للمنصة");
        
        // 3. يمكنك إضافة زرار "خروج من وضع الإدارة" يرجعك للصفحة الرئيسية
        const nav = document.querySelector('.nav-links');
        if(nav) {
            nav.innerHTML += '<li><a href="projects.html" style="color:red">خروج من الإدارة</a></li>';
        }
    }
});
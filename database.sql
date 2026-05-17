-- 1. إنشاء قاعدة البيانات بالترميز العربي العالمي الموحد
CREATE DATABASE IF NOT EXISTS projexa_db 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE projexa_db;

-- --------------------------------------------------------
-- 2. جدول المستخدمين (تأمين الحسابات والصلاحيات)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL, -- لتخزين الباسورد مشفرة (Hash)
    role ENUM('student', 'admin', 'instructor') DEFAULT 'student',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 3. جدول الكليات والأقسام (جامعة بورسعيد)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS faculties (
    id INT AUTO_INCREMENT PRIMARY KEY,
    faculty_name VARCHAR(150) NOT NULL, -- اسم الكلية (مثل: الهندسة)
    department_name VARCHAR(150) NULL   -- اسم القسم إن وجد (مثل: هندسة الحاسبات والتحكم)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 4. جدول مشاريع التخرج الكامل
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    project_slug VARCHAR(100) NOT NULL UNIQUE, -- الـ ID اللي هيظهر في الرابط (مثل: fashion_heritage)
    title VARCHAR(255) NOT NULL,               -- عنوان المشروع
    description TEXT NOT NULL,                 -- وصف المشروع بالتفصيل
    summary TEXT NULL,                         -- ملخص سريع للمستثمرين
    team_members TEXT NOT NULL,                -- أسماء الطلاب المشاركين في الفريق
    graduation_year INT NOT NULL,              -- سنة التخرج دفعة (2025 / 2026...)
    faculty_id INT,                            -- الربط مع الكلية والقسم
    video_url VARCHAR(255) NULL,               -- رابط فيديو اليوتيوب أو العرض
    pdf_url VARCHAR(255) NULL,                 -- رابط ملف التقرير الـ PDF
    
    -- جزء حاضنة الأعمال والاستثمار الخاص بصفحة external_projects
    is_investment_ready TINYINT(1) DEFAULT 0,  -- 1 يعرض في حاضنة الأعمال، 0 مشروع عادي
    market_size VARCHAR(100) NULL,             -- حجم السوق المستهدف (TAM)
    required_funding VARCHAR(100) NULL,        -- التمويل المطلوب
    expected_irr VARCHAR(50) NULL,             -- معدل العائد المتوقع
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (faculty_id) REFERENCES faculties(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ========================================================
-- 📊 بيانات تجريبية (بيانات الكليات والأقسام لربطها بالمنصة فوراً)
-- ========================================================
INSERT INTO faculties (faculty_name, department_name) VALUES 
('كلية الحاسبات والمعلومات', NULL),
('كلية الهندسة', 'هندسة الحاسبات والتحكم'),
('كلية الهندسة', 'الهندسة المعمارية'),
('كلية الهندسة', 'الهندسة المدنية'),
('كلية التربية النوعية', 'تكنولوجيا التعليم'),
('كلية التربية النوعية', 'الاقتصاد المنزلي'),
('كلية العلوم', NULL);
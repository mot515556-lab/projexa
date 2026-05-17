<?php
-- تفعيل الـ CORS علشان صفحات الـ HTML تقدر تتصل بالملف ده بدون مشاكل أمنية
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

-- --------------------------------------------------------
-- 1. بيانات الاتصال بقاعدة البيانات
-- --------------------------------------------------------
-- ملحوظة: الـ localhost و root والـ باسورد الفاضية دي بتاعت جهازك (XAMPP)
-- لما تشتري السيرفر الحقيقي، هتعير الـ username والـ password واسم الداتا بيز حسب السيرفر الجديد.
$host = "localhost"; // غالباً بيبقى localhost زي ما هو
$db_name = "اسم_قاعدة_البيانات_الجديدة_على_السيرفر";
$username = "اسم_مستخدم_الداتا_بيز_الجديد";
$password = "باسورد_الداتا_بيز_الجديدة";
try {
    $conn = new PDO("mysql:host=" . $host . ";dbname=" . $db_name . ";charset=utf8mb4", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $exception) {
    echo json_encode(array("error" => "خطأ في الاتصال بقاعدة البيانات: " . $exception->getMessage()));
    exit();
}

-- --------------------------------------------------------
-- 2. تحديد الأكشن المطلوبة من الجافا سكريبت
-- --------------------------------------------------------
$action = isset($_GET['action']) ? $_GET['action'] : '';

-- [الأكشن الأول]: جلب المشاريع بناءً على الكلية أو القسم
if ($_SERVER['REQUEST_METHOD'] === 'GET' && $action === 'get_projects') {
    $faculty = isset($_GET['faculty']) ? $_GET['faculty'] : '';
    $dept = isset($_GET['dept']) ? $_GET['dept'] : '';
    
    if (!empty($dept)) {
        -- جلب مشاريع قسم معين (مثل الاقتصاد المنزلي)
        $stmt = $conn->prepare("SELECT p.*, f.faculty_name, f.department_name FROM projects p JOIN faculties f ON p.faculty_id = f.id WHERE f.department_name = ?");
        $stmt->execute([$dept]);
    } elseif (!empty($faculty)) {
        -- جلب مشاريع كلية بالكامل (مثل الحاسبات والمعلومات أو الهندسة)
        $stmt = $conn->prepare("SELECT p.*, f.faculty_name, f.department_name FROM projects p JOIN faculties f ON p.faculty_id = f.id WHERE f.faculty_name = ?");
        $stmt->execute([$faculty]);
    } else {
        -- جلب كل المشاريع المرفوعة على المنصة بالكامل
        $stmt = $conn->prepare("SELECT p.*, f.faculty_name, f.department_name FROM projects p LEFT JOIN faculties f ON p.faculty_id = f.id");
        $stmt->execute();
    }
    
    $projects = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($projects);
    exit();
}

-- [الأكشن الثاني]: جلب تفاصيل مشروع واحد محدد (علشان صفحة projectview.html)
if ($_SERVER['REQUEST_METHOD'] === 'GET' && $action === 'get_project_details') {
    $slug = isset($_GET['slug']) ? $_GET['slug'] : '';
    
    if (!empty($slug)) {
        $stmt = $conn->prepare("SELECT p.*, f.faculty_name, f.department_name FROM projects p LEFT JOIN faculties f ON p.faculty_id = f.id WHERE p.project_slug = ?");
        $stmt->execute([$slug]);
        $project = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($project) {
            echo json_encode($project);
        } else {
            echo json_encode(array("error" => "المشروع غير موجود"));
        }
    } else {
        echo json_encode(array("error" => "كود المشروع مفقود"));
    }
    exit();
}

-- لو مفيش أي أكشن متطابقة
echo json_encode(array("message" => "مرحباً بك في باك إند منصة PROJEXA"));
// [الأكشن الثالث]: إضافة مشروع جديد (للأدمن)
if ($_SERVER['REQUEST_METHOD'] === 'POST' && $action === 'add_project') {
    // قراءة البيانات القادمة من الفورم
    $title = $_POST['title'] ?? '';
    $slug = $_POST['project_slug'] ?? '';
    $desc = $_POST['description'] ?? '';
    $team = $_POST['team_members'] ?? '';
    $year = $_POST['graduation_year'] ?? '';
    $faculty_id = $_POST['faculty_id'] ?? '';
    $is_invest = isset($_POST['is_investment_ready']) ? 1 : 0;
    $funding = $_POST['required_funding'] ?? null;
    $irr = $_POST['expected_irr'] ?? null;
    $summary = $_POST['summary'] ?? null;

    if (!empty($title) && !empty($slug)) {
        try {
            $stmt = $conn->prepare("INSERT INTO projects (project_slug, title, description, team_members, graduation_year, faculty_id, is_investment_ready, required_funding, expected_irr, summary) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
            $stmt->execute([$slug, $title, $desc, $team, $year, $faculty_id, $is_invest, $funding, $irr, $summary]);
            echo json_encode(array("success" => "تم إضافة المشروع بنجاح"));
        } catch(PDOException $e) {
            echo json_encode(array("error" => "خطأ أثناء الحفظ: " . $e->getMessage()));
        }
    } else {
        echo json_encode(array("error" => "برجاء ملء الحقول الأساسية"));
    }
    exit();
}

// [الأكشن الرابع]: حذف مشروع
if ($_SERVER['REQUEST_METHOD'] === 'POST' && $action === 'delete_project') {
    $id = $_POST['project_id'] ?? '';
    if (!empty($id)) {
        $stmt = $conn->prepare("DELETE FROM projects WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(array("success" => "تم حذف المشروع بنجاح"));
    }
    exit();
}
?>

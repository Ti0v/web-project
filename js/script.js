// تفعيل القائمة المتنقلة
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navList = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-link');

    // تبديل حالة القائمة عند النقر على الزر
    mobileMenuBtn.addEventListener('click', function() {
        toggleMenu();
    });

    // إغلاق القائمة عند النقر على أي رابط
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                toggleMenu();
            }
            
            // إزالة الكلاس active من جميع الروابط
            navLinks.forEach(l => l.classList.remove('active'));
            // إضافة الكلاس active للرابط المنقور
            this.classList.add('active');
        });
    });

    // دالة تبديل حالة القائمة
    function toggleMenu() {
        navList.classList.toggle('show');
        mobileMenuBtn.classList.toggle('active');
    }
});

// تعريف شفرة مورس
const morseCode = {
    'ا': '.-', 'ب': '-...', 'ت': '-', 'ث': '-.-.', 'ج': '.---',
    'ح': '....', 'خ': '-..-', 'د': '-..', 'ذ': '--..', 'ر': '.-.',
    'ز': '---.', 'س': '...', 'ش': '----', 'ص': '-..-', 'ض': '...-',
    'ط': '..-', 'ظ': '-.--', 'ع': '.-.-', 'غ': '--.', 'ف': '..-.',
    'ق': '--.-', 'ك': '-.-', 'ل': '.-..', 'م': '--', 'ن': '-.',
    'ه': '..-.', 'و': '.--', 'ي': '..', 'ء': '.---',
    'a': '.-', 'b': '-...', 'c': '-.-.', 'd': '-..', 'e': '.',
    'f': '..-.', 'g': '--.', 'h': '....', 'i': '..', 'j': '.---',
    'k': '-.-', 'l': '.-..', 'm': '--', 'n': '-.', 'o': '---',
    'p': '.--.', 'q': '--.-', 'r': '.-.', 's': '...', 't': '-',
    'u': '..-', 'v': '...-', 'w': '.--', 'x': '-..-', 'y': '-.--',
    'z': '--..', ' ': '/', '1': '.----', '2': '..---', '3': '...--',
    '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..',
    '9': '----.', '0': '-----'
};

// تشفير النص إلى شفرة مورس
function morseEncrypt() {
    const input = document.getElementById('inputText').value.toLowerCase();
    let output = '';
    
    for (let char of input) {
        if (morseCode[char]) {
            output += morseCode[char] + ' ';
        }
    }
    
    document.getElementById('outputText').value = output.trim();
    showNotification('تم التشفير بنجاح!', 'success');
}

// فك تشفير شفرة مورس
function morseDecrypt() {
    const input = document.getElementById('inputText').value.trim();
    const words = input.split(' ');
    let output = '';
    
    for (let word of words) {
        for (let char in morseCode) {
            if (morseCode[char] === word) {
                output += char;
                break;
            }
        }
    }
    
    document.getElementById('outputText').value = output;
    showNotification('تم فك التشفير بنجاح!', 'success');
}

// تشفير أتباش
function atbashEncrypt() {
    const input = document.getElementById('inputText').value;
    let output = '';
    
    for (let char of input) {
        if (/[a-zA-Z]/.test(char)) {
            const isUpperCase = char === char.toUpperCase();
            const baseCharCode = isUpperCase ? 65 : 97;
            const newChar = String.fromCharCode(2 * baseCharCode + 25 - char.charCodeAt(0));
            output += newChar;
        } else {
            output += char;
        }
    }
    
    document.getElementById('outputText').value = output;
    showNotification('تم التشفير بنجاح!', 'success');
}

// فك تشفير أتباش
function atbashDecrypt() {
    atbashEncrypt(); // نفس العملية لأن أتباش متماثل
}

// تشفير قيصر
function caesarEncrypt(shift = 3) {
    const input = document.getElementById('inputText').value;
    let output = '';
    
    for (let i = 0; i < input.length; i++) {
        let char = input[i];
        if (char.match(/[a-z]/i)) {
            const code = input.charCodeAt(i);
            if (code >= 65 && code <= 90) {
                char = String.fromCharCode(((code - 65 + shift) % 26) + 65);
            } else if (code >= 97 && code <= 122) {
                char = String.fromCharCode(((code - 97 + shift) % 26) + 97);
            }
        }
        output += char;
    }
    
    document.getElementById('outputText').value = output;
    showNotification('تم التشفير بنجاح!', 'success');
}

// فك تشفير قيصر
function caesarDecrypt() {
    caesarEncrypt(23); // نفس التشفير ولكن بإزاحة معاكسة (26-3)
}

// إظهار إشعار
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// تنظيف النص المدخل
function cleanInput() {
    document.getElementById('inputText').value = '';
    document.getElementById('outputText').value = '';
    showNotification('تم مسح النص!', 'info');
}

// نسخ النص المشفر
function copyOutput() {
    const outputText = document.getElementById('outputText');
    outputText.select();
    document.execCommand('copy');
    showNotification('تم نسخ النص!', 'success');
}

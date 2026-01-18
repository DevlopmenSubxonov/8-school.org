// Chart.js uchun
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

// O'quvchi kabineti (Dashboard)
function openDashboard(studentId = "8-001") { // Default ID
    document.getElementById('studentDashboard').style.display = 'flex';
    document.body.style.overflow = 'hidden';
    document.getElementById('studentNameDisplay').innerText = `(${studentId} - Jasur Alimov)`;
    loadGradeChart();
}

function closeDashboard() {
    document.getElementById('studentDashboard').style.display = 'none';
    document.body.style.overflow = 'auto';
}

function loadGradeChart() {
    const ctx = document.getElementById('gradeChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Sent', 'Okt', 'Noy', 'Dek', 'Yan', 'Fev'],
            datasets: [{
                label: 'O\'rtacha baho',
                data: [4.2, 4.5, 4.3, 4.7, 4.8, 4.9],
                borderColor: var_primary, // CSS variable ni JS da ishlatish
                backgroundColor: 'rgba(0,35,102,0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { display: false } },
            scales: {
                y: { beginAtZero: true, max: 5 }
            }
        }
    });
}

// Murojaat yuborish
function sendTicket() {
    Swal.fire('Rahmat!', 'Murojaatingiz qabul qilindi. Tez orada javob beriladi.', 'success');
}

// Hujjat yuklash
function downloadDoc(docName) {
    Swal.fire({
        title: 'Yuklanmoqda',
        text: docName + ' yuklab olinmoqda...',
        icon: 'info',
        timer: 1500,
        showConfirmButton: false
    }).then(() => {
        Swal.fire('Tayyor!', docName + ' qurilmangizga yuklandi.', 'success');
    });
}

// Global CSS variablesni JS ga olib kelish
const style = getComputedStyle(document.body);
const var_primary = style.getPropertyValue('--primary');


// "KABINET" tugmasiga o'quvchi panelini ochish funksiyasini ulash
document.querySelector('.navbar-nav .btn.btn-primary').addEventListener('click', function(e) {
    e.preventDefault(); // Default harakatni to'xtatish
    openDashboard("8-001"); // Misol uchun, 8-001 ID li o'quvchi uchun ochish
});
// Sertifikat tekshirish logikasi
function validateCert() {
    const id = document.getElementById('certID').value;
    const resultDiv = document.getElementById('certResult');
    
    if(!id) {
        Swal.fire('Xato', 'ID kiritilmadi', 'error');
        return;
    }

    resultDiv.innerHTML = '<div class="spinner-border text-primary"></div>';

    setTimeout(() => {
        if(id.startsWith('CERT-8')) {
            resultDiv.innerHTML = `
                <div class="alert alert-success d-flex align-items-center">
                    <i class="fas fa-check-circle fa-2x me-3"></i>
                    <div>
                        <strong>Haqiqiy Sertifikat!</strong><br>
                        Ega: Jasur Alimov <br> Kurs: IT-Dasturlash
                    </div>
                </div>
            `;
            confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
        } else {
            resultDiv.innerHTML = `
                <div class="alert alert-danger">Sertifikat topilmadi yoki u noto'g'ri kiritilgan.</div>
            `;
        }
    }, 1500);
}

// Qo'shimcha: Confetti effekti uchun (CDN orqali)
const script = document.createElement('script');
script.src = "https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js";
document.head.appendChild(script);
// NEURAL SEARCH SIMULATION
function neuralSearch() {
    const query = document.getElementById('neuralInput').value.toLowerCase();
    const results = document.getElementById('neuralResults');
    results.innerHTML = '<div class="spinner-grow text-accent"></div>';

    setTimeout(() => {
        results.innerHTML = '';
        const data = [
            {t: 'Dars Jadvali', d: 'Barcha sinflar uchun', i: 'fa-calendar'},
            {t: 'Oshxona Menyusi', d: 'Bugungi taomlar', i: 'fa-utensils'},
            {t: 'E-Kutubxona', d: '5000+ kitoblar', i: 'fa-book'}
        ];

        data.forEach(item => {
            results.innerHTML += `
                <div class="class-node" onclick="Swal.fire('${item.t}', '${item.d}', 'info')">
                    <i class="fas ${item.i} fa-2x mb-2 text-accent"></i>
                    <h6>${item.t}</h6>
                </div>
            `;
        });
    }, 1000);
}

// MATRIX BACKGROUND EFFECT
const canvas = document.createElement('canvas');
canvas.style.position = 'absolute';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.width = window.innerWidth;
canvas.height = 400;
document.getElementById('matrixCanvas').appendChild(canvas);
const ctx = canvas.getContext('2d');

let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ01234567898-MAKTAB";
characters = characters.split("");
const fontSize = 10;
const columns = canvas.width / fontSize;
const drops = [];
for (let x = 0; x < columns; x++) drops[x] = 1;

function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#0F0"; 
    ctx.font = fontSize + "px arial";
    for (let i = 0; i < drops.length; i++) {
        const text = characters[Math.floor(Math.random() * characters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
    }
}
setInterval(drawMatrix, 33);
// Ota-onalar uchun Radar Chart
const radarCtx = document.getElementById('radarChart').getContext('2d');
new Chart(radarCtx, {
    type: 'radar',
    data: {
        labels: ['Matematika', 'Tillar', 'Sport', 'IT', 'San\'at', 'Fizika'],
        datasets: [{
            label: 'O\'rtacha ko\'rsatkich',
            data: [90, 85, 70, 95, 60, 88],
            fill: true,
            backgroundColor: 'rgba(255, 204, 0, 0.2)',
            borderColor: '#ffcc00',
            pointBackgroundColor: '#002366',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#ffcc00'
        }]
    },
    options: {
        elements: { line: { borderWidth: 3 } },
        scales: { r: { angleLines: { display: false }, suggestMin: 0, suggestMax: 100 } }
    }
});

// Avtomatik ota-onalarga xabar yuborish simulyatsiyasi
function notifyParents() {
    Toast.fire({
        icon: 'info',
        title: 'Ota-onalarga haftalik hisobot yuborildi'
    });
}
setInterval(notifyParents, 300000); // Har 5 daqiqada "simulyatsiya" qiladi
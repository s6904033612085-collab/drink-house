// Main Unified JavaScript for Drink House Website

// 1. EMBEDDED PRODUCTS DATA
const PRODUCTS_DATA = [
{
id: 1,
name: "Orange Fresh Juice",
price: 65,
size: "250ml",
category: "Fresh",
description: "น้ำส้มคั้นสด เติมความสดชื่นตื่นตัวตลอดวัน",
image: "images/orange-juice.jpg"
},
{
id: 2,
name: "Lemon Tea Fresh",
price: 70,
size: "250ml",
category: "Fresh",
description: "ชามะนาวรสเปรี้ยวหวานกลมกล่อม ดับกระหายสดชื่น",
image: "images/lemon-tea.jpg"
},
{
id: 3,
name: "Cold Brew Coffee",
price: 80,
size: "250ml",
category: "Focus",
description: "กาแฟสกัดเย็นรสเข้มข้น เพิ่มสมาธิและพลังในการทำงาน",
image: "images/cold-brew.jpg"
},
{
id: 4,
name: "Matcha Latte",
price: 85,
size: "250ml",
category: "Focus",
description: "ชาเขียวมัจฉะพรีเมียมเข้มข้น ช่วยปลุกความสดชื่นและสมาธิ",
image: "images/matcha.jpg"
},
{
id: 5,
name: "Americano Cold Brew",
price: 75,
size: "250ml",
category: "Focus",
description: "อเมริกาโน่สกัดเย็น หอมนุ่มดื่มง่าย ไม่มีน้ำตาล",
image: "images/americano.jpg"
},
{
id: 6,
name: "Earl Grey Milk Tea",
price: 75,
size: "250ml",
category: "Relax",
description: "ชานมเอิร์ลเกรย์หอมกลิ่นมะกรูดอ่อนๆ ช่วยให้ผ่อนคลาย",
image: "images/earl-grey.jpg"
},
{
id: 7,
name: "Chamomile Tea",
price: 60,
size: "250ml",
category: "Relax",
description: "ชาคาโมมายล์อุ่นๆ นุ่มนวล ช่วยลดความเครียดและคลายล้า",
image: "images/chamomile.jpg"
},
{
id: 8,
name: "Cocoa Special",
price: 80,
size: "250ml",
category: "Relax",
description: "โกโก้เข้มข้นรสชาติกลมกล่อม เติมความอบอุ่นผ่อนคลาย",
image: "images/cocoa.jpg"
},
{
id: 9,
name: "Berry Smoothie",
price: 90,
size: "250ml",
category: "Romance",
description: "เบอร์รี่ปั่นรสเปรี้ยวหวาน นุ่มฟู หอมละมุนหัวใจ",
image: "images/berry-smoothie.jpg"
},
{
id: 10,
name: "Peach Tea",
price: 75,
size: "250ml",
category: "Romance",
description: "ชาพีชหอมหวานละมุน เติมความสดใสโรแมนติก",
image: "images/peach-tea.jpg"
}
];

// DOMContentLoaded Entrypoint
document.addEventListener('DOMContentLoaded', () => {
// Page 1: Product Page
if (document.getElementById('product-list')) {
initProductPage();
}

// Page 2: Order Page
if (document.getElementById('orderForm')) {
initOrderPage();
}

// Page 3: Admin Page
if (document.getElementById('ordersTable')) {
initAdminPage();
}
});

// ==========================================
// 1. PRODUCT PAGE LOGIC
// ==========================================
function initProductPage() {
const productListEl = document.getElementById('product-list');
const filterBarEl = document.getElementById('filter-bar');

const urlParams = new URLSearchParams(window.location.search);
const selectedMood = urlParams.get('mood') ? urlParams.get('mood').toLowerCase() : 'all';

renderFilterButtons(filterBarEl, selectedMood, PRODUCTS_DATA);
renderProducts(productListEl, PRODUCTS_DATA, selectedMood);
}

function renderFilterButtons(container, activeMood, products) {
if (!container) return;

const categories = ['all', 'fresh', 'relax', 'focus', 'romance'];
const categoryLabels = {
'all': 'ทั้งหมด',
'fresh': 'Fresh',
'relax': 'Relax',
'focus': 'Focus',
'romance': 'Romance'
};

container.innerHTML = categories.map(cat => {
const isActive = cat === activeMood ? 'active' : '';
return `<button class="filter-btn ${isActive}" data-mood="${cat}">${categoryLabels[cat] || cat}</button>`;
}).join('');

container.querySelectorAll('.filter-btn').forEach(button => {
button.addEventListener('click', (e) => {
const mood = e.target.getAttribute('data-mood');

container.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
e.target.classList.add('active');

const newUrl = mood === 'all' ? 'product.html' : `product.html?mood=${mood}`;
window.history.pushState({ mood }, '', newUrl);

const productListEl = document.getElementById('product-list');
renderProducts(productListEl, products, mood);
});
});
}

function renderProducts(container, products, moodFilter) {
if (!container) return;

const filtered = (moodFilter === 'all' || !moodFilter)
? products
: products.filter(p => p.category && p.category.toLowerCase() === moodFilter.toLowerCase());

if (filtered.length === 0) {
container.innerHTML = `
<div style="grid-column: 1 / -1; text-align: center; padding: 40px 0; color: #888;">
<p>ไม่พบรายการสินค้าในหมวดหมู่นี้</p>
</div>
`;
return;
}

container.innerHTML = filtered.map(item => {
const itemNameWithSize = item.size ? `${item.name} ${item.size}` : item.name;
const orderUrl = `order.html?item=${encodeURIComponent(itemNameWithSize)}&price=${encodeURIComponent(item.price)}`;

return `
<div class="product-card">
<div class="product-image-wrap">
<img src="${item.image}" alt="${item.name}">
</div>
<div class="product-info">
<div class="product-header">
<h3 class="product-title">${item.name}</h3>
<span class="product-price">${item.price}.-</span>
</div>
${item.size ? `<div class="product-size" style="font-size: 0.85rem; color: #666; margin-bottom: 8px;">ขนาด: ${item.size}</div>` : ''}
<p class="product-desc">${item.description || ''}</p>
<div style="margin-top: auto; padding-top: 16px;">
<a class="btn btn-gold" href="${orderUrl}" style="width: 100%; text-align: center; display: block;">สั่งซื้อ</a>
</div>
</div>
</div>
`;
}).join('');
}

// ==========================================
// 2. ORDER PAGE LOGIC
// ==========================================
function initOrderPage() {
const form = document.getElementById('orderForm');
const itemsInput = document.getElementById('items');
const totalInput = document.getElementById('total');

if (!form) return;

const urlParams = new URLSearchParams(window.location.search);
const itemName = urlParams.get('item');
const itemPrice = urlParams.get('price');

if (itemName && itemsInput) {
itemsInput.value = itemName;
}
if (itemPrice && totalInput) {
totalInput.value = itemPrice;
}

form.addEventListener('submit', (e) => {
e.preventDefault();

const payload = {
customerName: document.getElementById('customerName')?.value || '',
contact: document.getElementById('contact')?.value || '',
items: document.getElementById('items')?.value || '',
total: document.getElementById('total')?.value || '',
note: document.getElementById('note')?.value || ''
};

fetch('https://script.google.com/macros/s/AKfycbzSLtNPmB1evWY6ZMmydesIhECjXZzA5-sIVVqt4XyO6hfBHLUwxh4UcB_OodmFWmGQ/exec', {
method: 'POST',
body: JSON.stringify(payload)
})
.then(() => {
window.location.href = 'thankyou.html';
})
.catch(error => {
console.error(error);
alert('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
});
});
}

// ==========================================
// 3. ADMIN PAGE LOGIC (FETCH JSON FROM APPS SCRIPT)
// ==========================================
async function initAdminPage() {
const tableBody = document.querySelector('#ordersTable tbody');
if (!tableBody) return;

const appScriptUrl = 'https://script.google.com/macros/s/AKfycbxlfD96_vaDdUMZCggOG7kIvJoV50HzNSscU9HlX4NkNIlmPS4UmXSQuKBi0u56NpBI/exec';

try {
const response = await fetch(appScriptUrl, { method: 'GET' });
if (!response.ok) {
throw new Error(`HTTP error! status: ${response.status}`);
}

const data = await response.json();

// รองรับโครงสร้างทั้ง Array of Arrays และ Array of Objects
let rows = Array.isArray(data) ? data : (data.orders || data.data || []);

if (rows.length === 0) {
tableBody.innerHTML = `
<tr>
<td colspan="6" style="text-align: center; color: #888; padding: 32px;">
ยังไม่มีรายการสั่งซื้อเข้ามาในขณะนี้
</td>
</tr>
`;
return;
}

// หากแถวแรกเป็น Header ให้ตัดออก
if (Array.isArray(rows[0]) && (rows[0][0] === 'วันเวลา' || rows[0][0] === 'Timestamp')) {
rows.shift();
}

// เรียงรายการล่าสุดขึ้นก่อน
const reversedRows = [...rows].reverse();

// Render ข้อมูลลงตาราง
tableBody.innerHTML = reversedRows.map(item => {
let timestamp, customerName, contact, items, total, note;

if (Array.isArray(item)) {
[timestamp, customerName, contact, items, total, note] = item;
} else {
timestamp = item.timestamp || item.date || item.วันเวลา || '-';
customerName = item.customerName || item.ชื่อลูกค้า || '-';
contact = item.contact || item.เบอร์โทร || item['เบอร์โทร/Line'] || '-';
items = item.items || item.รายการสินค้า || '-';
total = item.total || item.จำนวนเงินรวม || '-';
note = item.note || item.หมายเหตุ || '-';
}

return `
<tr>
<td>${timestamp || '-'}</td>
<td style="font-weight: 500;">${customerName || '-'}</td>
<td>${contact || '-'}</td>
<td>${items || '-'}</td>
<td style="font-weight: 600; color: #d4a373;">${total || '-'} .-</td>
<td>${note || '-'}</td>
</tr>
`;
}).join('');

} catch (error) {
console.error('Error fetching JSON orders:', error);
tableBody.innerHTML = `
<tr>
<td colspan="6" style="text-align: center; color: #e63946; padding: 32px;">
เกิดข้อผิดพลาดในการดึงข้อมูลรายการสั่งซื้อ
</td>
</tr>
`;
}
}
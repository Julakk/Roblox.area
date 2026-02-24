/* ============================================
   AHMAD STORE - ENHANCED JAVASCRIPT
   ============================================ */

// Global Variables
let selectedProduct = {
    name: '',
    price: 0,
    image: '',
    description: '',
    category: ''
};

// Cart System
let cart = [];
let currentQuantity = 1;
let currentUsername = '';

// Update Current Time
function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    document.getElementById('current-time').textContent = `${hours}:${minutes}:${seconds}`;
}

setInterval(updateTime, 1000);
updateTime();

// Check Admin Status
function updateAdminStatus() {
    const now = new Date();
    const hour = now.getHours();
    const statusIndicator = document.querySelector('.status-indicator');
    const statusText = document.querySelector('.status-text');
    
    if (hour >= 8 && hour < 22) {
        statusIndicator.classList.add('online');
        statusIndicator.classList.remove('offline');
        statusText.textContent = 'Admin Online';
    } else {
        statusIndicator.classList.remove('online');
        statusIndicator.classList.add('offline');
        statusText.textContent = 'Admin Offline';
    }
}

setInterval(updateAdminStatus, 60000);
updateAdminStatus();

// Smooth Scroll
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Transaction Slider
let transactionPosition = 0;

function slideTransactions(direction) {
    const track = document.querySelector('.transaction-track');
    const cardWidth = 300;
    
    transactionPosition += direction * cardWidth;
    
    const maxScroll = -(track.scrollWidth - track.parentElement.offsetWidth);
    if (transactionPosition > 0) transactionPosition = 0;
    if (transactionPosition < maxScroll) transactionPosition = maxScroll;
    
    track.style.transform = `translateX(${transactionPosition}px)`;
}

// Auto slide transactions
setInterval(() => {
    slideTransactions(1);
    const track = document.querySelector('.transaction-track');
    const maxScroll = -(track.scrollWidth - track.parentElement.offsetWidth);
    if (transactionPosition <= maxScroll) {
        transactionPosition = 0;
        track.style.transform = `translateX(0px)`;
    }
}, 3000);

// Testimonial Slider
let testimonialPosition = 0;

function slideTestimonials(direction) {
    const track = document.querySelector('.testimonial-track');
    const cardWidth = 370;
    
    testimonialPosition += direction * cardWidth;
    
    const maxScroll = -(track.scrollWidth - track.parentElement.offsetWidth);
    if (testimonialPosition > 0) testimonialPosition = 0;
    if (testimonialPosition < maxScroll) testimonialPosition = maxScroll;
    
    track.style.transform = `translateX(${testimonialPosition}px)`;
}

// FAQ Toggle
function toggleFaq(element) {
    const faqItem = element.parentElement;
    const allItems = document.querySelectorAll('.faq-item');
    
    allItems.forEach(item => {
        if (item !== faqItem) {
            item.classList.remove('active');
        }
    });
    
    faqItem.classList.toggle('active');
}

// Modal Functions
function showLoginModal() {
    closeRegisterModal();
    document.getElementById('loginModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLoginModal() {
    document.getElementById('loginModal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

function showRegisterModal() {
    closeLoginModal();
    document.getElementById('registerModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeRegisterModal() {
    document.getElementById('registerModal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

function showAdminModal() {
    document.getElementById('adminModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeAdminModal() {
    document.getElementById('adminModal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// ============================================
// ENHANCED PRODUCT SELECTION WITH MODAL
// ============================================
function selectProduct(name, price, image = '', description = '', category = 'Gamepass') {
    selectedProduct = { 
        name, 
        price, 
        image: image || 'https://via.placeholder.com/300x300/667eea/ffffff?text=' + encodeURIComponent(name),
        description: description || 'Gamepass fish it!, cukup order lewat website, dan gamepass akan dikirim lewat gift in-game. Praktis, cepat, dan tanpa ribet!',
        category: category
    };
    currentQuantity = 1;
    currentUsername = '';
    showProductModal();
}

function showProductModal() {
    const modal = document.getElementById('productModal');
    
    // Update modal content
    document.getElementById('modalProductImage').src = selectedProduct.image;
    document.getElementById('modalProductName').textContent = selectedProduct.name;
    document.getElementById('modalProductPrice').textContent = `RP${selectedProduct.price.toLocaleString('id-ID')}`;
    document.getElementById('modalProductDesc').textContent = selectedProduct.description;
    document.getElementById('robloxUsername').value = '';
    document.getElementById('quantity').value = 1;
    
    updateModalPrices();
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProductModal() {
    document.getElementById('productModal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

function increaseQuantity() {
    currentQuantity++;
    document.getElementById('quantity').value = currentQuantity;
    updateModalPrices();
}

function decreaseQuantity() {
    if (currentQuantity > 1) {
        currentQuantity--;
        document.getElementById('quantity').value = currentQuantity;
        updateModalPrices();
    }
}

function updateModalPrices() {
    const unitPrice = selectedProduct.price;
    const total = unitPrice * currentQuantity;
    
    document.getElementById('unitPrice').textContent = `Rp${unitPrice.toLocaleString('id-ID')}`;
    document.getElementById('totalPrice').textContent = `Rp${total.toLocaleString('id-ID')}`;
}

function addToCartFromModal() {
    const username = document.getElementById('robloxUsername').value.trim();
    
    if (!username) {
        alert('❌ Mohon masukkan Username Roblox Anda!');
        document.getElementById('robloxUsername').focus();
        return;
    }
    
    currentUsername = username;
    
    // Add to cart
    const cartItem = {
        id: Date.now(),
        ...selectedProduct,
        quantity: currentQuantity,
        username: username,
        total: selectedProduct.price * currentQuantity
    };
    
    cart.push(cartItem);
    updateCartUI();
    
    // Close modal and show success
    closeProductModal();
    showNotification('✅ Produk berhasil ditambahkan ke keranjang!');
    
    // Open cart
    setTimeout(() => {
        openCart();
    }, 500);
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification-toast';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: var(--gradient-primary);
        color: var(--dark-bg);
        padding: 15px 25px;
        border-radius: 12px;
        font-weight: 700;
        z-index: 9999;
        box-shadow: 0 8px 25px rgba(0, 255, 170, 0.5);
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ============================================
// CART FUNCTIONALITY
// ============================================
function openCart() {
    document.getElementById('cartModal').classList.add('active');
    document.body.style.overflow = 'hidden';
    renderCartItems();
}

function closeCart() {
    document.getElementById('cartModal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

function renderCartItems() {
    const emptyCart = document.getElementById('emptyCart');
    const cartItemsList = document.getElementById('cartItemsList');
    const checkoutBtn = document.getElementById('checkoutBtn');
    
    if (cart.length === 0) {
        emptyCart.style.display = 'block';
        cartItemsList.style.display = 'none';
        checkoutBtn.disabled = true;
        checkoutBtn.textContent = 'BELI (0 ITEM)';
        document.getElementById('cartTotal').textContent = 'Rp0';
        return;
    }
    
    emptyCart.style.display = 'none';
    cartItemsList.style.display = 'flex';
    
    cartItemsList.innerHTML = cart.map(item => `
        <div class="cart-item-card" data-id="${item.id}">
            <input type="checkbox" class="cart-item-checkbox" checked onchange="updateCartSummary()">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image" onerror="this.src='https://via.placeholder.com/80x80/667eea/ffffff?text=Item'">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-username">Username: ${item.username}</div>
                <div class="cart-item-quantity">Jumlah: ${item.quantity}</div>
                <div class="cart-item-price">Rp${item.total.toLocaleString('id-ID')}</div>
            </div>
            <button class="btn-remove" onclick="removeFromCart(${item.id})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');
    
    updateCartSummary();
}

function removeFromCart(itemId) {
    if (confirm('Hapus item dari keranjang?')) {
        cart = cart.filter(item => item.id !== itemId);
        updateCartUI();
        renderCartItems();
        showNotification('🗑️ Item telah dihapus dari keranjang');
    }
}

function updateCartSummary() {
    const checkboxes = document.querySelectorAll('.cart-item-checkbox:checked');
    const selectedCount = checkboxes.length;
    
    let total = 0;
    checkboxes.forEach(checkbox => {
        const card = checkbox.closest('.cart-item-card');
        const itemId = parseInt(card.dataset.id);
        const item = cart.find(i => i.id === itemId);
        if (item) total += item.total;
    });
    
    document.getElementById('cartTotal').textContent = `Rp${total.toLocaleString('id-ID')}`;
    
    const checkoutBtn = document.getElementById('checkoutBtn');
    checkoutBtn.disabled = selectedCount === 0;
    checkoutBtn.textContent = `BELI (${selectedCount} ITEM)`;
}

function toggleSelectAll() {
    const selectAllCheckbox = document.getElementById('selectAll');
    const itemCheckboxes = document.querySelectorAll('.cart-item-checkbox');
    
    itemCheckboxes.forEach(checkbox => {
        checkbox.checked = selectAllCheckbox.checked;
    });
    
    updateCartSummary();
}

function filterCategory(category) {
    // Filter functionality - can be enhanced based on needs
    showNotification(`📋 Filter: ${category}`);
}

function updateCartUI() {
    const cartBadge = document.getElementById('floatingCartBadge');
    cartBadge.textContent = cart.length;
    
    if (cart.length > 0) {
        cartBadge.style.display = 'flex';
    } else {
        cartBadge.style.display = 'none';
    }
}

// ============================================
// CHECKOUT / PAYMENT FUNCTIONALITY
// ============================================
function proceedToCheckout() {
    const selectedItems = [];
    const checkboxes = document.querySelectorAll('.cart-item-checkbox:checked');
    
    checkboxes.forEach(checkbox => {
        const card = checkbox.closest('.cart-item-card');
        const itemId = parseInt(card.dataset.id);
        const item = cart.find(i => i.id === itemId);
        if (item) selectedItems.push(item);
    });
    
    if (selectedItems.length === 0) {
        alert('Pilih minimal 1 item untuk checkout!');
        return;
    }
    
    // Store selected items for payment
    sessionStorage.setItem('checkoutItems', JSON.stringify(selectedItems));
    
    // Close cart and open payment modal
    closeCart();
    setTimeout(() => {
        showPaymentModal(selectedItems);
    }, 300);
}

function showPaymentModal(items) {
    const modal = document.getElementById('paymentModal');
    
    // Render items
    const itemsList = document.getElementById('paymentItemsList');
    itemsList.innerHTML = items.map(item => `
        <div class="payment-item-card">
            <img src="${item.image}" alt="${item.name}" class="payment-item-image" onerror="this.src='https://via.placeholder.com/60x60/667eea/ffffff?text=Item'">
            <div class="payment-item-info">
                <div class="payment-item-name">${item.name}</div>
                <div class="payment-item-details">Jumlah: ${item.quantity} | Username: ${item.username}</div>
                <div class="payment-item-price">Rp${item.total.toLocaleString('id-ID')}</div>
            </div>
        </div>
    `).join('');
    
    // Update summary
    const subtotal = items.reduce((sum, item) => sum + item.total, 0);
    const tax = 0; // No tax for now
    const total = subtotal + tax;
    
    document.getElementById('paymentSubtotal').textContent = `Rp${subtotal.toLocaleString('id-ID')}`;
    document.getElementById('paymentTax').textContent = `Rp${tax.toLocaleString('id-ID')}`;
    document.getElementById('paymentTotal').textContent = `Rp${total.toLocaleString('id-ID')}`;
    
    // Summary items text
    const summaryItems = items.map(item => 
        `${item.name} (${item.quantity}x) - Rp${item.total.toLocaleString('id-ID')}`
    ).join('<br>');
    document.getElementById('paymentSummaryItems').innerHTML = summaryItems;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function backToCart() {
    document.getElementById('paymentModal').classList.remove('active');
    document.body.style.overflow = 'auto';
    setTimeout(() => {
        openCart();
    }, 300);
}

function applyPromo() {
    const promoCode = document.getElementById('promoCode').value.trim();
    
    if (!promoCode) {
        alert('Masukkan kode promo terlebih dahulu!');
        return;
    }
    
    // Example promo validation
    if (promoCode.toUpperCase() === 'AHMAD10') {
        showNotification('🎉 Promo code applied! 10% discount');
        // Apply discount logic here
    } else {
        showNotification('❌ Kode promo tidak valid');
    }
}

function processPayment() {
    const phoneNumber = document.getElementById('phoneNumber').value.trim();
    const paymentMethod = document.getElementById('paymentMethod').value;
    
    if (!phoneNumber) {
        alert('❌ Mohon masukkan nomor telepon!');
        document.getElementById('phoneNumber').focus();
        return;
    }
    
    if (!paymentMethod) {
        alert('❌ Mohon pilih metode pembayaran!');
        document.getElementById('paymentMethod').focus();
        return;
    }
    
    // Validate phone number format (basic)
    if (!/^[0-9]{9,13}$/.test(phoneNumber)) {
        alert('❌ Format nomor telepon tidak valid! Gunakan 9-13 digit angka.');
        document.getElementById('phoneNumber').focus();
        return;
    }
    
    // Generate invoice code
    const invoiceCode = 'AHMD' + Date.now().toString().slice(-8);
    
    // Get selected items from session
    const items = JSON.parse(sessionStorage.getItem('checkoutItems') || '[]');
    const total = items.reduce((sum, item) => sum + item.total, 0);
    
    // Create WhatsApp message
    const itemsList = items.map(item => 
        `📦 ${item.name}\n   Qty: ${item.quantity}x\n   Username: ${item.username}\n   Harga: Rp${item.total.toLocaleString('id-ID')}`
    ).join('\n\n');
    
    const message = `🎮 *PESANAN BARU - AHMAD STORE*\n\n` +
                   `📝 Invoice: ${invoiceCode}\n` +
                   `📱 No. Telepon: +62${phoneNumber}\n` +
                   `💳 Metode: ${paymentMethod.toUpperCase()}\n\n` +
                   `*DETAIL PESANAN:*\n${itemsList}\n\n` +
                   `💰 *TOTAL: Rp${total.toLocaleString('id-ID')}*\n\n` +
                   `Mohon konfirmasi pesanan ini. Terima kasih! 🙏`;
    
    // Admin WhatsApp number (ganti dengan nomor admin sebenarnya)
    const adminNumber = '6287854851480';
    const whatsappUrl = `https://wa.me/${adminNumber}?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Clear cart and close modal
    cart = cart.filter(cartItem => !items.some(item => item.id === cartItem.id));
    updateCartUI();
    
    document.getElementById('paymentModal').classList.remove('active');
    document.body.style.overflow = 'auto';
    
    // Show success notification
    setTimeout(() => {
        showNotification(`✅ Pesanan terkirim! Invoice: ${invoiceCode}`);
    }, 500);
    
    // Clear session
    sessionStorage.removeItem('checkoutItems');
}

// ============================================
// ORIGINAL FUNCTIONS (COMPATIBILITY)
// ============================================
function contactAdmin(adminNumber) {
    const whatsappNumbers = {
        1: '6287854851480',
        2: '6287854851480'
    };
    
    const number = whatsappNumbers[adminNumber];
    const message = `Halo Admin ${adminNumber}! Saya ingin membeli:\n\n📦 ${selectedProduct.name}\n💰 Harga: Rp ${selectedProduct.price.toLocaleString('id-ID')}\n\nMohon info untuk pembayaran. Terima kasih!`;
    
    const whatsappUrl = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    closeAdminModal();
}

function contactReseller() {
    const message = `Halo Admin! Saya tertarik untuk menjadi reseller AhmadStore. Mohon info lebih lanjut tentang program reseller. Terima kasih!`;
    const whatsappUrl = `https://wa.me/6287854851480?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}
    
function showResellerInfo() {
    alert('📋 Info Reseller:\n\n✅ Komisi hingga 15%\n✅ Support 24/7\n✅ Dashboard Lengkap\n✅ Bonus & Reward\n\nHubungi admin untuk info lebih lanjut!');
}

function checkTransaction(event) {
    event.preventDefault();
    
    const invoiceCode = document.getElementById('invoiceCode').value.trim();
    
    if (!invoiceCode) {
        alert('Masukkan kode invoice!');
        return;
    }
    
    // Mock transaction check (replace with actual API call)
    const resultDiv = document.getElementById('transactionResult');
    document.getElementById('resultInvoice').textContent = invoiceCode;
    document.getElementById('resultProduct').textContent = 'Luxury Rod Crate (1x)';
    document.getElementById('resultDate').textContent = new Date().toLocaleString('id-ID');
    
    const statusElement = document.getElementById('resultStatus');
    statusElement.textContent = 'BERHASIL';
    statusElement.className = 'value status success';
    
    resultDiv.style.display = 'block';
    resultDiv.scrollIntoView({ behavior: 'smooth' });
}

// Navigation Active State
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    function setActiveNav() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', setActiveNav);
});

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.product-card, .stat-card, .transaction-card, .testimonial-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease-out';
        observer.observe(card);
    });
});

// Form Submission
document.addEventListener("DOMContentLoaded", () => {
    
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", handleLogin);
    }

    const registerForm = document.getElementById("registerForm");
    if (registerForm) {
        registerForm.addEventListener("submit", handleRegister);
    }

    updateAuthUI();
});

// Refresh Button
document.querySelectorAll('.btn-refresh').forEach(btn => {
    btn.addEventListener('click', () => {
        btn.innerHTML = '<i class="fas fa-sync-alt fa-spin"></i> Loading...';
        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-sync-alt"></i> Refresh';
            showNotification('✅ Data berhasil diperbarui!');
        }, 1000);
    });
});

// Console Easter Egg
console.log('%c🎮 AHMAD STORE 🎮', 'color: #00ffaa; font-size: 24px; font-weight: bold;');
console.log('%cFish It Roblox Terpercaya', 'color: #00d9ff; font-size: 14px;');
console.log('%c\n💡 Website ini dibuat dengan ❤️ untuk komunitas Fish It', 'color: #00ffaa; font-size: 12px;');
console.log('%c📱 Hubungi kami untuk info lebih lanjut!\n', 'color: #00d9ff; font-size: 12px;');

// Loading Animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Parallax Effect for Hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Product Card Hover Effect
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// Animate Stats on Scroll
const animateStats = () => {
    const stats = document.querySelectorAll('.stat-value');
    
    stats.forEach(stat => {
        const target = stat.textContent;
        if (target.includes('R$')) {
            const numericValue = parseFloat(target.replace(/[^0-9.]/g, ''));
            animateValue(stat, 0, numericValue, 2000, 'R$');
        } else {
            const numericValue = parseFloat(target.replace(/[^0-9]/g, ''));
            animateValue(stat, 0, numericValue, 2000, '');
        }
    });
};

function animateValue(element, start, end, duration, suffix) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            current = end;
            clearInterval(timer);
        }
        
        if (suffix === 'R$') {
            element.textContent = current.toLocaleString('id-ID', {
                minimumFractionDigits: 3,
                maximumFractionDigits: 3
            }) + suffix;
        } else {
            element.textContent = Math.floor(current).toLocaleString('id-ID');
        }
    }, 16);
}

// Trigger stats animation when section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === 'l' && !e.ctrlKey && !e.altKey) {
        const activeElement = document.activeElement;
        if (activeElement.tagName !== 'INPUT' && activeElement.tagName !== 'TEXTAREA') {
            showLoginModal();
        }
    }
    
    if (e.key === 'Escape') {
        closeLoginModal();
        closeRegisterModal();
        closeAdminModal();
        closeProductModal();
        closeCart();
        document.getElementById('paymentModal').classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
@keyframes slideInRight {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes slideOutRight {
    from {
        transform: translateX(0);
        opacity: 1;
    }
    to {
        transform: translateX(100%);
        opacity: 0;
    }
}
`;
document.head.appendChild(style);


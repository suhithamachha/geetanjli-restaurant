/**
 * GEETANJLI RESTAURANT BILL COLLECTOR - COMPLETE WEB POS SYSTEM
 * Features:
 * 1. Staff Authentication & Role Session Management
 * 2. Real-Time Light / Dark Mode Toggle with Local Persistence
 * 3. Dynamic Multi-Language Internationalization (English, Hindi, Telugu)
 * 4. 16-Item Menu Catalog, Search, and Category Filtering
 * 5. Order Cart with Duplicate Aggregation & Quantity Adjusters
 * 6. Strict Sequential Financial Calculations (Subtotal, 10% Disc, Taxable, 5% GST, Final)
 * 7. Thermal Paper Bill Receipt Preview, Native Printing, and .TXT File Export
 */

// =========================================================================
// 1. CONFIGURATION & AUTHORIZED STAFF CREDENTIALS
// =========================================================================
const CONFIG = {
  DISCOUNT_RATE: 0.10, // 10% Demonstration discount
  GST_RATE: 0.05,      // 5% Goods and Services Tax (GST)
  CURRENCY: "₹"
};

const AUTHORIZED_STAFF = [
  { username: "admin", password: "geetanjli@123", name: "Rajesh Kumar", role: "Manager", avatar: "R" },
  { username: "cashier1", password: "pos@2026", name: "Sunita Sharma", role: "Cashier", avatar: "S" },
  { username: "staff", password: "1234", name: "Amit Verma", role: "Floor Staff", avatar: "A" }
];

// =========================================================================
// 2. MULTI-LANGUAGE DICTIONARY (English, Hindi, Telugu)
// =========================================================================
const I18N = {
  en: {
    appTitle: "GEETANJLI RESTAURANT",
    appSubtitle: "“Delicious Food, Wonderful Moments” • Smart POS & Billing Terminal",
    customerHeader: "Customer & Table Details",
    mandatoryNote: "* Mandatory fields",
    labelCustName: "Customer Name",
    labelCustPhone: "Mobile Number (10-Digit)",
    labelCustTable: "Table Number",
    menuHeader: "Restaurant Menu (16 Items)",
    menuSub: "Click item or use quantity stepper to add to cart",
    catAll: "All Items (16)",
    catStarters: "Starters (4)",
    catMainCourse: "Main Course (4)",
    catBreads: "Breads (4)",
    catDesserts: "Desserts (2)",
    catBeverages: "Beverages (2)",
    cartHeader: "Current Order / Cart",
    clearCart: "Clear Cart",
    colId: "ID",
    colItem: "Item",
    colPrice: "Price",
    colQty: "Qty",
    colTotal: "Total",
    emptyCartTitle: "Your Cart is Empty",
    emptyCartMsg: "Select delicious dishes from the menu to build the customer's order.",
    billCalcHeader: "Bill Calculation & Taxes",
    ratesBadge: "Disc 10% • GST 5%",
    subtotalLabel: "Subtotal",
    discountLabel: "Discount (10% Demonstration)",
    taxableLabel: "Taxable Amount",
    taxableSub: "(After Discount)",
    gstLabel: "GST (5% Demonstration)",
    finalPayableLabel: "FINAL PAYABLE AMOUNT",
    taxesIncluded: "All taxes & discounts included",
    btnNewOrder: "New Order / Reset",
    btnGenerateBill: "GENERATE BILL & RECEIPT",
    receiptModalTitle: "Official Bill Receipt",
    receiptMotto: "“Delicious Food, Wonderful Moments”",
    recBillNo: "Bill No:",
    recDate: "Date:",
    recTime: "Time:",
    recCustomer: "Customer:",
    recTable: "Table No:",
    recPhone: "Contact:",
    taxesDisclaimer: "Prices inclusive of demonstration taxes.",
    thankYouMsg: "THANK YOU FOR DINING WITH US!",
    visitAgainMsg: "Please Visit Geetanjli Restaurant Again!",
    btnClose: "Close",
    btnDownloadTxt: "Download .TXT Bill",
    btnPrintReceipt: "Print Receipt",
    logout: "Logout",
    searchPlaceholder: "🔍 Search dishes...",
    addBtn: "Add",
    portionsWord: "portions",
    itemsWord: "items",
    valNameEmpty: "Please enter Customer Name.",
    valNameShort: "Customer Name must be at least 2 characters long.",
    valPhoneEmpty: "Please enter Mobile Number.",
    valPhoneInvalid: "Please enter a valid 10-digit Indian mobile number (e.g. 9876543210).",
    valTableEmpty: "Please enter Table Number.",
    valTableInvalid: "Table Number must be a positive integer (1 - 200).",
    valCartEmpty: "Cart is empty! Add at least one food item before generating bill."
  },
  hi: {
    appTitle: "गीतांजलि रेस्टोरेंट",
    appSubtitle: "“स्वादिष्ट भोजन, सुखद क्षण” • स्मार्ट बिलिंग व पीओएस टर्मिनल",
    customerHeader: "ग्राहक एवं टेबल का विवरण",
    mandatoryNote: "* अनिवार्य जानकारी",
    labelCustName: "ग्राहक का नाम",
    labelCustPhone: "मोबाइल नंबर (10 अंक)",
    labelCustTable: "टेबल नंबर",
    menuHeader: "रेस्टोरेंट मेनू (16 व्यंजन)",
    menuSub: "कार्ट में जोड़ने के लिए व्यंजन चुनें या मात्रा बढ़ाएं",
    catAll: "सभी व्यंजन (16)",
    catStarters: "स्टार्टर्स (4)",
    catMainCourse: "मेन कोर्स (4)",
    catBreads: "रोटी व नान (4)",
    catDesserts: "मिठाइयाँ (2)",
    catBeverages: "पेय पदार्थ (2)",
    cartHeader: "वर्तमान आर्डर / कार्ट",
    clearCart: "कार्ट खाली करें",
    colId: "आईडी",
    colItem: "व्यंजन",
    colPrice: "मूल्य",
    colQty: "मात्रा",
    colTotal: "कुल",
    emptyCartTitle: "आपकी कार्ट खाली है",
    emptyCartMsg: "आर्डर तैयार करने के लिए मेनू से स्वादिष्ट व्यंजन चुनें।",
    billCalcHeader: "बिल की गणना व कर (टैक्स)",
    ratesBadge: "छूट 10% • जीएसटी 5%",
    subtotalLabel: "उप-कुल (सबटोटल)",
    discountLabel: "छूट (10% डेमो)",
    taxableLabel: "कर-योग्य राशि",
    taxableSub: "(छूट के बाद)",
    gstLabel: "जीएसटी (5% डेमो)",
    finalPayableLabel: "अंतिम देय राशि",
    taxesIncluded: "सभी कर और छूट सम्मिलित हैं",
    btnNewOrder: "नया आर्डर / रीसेट",
    btnGenerateBill: "बिल और रसीद बनाएं",
    receiptModalTitle: "अधिकृत बिल रसीद",
    receiptMotto: "“स्वादिष्ट भोजन, सुखद क्षण”",
    recBillNo: "बिल क्र.:",
    recDate: "दिनांक:",
    recTime: "समय:",
    recCustomer: "ग्राहक:",
    recTable: "टेबल क्र.:",
    recPhone: "संपर्क:",
    taxesDisclaimer: "मूल्य लागू डेमो करों सहित हैं।",
    thankYouMsg: "हमारे यहाँ भोजन करने के लिए धन्यवाद!",
    visitAgainMsg: "कृपया गीतांजलि रेस्टोरेंट में पुनः पधारें!",
    btnClose: "बंद करें",
    btnDownloadTxt: "डाउनलोड .TXT बिल",
    btnPrintReceipt: "रसीद प्रिंट करें",
    logout: "लॉगआउट",
    searchPlaceholder: "🔍 व्यंजन खोजें...",
    addBtn: "जोड़ें",
    portionsWord: "हिस्से (पोर्शन)",
    itemsWord: "व्यंजन",
    valNameEmpty: "कृपया ग्राहक का नाम दर्ज करें।",
    valNameShort: "ग्राहक का नाम कम से कम 2 अक्षरों का होना चाहिए।",
    valPhoneEmpty: "कृपया मोबाइल नंबर दर्ज करें।",
    valPhoneInvalid: "कृपया 10 अंकों का वैध भारतीय मोबाइल नंबर दर्ज करें (उदा. 9876543210)।",
    valTableEmpty: "कृपया टेबल नंबर दर्ज करें।",
    valTableInvalid: "टेबल नंबर एक धनात्मक संख्या होनी चाहिए (1 - 200)।",
    valCartEmpty: "कार्ट खाली है! बिल बनाने से पहले कम से कम एक व्यंजन जोड़ें।"
  },
  te: {
    appTitle: "గీతాంజలి రెస్టారెంట్",
    appSubtitle: "“రుచికరమైన ఆహారం, అద్భుతమైన క్షణాలు” • స్మార్ట్ బిల్లింగ్ టెర్మినల్",
    customerHeader: "కస్టమర్ & టేబుల్ వివరాలు",
    mandatoryNote: "* తప్పనిసరి వివరాలు",
    labelCustName: "కస్టమర్ పేరు",
    labelCustPhone: "మొబైల్ నంబర్ (10 అంకెలు)",
    labelCustTable: "టేబుల్ నంబర్",
    menuHeader: "రెస్టారెంట్ మెనూ (16 వంటకాలు)",
    menuSub: "కార్ట్‌కు జోడించడానికి వంటకాన్ని ఎంచుకోండి",
    catAll: "అన్నీ (16)",
    catStarters: "స్టార్టర్స్ (4)",
    catMainCourse: "మెయిన్ కోర్స్ (4)",
    catBreads: "రొట్టెలు & నాన్లు (4)",
    catDesserts: "స్వీట్లు & డెజర్ట్స్ (2)",
    catBeverages: "పానీయాలు (2)",
    cartHeader: "ప్రస్తుత ఆర్డర్ / కార్ట్",
    clearCart: "కార్ట్ క్లియర్ చేయండి",
    colId: "ఐడీ",
    colItem: "వంటకం",
    colPrice: "ధర",
    colQty: "పరిమాణం",
    colTotal: "మొత్తం",
    emptyCartTitle: "మీ కార్ట్ ఖాళీగా ఉంది",
    emptyCartMsg: "ఆర్డర్ చేయడానికి మెనూ నుండి రుచికరమైన వంటకాలను ఎంచుకోండి.",
    billCalcHeader: "బిల్లు గణన & పన్నులు",
    ratesBadge: "రాయితీ 10% • జీఎస్టీ 5%",
    subtotalLabel: "సబ్‌టోటల్",
    discountLabel: "రాయితీ (10% డెమో)",
    taxableLabel: "పన్ను విధించదగిన మొత్తం",
    taxableSub: "(రాయితీ తర్వాత)",
    gstLabel: "జీఎస్టీ (5% డెమో)",
    finalPayableLabel: "తుది చెల్లింపు మొత్తం",
    taxesIncluded: "అన్ని పన్నులు & రాయితీలు కలిపి ఉన్నాయి",
    btnNewOrder: "కొత్త ఆర్డర్ / రీసెట్",
    btnGenerateBill: "బిల్లు & రసీదును రూపొందించండి",
    receiptModalTitle: "అధికారిక బిల్లు రసీదు",
    receiptMotto: "“రుచికరమైన ఆహారం, అద్భుతమైన క్షణాలు”",
    recBillNo: "బిల్లు నం:",
    recDate: "తేదీ:",
    recTime: "సమయం:",
    recCustomer: "కస్టమర్:",
    recTable: "టేబుల్ నం:",
    recPhone: "ఫోన్:",
    taxesDisclaimer: "ధరలు డెమో పన్నులతో కూడి ఉన్నాయి.",
    thankYouMsg: "మా వద్ద భోజనం చేసినందుకు ధన్యవాదాలు!",
    visitAgainMsg: "దయచేసి గీతాంజలి రెస్టారెంట్‌ను మళ్ళీ సందర్శించండి!",
    btnClose: "మూసివేయి",
    btnDownloadTxt: ".TXT బిల్లు డౌన్‌లోడ్",
    btnPrintReceipt: "రసీదు ప్రింట్ చేయండి",
    logout: "లాగ్ అవుట్",
    searchPlaceholder: "🔍 వంటకాలను వెతకండి...",
    addBtn: "జోడించు",
    portionsWord: "భాగాలు",
    itemsWord: "వంటకాలు",
    valNameEmpty: "దయచేసి కస్టమర్ పేరును నమోదు చేయండి.",
    valNameShort: "కస్టమర్ పేరు కనీసం 2 అక్షరాలు ఉండాలి.",
    valPhoneEmpty: "దయచేసి మొబైల్ నంబరును నమోదు చేయండి.",
    valPhoneInvalid: "దయచేసి సరైన 10 అంకెల భారతీయ మొబైల్ నంబరును నమోదు చేయండి.",
    valTableEmpty: "దయచేసి టేబుల్ నంబరును నమోదు చేయండి.",
    valTableInvalid: "టేబుల్ నంబర్ 1 నుండి 200 మధ్య ఉండాలి.",
    valCartEmpty: "కార్ట్ ఖాళీగా ఉంది! బిల్లు వేసేముందు వంటకాన్ని ఎంచుకోండి."
  }
};

// Exactly 16 Menu Items with Multilingual Names
const MENU_ITEMS = [
  // --- Starters (4 Items) ---
  {
    id: 101,
    categoryKey: "Starters",
    name: { en: "Paneer Tikka", hi: "पनीर टिक्का", te: "పనీర్ టిక్కా" },
    price: 240.00,
    isVeg: true
  },
  {
    id: 102,
    categoryKey: "Starters",
    name: { en: "Veg Crispy Spring Rolls", hi: "वेज क्रिस्पी स्प्रिंग रोल्स", te: "వెజ్ క్రిస్పీ స్ప్రింగ్ రోల్స్" },
    price: 180.00,
    isVeg: true
  },
  {
    id: 103,
    categoryKey: "Starters",
    name: { en: "Chicken Malai Tikka", hi: "चिकन मलाई टिक्का", te: "చికెన్ మలై టిక్కా" },
    price: 320.00,
    isVeg: false
  },
  {
    id: 104,
    categoryKey: "Starters",
    name: { en: "Hara Bhara Kabab", hi: "हरा भरा कबाब", te: "హరా భరా కబాబ్" },
    price: 210.00,
    isVeg: true
  },

  // --- Main Course (4 Items) ---
  {
    id: 201,
    categoryKey: "Main Course",
    name: { en: "Butter Chicken", hi: "बटर चिकन", te: "బటర్ చికెన్" },
    price: 380.00,
    isVeg: false
  },
  {
    id: 202,
    categoryKey: "Main Course",
    name: { en: "Paneer Butter Masala", hi: "पनीर बटर मसाला", te: "పనీర్ బటర్ మసాలా" },
    price: 310.00,
    isVeg: true
  },
  {
    id: 203,
    categoryKey: "Main Course",
    name: { en: "Dal Makhani", hi: "दाल मखनी", te: "దాల్ మఖని" },
    price: 250.00,
    isVeg: true
  },
  {
    id: 204,
    categoryKey: "Main Course",
    name: { en: "Hyderabadi Dum Biryani", hi: "हैदराबादी दम बिरयानी", te: "హైదరాబాదీ దమ్ బిర్యానీ" },
    price: 350.00,
    isVeg: false
  },

  // --- Breads (4 Items) ---
  {
    id: 301,
    categoryKey: "Breads",
    name: { en: "Butter Naan", hi: "बटर नान", te: "బటర్ నాన్" },
    price: 60.00,
    isVeg: true
  },
  {
    id: 302,
    categoryKey: "Breads",
    name: { en: "Garlic Naan", hi: "गार्लिक नान", te: "గార్లిక్ నాన్" },
    price: 80.00,
    isVeg: true
  },
  {
    id: 303,
    categoryKey: "Breads",
    name: { en: "Tandoori Roti", hi: "तंदूरी रोटी", te: "తందూరి రోటీ" },
    price: 35.00,
    isVeg: true
  },
  {
    id: 304,
    categoryKey: "Breads",
    name: { en: "Laccha Paratha", hi: "लच्छा पराठा", te: "లచ్చా పరాఠా" },
    price: 70.00,
    isVeg: true
  },

  // --- Desserts (2 Items) ---
  {
    id: 401,
    categoryKey: "Desserts",
    name: { en: "Gulab Jamun (2 pcs)", hi: "गुलाब जामुन (2 पीस)", te: "గులాబ్ జామూన్ (2 ముక్కలు)" },
    price: 110.00,
    isVeg: true
  },
  {
    id: 402,
    categoryKey: "Desserts",
    name: { en: "Rasmalai (2 pcs)", hi: "रसमलाई (2 पीस)", te: "రసమలై (2 ముక్కలు)" },
    price: 140.00,
    isVeg: true
  },

  // --- Beverages (2 Items) ---
  {
    id: 501,
    categoryKey: "Beverages",
    name: { en: "Masala Chai", hi: "मसाला चाय", te: "మసాలా టీ" },
    price: 60.00,
    isVeg: true
  },
  {
    id: 502,
    categoryKey: "Beverages",
    name: { en: "Mango Lassi", hi: "मैंगो लस्सी", te: "మ్యాంగో లస్సీ" },
    price: 120.00,
    isVeg: true
  }
];

// =========================================================================
// 3. APPLICATION STATE
// =========================================================================
class AppState {
  constructor() {
    this.currentUser = null;
    this.currentLanguage = localStorage.getItem("geetanjli_lang") || "en";
    this.currentTheme = localStorage.getItem("geetanjli_theme") || "light";
    this.cart = [];
    this.selectedCategory = "All";
    this.searchQuery = "";
    this.lastBill = null;
  }

  getItemName(item) {
    if (!item || !item.name) return "";
    return item.name[this.currentLanguage] || item.name.en || "";
  }

  getCategoryLabel(catKey) {
    if (catKey === "All") return I18N[this.currentLanguage].catAll;
    if (catKey === "Starters") return I18N[this.currentLanguage].catStarters;
    if (catKey === "Main Course") return I18N[this.currentLanguage].catMainCourse;
    if (catKey === "Breads") return I18N[this.currentLanguage].catBreads;
    if (catKey === "Desserts") return I18N[this.currentLanguage].catDesserts;
    if (catKey === "Beverages") return I18N[this.currentLanguage].catBeverages;
    return catKey;
  }

  addItem(item, quantity = 1) {
    const existing = this.cart.find(ci => ci.item.id === item.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.cart.push({ item, quantity });
    }
  }

  updateQuantity(itemId, newQty) {
    const idx = this.cart.findIndex(ci => ci.item.id === itemId);
    if (idx !== -1) {
      if (newQty <= 0) {
        this.cart.splice(idx, 1);
      } else {
        this.cart[idx].quantity = newQty;
      }
    }
  }

  changeQuantity(itemId, delta) {
    const item = this.cart.find(ci => ci.item.id === itemId);
    if (item) this.updateQuantity(itemId, item.quantity + delta);
  }

  removeItem(itemId) {
    this.cart = this.cart.filter(ci => ci.item.id !== itemId);
  }

  clearCart() {
    this.cart = [];
  }

  calculateBill() {
    const subtotal = this.cart.reduce((sum, ci) => sum + (ci.item.price * ci.quantity), 0);
    const discountAmount = subtotal * CONFIG.DISCOUNT_RATE;
    const taxableAmount = subtotal - discountAmount;
    const gstAmount = taxableAmount * CONFIG.GST_RATE;
    const finalAmount = taxableAmount + gstAmount;

    return {
      subtotal,
      discountPercent: CONFIG.DISCOUNT_RATE * 100,
      discountAmount,
      taxableAmount,
      gstPercent: CONFIG.GST_RATE * 100,
      gstAmount,
      finalAmount
    };
  }
}

const state = new AppState();

// =========================================================================
// 4. AUTHENTICATION & LOGIN MANAGEMENT
// =========================================================================

function checkExistingSession() {
  const savedUser = sessionStorage.getItem("geetanjli_logged_user");
  if (savedUser) {
    try {
      state.currentUser = JSON.parse(savedUser);
      applyUserSession();
      document.getElementById("loginOverlay").classList.add("hidden");
    } catch (e) {
      sessionStorage.removeItem("geetanjli_logged_user");
    }
  }
}

function handleLoginSubmit(e) {
  e.preventDefault();
  const userVal = document.getElementById("loginUser").value.trim();
  const passVal = document.getElementById("loginPass").value.trim();
  const errorBox = document.getElementById("loginErrorMsg");

  const matched = AUTHORIZED_STAFF.find(
    s => s.username.toLowerCase() === userVal.toLowerCase() && s.password === passVal
  );

  if (matched) {
    state.currentUser = matched;
    sessionStorage.setItem("geetanjli_logged_user", JSON.stringify(matched));
    applyUserSession();
    document.getElementById("loginOverlay").classList.add("hidden");
    errorBox.textContent = "";
    showToast(`Welcome back, ${matched.name} (${matched.role})!`, "success");
  } else {
    errorBox.textContent = "Invalid username or password. Please try again.";
  }
}

function applyUserSession() {
  if (!state.currentUser) return;
  document.getElementById("dispUserName").textContent = state.currentUser.name;
  document.getElementById("dispUserRole").textContent = state.currentUser.role;
  document.getElementById("userAvatar").textContent = state.currentUser.avatar;
}

window.quickFillCreds = function(user, pass) {
  document.getElementById("loginUser").value = user;
  document.getElementById("loginPass").value = pass;
  document.getElementById("loginErrorMsg").textContent = "";
};

function handleLogout() {
  if (confirm("Are you sure you want to log out from the POS Terminal?")) {
    state.currentUser = null;
    sessionStorage.removeItem("geetanjli_logged_user");
    document.getElementById("loginUser").value = "";
    document.getElementById("loginPass").value = "";
    document.getElementById("loginErrorMsg").textContent = "";
    document.getElementById("loginOverlay").classList.remove("hidden");
    showToast("Logged out successfully.");
  }
}

// =========================================================================
// 5. THEME TOGGLING (LIGHT / DARK)
// =========================================================================

function applyTheme(theme) {
  state.currentTheme = theme;
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("geetanjli_theme", theme);
  const themeIcon = document.getElementById("themeIcon");
  if (themeIcon) {
    themeIcon.textContent = theme === "dark" ? "☀️" : "🌙";
  }
}

function toggleTheme() {
  const newTheme = state.currentTheme === "dark" ? "light" : "dark";
  applyTheme(newTheme);
  showToast(newTheme === "dark" ? "Dark Mode activated" : "Light Mode activated");
}

// =========================================================================
// 6. MULTI-LANGUAGE ENGINE (I18N)
// =========================================================================

function applyLanguage(lang) {
  if (!I18N[lang]) lang = "en";
  state.currentLanguage = lang;
  localStorage.setItem("geetanjli_lang", lang);

  const dict = I18N[lang];
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });

  const searchInput = document.getElementById("menuSearch");
  if (searchInput) searchInput.placeholder = dict.searchPlaceholder;

  document.getElementById("langSelect").value = lang;

  renderMenu();
  renderCart();
}

// =========================================================================
// 7. RENDERING & UI LOGIC
// =========================================================================

function formatINR(val) {
  return CONFIG.CURRENCY + " " + val.toFixed(2);
}

function updateClock() {
  const now = new Date();
  const options = {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true
  };
  document.getElementById("liveClock").textContent = now.toLocaleString("en-IN", options);
}

function renderMenu() {
  const query = state.searchQuery.toLowerCase().trim();
  const filtered = MENU_ITEMS.filter(item => {
    const matchesCat = state.selectedCategory === "All" || item.categoryKey === state.selectedCategory;
    const nameStr = (item.name[state.currentLanguage] || item.name.en).toLowerCase();
    const matchesQuery = !query || nameStr.includes(query) || item.id.toString().includes(query);
    return matchesCat && matchesQuery;
  });

  const menuGrid = document.getElementById("menuGrid");
  const dict = I18N[state.currentLanguage];

  if (filtered.length === 0) {
    menuGrid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 2rem; color: #888;">No dishes found.</div>`;
    return;
  }

  menuGrid.innerHTML = filtered.map(item => {
    const displayName = state.getItemName(item);
    const catLabel = item.categoryKey;

    return `
      <div class="menu-item-card" data-id="${item.id}">
        <div>
          <div class="item-top">
            <div class="item-badge-wrap">
              <span class="diet-dot ${item.isVeg ? 'veg' : 'non-veg'}" title="${item.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}"></span>
              <span class="item-id">#${item.id}</span>
            </div>
            <span class="item-cat">${catLabel}</span>
          </div>
          <div class="item-name">${displayName}</div>
          <div class="item-price">${formatINR(item.price)}</div>
        </div>
        <div class="item-bottom">
          <div class="item-actions">
            <div class="qty-control">
              <button class="qty-btn" onclick="adjustMenuQty(${item.id}, -1)">−</button>
              <span class="qty-display" id="menu-qty-${item.id}">1</span>
              <button class="qty-btn" onclick="adjustMenuQty(${item.id}, 1)">+</button>
            </div>
            <button class="btn-add-item" onclick="handleAddMenuItem(${item.id})">
              <span>➕</span> ${dict.addBtn}
            </button>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

window.adjustMenuQty = function(id, delta) {
  const span = document.getElementById(`menu-qty-${id}`);
  if (span) {
    let current = parseInt(span.textContent, 10) || 1;
    span.textContent = Math.max(1, Math.min(50, current + delta));
  }
};

window.handleAddMenuItem = function(id) {
  const item = MENU_ITEMS.find(m => m.id === id);
  if (!item) return;

  const span = document.getElementById(`menu-qty-${id}`);
  const qty = span ? (parseInt(span.textContent, 10) || 1) : 1;

  state.addItem(item, qty);
  const displayName = state.getItemName(item);
  showToast(`Added ${qty}x ${displayName}`, "success");

  if (span) span.textContent = "1";
  renderCart();
};

function renderCart() {
  const cart = state.cart;
  const cartTable = document.getElementById("cartTable");
  const emptyState = document.getElementById("emptyCartState");
  const tbody = document.getElementById("cartTableBody");
  const countLabel = document.getElementById("cartSummaryCount");
  const dict = I18N[state.currentLanguage];

  if (cart.length === 0) {
    cartTable.style.display = "none";
    emptyState.classList.remove("hidden");
    countLabel.textContent = `0 ${dict.itemsWord} (0 ${dict.portionsWord})`;
  } else {
    cartTable.style.display = "table";
    emptyState.classList.add("hidden");
    const distinct = cart.length;
    const totalPortions = cart.reduce((s, ci) => s + ci.quantity, 0);
    countLabel.textContent = `${distinct} ${dict.itemsWord} (${totalPortions} ${dict.portionsWord})`;

    tbody.innerHTML = cart.map(ci => {
      const displayName = state.getItemName(ci.item);
      const lineTotal = ci.item.price * ci.quantity;

      return `
        <tr>
          <td style="font-family: var(--font-mono); color: var(--text-muted);">${ci.item.id}</td>
          <td><strong>${displayName}</strong></td>
          <td style="text-align: right; font-family: var(--font-mono);">${formatINR(ci.item.price)}</td>
          <td style="text-align: center;">
            <div class="cart-row-qty">
              <button class="cart-stepper-btn" onclick="handleCartChange(${ci.item.id}, -1)">−</button>
              <span style="font-weight: 700; width: 22px; display: inline-block;">${ci.quantity}</span>
              <button class="cart-stepper-btn" onclick="handleCartChange(${ci.item.id}, 1)">+</button>
            </div>
          </td>
          <td style="text-align: right; font-weight: 700; font-family: var(--font-mono);">${formatINR(lineTotal)}</td>
          <td style="text-align: center;">
            <button class="btn-remove-row" onclick="handleCartRemove(${ci.item.id})" title="Remove item">🗑️</button>
          </td>
        </tr>
      `;
    }).join("");
  }

  const bill = state.calculateBill();
  document.getElementById("dispSubtotal").textContent = formatINR(bill.subtotal);
  document.getElementById("dispDiscount").textContent = "-" + formatINR(bill.discountAmount);
  document.getElementById("dispTaxable").textContent = formatINR(bill.taxableAmount);
  document.getElementById("dispGst").textContent = "+" + formatINR(bill.gstAmount);
  document.getElementById("dispFinalAmount").textContent = formatINR(bill.finalAmount);
}

window.handleCartChange = function(itemId, delta) {
  state.changeQuantity(itemId, delta);
  renderCart();
};

window.handleCartRemove = function(itemId) {
  state.removeItem(itemId);
  showToast("Item removed from cart");
  renderCart();
};

function showToast(message, type = "normal") {
  const container = document.getElementById("toastContainer");
  const toast = document.createElement("div");
  toast.className = `toast ${type === 'error' ? 'toast-error' : type === 'success' ? 'toast-success' : ''}`;
  toast.innerHTML = `<span>${type === 'error' ? '⚠️' : type === 'success' ? '✅' : 'ℹ️'}</span> ${message}`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(50px)";
    setTimeout(() => toast.remove(), 250);
  }, 2800);
}

// =========================================================================
// 8. INPUT VALIDATION & RECEIPT GENERATION
// =========================================================================

function validateInputs() {
  const dict = I18N[state.currentLanguage];
  const name = document.getElementById("custName").value.trim();
  const phone = document.getElementById("custPhone").value.trim().replace(/[\s-]/g, "");
  const table = document.getElementById("custTable").value.trim();

  if (!name) {
    showToast(dict.valNameEmpty, "error");
    document.getElementById("custName").focus();
    return false;
  }
  if (name.length < 2) {
    showToast(dict.valNameShort, "error");
    document.getElementById("custName").focus();
    return false;
  }
  if (!phone) {
    showToast(dict.valPhoneEmpty, "error");
    document.getElementById("custPhone").focus();
    return false;
  }
  if (!/^[6-9]\d{9}$/.test(phone)) {
    showToast(dict.valPhoneInvalid, "error");
    document.getElementById("custPhone").focus();
    return false;
  }
  if (!table) {
    showToast(dict.valTableEmpty, "error");
    document.getElementById("custTable").focus();
    return false;
  }
  const tableNum = parseInt(table, 10);
  if (isNaN(tableNum) || tableNum <= 0 || tableNum > 200) {
    showToast(dict.valTableInvalid, "error");
    document.getElementById("custTable").focus();
    return false;
  }
  if (state.cart.length === 0) {
    showToast(dict.valCartEmpty, "error");
    return false;
  }

  return { name, phone, table: tableNum };
}

function handleGenerateBill() {
  const customer = validateInputs();
  if (!customer) return;

  const billCalc = state.calculateBill();
  const now = new Date();
  const billNo = "BILL-" + Math.floor(100000 + Math.random() * 900000);

  state.lastBill = {
    billNo, customer,
    date: now.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
    time: now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true }),
    timestamp: now,
    items: [...state.cart],
    ...billCalc
  };

  document.getElementById("recBillNo").textContent = billNo;
  document.getElementById("recDate").textContent = state.lastBill.date;
  document.getElementById("recTime").textContent = state.lastBill.time;
  document.getElementById("recCustomer").textContent = customer.name;
  document.getElementById("recTable").textContent = customer.table;
  document.getElementById("recPhone").textContent = customer.phone;

  document.getElementById("recItemsBody").innerHTML = state.lastBill.items.map(ci => `
    <tr>
      <td>${state.getItemName(ci.item)}</td>
      <td style="text-align: right;">${ci.item.price.toFixed(2)}</td>
      <td style="text-align: center;">${ci.quantity}</td>
      <td style="text-align: right;">${(ci.item.price * ci.quantity).toFixed(2)}</td>
    </tr>
  `).join("");

  document.getElementById("recSubtotal").textContent = formatINR(billCalc.subtotal);
  document.getElementById("recDiscount").textContent = "-" + formatINR(billCalc.discountAmount);
  document.getElementById("recTaxable").textContent = formatINR(billCalc.taxableAmount);
  document.getElementById("recGst").textContent = "+" + formatINR(billCalc.gstAmount);
  document.getElementById("recFinalAmount").textContent = formatINR(billCalc.finalAmount);
  document.getElementById("recPortionsCount").textContent =
    `Total Items: ${state.cart.length} | Total Portions: ${state.cart.reduce((s, ci) => s + ci.quantity, 0)}`;

  document.getElementById("receiptModal").classList.add("show");
}

function downloadReceiptTxt() {
  if (!state.lastBill) return;
  const b = state.lastBill;
  const lineWidth = 52;
  const line = "=".repeat(lineWidth);
  const dash = "-".repeat(lineWidth);
  const center = txt => " ".repeat(Math.max(0, Math.floor((lineWidth - txt.length) / 2))) + txt;

  let txt = line + "\n" +
    center("GEETANJLI RESTAURANT") + "\n" +
    center('"Delicious Food, Wonderful Moments"') + "\n" +
    center("Fine Dine & Hospitality | Contact: +91 98765 43210") + "\n" +
    line + "\n" +
    `Bill No   : ${b.billNo.padEnd(15)} Date/Time: ${b.date} ${b.time}\n` +
    `Customer  : ${b.customer.name.padEnd(15)} Table No : ${b.customer.table}\n` +
    `Contact   : +91 ${b.customer.phone}\n` +
    dash + "\n" +
    `${"ITEM DESCRIPTION".padEnd(24)} ${"PRICE".padStart(8)} ${"QTY".padStart(5)} ${"TOTAL".padStart(11)}\n` +
    dash + "\n";

  b.items.forEach(ci => {
    let name = ci.item.name.en;
    if (name.length > 24) name = name.substring(0, 21) + "...";
    txt += `${name.padEnd(24)} ${ci.item.price.toFixed(2).padStart(8)} ${ci.quantity.toString().padStart(5)} ${(ci.item.price * ci.quantity).toFixed(2).padStart(11)}\n`;
  });

  txt += dash + "\n" +
    `${"Subtotal:".padEnd(34)} ₹ ${b.subtotal.toFixed(2).padStart(12)}\n` +
    `${`Discount (${b.discountPercent}%):`.padEnd(34)} -₹ ${b.discountAmount.toFixed(2).padStart(11)}\n` +
    `${"Taxable Amount:".padEnd(34)} ₹ ${b.taxableAmount.toFixed(2).padStart(12)}\n` +
    `${`GST (${b.gstPercent}%):`.padEnd(34)} +₹ ${b.gstAmount.toFixed(2).padStart(11)}\n` +
    line + "\n" +
    `${"FINAL PAYABLE AMOUNT:".padEnd(34)} ₹ ${b.finalAmount.toFixed(2).padStart(12)}\n` +
    line + "\n\n" +
    center("THANK YOU FOR DINING WITH US!") + "\n" +
    center("Please Visit Geetanjli Restaurant Again!") + "\n" +
    line + "\n";

  const pad = n => String(n).padStart(2, '0');
  const d = b.timestamp;
  const filename = `Bill_Table${b.customer.table}_${d.getFullYear()}${pad(d.getMonth()+1)}${pad(d.getDate())}_${pad(d.getHours())}${pad(d.getMinutes())}.txt`;

  const blob = new Blob([txt], { type: "text/plain;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  showToast(`Receipt downloaded: ${filename}`, "success");
}

// =========================================================================
// 9. EVENT LISTENERS
// =========================================================================

// Login Form
document.getElementById("loginForm").addEventListener("submit", handleLoginSubmit);
document.getElementById("btnLogout").addEventListener("click", handleLogout);

// Theme Toggle
document.getElementById("themeToggleBtn").addEventListener("click", toggleTheme);

// Language Selector
document.getElementById("langSelect").addEventListener("change", e => {
  applyLanguage(e.target.value);
});

// Category Filter
document.getElementById("categoryTabs").addEventListener("click", e => {
  if (e.target.classList.contains("cat-btn")) {
    document.querySelectorAll(".cat-btn").forEach(btn => btn.classList.remove("active"));
    e.target.classList.add("active");
    state.selectedCategory = e.target.dataset.category;
    renderMenu();
  }
});

// Search
document.getElementById("menuSearch").addEventListener("input", e => {
  state.searchQuery = e.target.value;
  renderMenu();
});

// Clear Cart
document.getElementById("btnClearCart").addEventListener("click", () => {
  if (state.cart.length > 0 && confirm("Are you sure you want to clear the cart?")) {
    state.clearCart();
    renderCart();
    showToast("Cart cleared");
  }
});

// Reset New Order
document.getElementById("btnResetAll").addEventListener("click", () => {
  if (confirm("Start a new order? This will reset customer details and the cart.")) {
    document.getElementById("custName").value = "";
    document.getElementById("custPhone").value = "";
    document.getElementById("custTable").value = "";
    document.getElementById("menuSearch").value = "";
    state.searchQuery = "";
    state.clearCart();
    renderCart();
    renderMenu();
    document.getElementById("custName").focus();
    showToast("Ready for a new order!");
  }
});

// Generate Bill & Modal
document.getElementById("btnGenerateBill").addEventListener("click", handleGenerateBill);
document.getElementById("modalCloseBtn").addEventListener("click", () => document.getElementById("receiptModal").classList.remove("show"));
document.getElementById("btnCloseModal").addEventListener("click", () => document.getElementById("receiptModal").classList.remove("show"));
document.getElementById("btnPrintReceipt").addEventListener("click", () => window.print());
document.getElementById("btnDownloadTxt").addEventListener("click", downloadReceiptTxt);

document.getElementById("custPhone").addEventListener("input", e => {
  e.target.value = e.target.value.replace(/\D/g, "");
});

// =========================================================================
// 10. INITIALIZATION
// =========================================================================
applyTheme(state.currentTheme);
checkExistingSession();
applyLanguage(state.currentLanguage);
updateClock();
setInterval(updateClock, 1000);

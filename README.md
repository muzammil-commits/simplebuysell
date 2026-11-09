# SimplyBuySell - Real Estate Web Application

A responsive, high-performance real estate portal built according to the exact visual designs and specifications.

---

## 📱 Page Overview & Design Mapping

| Image Reference | Page Title | File | Description |
|---|---|---|---|
| `image.png` & `image copy.png` | **Home Page** | [`index.html`](index.html) | Hero villa banner, trusted platform badge, Amaravathi LPS & 2nd pooling cards, About Us preview, Why Choose Us badges, interactive search form, property categories, and customer testimonials carousel. |
| `image copy 2.png` | **Open Properties** | [`properties.html`](properties.html) | Dynamic property listings (Luxury Villa, Modern Apartment, Residential Plot, Independent House, Commercial Space, Farm Land), search by keyword, filter by location, property type & budget, interactive property details modal, favorite heart toggle, and pagination. |
| `image copy 3.png` | **Contact Us** | [`contact.html`](contact.html) | Get in Touch inquiry form with Query Type toggle (General Inquiry / Property Enquiry), dynamic 0/500 character counter, and instant submission confirmation. |
| `image copy 4.png` | **Write a Review** | [`write-review.html`](write-review.html) | Customer review submission portal with interactive 5-star rating selector, user avatar, character limit counter, and verification note. |
| `image copy 5.png` | **Our Reviews** | [`reviews.html`](reviews.html) | Customer reviews directory with verified customer cards (Rahul Sharma, Priya Mehta, Amit Verma), platform satisfaction statistics (10,000+ customers, 4.8/5 rating, 95% satisfaction), and brand motto banner. |
| `image copy 6.png` | **Our Motto** | [`motto.html`](motto.html) | 6 Core Guiding Principles (Customer Interest Comes First, We Value Your Dreams, Trust & Clarity, Transparent Platform, Our Role, Complete Information) with brand motto statement. |
| `image copy 7.png` | **About Us** | [`about.html`](about.html) | Company background, 15 years experience highlight, values, and client-first commitment. |
| `image copy 8.png` | **Buy Property** | [`buy.html`](buy.html) | Interactive 2-step purchase wizard (Select Property Type, Buy/Rent action toggle, buyer details, property preferences, additional checkboxes, and submission). |
| `image copy 9.png` | **Sell Property** | [`sell.html`](sell.html) | Interactive 2-step listing wizard for Amaravathi LPS Plots and 2nd Pooling Lands, seller details, village selection, documents checklist, and inquiry dispatch. |

---

## 🌟 Key Features

1. **Pixel-Perfect Responsive Design**:
   - Built with modern HTML5, CSS3, and vanilla JavaScript.
   - Exact color palettes, typography, gradients, glassmorphism, and card borders from design mockups.
   - Responsive across mobile devices, tablets, and desktop displays.

2. **Dual Viewport Switcher**:
   - **Mobile App Frame**: Simulates high-end smartphone view with iOS status bar, clock, and rounded corners.
   - **Desktop View**: Expands into fluid responsive layout for desktop screens.

3. **Open Links in New Page / Tab**:
   - Dedicated top control bar with "Open in new tab" option.
   - Quick jump dropdown for instant navigation between all 9 pages.

4. **Rich Interactive Popups & Modals**:
   - **Call Hotline Action Sheet**: One-tap phone dialer, WhatsApp direct chat, and toll-free assistance.
   - **Property Details Modal**: Complete specifications, full description, key amenities, and appointment booking form.
   - **Language Selector Modal**: Instant toggle for English, తెలుగు (Telugu), and हिन्दी (Hindi).
   - **Form Success Popups**: Animated checkmark confirmation dialogs with dynamic reference IDs.
   - **Interactive Star Rating**: Live hover and selection feedback on review stars.
   - **Dynamic Character Counters**: Real-time `0/500` character limit indicators.
   - **Favorites**: Clickable heart toggles on property cards with toast notifications.

---

## 🚀 How to Run Locally

You can open any `.html` file directly in any modern browser, or run a local static server:

```bash
# Using Python
python -m http.server 8080

# Using Node (npx)
npx serve .
```

Open `http://localhost:8080` in your web browser.

---

## 📂 Project Architecture

```
simple buy sell/
├── index.html                  # Home Page
├── properties.html             # Open Properties Directory
├── buy.html                    # Buy Property Form
├── sell.html                   # Sell Property Form
├── contact.html                # Contact Us Form
├── write-review.html           # Write a Review Form
├── reviews.html                # Our Reviews Directory
├── motto.html                  # Our Motto Page
├── about.html                  # About Us Page
├── assets/
│   ├── css/
│   │   └── style.css           # Complete custom design & animations
│   ├── js/
│   │   ├── main.js             # Viewport toggle, modals, validation, handlers
│   │   └── data.js             # Property database, reviews & locations
│   └── images/                 # All extracted high-resolution assets
└── README.md
```

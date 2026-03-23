module.exports = [
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/child_process [external] (child_process, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("child_process", () => require("child_process"));

module.exports = mod;
}),
"[project]/lib/stripe.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "stripe",
    ()=>stripe
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$server$2d$only$2f$empty$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.6_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/server-only/empty.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$stripe$40$20$2e$4$2e$1_$40$types$2b$node$40$22$2e$19$2e$11$2f$node_modules$2f$stripe$2f$esm$2f$stripe$2e$esm$2e$node$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/stripe@20.4.1_@types+node@22.19.11/node_modules/stripe/esm/stripe.esm.node.js [app-rsc] (ecmascript)");
;
;
const stripe = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$stripe$40$20$2e$4$2e$1_$40$types$2b$node$40$22$2e$19$2e$11$2f$node_modules$2f$stripe$2f$esm$2f$stripe$2e$esm$2e$node$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"](process.env.STRIPE_SECRET_KEY);
}),
"[project]/data/products.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getProductById",
    ()=>getProductById,
    "getProductsByCategory",
    ()=>getProductsByCategory,
    "products",
    ()=>products,
    "searchProducts",
    ()=>searchProducts
]);
const products = [
    {
        id: '1',
        name: "Tiki Ziki – Let's Lose",
        description: "An energetic track that captures the essence of letting go and embracing the moment. High-quality MP3 download with instant delivery to your email.",
        price: 200,
        category: 'Music',
        type: 'digital',
        image: '/images/lets-lose.jpg'
    },
    {
        id: '2',
        name: "Tiki Ziki – Midnight Vibes",
        description: "A smooth, atmospheric track perfect for late-night listening. Features deep bass and melodic synths. Instant MP3 download.",
        price: 250,
        category: 'Music',
        type: 'digital',
        image: '/images/midnight-vibes.jpg'
    },
    {
        id: '3',
        name: "Tiki Ziki – Rise Up",
        description: "An uplifting anthem that inspires and motivates. Perfect for workouts and morning routines. High-quality MP3 format.",
        price: 200,
        category: 'Music',
        type: 'digital',
        image: '/images/rise-up.jpg'
    },
    {
        id: '4',
        name: 'Tiki Ziki Black T-Shirt',
        description: "Premium quality black t-shirt featuring the iconic Tiki Ziki logo. Made from 100% cotton for ultimate comfort. Available in multiple sizes.",
        price: 1500,
        category: 'Merch',
        type: 'physical',
        image: '/images/black-tshirt.jpg',
        sizes: [
            'S',
            'M',
            'L',
            'XL',
            'XXL'
        ],
        colors: [
            'Black'
        ]
    },
    {
        id: '5',
        name: 'Tiki Ziki White T-Shirt',
        description: "Classic white t-shirt with the Tiki Ziki signature print. Soft, breathable fabric perfect for any occasion.",
        price: 1500,
        category: 'Merch',
        type: 'physical',
        image: '/images/white-tshirt.jpg',
        sizes: [
            'S',
            'M',
            'L',
            'XL',
            'XXL'
        ],
        colors: [
            'White'
        ]
    },
    {
        id: '6',
        name: 'Tiki Ziki Hoodie',
        description: "Stay warm in style with this premium Tiki Ziki hoodie. Features a front pocket, adjustable hood, and soft fleece lining. Perfect for cooler days.",
        price: 3500,
        category: 'Merch',
        type: 'physical',
        image: '/images/hoodie.jpg',
        sizes: [
            'S',
            'M',
            'L',
            'XL',
            'XXL'
        ],
        colors: [
            'Black',
            'Gray'
        ]
    }
];
function getProductById(id) {
    return products.find((product)=>product.id === id);
}
function getProductsByCategory(category) {
    return products.filter((product)=>product.category === category);
}
function searchProducts(query) {
    const lowercaseQuery = query.toLowerCase();
    return products.filter((product)=>product.name.toLowerCase().includes(lowercaseQuery) || product.description.toLowerCase().includes(lowercaseQuery) || product.category.toLowerCase().includes(lowercaseQuery));
}
}),
"[project]/app/actions/stripe.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"402fbbfae054153ef81e72cced797f6521ef295082":"getCheckoutSession","4050e2be6fca15a9a16276b960e933274ac8ae7b83":"startCheckoutSession"},"",""] */ __turbopack_context__.s([
    "getCheckoutSession",
    ()=>getCheckoutSession,
    "startCheckoutSession",
    ()=>startCheckoutSession
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.6_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$stripe$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/stripe.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$products$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/products.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.6_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
async function startCheckoutSession(cartItems) {
    if (!cartItems || cartItems.length === 0) {
        throw new Error('Cart is empty');
    }
    // Build line items from cart, validating prices server-side
    const lineItems = cartItems.map((cartItem)=>{
        const product = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$products$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["products"].find((p)=>p.id === cartItem.productId);
        if (!product) {
            throw new Error(`Product with id "${cartItem.productId}" not found`);
        }
        // Build product name with options
        let productName = product.name;
        const options = [];
        if (cartItem.selectedSize) options.push(`Size: ${cartItem.selectedSize}`);
        if (cartItem.selectedColor) options.push(`Color: ${cartItem.selectedColor}`);
        if (options.length > 0) {
            productName = `${product.name} (${options.join(', ')})`;
        }
        return {
            price_data: {
                currency: 'kes',
                product_data: {
                    name: productName,
                    description: product.description.substring(0, 500)
                },
                unit_amount: product.price
            },
            quantity: cartItem.quantity
        };
    });
    // Calculate if shipping is needed
    const hasPhysicalItems = cartItems.some((item)=>{
        const product = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$products$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["products"].find((p)=>p.id === item.productId);
        return product?.type === 'physical';
    });
    const subtotal = cartItems.reduce((sum, item)=>{
        const product = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$products$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["products"].find((p)=>p.id === item.productId);
        return sum + (product?.price || 0) * item.quantity;
    }, 0);
    // Add shipping if needed (500 KES for orders under 5000 KES)
    if (hasPhysicalItems && subtotal < 5000) {
        lineItems.push({
            price_data: {
                currency: 'kes',
                product_data: {
                    name: 'Shipping',
                    description: 'Standard shipping within Kenya'
                },
                unit_amount: 500
            },
            quantity: 1
        });
    }
    // Create Checkout Session with embedded UI mode
    const session = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$stripe$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["stripe"].checkout.sessions.create({
        ui_mode: 'embedded',
        redirect_on_completion: 'never',
        line_items: lineItems,
        mode: 'payment'
    });
    return session.client_secret;
}
async function getCheckoutSession(sessionId) {
    const session = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$stripe$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["stripe"].checkout.sessions.retrieve(sessionId);
    return {
        status: session.status,
        customerEmail: session.customer_details?.email
    };
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    startCheckoutSession,
    getCheckoutSession
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(startCheckoutSession, "4050e2be6fca15a9a16276b960e933274ac8ae7b83", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getCheckoutSession, "402fbbfae054153ef81e72cced797f6521ef295082", null);
}),
"[project]/.next-internal/server/app/store/checkout/page/actions.js { ACTIONS_MODULE0 => \"[project]/app/actions/stripe.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$stripe$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/actions/stripe.ts [app-rsc] (ecmascript)");
;
}),
"[project]/.next-internal/server/app/store/checkout/page/actions.js { ACTIONS_MODULE0 => \"[project]/app/actions/stripe.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "4050e2be6fca15a9a16276b960e933274ac8ae7b83",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$stripe$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["startCheckoutSession"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$store$2f$checkout$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$app$2f$actions$2f$stripe$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/store/checkout/page/actions.js { ACTIONS_MODULE0 => "[project]/app/actions/stripe.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$stripe$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/actions/stripe.ts [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1c69265a._.js.map
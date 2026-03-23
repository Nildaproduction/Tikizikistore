module.exports = [
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/pages/api/mpesa.ts [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>handler
]);
async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({
            success: false,
            message: 'Method not allowed'
        });
    }
    const { phone, amount } = req.body;
    if (!phone || !amount) {
        return res.status(400).json({
            success: false,
            message: 'Phone and amount are required'
        });
    }
    // TODO: Integrate with real Mpesa API here
    // Simulate a successful payment for now
    await new Promise((resolve)=>setTimeout(resolve, 2000));
    return res.status(200).json({
        success: true,
        message: 'Mpesa payment simulated (replace with real integration)'
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__e9f455b4._.js.map
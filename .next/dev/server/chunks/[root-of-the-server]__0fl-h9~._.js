module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/Documents/Github/PL-Genesis/src/app/api/upload/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$1_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Github/PL-Genesis/node_modules/.pnpm/next@16.2.1_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/server.js [app-route] (ecmascript)");
;
async function uploadToStoracha(receipt) {
    const key = process.env.STORACHA_KEY;
    const spaceDid = process.env.SPACE_DID;
    if (!key || !spaceDid) {
        throw new Error("STORACHA_KEY or SPACE_DID not set");
    }
    const { create } = await __turbopack_context__.A("[externals]/@web3-storage/w3up-client [external] (@web3-storage/w3up-client, esm_import, [project]/Documents/Github/PL-Genesis/node_modules/.pnpm/@web3-storage+w3up-client@17.3.0_encoding@0.1.13/node_modules/@web3-storage/w3up-client, async loader)");
    const client = await create();
    await client.setCurrentSpace(spaceDid);
    const blob = new Blob([
        JSON.stringify(receipt, null, 2)
    ], {
        type: "application/json"
    });
    const file = new File([
        blob
    ], "agent_log_receipt.json", {
        type: "application/json"
    });
    const cid = await client.uploadFile(file);
    return `ipfs://${cid.toString()}`;
}
async function mockUpload(receipt) {
    const encoder = new TextEncoder();
    const data = encoder.encode(JSON.stringify(receipt));
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map((b)=>b.toString(16).padStart(2, "0")).join("");
    return `ipfs://bafybeig${hashHex.slice(0, 50)}`;
}
async function POST(req) {
    try {
        const body = await req.json();
        if (!body.receipt) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$1_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Missing receipt"
            }, {
                status: 400
            });
        }
        let cid;
        let mode;
        try {
            cid = await uploadToStoracha(body.receipt);
            mode = "storacha";
        } catch  {
            cid = await mockUpload(body.receipt);
            mode = "mock";
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$1_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            cid,
            mode
        });
    } catch (e) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$1_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: e.message
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0fl-h9~._.js.map
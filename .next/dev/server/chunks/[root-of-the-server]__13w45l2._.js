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
"[project]/Documents/Github/PL-Genesis/src/app/api/execute/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$1_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Github/PL-Genesis/node_modules/.pnpm/next@16.2.1_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/server.js [app-route] (ecmascript)");
;
function evaluateAdherence(trade, guardrails, overrides) {
    const effective = {
        ...guardrails,
        ...overrides ? {
            // Follower can only tighten, never loosen
            maxPositionSizeUSDC: Math.min(guardrails.maxPositionSizeUSDC, overrides.maxPositionSizeUSDC ?? guardrails.maxPositionSizeUSDC),
            maxLeverage: Math.min(guardrails.maxLeverage, overrides.maxLeverage ?? guardrails.maxLeverage),
            dailyLossLimitPercent: Math.min(guardrails.dailyLossLimitPercent, overrides.dailyLossLimitPercent ?? guardrails.dailyLossLimitPercent),
            killSwitchEnabled: guardrails.killSwitchEnabled || (overrides.killSwitchEnabled ?? false)
        } : {}
    };
    const violations = [];
    if (trade.pnlPercent < 0 && Math.abs(trade.pnlPercent) > effective.dailyLossLimitPercent) {
        violations.push(`DAILY_LOSS_EXCEEDED: loss ${Math.abs(trade.pnlPercent).toFixed(1)}% > limit ${effective.dailyLossLimitPercent}%`);
    }
    return {
        verified: violations.length === 0,
        violations
    };
}
async function POST(req) {
    try {
        const body = await req.json();
        const { request, policy, mockTradeResult } = body;
        if (!request || !policy) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$1_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Missing request or policy"
            }, {
                status: 400
            });
        }
        // Simulate trade result (in production, Lit TEE executes real logic)
        const trade = mockTradeResult ?? {
            pnlPercent: -6.0,
            slippageBps: 45,
            latencyMs: 320,
            txHash: null
        };
        const { verified, violations } = evaluateAdherence(trade, policy.riskGuardrails, request.customRiskOverrides);
        const receipt = {
            followerWallet: request.followerWallet,
            providerAgentId: request.inheritedPolicyId,
            timestamp: Date.now(),
            policyAdherenceVerified: verified,
            executionSuccess: true,
            metrics: {
                latency_ms: trade.latencyMs,
                slippage_bps: trade.slippageBps
            },
            onChainTxHash: trade.txHash,
            teeSignature: `0xTEE_SIG_${Date.now().toString(36)}`
        };
        return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$2$2e$1_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            receipt,
            violations
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

//# sourceMappingURL=%5Broot-of-the-server%5D__13w45l2._.js.map
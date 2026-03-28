module.exports = [
"[project]/Documents/Github/PL-Genesis/node_modules/.pnpm/@web3-storage+access@20.3.0/node_modules/@web3-storage/access/dist/src/types.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

// export other types
__turbopack_context__.s([
    "AppName",
    ()=>AppName
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$web3$2d$storage$2b$did$2d$mailto$40$2$2e$1$2e$0$2f$node_modules$2f40$web3$2d$storage$2f$did$2d$mailto$2f$dist$2f$src$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/Github/PL-Genesis/node_modules/.pnpm/@web3-storage+did-mailto@2.1.0/node_modules/@web3-storage/did-mailto/dist/src/index.js [app-route] (ecmascript) <locals>");
;
;
;
;
var AppName;
(function(AppName) {
    AppName["BskyBackups"] = "bsky-backups";
})(AppName || (AppName = {}));
}),
"[project]/Documents/Github/PL-Genesis/node_modules/.pnpm/@web3-storage+access@20.3.0/node_modules/@web3-storage/access/dist/src/encoding.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "bytesToDelegations",
    ()=>bytesToDelegations,
    "delegationToString",
    ()=>delegationToString,
    "delegationsToBytes",
    ()=>delegationsToBytes,
    "delegationsToString",
    ()=>delegationsToString,
    "expirationToDate",
    ()=>expirationToDate,
    "stringToDelegation",
    ()=>stringToDelegation,
    "stringToDelegations",
    ()=>stringToDelegations
]);
/**
 * Encoding utilities
 *
 * It is recommended that you import directly with:
 * ```js
 * import * as Encoding from '@web3-storage/access/encoding'
 *
 * // or
 *
 * import { encodeDelegations } from '@web3-storage/access/encoding'
 * ```
 *
 * @module
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$ipld$2b$car$40$5$2e$4$2e$2$2f$node_modules$2f40$ipld$2f$car$2f$src$2f$buffer$2d$reader$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Github/PL-Genesis/node_modules/.pnpm/@ipld+car@5.4.2/node_modules/@ipld/car/src/buffer-reader.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$ipld$2b$car$40$5$2e$4$2e$2$2f$node_modules$2f40$ipld$2f$car$2f$src$2f$buffer$2d$writer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Github/PL-Genesis/node_modules/.pnpm/@ipld+car@5.4.2/node_modules/@ipld/car/src/buffer-writer.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$ucanto$2b$core$40$10$2e$4$2e$6$2f$node_modules$2f40$ucanto$2f$core$2f$src$2f$delegation$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Github/PL-Genesis/node_modules/.pnpm/@ucanto+core@10.4.6/node_modules/@ucanto/core/src/delegation.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f$uint8arrays$40$5$2e$1$2e$0$2f$node_modules$2f$uint8arrays$2f$dist$2f$src$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/Github/PL-Genesis/node_modules/.pnpm/uint8arrays@5.1.0/node_modules/uint8arrays/dist/src/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f$uint8arrays$40$5$2e$1$2e$0$2f$node_modules$2f$uint8arrays$2f$dist$2f$src$2f$to$2d$string$2e$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Github/PL-Genesis/node_modules/.pnpm/uint8arrays@5.1.0/node_modules/uint8arrays/dist/src/to-string.node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f$uint8arrays$40$5$2e$1$2e$0$2f$node_modules$2f$uint8arrays$2f$dist$2f$src$2f$from$2d$string$2e$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Github/PL-Genesis/node_modules/.pnpm/uint8arrays@5.1.0/node_modules/uint8arrays/dist/src/from-string.node.js [app-route] (ecmascript)");
;
;
;
;
;
function delegationsToBytes(delegations) {
    if (!Array.isArray(delegations) || delegations.length === 0) {
        throw new Error('Delegations required to be an non empty array.');
    }
    const roots = delegations.map((d)=>d.root.cid);
    const cids = new Set();
    /** @type {CarBufferWriter.Block[]} */ const blocks = [];
    let byteLength = 0;
    for (const delegation of delegations){
        for (const block of delegation.export()){
            const cid = block.cid.toV1().toString();
            if (!cids.has(cid)) {
                byteLength += __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$ipld$2b$car$40$5$2e$4$2e$2$2f$node_modules$2f40$ipld$2f$car$2f$src$2f$buffer$2d$writer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["blockLength"](block);
                blocks.push(block);
                cids.add(cid);
            }
        }
    }
    const headerLength = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$ipld$2b$car$40$5$2e$4$2e$2$2f$node_modules$2f40$ipld$2f$car$2f$src$2f$buffer$2d$writer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["estimateHeaderLength"](roots.length);
    const writer = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$ipld$2b$car$40$5$2e$4$2e$2$2f$node_modules$2f40$ipld$2f$car$2f$src$2f$buffer$2d$writer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createWriter"](new ArrayBuffer(headerLength + byteLength), {
        roots
    });
    for (const block of blocks){
        writer.write(block);
    }
    return writer.close();
}
function bytesToDelegations(bytes) {
    if (!(bytes instanceof Uint8Array) || bytes.length === 0) {
        throw new TypeError('Input should be a non-empty Uint8Array.');
    }
    const reader = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$ipld$2b$car$40$5$2e$4$2e$2$2f$node_modules$2f40$ipld$2f$car$2f$src$2f$buffer$2d$reader$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CarBufferReader"].fromBytes(bytes);
    const roots = reader.getRoots();
    /** @type {Types.Delegation<T>[]} */ const delegations = [];
    for (const root of roots){
        const rootBlock = reader.get(root);
        if (rootBlock) {
            const blocks = new Map();
            for (const block of reader.blocks()){
                if (block.cid.toString() !== root.toString()) blocks.set(block.cid.toString(), block);
            }
            // @ts-ignore
            delegations.push(new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$ucanto$2b$core$40$10$2e$4$2e$6$2f$node_modules$2f40$ucanto$2f$core$2f$src$2f$delegation$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Delegation"](rootBlock, blocks));
        } else {
            throw new Error('Failed to find root from raw delegation.');
        }
    }
    return delegations;
}
function delegationsToString(delegations, encoding = 'base64url') {
    const bytes = delegationsToBytes(delegations);
    return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f$uint8arrays$40$5$2e$1$2e$0$2f$node_modules$2f$uint8arrays$2f$dist$2f$src$2f$to$2d$string$2e$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toString"](bytes, encoding);
}
function delegationToString(delegation, encoding) {
    return delegationsToString([
        delegation
    ], encoding);
}
function stringToDelegations(raw, encoding = 'base64url') {
    const bytes = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f$uint8arrays$40$5$2e$1$2e$0$2f$node_modules$2f$uint8arrays$2f$dist$2f$src$2f$from$2d$string$2e$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fromString"](raw, encoding);
    return bytesToDelegations(bytes);
}
function stringToDelegation(raw, encoding) {
    const delegations = stringToDelegations(raw, encoding);
    return delegations[0];
}
function expirationToDate(expiration) {
    const expires = expiration === Infinity || !expiration ? undefined : new Date(expiration * 1000);
    return expires;
}
}),
"[project]/Documents/Github/PL-Genesis/node_modules/.pnpm/@web3-storage+access@20.3.0/node_modules/@web3-storage/access/dist/src/access.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GrantedAccess",
    ()=>GrantedAccess,
    "accountAccess",
    ()=>accountAccess,
    "claim",
    ()=>claim,
    "createPendingAccessRequest",
    ()=>createPendingAccessRequest,
    "delegate",
    ()=>delegate,
    "request",
    ()=>request,
    "spaceAccess",
    ()=>spaceAccess,
    "toCapabilities",
    ()=>toCapabilities
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$web3$2d$storage$2b$capabilities$40$18$2e$1$2e$0$2f$node_modules$2f40$web3$2d$storage$2f$capabilities$2f$src$2f$access$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/Github/PL-Genesis/node_modules/.pnpm/@web3-storage+capabilities@18.1.0/node_modules/@web3-storage/capabilities/src/access.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$web3$2d$storage$2b$access$40$20$2e$3$2e$0$2f$node_modules$2f40$web3$2d$storage$2f$access$2f$dist$2f$src$2f$types$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/Github/PL-Genesis/node_modules/.pnpm/@web3-storage+access@20.3.0/node_modules/@web3-storage/access/dist/src/types.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$ucanto$2b$core$40$10$2e$4$2e$6$2f$node_modules$2f40$ucanto$2f$core$2f$src$2f$lib$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/Github/PL-Genesis/node_modules/.pnpm/@ucanto+core@10.4.6/node_modules/@ucanto/core/src/lib.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$ucanto$2b$core$40$10$2e$4$2e$6$2f$node_modules$2f40$ucanto$2f$core$2f$src$2f$result$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Github/PL-Genesis/node_modules/.pnpm/@ucanto+core@10.4.6/node_modules/@ucanto/core/src/result.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$ipld$2b$dag$2d$ucan$40$3$2e$4$2e$5$2f$node_modules$2f40$ipld$2f$dag$2d$ucan$2f$src$2f$did$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__DID$3e$__ = __turbopack_context__.i("[project]/Documents/Github/PL-Genesis/node_modules/.pnpm/@ipld+dag-ucan@3.4.5/node_modules/@ipld/dag-ucan/src/did.js [app-route] (ecmascript) <export * as DID>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$web3$2d$storage$2b$access$40$20$2e$3$2e$0$2f$node_modules$2f40$web3$2d$storage$2f$access$2f$dist$2f$src$2f$agent$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/Github/PL-Genesis/node_modules/.pnpm/@web3-storage+access@20.3.0/node_modules/@web3-storage/access/dist/src/agent.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$web3$2d$storage$2b$access$40$20$2e$3$2e$0$2f$node_modules$2f40$web3$2d$storage$2f$access$2f$dist$2f$src$2f$encoding$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Github/PL-Genesis/node_modules/.pnpm/@web3-storage+access@20.3.0/node_modules/@web3-storage/access/dist/src/encoding.js [app-route] (ecmascript)");
;
;
;
;
;
const delegate = async (agent, { delegations, proofs = [], space = agent.currentSpace() })=>{
    if (!space) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$ucanto$2b$core$40$10$2e$4$2e$6$2f$node_modules$2f40$ucanto$2f$core$2f$src$2f$result$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fail"])('Space must be specified');
    }
    const entries = Object.values(delegations).map((proof)=>[
            proof.cid.toString(),
            proof.cid
        ]);
    const { out } = await agent.invokeAndExecute(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$web3$2d$storage$2b$capabilities$40$18$2e$1$2e$0$2f$node_modules$2f40$web3$2d$storage$2f$capabilities$2f$src$2f$access$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["delegate"], {
        with: space,
        nb: {
            delegations: Object.fromEntries(entries)
        },
        // must be embedded here because it's referenced by cid in .nb.delegations
        proofs: [
            ...delegations,
            ...proofs
        ]
    });
    return out;
};
const request = async (agent, { account, provider = agent.connection.id.did(), audience: audience = agent.did(), access = spaceAccess })=>{
    // Request access from the account.
    const { out: result } = await agent.invokeAndExecute(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$web3$2d$storage$2b$capabilities$40$18$2e$1$2e$0$2f$node_modules$2f40$web3$2d$storage$2f$capabilities$2f$src$2f$access$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["authorize"], {
        audience: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$ipld$2b$dag$2d$ucan$40$3$2e$4$2e$5$2f$node_modules$2f40$ipld$2f$dag$2d$ucan$2f$src$2f$did$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__DID$3e$__["DID"].parse(provider),
        with: audience,
        nb: {
            iss: account,
            // New ucan spec moved to recap style layout for capabilities and new
            // `access/request` will use similar format as opposed to legacy one,
            // in the meantime we translate new format to legacy format here.
            att: [
                ...toCapabilities(access)
            ]
        }
    });
    return result.error ? result : {
        ok: new PendingAccessRequest({
            ...result.ok,
            agent,
            audience,
            provider
        })
    };
};
const claim = async (agent, { provider = agent.connection.id.did(), audience = agent.did() } = {})=>{
    const { out: result } = await agent.invokeAndExecute(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$web3$2d$storage$2b$capabilities$40$18$2e$1$2e$0$2f$node_modules$2f40$web3$2d$storage$2f$capabilities$2f$src$2f$access$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["claim"], {
        audience: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$ipld$2b$dag$2d$ucan$40$3$2e$4$2e$5$2f$node_modules$2f40$ipld$2f$dag$2d$ucan$2f$src$2f$did$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__DID$3e$__["DID"].parse(provider),
        with: audience
    });
    if (result.error) {
        return result;
    } else {
        const delegations = Object.values(result.ok.delegations);
        const proofs = delegations.flatMap((proof)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$web3$2d$storage$2b$access$40$20$2e$3$2e$0$2f$node_modules$2f40$web3$2d$storage$2f$access$2f$dist$2f$src$2f$encoding$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["bytesToDelegations"])(proof));
        return {
            ok: new GrantedAccess({
                agent,
                proofs
            })
        };
    }
};
const createPendingAccessRequest = (agent, { request, expiration, provider = agent.connection.id.did(), audience: audience = agent.did() })=>new PendingAccessRequest({
        agent,
        request,
        expiration,
        provider,
        audience
    });
/**
 * Represents a pending access request. It can be used to poll for the requested
 * delegation.
 */ class PendingAccessRequest {
    /**
     * @typedef {object} PendingAccessRequestModel
     * @property {API.Agent} agent - Agent handling interaction.
     * @property {API.DID} audience - Principal requesting an access.
     * @property {API.ProviderDID} provider - Provider handling request.
     * @property {API.UTCUnixTimestamp} expiration - Seconds in UTC.
     * @property {API.Link} request - Link to the `access/authorize` invocation.
     *
     * @param {PendingAccessRequestModel} model
     */ constructor(model){
        this.model = model;
    }
    get agent() {
        return this.model.agent;
    }
    get audience() {
        return this.model.audience;
    }
    get expiration() {
        return new Date(this.model.expiration * 1000);
    }
    get request() {
        return this.model.request;
    }
    get provider() {
        return this.model.provider;
    }
    /**
     * Low level method and most likely you want to use `.claim` instead. This method will poll
     * fetch delegations **just once** and will return proofs matching to this request. Please note
     * that there may not be any matches in which case result will be `{ ok: [] }`.
     *
     * If you do want to continuously poll until request is approved or expired, you should use
     * `.claim` method instead.
     *
     * @returns {Promise<API.Result<API.Delegation[], API.InvocationError|API.AccessClaimFailure|RequestExpired>>}
     */ async poll() {
        const { agent, audience, provider, expiration } = this.model;
        const timeout = expiration * 1000 - Date.now();
        if (timeout <= 0) {
            return {
                error: new RequestExpired(this.model)
            };
        } else {
            const result = await claim(agent, {
                audience,
                provider
            });
            return result.error ? result : {
                ok: result.ok.proofs.filter((proof)=>isRequestedAccess(proof, this.model))
            };
        }
    }
    /**
     * Continuously polls delegations until this request is approved or expired. Returns
     * a `GrantedAccess` object (view over the delegations) that can be used in the
     * invocations or can be saved in the agent (store) using `.save()` method.
     *
     * @param {object} options
     * @param {number} [options.interval]
     * @param {AbortSignal} [options.signal]
     * @returns {Promise<API.Result<GrantedAccess, Error>>}
     */ async claim({ signal, interval = 250 } = {}) {
        while(signal?.aborted !== true){
            const result = await this.poll();
            // If polling failed, return the error.
            if (result.error) {
                return result;
            } else if (result.ok.length > 0) {
                return {
                    ok: new GrantedAccess({
                        agent: this.agent,
                        proofs: result.ok
                    })
                };
            }
            await new Promise((resolve)=>setTimeout(resolve, interval));
        }
        return {
            error: Object.assign(new Error('Aborted'), {
                reason: signal.reason
            })
        };
    }
}
/**
 * Error returned when pending access request expires.
 */ class RequestExpired extends __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$ucanto$2b$core$40$10$2e$4$2e$6$2f$node_modules$2f40$ucanto$2f$core$2f$src$2f$result$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Failure"] {
    /**
     * @param {PendingAccessRequestModel} model
     */ constructor(model){
        super();
        this.model = model;
    }
    get name() {
        return 'RequestExpired';
    }
    get request() {
        return this.model.request;
    }
    get expiredAt() {
        return new Date(this.model.expiration * 1000);
    }
    describe() {
        return `Access request expired at ${this.expiredAt} for ${this.request} request.`;
    }
}
class GrantedAccess {
    /**
     * @typedef {object} GrantedAccessModel
     * @property {API.Agent} agent - Agent that processed the request.
     * @property {API.Tuple<API.Delegation>} proofs - Delegations that grant access.
     *
     * @param {GrantedAccessModel} model
     */ constructor(model){
        this.model = model;
    }
    get proofs() {
        return this.model.proofs;
    }
    /**
     * Saves access into the agents proofs store so that it can be retained
     * between sessions.
     *
     * @param {object} input
     * @param {API.Agent} [input.agent]
     */ save({ agent = this.model.agent } = {}) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$web3$2d$storage$2b$access$40$20$2e$3$2e$0$2f$node_modules$2f40$web3$2d$storage$2f$access$2f$dist$2f$src$2f$agent$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["importAuthorization"])(agent, this);
    }
}
/**
 * Checks if the given delegation is caused by the passed `request` for access.
 *
 * @param {API.Delegation} delegation
 * @param {object} selector
 * @param {API.Link} selector.request
 * @returns
 */ const isRequestedAccess = (delegation, { request })=>// `access/confirm` handler adds facts to the delegation issued by the account
    // so that principal requesting access can identify correct delegation when
    // access is granted.
    delegation.facts.some((fact)=>`${fact['access/request']}` === `${request}`);
const toCapabilities = (access)=>{
    const abilities = [];
    const entries = Object.entries(access);
    for (const [can, details] of entries){
        if (details) {
            abilities.push({
                can
            });
        }
    }
    return abilities;
};
const spaceAccess = {
    'space/*': {},
    'blob/*': {},
    'index/*': {},
    'store/*': {},
    'upload/*': {},
    'access/*': {},
    'filecoin/*': {},
    'usage/*': {}
};
const accountAccess = {
    '*': {}
};
}),
"[project]/Documents/Github/PL-Genesis/node_modules/.pnpm/@web3-storage+access@20.3.0/node_modules/@web3-storage/access/dist/src/provider.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AccountDID",
    ()=>AccountDID,
    "ProviderDID",
    ()=>ProviderDID,
    "add",
    ()=>add
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$web3$2d$storage$2b$access$40$20$2e$3$2e$0$2f$node_modules$2f40$web3$2d$storage$2f$access$2f$dist$2f$src$2f$types$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/Github/PL-Genesis/node_modules/.pnpm/@web3-storage+access@20.3.0/node_modules/@web3-storage/access/dist/src/types.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$web3$2d$storage$2b$capabilities$40$18$2e$1$2e$0$2f$node_modules$2f40$web3$2d$storage$2f$capabilities$2f$src$2f$provider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/Github/PL-Genesis/node_modules/.pnpm/@web3-storage+capabilities@18.1.0/node_modules/@web3-storage/capabilities/src/provider.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$web3$2d$storage$2b$capabilities$40$18$2e$1$2e$0$2f$node_modules$2f40$web3$2d$storage$2f$capabilities$2f$src$2f$provider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Github/PL-Genesis/node_modules/.pnpm/@web3-storage+capabilities@18.1.0/node_modules/@web3-storage/capabilities/src/provider.js [app-route] (ecmascript)");
;
;
const { Provider: ProviderDID, AccountDID } = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$web3$2d$storage$2b$capabilities$40$18$2e$1$2e$0$2f$node_modules$2f40$web3$2d$storage$2f$capabilities$2f$src$2f$provider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__;
const add = async (agent, { account, consumer, provider = agent.connection.id.did(), proofs })=>{
    if (!ProviderDID.is(provider)) {
        throw new Error(`Unable to determine provider from agent.connection.id did ${provider}. expected a did:web:`);
    }
    const { out } = await agent.invokeAndExecute(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$web3$2d$storage$2b$capabilities$40$18$2e$1$2e$0$2f$node_modules$2f40$web3$2d$storage$2f$capabilities$2f$src$2f$provider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__.add, {
        with: account,
        nb: {
            provider,
            consumer
        },
        proofs
    });
    return out;
};
}),
"[project]/Documents/Github/PL-Genesis/node_modules/.pnpm/@web3-storage+access@20.3.0/node_modules/@web3-storage/access/dist/src/space.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "OwnedSpace",
    ()=>OwnedSpace,
    "SESSION_LIFETIME",
    ()=>SESSION_LIFETIME,
    "SharedSpace",
    ()=>SharedSpace,
    "createAuthorization",
    ()=>createAuthorization,
    "createRecovery",
    ()=>createRecovery,
    "fromDelegation",
    ()=>fromDelegation,
    "fromMnemonic",
    ()=>fromMnemonic,
    "generate",
    ()=>generate,
    "provision",
    ()=>provision,
    "toMnemonic",
    ()=>toMnemonic
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$ucanto$2b$principal$40$9$2e$0$2e$3$2f$node_modules$2f40$ucanto$2f$principal$2f$src$2f$ed25519$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/Github/PL-Genesis/node_modules/.pnpm/@ucanto+principal@9.0.3/node_modules/@ucanto/principal/src/ed25519.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$ucanto$2b$principal$40$9$2e$0$2e$3$2f$node_modules$2f40$ucanto$2f$principal$2f$src$2f$ed25519$2f$signer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/Github/PL-Genesis/node_modules/.pnpm/@ucanto+principal@9.0.3/node_modules/@ucanto/principal/src/ed25519/signer.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$ucanto$2b$core$40$10$2e$4$2e$6$2f$node_modules$2f40$ucanto$2f$core$2f$src$2f$lib$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/Github/PL-Genesis/node_modules/.pnpm/@ucanto+core@10.4.6/node_modules/@ucanto/core/src/lib.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$ucanto$2b$core$40$10$2e$4$2e$6$2f$node_modules$2f40$ucanto$2f$core$2f$src$2f$delegation$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Github/PL-Genesis/node_modules/.pnpm/@ucanto+core@10.4.6/node_modules/@ucanto/core/src/delegation.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$ucanto$2b$core$40$10$2e$4$2e$6$2f$node_modules$2f40$ucanto$2f$core$2f$src$2f$schema$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Schema$3e$__ = __turbopack_context__.i("[project]/Documents/Github/PL-Genesis/node_modules/.pnpm/@ucanto+core@10.4.6/node_modules/@ucanto/core/src/schema.js [app-route] (ecmascript) <export * as Schema>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$ipld$2b$dag$2d$ucan$40$3$2e$4$2e$5$2f$node_modules$2f40$ipld$2f$dag$2d$ucan$2f$src$2f$lib$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__UCAN$3e$__ = __turbopack_context__.i("[project]/Documents/Github/PL-Genesis/node_modules/.pnpm/@ipld+dag-ucan@3.4.5/node_modules/@ipld/dag-ucan/src/lib.js [app-route] (ecmascript) <export * as UCAN>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$ucanto$2b$core$40$10$2e$4$2e$6$2f$node_modules$2f40$ucanto$2f$core$2f$src$2f$result$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Github/PL-Genesis/node_modules/.pnpm/@ucanto+core@10.4.6/node_modules/@ucanto/core/src/result.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$ipld$2b$dag$2d$ucan$40$3$2e$4$2e$5$2f$node_modules$2f40$ipld$2f$dag$2d$ucan$2f$src$2f$did$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__DID$3e$__ = __turbopack_context__.i("[project]/Documents/Github/PL-Genesis/node_modules/.pnpm/@ipld+dag-ucan@3.4.5/node_modules/@ipld/dag-ucan/src/did.js [app-route] (ecmascript) <export * as DID>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$scure$2b$bip39$40$1$2e$6$2e$0$2f$node_modules$2f40$scure$2f$bip39$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Github/PL-Genesis/node_modules/.pnpm/@scure+bip39@1.6.0/node_modules/@scure/bip39/esm/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$scure$2b$bip39$40$1$2e$6$2e$0$2f$node_modules$2f40$scure$2f$bip39$2f$esm$2f$wordlists$2f$english$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Github/PL-Genesis/node_modules/.pnpm/@scure+bip39@1.6.0/node_modules/@scure/bip39/esm/wordlists/english.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$web3$2d$storage$2b$access$40$20$2e$3$2e$0$2f$node_modules$2f40$web3$2d$storage$2f$access$2f$dist$2f$src$2f$types$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/Github/PL-Genesis/node_modules/.pnpm/@web3-storage+access@20.3.0/node_modules/@web3-storage/access/dist/src/types.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$web3$2d$storage$2b$access$40$20$2e$3$2e$0$2f$node_modules$2f40$web3$2d$storage$2f$access$2f$dist$2f$src$2f$access$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Github/PL-Genesis/node_modules/.pnpm/@web3-storage+access@20.3.0/node_modules/@web3-storage/access/dist/src/access.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$web3$2d$storage$2b$access$40$20$2e$3$2e$0$2f$node_modules$2f40$web3$2d$storage$2f$access$2f$dist$2f$src$2f$provider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Github/PL-Genesis/node_modules/.pnpm/@web3-storage+access@20.3.0/node_modules/@web3-storage/access/dist/src/provider.js [app-route] (ecmascript)");
;
;
;
;
;
;
;
const generate = async ({ name, agent })=>{
    const { signer } = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$ucanto$2b$principal$40$9$2e$0$2e$3$2f$node_modules$2f40$ucanto$2f$principal$2f$src$2f$ed25519$2f$signer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["generate"]();
    return new OwnedSpace({
        signer,
        name,
        agent
    });
};
const fromMnemonic = async (mnemonic, { name, agent })=>{
    const secret = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$scure$2b$bip39$40$1$2e$6$2e$0$2f$node_modules$2f40$scure$2f$bip39$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["mnemonicToEntropy"](mnemonic, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$scure$2b$bip39$40$1$2e$6$2e$0$2f$node_modules$2f40$scure$2f$bip39$2f$esm$2f$wordlists$2f$english$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["wordlist"]);
    const signer = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$ucanto$2b$principal$40$9$2e$0$2e$3$2f$node_modules$2f40$ucanto$2f$principal$2f$src$2f$ed25519$2f$signer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["derive"](secret);
    return new OwnedSpace({
        signer,
        name,
        agent
    });
};
const toMnemonic = ({ signer })=>{
    /** @type {Uint8Array} */ // @ts-expect-error - Field is defined but not in the interface
    const secret = signer.secret;
    return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$scure$2b$bip39$40$1$2e$6$2e$0$2f$node_modules$2f40$scure$2f$bip39$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["entropyToMnemonic"](secret, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$scure$2b$bip39$40$1$2e$6$2e$0$2f$node_modules$2f40$scure$2f$bip39$2f$esm$2f$wordlists$2f$english$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["wordlist"]);
};
const createRecovery = (space, account)=>createAuthorization(space, {
        audience: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$ipld$2b$dag$2d$ucan$40$3$2e$4$2e$5$2f$node_modules$2f40$ipld$2f$dag$2d$ucan$2f$src$2f$did$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__DID$3e$__["DID"].parse(account),
        access: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$web3$2d$storage$2b$access$40$20$2e$3$2e$0$2f$node_modules$2f40$web3$2d$storage$2f$access$2f$dist$2f$src$2f$access$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["accountAccess"],
        expiration: Infinity
    });
const SESSION_LIFETIME = 60 * 60 * 24 * 365;
const createAuthorization = async ({ signer, name }, { audience, access = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$web3$2d$storage$2b$access$40$20$2e$3$2e$0$2f$node_modules$2f40$web3$2d$storage$2f$access$2f$dist$2f$src$2f$access$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["spaceAccess"], expiration = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$ipld$2b$dag$2d$ucan$40$3$2e$4$2e$5$2f$node_modules$2f40$ipld$2f$dag$2d$ucan$2f$src$2f$lib$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__UCAN$3e$__["UCAN"].now() + SESSION_LIFETIME })=>{
    return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$ucanto$2b$core$40$10$2e$4$2e$6$2f$node_modules$2f40$ucanto$2f$core$2f$src$2f$delegation$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["delegate"])({
        issuer: signer,
        audience: audience,
        capabilities: toCapabilities({
            [signer.did()]: access
        }),
        ...expiration ? {
            expiration
        } : {},
        facts: [
            {
                space: {
                    name
                }
            }
        ]
    });
};
/**
 * @param {Record<API.Resource, API.Access>} allow
 * @returns {API.Capabilities}
 */ const toCapabilities = (allow)=>{
    const capabilities = [];
    for (const [subject, access] of Object.entries(allow)){
        const entries = Object.entries(access);
        for (const [can, details] of entries){
            if (details) {
                capabilities.push({
                    can,
                    with: subject
                });
            }
        }
    }
    return capabilities;
};
class OwnedSpace {
    /**
     * @param {Model} model
     */ constructor(model){
        this.model = model;
    }
    get signer() {
        return this.model.signer;
    }
    get name() {
        return this.model.name;
    }
    did() {
        return this.signer.did();
    }
    /**
     * Creates a renamed version of this space.
     *
     * @param {string} name
     */ withName(name) {
        return new OwnedSpace({
            signer: this.signer,
            name
        });
    }
    /**
     * Saves account in the agent store so it can be accessed across sessions.
     *
     * @param {object} input
     * @param {API.Agent} [input.agent]
     * @returns {Promise<API.Result<API.Unit, Error>>}
     */ async save({ agent = this.model.agent } = {}) {
        if (!agent) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$ucanto$2b$core$40$10$2e$4$2e$6$2f$node_modules$2f40$ucanto$2f$core$2f$src$2f$result$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fail"])('Please provide an agent to save the space into');
        }
        const proof = await createAuthorization(this, {
            audience: agent
        });
        await agent.importSpaceFromDelegation(proof);
        await agent.setCurrentSpace(this.did());
        return {
            ok: {}
        };
    }
    /**
     * @param {Authorization} authorization
     * @param {object} options
     * @param {API.Agent} [options.agent]
     */ provision({ proofs }, { agent = this.model.agent } = {}) {
        if (!agent) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$ucanto$2b$core$40$10$2e$4$2e$6$2f$node_modules$2f40$ucanto$2f$core$2f$src$2f$result$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fail"])('Please provide an agent to save the space into');
        }
        return provision(this, {
            proofs,
            agent
        });
    }
    /**
     * Creates a (UCAN) delegation that gives full access to the space to the
     * specified `account`. At the moment we only allow `did:mailto` principal
     * to be used as an `account`.
     *
     * @param {API.AccountDID} account
     */ async createRecovery(account) {
        return createRecovery(this, account);
    }
    /**
     * Creates (UCAN) delegation that gives specified `agent` an access to
     * specified ability (passed as `access.can` field) on the this space.
     * Optionally, you can specify `access.expiration` field to set the
     *
     * @param {API.Principal} principal
     * @param {object} [input]
     * @param {API.Access} [input.access]
     * @param {API.UCAN.UTCUnixTimestamp} [input.expiration]
     */ createAuthorization(principal, input) {
        return createAuthorization(this, {
            ...input,
            audience: principal
        });
    }
    /**
     * Derives BIP39 mnemonic that can be used to recover the space.
     *
     * @returns {string}
     */ toMnemonic() {
        return toMnemonic(this);
    }
}
const SpaceDID = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$ucanto$2b$core$40$10$2e$4$2e$6$2f$node_modules$2f40$ucanto$2f$core$2f$src$2f$schema$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Schema$3e$__["Schema"].did({
    method: 'key'
});
const fromDelegation = (delegation)=>{
    const result = SpaceDID.read(delegation.capabilities[0].with);
    if (result.error) {
        throw Object.assign(new Error(`Invalid delegation, expected capabilities[0].with to be DID, ${result.error}`), {
            cause: result.error
        });
    }
    /** @type {{name?:string}} */ const meta = delegation.facts[0]?.space ?? {};
    return new SharedSpace({
        id: result.ok,
        delegation,
        meta
    });
};
const provision = async (space, { proofs, agent })=>{
    const [capability] = proofs[0].capabilities;
    const { ok: account, error: reason } = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$web3$2d$storage$2b$access$40$20$2e$3$2e$0$2f$node_modules$2f40$web3$2d$storage$2f$access$2f$dist$2f$src$2f$provider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AccountDID"].read(capability.with);
    if (reason) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$ucanto$2b$core$40$10$2e$4$2e$6$2f$node_modules$2f40$ucanto$2f$core$2f$src$2f$result$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["error"])(reason);
    }
    return await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$web3$2d$storage$2b$access$40$20$2e$3$2e$0$2f$node_modules$2f40$web3$2d$storage$2f$access$2f$dist$2f$src$2f$provider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["add"](agent, {
        consumer: space.did(),
        account,
        proofs
    });
};
class SharedSpace {
    /**
     * @typedef {object} SharedSpaceModel
     * @property {API.SpaceDID} id
     * @property {API.Delegation} delegation
     * @property {{name?:string}} meta
     * @property {API.Agent} [agent]
     *
     * @param {SharedSpaceModel} model
     */ constructor(model){
        this.model = model;
    }
    get delegation() {
        return this.model.delegation;
    }
    get meta() {
        return this.model.meta;
    }
    get name() {
        return this.meta.name ?? '';
    }
    did() {
        return this.model.id;
    }
    /**
     * @param {string} name
     */ withName(name) {
        return new SharedSpace({
            ...this.model,
            meta: {
                ...this.meta,
                name
            }
        });
    }
}
}),
"[project]/Documents/Github/PL-Genesis/node_modules/.pnpm/@web3-storage+access@20.3.0/node_modules/@web3-storage/access/dist/src/delegations.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "canDelegateCapability",
    ()=>canDelegateCapability,
    "isExpired",
    ()=>isExpired,
    "isTooEarly",
    ()=>isTooEarly,
    "matchResource",
    ()=>matchResource,
    "validate",
    ()=>validate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$ucanto$2b$core$40$10$2e$4$2e$6$2f$node_modules$2f40$ucanto$2f$core$2f$src$2f$lib$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/Github/PL-Genesis/node_modules/.pnpm/@ucanto+core@10.4.6/node_modules/@ucanto/core/src/lib.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$ucanto$2b$core$40$10$2e$4$2e$6$2f$node_modules$2f40$ucanto$2f$core$2f$src$2f$delegation$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Delegation$3e$__ = __turbopack_context__.i("[project]/Documents/Github/PL-Genesis/node_modules/.pnpm/@ucanto+core@10.4.6/node_modules/@ucanto/core/src/delegation.js [app-route] (ecmascript) <export * as Delegation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$web3$2d$storage$2b$access$40$20$2e$3$2e$0$2f$node_modules$2f40$web3$2d$storage$2f$access$2f$dist$2f$src$2f$types$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/Github/PL-Genesis/node_modules/.pnpm/@web3-storage+access@20.3.0/node_modules/@web3-storage/access/dist/src/types.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$web3$2d$storage$2b$capabilities$40$18$2e$1$2e$0$2f$node_modules$2f40$web3$2d$storage$2f$capabilities$2f$src$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Github/PL-Genesis/node_modules/.pnpm/@web3-storage+capabilities@18.1.0/node_modules/@web3-storage/capabilities/src/utils.js [app-route] (ecmascript)");
;
;
;
function isExpired(delegation) {
    if (delegation.expiration === undefined || delegation.expiration <= Math.floor(Date.now() / 1000)) {
        return true;
    }
    return false;
}
function isTooEarly(delegation) {
    if (!delegation.notBefore) {
        return false;
    }
    return delegation.notBefore > Math.floor(Date.now() / 1000);
}
function validate(delegation, opts) {
    const { checkAudience, checkIsExpired = true, checkIsTooEarly = true } = opts ?? {};
    if (checkAudience && delegation.audience.did() !== checkAudience.did()) {
        throw new Error(`Delegation audience ${delegation.audience.did()} does not match required DID ${checkAudience.did()}`);
    }
    if (checkIsExpired && isExpired(delegation)) {
        throw new Error(`Delegation expired.`);
    }
    if (checkIsTooEarly && isTooEarly(delegation)) {
        throw new Error(`Delegation is not active yet (too early).`);
    }
}
function canDelegateCapability(delegation, capability) {
    const allowsCapabilities = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$ucanto$2b$core$40$10$2e$4$2e$6$2f$node_modules$2f40$ucanto$2f$core$2f$src$2f$delegation$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Delegation$3e$__["Delegation"].allows(delegation);
    for (const [uri, abilities] of Object.entries(allowsCapabilities)){
        if (matchResource(uri, capability.with)) {
            const cans = Object.keys(abilities);
            for (const can of cans){
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$web3$2d$storage$2b$capabilities$40$18$2e$1$2e$0$2f$node_modules$2f40$web3$2d$storage$2f$capabilities$2f$src$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["canDelegateAbility"])(can, capability.can)) {
                    return true;
                }
            }
        }
    }
    return false;
}
const matchResource = (resource, query)=>{
    if (query === 'ucan:*') {
        return true;
    } else if (typeof query === 'string') {
        return resource === query;
    } else {
        return query.test(resource);
    }
};
}),
"[project]/Documents/Github/PL-Genesis/node_modules/.pnpm/@web3-storage+access@20.3.0/node_modules/@web3-storage/access/dist/src/utils/buffers.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Convert a Uint8Array to an ArrayBuffer, taking into account
 * that we may be looking at a "data view".
 * thanks, https://stackoverflow.com/a/54646864
 *
 * If we aren't looking at a data view, simply returns the underlying ArrayBuffer
 * directly.
 *
 * @param {Uint8Array} array
 * @returns ArrayBuffer
 */ __turbopack_context__.s([
    "uint8ArrayToArrayBuffer",
    ()=>uint8ArrayToArrayBuffer
]);
function uint8ArrayToArrayBuffer(array) {
    if (array.byteOffset === 0 && array.byteLength === array.buffer.byteLength) {
        return array.buffer;
    } else {
        return array.buffer.slice(array.byteOffset, array.byteLength + array.byteOffset);
    }
}
}),
"[project]/Documents/Github/PL-Genesis/node_modules/.pnpm/@web3-storage+access@20.3.0/node_modules/@web3-storage/access/dist/src/agent-data.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AgentData",
    ()=>AgentData,
    "getSessionProofs",
    ()=>getSessionProofs,
    "isSessionProof",
    ()=>isSessionProof
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$ucanto$2b$principal$40$9$2e$0$2e$3$2f$node_modules$2f40$ucanto$2f$principal$2f$src$2f$lib$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/Github/PL-Genesis/node_modules/.pnpm/@ucanto+principal@9.0.3/node_modules/@ucanto/principal/src/lib.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$ucanto$2b$principal$40$9$2e$0$2e$3$2f$node_modules$2f40$ucanto$2f$principal$2f$src$2f$ed25519$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/Github/PL-Genesis/node_modules/.pnpm/@ucanto+principal@9.0.3/node_modules/@ucanto/principal/src/ed25519.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$ucanto$2b$principal$40$9$2e$0$2e$3$2f$node_modules$2f40$ucanto$2f$principal$2f$src$2f$ed25519$2f$signer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Signer$3e$__ = __turbopack_context__.i("[project]/Documents/Github/PL-Genesis/node_modules/.pnpm/@ucanto+principal@9.0.3/node_modules/@ucanto/principal/src/ed25519/signer.js [app-route] (ecmascript) <export * as Signer>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$ucanto$2b$core$40$10$2e$4$2e$6$2f$node_modules$2f40$ucanto$2f$core$2f$src$2f$delegation$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Github/PL-Genesis/node_modules/.pnpm/@ucanto+core@10.4.6/node_modules/@ucanto/core/src/delegation.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f$multiformats$40$13$2e$4$2e$2$2f$node_modules$2f$multiformats$2f$dist$2f$src$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/Github/PL-Genesis/node_modules/.pnpm/multiformats@13.4.2/node_modules/multiformats/dist/src/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f$multiformats$40$13$2e$4$2e$2$2f$node_modules$2f$multiformats$2f$dist$2f$src$2f$cid$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/Github/PL-Genesis/node_modules/.pnpm/multiformats@13.4.2/node_modules/multiformats/dist/src/cid.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$web3$2d$storage$2b$capabilities$40$18$2e$1$2e$0$2f$node_modules$2f40$web3$2d$storage$2f$capabilities$2f$src$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/Github/PL-Genesis/node_modules/.pnpm/@web3-storage+capabilities@18.1.0/node_modules/@web3-storage/capabilities/src/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$web3$2d$storage$2b$capabilities$40$18$2e$1$2e$0$2f$node_modules$2f40$web3$2d$storage$2f$capabilities$2f$src$2f$ucan$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__UCAN$3e$__ = __turbopack_context__.i("[project]/Documents/Github/PL-Genesis/node_modules/.pnpm/@web3-storage+capabilities@18.1.0/node_modules/@web3-storage/capabilities/src/ucan.js [app-route] (ecmascript) <export * as UCAN>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$web3$2d$storage$2b$access$40$20$2e$3$2e$0$2f$node_modules$2f40$web3$2d$storage$2f$access$2f$dist$2f$src$2f$delegations$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Github/PL-Genesis/node_modules/.pnpm/@web3-storage+access@20.3.0/node_modules/@web3-storage/access/dist/src/delegations.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$web3$2d$storage$2b$access$40$20$2e$3$2e$0$2f$node_modules$2f40$web3$2d$storage$2f$access$2f$dist$2f$src$2f$utils$2f$buffers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Github/PL-Genesis/node_modules/.pnpm/@web3-storage+access@20.3.0/node_modules/@web3-storage/access/dist/src/utils/buffers.js [app-route] (ecmascript)");
;
;
;
;
;
;
;
;
class AgentData {
    /** @type {(data: import('./types.js').AgentDataExport) => Promise<void> | void} */ #save;
    /**
     * @param {import('./types.js').AgentDataModel} data
     * @param {import('./types.js').AgentDataOptions} [options]
     */ constructor(data, options = {}){
        this.meta = data.meta;
        this.principal = data.principal;
        this.spaces = data.spaces;
        this.delegations = data.delegations;
        this.currentSpace = data.currentSpace;
        this.#save = (data)=>options.store ? options.store.save(data) : undefined;
    }
    /**
     * Create a new AgentData instance from the passed initialization data.
     *
     * @param {Partial<import('./types.js').AgentDataModel>} [init]
     * @param {import('./types.js').AgentDataOptions} [options]
     */ static async create(init = {}, options = {}) {
        const agentData = new AgentData({
            meta: {
                name: 'agent',
                type: 'device',
                ...init.meta
            },
            principal: init.principal ?? await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$ucanto$2b$principal$40$9$2e$0$2e$3$2f$node_modules$2f40$ucanto$2f$principal$2f$src$2f$ed25519$2f$signer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Signer$3e$__["Signer"].generate(),
            spaces: init.spaces ?? new Map(),
            delegations: init.delegations ?? new Map(),
            currentSpace: init.currentSpace
        }, options);
        if (options.store) {
            await options.store.save(agentData.export());
        }
        return agentData;
    }
    /**
     * Instantiate AgentData from previously exported data.
     *
     * @param {import('./types.js').AgentDataExport} raw
     * @param {import('./types.js').AgentDataOptions} [options]
     */ static fromExport(raw, options) {
        /** @type {import('./types.js').AgentDataModel['delegations']} */ const dels = new Map();
        for (const [key, value] of raw.delegations){
            dels.set(key, {
                delegation: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$ucanto$2b$core$40$10$2e$4$2e$6$2f$node_modules$2f40$ucanto$2f$core$2f$src$2f$delegation$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["importDAG"])(value.delegation.map((d)=>({
                        cid: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f$multiformats$40$13$2e$4$2e$2$2f$node_modules$2f$multiformats$2f$dist$2f$src$2f$cid$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["CID"].parse(d.cid).toV1(),
                        bytes: d.bytes instanceof Uint8Array ? d.bytes : new Uint8Array(d.bytes)
                    }))),
                meta: value.meta
            });
        }
        return new AgentData({
            meta: raw.meta,
            // @ts-expect-error for some reason TS thinks this is a EdSigner
            principal: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$ucanto$2b$principal$40$9$2e$0$2e$3$2f$node_modules$2f40$ucanto$2f$principal$2f$src$2f$lib$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Signer"].from(raw.principal),
            currentSpace: raw.currentSpace,
            spaces: raw.spaces,
            delegations: dels
        }, options);
    }
    /**
     * Export data in a format safe to pass to `structuredClone()`.
     */ export() {
        /** @type {import('./types.js').AgentDataExport} */ const raw = {
            meta: this.meta,
            principal: this.principal.toArchive(),
            currentSpace: this.currentSpace,
            spaces: this.spaces,
            delegations: new Map()
        };
        for (const [key, value] of this.delegations){
            raw.delegations.set(key, {
                meta: value.meta,
                delegation: [
                    ...value.delegation.export()
                ].map((b)=>({
                        cid: b.cid.toString(),
                        bytes: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$web3$2d$storage$2b$access$40$20$2e$3$2e$0$2f$node_modules$2f40$web3$2d$storage$2f$access$2f$dist$2f$src$2f$utils$2f$buffers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["uint8ArrayToArrayBuffer"])(b.bytes)
                    }))
            });
        }
        return raw;
    }
    /**
     * @param {import('@ucanto/interface').DID} did
     * @param {import('./types.js').SpaceMeta} meta
     * @param {import('@ucanto/interface').Delegation} [proof]
     */ async addSpace(did, meta, proof) {
        this.spaces.set(did, meta);
        await (proof ? this.addDelegation(proof) : this.#save(this.export()));
    }
    /**
     * @deprecated
     * @param {import('@ucanto/interface').DID<'key'>} did
     */ async setCurrentSpace(did) {
        this.currentSpace = did;
        await this.#save(this.export());
    }
    /**
     * @param {import('@ucanto/interface').Delegation} delegation
     * @param {import('./types.js').DelegationMeta} [meta]
     */ async addDelegation(delegation, meta) {
        this.delegations.set(delegation.cid.toString(), {
            delegation,
            meta: meta ?? {}
        });
        await this.#save(this.export());
    }
    /**
     * @param {import('@ucanto/interface').UCANLink} cid
     */ async removeDelegation(cid) {
        this.delegations.delete(cid.toString());
        await this.#save(this.export());
    }
}
/**
 * Is the given capability a session attestation?
 *
 * @param {Ucanto.Capability} cap
 * @returns {boolean}
 */ const isSessionCapability = (cap)=>cap.can === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$web3$2d$storage$2b$capabilities$40$18$2e$1$2e$0$2f$node_modules$2f40$web3$2d$storage$2f$capabilities$2f$src$2f$ucan$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__UCAN$3e$__["UCAN"].attest.can;
const isSessionProof = (delegation)=>delegation.capabilities.some((cap)=>isSessionCapability(cap));
function getSessionProofs(data) {
    /** @type {SessionProofIndexedByAuthorizationAndIssuer} */ const proofs = {};
    for (const { delegation } of data.delegations.values()){
        if (isSessionProof(delegation)) {
            const cap = delegation.capabilities[0];
            if (cap && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$web3$2d$storage$2b$access$40$20$2e$3$2e$0$2f$node_modules$2f40$web3$2d$storage$2f$access$2f$dist$2f$src$2f$delegations$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isExpired"])(delegation)) {
                const proof = cap.nb.proof;
                if (proof) {
                    const proofCid = proof.toString();
                    const issuerDid = delegation.issuer.did();
                    proofs[proofCid] = proofs[proofCid] ?? {};
                    proofs[proofCid][issuerDid] = proofs[proofCid][issuerDid] ?? [];
                    proofs[proofCid][issuerDid].push(delegation);
                }
            }
        }
    }
    return proofs;
}
}),
"[project]/Documents/Github/PL-Genesis/node_modules/.pnpm/@web3-storage+access@20.3.0/node_modules/@web3-storage/access/dist/src/agent-use-cases.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addProvider",
    ()=>addProvider,
    "addProviderAndDelegateToAccount",
    ()=>addProviderAndDelegateToAccount,
    "authorizeAndWait",
    ()=>authorizeAndWait,
    "authorizeWaitAndClaim",
    ()=>authorizeWaitAndClaim,
    "claimAccess",
    ()=>claimAccess,
    "delegationsIncludeSessionProof",
    ()=>delegationsIncludeSessionProof,
    "getAccountPlan",
    ()=>getAccountPlan,
    "pollAccessClaimUntil",
    ()=>pollAccessClaimUntil,
    "requestAccess",
    ()=>requestAccess,
    "waitForAuthorizationByPolling",
    ()=>waitForAuthorizationByPolling
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$web3$2d$storage$2b$access$40$20$2e$3$2e$0$2f$node_modules$2f40$web3$2d$storage$2f$access$2f$dist$2f$src$2f$agent$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/Github/PL-Genesis/node_modules/.pnpm/@web3-storage+access@20.3.0/node_modules/@web3-storage/access/dist/src/agent.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$web3$2d$storage$2b$capabilities$40$18$2e$1$2e$0$2f$node_modules$2f40$web3$2d$storage$2f$capabilities$2f$src$2f$access$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/Github/PL-Genesis/node_modules/.pnpm/@web3-storage+capabilities@18.1.0/node_modules/@web3-storage/capabilities/src/access.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$web3$2d$storage$2b$access$40$20$2e$3$2e$0$2f$node_modules$2f40$web3$2d$storage$2f$access$2f$dist$2f$src$2f$encoding$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Github/PL-Genesis/node_modules/.pnpm/@web3-storage+access@20.3.0/node_modules/@web3-storage/access/dist/src/encoding.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$web3$2d$storage$2b$capabilities$40$18$2e$1$2e$0$2f$node_modules$2f40$web3$2d$storage$2f$capabilities$2f$src$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/Github/PL-Genesis/node_modules/.pnpm/@web3-storage+capabilities@18.1.0/node_modules/@web3-storage/capabilities/src/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$web3$2d$storage$2b$capabilities$40$18$2e$1$2e$0$2f$node_modules$2f40$web3$2d$storage$2f$capabilities$2f$src$2f$provider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Provider$3e$__ = __turbopack_context__.i("[project]/Documents/Github/PL-Genesis/node_modules/.pnpm/@web3-storage+capabilities@18.1.0/node_modules/@web3-storage/capabilities/src/provider.js [app-route] (ecmascript) <export * as Provider>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$web3$2d$storage$2b$capabilities$40$18$2e$1$2e$0$2f$node_modules$2f40$web3$2d$storage$2f$capabilities$2f$src$2f$plan$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Plan$3e$__ = __turbopack_context__.i("[project]/Documents/Github/PL-Genesis/node_modules/.pnpm/@web3-storage+capabilities@18.1.0/node_modules/@web3-storage/capabilities/src/plan.js [app-route] (ecmascript) <export * as Plan>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$web3$2d$storage$2b$capabilities$40$18$2e$1$2e$0$2f$node_modules$2f40$web3$2d$storage$2f$capabilities$2f$src$2f$access$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Access$3e$__ = __turbopack_context__.i("[project]/Documents/Github/PL-Genesis/node_modules/.pnpm/@web3-storage+capabilities@18.1.0/node_modules/@web3-storage/capabilities/src/access.js [app-route] (ecmascript) <export * as Access>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$ucanto$2b$core$40$10$2e$4$2e$6$2f$node_modules$2f40$ucanto$2f$core$2f$src$2f$lib$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/Github/PL-Genesis/node_modules/.pnpm/@ucanto+core@10.4.6/node_modules/@ucanto/core/src/lib.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$ucanto$2b$core$40$10$2e$4$2e$6$2f$node_modules$2f40$ucanto$2f$core$2f$src$2f$schema$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Schema$3e$__ = __turbopack_context__.i("[project]/Documents/Github/PL-Genesis/node_modules/.pnpm/@ucanto+core@10.4.6/node_modules/@ucanto/core/src/schema.js [app-route] (ecmascript) <export * as Schema>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$ucanto$2b$core$40$10$2e$4$2e$6$2f$node_modules$2f40$ucanto$2f$core$2f$src$2f$delegation$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Github/PL-Genesis/node_modules/.pnpm/@ucanto+core@10.4.6/node_modules/@ucanto/core/src/delegation.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$web3$2d$storage$2b$access$40$20$2e$3$2e$0$2f$node_modules$2f40$web3$2d$storage$2f$access$2f$dist$2f$src$2f$agent$2d$data$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Github/PL-Genesis/node_modules/.pnpm/@web3-storage+access@20.3.0/node_modules/@web3-storage/access/dist/src/agent-data.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$web3$2d$storage$2b$did$2d$mailto$40$2$2e$1$2e$0$2f$node_modules$2f40$web3$2d$storage$2f$did$2d$mailto$2f$dist$2f$src$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/Github/PL-Genesis/node_modules/.pnpm/@web3-storage+did-mailto@2.1.0/node_modules/@web3-storage/did-mailto/dist/src/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$web3$2d$storage$2b$access$40$20$2e$3$2e$0$2f$node_modules$2f40$web3$2d$storage$2f$access$2f$dist$2f$src$2f$types$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/Github/PL-Genesis/node_modules/.pnpm/@web3-storage+access@20.3.0/node_modules/@web3-storage/access/dist/src/types.js [app-route] (ecmascript) <locals>");
;
;
;
;
;
;
;
;
;
const DIDWeb = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$ucanto$2b$core$40$10$2e$4$2e$6$2f$node_modules$2f40$ucanto$2f$core$2f$src$2f$schema$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Schema$3e$__["Schema"].DID.match({
    method: 'web'
});
async function requestAccess(access, account, capabilities) {
    const res = await access.invokeAndExecute(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$web3$2d$storage$2b$capabilities$40$18$2e$1$2e$0$2f$node_modules$2f40$web3$2d$storage$2f$capabilities$2f$src$2f$access$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["authorize"], {
        audience: access.connection.id,
        with: access.issuer.did(),
        nb: {
            iss: account.did(),
            att: [
                ...capabilities
            ]
        }
    });
    if (res?.out.error) {
        throw res.out.error;
    }
}
async function claimAccess(access, audienceOfClaimedDelegations = access.connection.id.did(), { addProofs = false, nonce } = {}) {
    const res = await access.invokeAndExecute(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$web3$2d$storage$2b$capabilities$40$18$2e$1$2e$0$2f$node_modules$2f40$web3$2d$storage$2f$capabilities$2f$src$2f$access$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["claim"], {
        audience: access.connection.id,
        with: audienceOfClaimedDelegations,
        nonce
    });
    if (res.out.error) {
        throw res.out.error;
    }
    const delegations = Object.values(res.out.ok.delegations).flatMap((bytes)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$web3$2d$storage$2b$access$40$20$2e$3$2e$0$2f$node_modules$2f40$web3$2d$storage$2f$access$2f$dist$2f$src$2f$encoding$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["bytesToDelegations"])(bytes));
    if (addProofs) {
        for (const d of delegations){
            await access.addProof(d);
        }
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$web3$2d$storage$2b$access$40$20$2e$3$2e$0$2f$node_modules$2f40$web3$2d$storage$2f$access$2f$dist$2f$src$2f$agent$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["addSpacesFromDelegations"])(access, delegations);
    }
    return delegations;
}
async function addProvider({ access, space, account, provider }) {
    const result = await access.invokeAndExecute(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$web3$2d$storage$2b$capabilities$40$18$2e$1$2e$0$2f$node_modules$2f40$web3$2d$storage$2f$capabilities$2f$src$2f$provider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Provider$3e$__["Provider"].add, {
        audience: access.connection.id,
        with: account.did(),
        nb: {
            provider,
            consumer: space
        }
    });
    if (result.out.error) {
        throw result.out.error;
    }
}
function delegationsIncludeSessionProof(delegations) {
    return delegations.some((d)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$web3$2d$storage$2b$access$40$20$2e$3$2e$0$2f$node_modules$2f40$web3$2d$storage$2f$access$2f$dist$2f$src$2f$agent$2d$data$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isSessionProof"])(d));
}
async function pollAccessClaimUntil(delegationsMatch, access, delegee, opts) {
    const interval = opts?.interval || 250;
    // eslint-disable-next-line no-constant-condition
    while(true){
        if (opts?.signal?.aborted) throw opts.signal.reason ?? new Error('operation aborted');
        const res = await access.invokeAndExecute(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$web3$2d$storage$2b$capabilities$40$18$2e$1$2e$0$2f$node_modules$2f40$web3$2d$storage$2f$capabilities$2f$src$2f$access$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Access$3e$__["Access"].claim, {
            with: delegee
        });
        if (res.out.error) throw res.out.error;
        const claims = Object.values(res.out.ok.delegations).flatMap((d)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$web3$2d$storage$2b$access$40$20$2e$3$2e$0$2f$node_modules$2f40$web3$2d$storage$2f$access$2f$dist$2f$src$2f$encoding$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["bytesToDelegations"])(d));
        if (delegationsMatch(claims)) return claims;
        await new Promise((resolve)=>setTimeout(resolve, interval));
    }
}
async function waitForAuthorizationByPolling(access, opts = {}) {
    const claimed = await pollAccessClaimUntil(delegationsIncludeSessionProof, access, access.issuer.did(), {
        signal: opts?.signal,
        interval: opts?.interval
    });
    return [
        ...claimed
    ];
}
async function authorizeAndWait(access, email, opts = {}) {
    const expectAuthorization = opts.expectAuthorization || waitForAuthorizationByPolling;
    const account = {
        did: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$web3$2d$storage$2b$did$2d$mailto$40$2$2e$1$2e$0$2f$node_modules$2f40$web3$2d$storage$2f$did$2d$mailto$2f$dist$2f$src$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["fromEmail"](email)
    };
    await requestAccess(access, account, opts?.capabilities || [
        {
            can: 'space/*'
        },
        {
            can: 'store/*'
        },
        {
            can: 'provider/add'
        },
        {
            can: 'subscription/list'
        },
        {
            can: 'upload/*'
        },
        {
            can: 'ucan/*'
        },
        {
            can: 'plan/*'
        },
        {
            can: 'usage/*'
        },
        {
            can: 'w3up/*'
        }
    ]);
    const sessionDelegations = [
        ...await expectAuthorization(access, opts)
    ];
    if (!opts?.dontAddProofs) {
        await Promise.all(sessionDelegations.map(async (d)=>access.addProof(d)));
    }
}
async function authorizeWaitAndClaim(accessAgent, email, opts) {
    await authorizeAndWait(accessAgent, email, opts);
    await claimAccess(accessAgent, accessAgent.issuer.did(), {
        addProofs: opts?.addProofs ?? true
    });
}
async function addProviderAndDelegateToAccount(access, agentData, email, opts) {
    const space = opts?.space || access.currentSpace();
    const spaceMeta = space ? agentData.spaces.get(space) : undefined;
    const provider = opts?.provider || (()=>{
        const service = access.connection.id.did();
        if (DIDWeb.is(service)) {
            // connection.id did is a valid provider value. Try using that.
            return service;
        }
        throw new Error(`unable to determine provider to use to addProviderAndDelegateToAccount using access.connection.id did ${service}. expected a did:web:`);
    })();
    if (!space || !spaceMeta) {
        throw new Error('No space selected');
    }
    if (spaceMeta) {
        throw new Error('Space already registered with web3.storage.');
    }
    const account = {
        did: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$web3$2d$storage$2b$did$2d$mailto$40$2$2e$1$2e$0$2f$node_modules$2f40$web3$2d$storage$2f$did$2d$mailto$2f$dist$2f$src$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["fromEmail"](__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$web3$2d$storage$2b$did$2d$mailto$40$2$2e$1$2e$0$2f$node_modules$2f40$web3$2d$storage$2f$did$2d$mailto$2f$dist$2f$src$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["email"](email))
    };
    await addProvider({
        access,
        space,
        account,
        provider
    });
    const delegateSpaceAccessResult = await delegateSpaceAccessToAccount(access, space, account);
    if (delegateSpaceAccessResult.out.error) {
        throw delegateSpaceAccessResult.out.error;
    }
    await agentData.addSpace(space, spaceMeta);
}
/**
 * @param {AccessAgent} access
 * @param {API.SpaceDID} space
 * @param {API.Principal<API.AccountDID>} account
 */ async function delegateSpaceAccessToAccount(access, space, account) {
    const issuerSaysAccountCanAdminSpace = await createIssuerSaysAccountCanAdminSpace(access.issuer, space, account, undefined, access.proofs([
        {
            with: space,
            can: '*'
        }
    ]), // we want to sign over control of this space forever
    Infinity);
    return access.invokeAndExecute(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$web3$2d$storage$2b$capabilities$40$18$2e$1$2e$0$2f$node_modules$2f40$web3$2d$storage$2f$capabilities$2f$src$2f$access$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["delegate"], {
        audience: access.connection.id,
        with: space,
        expiration: Infinity,
        nb: {
            delegations: {
                [issuerSaysAccountCanAdminSpace.cid.toString()]: issuerSaysAccountCanAdminSpace.cid
            }
        },
        proofs: [
            // must be embedded here because it's referenced by cid in .nb.delegations
            issuerSaysAccountCanAdminSpace
        ]
    });
}
/**
 * @param {API.Signer<API.DIDKey>} issuer
 * @param {API.SpaceDID} space
 * @param {API.Principal<API.AccountDID>} account
 * @param {API.Capabilities} capabilities
 * @param {API.Delegation[]} proofs
 * @param {number} expiration
 * @returns
 */ async function createIssuerSaysAccountCanAdminSpace(issuer, space, account, capabilities = [
    {
        can: '*',
        with: space
    }
], proofs = [], expiration) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$ucanto$2b$core$40$10$2e$4$2e$6$2f$node_modules$2f40$ucanto$2f$core$2f$src$2f$delegation$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["delegate"])({
        issuer,
        audience: account,
        capabilities,
        proofs,
        expiration
    });
}
async function getAccountPlan(agent, account) {
    const receipt = await agent.invokeAndExecute(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$web3$2d$storage$2b$capabilities$40$18$2e$1$2e$0$2f$node_modules$2f40$web3$2d$storage$2f$capabilities$2f$src$2f$plan$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Plan$3e$__["Plan"].get, {
        with: account
    });
    return receipt.out;
}
}),
"[project]/Documents/Github/PL-Genesis/node_modules/.pnpm/@web3-storage+access@20.3.0/node_modules/@web3-storage/access/dist/src/agent.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Agent",
    ()=>Agent,
    "addSpacesFromDelegations",
    ()=>addSpacesFromDelegations,
    "connection",
    ()=>connection,
    "importAuthorization",
    ()=>importAuthorization
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$ucanto$2b$client$40$9$2e$0$2e$2$2f$node_modules$2f40$ucanto$2f$client$2f$src$2f$lib$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/Github/PL-Genesis/node_modules/.pnpm/@ucanto+client@9.0.2/node_modules/@ucanto/client/src/lib.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$ucanto$2b$client$40$9$2e$0$2e$2$2f$node_modules$2f40$ucanto$2f$client$2f$src$2f$connection$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Github/PL-Genesis/node_modules/.pnpm/@ucanto+client@9.0.2/node_modules/@ucanto/client/src/connection.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$ucanto$2b$transport$40$9$2e$2$2e$1$2f$node_modules$2f40$ucanto$2f$transport$2f$src$2f$car$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/Github/PL-Genesis/node_modules/.pnpm/@ucanto+transport@9.2.1/node_modules/@ucanto/transport/src/car.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$ucanto$2b$transport$40$9$2e$2$2e$1$2f$node_modules$2f40$ucanto$2f$transport$2f$src$2f$http$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Github/PL-Genesis/node_modules/.pnpm/@ucanto+transport@9.2.1/node_modules/@ucanto/transport/src/http.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$ucanto$2b$core$40$10$2e$4$2e$6$2f$node_modules$2f40$ucanto$2f$core$2f$src$2f$lib$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/Github/PL-Genesis/node_modules/.pnpm/@ucanto+core@10.4.6/node_modules/@ucanto/core/src/lib.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$ucanto$2b$core$40$10$2e$4$2e$6$2f$node_modules$2f40$ucanto$2f$core$2f$src$2f$delegation$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Delegation$3e$__ = __turbopack_context__.i("[project]/Documents/Github/PL-Genesis/node_modules/.pnpm/@ucanto+core@10.4.6/node_modules/@ucanto/core/src/delegation.js [app-route] (ecmascript) <export * as Delegation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$web3$2d$storage$2b$capabilities$40$18$2e$1$2e$0$2f$node_modules$2f40$web3$2d$storage$2f$capabilities$2f$src$2f$space$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/Github/PL-Genesis/node_modules/.pnpm/@web3-storage+capabilities@18.1.0/node_modules/@web3-storage/capabilities/src/space.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$web3$2d$storage$2b$capabilities$40$18$2e$1$2e$0$2f$node_modules$2f40$web3$2d$storage$2f$capabilities$2f$src$2f$ucan$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Github/PL-Genesis/node_modules/.pnpm/@web3-storage+capabilities@18.1.0/node_modules/@web3-storage/capabilities/src/ucan.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$web3$2d$storage$2b$access$40$20$2e$3$2e$0$2f$node_modules$2f40$web3$2d$storage$2f$access$2f$dist$2f$src$2f$access$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Github/PL-Genesis/node_modules/.pnpm/@web3-storage+access@20.3.0/node_modules/@web3-storage/access/dist/src/access.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$web3$2d$storage$2b$access$40$20$2e$3$2e$0$2f$node_modules$2f40$web3$2d$storage$2f$access$2f$dist$2f$src$2f$space$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Github/PL-Genesis/node_modules/.pnpm/@web3-storage+access@20.3.0/node_modules/@web3-storage/access/dist/src/space.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$ucanto$2b$core$40$10$2e$4$2e$6$2f$node_modules$2f40$ucanto$2f$core$2f$src$2f$invocation$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Github/PL-Genesis/node_modules/.pnpm/@ucanto+core@10.4.6/node_modules/@ucanto/core/src/invocation.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$ucanto$2b$core$40$10$2e$4$2e$6$2f$node_modules$2f40$ucanto$2f$core$2f$src$2f$delegation$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Github/PL-Genesis/node_modules/.pnpm/@ucanto+core@10.4.6/node_modules/@ucanto/core/src/delegation.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$ipld$2b$dag$2d$ucan$40$3$2e$4$2e$5$2f$node_modules$2f40$ipld$2f$dag$2d$ucan$2f$src$2f$did$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__DID$3e$__ = __turbopack_context__.i("[project]/Documents/Github/PL-Genesis/node_modules/.pnpm/@ipld+dag-ucan@3.4.5/node_modules/@ipld/dag-ucan/src/did.js [app-route] (ecmascript) <export * as DID>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$ucanto$2b$core$40$10$2e$4$2e$6$2f$node_modules$2f40$ucanto$2f$core$2f$src$2f$schema$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Schema$3e$__ = __turbopack_context__.i("[project]/Documents/Github/PL-Genesis/node_modules/.pnpm/@ucanto+core@10.4.6/node_modules/@ucanto/core/src/schema.js [app-route] (ecmascript) <export * as Schema>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$web3$2d$storage$2b$access$40$20$2e$3$2e$0$2f$node_modules$2f40$web3$2d$storage$2f$access$2f$dist$2f$src$2f$delegations$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Github/PL-Genesis/node_modules/.pnpm/@web3-storage+access@20.3.0/node_modules/@web3-storage/access/dist/src/delegations.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$web3$2d$storage$2b$access$40$20$2e$3$2e$0$2f$node_modules$2f40$web3$2d$storage$2f$access$2f$dist$2f$src$2f$agent$2d$data$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Github/PL-Genesis/node_modules/.pnpm/@web3-storage+access@20.3.0/node_modules/@web3-storage/access/dist/src/agent-data.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$web3$2d$storage$2b$capabilities$40$18$2e$1$2e$0$2f$node_modules$2f40$web3$2d$storage$2f$capabilities$2f$src$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/Github/PL-Genesis/node_modules/.pnpm/@web3-storage+capabilities@18.1.0/node_modules/@web3-storage/capabilities/src/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$web3$2d$storage$2b$capabilities$40$18$2e$1$2e$0$2f$node_modules$2f40$web3$2d$storage$2f$capabilities$2f$src$2f$ucan$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__UCAN$3e$__ = __turbopack_context__.i("[project]/Documents/Github/PL-Genesis/node_modules/.pnpm/@web3-storage+capabilities@18.1.0/node_modules/@web3-storage/capabilities/src/ucan.js [app-route] (ecmascript) <export * as UCAN>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$web3$2d$storage$2b$access$40$20$2e$3$2e$0$2f$node_modules$2f40$web3$2d$storage$2f$access$2f$dist$2f$src$2f$types$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/Github/PL-Genesis/node_modules/.pnpm/@web3-storage+access@20.3.0/node_modules/@web3-storage/access/dist/src/types.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$web3$2d$storage$2b$access$40$20$2e$3$2e$0$2f$node_modules$2f40$web3$2d$storage$2f$access$2f$dist$2f$src$2f$agent$2d$use$2d$cases$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Github/PL-Genesis/node_modules/.pnpm/@web3-storage+access@20.3.0/node_modules/@web3-storage/access/dist/src/agent-use-cases.js [app-route] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
const HOST = 'https://up.web3.storage';
const PRINCIPAL = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$ipld$2b$dag$2d$ucan$40$3$2e$4$2e$5$2f$node_modules$2f40$ipld$2f$dag$2d$ucan$2f$src$2f$did$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__DID$3e$__["DID"].parse('did:web:web3.storage');
/**
 * Keeps track of AgentData for all Agents constructed.
 * Used by addSpacesFromDelegations - so it can only accept Agent as param, but
 * still mutate corresponding AgentData
 *
 * @deprecated - remove this when deprecated addSpacesFromDelegations is removed
 */ /** @type {WeakMap<Agent<Record<string, any>>, AgentData>} */ const agentToData = new WeakMap();
function connection(options = {}) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$ucanto$2b$client$40$9$2e$0$2e$2$2f$node_modules$2f40$ucanto$2f$client$2f$src$2f$connection$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["connect"]({
        id: options.principal ?? PRINCIPAL,
        codec: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$ucanto$2b$transport$40$9$2e$2$2e$1$2f$node_modules$2f40$ucanto$2f$transport$2f$src$2f$car$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["outbound"],
        channel: options.channel ?? __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$ucanto$2b$transport$40$9$2e$2$2e$1$2f$node_modules$2f40$ucanto$2f$transport$2f$src$2f$http$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["open"]({
            url: options.url ?? new URL(HOST),
            method: 'POST',
            fetch: options.fetch ?? globalThis.fetch.bind(globalThis)
        })
    });
}
class Agent {
    /** @type {import('./agent-data.js').AgentData} */ #data;
    /**
     * @param {import('./agent-data.js').AgentData} data - Agent data
     * @param {import('./types.js').AgentOptions<S>} [options]
     */ constructor(data, options = {}){
        /** @type { Client.Channel<S> & { url?: URL } | undefined } */ const channel = options.connection?.channel;
        this.url = options.url ?? channel?.url ?? new URL(HOST);
        this.connection = options.connection ?? connection({
            principal: options.servicePrincipal,
            url: this.url
        });
        this.#data = data;
        agentToData.set(this, this.#data);
    }
    /**
     * Create a new Agent instance, optionally with the passed initialization data.
     *
     * @template {Record<string, any>} [R=Service]
     * @param {Partial<import('./types.js').AgentDataModel>} [init]
     * @param {import('./types.js').AgentOptions<R> & import('./types.js').AgentDataOptions} [options]
     */ static async create(init, options = {}) {
        const data = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$web3$2d$storage$2b$access$40$20$2e$3$2e$0$2f$node_modules$2f40$web3$2d$storage$2f$access$2f$dist$2f$src$2f$agent$2d$data$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AgentData"].create(init, options);
        return new Agent(data, options);
    }
    /**
     * Instantiate an Agent from pre-exported agent data.
     *
     * @template {Record<string, any>} [R=Service]
     * @param {import('./types.js').AgentDataExport} raw
     * @param {import('./types.js').AgentOptions<R> & import('./types.js').AgentDataOptions} [options]
     */ static from(raw, options = {}) {
        const data = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$web3$2d$storage$2b$access$40$20$2e$3$2e$0$2f$node_modules$2f40$web3$2d$storage$2f$access$2f$dist$2f$src$2f$agent$2d$data$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AgentData"].fromExport(raw, options);
        return new Agent(data, options);
    }
    get issuer() {
        return this.#data.principal;
    }
    get meta() {
        return this.#data.meta;
    }
    get spaces() {
        return this.#data.spaces;
    }
    did() {
        return this.#data.principal.did();
    }
    /**
     * Add a proof to the agent store.
     *
     * @param {API.Delegation} delegation
     */ async addProof(delegation) {
        return await this.addProofs([
            delegation
        ]);
    }
    /**
     * Adds set of proofs to the agent store.
     *
     * @param {Iterable<API.Delegation>} delegations
     */ async addProofs(delegations) {
        for (const proof of delegations){
            await this.#data.addDelegation(proof, {
                audience: this.meta
            });
        }
        await this.removeExpiredDelegations();
        return {};
    }
    /**
     * Query the delegations store for all the delegations matching the capabilities provided.
     *
     * @param {API.CapabilityQuery[]} [caps]
     */ #delegations(caps) {
        const _caps = new Set(caps);
        /** @type {Array<{ delegation: API.Delegation, meta: API.DelegationMeta }>} */ const values = [];
        for (const [, value] of this.#data.delegations){
            // check expiration
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$web3$2d$storage$2b$access$40$20$2e$3$2e$0$2f$node_modules$2f40$web3$2d$storage$2f$access$2f$dist$2f$src$2f$delegations$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isExpired"])(value.delegation) && // check if delegation can be used
            !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$web3$2d$storage$2b$access$40$20$2e$3$2e$0$2f$node_modules$2f40$web3$2d$storage$2f$access$2f$dist$2f$src$2f$delegations$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isTooEarly"])(value.delegation)) {
                // check if we need to filter for caps
                if (Array.isArray(caps) && caps.length > 0) {
                    for (const cap of _caps){
                        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$web3$2d$storage$2b$access$40$20$2e$3$2e$0$2f$node_modules$2f40$web3$2d$storage$2f$access$2f$dist$2f$src$2f$delegations$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["canDelegateCapability"])(value.delegation, cap)) {
                            values.push(value);
                        }
                    }
                } else {
                    values.push(value);
                }
            }
        }
        return values;
    }
    /**
     * Clean up any expired delegations.
     */ async removeExpiredDelegations() {
        for (const [, value] of this.#data.delegations){
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$web3$2d$storage$2b$access$40$20$2e$3$2e$0$2f$node_modules$2f40$web3$2d$storage$2f$access$2f$dist$2f$src$2f$delegations$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isExpired"])(value.delegation)) {
                await this.#data.removeDelegation(value.delegation.cid);
            }
        }
    }
    /**
     * Revoke a delegation by CID.
     *
     * If the delegation was issued by this agent (and therefore is stored in the
     * delegation store) you can just pass the CID. If not, or if the current agent's
     * delegation store no longer contains the delegation, you MUST pass a chain of
     * proofs that proves your authority to revoke this delegation as `options.proofs`.
     *
     * @param {API.UCANLink} delegationCID
     * @param {object} [options]
     * @param {API.Delegation[]} [options.proofs]
     */ async revoke(delegationCID, options = {}) {
        const additionalProofs = options.proofs ?? [];
        // look for the identified delegation in the delegation store and the passed proofs
        const delegation = [
            ...this.delegations(),
            ...additionalProofs
        ].find((delegation)=>delegation.cid.equals(delegationCID));
        if (!delegation) {
            return {
                error: new Error(`could not find delegation ${delegationCID.toString()} - please include the delegation in options.proofs`)
            };
        }
        const receipt = await this.invokeAndExecute(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$web3$2d$storage$2b$capabilities$40$18$2e$1$2e$0$2f$node_modules$2f40$web3$2d$storage$2f$capabilities$2f$src$2f$ucan$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__UCAN$3e$__["UCAN"].revoke, {
            // per https://github.com/storacha/w3up/blob/main/packages/capabilities/src/ucan.js#L38C6-L38C6 the resource here should be
            // the current issuer - using the space DID here works for simple cases but falls apart when a delegee tries to revoke a delegation
            // they have re-delegated, since they don't have "ucan/revoke" capabilities on the space
            with: this.issuer.did(),
            nb: {
                ucan: delegation.cid
            },
            proofs: [
                delegation,
                ...additionalProofs
            ]
        });
        return receipt.out;
    }
    /**
     * Get all the proofs matching the capabilities.
     *
     * Proofs are delegations with an audience matching agent DID, or with an
     * audience matching the session DID.
     *
     * Proof of session will also be included in the returned proofs if any
     * proofs matching the passed capabilities require it.
     *
     * @param {API.CapabilityQuery[]} [caps] - Capabilities to filter by. Empty or undefined caps with return all the proofs.
     * @param {object} [options]
     * @param {API.DID} [options.sessionProofIssuer] - only include session proofs for this issuer
     */ proofs(caps, options) {
        /** @type {Map<string, API.Delegation<API.Capabilities>>} */ const authorizations = new Map();
        for (const { delegation } of this.#delegations(caps)){
            if (delegation.audience.did() === this.issuer.did()) {
                authorizations.set(delegation.cid.toString(), delegation);
            }
        }
        // now let's add any session proofs that refer to those authorizations
        const sessions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$web3$2d$storage$2b$access$40$20$2e$3$2e$0$2f$node_modules$2f40$web3$2d$storage$2f$access$2f$dist$2f$src$2f$agent$2d$data$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getSessionProofs"])(this.#data);
        for (const proof of [
            ...authorizations.values()
        ]){
            const proofsByIssuer = sessions[proof.asCID.toString()] ?? {};
            const sessionProofs = options?.sessionProofIssuer ? proofsByIssuer[options.sessionProofIssuer] ?? [] : Object.values(proofsByIssuer).flat();
            for (const sessionProof of sessionProofs){
                authorizations.set(sessionProof.cid.toString(), sessionProof);
            }
        }
        return [
            ...authorizations.values()
        ];
    }
    /**
     * Get delegations created by the agent for others.
     *
     * @param {API.CapabilityQuery[]} [caps] - Capabilities to filter by. Empty or undefined caps with return all the delegations.
     */ delegations(caps) {
        const arr = [];
        for (const { delegation } of this.delegationsWithMeta(caps)){
            arr.push(delegation);
        }
        return arr;
    }
    /**
     * Get delegations created by the agent for others and their metadata.
     *
     * @param {API.CapabilityQuery[]} [caps] - Capabilities to filter by. Empty or undefined caps with return all the delegations.
     */ delegationsWithMeta(caps) {
        const arr = [];
        for (const value of this.#delegations(caps)){
            const { delegation } = value;
            const isSession = delegation.capabilities.some((c)=>c.can === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$web3$2d$storage$2b$capabilities$40$18$2e$1$2e$0$2f$node_modules$2f40$web3$2d$storage$2f$capabilities$2f$src$2f$ucan$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["attest"].can);
            if (!isSession && delegation.audience.did() !== this.issuer.did()) {
                arr.push(value);
            }
        }
        return arr;
    }
    /**
     * Creates a space signer and a delegation to the agent
     *
     * @param {string} name
     */ async createSpace(name) {
        return await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$web3$2d$storage$2b$access$40$20$2e$3$2e$0$2f$node_modules$2f40$web3$2d$storage$2f$access$2f$dist$2f$src$2f$space$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generate"]({
            name,
            agent: this
        });
    }
    /**
     * @param {string} secret
     * @param {object} options
     * @param {string} options.name
     */ async recoverSpace(secret, { name }) {
        return await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$web3$2d$storage$2b$access$40$20$2e$3$2e$0$2f$node_modules$2f40$web3$2d$storage$2f$access$2f$dist$2f$src$2f$space$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fromMnemonic"](secret, {
            name,
            agent: this
        });
    }
    /**
     * Import a space from a delegation.
     *
     * @param {API.Delegation} delegation
     * @param {object} options
     * @param {string} [options.name]
     */ async importSpaceFromDelegation(delegation, { name = '' } = {}) {
        const space = name === '' ? __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$web3$2d$storage$2b$access$40$20$2e$3$2e$0$2f$node_modules$2f40$web3$2d$storage$2f$access$2f$dist$2f$src$2f$space$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fromDelegation"](delegation) : __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$web3$2d$storage$2b$access$40$20$2e$3$2e$0$2f$node_modules$2f40$web3$2d$storage$2f$access$2f$dist$2f$src$2f$space$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fromDelegation"](delegation).withName(name);
        this.#data.spaces.set(space.did(), {
            ...space.meta,
            name: space.name
        });
        await this.addProof(space.delegation);
        // if we do not have a current space, make this one current
        if (!this.currentSpace()) {
            await this.setCurrentSpace(space.did());
        }
        return space;
    }
    /**
     * Sets the current selected space
     *
     * Other methods will default to use the current space if no resource is defined
     *
     * @param {API.SpaceDID} space
     */ async setCurrentSpace(space) {
        if (!this.#data.spaces.has(space)) {
            throw new Error(`Agent has no proofs for ${space}.`);
        }
        await this.#data.setCurrentSpace(space);
        return space;
    }
    /**
     * Get current space DID
     */ currentSpace() {
        return this.#data.currentSpace;
    }
    /**
     * Get current space DID, proofs and abilities
     */ currentSpaceWithMeta() {
        if (!this.#data.currentSpace) {
            return;
        }
        const proofs = this.proofs([
            {
                can: 'space/info',
                with: this.#data.currentSpace
            }
        ]);
        const caps = new Set();
        for (const p of proofs){
            for (const cap of p.capabilities){
                caps.add(cap.can);
            }
        }
        return {
            did: this.#data.currentSpace,
            proofs,
            capabilities: [
                ...caps
            ],
            meta: this.#data.spaces.get(this.#data.currentSpace)
        };
    }
    /**
     *
     * @param {import('./types.js').DelegationOptions} options
     */ async delegate(options) {
        const space = this.currentSpaceWithMeta();
        if (!space) {
            throw new Error('no space selected.');
        }
        const caps = options.abilities.map((a)=>{
            return {
                with: space.did,
                can: a
            };
        });
        // Verify agent can provide proofs for each requested capability
        for (const cap of caps){
            if (!this.proofs([
                cap
            ]).length) {
                throw new Error(`cannot delegate capability ${cap.can} with ${cap.with}`);
            }
        }
        const delegation = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$ucanto$2b$core$40$10$2e$4$2e$6$2f$node_modules$2f40$ucanto$2f$core$2f$src$2f$delegation$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["delegate"])({
            issuer: this.issuer,
            capabilities: caps,
            proofs: this.proofs(caps),
            facts: [
                {
                    space: space.meta ?? {}
                }
            ],
            ...options
        });
        await this.#data.addDelegation(delegation, {
            audience: options.audienceMeta
        });
        await this.removeExpiredDelegations();
        return delegation;
    }
    /**
     * Invoke and execute the given capability on the Access service connection
     *
     * ```js
     *
     * await agent.invokeAndExecute(Space.recover, {
     *   nb: {
     *     identity: 'mailto: email@gmail.com',
     *   },
     * })
     *
     * // sugar for
     * const recoverInvocation = await agent.invoke(Space.recover, {
     *   nb: {
     *     identity: 'mailto: email@gmail.com',
     *   },
     * })
     *
     * await recoverInvocation.execute(agent.connection)
     * ```
     *
     * @template {API.Ability} A
     * @template {API.URI} R
     * @template {API.Caveats} C
     * @param {API.TheCapabilityParser<API.CapabilityMatch<A, R, C>>} cap
     * @param {API.InvokeOptions<A, R, API.TheCapabilityParser<API.CapabilityMatch<A, R, C>>>} options
     * @returns {Promise<API.InferReceipt<API.Capability<A, R, C>, S>>}
     */ async invokeAndExecute(cap, options) {
        const inv = await this.invoke(cap, options);
        const out = inv.execute(this.connection);
        return out;
    }
    /**
     * Execute invocations on the agent's connection
     *
     * @example
     * ```js
     * const i1 = await agent.invoke(Space.info, {})
     * const i2 = await agent.invoke(Space.recover, {
     *   nb: {
     *     identity: 'mailto:hello@web3.storage',
     *   },
     * })
     *
     * const results = await agent.execute2(i1, i2)
     *
     * ```
     * @template {API.Capability} C
     * @template {API.Tuple<API.ServiceInvocation<C, S>>} I
     * @param {I} invocations
     */ execute(...invocations) {
        return this.connection.execute(...invocations);
    }
    /**
     * Creates an invocation for the given capability with Agent's proofs, service, issuer and space.
     *
     * @example
     * ```js
     * const recoverInvocation = await agent.invoke(Space.recover, {
     *   nb: {
     *     identity: 'mailto: email@gmail.com',
     *   },
     * })
     *
     * await recoverInvocation.execute(agent.connection)
     * // or
     * await agent.execute(recoverInvocation)
     * ```
     *
     * @template {API.Ability} A
     * @template {API.URI} R
     * @template {API.TheCapabilityParser<API.CapabilityMatch<A, R, C>>} CAP
     * @template {API.Caveats} [C={}]
     * @param {CAP} cap
     * @param {import('./types.js').InvokeOptions<A, R, CAP>} options
     */ async invoke(cap, options) {
        const audience = options.audience || this.connection.id;
        const space = options.with || this.currentSpace();
        if (!space) {
            throw new Error('No space or resource selected, you need pass a resource.');
        }
        const proofs = [
            ...options.proofs || [],
            ...this.proofs([
                {
                    with: space,
                    can: cap.can
                }
            ], {
                sessionProofIssuer: audience.did()
            })
        ];
        if (proofs.length === 0 && options.with !== this.did()) {
            throw new Error(`no proofs available for resource ${space} and ability ${cap.can}`);
        }
        const inv = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$ucanto$2b$core$40$10$2e$4$2e$6$2f$node_modules$2f40$ucanto$2f$core$2f$src$2f$invocation$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["invoke"])({
            ...options,
            audience,
            // @ts-ignore
            capability: cap.create({
                with: space,
                nb: options.nb
            }),
            issuer: this.issuer,
            proofs: [
                ...proofs
            ],
            nonce: options.nonce
        });
        return inv;
    }
    /**
     * Get Space information from Access service
     *
     * @param {API.URI<"did:">} [space]
     * @param {object} [options]
     * @param {string} [options.nonce]
     */ async getSpaceInfo(space, options) {
        const _space = space || this.currentSpace();
        if (!_space) {
            throw new Error('No space selected, you need pass a resource.');
        }
        const inv = await this.invokeAndExecute(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$web3$2d$storage$2b$capabilities$40$18$2e$1$2e$0$2f$node_modules$2f40$web3$2d$storage$2f$capabilities$2f$src$2f$space$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["info"], {
            ...options,
            with: _space
        });
        if (inv.out.error) {
            throw inv.out.error;
        }
        return inv.out.ok;
    }
}
async function addSpacesFromDelegations(agent, delegations) {
    const data = agentToData.get(agent);
    if (!data) {
        throw Object.assign(new Error(`cannot determine AgentData for Agent`), {
            agent: agent
        });
    }
    // spaces we find along the way.
    const spaces = new Map();
    // only consider ucans with this agent as the audience
    const ours = delegations.filter((x)=>x.audience.did() === agent.did());
    // space names are stored as facts in proofs in the special `ucan:*` delegation from email to agent.
    const ucanStars = ours.filter((x)=>x.capabilities[0].can === '*' && x.capabilities[0].with === 'ucan:*');
    for (const delegation of ucanStars){
        for (const proof of delegation.proofs){
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$ucanto$2b$core$40$10$2e$4$2e$6$2f$node_modules$2f40$ucanto$2f$core$2f$src$2f$delegation$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isDelegation"])(proof) || !proof.capabilities[0].with.startsWith('did:key')) {
                continue;
            }
            const space = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$web3$2d$storage$2b$access$40$20$2e$3$2e$0$2f$node_modules$2f40$web3$2d$storage$2f$access$2f$dist$2f$src$2f$space$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fromDelegation"](proof);
            spaces.set(space.did(), space.meta);
        }
    }
    // Find any other spaces the user may have access to
    for (const delegation of ours){
        // TODO: we need a more robust way to determine which spaces a user has access to
        // it may or may not involve look at delegations
        const allows = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$ucanto$2b$core$40$10$2e$4$2e$6$2f$node_modules$2f40$ucanto$2f$core$2f$src$2f$delegation$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Delegation$3e$__["Delegation"].allows(delegation);
        for (const [resource, value] of Object.entries(allows)){
            // If we discovered a delegation to any DID, we add it to the spaces list.
            if (resource.startsWith('did:key') && Object.keys(value).length > 0) {
                if (!spaces.has(resource)) {
                    spaces.set(resource, {});
                }
            }
        }
    }
    for (const [did, meta] of spaces){
        await data.addSpace(did, meta);
    }
}
const importAuthorization = async (agent, { proofs })=>{
    try {
        await agent.addProofs(proofs);
        await addSpacesFromDelegations(agent, proofs);
        return {
            ok: {}
        };
    } catch (error) {
        return {
            error
        };
    }
};
}),
"[project]/Documents/Github/PL-Genesis/node_modules/.pnpm/@web3-storage+access@20.3.0/node_modules/@web3-storage/access/dist/src/utils/json.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// JSON.stringify and JSON.parse with URL, Map and Uint8Array type support.
/**
 * @param {string} k
 * @param {any} v
 */ __turbopack_context__.s([
    "parse",
    ()=>parse,
    "replacer",
    ()=>replacer,
    "reviver",
    ()=>reviver,
    "stringify",
    ()=>stringify
]);
const replacer = (k, v)=>{
    if (v instanceof URL) {
        return {
            $url: v.toString()
        };
    } else if (v instanceof Map) {
        return {
            $map: [
                ...v.entries()
            ]
        };
    } else if (v instanceof Uint8Array) {
        return {
            $bytes: [
                ...v.values()
            ]
        };
    } else if (v instanceof ArrayBuffer) {
        return {
            $bytes: [
                ...new Uint8Array(v).values()
            ]
        };
    } else if (v?.type === 'Buffer' && Array.isArray(v.data)) {
        return {
            $bytes: v.data
        };
    }
    return v;
};
const reviver = (k, v)=>{
    if (!v) return v;
    if (v.$url) return new URL(v.$url);
    if (v.$map) return new Map(v.$map);
    if (v.$bytes) return new Uint8Array(v.$bytes);
    return v;
};
const stringify = (value, space)=>JSON.stringify(value, replacer, space);
const parse = (value)=>JSON.parse(value, reviver);
}),
"[project]/Documents/Github/PL-Genesis/node_modules/.pnpm/@web3-storage+access@20.3.0/node_modules/@web3-storage/access/dist/src/drivers/conf.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ConfDriver",
    ()=>ConfDriver
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f$conf$40$11$2e$0$2e$2$2f$node_modules$2f$conf$2f$dist$2f$source$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Github/PL-Genesis/node_modules/.pnpm/conf@11.0.2/node_modules/conf/dist/source/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$web3$2d$storage$2b$access$40$20$2e$3$2e$0$2f$node_modules$2f40$web3$2d$storage$2f$access$2f$dist$2f$src$2f$utils$2f$json$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Github/PL-Genesis/node_modules/.pnpm/@web3-storage+access@20.3.0/node_modules/@web3-storage/access/dist/src/utils/json.js [app-route] (ecmascript)");
;
;
class ConfDriver {
    /**
     * @type {Conf<T>}
     */ #config;
    /**
     * @param {{ profile: string }} opts
     */ constructor(opts){
        this.#config = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f$conf$40$11$2e$0$2e$2$2f$node_modules$2f$conf$2f$dist$2f$source$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"]({
            projectName: 'w3access',
            projectSuffix: '',
            configName: opts.profile,
            serialize: (v)=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$web3$2d$storage$2b$access$40$20$2e$3$2e$0$2f$node_modules$2f40$web3$2d$storage$2f$access$2f$dist$2f$src$2f$utils$2f$json$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["stringify"](v),
            deserialize: (v)=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$web3$2d$storage$2b$access$40$20$2e$3$2e$0$2f$node_modules$2f40$web3$2d$storage$2f$access$2f$dist$2f$src$2f$utils$2f$json$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parse"](v)
        });
        this.path = this.#config.path;
    }
    async open() {}
    async close() {}
    async reset() {
        this.#config.clear();
    }
    /** @param {T} data */ async save(data) {
        if (typeof data === 'object') {
            data = {
                ...data
            };
            for (const [k, v] of Object.entries(data)){
                if (v === undefined) {
                    delete data[k];
                }
            }
        }
        this.#config.set(data);
    }
    /** @returns {Promise<T|undefined>} */ async load() {
        const data = this.#config.store ?? {};
        if (Object.keys(data).length === 0) return;
        return data;
    }
}
}),
"[project]/Documents/Github/PL-Genesis/node_modules/.pnpm/@web3-storage+access@20.3.0/node_modules/@web3-storage/access/dist/src/stores/store-conf.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StoreConf",
    ()=>StoreConf
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$web3$2d$storage$2b$access$40$20$2e$3$2e$0$2f$node_modules$2f40$web3$2d$storage$2f$access$2f$dist$2f$src$2f$drivers$2f$conf$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Github/PL-Genesis/node_modules/.pnpm/@web3-storage+access@20.3.0/node_modules/@web3-storage/access/dist/src/drivers/conf.js [app-route] (ecmascript)");
;
class StoreConf extends __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$web3$2d$storage$2b$access$40$20$2e$3$2e$0$2f$node_modules$2f40$web3$2d$storage$2f$access$2f$dist$2f$src$2f$drivers$2f$conf$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ConfDriver"] {
}
}),
"[project]/Documents/Github/PL-Genesis/node_modules/.pnpm/@web3-storage+access@20.3.0/node_modules/@web3-storage/access/dist/src/access.js [app-route] (ecmascript) <export * as Access>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Access",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$web3$2d$storage$2b$access$40$20$2e$3$2e$0$2f$node_modules$2f40$web3$2d$storage$2f$access$2f$dist$2f$src$2f$access$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$PL$2d$Genesis$2f$node_modules$2f2e$pnpm$2f40$web3$2d$storage$2b$access$40$20$2e$3$2e$0$2f$node_modules$2f40$web3$2d$storage$2f$access$2f$dist$2f$src$2f$access$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Github/PL-Genesis/node_modules/.pnpm/@web3-storage+access@20.3.0/node_modules/@web3-storage/access/dist/src/access.js [app-route] (ecmascript)");
}),
];

//# sourceMappingURL=0h19_%40web3-storage_access_dist_src_0g8io0-._.js.map
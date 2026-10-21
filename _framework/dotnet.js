//! Licensed to the .NET Foundation under one or more agreements.
//! The .NET Foundation licenses this file to you under the MIT license.

var e=!0;const t=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,8,1,6,0,6,64,25,11,11])),o=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,15,1,13,0,65,1,253,15,65,2,253,15,253,128,2,11])),n=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,10,1,8,0,65,0,253,15,253,98,11])),r=Symbol.for("wasm promise_control");function i(e,t){let o=null;const n=new Promise((function(n,r){o={isDone:!1,promise:null,resolve:t=>{o.isDone||(o.isDone=!0,n(t),e&&e())},reject:e=>{o.isDone||(o.isDone=!0,r(e),t&&t())}}}));o.promise=n;const i=n;return i[r]=o,{promise:i,promise_control:o}}function s(e){return e[r]}function a(e){e&&function(e){return void 0!==e[r]}(e)||qe(!1,"Promise is not controllable")}const l="__mono_message__",c=["debug","log","trace","warn","info","error"],d="MONO_WASM: ";let u,f,m,g;function p(e){g=e}function h(e){if(Ne.diagnosticTracing){const t="function"==typeof e?e():e;console.debug(d+t)}}function w(e,...t){console.info(d+e,...t)}function b(e,...t){console.info(e,...t)}function y(e,...t){console.warn(d+e,...t)}function v(e,...t){if(t&&t.length>0&&t[0]&&"object"==typeof t[0]){if(t[0].silent)return;if(t[0].toString)return void console.error(d+e,t[0].toString())}console.error(d+e,...t)}let _,E,T="",x=(new Date).valueOf();function j(t,o,n){return function(...r){try{let i=r[0];if(void 0===i)i="undefined";else if(null===i)i="null";else if("function"==typeof i)i=i.toString();else if("string"!=typeof i)try{i=JSON.stringify(i)}catch(e){i=i.toString()}if("string"==typeof i&&e){if(Pe&&-1!==i.indexOf("keeping the worker alive for asynchronous operation"))return;if(0===i.indexOf("MONO_WASM: ")||0===i.indexOf("[MONO]")){const e=new Date;x!==e.valueOf()&&(T=e.toISOString().substring(11,23),x=e.valueOf()),i=`[${g} ${T}] ${i}`}}o(n?JSON.stringify({method:t,payload:i,arguments:r.slice(1)}):[t+i,...r.slice(1)])}catch(e){m.error(`proxyConsole failed: ${e}`)}}}function R(e,t,o){f=t,g=e,m={...t};const n=`${o}/console`.replace("https://","wss://").replace("http://","ws://");u=new WebSocket(n),u.addEventListener("error",O),u.addEventListener("close",D),function(){for(const e of c)f[e]=j(`console.${e}`,A,!0)}()}function S(e){let t=30;const o=()=>{u?0==u.bufferedAmount||0==t?(e&&b(e),function(){for(const e of c)f[e]=j(`console.${e}`,m.log,!1)}(),u.removeEventListener("error",O),u.removeEventListener("close",D),u.close(1e3,e),u=void 0):(t--,globalThis.setTimeout(o,100)):e&&m&&m.log(e)};o()}function A(e){u&&u.readyState===WebSocket.OPEN?u.send(e):m.log(e)}function O(e){m.error(`[${g}] proxy console websocket error: ${e}`,e)}function D(e){m.debug(`[${g}] proxy console websocket closed: ${e}`,e)}function k(){Ne.preferredIcuAsset=I(Ne.config);let e="invariant"==Ne.config.globalizationMode;if(!e)if(Ne.preferredIcuAsset)Ne.diagnosticTracing&&h("ICU data archive(s) available, disabling invariant mode");else{if("custom"===Ne.config.globalizationMode||"all"===Ne.config.globalizationMode||"sharded"===Ne.config.globalizationMode){const e="invariant globalization mode is inactive and no ICU data archives are available";throw v(`ERROR: ${e}`),new Error(e)}Ne.diagnosticTracing&&h("ICU data archive(s) not available, using invariant globalization mode"),e=!0,Ne.preferredIcuAsset=null}const t="DOTNET_SYSTEM_GLOBALIZATION_INVARIANT",o=Ne.config.environmentVariables;if(void 0===o[t]&&e&&(o[t]="1"),void 0===o.TZ)try{const e=Intl.DateTimeFormat().resolvedOptions().timeZone||null;e&&(o.TZ=e)}catch(e){w("failed to detect timezone, will fallback to UTC")}}function I(e){var t;if((null===(t=e.resources)||void 0===t?void 0:t.icu)&&"invariant"!=e.globalizationMode){const t=e.applicationCulture||(Ce?globalThis.navigator&&globalThis.navigator.languages&&globalThis.navigator.languages[0]:Intl.DateTimeFormat().resolvedOptions().locale),o=e.resources.icu;let n=null;if("custom"===e.globalizationMode){if(o.length>=1)return o[0].name}else t&&"all"!==e.globalizationMode?"sharded"===e.globalizationMode&&(n=function(e){const t=e.split("-")[0];return"en"===t||["fr","fr-FR","it","it-IT","de","de-DE","es","es-ES"].includes(e)?"icudt_EFIGS.dat":["zh","ko","ja"].includes(t)?"icudt_CJK.dat":"icudt_no_CJK.dat"}(t)):n="icudt.dat";if(n)for(let e=0;e<o.length;e++){const t=o[e];if(t.virtualPath===n)return t.name}}return e.globalizationMode="invariant",null}const P=class{constructor(e){this.url=e}toString(){return this.url}};async function C(e,t){try{const o="function"==typeof globalThis.fetch;if(De){const n=e.startsWith("file://");if(!n&&o)return globalThis.fetch(e,t||{credentials:"same-origin"});_||(E=ze.require("url"),_=ze.require("fs")),n&&(e=E.fileURLToPath(e));const r=await _.promises.readFile(e);return{ok:!0,headers:{length:0,get:()=>null},url:e,arrayBuffer:()=>r,json:()=>JSON.parse(r),text:()=>{throw new Error("NotImplementedException")}}}if(o)return globalThis.fetch(e,t||{credentials:"same-origin"});if("function"==typeof read)return{ok:!0,url:e,headers:{length:0,get:()=>null},arrayBuffer:()=>new Uint8Array(read(e,"binary")),json:()=>JSON.parse(read(e,"utf8")),text:()=>read(e,"utf8")}}catch(t){return{ok:!1,url:e,status:500,headers:{length:0,get:()=>null},statusText:"ERR28: "+t,arrayBuffer:()=>{throw t},json:()=>{throw t},text:()=>{throw t}}}throw new Error("No fetch implementation available")}function M(e){return"string"!=typeof e&&qe(!1,"url must be a string"),!L(e)&&0!==e.indexOf("./")&&0!==e.indexOf("../")&&globalThis.URL&&globalThis.document&&globalThis.document.baseURI&&(e=new URL(e,globalThis.document.baseURI).toString()),e}const U=/^[a-zA-Z][a-zA-Z\d+\-.]*?:\/\//,N=/[a-zA-Z]:[\\/]/;function L(e){return De||Me?e.startsWith("/")||e.startsWith("\\")||-1!==e.indexOf("///")||N.test(e):U.test(e)}let $,z=0;const W=[],F=[],B=new Map,V={"js-module-threads":!0,"js-module-runtime":!0,"js-module-dotnet":!0,"js-module-native":!0,"js-module-diagnostics":!0},q={...V,"js-module-library-initializer":!0},J={...V,dotnetwasm:!0,heap:!0,manifest:!0},H={...q,manifest:!0},Z={...q,dotnetwasm:!0},Q={dotnetwasm:!0,symbols:!0},G={...q,dotnetwasm:!0,symbols:!0},K={symbols:!0};function X(e){return!("icu"==e.behavior&&e.name!=Ne.preferredIcuAsset)}function Y(e,t,o){null!=t||(t=[]),qe(1==t.length,`Expect to have one ${o} asset in resources`);const n=t[0];return n.behavior=o,ee(n),e.push(n),n}function ee(e){J[e.behavior]&&B.set(e.behavior,e)}function te(e){qe(J[e],`Unknown single asset behavior ${e}`);const t=B.get(e);if(t&&!t.resolvedUrl)if(t.resolvedUrl=Ne.locateFile(t.name),V[t.behavior]){const e=he(t);e?("string"!=typeof e&&qe(!1,"loadBootResource response for 'dotnetjs' type should be a URL string"),t.resolvedUrl=e):t.resolvedUrl=ue(t.resolvedUrl,t.behavior)}else if("dotnetwasm"!==t.behavior)throw new Error(`Unknown single asset behavior ${e}`);return t}function oe(e){const t=te(e);return qe(t,`Single asset for ${e} not found`),t}let ne=!1;async function re(){if(!ne){ne=!0,Ne.diagnosticTracing&&h("mono_download_assets");try{const e=[],t=[],o=(e,t)=>{!G[e.behavior]&&X(e)&&Ne.expected_instantiated_assets_count++,!Z[e.behavior]&&X(e)&&(Ne.expected_downloaded_assets_count++,t.push(le(e)))};for(const t of W)o(t,e);for(const e of F)o(e,t);Ne.allDownloadsQueued.promise_control.resolve(),Promise.all([...e,...t]).then((()=>{Ne.allDownloadsFinished.promise_control.resolve()})).catch((e=>{throw Ne.err("Error in mono_download_assets: "+e),et(1,e),e})),await Ne.runtimeModuleLoaded.promise;const n=async e=>{const t=await e;if(t.buffer){if(!G[t.behavior]){t.buffer&&"object"==typeof t.buffer||qe(!1,"asset buffer must be array-like or buffer-like or promise of these"),"string"!=typeof t.resolvedUrl&&qe(!1,"resolvedUrl must be string");const e=t.resolvedUrl,o=await t.buffer,n=new Uint8Array(o);we(t),await Ue.beforeOnRuntimeInitialized.promise,Ue.instantiate_asset(t,e,n)}}else Q[t.behavior]?("symbols"===t.behavior&&(await Ue.instantiate_symbols_asset(t),we(t)),Q[t.behavior]&&++Ne.actual_downloaded_assets_count):(t.isOptional||qe(!1,"Expected asset to have the downloaded buffer"),!Z[t.behavior]&&X(t)&&Ne.expected_downloaded_assets_count--,!G[t.behavior]&&X(t)&&Ne.expected_instantiated_assets_count--)},r=[],i=[];for(const t of e)r.push(n(t));for(const e of t)i.push(n(e));Promise.all(r).then((()=>{Pe||Ue.coreAssetsInMemory.promise_control.resolve()})).catch((e=>{throw Ne.err("Error in mono_download_assets: "+e),et(1,e),e})),Promise.all(i).then((async()=>{Pe||(await Ue.coreAssetsInMemory.promise,Ue.allAssetsInMemory.promise_control.resolve())})).catch((e=>{throw Ne.err("Error in mono_download_assets: "+e),et(1,e),e}))}catch(e){throw Ne.err("Error in mono_download_assets: "+e),e}}}let ie=!1;function se(){if(ie)return;ie=!0;const e=Ne.config,t=[];if(e.assets)for(const t of e.assets)"object"!=typeof t&&qe(!1,`asset must be object, it was ${typeof t} : ${t}`),"string"!=typeof t.behavior&&qe(!1,"asset behavior must be known string"),"string"!=typeof t.name&&qe(!1,"asset name must be string"),t.resolvedUrl&&"string"!=typeof t.resolvedUrl&&qe(!1,"asset resolvedUrl could be string"),t.hash&&"string"!=typeof t.hash&&qe(!1,"asset resolvedUrl could be string"),t.pendingDownload&&"object"!=typeof t.pendingDownload&&qe(!1,"asset pendingDownload could be object"),t.isCore?W.push(t):F.push(t),ee(t);else if(e.resources){const o=e.resources;o.wasmNative||qe(!1,"resources.wasmNative must be defined"),o.jsModuleNative||qe(!1,"resources.jsModuleNative must be defined"),o.jsModuleRuntime||qe(!1,"resources.jsModuleRuntime must be defined"),o.jsModuleWorker||qe(!1,"resources.jsModuleWorker must be defined"),Y(F,o.wasmNative,"dotnetwasm"),Y(t,o.jsModuleNative,"js-module-native"),Y(t,o.jsModuleRuntime,"js-module-runtime"),o.jsModuleDiagnostics&&Y(t,o.jsModuleDiagnostics,"js-module-diagnostics"),Y(t,o.jsModuleWorker,"js-module-threads");const n=(e,t,o)=>{const n=e;n.behavior=t,o?(n.isCore=!0,W.push(n)):F.push(n)};if(o.coreAssembly)for(let e=0;e<o.coreAssembly.length;e++)n(o.coreAssembly[e],"assembly",!0);if(o.assembly)for(let e=0;e<o.assembly.length;e++)n(o.assembly[e],"assembly",!o.coreAssembly);if(0!=e.debugLevel&&Ne.isDebuggingSupported()){if(o.corePdb)for(let e=0;e<o.corePdb.length;e++)n(o.corePdb[e],"pdb",!0);if(o.pdb)for(let e=0;e<o.pdb.length;e++)n(o.pdb[e],"pdb",!o.corePdb)}if(e.loadAllSatelliteResources&&o.satelliteResources)for(const e in o.satelliteResources)for(let t=0;t<o.satelliteResources[e].length;t++){const r=o.satelliteResources[e][t];r.culture=e,n(r,"resource",!o.coreAssembly)}if(o.coreVfs)for(let e=0;e<o.coreVfs.length;e++)n(o.coreVfs[e],"vfs",!0);if(o.vfs)for(let e=0;e<o.vfs.length;e++)n(o.vfs[e],"vfs",!o.coreVfs);const r=I(e);if(r&&o.icu)for(let e=0;e<o.icu.length;e++){const t=o.icu[e];t.name===r&&n(t,"icu",!1)}if(o.wasmSymbols)for(let e=0;e<o.wasmSymbols.length;e++)n(o.wasmSymbols[e],"symbols",!1)}if(e.appsettings)for(let t=0;t<e.appsettings.length;t++){const o=e.appsettings[t],n=be(o);"appsettings.json"!==n&&n!==`appsettings.${e.applicationEnvironment}.json`||F.push({name:o,behavior:"vfs",cache:"no-cache",useCredentials:!0})}e.assets=[...W,...F,...t]}async function ae(e){const t=await le(e);return await t.pendingDownloadInternal.response,t.buffer}async function le(e){try{return await ce(e)}catch(t){if(!Ne.enableDownloadRetry)throw t;if(Me||De)throw t;if(e.pendingDownload&&e.pendingDownloadInternal==e.pendingDownload)throw t;if(e.resolvedUrl&&-1!=e.resolvedUrl.indexOf("file://"))throw t;if(t&&404==t.status)throw t;e.pendingDownloadInternal=void 0,await Ne.allDownloadsQueued.promise;try{return Ne.diagnosticTracing&&h(`Retrying download '${e.name}'`),await ce(e)}catch(t){return e.pendingDownloadInternal=void 0,await new Promise((e=>globalThis.setTimeout(e,100))),Ne.diagnosticTracing&&h(`Retrying download (2) '${e.name}' after delay`),await ce(e)}}}async function ce(e){for(;$;)await $.promise;try{++z,z==Ne.maxParallelDownloads&&(Ne.diagnosticTracing&&h("Throttling further parallel downloads"),$=i());const t=await async function(e){if(e.pendingDownload&&(e.pendingDownloadInternal=e.pendingDownload),e.pendingDownloadInternal&&e.pendingDownloadInternal.response)return e.pendingDownloadInternal.response;if(e.buffer){const t=await e.buffer;return e.resolvedUrl||(e.resolvedUrl="undefined://"+e.name),e.pendingDownloadInternal={url:e.resolvedUrl,name:e.name,response:Promise.resolve({ok:!0,arrayBuffer:()=>t,json:()=>JSON.parse(new TextDecoder("utf-8").decode(t)),text:()=>{throw new Error("NotImplementedException")},headers:{get:()=>{}}})},e.pendingDownloadInternal.response}const t=e.loadRemote&&Ne.config.remoteSources?Ne.config.remoteSources:[""];let o;for(let n of t){n=n.trim(),"./"===n&&(n="");const t=de(e,n);e.name===t?Ne.diagnosticTracing&&h(`Attempting to download '${t}'`):Ne.diagnosticTracing&&h(`Attempting to download '${t}' for ${e.name}`);try{e.resolvedUrl=t;const n=ge(e);if(e.pendingDownloadInternal=n,o=await n.response,!o||!o.ok)continue;return o}catch(e){o||(o={ok:!1,url:t,status:0,statusText:""+e});continue}}const n=e.isOptional||e.name.match(/\.pdb$/)&&Ne.config.ignorePdbLoadErrors;if(o||qe(!1,`Response undefined ${e.name}`),!n){const t=new Error(`download '${o.url}' for ${e.name} failed ${o.status} ${o.statusText}`);throw t.status=o.status,t}w(`optional download '${o.url}' for ${e.name} failed ${o.status} ${o.statusText}`)}(e);return t?(Q[e.behavior]||(e.buffer=await t.arrayBuffer(),++Ne.actual_downloaded_assets_count),e):e}finally{if(--z,$&&z==Ne.maxParallelDownloads-1){Ne.diagnosticTracing&&h("Resuming more parallel downloads");const e=$;$=void 0,e.promise_control.resolve()}}}function de(e,t){let o;return null==t&&qe(!1,`sourcePrefix must be provided for ${e.name}`),e.resolvedUrl?o=e.resolvedUrl:(o=""===t?"assembly"===e.behavior||"pdb"===e.behavior?e.name:"resource"===e.behavior&&e.culture&&""!==e.culture?`${e.culture}/${e.name}`:e.name:t+e.name,o=ue(Ne.locateFile(o),e.behavior)),o&&"string"==typeof o||qe(!1,"attemptUrl need to be path or url string"),o}function ue(e,t){return Ne.modulesUniqueQuery&&H[t]&&(e+=Ne.modulesUniqueQuery),e}let fe=0;const me=new Set;function ge(e){try{e.resolvedUrl||qe(!1,"Request's resolvedUrl must be set");const t=function(e){let t=e.resolvedUrl;if(Ne.loadBootResource){const o=he(e);if(o instanceof Promise)return o;"string"==typeof o&&(t=o)}const o={};return e.cache?o.cache=e.cache:Ne.config.disableNoCacheFetch||(o.cache="no-cache"),e.useCredentials?o.credentials="include":!Ne.config.disableIntegrityCheck&&e.hash&&(o.integrity=e.hash),Ne.fetch_like(t,o)}(e),o={name:e.name,url:e.resolvedUrl,response:t};return me.add(e.name),o.response.then((()=>{"assembly"==e.behavior&&Ne.loadedAssemblies.push(e.name),fe++,Ne.onDownloadResourceProgress&&Ne.onDownloadResourceProgress(fe,me.size)})),o}catch(t){const o={ok:!1,url:e.resolvedUrl,status:500,statusText:"ERR29: "+t,arrayBuffer:()=>{throw t},json:()=>{throw t}};return{name:e.name,url:e.resolvedUrl,response:Promise.resolve(o)}}}const pe={resource:"assembly",assembly:"assembly",pdb:"pdb",icu:"globalization",vfs:"configuration",manifest:"manifest",dotnetwasm:"dotnetwasm","js-module-dotnet":"dotnetjs","js-module-native":"dotnetjs","js-module-runtime":"dotnetjs","js-module-threads":"dotnetjs"};function he(e){var t;if(Ne.loadBootResource){const o=null!==(t=e.hash)&&void 0!==t?t:"",n=e.resolvedUrl,r=pe[e.behavior];if(r){const t=Ne.loadBootResource(r,e.name,n,o,e.behavior);return"string"==typeof t?M(t):t}}}function we(e){e.pendingDownloadInternal=null,e.pendingDownload=null,e.buffer=null,e.moduleExports=null}function be(e){let t=e.lastIndexOf("/");return t>=0&&t++,e.substring(t)}async function ye(e){e&&await Promise.all((null!=e?e:[]).map((e=>async function(e){try{const t=e.name;if(!e.moduleExports){const o=ue(Ne.locateFile(t),"js-module-library-initializer");Ne.diagnosticTracing&&h(`Attempting to import '${o}' for ${e}`),e.moduleExports=await import(/*! webpackIgnore: true */o)}Ne.libraryInitializers.push({scriptName:t,exports:e.moduleExports})}catch(t){y(`Failed to import library initializer '${e}': ${t}`)}}(e))))}async function ve(e,t){if(!Ne.libraryInitializers)return;const o=[];for(let n=0;n<Ne.libraryInitializers.length;n++){const r=Ne.libraryInitializers[n];r.exports[e]&&o.push(_e(r.scriptName,e,(()=>r.exports[e](...t))))}await Promise.all(o)}async function _e(e,t,o){try{await o()}catch(o){throw y(`Failed to invoke '${t}' on library initializer '${e}': ${o}`),et(1,o),o}}function Ee(e,t){if(e===t)return e;const o={...t};return void 0!==o.assets&&o.assets!==e.assets&&(o.assets=[...e.assets||[],...o.assets||[]]),void 0!==o.resources&&(o.resources=xe(e.resources||{assembly:[],jsModuleNative:[],jsModuleRuntime:[],wasmNative:[]},o.resources)),void 0!==o.environmentVariables&&(o.environmentVariables={...e.environmentVariables||{},...o.environmentVariables||{}}),void 0!==o.runtimeOptions&&o.runtimeOptions!==e.runtimeOptions&&(o.runtimeOptions=[...e.runtimeOptions||[],...o.runtimeOptions||[]]),Object.assign(e,o)}function Te(e,t){if(e===t)return e;const o={...t};return o.config&&(e.config||(e.config={}),o.config=Ee(e.config,o.config)),Object.assign(e,o)}function xe(e,t){if(e===t)return e;const o={...t};return void 0!==o.coreAssembly&&(o.coreAssembly=[...e.coreAssembly||[],...o.coreAssembly||[]]),void 0!==o.assembly&&(o.assembly=[...e.assembly||[],...o.assembly||[]]),void 0!==o.lazyAssembly&&(o.lazyAssembly=[...e.lazyAssembly||[],...o.lazyAssembly||[]]),void 0!==o.corePdb&&(o.corePdb=[...e.corePdb||[],...o.corePdb||[]]),void 0!==o.pdb&&(o.pdb=[...e.pdb||[],...o.pdb||[]]),void 0!==o.jsModuleWorker&&(o.jsModuleWorker=[...e.jsModuleWorker||[],...o.jsModuleWorker||[]]),void 0!==o.jsModuleNative&&(o.jsModuleNative=[...e.jsModuleNative||[],...o.jsModuleNative||[]]),void 0!==o.jsModuleDiagnostics&&(o.jsModuleDiagnostics=[...e.jsModuleDiagnostics||[],...o.jsModuleDiagnostics||[]]),void 0!==o.jsModuleRuntime&&(o.jsModuleRuntime=[...e.jsModuleRuntime||[],...o.jsModuleRuntime||[]]),void 0!==o.wasmSymbols&&(o.wasmSymbols=[...e.wasmSymbols||[],...o.wasmSymbols||[]]),void 0!==o.wasmNative&&(o.wasmNative=[...e.wasmNative||[],...o.wasmNative||[]]),void 0!==o.icu&&(o.icu=[...e.icu||[],...o.icu||[]]),void 0!==o.satelliteResources&&(o.satelliteResources=function(e,t){if(e===t)return e;for(const o in t)e[o]=[...e[o]||[],...t[o]||[]];return e}(e.satelliteResources||{},o.satelliteResources||{})),void 0!==o.modulesAfterConfigLoaded&&(o.modulesAfterConfigLoaded=[...e.modulesAfterConfigLoaded||[],...o.modulesAfterConfigLoaded||[]]),void 0!==o.modulesAfterRuntimeReady&&(o.modulesAfterRuntimeReady=[...e.modulesAfterRuntimeReady||[],...o.modulesAfterRuntimeReady||[]]),void 0!==o.extensions&&(o.extensions={...e.extensions||{},...o.extensions||{}}),void 0!==o.vfs&&(o.vfs=[...e.vfs||[],...o.vfs||[]]),Object.assign(e,o)}function je(){const e=Ne.config;if(e.environmentVariables=e.environmentVariables||{},e.runtimeOptions=e.runtimeOptions||[],e.resources=e.resources||{assembly:[],jsModuleNative:[],jsModuleWorker:[],jsModuleRuntime:[],wasmNative:[],vfs:[],satelliteResources:{}},e.assets){Ne.diagnosticTracing&&h("config.assets is deprecated, use config.resources instead");for(const t of e.assets){const o={};switch(t.behavior){case"assembly":o.assembly=[t];break;case"pdb":o.pdb=[t];break;case"resource":o.satelliteResources={},o.satelliteResources[t.culture]=[t];break;case"icu":o.icu=[t];break;case"symbols":o.wasmSymbols=[t];break;case"vfs":o.vfs=[t];break;case"dotnetwasm":o.wasmNative=[t];break;case"js-module-threads":o.jsModuleWorker=[t];break;case"js-module-runtime":o.jsModuleRuntime=[t];break;case"js-module-native":o.jsModuleNative=[t];break;case"js-module-diagnostics":o.jsModuleDiagnostics=[t];break;case"js-module-dotnet":break;default:throw new Error(`Unexpected behavior ${t.behavior} of asset ${t.name}`)}xe(e.resources,o)}}e.debugLevel,e.applicationEnvironment||(e.applicationEnvironment="Production"),Number.isInteger(e.pthreadPoolInitialSize)||(e.pthreadPoolInitialSize=5),Number.isInteger(e.pthreadPoolUnusedSize)||(e.pthreadPoolUnusedSize=1),null==e.jsThreadBlockingMode&&(e.jsThreadBlockingMode="PreventSynchronousJSExport"),void 0===e.environmentVariables.MONO_SLEEP_ABORT_LIMIT&&(e.environmentVariables.MONO_SLEEP_ABORT_LIMIT="5000"),e.applicationCulture&&(e.environmentVariables.LANG=`${e.applicationCulture}.UTF-8`),Ue.diagnosticTracing=Ne.diagnosticTracing=!!e.diagnosticTracing,Ue.waitForDebugger=e.waitForDebugger,Ne.maxParallelDownloads=e.maxParallelDownloads||Ne.maxParallelDownloads,Ne.enableDownloadRetry=void 0!==e.enableDownloadRetry?e.enableDownloadRetry:Ne.enableDownloadRetry}let Re=!1;async function Se(e){var t;if(Re)return void await Ne.afterConfigLoaded.promise;let o;try{if(e.configSrc||Ne.config&&0!==Object.keys(Ne.config).length&&(Ne.config.assets||Ne.config.resources)||(e.configSrc="dotnet.boot.js"),o=e.configSrc,Re=!0,o&&(Ne.diagnosticTracing&&h("mono_wasm_load_config"),await async function(e){const t=e.configSrc,o=Ne.locateFile(t);let n=null;void 0!==Ne.loadBootResource&&(n=Ne.loadBootResource("manifest",t,o,"","manifest"));let r,i=null;if(n)if("string"==typeof n)n.includes(".json")?(i=await s(M(n)),r=await Oe(i)):r=(await import(M(n))).config;else{const e=await n;"function"==typeof e.json?(i=e,r=await Oe(i)):r=e.config}else o.includes(".json")?(i=await s(ue(o,"manifest")),r=await Oe(i)):r=(await import(ue(o,"manifest"))).config;function s(e){return Ne.fetch_like(e,{method:"GET",credentials:"include",cache:"no-cache"})}Ne.config.applicationEnvironment&&(r.applicationEnvironment=Ne.config.applicationEnvironment),Ee(Ne.config,r)}(e)),je(),await ye(null===(t=Ne.config.resources)||void 0===t?void 0:t.modulesAfterConfigLoaded),await ve("onRuntimeConfigLoaded",[Ne.config]),e.onConfigLoaded)try{await e.onConfigLoaded(Ne.config,$e),je()}catch(e){throw v("onConfigLoaded() failed",e),e}je(),Ne.afterConfigLoaded.promise_control.resolve(Ne.config)}catch(t){const n=`Failed to load config file ${o} ${t} ${null==t?void 0:t.stack}`;throw Ne.config=e.config=Object.assign(Ne.config,{message:n,error:t,isError:!0}),et(1,new Error(n)),t}}function Ae(){return!!globalThis.navigator&&(Ne.isChromium||Ne.isFirefox)}async function Oe(e){const t=Ne.config,o=await e.json();t.applicationEnvironment||o.applicationEnvironment||(o.applicationEnvironment=e.headers.get("Blazor-Environment")||e.headers.get("DotNet-Environment")||void 0),o.environmentVariables||(o.environmentVariables={});const n=e.headers.get("DOTNET-MODIFIABLE-ASSEMBLIES");n&&(o.environmentVariables.DOTNET_MODIFIABLE_ASSEMBLIES=n);const r=e.headers.get("ASPNETCORE-BROWSER-TOOLS");return r&&(o.environmentVariables.__ASPNETCORE_BROWSER_TOOLS=r),o}"function"!=typeof importScripts||globalThis.onmessage||(globalThis.dotnetSidecar=!0);const De="object"==typeof process&&"object"==typeof process.versions&&"string"==typeof process.versions.node,ke="function"==typeof importScripts,Ie=ke&&"undefined"!=typeof dotnetSidecar,Pe=ke&&!Ie,Ce="object"==typeof window||ke&&!De,Me=!Ce&&!De;let Ue={},Ne={},Le={},$e={},ze={},We=!1;const Fe={},Be={config:Fe},Ve={mono:{},binding:{},internal:ze,module:Be,loaderHelpers:Ne,runtimeHelpers:Ue,diagnosticHelpers:Le,api:$e};function qe(e,t){if(e)return;const o="Assert failed: "+("function"==typeof t?t():t),n=new Error(o);v(o,n),Ue.nativeAbort(n)}function Je(){return void 0!==Ne.exitCode}function He(){return Ue.runtimeReady&&!Je()}function Ze(){Je()&&qe(!1,`.NET runtime already exited with ${Ne.exitCode} ${Ne.exitReason}. You can use runtime.runMain() which doesn't exit the runtime.`),Pe?Ue.runtimeReady||qe(!1,"The WebWorker is not attached to the runtime. See https://github.com/dotnet/runtime/blob/main/src/mono/wasm/threads.md#JS-interop-on-dedicated-threads"):Ue.runtimeReady||qe(!1,".NET runtime didn't start yet. Please call dotnet.create() first.")}function Qe(){Ce&&(globalThis.addEventListener("unhandledrejection",ot),globalThis.addEventListener("error",nt))}let Ge,Ke;function Xe(e){Ke&&Ke(e),et(e,Ne.exitReason)}function Ye(e){var t;if(Ge&&Ge(e||Ne.exitReason),(null===(t=Ne.config)||void 0===t?void 0:t.dumpThreadsOnNonZeroExit)&&Ue.mono_wasm_print_thread_dump&&void 0===Ne.exitCode)try{Ue.mono_wasm_print_thread_dump()}catch(e){}et(1,e||Ne.exitReason)}function et(t,o){var n,r;const i=o&&"object"==typeof o;t=i&&"number"==typeof o.status?o.status:void 0===t?-1:t;const s=i&&"string"==typeof o.message?o.message:""+o;(o=i?o:Ue.ExitStatus?function(e,t){const o=new Ue.ExitStatus(e);return o.message=t,o.toString=()=>t,o}(t,s):new Error("Exit with code "+t+" "+s)).status=t,o.message||(o.message=s);const a=""+(o.stack||(new Error).stack);try{Object.defineProperty(o,"stack",{get:()=>a})}catch(e){}const l=!!o.silent;if(o.silent=!0,Je())Ne.diagnosticTracing&&h("mono_exit called after exit");else{try{Be.onAbort==Ye&&(Be.onAbort=Ge),Be.onExit==Xe&&(Be.onExit=Ke),Ce&&(globalThis.removeEventListener("unhandledrejection",ot),globalThis.removeEventListener("error",nt)),Ue.runtimeReady?(Ue.jiterpreter_dump_stats&&Ue.jiterpreter_dump_stats(!1),0===t&&(null===(n=Ne.config)||void 0===n?void 0:n.interopCleanupOnExit)&&Ue.forceDisposeProxies(!0,!0),e&&0!==t&&(null===(r=Ne.config)||void 0===r?void 0:r.dumpThreadsOnNonZeroExit)&&Ue.dumpThreads()):(Ne.diagnosticTracing&&h(`abort_startup, reason: ${o}`),function(e){Ne.allDownloadsQueued.promise_control.reject(e),Ne.allDownloadsFinished.promise_control.reject(e),Ne.afterConfigLoaded.promise_control.reject(e),Ne.wasmCompilePromise.promise_control.reject(e),Ne.runtimeModuleLoaded.promise_control.reject(e),Ue.dotnetReady&&(Ue.dotnetReady.promise_control.reject(e),Ue.afterInstantiateWasm.promise_control.reject(e),Ue.beforePreInit.promise_control.reject(e),Ue.afterPreInit.promise_control.reject(e),Ue.afterPreRun.promise_control.reject(e),Ue.beforeOnRuntimeInitialized.promise_control.reject(e),Ue.afterOnRuntimeInitialized.promise_control.reject(e),Ue.afterPostRun.promise_control.reject(e))}(o))}catch(e){y("mono_exit A failed",e)}try{l||(function(e,t){if(0!==e&&t){const e=Ue.ExitStatus&&t instanceof Ue.ExitStatus?h:v;"string"==typeof t?e(t):(void 0===t.stack&&(t.stack=(new Error).stack+""),t.message?e(Ue.stringify_as_error_with_stack?Ue.stringify_as_error_with_stack(t.message+"\n"+t.stack):t.message+"\n"+t.stack):e(JSON.stringify(t)))}!Pe&&Ne.config&&(Ne.config.logExitCode?Ne.config.forwardConsoleLogsToWS?S("WASM EXIT "+e):b("WASM EXIT "+e):Ne.config.forwardConsoleLogsToWS&&S())}(t,o),function(e){if(Ce&&!Pe&&Ne.config&&Ne.config.appendElementOnExit&&document){const t=document.createElement("label");t.id="tests_done",0!==e&&(t.style.background="red"),t.innerHTML=""+e,document.body.appendChild(t)}}(t))}catch(e){y("mono_exit B failed",e)}Ne.exitCode=t,Ne.exitReason||(Ne.exitReason=o),!Pe&&Ue.runtimeReady&&Be.runtimeKeepalivePop()}if(Ne.config&&Ne.config.asyncFlushOnExit&&0===t)throw(async()=>{try{await async function(){try{const e=await import(/*! webpackIgnore: true */"process"),t=e=>new Promise(((t,o)=>{e.on("error",o),e.end("","utf8",t)})),o=t(e.stderr),n=t(e.stdout);let r;const i=new Promise((e=>{r=setTimeout((()=>e("timeout")),1e3)}));await Promise.race([Promise.all([n,o]),i]),clearTimeout(r)}catch(e){v(`flushing std* streams failed: ${e}`)}}()}finally{tt(t,o)}})(),o;tt(t,o)}function tt(e,t){if(Pe&&Ue.runtimeReady&&Ue.nativeAbort)throw Ue.nativeAbort(t),t;if(Ue.runtimeReady&&Ue.nativeExit)try{Ue.nativeExit(e)}catch(e){!Ue.ExitStatus||e instanceof Ue.ExitStatus||y("set_exit_code_and_quit_now failed: "+e.toString())}if(0!==e||!Ce)throw De&&ze.process?ze.process.exit(e):Ue.quit&&Ue.quit(e,t),t}function ot(e){rt(e,e.reason,"rejection")}function nt(e){rt(e,e.error,"error")}function rt(e,t,o){e.preventDefault();try{t||(t=new Error("Unhandled "+o)),void 0===t.stack&&(t.stack=(new Error).stack),t.stack=t.stack+"",t.silent||(v("Unhandled error:",t),et(1,t))}catch(e){}}!function(e){if(We)throw new Error("Loader module already loaded");We=!0,Ue=e.runtimeHelpers,Ne=e.loaderHelpers,Le=e.diagnosticHelpers,$e=e.api,ze=e.internal,Object.assign($e,{INTERNAL:ze,invokeLibraryInitializers:ve}),Object.assign(e.module,{config:Ee(Fe,{environmentVariables:{}})});const r={mono_wasm_bindings_is_ready:!1,config:e.module.config,diagnosticTracing:!1,nativeAbort:e=>{throw e||new Error("abort")},nativeExit:e=>{throw new Error("exit:"+e)}},l={gitHash:"4099f83977f4d29604a9aeb971fb0a7bc1d5f699",config:e.module.config,diagnosticTracing:!1,maxParallelDownloads:16,enableDownloadRetry:!0,_loaded_files:[],loadedFiles:[],loadedAssemblies:[],libraryInitializers:[],workerNextNumber:1,actual_downloaded_assets_count:0,actual_instantiated_assets_count:0,expected_downloaded_assets_count:0,expected_instantiated_assets_count:0,afterConfigLoaded:i(),allDownloadsQueued:i(),allDownloadsFinished:i(),wasmCompilePromise:i(),runtimeModuleLoaded:i(),loadingWorkers:i(),is_exited:Je,is_runtime_running:He,assert_runtime_running:Ze,mono_exit:et,createPromiseController:i,getPromiseController:s,assertIsControllablePromise:a,mono_download_assets:re,resolve_single_asset_path:oe,setup_proxy_console:R,set_thread_prefix:p,installUnhandledErrorHandler:Qe,retrieve_asset_download:ae,invokeLibraryInitializers:ve,isDebuggingSupported:Ae,exceptions:t,simd:n,relaxedSimd:o};Object.assign(Ue,r),Object.assign(Ne,l)}(Ve);let it,st,at,lt=!1,ct=!1;async function dt(e){if(!ct){if(ct=!0,Ce&&Ne.config.forwardConsoleLogsToWS&&void 0!==globalThis.WebSocket&&R("main",globalThis.console,globalThis.location.origin),Be||qe(!1,"Null moduleConfig"),Ne.config||qe(!1,"Null moduleConfig.config"),"function"==typeof e){const t=e(Ve.api);if(t.ready)throw new Error("Module.ready couldn't be redefined.");Object.assign(Be,t),Te(Be,t)}else{if("object"!=typeof e)throw new Error("Can't use moduleFactory callback of createDotnetRuntime function.");Te(Be,e)}await async function(e){if(De){const e=await import(/*! webpackIgnore: true */"process"),t=14;if(e.versions.node.split(".")[0]<t)throw new Error(`NodeJS at '${e.execPath}' has too low version '${e.versions.node}', please use at least ${t}. See also https://aka.ms/dotnet-wasm-features`)}const t=/*! webpackIgnore: true */import.meta.url,o=t.indexOf("?");var n;if(o>0&&(Ne.modulesUniqueQuery=t.substring(o)),Ne.scriptUrl=t.replace(/\\/g,"/").replace(/[?#].*/,""),Ne.scriptDirectory=(n=Ne.scriptUrl).slice(0,n.lastIndexOf("/"))+"/",Ne.locateFile=e=>"URL"in globalThis&&globalThis.URL!==P?new URL(e,Ne.scriptDirectory).toString():L(e)?e:Ne.scriptDirectory+e,Ne.fetch_like=C,Ne.out=console.log,Ne.err=console.error,Ne.onDownloadResourceProgress=e.onDownloadResourceProgress,Ce&&globalThis.navigator){const e=globalThis.navigator,t=e.userAgentData&&e.userAgentData.brands;t&&t.length>0?Ne.isChromium=t.some((e=>"Google Chrome"===e.brand||"Microsoft Edge"===e.brand||"Chromium"===e.brand)):e.userAgent&&(Ne.isChromium=e.userAgent.includes("Chrome"),Ne.isFirefox=e.userAgent.includes("Firefox"))}ze.require=De?await import(/*! webpackIgnore: true */"module").then((e=>e.createRequire(/*! webpackIgnore: true */import.meta.url))):Promise.resolve((()=>{throw new Error("require not supported")})),void 0===globalThis.URL&&(globalThis.URL=P)}(Be)}}async function ut(e){return await dt(e),Ge=Be.onAbort,Ke=Be.onExit,Be.onAbort=Ye,Be.onExit=Xe,Be.ENVIRONMENT_IS_PTHREAD?async function(){(function(){const e=new MessageChannel,t=e.port1,o=e.port2;t.addEventListener("message",(e=>{var n,r;n=JSON.parse(e.data.config),r=JSON.parse(e.data.monoThreadInfo),lt?Ne.diagnosticTracing&&h("mono config already received"):(Ee(Ne.config,n),Ue.monoThreadInfo=r,je(),Ne.diagnosticTracing&&h("mono config received"),lt=!0,Ne.afterConfigLoaded.promise_control.resolve(Ne.config),Ce&&n.forwardConsoleLogsToWS&&void 0!==globalThis.WebSocket&&Ne.setup_proxy_console("worker-idle",console,globalThis.location.origin)),t.close(),o.close()}),{once:!0}),t.start(),self.postMessage({[l]:{monoCmd:"preload",port:o}},[o])})(),await Ne.afterConfigLoaded.promise,function(){const e=Ne.config;e.assets||qe(!1,"config.assets must be defined");for(const t of e.assets)ee(t),K[t.behavior]&&F.push(t)}(),setTimeout((async()=>{try{await re()}catch(e){et(1,e)}}),0);const e=ft(),t=await Promise.all(e);return await mt(t),Be}():async function(){var e;await Se(Be),se();const t=ft();(async function(){try{const e=oe("dotnetwasm");await le(e),e&&e.pendingDownloadInternal&&e.pendingDownloadInternal.response||qe(!1,"Can't load dotnet.native.wasm");const t=await e.pendingDownloadInternal.response,o=t.headers&&t.headers.get?t.headers.get("Content-Type"):void 0;let n;if("function"==typeof WebAssembly.compileStreaming&&"application/wasm"===o)n=await WebAssembly.compileStreaming(t);else{Ce&&"application/wasm"!==o&&y('WebAssembly resource does not have the expected content type "application/wasm", so falling back to slower ArrayBuffer instantiation.');const e=await t.arrayBuffer();Ne.diagnosticTracing&&h("instantiate_wasm_module buffered"),n=Me?await Promise.resolve(new WebAssembly.Module(e)):await WebAssembly.compile(e)}e.pendingDownloadInternal=null,e.pendingDownload=null,e.buffer=null,e.moduleExports=null,Ne.wasmCompilePromise.promise_control.resolve(n)}catch(e){Ne.wasmCompilePromise.promise_control.reject(e)}})(),setTimeout((async()=>{try{k(),function(){const e=oe("js-module-threads"),t=[];for(let o=0;o<Ne.config.pthreadPoolInitialSize;o++){const o=Ne.workerNextNumber++,n=new Worker(e.resolvedUrl,{name:"dotnet-worker-"+o.toString().padStart(3,"0"),type:"module"});n.info={workerNumber:o,pthreadId:0,reuseCount:0,updateCount:0,threadPrefix:"          -    ",threadName:"emscripten-pool"},t.push(n)}Ne.loadingWorkers.promise_control.resolve(t)}(),await re()}catch(e){et(1,e)}}),0);const o=await Promise.all(t);return await mt(o),await Ue.dotnetReady.promise,await ye(null===(e=Ne.config.resources)||void 0===e?void 0:e.modulesAfterRuntimeReady),await ve("onRuntimeReady",[Ve.api]),$e}()}function ft(){const e=oe("js-module-runtime"),t=oe("js-module-native");if(it&&st)return[it,st,at];"object"==typeof e.moduleExports?it=e.moduleExports:(Ne.diagnosticTracing&&h(`Attempting to import '${e.resolvedUrl}' for ${e.name}`),it=import(/*! webpackIgnore: true */e.resolvedUrl)),"object"==typeof t.moduleExports?st=t.moduleExports:(Ne.diagnosticTracing&&h(`Attempting to import '${t.resolvedUrl}' for ${t.name}`),st=import(/*! webpackIgnore: true */t.resolvedUrl));const o=te("js-module-diagnostics");return o&&("object"==typeof o.moduleExports?at=o.moduleExports:(Ne.diagnosticTracing&&h(`Attempting to import '${o.resolvedUrl}' for ${o.name}`),at=import(/*! webpackIgnore: true */o.resolvedUrl))),[it,st,at]}async function mt(e){const{initializeExports:t,initializeReplacements:o,configureRuntimeStartup:n,configureEmscriptenStartup:r,configureWorkerStartup:i,setRuntimeGlobals:s,passEmscriptenInternals:a}=e[0],{default:l}=e[1],c=e[2];s(Ve),t(Ve),c&&c.setRuntimeGlobals(Ve),await n(Be),Ne.runtimeModuleLoaded.promise_control.resolve(),l((e=>(Object.assign(Be,{ready:e.ready,__dotnet_runtime:{initializeReplacements:o,configureEmscriptenStartup:r,configureWorkerStartup:i,passEmscriptenInternals:a}}),Be))).catch((e=>{if(e.message&&e.message.toLowerCase().includes("out of memory"))throw new Error(".NET runtime has failed to start, because too much memory was requested. Please decrease the memory by adjusting EmccMaximumHeapSize. See also https://aka.ms/dotnet-wasm-features");throw e}))}const gt=new class{withModuleConfig(e){try{return Te(Be,e),this}catch(e){throw et(1,e),e}}withOnConfigLoaded(e){try{return Te(Be,{onConfigLoaded:e}),this}catch(e){throw et(1,e),e}}withConsoleForwarding(){try{return Ee(Fe,{forwardConsoleLogsToWS:!0}),this}catch(e){throw et(1,e),e}}withExitOnUnhandledError(){try{return Ee(Fe,{exitOnUnhandledError:!0}),Qe(),this}catch(e){throw et(1,e),e}}withAsyncFlushOnExit(){try{return Ee(Fe,{asyncFlushOnExit:!0}),this}catch(e){throw et(1,e),e}}withExitCodeLogging(){try{return Ee(Fe,{logExitCode:!0}),this}catch(e){throw et(1,e),e}}withElementOnExit(){try{return Ee(Fe,{appendElementOnExit:!0}),this}catch(e){throw et(1,e),e}}withInteropCleanupOnExit(){try{return Ee(Fe,{interopCleanupOnExit:!0}),this}catch(e){throw et(1,e),e}}withDumpThreadsOnNonZeroExit(){try{return Ee(Fe,{dumpThreadsOnNonZeroExit:!0}),this}catch(e){throw et(1,e),e}}withWaitingForDebugger(e){try{return Ee(Fe,{waitForDebugger:e}),this}catch(e){throw et(1,e),e}}withInterpreterPgo(e,t){try{return Ee(Fe,{interpreterPgo:e,interpreterPgoSaveDelay:t}),Fe.runtimeOptions?Fe.runtimeOptions.push("--interp-pgo-recording"):Fe.runtimeOptions=["--interp-pgo-recording"],this}catch(e){throw et(1,e),e}}withConfig(e){try{return Ee(Fe,e),this}catch(e){throw et(1,e),e}}withConfigSrc(e){try{return e&&"string"==typeof e||qe(!1,"must be file path or URL"),Te(Be,{configSrc:e}),this}catch(e){throw et(1,e),e}}withVirtualWorkingDirectory(e){try{return e&&"string"==typeof e||qe(!1,"must be directory path"),Ee(Fe,{virtualWorkingDirectory:e}),this}catch(e){throw et(1,e),e}}withEnvironmentVariable(e,t){try{const o={};return o[e]=t,Ee(Fe,{environmentVariables:o}),this}catch(e){throw et(1,e),e}}withEnvironmentVariables(e){try{return e&&"object"==typeof e||qe(!1,"must be dictionary object"),Ee(Fe,{environmentVariables:e}),this}catch(e){throw et(1,e),e}}withDiagnosticTracing(e){try{return"boolean"!=typeof e&&qe(!1,"must be boolean"),Ee(Fe,{diagnosticTracing:e}),this}catch(e){throw et(1,e),e}}withDebugging(e){try{return null!=e&&"number"==typeof e||qe(!1,"must be number"),Ee(Fe,{debugLevel:e}),this}catch(e){throw et(1,e),e}}withApplicationArguments(...e){try{return e&&Array.isArray(e)||qe(!1,"must be array of strings"),Ee(Fe,{applicationArguments:e}),this}catch(e){throw et(1,e),e}}withRuntimeOptions(e){try{return e&&Array.isArray(e)||qe(!1,"must be array of strings"),Fe.runtimeOptions?Fe.runtimeOptions.push(...e):Fe.runtimeOptions=e,this}catch(e){throw et(1,e),e}}withMainAssembly(e){try{return Ee(Fe,{mainAssemblyName:e}),this}catch(e){throw et(1,e),e}}withApplicationArgumentsFromQuery(){try{if(!globalThis.window)throw new Error("Missing window to the query parameters from");if(void 0===globalThis.URLSearchParams)throw new Error("URLSearchParams is supported");const e=new URLSearchParams(globalThis.window.location.search).getAll("arg");return this.withApplicationArguments(...e)}catch(e){throw et(1,e),e}}withApplicationEnvironment(e){try{return Ee(Fe,{applicationEnvironment:e}),this}catch(e){throw et(1,e),e}}withApplicationCulture(e){try{return Ee(Fe,{applicationCulture:e}),this}catch(e){throw et(1,e),e}}withResourceLoader(e){try{return Ne.loadBootResource=e,this}catch(e){throw et(1,e),e}}async download(){try{await async function(){dt(Be),await Se(Be),se(),k(),re(),await Ne.allDownloadsFinished.promise}()}catch(e){throw et(1,e),e}}async create(){try{return this.instance||(this.instance=await async function(){return await ut(Be),Ve.api}()),this.instance}catch(e){throw et(1,e),e}}async run(){try{return Be.config||qe(!1,"Null moduleConfig.config"),this.instance||await this.create(),this.instance.runMainAndExit()}catch(e){throw et(1,e),e}}},pt=et,ht=ut;Me||"function"==typeof globalThis.URL||qe(!1,"This browser/engine doesn't support URL API. Please use a modern version. See also https://aka.ms/dotnet-wasm-features"),"function"!=typeof globalThis.BigInt64Array&&qe(!1,"This browser/engine doesn't support BigInt64Array API. Please use a modern version. See also https://aka.ms/dotnet-wasm-features"),(Me||De)&&qe(!1,"This build of dotnet is multi-threaded, it doesn't support shell environments like V8 or NodeJS. See also https://aka.ms/dotnet-wasm-features"),void 0===globalThis.SharedArrayBuffer&&qe(!1,"SharedArrayBuffer is not enabled on this page. Please use a modern browser and set Cross-Origin-Opener-Policy and Cross-Origin-Embedder-Policy http headers. See also https://aka.ms/dotnet-wasm-features"),"function"!=typeof globalThis.EventTarget&&qe(!1,"This browser/engine doesn't support EventTarget API. Please use a modern version. See also https://aka.ms/dotnet-wasm-features"),gt.withConfig(/*json-start*/{
  "mainAssemblyName": "OpenUtauMobile.Browser",
  "resources": {
    "hash": "sha256-hJhEAS2eg8hyU8NKbh0ASGULQPjm6Rzi7QZvJ8YBHZ4=",
    "jsModuleWorker": [
      {
        "name": "dotnet.native.worker.8duaz980cg.mjs"
      }
    ],
    "jsModuleNative": [
      {
        "name": "dotnet.native.wmjklct5rk.js"
      }
    ],
    "jsModuleRuntime": [
      {
        "name": "dotnet.runtime.0gb3pwnc69.js"
      }
    ],
    "wasmNative": [
      {
        "name": "dotnet.native.x0sksr5fup.wasm",
        "hash": "sha256-4cIe6MSbXFlo8U3hqcPdy75YLBJCWIgCppUO4lwCSGc=",
        "cache": "force-cache"
      }
    ],
    "icu": [
      {
        "virtualPath": "icudt_CJK.dat",
        "name": "icudt_CJK.tjcz0u77k5.dat",
        "hash": "sha256-SZLtQnRc0JkwqHab0VUVP7T3uBPSeYzxzDnpxPpUnHk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "icudt_EFIGS.dat",
        "name": "icudt_EFIGS.tptq2av103.dat",
        "hash": "sha256-8fItetYY8kQ0ww6oxwTLiT3oXlBwHKumbeP2pRF4yTc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "icudt_no_CJK.dat",
        "name": "icudt_no_CJK.lfu7j35m59.dat",
        "hash": "sha256-L7sV7NEYP37/Qr2FPCePo5cJqRgTXRwGHuwF5Q+0Nfs=",
        "cache": "force-cache"
      }
    ],
    "coreAssembly": [
      {
        "virtualPath": "System.Collections.Concurrent.wasm",
        "name": "System.Collections.Concurrent.i2cl0jnp53.wasm",
        "hash": "sha256-WgxJNXCqh0Eo4CH5RYTXIpWk+7damDsseQAsY3QBFCM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Collections.wasm",
        "name": "System.Collections.uj57w16h0j.wasm",
        "hash": "sha256-JoQDGI4J72aMvAnjHD7fqhl/9xQez+iuatKt36JZbIg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Private.CoreLib.wasm",
        "name": "System.Private.CoreLib.4diako1evn.wasm",
        "hash": "sha256-iAC3zWQpks39lKmGqs2NZASY1IqFo5MpTeVw/XTLR4w=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.InteropServices.JavaScript.wasm",
        "name": "System.Runtime.InteropServices.JavaScript.cxhqwr5ej0.wasm",
        "hash": "sha256-QBmMHxPdbVIOpLDuS5iYDMZj1/6lQLfE/4RJBmb5wCQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.Channels.wasm",
        "name": "System.Threading.Channels.mhtcyyhiw9.wasm",
        "hash": "sha256-tiWREhc/NKnKjC54pylsvw3jZz3KTCwkL6sPs2NVSf0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.ThreadPool.wasm",
        "name": "System.Threading.ThreadPool.ah674or8eq.wasm",
        "hash": "sha256-ck+2BFFTyj/7EEyZSn/rjZlC1qHDHVJYdpMeKIQk2jQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.wasm",
        "name": "System.Threading.wt8g6a228p.wasm",
        "hash": "sha256-TKGJACY58J7UynuXmjIkp0o5ZKJXFir96RVj3PwCvDE=",
        "cache": "force-cache"
      }
    ],
    "assembly": [
      {
        "virtualPath": "Avalonia.Base.wasm",
        "name": "Avalonia.Base.omu0nir5uw.wasm",
        "hash": "sha256-EIrZfUEG431uJVgU6tuS5uCtqCQTEGMk1ngHWDzYEV0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Avalonia.Browser.wasm",
        "name": "Avalonia.Browser.2g5q32r3el.wasm",
        "hash": "sha256-EjkYIct0VIYsW5lOajZZMuPf6ymNlGSveQjyyNFGaDU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Avalonia.Controls.wasm",
        "name": "Avalonia.Controls.xqmax8f88h.wasm",
        "hash": "sha256-V50FWWcxtNSv1L823hhT4i2l5mAarZMAN/SNT1/rPmU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Avalonia.DesignerSupport.wasm",
        "name": "Avalonia.DesignerSupport.qd6gxkzyh1.wasm",
        "hash": "sha256-sjrpSQNbr6idPjkuyLqC8Da2s7XtywHwiZYGp0zyVfE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Avalonia.Dialogs.wasm",
        "name": "Avalonia.Dialogs.8ob2qmu52m.wasm",
        "hash": "sha256-aMa0XJWOqk++p+Tktl3gKkGnc+zl1KyacZf/zQDIuog=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Avalonia.Fonts.Inter.wasm",
        "name": "Avalonia.Fonts.Inter.62sk89zq9j.wasm",
        "hash": "sha256-DkeyJKzTAtIb5P0gic5K1vVFYK1fjpsw//x6fbjEFSI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Avalonia.HarfBuzz.wasm",
        "name": "Avalonia.HarfBuzz.k2u7kz65m1.wasm",
        "hash": "sha256-/DPWKVwEOZZ3fzdftXjx5QXfbIobL08OqtqWFhc8/Xs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Avalonia.Markup.Xaml.wasm",
        "name": "Avalonia.Markup.Xaml.ldkvx31fjc.wasm",
        "hash": "sha256-Fwqk70V8h/3KlnnU+Gpv5EPYgIYLIKrqGjV8NSWLEsI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Avalonia.Markup.wasm",
        "name": "Avalonia.Markup.xyf8hhi6ym.wasm",
        "hash": "sha256-J8jSFjqFCkLHigEWa3nqvW1BWauqsBU1yWMN3utrXnA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Avalonia.Metal.wasm",
        "name": "Avalonia.Metal.ha8pwfxt37.wasm",
        "hash": "sha256-x/28bOyn2cHQFumHfSxui2T8ZftqPqx0OzF2Zcr3zPQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Avalonia.MicroCom.wasm",
        "name": "Avalonia.MicroCom.3ttvb70srh.wasm",
        "hash": "sha256-WfCGpZcrdWu/hIO7oigW//8QMy7E44RNFprLlUIZTn4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Avalonia.OpenGL.wasm",
        "name": "Avalonia.OpenGL.95wxv6fp48.wasm",
        "hash": "sha256-/adsrZcxRrZuRQo3t0aAJJHXR396pMH4odGjioEPJek=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Avalonia.Remote.Protocol.wasm",
        "name": "Avalonia.Remote.Protocol.finampxoke.wasm",
        "hash": "sha256-eYDHXTsxs23JDaiIC/vBIBtrOQKeJg3FogmtI0DzhyE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Avalonia.Skia.wasm",
        "name": "Avalonia.Skia.8vqr8nyb03.wasm",
        "hash": "sha256-xGTOG39wr+kynaHiJ7kje9xmrSvan7kExnh4Oe3Cdhs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Avalonia.Vulkan.wasm",
        "name": "Avalonia.Vulkan.xime89t6hf.wasm",
        "hash": "sha256-iYUu58WrSB5jBkcla8dQwYGz06yoX4YjTap+SPZ4+Vk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Avalonia.wasm",
        "name": "Avalonia.b4lwe5vhmf.wasm",
        "hash": "sha256-FZsFJ8m3de2Opbjy0MKXMj2TCiqFOq3N8sjbn4gn9j8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Concentus.Oggfile.wasm",
        "name": "Concentus.Oggfile.maxygg8oxp.wasm",
        "hash": "sha256-Dq3gpzU73I0h/bSrdoi74DJDzuZIn8xYHaH5Z9ym2qA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Concentus.wasm",
        "name": "Concentus.wvbz1m7r6q.wasm",
        "hash": "sha256-FPCKtpRUYxbpYDyK7AgkWmQBJbPZluLjaPV0JUB+SM4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "DialogHost.Avalonia.wasm",
        "name": "DialogHost.Avalonia.yfqelk80g3.wasm",
        "hash": "sha256-ov3BSOQ5eAihDKdp/gn2DLMBqevvHpKc8tSZMHe5+HM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "DynamicData.wasm",
        "name": "DynamicData.7nmvv7bgy7.wasm",
        "hash": "sha256-ndA8BK9kRtuNqgKySbwvjY6TMhnMtJC6KoXurkYXbCg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "ExCSS.wasm",
        "name": "ExCSS.jbixd2k5bc.wasm",
        "hash": "sha256-ATAW0isJpz7mjLGpEjkTzbHywbCFEJIXm3eAaOFzF7g=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "FftFlat.wasm",
        "name": "FftFlat.lskel0hizm.wasm",
        "hash": "sha256-O9r/qR/aot/rESQDhcWZE3M8L57+FpYfkTjxqlVSE04=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "HarfBuzzSharp.wasm",
        "name": "HarfBuzzSharp.skj2rjd285.wasm",
        "hash": "sha256-ZLlju1KLIdabrxDX12d4wrYNpCKTakVe2knm60pqduY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Humanizer.wasm",
        "name": "Humanizer.i178n7uvlk.wasm",
        "hash": "sha256-pmjwN1oCPs5KMzcSwYzBGg7Pvcdv1TAodTMMUOQZBJ0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "IconPacks.Avalonia.Core.wasm",
        "name": "IconPacks.Avalonia.Core.b59k1hhn1d.wasm",
        "hash": "sha256-T8A5EZdZ1AAS9+PYNBuYLoPrWyc+eitLrS+BTCnNcPU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "IconPacks.Avalonia.Fontaudio.wasm",
        "name": "IconPacks.Avalonia.Fontaudio.a5ibsm57ca.wasm",
        "hash": "sha256-Ygt9kJB2vKy5ezfMIKLB4FWSXpSQmjFvwT2YMqz11NQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "IconPacks.Avalonia.PhosphorIcons.wasm",
        "name": "IconPacks.Avalonia.PhosphorIcons.aj01n59207.wasm",
        "hash": "sha256-Cozc+xJO30CsxvKY7PJbJbnWQOqJ/dutrO5wLv3Tk8g=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Ignore.wasm",
        "name": "Ignore.2d1h80sp0q.wasm",
        "hash": "sha256-JimrakSwdq1NL6Gv2rEYzFrDNh4mWHvOftk/esJ2OK8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Json.More.wasm",
        "name": "Json.More.dp8ek926n5.wasm",
        "hash": "sha256-kRs5mtPSMmpnrgsiMO4ZL85KDz8la82/07x0ZNvDVws=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "JsonPointer.Net.wasm",
        "name": "JsonPointer.Net.vfyexjrfdp.wasm",
        "hash": "sha256-2wIgLuPyyDQBHtYtIvE9p0X+Lmqcri3p74pbJqS1xgA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "JsonSchema.Net.wasm",
        "name": "JsonSchema.Net.5vebppzy7s.wasm",
        "hash": "sha256-/3JSfZZOtT/EaJne6TKuhCgeI9uJsMNTpGZqTZGUG4o=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "K4os.Hash.xxHash.wasm",
        "name": "K4os.Hash.xxHash.w1chn5s8re.wasm",
        "hash": "sha256-RMKp2sDkjrILb+9veM1MY6+B1PNUDMzdVplbBwlgn08=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Kana.wasm",
        "name": "Kana.0ewg5yfxca.wasm",
        "hash": "sha256-CNs9i8YMgKW4tM+jFcAuu9xJsvKdRN1q1Gaz7aCWJdA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "MaterialColorUtilities.wasm",
        "name": "MaterialColorUtilities.b9xnadz957.wasm",
        "hash": "sha256-HxYM0angy80iU9amf+02os4KcWhKn4YC4PATyFhf2Sk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Melanchall.DryWetMidi.wasm",
        "name": "Melanchall.DryWetMidi.5mrkeukw16.wasm",
        "hash": "sha256-M/Hs6ggmyY/XamJmfR3+v6E1RU8gUXrcd0uAekuewno=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "MeltySynth.wasm",
        "name": "MeltySynth.5nxtpqni1d.wasm",
        "hash": "sha256-b18FsmWFVgq9bxgg0aM6cH4w2rYvo1BnOVIQCzxWD/w=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "MicroCom.Runtime.wasm",
        "name": "MicroCom.Runtime.viw2o55mwq.wasm",
        "hash": "sha256-Jy3LZVB8MBkdFkecGnunWSDdyD2xZAIqfIRAd29LhYI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.CSharp.wasm",
        "name": "Microsoft.CSharp.y5egvh5dw4.wasm",
        "hash": "sha256-tp7PybBDpjkFaOIvgWosGHAZMoWBn8ys5LbJayJUPo0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.ML.OnnxRuntime.wasm",
        "name": "Microsoft.ML.OnnxRuntime.ymz1hqyho8.wasm",
        "hash": "sha256-qiO04v0tAV1vilJKxivskhZgu+tIx5nMSZ/6st6lZCY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.VisualBasic.Core.wasm",
        "name": "Microsoft.VisualBasic.Core.t3z2ljbqbo.wasm",
        "hash": "sha256-x1DmyuKOwlqOwHCijLMMxZX+t0MTTEt6YrCCdax+0Eg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.VisualBasic.wasm",
        "name": "Microsoft.VisualBasic.uskwtz8otz.wasm",
        "hash": "sha256-sqVFTMwqXwbqmp9bWMZAfcicx9ISog3dLwobQ6RX2oY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Win32.Primitives.wasm",
        "name": "Microsoft.Win32.Primitives.xg1bpagxut.wasm",
        "hash": "sha256-z8KzhE0ex4eNyeZTMp+LVTWoabEqXpfCVMyQL2lR5M0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Win32.Registry.wasm",
        "name": "Microsoft.Win32.Registry.02qpyfuc4e.wasm",
        "hash": "sha256-2NFbOQz/tt7+C7DDlkMzT5gvpSBD1h0b/OkWALbu2Vg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "NAudio.Asio.wasm",
        "name": "NAudio.Asio.00rfw9qkdu.wasm",
        "hash": "sha256-cLq4+4itLXgdGHwbpxRkkFknjpAepyex7r+WFhrZvy0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "NAudio.Core.wasm",
        "name": "NAudio.Core.j0335j43gw.wasm",
        "hash": "sha256-A4MDi1qeGex9OG+wMiBRRbv7kZPfpICDb+ZBy6FcRzQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "NAudio.Flac.wasm",
        "name": "NAudio.Flac.uchlyglljc.wasm",
        "hash": "sha256-Hn17mQKqmkNkfeaTEGWsUpWNlvrmYWTxG1+ktQXxyvk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "NAudio.Midi.wasm",
        "name": "NAudio.Midi.h35gybwxle.wasm",
        "hash": "sha256-zSu95Z/s6YcZf/x2prplNLePWLWv7GOxINK1IeXe/OA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "NAudio.Vorbis.wasm",
        "name": "NAudio.Vorbis.mq08s2twvc.wasm",
        "hash": "sha256-QpYbPoUbm/vUZoqvx5ktw2gV2bjtUvEgnLhvpHtd7oA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "NAudio.Wasapi.wasm",
        "name": "NAudio.Wasapi.luvxod8qds.wasm",
        "hash": "sha256-fYshxlURqo93wR4P9TUIonA8YLfXyKEvfqJ+5t61LEE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "NAudio.WinMM.wasm",
        "name": "NAudio.WinMM.on5foakwha.wasm",
        "hash": "sha256-nHWlTd7j/qT4iMkM6W//Hv0qwpA+3XVEK7N5coduAwY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "NAudio.wasm",
        "name": "NAudio.ijyss599m5.wasm",
        "hash": "sha256-3j15rJBDgE4SS0QPTvZ+/4ZIT7lnCS92t4An/4+a/cI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "NLayer.NAudioSupport.wasm",
        "name": "NLayer.NAudioSupport.ippe7rmpx2.wasm",
        "hash": "sha256-psy1Daw8eIUoQufm+n99JhzpZuMWlVXo1GTkJ77tI9s=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "NLayer.wasm",
        "name": "NLayer.svsgovzgj1.wasm",
        "hash": "sha256-OBq3zLLKPvw1iBdudFgHe/eUyBALPmP7bQ5EQX95HjY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "NVorbis.wasm",
        "name": "NVorbis.182zkb2e0i.wasm",
        "hash": "sha256-/8ljo6M1M6r2Ejnne+c8SN7e45mr40w3W2ENZUwscsA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "NWaves.wasm",
        "name": "NWaves.bx582cogy2.wasm",
        "hash": "sha256-Ab4POi9bKjLDfJ5R83B+LZMUTNlTd4FEiqqInHsN3DY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Newtonsoft.Json.wasm",
        "name": "Newtonsoft.Json.qkbufwhni2.wasm",
        "hash": "sha256-GlXMWKvDs45M2pACoR3Y4Qh8mcrOZGljqmvJY+6JZ5s=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "OpenUtau.Core.wasm",
        "name": "OpenUtau.Core.lrdc2xtjtl.wasm",
        "hash": "sha256-TzmQjijk11Dk0jFzlscGJnwBHKCyyLZ3vCoqMeVNGNg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "OpenUtauMobile.Browser.wasm",
        "name": "OpenUtauMobile.Browser.ynfxsyz8l0.wasm",
        "hash": "sha256-jmEFu0V3XrwtPr/eKp6Nl8hoD9NXq7IzqXwvnoem6eY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "OpenUtauMobile.wasm",
        "name": "OpenUtauMobile.vffk507i1q.wasm",
        "hash": "sha256-K6BhKqvN6vguligeWsdxJ/b160Ma824RbNWenov/K58=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Pinyin.wasm",
        "name": "Pinyin.nbiw3umomq.wasm",
        "hash": "sha256-w5+yj+ATlMo5IyLo52f0hjWe/SrmpVDWXGrWynjTOCs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "ReactiveUI.wasm",
        "name": "ReactiveUI.95l7pt3n8d.wasm",
        "hash": "sha256-M1z0BeGKL6KNZqYsIpozT8l80TLzFsaOOFNlrn6Zc94=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "ReactiveUI.Avalonia.wasm",
        "name": "ReactiveUI.Avalonia.cfzea3mcnd.wasm",
        "hash": "sha256-KL8T1Rb0hiLf/15I6HrN8KnHuoNgREjLwwciO/xLHwI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "ReactiveUI.Fody.Helpers.wasm",
        "name": "ReactiveUI.Fody.Helpers.tclkecf6xz.wasm",
        "hash": "sha256-HZfJdOt7lLkyhRFKw4lRlMV/K2gDW5ioaRsPTXJHZys=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "SDL3-CS.wasm",
        "name": "SDL3-CS.3z3tjjrl93.wasm",
        "hash": "sha256-oTej1K/cgf3oUbGyhr/Mm8YQGLl+o6QC2XsMxRMDhTU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Serilog.Sinks.Debug.wasm",
        "name": "Serilog.Sinks.Debug.wm4zeothzh.wasm",
        "hash": "sha256-OEANd7H/LtEUuu/2wVTnwdZYptIQAM/dOxu0sU707Z8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Serilog.Sinks.File.wasm",
        "name": "Serilog.Sinks.File.6uk3tlc47x.wasm",
        "hash": "sha256-Pv0RKJ9D13snqPppAb6AGzhtrDn/2UDE2vXRh+kJSC4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Serilog.wasm",
        "name": "Serilog.y4koq7nzm1.wasm",
        "hash": "sha256-8oGNBQtHTs5INsirtJOzcUhKe5mRhzF3sWa+n7plSBE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "SharpCompress.wasm",
        "name": "SharpCompress.aubedeyg5o.wasm",
        "hash": "sha256-cni1mhJAhWkSrdGGg8ekdAarIUFJIP8QMc0X4svlCrU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "SharpJaad.AAC.wasm",
        "name": "SharpJaad.AAC.if83txnh8h.wasm",
        "hash": "sha256-bl5Rd8rR23Anix912Ra7wA7PQIUeIJyjWheaw1+g9T4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "SharpJaad.wasm",
        "name": "SharpJaad.ynkc7sgnoq.wasm",
        "hash": "sha256-YvXQwXX06yWroBT6Ppv1leK3JD2fWhS9nVGWj3X4hII=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "ShimSkiaSharp.wasm",
        "name": "ShimSkiaSharp.z1uv838siw.wasm",
        "hash": "sha256-GeISiovIhRmXc1117GWyeDzXQSieBbwRDhHX7xA+QO0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "SkiaSharp.wasm",
        "name": "SkiaSharp.jplvzyrjai.wasm",
        "hash": "sha256-WUX3pIObMgqBmG3FmMAe+brTVISSmE6jzR95+QNTq3Y=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Splat.Builder.wasm",
        "name": "Splat.Builder.m2lrel3npt.wasm",
        "hash": "sha256-btUb1F+zt0t6YghFAUI4Fbw07ad1PVEtZ86Jrr/13vQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Splat.Core.wasm",
        "name": "Splat.Core.6zbj9wglw9.wasm",
        "hash": "sha256-ntOmXKzsJ42R7kLTomRmxiL+sbAyk8IDI6AKOO3bVmM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Splat.Logging.wasm",
        "name": "Splat.Logging.qwwuw0tpfx.wasm",
        "hash": "sha256-5s0JYbPRm3HFiHvc7aKeRJAjswnfnM2vLo8fKN5yyiY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Splat.wasm",
        "name": "Splat.h69ae4xiai.wasm",
        "hash": "sha256-+Tpsh3Romx9jZ7CpKlnovpHnCVawsyK7Pv/YHwCINd8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Svg.Animation.wasm",
        "name": "Svg.Animation.anmgwr2nhh.wasm",
        "hash": "sha256-piJKucPNay51qu1MNag9wpy4crRmS9LZIyG+Ewr6kZU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Svg.Controls.Skia.Avalonia.wasm",
        "name": "Svg.Controls.Skia.Avalonia.ttipsijux9.wasm",
        "hash": "sha256-bwByOhylAnKR7t2ZnWzB1MFILWjXdeFCc4DpDyMosaA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Svg.Custom.wasm",
        "name": "Svg.Custom.6bpzx9m5rf.wasm",
        "hash": "sha256-HnAvKxwYCbbPvgxzhfD90Eq6yxLRQymB5wsq88qnQ2M=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Svg.Model.wasm",
        "name": "Svg.Model.r20eq9hezv.wasm",
        "hash": "sha256-HVrFHOGGg/LOAPnF/mKkVS7unD5NAzCiIR8QBLi9UZA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Svg.SceneGraph.wasm",
        "name": "Svg.SceneGraph.xhhujx53rx.wasm",
        "hash": "sha256-FdsQcXwUjDpIPtfB9bcwkrRhrOKDGvpLbb6IWrHjzdI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Svg.Skia.wasm",
        "name": "Svg.Skia.jz3d4yirqj.wasm",
        "hash": "sha256-b4G/cVhuH3A9bIpZKOmEXfMlLTlSEzOTww8CugBz9js=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.wasm",
        "name": "System.2a4aao5td2.wasm",
        "hash": "sha256-Km7EzFmQgvZ9P60Isvsy3JZL1MrPCn0UPtfOmD7ZmYI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.AppContext.wasm",
        "name": "System.AppContext.zwajbbu0v2.wasm",
        "hash": "sha256-A5W3fUt3bLEv2t2YvG42xf3utQnvmMFUhiXS5a3bhig=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Buffers.wasm",
        "name": "System.Buffers.eqsisamrga.wasm",
        "hash": "sha256-9oWpWEzLDzUbHKH8YLIpFacaKt0j9AtuPQk++RmtJc0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Collections.Immutable.wasm",
        "name": "System.Collections.Immutable.7hl5l3lm5d.wasm",
        "hash": "sha256-++zMq2/iqbMOV4Vju1UXLXFjcLB/uDK/kxOCjgfDv1A=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Collections.NonGeneric.wasm",
        "name": "System.Collections.NonGeneric.5ww4k80cr2.wasm",
        "hash": "sha256-e8zIP+KJ+RDvSFLFhZcvpMXrhY63uIgGFRtrrhJ93sA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Collections.Specialized.wasm",
        "name": "System.Collections.Specialized.qivw2eedj4.wasm",
        "hash": "sha256-ksHOoitlwCk0c8sXUdSsg4EcIp3iqc+x4XUrJHh8E8E=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.Annotations.wasm",
        "name": "System.ComponentModel.Annotations.hze379fbyo.wasm",
        "hash": "sha256-Y7Z5x82Ohs7u+6k6R2YIX2eDqc7Vvv9yjcwx1tweIvk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.DataAnnotations.wasm",
        "name": "System.ComponentModel.DataAnnotations.1k2ec9g0xq.wasm",
        "hash": "sha256-cVQHI+B5sV1iDvyfZRp8sKAgDLVC/KtojXYoTQuHECU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.EventBasedAsync.wasm",
        "name": "System.ComponentModel.EventBasedAsync.vhsvtc7hgk.wasm",
        "hash": "sha256-Az8ZiAe1bu5gR8DqlbD9KVxanyko7Lf79S2UGybn/mY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.Primitives.wasm",
        "name": "System.ComponentModel.Primitives.ersqlbhrr5.wasm",
        "hash": "sha256-GiUyqn57omBe6wvdjQZU6yV7UcbTIdZN4HWJG4p4coE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.TypeConverter.wasm",
        "name": "System.ComponentModel.TypeConverter.3mgghxdqfq.wasm",
        "hash": "sha256-5SLU2oinTBL/jw+4nKycwFawGkEjxPJmaK3ffPjFhXQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.wasm",
        "name": "System.ComponentModel.d94yhrvqci.wasm",
        "hash": "sha256-70jbIG7btj+1j4rrZ50xkV8sGd5Jw1+bxP77WXPgrhw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Configuration.wasm",
        "name": "System.Configuration.4kzfg9n8bs.wasm",
        "hash": "sha256-PFpD3X9V8BLK8HRUTmlWv8qxZ7DS1vutQVH+HO3wb/o=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Console.wasm",
        "name": "System.Console.na0olw2i9q.wasm",
        "hash": "sha256-gZMwCKmywx2tQM1lk0P7eDKhl7YYcIdpp/TQ+F2NPMI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Core.wasm",
        "name": "System.Core.ao50ih33q9.wasm",
        "hash": "sha256-ukJ4NXcYfb4ShPU0ztrmliHVZ8TD1a/RUQdAB9OVVTI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Data.Common.wasm",
        "name": "System.Data.Common.6ugog9tztn.wasm",
        "hash": "sha256-Ps8rCgOk/phlGdjGSIHWTjGe7HVqzGgO92OuG0a+uW0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Data.DataSetExtensions.wasm",
        "name": "System.Data.DataSetExtensions.kc5yp0kaac.wasm",
        "hash": "sha256-bDcR9ipGLzDFiU3GzRDfJzdwIjcrh5NxrMDynJJt7RU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Data.wasm",
        "name": "System.Data.p39nfwvh5p.wasm",
        "hash": "sha256-K1McY1jB9n+n/A6f6gWi5BpyyWPhE6wgyO1l2COUgaQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.Contracts.wasm",
        "name": "System.Diagnostics.Contracts.1m79vhh6wh.wasm",
        "hash": "sha256-yYFfZO3Z1RtXfg+90F9Rc1OEMe0CYuO2nGq4+/0HOPg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.Debug.wasm",
        "name": "System.Diagnostics.Debug.4mxnrshey0.wasm",
        "hash": "sha256-7IQYm9B+oeEDFZcbOZfq8X4jYfR8hNcr49UqHlq9OWY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.DiagnosticSource.wasm",
        "name": "System.Diagnostics.DiagnosticSource.uowpvyxqpf.wasm",
        "hash": "sha256-vkh/FobbmEto8xkyxt6hYaoHhCONVD5t+5ZPdj4B2x4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.FileVersionInfo.wasm",
        "name": "System.Diagnostics.FileVersionInfo.rkkuezt4kk.wasm",
        "hash": "sha256-q80ymB8EBMZknAQgHG6KHHu+wdNaXnFj8vccW5okWpE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.Process.wasm",
        "name": "System.Diagnostics.Process.4ybe9uh38v.wasm",
        "hash": "sha256-/OTO3cMPmWopMExlHkBKXkC5VeRJGFF/sVlyLpY1LNU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.StackTrace.wasm",
        "name": "System.Diagnostics.StackTrace.5p6825w9i7.wasm",
        "hash": "sha256-F3ax/omtt8GC8+vDp3rVoJeKGlFIGGmBo8YMfDGgCmo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.TextWriterTraceListener.wasm",
        "name": "System.Diagnostics.TextWriterTraceListener.jgu4p6mqie.wasm",
        "hash": "sha256-M+S77VRlDQoLar/82tDbrzAauhfWxWzb7mc0gCDq0xk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.Tools.wasm",
        "name": "System.Diagnostics.Tools.tfjy16lbr2.wasm",
        "hash": "sha256-F+Bh4b3o1irEkaG/yv4TWjdLafOiKxJXwQVXP/2rTYw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.TraceSource.wasm",
        "name": "System.Diagnostics.TraceSource.22jdockseu.wasm",
        "hash": "sha256-RlZNochRQlyZNPtmg30GlT1+OWMKOMKZOH1RuYtefAc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.Tracing.wasm",
        "name": "System.Diagnostics.Tracing.fde8ynmfum.wasm",
        "hash": "sha256-wzhpuj11JVFl6aQVIcWU2l6rh65kUOzpERXg5xkt+zo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Drawing.Primitives.wasm",
        "name": "System.Drawing.Primitives.s2ofo5xsuk.wasm",
        "hash": "sha256-pINlWPbuzkAdHqZUaV+pbHD5PLCmTZa2lque+/0yD5k=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Drawing.wasm",
        "name": "System.Drawing.eil1hx2mol.wasm",
        "hash": "sha256-2mcoaSR+j7SeHsqfNx1H7D3jNIupOAN+YP/Yz+m6vyM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Dynamic.Runtime.wasm",
        "name": "System.Dynamic.Runtime.i1cjtxxh3b.wasm",
        "hash": "sha256-tnTWpRJ6u7961lDQ8mB3L1bjAjXOZVW/Y3+Q77oyUUQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Formats.Asn1.wasm",
        "name": "System.Formats.Asn1.65t0y46red.wasm",
        "hash": "sha256-iqVvBJJVOgZe4Vw5q2bEobUhpc4KFKkWj2xy1GRviB4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Formats.Tar.wasm",
        "name": "System.Formats.Tar.fbmrfx0l2e.wasm",
        "hash": "sha256-RYNXUuGE9OO4xMlUydrJMCiETn0OJG74iJy5AG+f8Uo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Globalization.Calendars.wasm",
        "name": "System.Globalization.Calendars.jvunmgp5qi.wasm",
        "hash": "sha256-8R3fHI4yOwOM/HfKiLJUywTMAwXXXscei27iN60nVJQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Globalization.Extensions.wasm",
        "name": "System.Globalization.Extensions.ypea0eja6e.wasm",
        "hash": "sha256-+u54LA4dm7aokhhwvGSEZlP2rcrvdr+FdO+KYRaeY18=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Globalization.wasm",
        "name": "System.Globalization.aq78maxzij.wasm",
        "hash": "sha256-3hiKjpWF412u0JZrKvP5FEAh43GMojXZulf/zhc8O9k=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.wasm",
        "name": "System.IO.6k8iufosdl.wasm",
        "hash": "sha256-1vXWemmmi+El65wUUhGzJdtd+UEXkeZzcVqDqr6hwXc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.Compression.Brotli.wasm",
        "name": "System.IO.Compression.Brotli.5r4ynkvx5k.wasm",
        "hash": "sha256-bzxHvrWsW278hhoiGeAu5eBPGYZcQTdiEvHKaWUJRhI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.Compression.FileSystem.wasm",
        "name": "System.IO.Compression.FileSystem.7n9css0iuh.wasm",
        "hash": "sha256-08dyiSSmENVYEG+2lXNyw3bnCdXEyJ/wSZFEsUSfclg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.Compression.ZipFile.wasm",
        "name": "System.IO.Compression.ZipFile.2zjcogl7ql.wasm",
        "hash": "sha256-Hlg4faDnCCEt2yI0UsgQuKk9kixhrnmcW8DGT9FFqrE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.Compression.wasm",
        "name": "System.IO.Compression.k2ds04u4z0.wasm",
        "hash": "sha256-1F7BBfLIcKnyAk0An0ggc+ZZhNy4VBtwqrrhtqg9GVw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.FileSystem.wasm",
        "name": "System.IO.FileSystem.9mi9nx5dfb.wasm",
        "hash": "sha256-fw5dgf8w2nr8yQHxFybggIdEnjMfTKgZB3mKmOuSOIs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.FileSystem.AccessControl.wasm",
        "name": "System.IO.FileSystem.AccessControl.z9r2h4u05r.wasm",
        "hash": "sha256-lxfFA0RI8uJkByjhPom1OiL0ArvQxwfA5IBd2bGp8a0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.FileSystem.DriveInfo.wasm",
        "name": "System.IO.FileSystem.DriveInfo.ehlyq1uxzx.wasm",
        "hash": "sha256-Qr/ujsZWn/AR/rRCTYlwkeHHKx2A8wR7bRAd5xsyMXI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.FileSystem.Primitives.wasm",
        "name": "System.IO.FileSystem.Primitives.mmfk1bu47x.wasm",
        "hash": "sha256-Hhnll2ht0Vt8JTRzeA8dEhdHDVm6OmYrceroMSJGygA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.FileSystem.Watcher.wasm",
        "name": "System.IO.FileSystem.Watcher.w2f9kz9g22.wasm",
        "hash": "sha256-aLteCfibVfGg+afTXbOIoMe5+S5L3UlQylbPIJcg3sM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.IsolatedStorage.wasm",
        "name": "System.IO.IsolatedStorage.ypudrk5lzn.wasm",
        "hash": "sha256-OsiXwo2geZyvMXTMjKhmMTPPRnB1m7PCrWQa1b77Zr0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.MemoryMappedFiles.wasm",
        "name": "System.IO.MemoryMappedFiles.b55a3yc8ca.wasm",
        "hash": "sha256-j6M4/lsnmexG21f1LyyZIF05hlDltkTMyXrB+DC+iKE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.Packaging.wasm",
        "name": "System.IO.Packaging.5qwi5szt03.wasm",
        "hash": "sha256-0wRwHDX+sj2UVPLmncf+LN9Fy/SEMtZGq73blfEOHBc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.Pipelines.wasm",
        "name": "System.IO.Pipelines.3x9rvtdxdo.wasm",
        "hash": "sha256-CXI2gNoP7kDo9hnTResPmlGGjpUQOzqchsaOA3TqF6Q=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.Pipes.AccessControl.wasm",
        "name": "System.IO.Pipes.AccessControl.hh3qf93aar.wasm",
        "hash": "sha256-JXdkx6YbiDoVxg0nWvddc8Z/OE7UcuHGPlJemcnD+qw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.Pipes.wasm",
        "name": "System.IO.Pipes.fbqya1ihtj.wasm",
        "hash": "sha256-uwfOoxoGyv1U2sKdGmbEVIMcJ6DftXhsjICxfEOhKcA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.UnmanagedMemoryStream.wasm",
        "name": "System.IO.UnmanagedMemoryStream.omg413a4gg.wasm",
        "hash": "sha256-0KXzKtuI003jMLX6O6OZNnJRNZvCuwAnakg8iM4/IyA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Linq.wasm",
        "name": "System.Linq.72r60k23ax.wasm",
        "hash": "sha256-gYFfuoTDkIjJFeKpUKoJeUxOGalFwAqYy5AqwwlX6fs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Linq.AsyncEnumerable.wasm",
        "name": "System.Linq.AsyncEnumerable.o3ua8w33h5.wasm",
        "hash": "sha256-5C6mfg25ep1bK608uT64Q3NZn2nrkRzSP7R7gpjthm4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Linq.Expressions.wasm",
        "name": "System.Linq.Expressions.6qnwi9mw5o.wasm",
        "hash": "sha256-4knTzvX4aSHHICoXkSBXEGhuf/9oRDiEmpwx7WFReU0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Linq.Parallel.wasm",
        "name": "System.Linq.Parallel.girkmx16cq.wasm",
        "hash": "sha256-SFIqtvXIsg0r9cmqwdz1VqmeE2IA3peeqaBzRuQl95k=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Linq.Queryable.wasm",
        "name": "System.Linq.Queryable.ccvqahu33g.wasm",
        "hash": "sha256-1BBGOPVmbfTViCILaeEQykHoO+ooCmlDyrBMiC4QKRc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Memory.wasm",
        "name": "System.Memory.lawid0d2yz.wasm",
        "hash": "sha256-Aw+nm07LRpGeSWQSHTrIlfY/Ty4rqoAVFafLKz4PdJg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Http.Json.wasm",
        "name": "System.Net.Http.Json.w4wbn9hp1s.wasm",
        "hash": "sha256-cAKrwveg1VFAv1qqtk5ChBqusEjhWExk6XrbtojKd/s=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Http.wasm",
        "name": "System.Net.Http.klni76y3e2.wasm",
        "hash": "sha256-+GYRMz+RnX0qdQboIfFKnjeRqytzq27ZCvzpSUYAT/0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.HttpListener.wasm",
        "name": "System.Net.HttpListener.lwo486nfzb.wasm",
        "hash": "sha256-65hQvpN9eCHF/uIyKxXTxMxdMvtQad4JRvjPRuoZo2s=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Mail.wasm",
        "name": "System.Net.Mail.g6u0zx2fls.wasm",
        "hash": "sha256-OGCGMm1m5b7hGrFeDAB6KmknLWy9OzSZ5drRwJNAkdo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.NameResolution.wasm",
        "name": "System.Net.NameResolution.bs8twh0sbv.wasm",
        "hash": "sha256-RSosqx5+5cWrYK/+eq0TTbDZduUi3Vr4JT+AXZIwIKA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.NetworkInformation.wasm",
        "name": "System.Net.NetworkInformation.yovo3xnj02.wasm",
        "hash": "sha256-cu3uUMnaeSxEgiqo4CLjZfc4BdJ+fVg4rTksTY4uXV8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Ping.wasm",
        "name": "System.Net.Ping.154is5l1kz.wasm",
        "hash": "sha256-dUVakWlvb5kAaGqXQBpeBCSzDAExo4cWyz3eAM7h+hg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Primitives.wasm",
        "name": "System.Net.Primitives.xkt5fph3sx.wasm",
        "hash": "sha256-/5eGn2zc6x2QZVjZXEJy6ct1alUpGJDLkxRhfPi3GIM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Quic.wasm",
        "name": "System.Net.Quic.6zlar5f0yx.wasm",
        "hash": "sha256-wqzIVAGP4uBP13WbcSCI+X3wRdnuKWFWYeZ4YIxlLKk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Requests.wasm",
        "name": "System.Net.Requests.0im30zog5y.wasm",
        "hash": "sha256-qIAB0etuqLVULsPykxOoefS9GoZIEYarx0l5cEbf27k=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Security.wasm",
        "name": "System.Net.Security.7comeayqg8.wasm",
        "hash": "sha256-SQWsMR/3rhiDnyFJer38XMa5RsdnHjgaoaz7VDqAkfk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.ServerSentEvents.wasm",
        "name": "System.Net.ServerSentEvents.xl9o4pbv5p.wasm",
        "hash": "sha256-pT66S+tTst8X8RvEfMTIoNOYAsy68vu6SQMcB/bA9Os=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.ServicePoint.wasm",
        "name": "System.Net.ServicePoint.lqbfrhlhzb.wasm",
        "hash": "sha256-06fejVG1gwfJon3vDqe+111wNhHFYH/IHIWo3aMWFXc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Sockets.wasm",
        "name": "System.Net.Sockets.3ejy6obr6d.wasm",
        "hash": "sha256-qyxCBow9iMIlvwYEI6Jm53RSfcU6kO0NTCQHvT7Wz1A=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.WebClient.wasm",
        "name": "System.Net.WebClient.ga2m5ccakh.wasm",
        "hash": "sha256-6DWlgKVL1Bvphy8DorlJyMUecbQSDBDEP+vbuKWwG4k=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.WebHeaderCollection.wasm",
        "name": "System.Net.WebHeaderCollection.hqdnh4ql5c.wasm",
        "hash": "sha256-tzk57sl60XP77D10MT6rASz0vCcoGPTICQ9/TDA+S/0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.WebProxy.wasm",
        "name": "System.Net.WebProxy.yzjdhe8ckf.wasm",
        "hash": "sha256-gjD6KMK5PbXJ5WHSSjH0fCnrXXXUAgVjH8Q7W7f9yWI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.WebSockets.Client.wasm",
        "name": "System.Net.WebSockets.Client.afsapibae2.wasm",
        "hash": "sha256-muAtXnUmyJD3SwzAsLYK677DlUBNHkD5VDipNAKhLYE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.WebSockets.wasm",
        "name": "System.Net.WebSockets.nyzzca8w2d.wasm",
        "hash": "sha256-zxQOdbKYj5IhVVmsahxfQw5eI4pRG3ex6SEaa37yJ6c=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.wasm",
        "name": "System.Net.z15an7vdq4.wasm",
        "hash": "sha256-6aTaxs06+xXo7tni6uuYPfDKl078nRSv1/lJvbtQE64=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Numerics.Tensors.wasm",
        "name": "System.Numerics.Tensors.6wr7vkc7d8.wasm",
        "hash": "sha256-9ldKeMgVqRJb0C9zyEWGkpAy01kIYPXVmYk6UpyVrYs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Numerics.Vectors.wasm",
        "name": "System.Numerics.Vectors.rw64p29bcn.wasm",
        "hash": "sha256-BbMKiw2CCJ6REqsMHLy+lm33WfXrkXx2NKikRmVK5+I=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Numerics.wasm",
        "name": "System.Numerics.tejxf55bqv.wasm",
        "hash": "sha256-e2yUaI/Uwt+7wUhdBAk/4G4++RX8jC80pKokHNrcYh8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ObjectModel.wasm",
        "name": "System.ObjectModel.qos7gwnrmt.wasm",
        "hash": "sha256-BrOGzF6whPTSXwfisHaFbL6Nb6F1EL3iCTGAP0SyH2Q=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Private.DataContractSerialization.wasm",
        "name": "System.Private.DataContractSerialization.qe0vq21tae.wasm",
        "hash": "sha256-LvqbV2devIbxtPg2wj+L+N9JoxZs3ven+oL6SFB5zKI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Private.Uri.wasm",
        "name": "System.Private.Uri.pt8gyfhrd9.wasm",
        "hash": "sha256-U6HbaoraIzfFo/d2fuGGD0qJ3OEmxdJPatC6n8lpdQw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Private.Xml.wasm",
        "name": "System.Private.Xml.0a8q5s6qzu.wasm",
        "hash": "sha256-mF7Lshj01nTGp7DQDExtwm08RtYeNU+iLiyIQ4XgkEk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Private.Xml.Linq.wasm",
        "name": "System.Private.Xml.Linq.xka4z9lcg4.wasm",
        "hash": "sha256-kSVr5ZNV98cfawEzMw5pGB5EazcWBJCbOcdhpenyetQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reactive.wasm",
        "name": "System.Reactive.drqaelofxl.wasm",
        "hash": "sha256-+ScSClhQuiJQu2gf7sGnB/ZKQFNojmrCzv/fAzn3KPw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.DispatchProxy.wasm",
        "name": "System.Reflection.DispatchProxy.p6c9vmip1k.wasm",
        "hash": "sha256-D2NABRwhidqdFrYBYU/jX71x466hUD9BNnhuW7gG4G8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.Emit.wasm",
        "name": "System.Reflection.Emit.6mlzk12vnz.wasm",
        "hash": "sha256-LnCvJGqLYa8yLks3ZAeGlnknOOEtO5dCpd5/ftTRy3Y=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.Emit.ILGeneration.wasm",
        "name": "System.Reflection.Emit.ILGeneration.ec3kgzjlo5.wasm",
        "hash": "sha256-7jkyniJQcKpIyGPXo/UA7Kuc7hu2Hovcta7TRW4vEeA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.Emit.Lightweight.wasm",
        "name": "System.Reflection.Emit.Lightweight.bdoqogys09.wasm",
        "hash": "sha256-IYqIAVtda5afXjcR+8TAHOV0e/NBZY5owfETuOpVres=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.Extensions.wasm",
        "name": "System.Reflection.Extensions.5lzihne627.wasm",
        "hash": "sha256-V67T+e9tyvS56mHH/XDMyhnzrAaHswusDOsH2LVDFd0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.Metadata.wasm",
        "name": "System.Reflection.Metadata.h127gx96vb.wasm",
        "hash": "sha256-FUrGwpyGzWlDRN14uktvqrt8aNWqAFodr/C7dUJIizo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.Primitives.wasm",
        "name": "System.Reflection.Primitives.yu6e6oowa7.wasm",
        "hash": "sha256-xj/FamvLhNOFLzR7iEf/GuKlCyh7OL1fwArcx8/7D+g=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.TypeExtensions.wasm",
        "name": "System.Reflection.TypeExtensions.1j4cdvv11d.wasm",
        "hash": "sha256-EyWKJddEzPq166BbKk62tQL8qLUJyz8WH+Vneo9t0bU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.wasm",
        "name": "System.Reflection.juc95drche.wasm",
        "hash": "sha256-tS2EJP/KsSWWCS/84+WEEcRtBDE3kp7Ld72QxwX/PyI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Resources.Reader.wasm",
        "name": "System.Resources.Reader.d4llbddy1d.wasm",
        "hash": "sha256-0xKvChW8RLWp1AMS6YokqKblt0Ntw6D63gYKML/K17U=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Resources.ResourceManager.wasm",
        "name": "System.Resources.ResourceManager.3zpn20k64h.wasm",
        "hash": "sha256-wRpB4K7rsKrBnDWarQduaPaQL77wPaqhS1qZbD+Y1UA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Resources.Writer.wasm",
        "name": "System.Resources.Writer.75hqljy2ad.wasm",
        "hash": "sha256-tSXO23D7MCCNcZSdus/jjL7swJbr/qzVxF0em/zRx4U=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.wasm",
        "name": "System.Runtime.82kvgir4xv.wasm",
        "hash": "sha256-sECzcPrGELLjmHn95uVJpwwKmDoBR7sfPgX7VkUTFZg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.CompilerServices.Unsafe.wasm",
        "name": "System.Runtime.CompilerServices.Unsafe.4nwrkdocag.wasm",
        "hash": "sha256-ALoCZ2Uf72qcEhta4pn4f15EGwH3K87tFgcX3dUgNTE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.CompilerServices.VisualC.wasm",
        "name": "System.Runtime.CompilerServices.VisualC.fskbzbwt75.wasm",
        "hash": "sha256-/4zoVwX7fh8TjcQvaQV6j+E88T1wBTJKsLiWiR/RsFU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Extensions.wasm",
        "name": "System.Runtime.Extensions.cnokfxcv05.wasm",
        "hash": "sha256-yMxQ8URoub5dAxCaVwiqGVOkzBzOprCG7Hg2+Q9DRhM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Handles.wasm",
        "name": "System.Runtime.Handles.uwwv7k3u7n.wasm",
        "hash": "sha256-Xp9qgXTieSsUr3Xvcg+xHLp9dqe5CBCUPlHfVnIFnRo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.InteropServices.RuntimeInformation.wasm",
        "name": "System.Runtime.InteropServices.RuntimeInformation.i381ct6u00.wasm",
        "hash": "sha256-Pt8uF1P713FqaiWyhFGIce3NgqYuH8KUstIPrL3d8pQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.InteropServices.wasm",
        "name": "System.Runtime.InteropServices.j311sfjgvt.wasm",
        "hash": "sha256-zyOjJuUJ6AQacVdjmTv21t9xjWZzr0AHdxxJy6HBxWc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Intrinsics.wasm",
        "name": "System.Runtime.Intrinsics.nmhzoxz9zt.wasm",
        "hash": "sha256-ARCqJNTWy2TEukT/4tLkmwvI4ioSiQx/N9DeAMcYc6M=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Loader.wasm",
        "name": "System.Runtime.Loader.s399b7eq2t.wasm",
        "hash": "sha256-qKLpRM39427jPNx4rKI80mAzucDt1dXTiCUWKaJAsZo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Numerics.wasm",
        "name": "System.Runtime.Numerics.7vepjrpfrb.wasm",
        "hash": "sha256-g6atoQaqxLpOEanb1uDDz7hz5RCgG8mVhbKPnlMRzcI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Serialization.Formatters.wasm",
        "name": "System.Runtime.Serialization.Formatters.mlx3zax0za.wasm",
        "hash": "sha256-Jrjlzl+Q1XLl4EbdCHXCk3Hff0xK9/lnvxzmBxw/SFE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Serialization.Json.wasm",
        "name": "System.Runtime.Serialization.Json.ggpykxy0wy.wasm",
        "hash": "sha256-oHJfJoecuAn8GtUQyDtDTeXFhJfq4uRp8BVR1B0yFSI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Serialization.Primitives.wasm",
        "name": "System.Runtime.Serialization.Primitives.px8uf9im0i.wasm",
        "hash": "sha256-vVvm/mq4tLMr/uWAY9qrL9UvfBWyCw5wNAVydBTBc5g=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Serialization.Xml.wasm",
        "name": "System.Runtime.Serialization.Xml.vnf8xjen7c.wasm",
        "hash": "sha256-tXHASYTysiyoNaJpYTihzoKoxIxtQ9geDgrllebHn9w=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Serialization.wasm",
        "name": "System.Runtime.Serialization.qclrb7gjog.wasm",
        "hash": "sha256-JjQQGXhbrffIStYT8Sbo2k5JbuQe2nmeZS7B1plzu8I=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.AccessControl.wasm",
        "name": "System.Security.AccessControl.1u2fnd6t27.wasm",
        "hash": "sha256-GScotn4X7fd7ZpwzzlfWsKdmQr+OpDbsEUyqS5hCqCQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Claims.wasm",
        "name": "System.Security.Claims.bp3i6z5zq4.wasm",
        "hash": "sha256-wdqM34lhjBnLERAYSHIWnlfOI8tHRimIRUia2c/zKME=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.Algorithms.wasm",
        "name": "System.Security.Cryptography.Algorithms.eunob4is79.wasm",
        "hash": "sha256-Staw40bB6gur/ctKpo96rNuy4yt+3TZ7YSe/ysNEMBo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.Cng.wasm",
        "name": "System.Security.Cryptography.Cng.du3bf0g3yx.wasm",
        "hash": "sha256-y+gF0JdrYYPMOzAi4gmmElbUQapinq8b7yQT+xeecpE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.Csp.wasm",
        "name": "System.Security.Cryptography.Csp.ul51yn4cae.wasm",
        "hash": "sha256-ojDW+NR3seVt9bdaj/9uDGBzX0xj1Ufu5NYNl02v2GA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.Encoding.wasm",
        "name": "System.Security.Cryptography.Encoding.dwwsq77san.wasm",
        "hash": "sha256-cyQ4YhQwMFnbOr7yQy9d3c91dKmF5Gvo2b9r2MqAIDw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.OpenSsl.wasm",
        "name": "System.Security.Cryptography.OpenSsl.8e6yenbc98.wasm",
        "hash": "sha256-IHFSKve84yrlLjtW/UsJ/Zys21KH/kLlTchluBieEaQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.Pkcs.wasm",
        "name": "System.Security.Cryptography.Pkcs.9ddjg3rh0g.wasm",
        "hash": "sha256-bbZgannLROA3o5t3WRPWvwj9TZDft4JQqzFxHgvN73M=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.Primitives.wasm",
        "name": "System.Security.Cryptography.Primitives.gmiduh8hz9.wasm",
        "hash": "sha256-iCHx31xpz88jINVAq+ImZ5o5b7MSaGhCg1qUzsfBy14=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.X509Certificates.wasm",
        "name": "System.Security.Cryptography.X509Certificates.b2tex5r2xc.wasm",
        "hash": "sha256-o69R5BuiMRQqdjBnALO2URSDc+KjO4NHdLs7xPUziZM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.Xml.wasm",
        "name": "System.Security.Cryptography.Xml.sjkoyy4oo7.wasm",
        "hash": "sha256-COjI6BPPw8YPpoSrketP9g9yvQrwTZD/qv7V1PgOgHA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.wasm",
        "name": "System.Security.Cryptography.stfi11fs8u.wasm",
        "hash": "sha256-oFWykzlWHi4cx0iCl+lxmD/y/niTBh1+ed0pJ5k67q0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Principal.Windows.wasm",
        "name": "System.Security.Principal.Windows.s8boxfo7qi.wasm",
        "hash": "sha256-7OvtX7p/Wt0X2fhsde+H99rHJh+KvNzoXuOFrEIEKi0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Principal.wasm",
        "name": "System.Security.Principal.sdepp9tilw.wasm",
        "hash": "sha256-8B2ToaXEsYvhImv15CboFK75IXD47rnaXiqKPLv4eno=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.SecureString.wasm",
        "name": "System.Security.SecureString.5echzmzn73.wasm",
        "hash": "sha256-/WPxMAzOv8d8ks8XAO/zqSCR2tAc7fi9ivqS2ZEoVCk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.wasm",
        "name": "System.Security.hpfns01fn3.wasm",
        "hash": "sha256-u+SJwn/Vjr3u3WSQ5rhLhpdnVEnXWPNfJSGd8F57dJw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ServiceModel.Web.wasm",
        "name": "System.ServiceModel.Web.64ejz6sgd9.wasm",
        "hash": "sha256-ypam9tLFMGjQuIk0HD90/c5WBz9ILpQMvNX5mbjERMs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ServiceProcess.wasm",
        "name": "System.ServiceProcess.g7tlxbndl4.wasm",
        "hash": "sha256-HATLvLZIIzovfG47xZzLjUGhoOmQVRAK/TbWaWN0Bos=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Text.Encoding.wasm",
        "name": "System.Text.Encoding.5l4ujq4j9o.wasm",
        "hash": "sha256-uQ01R2uwm+E0Exui+3Y1NeI/8mIA1WX1mcxuCtOA0sM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Text.Encoding.CodePages.wasm",
        "name": "System.Text.Encoding.CodePages.u4nopl6ts5.wasm",
        "hash": "sha256-4qcGuSJOfB+VRIHPUnk9iA08HHJPCJHaaL2Kpp6YxX4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Text.Encoding.Extensions.wasm",
        "name": "System.Text.Encoding.Extensions.tfu4erz523.wasm",
        "hash": "sha256-Gf09HeOG49tOH+CLlMqAj3cw+09KgRRbicBYWPrIhsM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Text.Encodings.Web.wasm",
        "name": "System.Text.Encodings.Web.4qrm0naf5i.wasm",
        "hash": "sha256-JK7xCHwCk1iwz/lPf2rhYgSOgHjyBUGvfwoVvguUvdI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Text.Json.wasm",
        "name": "System.Text.Json.lmwpuiwvm4.wasm",
        "hash": "sha256-k2groRNvb0aWaTeuJZji061jgkLl7ZCty9mwKGdft0M=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Text.RegularExpressions.wasm",
        "name": "System.Text.RegularExpressions.ymprjs4f4z.wasm",
        "hash": "sha256-dmIp5Mji4unTXuoxLFc66gYjV3HT0l32StV/vY5ZnLc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.AccessControl.wasm",
        "name": "System.Threading.AccessControl.3si727nl58.wasm",
        "hash": "sha256-LTeyXOneLffDBnv+hJfNpkgSns7R0f3iWxptBora9Ow=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.Overlapped.wasm",
        "name": "System.Threading.Overlapped.6u9kztbjxn.wasm",
        "hash": "sha256-znW1luwOOv17lXux6oB1rCYlpj+Ass/jD+qWcTCh5Z0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.Tasks.wasm",
        "name": "System.Threading.Tasks.4wetis0cb6.wasm",
        "hash": "sha256-XM0ly7iVSs6A9X6SBZOHvca6esxed/qgCFejeL4F1MM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.Tasks.Dataflow.wasm",
        "name": "System.Threading.Tasks.Dataflow.1f5rwh21k7.wasm",
        "hash": "sha256-LbiYVRMP5Nw9DPyKed4XPoDrG4YpWLrG8DaNN1CZdXc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.Tasks.Extensions.wasm",
        "name": "System.Threading.Tasks.Extensions.k22y3xjb6z.wasm",
        "hash": "sha256-BMpOrVBzpBOCDfmWPvHE0OWUsLwFCRGWzyYCMPH2yEo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.Tasks.Parallel.wasm",
        "name": "System.Threading.Tasks.Parallel.620p8bc3s4.wasm",
        "hash": "sha256-jmAPC/srGHdSVr29P2VOyBmaugzmhhWRO6rawAsgKXc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.Thread.wasm",
        "name": "System.Threading.Thread.4ij8v6q9s1.wasm",
        "hash": "sha256-vEs4bi4G4v4Mc8nlG2P3qdRcxWNQpylw3+ojH66njIQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.Timer.wasm",
        "name": "System.Threading.Timer.a52ytbcao5.wasm",
        "hash": "sha256-XsiDRYZDigtC5+MG5QJ+CXarTambN0h3zn6t9X27N/4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Transactions.Local.wasm",
        "name": "System.Transactions.Local.1k4cx8aohd.wasm",
        "hash": "sha256-ESOthzLg6QdgDB5vNlpKgqoFu4yQLxnsW5tGlQBui9M=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Transactions.wasm",
        "name": "System.Transactions.ayl1qcic46.wasm",
        "hash": "sha256-Yk8RUNrqUhd/rlTcnNtychna4dtNPfl2hWYuh7m4at4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ValueTuple.wasm",
        "name": "System.ValueTuple.nyc9xrsvgy.wasm",
        "hash": "sha256-3zZ7K72BDddj+0y5XhMHBlrE/s6OxWNEbuLYJl4TeaQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Web.HttpUtility.wasm",
        "name": "System.Web.HttpUtility.tcfd8t4tmp.wasm",
        "hash": "sha256-A1URZLnUrt2I//0ruy99b147eHChK+619oAL4QQhavc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Web.wasm",
        "name": "System.Web.akbax874co.wasm",
        "hash": "sha256-CqrIyl1ZmsRpcN3zM7tm4aZEDbOVBZJqmV5xZZHefmI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Windows.wasm",
        "name": "System.Windows.paev0unsi9.wasm",
        "hash": "sha256-IQJVWkuPWNke14uZJ+X6t35I6Fz6x0qW2F7eN9e0Qsc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Xml.Linq.wasm",
        "name": "System.Xml.Linq.l0ok8arlvf.wasm",
        "hash": "sha256-lRZTigeRy3lxpxFtGxecpOVsGXm7t/D8Nu8f2DCXcwI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Xml.ReaderWriter.wasm",
        "name": "System.Xml.ReaderWriter.7lwvogznzz.wasm",
        "hash": "sha256-u/4NDsIMX0oiPZw+hJVmvHJiRIj9RgnRfRPIuNWqEGs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Xml.Serialization.wasm",
        "name": "System.Xml.Serialization.51e7836go1.wasm",
        "hash": "sha256-N2nT9lUL0dbD3eu4rP3n79RpkUnIlLMBDWrEtzXWoDk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Xml.XDocument.wasm",
        "name": "System.Xml.XDocument.xnvzdvw7gf.wasm",
        "hash": "sha256-DVQi2PStv/87wjHgCkg0Crhg0V5LAaW8bqBQN5Im12I=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Xml.XPath.XDocument.wasm",
        "name": "System.Xml.XPath.XDocument.11s7vlb7t3.wasm",
        "hash": "sha256-peyx13qC8sVcLjEhxjdsq+CZA1ito1YpY7so4sqbvak=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Xml.XPath.wasm",
        "name": "System.Xml.XPath.uxdzkrbva9.wasm",
        "hash": "sha256-UoHmWtwHvjYqw5GSPBwbM/kdrdfhHsV205ngKCyN7Cw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Xml.XmlDocument.wasm",
        "name": "System.Xml.XmlDocument.6ntuz8qmft.wasm",
        "hash": "sha256-bssP8kSdnlv30HWn+t8Nx0LVpJFaMFYJKApC4T/GJm4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Xml.XmlSerializer.wasm",
        "name": "System.Xml.XmlSerializer.14qj33pn14.wasm",
        "hash": "sha256-8Smci8erUMAhQZ57mEQMWQBzWI0VzFVALc34q++p2rg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Xml.wasm",
        "name": "System.Xml.d1ot0sol2h.wasm",
        "hash": "sha256-DzGW17KfYrXRcwNFTXHx1eIqyDo+9h+x8uukzWefq+I=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Tmds.DBus.Protocol.wasm",
        "name": "Tmds.DBus.Protocol.33stybnb76.wasm",
        "hash": "sha256-kS5Yiz2iixL0LMTW53cK0pVSC4eTr6Ni0SGDlTB3x+Q=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "UtfUnknown.wasm",
        "name": "UtfUnknown.ondkaf9qr7.wasm",
        "hash": "sha256-3Icg1wd59Im9gwC3GZj8tO/Cw7ak7bkWpoASuvpK34s=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "WanaKanaNet.wasm",
        "name": "WanaKanaNet.pf89c73bun.wasm",
        "hash": "sha256-9Yq4deMUj142zYD1odZMVK5CBbPSmetpm7VVaGsqKrc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "WindowsBase.wasm",
        "name": "WindowsBase.z3dgnpnt6r.wasm",
        "hash": "sha256-X9EcyWQVrRIMHgiPHaY/AyMQV+6/PXS9JBiDlRvT6tk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "YamlDotNet.wasm",
        "name": "YamlDotNet.xs9vds9wzp.wasm",
        "hash": "sha256-YfAT6BCi0eZMKxaz1x/7sitT4NYi+bnmllB7z7MEsbw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "mscorlib.wasm",
        "name": "mscorlib.pg5kdhfd2c.wasm",
        "hash": "sha256-V2bizIYdMXzXNZHgKfamdURzYIIe3Ht0edCDq/72Hf0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "netstandard.wasm",
        "name": "netstandard.ythr20ky7n.wasm",
        "hash": "sha256-BpUbxbAkUCY/PEX3wgL/NKemNNMJp2kg8zeStkmlV7w=",
        "cache": "force-cache"
      }
    ]
  },
  "debugLevel": 0,
  "globalizationMode": "sharded",
  "runtimeConfig": {
    "runtimeOptions": {
      "configProperties": {
        "System.Diagnostics.Debugger.IsSupported": false,
        "System.Diagnostics.Metrics.Meter.IsSupported": false,
        "System.Diagnostics.Tracing.EventSource.IsSupported": false,
        "System.Globalization.Invariant": false,
        "System.TimeZoneInfo.Invariant": false,
        "System.Linq.Enumerable.IsSizeOptimized": true,
        "System.Net.Http.EnableActivityPropagation": false,
        "System.Net.Http.WasmEnableStreamingResponse": true,
        "System.Net.SocketsHttpHandler.Http3Support": false,
        "System.Reflection.Metadata.MetadataUpdater.IsSupported": false,
        "System.Resources.UseSystemResourceKeys": true,
        "System.Runtime.Serialization.EnableUnsafeBinaryFormatterSerialization": false,
        "System.Text.Encoding.EnableUnsafeUTF7Encoding": false,
        "System.Text.Json.JsonSerializer.IsReflectionEnabledByDefault": true
      }
    }
  }
}/*json-end*/);export{ht as default,gt as dotnet,pt as exit};

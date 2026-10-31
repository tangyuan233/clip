/* esm.sh - micromark-util-decode-numeric-character-reference@1.1.0 */
function t(r,n){let e=Number.parseInt(r,n);return e<9||e===11||e>13&&e<32||e>126&&e<160||e>55295&&e<57344||e>64975&&e<65008||(e&65535)===65535||(e&65535)===65534||e>1114111?"\uFFFD":String.fromCharCode(e)}export{t as decodeNumericCharacterReference};
//# sourceMappingURL=micromark-util-decode-numeric-character-reference.mjs.map
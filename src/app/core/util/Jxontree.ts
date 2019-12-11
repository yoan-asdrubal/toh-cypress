export function parseText(sValue) {
    if (/^\s*$/.test(sValue)) {
        return null;
    }
    if (/^(?:true|false)$/i.test(sValue)) {
        return sValue.toLowerCase() === 'true';
    }
    if (isFinite(sValue)) {
        return parseFloat(sValue);
    }
    if (isFinite(Date.parse(sValue))) {
        return new Date(sValue);
    }
    return sValue;
}

export function getJXONTree(oXMLParent) {
    let vResult: /* put here the default value for empty nodes! */ any;
    let nLength = 0;
    let sCollectedTxt = '';
    if (oXMLParent.hasAttributes && oXMLParent.hasAttributes()) {
        vResult = {};
        for (nLength; nLength < oXMLParent.attributes.length; nLength++) {
            const oAttrib = oXMLParent.attributes.item(nLength);
            vResult['@' + oAttrib.name.toLowerCase()] = parseText(oAttrib.value.trim());
        }
    }
    if (oXMLParent.hasChildNodes()) {
        for (let oNode, sProp, vContent, nItem = 0; nItem < oXMLParent.childNodes.length; nItem++) {
            oNode = oXMLParent.childNodes.item(nItem);
            if (oNode.nodeType === 4) {
                sCollectedTxt += oNode.nodeValue;
            } else if (oNode.nodeType === 3) {
                sCollectedTxt += oNode.nodeValue.trim();
            } else if (oNode.nodeType === 1 && !oNode.prefix) { /* nodeType is "Element" (1) */
                if (nLength === 0) {
                    vResult = {};
                }
                sProp = oNode.nodeName.toLowerCase();
                vContent = getJXONTree(oNode);
                if (vResult.hasOwnProperty(sProp)) {
                    if (vResult[sProp].constructor !== Array) {
                        vResult[sProp] = [vResult[sProp]];
                    }
                    vResult[sProp].push(vContent);
                } else {
                    vResult[sProp] = vContent;
                    nLength++;
                }
            }
        }
    }
    if (sCollectedTxt) {
        nLength > 0 ? vResult.keyValue = parseText(sCollectedTxt) : vResult = parseText(sCollectedTxt);
    }
    /* if (nLength > 0) { Object.freeze(vResult); } */
    return vResult;
}

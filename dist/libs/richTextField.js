export function deserializeHTMLFromWord(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const createTextNode = (text = "") => ({ text: text.trim() });
    const walkNode = (el) => {
        var _a;
        if (el.nodeType === Node.TEXT_NODE) {
            const txt = (el.textContent || "").trim();
            if (!txt)
                return null;
            return createTextNode(txt);
        }
        if (el.nodeType !== Node.ELEMENT_NODE)
            return null;
        const element = el;
        const style = element.getAttribute("style") || "";
        const align = ((_a = element.style) === null || _a === void 0 ? void 0 : _a.textAlign) || element.getAttribute("align") || undefined;
        let children = Array.from(element.childNodes)
            .map(walkNode)
            .filter((n) => n !== null)
            .flat();
        children = children.filter((c) => c.text || c.type);
        // Marks
        const colorMatch = style.match(/color:\s*([^;]+)/i);
        const color = colorMatch ? colorMatch[1] : undefined;
        if (RegExp(/font-weight:\s*bold/i).exec(style))
            children = children.map((c) => (Object.assign(Object.assign({}, c), { bold: true })));
        if (RegExp(/font-style:\s*italic/i).exec(style))
            children = children.map((c) => (Object.assign(Object.assign({}, c), { italic: true })));
        if (RegExp(/text-decoration:\s*underline/i).exec(style))
            children = children.map((c) => (Object.assign(Object.assign({}, c), { underline: true })));
        if (RegExp(/text-decoration:\s*line-through/i).exec(style))
            children = children.map((c) => (Object.assign(Object.assign({}, c), { strikethrough: true })));
        if (color)
            children = children.map((c) => (Object.assign(Object.assign({}, c), { color })));
        if (/MsoListParagraph/i.test(element.className) ||
            /mso-list:/i.test(element.getAttribute("style") || "") ||
            /mso-list:Ignore/i.test(element.innerHTML)) {
            let textContent = children
                .filter((c) => c.ignore !== true)
                .map((c) => (c.text ? c.text : ""))
                .join("");
            const innerHTML = element.innerHTML;
            let listType;
            if (/font-family:\s*Symbol/i.test(innerHTML) || /·/.test(innerHTML)) {
                listType = "bulleted-list";
            }
            else {
                listType = "numbered-list";
            }
            if (listType === "numbered-list") {
                textContent = textContent.replace(/^\s*\d+[\.\)]\s*/, "");
            }
            else if (listType === "bulleted-list") {
                textContent = textContent.replace(/^[·•\-]\s*/, "");
            }
            textContent = textContent.replace(/\n+/g, " ").trim();
            return {
                type: "list-item",
                listType,
                children: [{ type: "paragraph", children: [{ text: textContent }] }],
            };
        }
        switch (element.nodeName) {
            case "P":
                if (children.length === 0)
                    return null;
                return { type: "paragraph", align, children };
            case "H1":
                return { type: "heading-one", align, children };
            case "H2":
                return { type: "heading-two", align, children };
            case "H3":
                return { type: "heading-three", align, children };
            case "H4":
                return { type: "heading-four", align, children };
            case "H5":
                return { type: "heading-five", align, children };
            case "H6":
                return { type: "heading-six", align, children };
            case "BLOCKQUOTE":
                return { type: "block-quote", align, children };
            case "UL":
                return {
                    type: "bulleted-list",
                    children: children.map((c) => ({
                        type: "list-item",
                        children: c.type === "paragraph"
                            ? [c]
                            : [{ type: "paragraph", children: [c] }],
                    })),
                };
            case "OL":
                return {
                    type: "numbered-list",
                    children: children.map((c) => ({
                        type: "list-item",
                        children: c.type === "paragraph"
                            ? [c]
                            : [{ type: "paragraph", children: [c] }],
                    })),
                };
            case "LI": {
                const textContent = children
                    .map((c) => (c.text ? c.text : ""))
                    .join("");
                return {
                    type: "list-item",
                    children: [{ type: "paragraph", children: [{ text: textContent }] }],
                };
            }
            case "A":
                return {
                    type: "link",
                    url: element.getAttribute("href") || "",
                    children,
                };
            case "IMG":
                return {
                    type: "image",
                    url: element.getAttribute("src") || "",
                    children: [createTextNode()],
                };
            case "B":
            case "STRONG":
                return children.map((c) => (Object.assign(Object.assign({}, c), { bold: true })));
            case "I":
            case "EM":
                return children.map((c) => (Object.assign(Object.assign({}, c), { italic: true })));
            case "U":
                return children.map((c) => (Object.assign(Object.assign({}, c), { underline: true })));
            case "S":
            case "STRIKE":
                return children.map((c) => (Object.assign(Object.assign({}, c), { strikethrough: true })));
            case "CODE":
                return children.map((c) => (Object.assign(Object.assign({}, c), { code: true })));
            default:
                return children;
        }
    };
    function groupLists(nodes) {
        const result = [];
        let currentList = null;
        for (const node of nodes) {
            if (node.type === "list-item" && node.listType) {
                if (!currentList || currentList.type !== node.listType) {
                    currentList = { type: node.listType, children: [] };
                    result.push(currentList);
                }
                currentList.children.push(Object.assign(Object.assign({}, node), { listType: undefined }));
            }
            else {
                currentList = null;
                result.push(node);
            }
        }
        return result;
    }
    const bodyNodes = Array.from(doc.body.childNodes)
        .map(walkNode)
        .filter((n) => n !== null)
        .flat();
    const grouped = groupLists(bodyNodes);
    return grouped.length
        ? grouped
        : [{ type: "paragraph", children: [createTextNode()] }];
}
export function isListType(value) {
    return value === "numbered-list" || value === "bulleted-list";
}
export function isTextTag(value) {
    return (value === "paragraph" ||
        value === "heading-one" ||
        value === "heading-two" ||
        value === "heading-three" ||
        value === "heading-four" ||
        value === "heading-five" ||
        value === "heading-six" ||
        value === "block-quote");
}
export function isRichElementType(value) {
    return (isListType(value) ||
        isTextTag(value) ||
        value === "list-item" ||
        value === "link" ||
        value === "image");
}

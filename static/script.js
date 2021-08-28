/* ========== BACKLINK JUMPER ========== */
(function() {
    const pageId = document.body.dataset.page_id
    document.querySelectorAll(".page-link").forEach(n => {
        let href = n.href
        if (href.endsWith("/")) {
            href = href.slice(0, href.length - 1)
            href += `#${pageId}`
        }
        n.href = href
    })
})();

/* ======= CLICK ON HEADER TO COPY TO CLIPBOARD ======= */
(() => {
    const elem = document.getElementById("header-title")
    elem.title = "Copy note path to clipboard"
    const filename = document.body.dataset.file_name
    elem.addEventListener('click', () => {
        navigator.clipboard.writeText(filename)
    })
    elem.style.cursor = "copy"
})();

/* ======== LINK ENHANCER ======= */
document.querySelectorAll("a[href^='http']").forEach(n => {
    const url = n.href;
    const urlObj = new URL(url)
    if (urlObj.hostname === "localhost") {
        return
    }
    const icon = "https://s2.googleusercontent.com/s2/favicons?domain_url=" + url;
    const before = document.createElement("span");
    before.className="icon"
    before.style.backgroundImage = `url(${icon})`;
    (async function test () {
        const trimmedURL = url.replace(/https?:\/\/?/, "");
        const res = await fetch("https://url-title.vercel.app/" + trimmedURL)
        if (!res.ok) {
            console.log(`failed to fetch title for '${trimmedURL}'`)
            return
        }
        const text = await res.text()
        n.title = text
        n.classList.add("with-icon")
        n.style.setProperty("--icon", `url(${icon})`);
        n.style.paddingLeft = "20px";
    })()
});

/* =========== FATHERPROP ======= */
// this bad boy forwards it's attributes to the parent element
document.querySelectorAll("fatherprop").forEach(n => {
    let props = {};
    const attributes = n.getAttributeNames()
    const parentElement = n.parentElement
    n.getAttributeNames().forEach((attr) => {
        parentElement.setAttribute(attr, n.getAttribute(attr));
    })
    parentElement.removeChild(n)
})

/* =========== THEME CHOOSER ======== */
window.toggleTheme = () => {
    document.body.classList.toggle('dark')
}
document.querySelectorAll(".theme-chooser").forEach(n => {
    n.style.cursor = "pointer"
    n.addEventListener('click', toggleTheme)
})

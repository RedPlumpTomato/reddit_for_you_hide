// Hides Reddit's "For You" tab and switches the home feed to "Following".
// Matches by visible text so it survives class-name changes, and walks open
// shadow roots (Reddit uses many).
const FOR_YOU = /^\s*for you\s*$/i;
const FOLLOWING = /^\s*following\s*$/i;
const ENTRY = 'li, [role="tab"], a, button, faceplate-tab, tab-item';

// Collect elements (across shadow roots) whose text is exactly the label.
function findByLabel(re, root = document.body, out = []) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT);
  let node = walker.currentNode;
  while (node) {
    if (node.shadowRoot) findByLabel(re, node.shadowRoot, out);
    if (node.children.length <= 1 && node.textContent.length < 20 && re.test(node.textContent)) {
      out.push(node);
    }
    node = walker.nextNode();
  }
  return out;
}

function hideForYou() {
  for (const el of findByLabel(FOR_YOU)) {
    const entry = el.closest(ENTRY) || el;
    const target = entry.closest("li") || entry;
    if (target.dataset.hideForYou) continue;
    target.dataset.hideForYou = "1";
    target.style.setProperty("display", "none", "important");
  }
}

// Switch to Following once per visit to the home page (SPA-aware), so we
// don't fight the user if they pick another feed afterwards.
let switchedFor = null;
function isHome() {
  return location.pathname === "/" || location.pathname === "";
}

function switchToFollowing() {
  if (!isHome()) { switchedFor = null; return; }
  if (switchedFor === location.href) return;
  const el = findByLabel(FOLLOWING)[0];
  if (!el) return;
  const tab = el.closest(ENTRY) || el;
  switchedFor = location.href;
  const selected = tab.getAttribute("aria-selected") === "true" ||
                   tab.getAttribute("aria-current") === "page";
  if (!selected) tab.click();
}

let queued = false;
function run() {
  if (queued) return;
  queued = true;
  setTimeout(() => {
    queued = false;
    switchToFollowing(); // before hiding, in case hiding affects layout
    hideForYou();
  }, 150);
}

run();
new MutationObserver(run).observe(document.documentElement, { childList: true, subtree: true });

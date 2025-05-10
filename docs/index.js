function $(id) { return document.getElementById(id) }

(function() {
    if (!location.hash) {
        location.hash = '#home';
    }

    if (window.RogueMon) {
        var source = $('source'),
            rogueMon = $('rogueMon');
        
        source.onscroll = function() {
            rogueMon.scrollTop = source.scrollTop;
        }
    }

    window.onhashchange = function() {
        var target, page, previousPage;
        
        if (location.hash) {
            page = target = document.querySelector(location.hash);
            
            while (page && page.className != 'page') {
                page = page.parentNode;
            }
        }
        
        (previousPage = document.querySelector('.current.page')) && (previousPage.className = 'page');
        
        if (page) {
            page.className = 'current page';
            document.body.className = 'in-page';
        } else {
            document.body.className = 'home';
        }

        if (target) {
            target.scrollIntoView(true);
        }
    };

    document.addEventListener('DOMContentLoaded', function() {
        const headers = document.querySelectorAll('.rulesSections-group-header');
        
        headers.forEach(header => {
            header.addEventListener('click', function() {
                const content = this.nextElementSibling;
                const isOpen = content.style.display === 'block';
                
                document.querySelectorAll('.rulesSections-content').forEach(item => {
                    item.style.display = 'none';
                });
                
                content.style.display = isOpen ? 'none' : 'block';
    
                // Reapply highlighting after toggling content visibility
                const query = document.getElementById("search").value.trim();
                if (query) {
                    highlightMatches(query);
                }
            });
        });
    });

    window.onhashchange();
})();

const backToTopBtn = document.getElementById('backToTopBtn');

window.onscroll = function() {
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    backToTopBtn.style.display = "block";
  } else {
    backToTopBtn.style.display = "none";
  }
};

backToTopBtn.onclick = function() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Currently the search function is broken \_0_/

/*
const searchIndex = [
    { title: "Home", id: "home", content: "Introduction to Roguemon, features, and gameplay overview." },
    { title: "Rules", id: "rules", content: "Detailed rules for gameplay, including phases, items, and banned moves." },
    { title: "Ascensions", id: "Ascensions", content: "Explanation of ascension levels and their increasing difficulty." },
    { title: "Setup Guides", id: "Setup", content: "Step-by-step guides for setting up BizHawk, Java, and the Roguemon tracker." },
    { title: "FAQ", id: "faq", content: "Frequently asked questions about gameplay, mechanics, and troubleshooting." },
    { title: "Want to Play?", id: "Want-To-Play", content: "Instructions on joining the Discord and getting started with Roguemon." }
];


function search(query) {
    query = query.toLowerCase();
    const results = [];

    // Search in the searchIndex
    searchIndex.forEach(item => {
        if (
            item.title.toLowerCase().includes(query) ||
            item.content.toLowerCase().includes(query)
        ) {
            results.push(item);
        }
    });

    // Search in the actual page content
    const sections = document.querySelectorAll('.page');
    sections.forEach(section => {
        const sectionContent = section.textContent.toLowerCase();
        if (sectionContent.includes(query)) {
            const id = section.id || section.getAttribute('data-id');
            if (!results.find(result => result.id === id)) {
                results.push({
                    title: section.querySelector('h1, h2, h3')?.textContent || "Untitled Section",
                    id: id,
                    content: "Content matches your search query."
                });
            }
        }
    });

    return results;
}

function highlightMatches(query) {
    if (!query) return; // Do nothing if the query is empty

    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Escape special characters
    const regex = new RegExp(`(${escapedQuery})`, 'gi'); // Match the query as a substring (case-insensitive)

    const sections = document.querySelectorAll('.page');
    sections.forEach(section => {
        // Remove previous highlights
        const walker = document.createTreeWalker(section, NodeFilter.SHOW_ELEMENT, null, false);
        while (walker.nextNode()) {
            const node = walker.currentNode;
            if (node.tagName === 'MARK' && node.classList.contains('highlight')) {
                const parent = node.parentNode;
                parent.replaceChild(document.createTextNode(node.textContent), node);
                parent.normalize(); // Merge adjacent text nodes
            }
        }

        // Apply new highlights
        const textWalker = document.createTreeWalker(section, NodeFilter.SHOW_TEXT, null, false);
        const nodesToHighlight = [];
        while (textWalker.nextNode()) {
            const node = textWalker.currentNode;
            if (regex.test(node.nodeValue)) {
                nodesToHighlight.push(node);
            }
        }

        nodesToHighlight.forEach(node => {
            const parent = node.parentNode;
            const highlightedHTML = node.nodeValue.replace(regex, '<mark class="highlight">$1</mark>');
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = highlightedHTML;

            // Replace the text node with highlighted content
            while (tempDiv.firstChild) {
                parent.insertBefore(tempDiv.firstChild, node);
            }
            parent.removeChild(node);
        });
    });
}

function displayResults(results, query) {
    const container = document.getElementById("results");
    container.innerHTML = "";

    if (!query.trim()) return; // Do nothing if the query is empty

    results.forEach(item => {
        const link = document.createElement("a");
        link.href = `#${item.id}`;
        link.textContent = item.title;
        link.style.display = "block";
        link.style.margin = "5px 0";
        link.style.color = "white";
        link.style.textDecoration = "none";
        link.style.fontWeight = "bold";
        container.appendChild(link);
    });

    // Highlight matches in the content
    highlightMatches(query);
}

document.getElementById("search").addEventListener("input", function () {
    const query = this.value.trim();
    const results = search(query);
    displayResults(results, query);
});
*/
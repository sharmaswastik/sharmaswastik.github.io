
document.addEventListener('DOMContentLoaded', () => {
    // Check if siteData is available (loaded from data.js)
    if (typeof siteData !== 'undefined') {
        const data = siteData;
        loadBio(data.bio);
        loadFocusAreas(data.focusAreas);
        loadProjects(data.projects);
        loadTeaching(data.teaching);
        loadGallery(data.gallery);
        loadTalks(data.talks);
        loadPublications(data.publications);
        loadReads(data.reads);
    } else {
        console.error('Error: siteData is not defined. Make sure assets/data/data.js is loaded.');
        // Fallback or alert for user locally
        const bioContainer = document.getElementById('bio-container');
        if (bioContainer) {
            bioContainer.innerHTML = '<p class="text-red-500">Error loading content. Please ensure assets/data/data.js is linked correctly.</p>';
        }
    }
});

function loadBio(bioHtml) {
    const container = document.getElementById('bio-container');
    if (container) {
        container.innerHTML = bioHtml;
    }
}

function loadFocusAreas(areas) {
    const container = document.getElementById('focus-areas-container');
    if (!container) return;

    const html = areas.map(area => `
        <div class="glass-panel p-4 rounded-lg flex items-start">
            <i data-lucide="${area.icon}" class="text-[var(--primary)] mt-1 mr-3"></i>
            <div>
                <h5 class="font-bold text-sm">${area.title}</h5>
                <p class="text-xs text-[var(--text-muted)] mt-1">${area.description}</p>
            </div>
        </div>
    `).join('');

    container.innerHTML = html;
    // Re-initialize Lucide icons for new content
    if (window.lucide) window.lucide.createIcons();
}

function loadProjects(projects) {
    const container = document.getElementById('projects-container');
    if (!container) return;

    const html = projects.map(project => `
        <div class="glass-panel p-6 rounded-xl border-l-4 border-l-[var(--primary)] group hover:translate-x-2 transition-transform duration-300">
            <div class="flex justify-between items-start mb-2">
                <h4 class="text-xl font-bold group-hover:text-[var(--primary)] transition-colors">${project.title}</h4>
                <span class="px-2 py-1 bg-[var(--primary)]/10 text-[var(--primary)] text-xs rounded font-mono">${project.tech}</span>
            </div>
            <p id="desc-${project.id}" class="text-[var(--text-muted)] text-sm mb-4">
                ${project.description}
            </p>

            <!-- AI Feature: Explain -->
            <div id="ai-result-${project.id}" class="hidden bg-[var(--primary)]/10 border border-[var(--primary)]/30 p-3 rounded mb-4 text-xs text-[var(--text-main)]"></div>

            <div class="flex gap-3 items-center">
                ${project.github ? `
                <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="text-xs flex items-center text-[var(--text-muted)] hover:text-[var(--text-main)]">
                    <i data-lucide="github" class="w-3 h-3 mr-1"></i> Repository
                </a>` : ''}
                ${project.docs ? `
                <a href="${project.docs}" target="_blank" rel="noopener noreferrer" class="text-xs flex items-center text-[var(--text-muted)] hover:text-[var(--text-main)]">
                    <i data-lucide="file-text" class="w-3 h-3 mr-1"></i> Documentation
                </a>` : ''}
                <div class="flex-grow"></div>
                <!-- Assuming explainProject is globally available -->
                <button onclick="explainProject('desc-${project.id}', 'ai-result-${project.id}')"
                    class="text-xs flex items-center bg-gradient-to-r from-[var(--primary)] to-[var(--primary)] hover:from-[var(--primary)] hover:to-[var(--primary)] text-white px-3 py-1 rounded shadow-lg transition-all">
                    <i data-lucide="sparkles" class="w-3 h-3 mr-2"></i> Explain Simply
                </button>
            </div>
        </div>
    `).join('');

    container.innerHTML = html;
    if (window.lucide) window.lucide.createIcons();
}

function handleSectionVisibility(sectionId, dataArray) {
    const section = document.getElementById(sectionId);
    if (!section) return;

    if (dataArray && dataArray.length > 0) {
        section.classList.remove('hidden');
    } else {
        section.classList.add('hidden');
    }
}

function loadTeaching(teaching) {
    // PMRF
    const pmrfContainer = document.getElementById('pmrf-teaching-container');
    handleSectionVisibility('pmrf-teaching-section', teaching.pmrf);
    if (pmrfContainer && teaching.pmrf) {
        pmrfContainer.innerHTML = teaching.pmrf.map(item => createTeachingCard(item)).join('');
    }

    // Institute
    const instituteContainer = document.getElementById('institute-teaching-container');
    handleSectionVisibility('institute-teaching-section', teaching.institute);
    if (instituteContainer && teaching.institute) {
        instituteContainer.innerHTML = teaching.institute.map(item => createTeachingCard(item)).join('');
    }

    if (window.lucide) window.lucide.createIcons();
}

function createTeachingCard(item) {
    return `
        <div class="glass-panel p-6 rounded-xl">
            <div class="flex justify-between items-start mb-2">
                <div>
                    <h4 class="text-lg font-bold text-[var(--text-main)]">${item.title}</h4>
                    <p class="text-sm text-[var(--primary)]">${item.role}</p>
                </div>
                <span class="text-xs font-mono text-[var(--text-muted)]">${item.period}</span>
            </div>
            <p class="text-sm text-[var(--text-muted)] mt-2">${item.description}</p>
            ${item.lectureLink ? `
            <div class="mt-4 flex gap-2">
                <span class="px-2 py-1 bg-[var(--bg-body)] border border-[var(--glass-border)] rounded text-xs text-[var(--text-muted)]">
                    <a href="${item.lectureLink}" target="_blank" rel="noopener noreferrer">YouTube Lectures</a>
                </span>
            </div>` : ''}
            ${item.tags ? `
            <div class="mt-4 flex gap-2">
                ${item.tags.map(tag => `<span class="px-2 py-1 bg-[var(--bg-body)] border border-[var(--glass-border)] rounded text-xs text-[var(--text-muted)]">${tag}</span>`).join('')}
            </div>` : ''}
        </div>
    `;
}

function loadGallery(images) {
    const container = document.getElementById('gallery-container');
    if (!container) return;

    const html = images.map(imgSrc => `
        <div class="gallery-item glass-panel group" onclick="openLightbox('${imgSrc}')">
            <img src="${imgSrc}">
            <div class="gallery-overlay"><i data-lucide="maximize-2" class="text-white w-8 h-8"></i></div>
        </div>
    `).join('');

    container.innerHTML = html;
    if (window.lucide) window.lucide.createIcons();
}

function loadPublications(publications) {
    // Preprints
    const preprintsContainer = document.getElementById('preprints-container');
    handleSectionVisibility('preprints-section', publications.preprints);

    if (preprintsContainer && publications.preprints) {
        preprintsContainer.innerHTML = publications.preprints.map(pub => `
            <div class="glass-panel p-6 rounded-xl relative">
                <span class="absolute top-6 right-6 text-xs font-mono text-[var(--text-muted)]">${pub.year}</span>
                <h4 class="text-lg font-bold pr-12">${pub.title}</h4>
                <p class="text-[var(--primary)] text-sm mb-2">${pub.authors}</p>
                <p class="text-[var(--text-muted)] text-sm italic mb-4">${pub.venue}</p>
                <div class="flex gap-3">
                    <button onclick="copyToClipboard('${pub.citation}')"
                        class="px-3 py-1 bg-[var(--primary)]/10 hover:bg-[var(--primary)]/20 rounded text-xs text-[var(--text-main)] flex items-center transition-colors">
                        <i data-lucide="quote" class="w-3 h-3 mr-2"></i> Cite
                    </button>
                    ${pub.link ? `
                    <a href="${pub.link}" target="_blank" rel="noopener noreferrer"
                        class="px-3 py-1 bg-[var(--primary)]/20 hover:bg-[var(--primary)]/30 text-[var(--primary)] rounded text-xs flex items-center transition-colors">
                        <i data-lucide="link" class="w-3 h-3 mr-2"></i> Link
                    </a>` : ''}
                </div>
            </div>
        `).join('');
    }

    // Journals
    const journalsContainer = document.getElementById('journals-container');
    handleSectionVisibility('journals-section', publications.journals);

    if (journalsContainer && publications.journals) {
        journalsContainer.innerHTML = publications.journals.map(pub => `
            <div class="glass-panel p-6 rounded-xl relative">
                <span class="absolute top-6 right-6 text-xs font-mono text-[var(--text-muted)]">${pub.year}</span>
                <h4 class="text-lg font-bold pr-12">${pub.title}</h4>
                <p class="text-[var(--primary)] text-sm mb-2">${pub.authors}</p>
                <p class="text-[var(--text-muted)] text-sm italic mb-4">${pub.venue} ${pub.status ? `<b>${pub.status}</b>` : ''}</p>
                 ${pub.doi ? `<p class="text-[var(--text-muted)] text-sm italic mb-4">${pub.doi}</p>` : ''}
                <div class="flex gap-3">
                    <button onclick="copyToClipboard('${pub.citation}')"
                        class="px-3 py-1 bg-[var(--primary)]/10 hover:bg-[var(--primary)]/20 rounded text-xs text-[var(--text-main)] flex items-center transition-colors">
                        <i data-lucide="quote" class="w-3 h-3 mr-2"></i> Cite
                    </button>
                    ${pub.link ? `
                    <a href="${pub.link}" target="_blank" rel="noopener noreferrer"
                        class="px-3 py-1 bg-[var(--primary)]/20 hover:bg-[var(--primary)]/30 text-[var(--primary)] rounded text-xs flex items-center transition-colors">
                        <i data-lucide="link" class="w-3 h-3 mr-2"></i> Link
                    </a>` : ''}
                     ${pub.preprint ? `
                    <a href="${pub.preprint}" target="_blank" rel="noopener noreferrer"
                        class="px-3 py-1 bg-[var(--primary)]/20 hover:bg-[var(--primary)]/30 text-[var(--primary)] rounded text-xs flex items-center transition-colors">
                        <i data-lucide="file-text" class="w-3 h-3 mr-2"></i> Preprint
                    </a>` : ''}
                    ${pub.code ? `
                    <a href="${pub.code}" target="_blank" rel="noopener noreferrer"
                        class="px-3 py-1 bg-[var(--primary)]/20 hover:bg-[var(--primary)]/30 text-[var(--primary)] rounded text-xs flex items-center transition-colors">
                        <i data-lucide="code" class="w-3 h-3 mr-2"></i>Code
                    </a>` : ''}
                </div>
            </div>
        `).join('');
    }

    // Conferences
    const conferencesContainer = document.getElementById('conferences-container');
    handleSectionVisibility('conferences-section', publications.conferences);

    if (conferencesContainer && publications.conferences) {
        conferencesContainer.innerHTML = publications.conferences.map(pub => `
            <div class="glass-panel p-6 rounded-xl relative">
                <span class="absolute top-6 right-6 text-xs font-mono text-[var(--text-muted)]">${pub.year}</span>
                <h4 class="text-lg font-bold pr-12">${pub.title}</h4>
                <p class="text-[var(--primary)] text-sm mb-2">${pub.authors}</p>
                <p class="text-[var(--text-muted)] text-sm italic mb-4">${pub.venue} ${pub.status ? `<b>${pub.status}</b>` : ''}</p>
                ${pub.doi ? `<p class="text-[var(--text-muted)] text-sm italic mb-4">${pub.doi}</p>` : ''}
                ${pub.citation ? `
                <div class="flex gap-3">
                    <button onclick="copyToClipboard('${pub.citation}')"
                        class="px-3 py-1 bg-[var(--primary)]/10 hover:bg-[var(--primary)]/20 rounded text-xs text-[var(--text-main)] flex items-center transition-colors">
                        <i data-lucide="quote" class="w-3 h-3 mr-2"></i> Cite
                    </button>
                    ${pub.link ? `
                    <a href="${pub.link}" target="_blank" rel="noopener noreferrer"
                        class="px-3 py-1 bg-[var(--primary)]/20 hover:bg-[var(--primary)]/30 text-[var(--primary)] rounded text-xs flex items-center transition-colors">
                        <i data-lucide="link" class="w-3 h-3 mr-2"></i> Link
                    </a>` : ''}
                </div>` : ''}
            </div>
        `).join('');
    }
    if (window.lucide) window.lucide.createIcons();
}

function loadReads(reads) {
    // Fictional
    const fictionalContainer = document.getElementById('fictional-reads-container');
    handleSectionVisibility('fictional-reads-section', reads.fictional);

    if (fictionalContainer && reads.fictional) {
        fictionalContainer.innerHTML = reads.fictional.map(book => createBookCard(book, 'book')).join('');
    }

    // Technical
    const technicalContainer = document.getElementById('technical-reads-container');
    handleSectionVisibility('technical-reads-section', reads.technical);

    if (technicalContainer && reads.technical) {
        const icons = {
            "Power System Analysis": "zap",
            "A New Swing-Contract Design for Wholesale Power Markets": "trending-up",
            "Optimization Models in Electricity Markets": "activity",
            "Grokking Deep Reinforcement Learning": "brain-circuit"
        };
        technicalContainer.innerHTML = reads.technical.map(book => createBookCard(book, icons[book.title] || 'book')).join('');
    }

    // Papers
    const papersContainer = document.getElementById('paper-reads-container');
    handleSectionVisibility('paper-reads-section', reads.papers);

    if (papersContainer && reads.papers) {
        papersContainer.innerHTML = reads.papers.map(paper => `
            <div class="glass-panel p-4 rounded-lg">
                <h5 class="font-bold text-sm">${paper.title}</h5>
                <p class="text-xs text-[var(--primary)] mt-1">${paper.author}</p>
                <p class="text-xs text-[var(--text-muted)] mt-2">${paper.description}</p>
                <a href="${paper.link}" target="_blank" rel="noopener noreferrer"
                    class="inline-flex items-center mt-2 text-xs text-[var(--primary)] hover:underline">
                    <i data-lucide="external-link" class="w-3 h-3 mr-1"></i> Read Paper
                </a>
            </div>
        `).join('');
    }
    if (window.lucide) window.lucide.createIcons();
}

function loadTalks(images) {
    const container = document.getElementById('talks-container');
    if (!container) return;

    const html = images.map(imgSrc => `
        <div class="gallery-item glass-panel group" onclick="openLightbox('${imgSrc}')">
            <img src="${imgSrc}">
            <div class="gallery-overlay"><i data-lucide="maximize-2" class="text-white w-8 h-8"></i></div>
        </div>
    `).join('');

    container.innerHTML = html;
    if (window.lucide) window.lucide.createIcons();
}

function createBookCard(book, icon) {
    return `
        <div class="glass-panel p-4 rounded-lg flex items-start">
            <i data-lucide="${icon}" class="text-[var(--primary)] mt-1 mr-3 flex-shrink-0"></i>
            <div>
                <h5 class="font-bold text-sm">${book.title}</h5>
                <p class="text-xs text-[var(--text-muted)] mt-1">by ${book.author}</p>
                <p class="text-xs text-[var(--text-muted)] mt-2">${book.description}</p>
                <a href="https://www.google.com/search?q=${encodeURIComponent(book.searchQuery)}" target="_blank"
                    class="inline-flex items-center mt-2 text-xs text-[var(--primary)] hover:underline">
                    <i data-lucide="search" class="w-3 h-3 mr-1"></i> Search
                </a>
            </div>
        </div>
    `;
}

(() => {
  "use strict";

  const root = document.getElementById("view-root");
  const sectionLabel = document.getElementById("current-section");
  const sidebar = document.getElementById("admin-sidebar");
  const backdrop = document.querySelector(".sidebar-backdrop");
  const modal = document.getElementById("editor-modal");
  const toastRegion = document.getElementById("toast-region");

  const moduleCards = [
    ["bi-newspaper", "News & Updates", "Prepare, review, schedule and publish approved articles.", "news"],
    ["bi-megaphone", "Announcements", "Manage the short notices and banner messages shown on the website.", "announcements"],
    ["bi-layout-text-sidebar", "Navigation & Footer", "Update menu labels, links, order and footer information.", "navigation"],
    ["bi-images", "Media Library", "Upload and organise approved photographs, logos and documents.", "media"],
    ["bi-building", "Organisation Profile", "Manage the organisation description, mission, vision and focus areas.", "organisation"],
    ["bi-sliders", "Website Settings", "Manage contact details, social links, SEO defaults and homepage notices.", "settings"],
    ["bi-clock-history", "Activity Log", "Review content changes and administrative actions.", "activity"],
    ["bi-shield-lock", "Admin Account", "Manage the main administrator's sign-in and account security.", "security"]
  ];

  const views = {
    overview: () => `
      <div class="page-heading">
        <div><span class="eyebrow">WORKSPACE OVERVIEW</span><h1>Welcome to TESR-U</h1><p>Manage your website content, organisation information and key settings from one place.</p></div>
        <button class="button button-primary" type="button" data-view="news"><i class="bi bi-plus-lg"></i> Create an update</button>
      </div>

      <div class="metrics-grid">
        <article class="metric-card"><div class="metric-top"><span class="metric-label">Published articles</span><span class="metric-icon"><i class="bi bi-newspaper"></i></span></div><div class="metric-value">—</div><div class="metric-foot">Available after database connection</div></article>
        <article class="metric-card"><div class="metric-top"><span class="metric-label">Draft articles</span><span class="metric-icon"><i class="bi bi-file-earmark-text"></i></span></div><div class="metric-value">—</div><div class="metric-foot">Available after database connection</div></article>
        <article class="metric-card"><div class="metric-top"><span class="metric-label">Scheduled updates</span><span class="metric-icon"><i class="bi bi-calendar-event"></i></span></div><div class="metric-value">—</div><div class="metric-foot">Available after database connection</div></article>
        <article class="metric-card"><div class="metric-top"><span class="metric-label">Media files</span><span class="metric-icon"><i class="bi bi-images"></i></span></div><div class="metric-value">—</div><div class="metric-foot">Available after storage is connected</div></article>
      </div>

      <div class="dashboard-grid">
        <div>
          <section class="panel">
            <div class="panel-heading"><div><h2>Recent content</h2><p>Your latest news, stories and announcements will appear here.</p></div><button class="text-link" type="button" data-view="news">View content <i class="bi bi-arrow-right"></i></button></div>
            <div class="empty-state"><span class="empty-icon"><i class="bi bi-journal-text"></i></span><h3>Nothing to show yet</h3><p>Once the content area is connected, you will see recently published articles and drafts here. The public News &amp; Updates page currently has no approved articles.</p></div>
          </section>
          <section class="panel">
            <div class="panel-heading"><div><h2>Publishing workflow</h2><p>Every update follows a clear review process.</p></div></div>
            <div class="workflow">
              <div class="workflow-step"><span class="workflow-number">01</span><div><strong>Prepare</strong><small>Write and add media</small></div></div>
              <div class="workflow-step"><span class="workflow-number">02</span><div><strong>Review</strong><small>Check details and preview</small></div></div>
              <div class="workflow-step"><span class="workflow-number">03</span><div><strong>Publish</strong><small>Publish now or schedule</small></div></div>
            </div>
          </section>
        </div>
        <div>
          <section class="panel">
            <div class="panel-heading"><div><h2>Quick actions</h2><p>Go directly to a common task.</p></div></div>
            <div class="quick-actions">
              <button class="quick-action" type="button" data-view="news"><i class="bi bi-pencil-square"></i><span><strong>Manage news &amp; updates</strong><small>Articles, stories and drafts</small></span><i class="bi bi-chevron-right"></i></button>
              <button class="quick-action" type="button" data-view="announcements"><i class="bi bi-megaphone"></i><span><strong>Update announcement</strong><small>Website notices and banners</small></span><i class="bi bi-chevron-right"></i></button>
              <button class="quick-action" type="button" data-view="media"><i class="bi bi-cloud-arrow-up"></i><span><strong>Open media library</strong><small>Photographs and documents</small></span><i class="bi bi-chevron-right"></i></button>
              <button class="quick-action" type="button" data-view="settings"><i class="bi bi-gear"></i><span><strong>Website settings</strong><small>Contact and site-wide details</small></span><i class="bi bi-chevron-right"></i></button>
            </div>
          </section>
          <section class="panel">
            <div class="panel-heading"><div><h2>Website status</h2><p>Public website and dashboard setup.</p></div></div>
            <div class="module-list">
              <div class="module-row"><span class="module-row-icon"><i class="bi bi-globe2"></i></span><div class="module-row-copy"><strong>Public website</strong><small>www.tesruganda.org</small></div><span class="status-pill">Live</span></div>
              <div class="module-row"><span class="module-row-icon"><i class="bi bi-database"></i></span><div class="module-row-copy"><strong>Content database</strong><small>TESR UGANDA Supabase project</small></div><span class="module-row-state">Not connected</span></div>
              <div class="module-row"><span class="module-row-icon"><i class="bi bi-shield-lock"></i></span><div class="module-row-copy"><strong>Admin authentication</strong><small>Main administrator access</small></div><span class="module-row-state">Next phase</span></div>
            </div>
          </section>
        </div>
      </div>

      <section class="section-spacer">
        <div class="panel-heading"><div><h2>Dashboard modules</h2><p>The areas that will be available to the main administrator.</p></div></div>
        <div class="module-grid">${moduleCards.map(card => moduleCard(card)).join("")}</div>
      </section>
    `,

    news: () => `
      <div class="page-heading">
        <div><span class="eyebrow">CONTENT MANAGEMENT</span><h1>News &amp; Updates</h1><p>Create and manage organisational announcements, programme updates and approved field stories.</p></div>
        <button class="button button-primary" type="button" data-action="open-editor"><i class="bi bi-plus-lg"></i> New article</button>
      </div>
      <div class="metrics-grid">
        <article class="metric-card"><div class="metric-top"><span class="metric-label">Published</span><span class="metric-icon"><i class="bi bi-check2-circle"></i></span></div><div class="metric-value">—</div><div class="metric-foot">Database connection pending</div></article>
        <article class="metric-card"><div class="metric-top"><span class="metric-label">Drafts</span><span class="metric-icon"><i class="bi bi-file-earmark"></i></span></div><div class="metric-value">—</div><div class="metric-foot">Database connection pending</div></article>
        <article class="metric-card"><div class="metric-top"><span class="metric-label">Scheduled</span><span class="metric-icon"><i class="bi bi-calendar2-check"></i></span></div><div class="metric-value">—</div><div class="metric-foot">Database connection pending</div></article>
        <article class="metric-card"><div class="metric-top"><span class="metric-label">Archived</span><span class="metric-icon"><i class="bi bi-archive"></i></span></div><div class="metric-value">—</div><div class="metric-foot">Database connection pending</div></article>
      </div>
      <div class="content-toolbar">
        <label class="search-box"><i class="bi bi-search"></i><input type="search" placeholder="Search articles" aria-label="Search articles" disabled></label>
        <div class="filter-group" aria-label="Article status filters"><button class="filter-chip active" type="button">All content</button><button class="filter-chip" type="button">Published</button><button class="filter-chip" type="button">Drafts</button><button class="filter-chip" type="button">Scheduled</button></div>
      </div>
      <section class="panel">
        <div class="panel-heading"><div><h2>All articles</h2><p>Content will appear here after the database is connected.</p></div><span class="status-pill">Not connected</span></div>
        <div class="empty-state"><span class="empty-icon"><i class="bi bi-file-earmark-plus"></i></span><h3>No articles loaded</h3><p>Use the editor preview to review the proposed article fields. Saving, editing and publishing will be activated after the secure content database is ready.</p><button class="button button-quiet" type="button" data-action="open-editor"><i class="bi bi-pencil-square"></i> Preview article editor</button></div>
      </section>
      <div class="info-banner"><i class="bi bi-shield-check"></i><span>Only approved information, authorised photographs and properly cleared stories should be published. Drafts will remain private until an administrator publishes them.</span></div>
    `,

    announcements: () => simpleView("CONTENT MANAGEMENT", "Announcements", "Manage short notices shown across the public website, including an optional homepage announcement banner.", [
      ["bi-megaphone", "Site-wide announcement", "A short notice displayed in the website header or homepage.", "Planned"],
      ["bi-calendar-event", "Start and end dates", "Choose when an announcement should appear and when it should stop.", "Planned"],
      ["bi-eye-slash", "Visibility controls", "Preview, activate, pause or archive announcements.", "Planned"]
    ], "No announcement has been configured yet", "When connected, you will be able to create a notice, preview it and choose where it appears on the public website."),

    navigation: () => simpleView("WEBSITE MANAGEMENT", "Navigation & Footer", "Manage the website's shared navigation and footer details without manually editing every HTML page.", [
      ["bi-list", "Main navigation", "Change menu labels, destinations, display order and visibility.", "Planned"],
      ["bi-grid", "Explore menu", "Manage the links displayed under the Explore menu.", "Planned"],
      ["bi-layout-text-window", "Footer content", "Update footer description, contact details, quick links and social links.", "Planned"],
      ["bi-megaphone", "Announcement placement", "Choose whether a current notice appears in the header or homepage.", "Planned"]
    ], "Navigation controls are not connected", "The current website menu and footer are shared across multiple static pages. These controls will centralise approved changes so the same details remain consistent throughout the site."),

    media: () => `
      <div class="page-heading"><div><span class="eyebrow">WEBSITE ASSETS</span><h1>Media Library</h1><p>Keep approved photographs, logos, banners and downloadable documents organised in one place.</p></div><button class="button button-primary" type="button" disabled><i class="bi bi-upload"></i> Upload media</button></div>
      <div class="metrics-grid">
        <article class="metric-card"><div class="metric-top"><span class="metric-label">Images</span><span class="metric-icon"><i class="bi bi-image"></i></span></div><div class="metric-value">—</div><div class="metric-foot">Storage connection pending</div></article>
        <article class="metric-card"><div class="metric-top"><span class="metric-label">Documents</span><span class="metric-icon"><i class="bi bi-file-earmark-pdf"></i></span></div><div class="metric-value">—</div><div class="metric-foot">Storage connection pending</div></article>
        <article class="metric-card"><div class="metric-top"><span class="metric-label">Brand assets</span><span class="metric-icon"><i class="bi bi-palette"></i></span></div><div class="metric-value">—</div><div class="metric-foot">Storage connection pending</div></article>
        <article class="metric-card"><div class="metric-top"><span class="metric-label">Storage used</span><span class="metric-icon"><i class="bi bi-hdd"></i></span></div><div class="metric-value">—</div><div class="metric-foot">Storage connection pending</div></article>
      </div>
      <section class="panel"><div class="panel-heading"><div><h2>All media</h2><p>Uploaded and approved assets will be listed here.</p></div></div><div class="empty-state"><span class="empty-icon"><i class="bi bi-images"></i></span><h3>Media library is not connected</h3><p>After Supabase Storage is configured, administrators will be able to upload, replace, organise and remove approved assets.</p></div></section>
      <div class="info-banner"><i class="bi bi-info-circle"></i><span>Use only photographs and documents that TESR-U is authorised to publish. Image descriptions and alternative text will be included for accessibility.</span></div>
    `,

    organisation: () => `
      <div class="page-heading"><div><span class="eyebrow">ORGANISATION INFORMATION</span><h1>Organisation Profile</h1><p>Manage the core organisation information used across the website.</p></div></div>
      <div class="setting-grid">
        ${settingCard("bi-building", "Organisation identity", "Core public identity and introductory details.", [["Registered name", "True Era Sustainable Response Uganda"], ["Short name", "TESR-U"], ["Established", "2024"], ["Registration", "Company limited by guarantee"]])}
        ${settingCard("bi-compass", "Vision & mission", "The organisation's approved direction and purpose.", [["Vision", "A resilient Uganda where empowered communities lead sustainable development…"], ["Mission", "Empower communities through sustainable practices, inclusion and partnerships…"]])}
        ${settingCard("bi-tree", "Strategic focus areas", "The six programme areas described in the organisation profile.", [["01", "Climate change adaptation & environmental conservation"], ["02", "Sustainable livelihoods & economic empowerment"], ["03", "Youth empowerment & skills development"], ["04", "Protection & social inclusion"], ["05", "Peacebuilding & community resilience"], ["06", "Humanitarian response & recovery"]])}
        ${settingCard("bi-geo-alt", "Programme locations", "Manage current programme areas separately from planned expansion.", [["Current areas", "Kiryandongo, Lamwo, Kitgum, Agago, Omoro and Gulu"], ["Planned expansion", "West Nile and other underserved areas"]])}
      </div>
      <div class="info-banner"><i class="bi bi-exclamation-circle"></i><span>These details are displayed as a reference from the current website and organisation profile. Editing will be enabled after we establish which fields should be centrally managed and confirm the source wording.</span></div>
    `,

    settings: () => `
      <div class="page-heading"><div><span class="eyebrow">SITE CONFIGURATION</span><h1>Website Settings</h1><p>Manage the information and presentation settings that apply throughout tesruganda.org.</p></div></div>
      <div class="setting-grid">
        ${settingCard("bi-card-heading", "Brand identity", "Control the organisation name and visual identity.", [["Website name", "True Era Sustainable Response Uganda"], ["Short name", "TESR-U"], ["Logo & favicon", "Managed in Media Library"], ["Brand colours", "Primary orange · Dark teal"]])}
        ${settingCard("bi-telephone", "Contact information", "Update the contact details shown on public pages.", [["Main phone", "+256 779 214 339"], ["Public email", "tesruganda@gmail.com"], ["Location", "Bweyale, Kiryandongo District, Uganda"], ["Full postal address", "Confirm before central publication"]])}
        ${settingCard("bi-share", "Social links", "Manage approved social media and external profile links.", [["Facebook", "Not configured"], ["Instagram", "Not configured"], ["LinkedIn", "Not configured"], ["Other links", "Not configured"]])}
        ${settingCard("bi-search", "Search & SEO defaults", "Set the default website title, description and share image.", [["Default page title", "TESR-U | True Era Sustainable Response Uganda"], ["Default description", "Sustainable development, environmental stewardship and resilience."], ["Social share image", "Managed in Media Library"]])}
        ${settingCard("bi-house", "Homepage display", "Manage the shared homepage notice and selected homepage sections.", [["Announcement banner", "Not configured"], ["Featured news", "Managed through News & Updates"], ["Homepage contact CTA", "Uses current contact details"]])}
        ${settingCard("bi-globe", "Website preferences", "Manage common settings that affect the public website.", [["Website address", "https://www.tesruganda.org/"], ["Timezone", "Africa/Kampala"], ["Language", "English"], ["Publishing review", "Administrator approval required"]])}
      </div>
      <div class="info-banner"><i class="bi bi-lock"></i><span>Settings are currently shown in read-only preview mode. Changes will only be saved after the protected settings service and audit history are implemented.</span></div>
    `,

    activity: () => simpleView("ADMINISTRATION", "Activity Log", "Review important changes made through the admin dashboard.", [
      ["bi-pencil-square", "Content activity", "Track article creation, edits, publication and archiving.", "Planned"],
      ["bi-gear", "Website settings", "Track updates to contact details, branding, navigation and footer.", "Planned"],
      ["bi-person-check", "Account activity", "Track successful sign-ins, sign-outs and security events.", "Planned"]
    ], "No activity has been recorded", "Activity history will begin once administrators use the connected dashboard. Each record will include the action, time and administrator account."),

    security: () => `
      <div class="page-heading"><div><span class="eyebrow">ACCESS &amp; SECURITY</span><h1>Admin Account</h1><p>Manage access to the TESR-U website administration area.</p></div></div>
      <div class="dashboard-grid">
        <section class="panel">
          <div class="panel-heading"><div><h2>Main administrator</h2><p>Initial access is limited to one administrator account.</p></div><span class="status-pill">Single admin</span></div>
          <div class="module-row"><span class="user-avatar">A</span><div class="module-row-copy"><strong>Main administrator</strong><small>Account identity will be shown after secure sign-in is connected.</small></div><span class="module-row-state">Not configured</span></div>
          <div class="info-banner"><i class="bi bi-info-circle"></i><span>The public website email is not automatically treated as the administrator's login. We will create or invite the specific administrator account and assign its role through a trusted setup process.</span></div>
        </section>
        <section class="panel">
          <div class="panel-heading"><div><h2>Security controls</h2><p>Controls planned for the live dashboard.</p></div></div>
          <div class="module-list">
            <div class="module-row"><span class="module-row-icon"><i class="bi bi-envelope-lock"></i></span><div class="module-row-copy"><strong>Email and password sign-in</strong><small>Private administrator access; no public registration.</small></div><span class="module-row-state">Planned</span></div>
            <div class="module-row"><span class="module-row-icon"><i class="bi bi-key"></i></span><div class="module-row-copy"><strong>Password recovery</strong><small>Secure password reset through the verified email.</small></div><span class="module-row-state">Planned</span></div>
            <div class="module-row"><span class="module-row-icon"><i class="bi bi-shield-check"></i></span><div class="module-row-copy"><strong>Database access policies</strong><small>Only the administrator can change protected content.</small></div><span class="module-row-state">Planned</span></div>
            <div class="module-row"><span class="module-row-icon"><i class="bi bi-journal-check"></i></span><div class="module-row-copy"><strong>Activity history</strong><small>Record publishing and settings changes.</small></div><span class="module-row-state">Planned</span></div>
          </div>
        </section>
      </div>
    `
  };

  function moduleCard(card) {
    return `<button class="module-card" type="button" data-view="${card[3]}"><span class="module-icon"><i class="bi ${card[0]}"></i></span><strong>${card[1]}</strong><p>${card[2]}</p></button>`;
  }

  function settingCard(icon, title, description, rows) {
    return `<article class="setting-card"><div class="setting-card-head"><i class="bi ${icon}"></i><div><h3>${title}</h3><p>${description}</p></div></div>${rows.map(row => `<div class="setting-preview"><span>${row[0]}</span><strong>${row[1]}</strong></div>`).join("")}</article>`;
  }

  function simpleView(eyebrow, title, description, modules, emptyTitle, emptyText) {
    return `
      <div class="page-heading"><div><span class="eyebrow">${eyebrow}</span><h1>${title}</h1><p>${description}</p></div></div>
      <div class="module-grid">${modules.map(item => moduleCard(item)).join("")}</div>
      <section class="panel section-spacer"><div class="panel-heading"><div><h2>${title} overview</h2><p>Tools and information available in this area.</p></div></div>
        <div class="module-list">${modules.map(item => `<div class="module-row"><span class="module-row-icon"><i class="bi ${item[0]}"></i></span><div class="module-row-copy"><strong>${item[1]}</strong><small>${item[2]}</small></div><span class="module-row-state">${item[3]}</span></div>`).join("")}</div>
      </section>
      <section class="panel section-spacer"><div class="empty-state"><span class="empty-icon"><i class="bi bi-hourglass-split"></i></span><h3>${emptyTitle}</h3><p>${emptyText}</p></div></section>
    `;
  }

  function setActiveView(viewName) {
    const view = views[viewName] || views.overview;
    root.innerHTML = view();
    const activeButton = document.querySelector(`.nav-link[data-view="${viewName}"]`);
    document.querySelectorAll(".nav-link[data-view]").forEach(button => {
      const isActive = button === activeButton;
      button.classList.toggle("active", isActive);
      const navItem = button.closest(".nav-item");
      if (navItem) navItem.classList.toggle("active", isActive);
      if (isActive) button.setAttribute("aria-current", "page");
      else button.removeAttribute("aria-current");
    });
    sectionLabel.textContent = ({
      overview: "Overview", news: "News & Updates", announcements: "Announcements",
      navigation: "Navigation & Footer", media: "Media Library", organisation: "Organisation Profile",
      settings: "Website Settings", activity: "Activity Log", security: "Admin Account"
    })[viewName] || "Overview";
    document.title = sectionLabel.textContent + " | TESR-U Admin";
    history.replaceState(null, "", "#" + viewName);
    closeSidebar();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function openSidebar() {
    sidebar.classList.add("is-open");
    backdrop.classList.add("is-visible");
  }

  function closeSidebar() {
    sidebar.classList.remove("is-open");
    backdrop.classList.remove("is-visible");
  }

  function showToast(message) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = '<i class="bi bi-info-circle"></i><span></span>';
    toast.querySelector("span").textContent = message;
    toastRegion.appendChild(toast);
    window.setTimeout(() => toast.remove(), 4200);
  }

  function openEditor() {
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    const firstInput = modal.querySelector('input[name="title"]');
    if (firstInput) firstInput.focus();
  }

  function closeEditor() {
    modal.hidden = true;
    document.body.style.overflow = "";
  }

  document.addEventListener("click", event => {
    const viewButton = event.target.closest("[data-view]");
    if (viewButton) {
      event.preventDefault();
      setActiveView(viewButton.dataset.view);
      return;
    }

    const actionButton = event.target.closest("[data-action]");
    if (!actionButton) return;
    const action = actionButton.dataset.action;
    if (action === "open-sidebar") openSidebar();
    if (action === "close-sidebar") closeSidebar();
    if (action === "open-editor") openEditor();
    if (action === "close-modal") closeEditor();
  });

  modal.addEventListener("click", event => {
    if (event.target === modal) closeEditor();
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      closeEditor();
      closeSidebar();
    }
  });

  document.addEventListener("click", event => {
    const chip = event.target.closest(".filter-chip");
    if (!chip) return;
    chip.parentElement.querySelectorAll(".filter-chip").forEach(item => item.classList.remove("active"));
    chip.classList.add("active");
    showToast("Article filters will work when the content database is connected.");
  });

  document.getElementById("article-preview-form").addEventListener("submit", event => {
    event.preventDefault();
    showToast("The editor fields are ready for review, but nothing was saved. Database connection is the next step.");
  });

  const initialView = window.location.hash.replace("#", "");
  setActiveView(views[initialView] ? initialView : "overview");
})();
const fs = require('fs');
const path = require('path');

const srcPath = 'd:/Rogi/dental_doctor_portfolio/src/pages/Dashboard/Dashboard.jsx';
const dashboardPath = 'd:/Rogi/dental_doctor_portfolio/src/pages/Dashboard/tabs/DashboardTab.jsx';
const contentLibraryPath = 'd:/Rogi/dental_doctor_portfolio/src/pages/Dashboard/tabs/ContentLibraryTab.jsx';
const siteSettingsPath = 'd:/Rogi/dental_doctor_portfolio/src/pages/Dashboard/tabs/SiteSettingsTab.jsx';
const analyticsPath = 'd:/Rogi/dental_doctor_portfolio/src/pages/Dashboard/tabs/AnalyticsTab.jsx';

const content = fs.readFileSync(srcPath, 'utf8');

const startDash = content.indexOf("{activeTab === 'Dashboard' && (");
const startContentLib = content.indexOf("{activeTab === 'Content Library' && (");
const startSite = content.indexOf("{activeTab === 'Site Settings' && (");
const startAnalytics = content.indexOf("{activeTab === 'Analytics' && (");
const endAnalytics = content.indexOf("</main>");

const dashStr = content.substring(startDash + "{activeTab === 'Dashboard' && (\n".length, startContentLib).trim().replace(/\}$/, '').trim().replace(/\}$/, '').trim().replace(/\)$/, '').trim();
const libStr = content.substring(startContentLib + "{activeTab === 'Content Library' && (\n".length, startSite).trim().replace(/\}$/, '').trim().replace(/\)$/, '').trim();
const siteStr = content.substring(startSite + "{activeTab === 'Site Settings' && (\n".length, startAnalytics).trim().replace(/\}$/, '').trim().replace(/\)$/, '').trim();
const analyticsStr = content.substring(startAnalytics + "{activeTab === 'Analytics' && (\n".length, endAnalytics).trim().replace(/\}$/, '').trim().replace(/\)$/, '').trim();

const writeComponent = (file, name, props, jsx) => {
    const code = `import React from 'react';
import { Link } from 'react-router-dom';

export default function ${name}({ ${props.join(', ')} }) {
  return (
    <>
${jsx}
    </>
  );
}
`;
    fs.writeFileSync(file, code);
};

writeComponent(dashboardPath, 'DashboardTab', ['C', 'content', 'activeSidebarTab', 'setActiveSidebarTab', 'setActiveModal', 'setSelectedItem', 'saveStatus', 'setHeroForm'], dashStr);
writeComponent(contentLibraryPath, 'ContentLibraryTab', ['C', 'cases', 'content'], libStr);
writeComponent(siteSettingsPath, 'SiteSettingsTab', ['C', 'content', 'setClinicForm', 'setAwardForm', 'setAboutForm', 'setFooterBioForm', 'setActiveModal'], siteStr);
writeComponent(analyticsPath, 'AnalyticsTab', ['C'], analyticsStr);

console.log("Extraction complete.");

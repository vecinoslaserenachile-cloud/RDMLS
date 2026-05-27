import React from 'react';
import { renderToString } from 'react-dom/server';
import ArchiCampaignRadio from './src/components/ArchiCampaignRadio.jsx';

try {
  const html = renderToString(<ArchiCampaignRadio />);
  console.log("RENDER SUCCESS!");
  console.log("HTML length:", html.length);
} catch (e) {
  console.error("RENDER ERROR:", e);
}

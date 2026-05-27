import React from 'react';
import { renderToString } from 'react-dom/server';
import ArchiCampaignRadio from './src/components/ArchiCampaignRadio.jsx';

try {
  const html = renderToString(React.createElement(ArchiCampaignRadio));
  console.log("RENDER SUCCESS!");
  console.log("HTML length:", html.length);
  if (html.length === 0) console.error("HTML IS EMPTY");
} catch (e) {
  console.error("RENDER ERROR:", e);
}

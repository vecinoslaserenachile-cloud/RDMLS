const https = require('https');
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'public', 'media', 'tano');
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

const file = fs.createWriteStream(path.join(dir, 'italy_regions.json'));
https.get("https://raw.githubusercontent.com/openpolis/geojson-italy/master/topojson/limits_IT_regions.topo.json", function(response) {
  response.pipe(file);
  file.on('finish', function() {
    file.close();
    console.log("Download complete.");
  });
}).on('error', function(err) {
  fs.unlink(path.join(dir, 'italy_regions.json'));
  console.error("Error downloading file: " + err.message);
});

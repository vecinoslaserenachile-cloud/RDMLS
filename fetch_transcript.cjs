const { YoutubeTranscript } = require('youtube-transcript');
YoutubeTranscript.fetchTranscript('en814QFgsFY')
  .then(t => {
    console.log(t.map(i => i.text).join(' '));
  })
  .catch(e => {
    console.error('Error:', e);
  });

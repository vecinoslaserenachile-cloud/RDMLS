const line = '<div style={{ ... }} />';
console.log('Line:', line);
console.log('Match /<div(?![^>]*\/>)/g:', line.match(/<div(?![^>]*\/>)/g));

const line = '<div className="max-w-[1920px] mx-auto relative z-10">';
console.log('Line:', line);
console.log('Match /<div/g:', line.match(/<div/g));
console.log('Match /<div(?![^>]*\/>)/g:', line.match(/<div(?![^>]*\/>)/g));

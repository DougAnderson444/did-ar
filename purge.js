// iterate through all .svelte files in ./package directory
import { globbySync } from 'globby';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const packageDir = path.resolve(__dirname, './package');
const files = fs.readdirSync(packageDir);
const svelteFiles = globbySync('./package/**/*.svelte');

svelteFiles.forEach((file) => {
	// remove all unused css in <style> tags from this svelte file
	const filePath = path.resolve(file);
	console.log('purging unused css from ', filePath);
	const fileContents = fs.readFileSync(filePath, 'utf8');
	const styleTagRegex = /<style[^]+?<\/style>/gi;
	const styleTagContents = fileContents.match(styleTagRegex);

	// get rest of file contents
	const restOfFile = fileContents.replace(styleTagRegex, '');

	// skip over any components without style
	if (!styleTagContents) return;

	// get content between <style> tags
	const styleTagContentRegex = /<style[^]+?<\/style>/i;
	const styleTagContent = styleTagContents[0].match(styleTagContentRegex)[0];
	// console.log('styleTagContent', styleTagContent);

	// regex parse out each class statement, keep the leading . and the {} block
	const classRegex = /\.([a-zA-Z0-9_-]+)[^]+?{[^]+?}/gi;
	const classStatements = styleTagContent.match(classRegex);

	// get all text from inside class="" from rest of file
	const classRegex2 = /class="([^]+?)"/gi;
	const classStatements2 = restOfFile.match(classRegex2);

	// get the string inside the quotes
	const classRegex3 = /class="([^]+?)"/i;
	const classStatements3 = classStatements2.map((statement) => statement.match(classRegex3)[1]);

	// parse the string into an array of classes
	const classRegex4 = /([a-zA-Z0-9_-]+)/gi;
	const classStatements4 = classStatements3.map((statement) => statement.match(classRegex4));

	const keep = classStatements.map((statement) => {
		const className = statement.match(/\.([a-zA-Z0-9_-]+)/i)[1];
		const isUsed = classStatements4.some((statement) => statement.includes(className));
		return isUsed ? statement : '';
	});

	// join keep together
	const newStyleTagContent = keep.join('');

	// wrap in <style> tags
	const newStyleTagBlock = `<style>${newStyleTagContent}</style>`;

	// replace old style tag with new style tag
	const newFileContents = fileContents.replace(styleTagContent, newStyleTagBlock);

	// write new file contents to file
	fs.writeFileSync(filePath, newFileContents);
});

// end process
process.exit(0);

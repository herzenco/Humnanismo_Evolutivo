import fs from 'node:fs';

const episodeFiles = {
  'yo-soy-nosotros': '/Users/herzen/Downloads/Yo_Soy_Nosotros_Episodes_Embed.txt',
  'lo-mejor-esta-por-venir': '/Users/herzen/Downloads/Lo_Mejor_Esta_Por_Venir_Episodes_Embed.txt',
  'el-arte-de-ser-empresario': '/Users/herzen/Downloads/El_Arte_de_Ser_Empresario_Episodes_Embed.txt',
  'ecologia-y-espiritualidad': '/Users/herzen/Downloads/Ecologia_y_Espiritualidad_Episodes_Embed.txt',
};

const contentFile = 'src/data/podcastEpisodeContent.ts';
const mediaFile = 'src/data/media.ts';
const pageFile = 'src/app/medios/[showId]/[episodeSlug]/page.tsx';

function parseEpisodeIds(filePath) {
  const text = fs.readFileSync(filePath, 'utf8');
  return [...text.matchAll(/open\.spotify\.com\/embed\/episode\/([A-Za-z0-9]+)/g)].map(
    (match) => match[1],
  );
}

const expectedIds = Object.values(episodeFiles).flatMap(parseEpisodeIds);
const uniqueExpectedIds = new Set(expectedIds);

if (expectedIds.length !== uniqueExpectedIds.size) {
  throw new Error('The supplied episode embed files contain duplicate Spotify episode IDs.');
}

if (!fs.existsSync(contentFile)) {
  throw new Error(`${contentFile} does not exist.`);
}

const mediaSource = fs.readFileSync(mediaFile, 'utf8');
const contentSource = fs.readFileSync(contentFile, 'utf8');
const pageSource = fs.readFileSync(pageFile, 'utf8');

const missingInMedia = expectedIds.filter((id) => !mediaSource.includes(id));
if (missingInMedia.length > 0) {
  throw new Error(`Missing Spotify IDs in ${mediaFile}: ${missingInMedia.join(', ')}`);
}

const missingInContent = expectedIds.filter((id) => !contentSource.includes(id));
if (missingInContent.length > 0) {
  throw new Error(`Missing Spotify IDs in ${contentFile}: ${missingInContent.join(', ')}`);
}

for (const requiredExport of ['generateStaticParams', 'generateMetadata']) {
  if (
    !pageSource.includes(`export function ${requiredExport}`) &&
    !pageSource.includes(`export async function ${requiredExport}`)
  ) {
    throw new Error(`${pageFile} must export ${requiredExport} for indexable episode pages.`);
  }
}

if (!pageSource.includes('metadataBase') || !pageSource.includes('index: true')) {
  throw new Error(`${pageFile} must define indexable metadata for podcast episodes.`);
}

console.log(`Verified ${expectedIds.length} podcast episode pages with supplied Spotify embeds.`);

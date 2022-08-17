import imageLoader from './lib/image-loader';
import imageProcess from './lib/image-process';

async function imageLoadNFlop(path: string): Promise<void> {
    const data = await imageLoader(path);
    if (!data) {
        return;
    }
    console.log(`image loaded from path ${path}`);
    const resultFileName = await imageProcess(data);
    console.log(`flipped image saved as ${resultFileName}`);
}

if (process.argv && process.argv.slice(2).length > 0) {
    imageLoadNFlop(process.argv.slice(2)[0]);
}

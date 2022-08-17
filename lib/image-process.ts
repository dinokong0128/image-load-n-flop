import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

export default async function(data: Buffer): Promise<string | undefined> {
    try {
        const {format} = await sharp(data, {failOn: 'none', unlimited: true}).metadata();
        const flippedBuffer = await sharp(data, {failOn: 'none', unlimited: true}).flip().flop().toBuffer();

        // attempt to create the folder just in case it doesn't exist
        fs.mkdirSync(path.join(__dirname, '../output'), {recursive: true});

        const fileName = `${Date.now()}.${format ?? 'jpg'}`;
        const filePath = path.join(__dirname, `../output/${fileName}`);

        fs.writeFileSync(filePath, flippedBuffer);

        return filePath;
    } catch(error) {
        console.error(error);
    }
}
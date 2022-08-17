import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

export default async function(data: Buffer): Promise<void> {
    try {
        const {format} = await sharp(data).metadata();
        const flippedBuffer = await sharp(data).flip().flop().toBuffer();

        // attempt to create the folder just in case it doesn't exist
        fs.mkdirSync(path.join(__dirname, '../output'), {recursive: true});

        const fileName = `${Date.now()}.${format ?? 'jpg'}`;
        const filePath = path.join(__dirname, `../output/${fileName}`);

        fs.writeFileSync(filePath, flippedBuffer);

        console.log(`image saved as ${filePath}`);
    } catch(error) {
        console.error(error);
    }
}
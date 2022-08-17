import axios from 'axios';
import fs from 'fs';

/**
 * Read image from path provided and return as array
 * @path can be local path to the file or url
 * @returns buffer of the image
 */
export default async function (path: string): Promise<Buffer | undefined> {
    try {
        const urlPattern = new RegExp('https?://(www.)?[-a-zA-Z0-9@:%._+~#=]{1,256}', 'i');

        // download the image if it is an url
        if(urlPattern.test(path)) {
            const {data} = await axios.get(path, {
                headers: {Accepts: 'image/*'}, responseType: 'arraybuffer'
            });
            return Buffer.from(data);
        }

        return fs.readFileSync(path);
    } catch (error) {
        console.error(error);
    }
}
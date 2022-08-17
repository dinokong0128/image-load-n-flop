"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const fs_1 = __importDefault(require("fs"));
/**
 * Read image from path provided and return as array
 * @path can be local path to the file or url
 * @returns buffer of the image
 */
async function default_1(path) {
    try {
        const urlPattern = new RegExp('https?://(www.)?[-a-zA-Z0-9@:%._+~#=]{1,256}', 'i');
        // download the image if it is an url
        if (urlPattern.test(path)) {
            const { data } = await axios_1.default.get(path, {
                headers: { Accepts: 'image/*' }, responseType: 'arraybuffer'
            });
            return Buffer.from(data);
        }
        return fs_1.default.readFileSync(path);
    }
    catch (error) {
        console.error(error);
    }
}
exports.default = default_1;

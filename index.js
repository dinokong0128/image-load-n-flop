"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const image_loader_1 = __importDefault(require("./lib/image-loader"));
const image_process_1 = __importDefault(require("./lib/image-process"));
async function imageLoadNFlop(path) {
    const data = await (0, image_loader_1.default)(path);
    if (!data) {
        return;
    }
    console.log(`image loaded from path ${path}`);
    const resultFileName = await (0, image_process_1.default)(data);
    console.log(`flipped image saved as ${resultFileName}`);
}
if (process.argv && process.argv.slice(2).length > 0) {
    imageLoadNFlop(process.argv.slice(2)[0]);
}

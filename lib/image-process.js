"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
async function default_1(data) {
    try {
        const { format } = await (0, sharp_1.default)(data, { failOn: 'none', unlimited: true }).metadata();
        const flippedBuffer = await (0, sharp_1.default)(data, { failOn: 'none', unlimited: true }).flip().flop().toBuffer();
        // attempt to create the folder just in case it doesn't exist
        fs_1.default.mkdirSync(path_1.default.join(__dirname, '../output'), { recursive: true });
        const fileName = `${Date.now()}.${format ?? 'jpg'}`;
        const filePath = path_1.default.join(__dirname, `../output/${fileName}`);
        fs_1.default.writeFileSync(filePath, flippedBuffer);
        return filePath;
    }
    catch (error) {
        console.error(error);
    }
}
exports.default = default_1;

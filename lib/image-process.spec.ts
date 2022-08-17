import imageProcess from './image-process';
import fs from 'fs';
import path from 'path';
jest.mock('fs', () => ({
    ...jest.requireActual('fs'),
    writeFileSync: jest.fn()
}));

describe('image process', () => {
    it('flips and save the provided image buffer', async() => {
        const originalImage = fs.readFileSync(path.join(__dirname, '__fixtures__/example.jpg'));
        const processedImage = fs.readFileSync(path.join(__dirname, '__fixtures__/example-processed.jpg'));
        await imageProcess(originalImage);

        expect(fs.writeFileSync).toHaveBeenCalled();
        const calledArguments = (fs.writeFileSync as jest.Mock).mock.calls[0];
        const resultImage = calledArguments[1];

        expect(resultImage.toString('base64')).toBe(processedImage.toString('base64'));
    });
});

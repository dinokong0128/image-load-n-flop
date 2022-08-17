import imageLoader from './image-loader';
import axios from 'axios';
import fs from 'fs';
jest.mock('axios', () => ({
    get: jest.fn()
}));
jest.mock('fs', () => ({
    readFileSync: jest.fn()
}));

describe('image loader', () => {
    it('loads image from url via axios', async() => {
        await imageLoader('https://ui.com/microsite/static/media/app-world-diagram.ac485e5a.jpg');
        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(fs.readFileSync).not.toHaveBeenCalled();
    });

    it('loads image from local file path', async() => {
        await imageLoader('/path/to/an/image');
        expect(axios.get).not.toHaveBeenCalled();
        expect(fs.readFileSync).toHaveBeenCalledTimes(1);
    });
})
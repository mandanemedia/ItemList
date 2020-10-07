import { Request, Response } from 'express';
import fetch from 'node-fetch';
// import { v4 as uuid } from 'uuid';
// import { HttpStatusCode } from '../models/types';
// import BaseError from '../utils/BaseError';
// import data from '../data.json';

class Giphy {
    static async formatImages(giphyData) {
        const formatedRes = giphyData.data.reduce((total, item) => {
            const year = item.import_datetime.split('-')[0];
            const image = item.images.fixed_height.url;
            if (!total[year]) {
                total[year] = [];
            }
            total[year].push(image);
            return total;
        }, {});
        return formatedRes;
    }

    static async searchImages(req: Request, res: Response) {
        const giphyPath = 'https://api.giphy.com/v1/gifs/search?';
        const apiKey = 'LEls10pQ1lqL1lxLehiPoD0P61SpGcQK';
        const { search } = req.query;
        const url = `${giphyPath}api_key=${apiKey}&q=${search}`;
        try {
            const response = await fetch(url);
            const json = await response.json();
            return res.json(await Giphy.formatImages(json));
        } catch (error) {
            console.log(error);
        }
    }
}

export default Giphy;

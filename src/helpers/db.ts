import {dbWords} from '../../db';
import { word } from '../types/base';

class DataBase {
    words: word[] = [];

    constructor(dataWords: word[]){
        this.words = dataWords;
    }

    getRandom(){
        return this.words[Math.floor(Math.random()*this.words.length)]
    }
}

export const db = new DataBase(dbWords);
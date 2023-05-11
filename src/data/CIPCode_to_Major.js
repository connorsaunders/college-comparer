//import major to cip code dictionary
import { Major_2_CIPCode } from "../data/Major_to_CIPCode";

const flippedObj = Object.entries(Major_2_CIPCode).reduce((obj, [key, value]) => {
    obj[value] = key;
    return obj;
  }, {});

export const CIPCode_2_Major = flippedObj;
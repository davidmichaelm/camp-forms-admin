import {parse} from "json2csv";
import fileDownload from 'js-file-download';

const downloadCsv = (data, fields) => {
    const myData = {
        field1: "asdf",
        field2: "qewr",
        field3: "zxcv"
    }
    const opts = { fields };

    try {
        const csv = parse(myData, opts);
        console.log(csv);
        fileDownload(csv, "data.csv");
    } catch (err) {
        console.error(err);
    }
};

export default downloadCsv;

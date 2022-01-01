import {parse} from "json2csv";
import fileDownload from 'js-file-download';

export const downloadCsv = (data, schema) => {
    const fields = getCsvFields(schema);
    const opts = { fields };

    try {
        const csv = parse(data, opts);
        fileDownload(csv, "data.csv");
    } catch (err) {
        console.error(err);
    }
};

export const getCsvFields = (schema) => {
    return schema.reduce((previousValue, currentStep) => {
        let inputs;
        if (currentStep.inputs) {
            inputs = currentStep.inputs;
        } else if (currentStep.substeps) {
            inputs = currentStep.substeps.map(substep => substep.inputs).flat();
        } else {
            return previousValue;
        }
        const fields = inputs.map(input => ({label: input.label, value: input.name}));
        return [...previousValue, ...fields];
    }, []);
};

import {Box} from "@mui/material";

const SubmissionFields = (props) => {
    const { submission } = props;

    return (
        <Box sx={{ width: "100%"}}>
            {submission && Object.keys(submission).map(field => {
                return <Box key={field}>{submission[field]}</Box>
            })}
        </Box>
    );
}

export default SubmissionFields;

import {Box, Typography, Table, TableBody, TableHead, TableRow, TableCell, useTheme} from "@mui/material";
import React from "react";

const SubmissionFields = (props) => {
    const {submission, formSchema, parentHeight} = props;
    const theme = useTheme();

    return (
        <Box sx={{width: "100%", height: parentHeight || "100%", overflowY: "auto"}}>
            {submission && formSchema?.map(step => (
                <Table key={step.name}>
                    <TableHead sx={{width: "100%"}}>
                        <TableRow>
                            <TableCell colSpan={2} sx={{py: 1, background: theme.palette.grey["50"], verticalAlign: "top"}}>
                                <Typography variant="body" color={theme.palette.grey["700"]}>{step.label}</Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {step?.inputs?.map(input => (
                            <TableRow key={input.name} pl={3} hover>
                                <TableCell sx={{py: 1, width: "25%"}}>
                                    <Typography fontWeight="bold" variant="body">{input.label}</Typography>
                                </TableCell>
                                <TableCell sx={{py: 1, verticalAlign: "top"}}>
                                    {submission[input.name]}
                                </TableCell>
                            </TableRow>
                        ))}
                        {step?.substeps?.map(substep => {
                            return substep.inputs?.map(input => (
                                <TableRow key={input.name} pl={3} hover>
                                    <TableCell sx={{py: 1, width: "25%"}}>
                                        <Typography fontWeight="bold" variant="body">{input.label}</Typography>
                                    </TableCell>
                                    <TableCell sx={{py: 1}}>
                                        {submission[input.name]}
                                    </TableCell>
                                </TableRow>
                            ))
                        })}
                    </TableBody>
                </Table>
            ))}
        </Box>
    );
}

export default SubmissionFields;

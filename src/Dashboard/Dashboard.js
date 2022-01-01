import {CardHeader, Divider, Card, CardContent, Grid} from "@mui/material";
import FormList from "./components/FormList";
import SubmissionList from "./components/SubmissionList";
import SubmissionFields from "./components/SubmissionFields";
import React, {useState} from "react";

const Dashboard = () => {
    const [formSelected, setFormSelected] = useState();
    const [submissionSelected, setSubmissionSelected] = useState();

    return (
        <Grid item sx={{display: "flex", flexDirection: "column", width: "100%"}}>
            <Card sx={{
                m: 3,
                pb: 0,
                borderRadius: 2,
                height: "100%",
                display: "flex",
                flexDirection: "column"
            }}>
                <CardHeader title="Camp Phillip Forms Admin"/>
                <Divider/>
                <CardContent
                    sx={{display: "flex", flexDirection: "row", height: "100%", p: 0, '&:last-child': {p: 0}}}>
                    <FormList
                        formIdSelected={formSelected}
                        onFormSelected={(formId) => setFormSelected(formId)}
                    />
                    <Divider orientation="vertical"/>
                    <SubmissionList
                        formIdSelected={formSelected}
                        onSubmissionSelected={(submission) => setSubmissionSelected(submission)}
                        submissionSelected={submissionSelected}
                    />
                    <Divider orientation="vertical"/>
                    <SubmissionFields submission={submissionSelected}/>
                </CardContent>
            </Card>
        </Grid>
    )
}

export default Dashboard;

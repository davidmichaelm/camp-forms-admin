import {CardHeader, Divider, Card, CardContent, Grid, Button, Typography} from "@mui/material";
import FormList from "./components/FormList";
import SubmissionList from "./components/SubmissionList";
import SubmissionFields from "./components/SubmissionFields";
import React, {useState} from "react";

const Dashboard = (props) => {
    const {onSignOut} = props;
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
                <CardHeader
                    title="Camp Phillip Forms Admin"
                    titleTypographyProps={{sx: {lineHeight: 1}}}
                    action={<Button variant={"contained"} onClick={onSignOut}>
                        Log Out
                    </Button>}
                />
                <Divider/>
                <CardContent
                    sx={{display: "flex", flexDirection: "row", height: "100%", p: 0, '&:last-child': {p: 0}}}>
                    <FormList
                        formIdSelected={formSelected?.id}
                        onFormSelected={(form) => setFormSelected(form)}
                    />
                    <Divider orientation="vertical"/>
                    <SubmissionList
                        formIdSelected={formSelected?.id}
                        onSubmissionSelected={(submission) => setSubmissionSelected(submission)}
                        submissionIdSelected={submissionSelected?.id}
                    />
                    <Divider orientation="vertical"/>
                    <SubmissionFields
                        submission={submissionSelected}
                        formSchema={formSelected?.schema}
                    />
                </CardContent>
            </Card>
        </Grid>
    )
}

export default Dashboard;

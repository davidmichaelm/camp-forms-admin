import {CardHeader, Divider, Card, CardContent, Grid, Button} from "@mui/material";
import SubmissionFields from "./components/SubmissionFields";
import React, {useEffect, useState} from "react";
import {collection, getDocs} from "firebase/firestore";
import {db} from "../firebase";
import DashboardColumn from "./components/DashboardColumn";

const Dashboard = (props) => {
    const {onSignOut} = props;

    const [forms, setForms] = useState([]);
    const [formIdSelected, setFormIdSelected] = useState();
    const formSelected = forms.find(form => form.id === formIdSelected);

    const [submissions, setSubmissions] = useState([]);
    const [submissionIdSelected, setSubmissionIdSelected] = useState();
    const submissionSelected = submissions.find(submission => submission.id === submissionIdSelected);

    useEffect(() => {
        const getForms = async () => {
            const data = [];
            const querySnapshot = await getDocs(collection(db, "forms"));
            querySnapshot.forEach((doc) => {
                data.push({
                    id: doc.id,
                    ...doc.data()
                });
            });

            setForms(data);
        }
        getForms();
    }, []);

    useEffect(() => {
        const getSubmissions = async () => {
            if (!formIdSelected) return;

            const data = [];
            const querySnapshot = await getDocs(collection(db, `forms/${formIdSelected}/submissions`));
            querySnapshot.forEach((doc) => {
                data.push({
                    id: doc.id,
                    label: doc.data().name,
                    ...doc.data()
                });
            });

            setSubmissions(data);
        }
        getSubmissions();
    }, [formIdSelected]);

    const onDownloadCsv = () => {

    };

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
                    <DashboardColumn
                        title="Forms"
                        list={forms}
                        onItemSelected={setFormIdSelected}
                        itemSelected={formIdSelected}
                    />
                    <Divider orientation="vertical"/>
                    <DashboardColumn
                        title="Submissions"
                        list={submissions}
                        onItemSelected={setSubmissionIdSelected}
                        itemSelected={submissionIdSelected}
                    >
                        {formIdSelected &&
                            <Button onClick={onDownloadCsv}>Download as CSV</Button>
                        }
                    </DashboardColumn>
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

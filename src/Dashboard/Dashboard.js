import {CardHeader, Divider, Card, CardContent, Grid, Button, Box} from "@mui/material";
import SubmissionFields from "./components/SubmissionFields";
import React, {useEffect, useRef, useState} from "react";
import {collection, getDocs} from "firebase/firestore";
import {db} from "../firebase";
import DashboardColumn from "./components/DashboardColumn";
import {downloadCsv} from "../downloadCsv";

const Dashboard = (props) => {
    const {onSignOut} = props;

    const [forms, setForms] = useState([]);
    const [formIdSelected, setFormIdSelected] = useState();
    const formSelected = forms.find(form => form.id === formIdSelected);

    const [submissions, setSubmissions] = useState([]);
    const [submissionIdSelected, setSubmissionIdSelected] = useState();
    const submissionSelected = submissions.find(submission => submission.id === submissionIdSelected);

    const cardContentRef = useRef(null);
    const [cardContentHeight, setCardContentHeight] = useState();
    useEffect(() => {
        setCardContentHeight(cardContentRef?.current?.clientHeight)
    }, []);

    const handleFormIdSelected = (formId) => {
        const value = formId === formIdSelected
            ? null
            : formId;

        setFormIdSelected(value);
        setSubmissionIdSelected(null);
    };

    const handleSubmissionIdSelected = (submissionId) => {
        const value = submissionId === submissionIdSelected
            ? null
            : submissionId;

        setSubmissionIdSelected(value);
    }

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
        downloadCsv(submissions, formSelected.schema);
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
                    sx={{display: "flex", flexDirection: "row", height: "100%", p: 0, '&:last-child': {p: 0}}}
                    ref={cardContentRef}
                >
                    <DashboardColumn
                        title="Forms"
                        list={forms}
                        onItemSelected={handleFormIdSelected}
                        itemSelected={formIdSelected}
                    />
                    <Divider orientation="vertical"/>
                    {formIdSelected &&
                        <DashboardColumn
                            title="Submissions"
                            list={submissions}
                            onItemSelected={handleSubmissionIdSelected}
                            itemSelected={submissionIdSelected}
                        >
                            {formIdSelected &&
                                <Button onClick={onDownloadCsv}>Download as CSV</Button>
                            }
                        </DashboardColumn>
                    }
                    <Divider orientation="vertical"/>
                    {submissionIdSelected
                        ? <SubmissionFields
                            submission={submissionSelected}
                            formSchema={formSelected?.schema}
                            parentHeight={cardContentHeight}
                        />
                        : <Box sx={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                            <img alt="Camp Phillip Logo" src={"./camp-logo.png"} width={200} height="auto" />
                        </Box>
                    }
                </CardContent>
            </Card>
        </Grid>
    )
}

export default Dashboard;

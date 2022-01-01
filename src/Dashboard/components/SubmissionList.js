import {collection, getDocs, doc, getDoc} from "firebase/firestore";
import {db} from "../../firebase";
import {useEffect, useState} from "react";
import DashboardColumn from "./DashboardColumn";

const SubmissionList = (props) => {
    const {formIdSelected, onSubmissionSelected, submissionIdSelected} = props;
    const [submissions, setSubmissions] = useState([]);

    const handleSubmissionSelected = (submissionId) => {
        onSubmissionSelected(submissions.find(s => s.id === submissionId));
    };

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

    return (
        <DashboardColumn
            title="Submissions"
            list={submissions}
            onItemSelected={handleSubmissionSelected}
            itemSelected={submissionIdSelected}/>
    );
};

export default SubmissionList;

import {collection, getDocs} from "firebase/firestore";
import {db} from "./firebase";
import {useEffect, useState} from "react";

const SubmissionList = (props) => {
    const { formSelected, onSubmissionSelected } = props;
    const [submissions, setSubmissions] = useState([]);

    useEffect(() => {
        const getSubmissions = async () => {
            if (!formSelected) return;

            const data = [];
            const querySnapshot = await getDocs(collection(db, `forms/${formSelected}/submissions`));
            querySnapshot.forEach((doc) => {
                data.push({
                    id: doc.id,
                    ...doc.data()
                });
            });

            setSubmissions(data);
        }
        getSubmissions();
    }, [formSelected]);

    return (
        <>
            {submissions.map(submission => {
                return <div key={submission.id} onClick={() => onSubmissionSelected(submission)}>{submission.id}</div>
            })}
        </>
    );
};

export default SubmissionList;

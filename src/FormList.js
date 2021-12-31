import {useEffect, useState} from "react";
import {collection, getDocs} from "firebase/firestore";
import {db} from "./firebase";

const FormList = (props) => {
    const { onFormSelected } = props;
    const [forms, setForms] = useState([]);

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

    return (
        <>
            <h1>Forms</h1>
            <div>
                {forms.map(form =>
                    <span key={form.id} onClick={() => onFormSelected(form.id)}>{form.name}</span>
                )}
            </div>
        </>
    );
};

export default FormList;

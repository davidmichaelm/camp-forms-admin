import {useEffect, useState} from "react";
import {collection, getDocs} from "firebase/firestore";
import {db} from "../../firebase";
import DashboardColumn from "./DashboardColumn";

const FormList = (props) => {
    const {onFormSelected, formIdSelected} = props;
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
        <DashboardColumn title="Forms" list={forms} onItemSelected={onFormSelected} itemSelected={formIdSelected} />
    );
};

export default FormList;
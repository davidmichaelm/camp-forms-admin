const SubmissionFields = (props) => {
    const { submission } = props;

    return (
        <div>
            {submission && Object.keys(submission).map(field => {
                return <div>{submission[field]}</div>
            })}
        </div>
    );
}

export default SubmissionFields;

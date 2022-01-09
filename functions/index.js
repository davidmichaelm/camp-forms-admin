const functions = require("firebase-functions");
const admin = require('firebase-admin');
const sgMail = require('@sendgrid/mail');

admin.initializeApp();
const db = admin.firestore();

exports.createSubmission = functions.firestore
    .document('forms/{formId}/submissions/{submissionId}')
    .onCreate(async (snap, context) => {
        const formId = context.params["formId"];

        try {
            const formDoc = db.doc(`forms/${formId}`);
            const formSnapshot = await formDoc.get();
            if (!formSnapshot.exists) {
                console.log(`Form id ${formId} not found`)
                return null;
            }

            const formData = formSnapshot.data();
            const formName = formData.name;

            const userCollection = db.collection('users')
            const userSnapshot = await userCollection.where('emails', 'array-contains', formId).get();
            if (userSnapshot.empty) {
                console.log(`No users subscribed to form id ${formId}`);
                return null;
            }

            const userEmails = [];
            userSnapshot.forEach(doc => {
                console.log(doc.data());
                userEmails.push(doc.id);
            });

            const msg = {
                to: userEmails,
                from: 'forms@davidmarquardt.dev',
                subject: 'Camp Phillip Form Submission Received',
                text: `Hello,\n\nA new submission has been received for the ${formName} form.\n\nVisit the Camp Phillip Forms Admin at https://camp-forms-admin.vercel.app/ to view the submission.`
            };

            sgMail.setApiKey(functions.config().sendgrid.key);
            sgMail
                .send(msg)
                .then(() => {}, error => {
                    console.error(error);

                    if (error.response) {
                        console.error(error.response.body)
                    }
                })

        } catch (error) {
            console.log(error);
        }

        return null;
    });

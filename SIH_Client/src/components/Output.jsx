import { useEffect, useState } from "react";


const Output = () => {
    const [value, setValue ] = useState(true);
    useEffect(() => {
        const timeout = setTimeout(() => {
            setValue(false);
        }, 2000);
    }, [])
    
    return (
        <>
            <br />
            <br />
            <br />
            <br />
            <br />
            {value? <>Wating for response</>: <>The Bracket Brigade team has proposed a solution to enhance organizational efficiency through the integration of an AI-driven chatbot, addressing the problem statement SIH1706 at the Smart India Hackathon 2024. The team identified key challenges such as time consumption, complex queries, and security concerns within the enterprise environment. They proposed a web-based, mobile-friendly chatbot that utilizes Natural Language Processing (NLP) for understanding and responding to employee queries accurately, as well as document processing for summarization and keyword extraction. The chatbot features a two-factor authentication (2FA) system, content moderation for language filtering, and multi-user support.

The team implemented the login page using Firebase for secure authentication, integrated a responsive chatbot using Dialogflow, and developed the frontend with React.js and TailwindCSS for a user-friendly interface. The backend is built with Node.js and Express.js, with MongoDB for data storage. The prototype leverages NLP and deep learning technologies such as Dialogflow or Hugging Face Transformers and TensorFlow.js or PyTorch for language processing. Security measures include 2FA integrated via Firebase Authentication or Node.js email libraries, and language filtering uses a predefined dictionary stored in MongoDB. Cloud services like AWS S3 or Google Cloud Storage are used for document uploads.

The proposed solution offers improved organizational efficiency by automating query handling and document analysis, thereby reducing the workload of HR and IT teams. It provides real-time responses to employees, leading to faster issue resolution. The solution is scalable, capable of handling multiple users concurrently, and can be expanded to support additional organizational departments. Security is enhanced through 2FA, ensuring only authenticated employees can access the chatbot. The system's document processing feature enables data-driven insights, contributing to better decision-making. The integration of the AI-driven chatbot promises increased productivity, cost savings, and scalability, addressing the initial challenges of time consumption, complex queries, and security concerns within the enterprise.</>}
        </>
    )
}

export default Output;
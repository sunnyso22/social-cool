import { useState, useEffect } from "react";
import { Container, Header, Form, Image, Button } from "semantic-ui-react";
import { useNavigate } from 'react-router-dom';
import firebase from "../utils/firebase";
import "firebase/compat/firestore";
import "firebase/compat/storage"

const NewPost = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [topics, setTopics] = useState([]);
    const [topicName, setTopicName] = useState([]);
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        firebase
            .firestore()
            .collection("topics")
            .get()
            .then((collectionSnapshot) => {
                const data = collectionSnapshot.docs.map(doc => {
                    return doc.data();
                });
                setTopics(data);
            });
        
    }, []);

    const options = topics.map(topic => {
        return {
            text: topic.name,
            value: topic.name
        };
    });

    const previewUrl = file ? URL.createObjectURL(file) : "https://react.semantic-ui.com/images/wireframe/image.png";

    const onSubmit = () => {
        setIsLoading(true);
        const documentRef = firebase.firestore().collection("posts").doc();
        const fileRef = firebase.storage().ref('post-images/' + documentRef.id);
        const metadata = {
            contentType: file.type
        };
        fileRef.put(file, metadata).then(() => {
            fileRef.getDownloadURL().then((imageUrl) => {
                documentRef.set({
                    title,
                    content,
                    topic: topicName,
                    createAt: firebase.firestore.Timestamp.now(),
                    author: {
                        displayName: firebase.auth().currentUser.displayName || "",
                        photoURL: firebase.auth().currentUser.photoURL || "",
                        uid: firebase.auth().currentUser.uid,
                        email: firebase.auth().currentUser.email
                    },
                    imageUrl
                }).then(() => {
                    setIsLoading(false);
                    navigate('/posts');
                });
            });
        });
        
    }

    return (
        <Container>
            <Header>發表文章</Header>
            <Form onSubmit={onSubmit}>
                <Image 
                    src={previewUrl}
                    size="large" 
                    floated="left"
                    rounded
                />
                <Button basic as="label" htmlFor="post-image">上傳文章圖片</Button>
                <Form.Input 
                    type="file" 
                    id="post-image" 
                    style={{display: 'none'}}
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <Form.Input 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="輸入文章標題" 
                />
                <Form.TextArea 
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="輸入文章內容" 
                />
                <Form.Dropdown
                    multiple={false}
                    value={topicName}
                    onChange={(e, {value}) => setTopicName(value)}
                    options={options}
                    placeholder="選擇文章主題"
                    selection
                />
                <Form.Button loading={isLoading}>送出</Form.Button>
            </Form>
        </Container>
    )
};

export default NewPost;
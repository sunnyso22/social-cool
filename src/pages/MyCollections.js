import React, { useEffect, useState } from 'react';
import { Item, Header } from 'semantic-ui-react';
import firebase from '../utils/firebase';
import Post from '../components/Post'

const MyCollections = ({ user }) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        firebase.firestore().collection("posts").where("collectedBy", "array-contains", user.uid).get().then((collectionSnapshot) => {
            const data = collectionSnapshot.docs.map((docSnapshot) => {
                const id = docSnapshot.id;
                return {...docSnapshot.data(), id};
            })
            setPosts(data);
        })
    }, [])

    return (
        <>
            <Header>我的收藏</Header>
            <Item.Group>
                {posts.map((post) => {
                        return <Post post={post} key={post.id} />
                    })
                }
            </Item.Group>
        </>
    );
};

export default MyCollections;
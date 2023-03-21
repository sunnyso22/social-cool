import React, { useEffect, useRef, useState } from 'react';
import { Item } from 'semantic-ui-react';
import { useLocation } from 'react-router-dom';
import { Waypoint } from 'react-waypoint';
import firebase from '../utils/firebase';
import Post from '../components/Post'

const AllPosts = () => {
    const location = useLocation();
    const urlSearchParams = new URLSearchParams(location.search);
    const currentTopic = urlSearchParams.get("topic");
    const [posts, setPosts] = useState([]);
    const lastPostSnapshotRef = useRef();

    useEffect(() => {
        if (currentTopic) {
            firebase.firestore().collection("posts").where("topic", "==", currentTopic).orderBy("createAt", "desc").limit(5).get().then((collectionSnapshot) => {
                const data = collectionSnapshot.docs.map((docSnapshot) => {
                    const id = docSnapshot.id;
                    return {...docSnapshot.data(), id};
                })
                lastPostSnapshotRef.current = collectionSnapshot.docs[collectionSnapshot.docs.length - 1];
                setPosts(data);
            })
        } else {
            firebase.firestore().collection("posts").orderBy("createAt", "desc").limit(5).get().then((collectionSnapshot) => {
                const data = collectionSnapshot.docs.map((docSnapshot) => {
                    const id = docSnapshot.id;
                    return {...docSnapshot.data(), id};
                })
                lastPostSnapshotRef.current = collectionSnapshot.docs[collectionSnapshot.docs.length - 1];
                setPosts(data);
            })
        }
    }, [currentTopic])

    return (
        <>
            <Item.Group>
                {posts.map((post) => {
                        return <Post post={post} key={post.id} />
                    })
                }
            </Item.Group>
            {/* <Waypoint onEnter={() => {
                if (lastPostSnapshotRef.current) {
                    if (currentTopic) {
                        firebase.firestore().collection("posts").where("topic", "==", currentTopic).orderBy("createAt", "desc").startAfter(lastPostSnapshotRef.current).limit(5).get().then((collectionSnapshot) => {
                            const data = collectionSnapshot.docs.map((docSnapshot) => {
                                const id = docSnapshot.id;
                                return {...docSnapshot.data(), id};
                            })
                            lastPostSnapshotRef.current = collectionSnapshot.docs[collectionSnapshot.docs.length - 1];
                            setPosts(data);
                        })
                    } else {
                        firebase.firestore().collection("posts").orderBy("createAt", "desc").startAfter(lastPostSnapshotRef.current).limit(5).get().then((collectionSnapshot) => {
                            const data = collectionSnapshot.docs.map((docSnapshot) => {
                                const id = docSnapshot.id;
                                return {...docSnapshot.data(), id};
                            })
                            lastPostSnapshotRef.current = collectionSnapshot.docs[collectionSnapshot.docs.length - 1];
                            setPosts([...posts, ...data]);
                        })
                    }
                }
            }}/> */}
        </>
    );
};

export default AllPosts;
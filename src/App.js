import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Container, Grid } from "semantic-ui-react";
import { useEffect, useState } from "react";
import firebase from "./utils/firebase";
import Header from "./Header";

import AllPosts from "./pages/AllPosts";
import Post from "./pages/Post";
import Signin from "./pages/Signin";
import NewPost from "./pages/NewPost";
import MyPosts from "./pages/MyPosts";
import MyCollections from "./pages/MyCollections";
import MySettings from "./pages/MySettings";

import Topics from "./components/Topics";
import MyMenu from "./components/MyMenu";


const App = () => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        firebase.auth().onAuthStateChanged((currentUser) => {
            setUser(currentUser);
        })
    }, []);

    
    return (
        <BrowserRouter>
            <Header user={user} />
            <Routes>
                <Route 
                    path="/posts/*"
                    element=
                    {
                        <Container>
                            <Grid>
                                <Grid.Row>
                                    <Grid.Column width={3}>
                                        <Topics />
                                    </Grid.Column>
                                    <Grid.Column width={10}>
                                        <Routes>
                                            <Route path="/" element={<AllPosts />} />
                                            <Route path=":postId" element={user ? <Post /> : <Navigate to="/posts" /> } />
                                        </Routes>              
                                    </Grid.Column>
                                    <Grid.Column width={3}></Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Container>
                    }
                />
                <Route 
                    path="/my/*" 
                    element=
                    {   user ?
                        (
                            <Container>
                                <Grid>
                                    <Grid.Row>
                                        <Grid.Column width={3}>
                                            <MyMenu />
                                        </Grid.Column>
                                        <Grid.Column width={10}>
                                            <Routes>
                                                <Route path="/posts" element={<MyPosts user={user} />} />
                                                <Route path="/collections" element={<MyCollections user={user} />} />
                                                <Route path="/settings" element={<MySettings user={user} />} />
                                            </Routes>
                                        </Grid.Column>
                                        <Grid.Column width={3}></Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Container> 
                        ) : (
                            <Navigate to="/posts" />
                        )
                    } 
                />
                <Route path="/signin" element={user ? <Navigate to="/posts" /> : <Signin />} />
                <Route path="/new-post" element={user ? <NewPost /> : <Navigate to="/posts" /> } />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
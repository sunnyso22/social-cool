import { useEffect, useState } from 'react';
import { Menu, Search } from 'semantic-ui-react';
import { Link, useNavigate } from 'react-router-dom';
import firebase from './utils/firebase';
import algolia from './utils/algolia';

const Header = ({ user }) => {

    const [inputValue, setInputValue] = useState("");
    const [results, setResults] = useState([]);
    
    const onSearchChange = (e, {value}) => {
        setInputValue(value);

        algolia.search(value).then((result) => {
            const searhResults = result.hits.map(hit => {
                return {
                    title: hit.title,
                    description: hit.content,
                    id: hit.objectID
                };
            });

            setResults(searhResults);
        });
    }

    const navigate = useNavigate();

    const onResultSelect = (e, { result }) => {
        navigate(`/posts/${result.id}`);
        setInputValue("");
    }

    return (
        <Menu>
            <Menu.Item as={Link} to="/posts">Social Cool</Menu.Item>
            <Menu.Item>
                <Search 
                    value={inputValue}
                    onSearchChange={onSearchChange}
                    results={results}
                    noResultsMessage="找不到相關文章"
                    onResultSelect={onResultSelect}
                />
            </Menu.Item>
            <Menu.Menu position='right'>
                {user ? <>
                    <Menu.Item as={Link} to="/new-post">發表文章</Menu.Item>
                    <Menu.Item as={Link} to="/my/posts">會員</Menu.Item>
                    <Menu.Item onClick={() => firebase.auth().signOut()}>登出</Menu.Item>
                </> : <Menu.Item as={Link} to="/signin">註冊/登入</Menu.Item>}    
            </Menu.Menu>
        </Menu>  
    );
};

export default Header;
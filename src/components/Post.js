import { Item, Image, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const Post = ({ post }) => {
    return (
        <Item as={Link} to={`/posts/${post.id}`}>
            <Item.Image src={post.imageUrl || "https://react.semantic-ui.com/images/wireframe/image.png"} size="medium" />
            <Item.Content>
                <Item.Meta>
                    {post.author.photoURL ? <Image avatar src={post.author.photoURL} /> : <Icon name="user circle" />}
                    {' '}
                    {post.author.displayName || "Username"} ‧ {post.topic}
                </Item.Meta>
                <Item.Header>{post.title}</Item.Header>
                <Item.Description>{post.content}</Item.Description>
                <Item.Extra>留言 {post.commentsCount || 0} ‧ 讚 {post.likedBy?.length || 0}</Item.Extra>
            </Item.Content> 
        </Item>
    )
}

export default Post;
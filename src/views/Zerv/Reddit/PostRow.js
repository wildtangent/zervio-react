import React from 'react';

function PostRow(props) {
  const post = props.post

  return (
    <tr key={post.id.toString()}>
        <th scope="row"><a href={post.url}>{post.id}</a></th>
        <td><a href={post.url}>{post.title}</a></td>
        <td>{post.created}</td>
        <td>{post.author}</td>
        <td></td>
    </tr>
  )
}

export default PostRow;

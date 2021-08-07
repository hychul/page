import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import IndexSelector from 'javascript/component/IndexSelector';
import 'resources/style/App.scss';
import PostListElement from './PostListElement';

const pagingSize = 10;

function PostList(props) {
  const page = props.page;
  const tag = props.tag;
  const history = props.history;
  const postList = props.postList;

  const [viewList, setViewList] = useState([]);
  const [tagViewHolder, setTagViewHolder] = useState();
  
  const getViewList = (postList, page, pagingSize) => {
    let ret = [];
  
    for (let i = (page - 1) * pagingSize; i < page * pagingSize && i < postList.length; i++) {
      let post = postList[i];
      ret.push(<PostListElement key={post.title} post={post} />);
    }

    return ret;
  };

  useEffect(() => {
    setViewList(getViewList(postList, page, pagingSize));
  }, [page, postList]);

  useEffect(() => {
    setTagViewHolder(tag == 'all' ? '' : '#' + tag);
  }, [tag, tagViewHolder])

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      rowGap: '2em',
      alignItems: 'center',
      width: 'calc(100% - 33px * 2)',
      padding: '33px',
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: '1280px',
        padding: '0px',
      }}>
        {viewList}
      </div>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
      }}>
        <span>
          {tagViewHolder}
        </span>
        <IndexSelector
          currentIndex={page}
          maxIndex={Math.ceil(postList.length / pagingSize)}
          onIndex={(index) =>{
            if (page == index) {
              return;
            }

            history.push({
              pathname: '/posts',
              search: `?page=${index}&tag=${tag}`
            });
          }}
        />
      </div>
    </div>
  );
}

export default withRouter(PostList);

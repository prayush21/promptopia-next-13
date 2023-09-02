'use client';

import { useEffect, useState } from 'react';
import PromptCard from './PromptCard';

export const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => {
        return (
          <PromptCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
          />
        );
      })}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);
  const filteredPosts = posts.filter((p) => {
    return (
      p.prompt.toLowerCase().includes(searchText) ||
      p.tag.toLowerCase().includes(searchText) ||
      p.creator.email.toLowerCase().includes(searchText) ||
      p.creator.username.toLowerCase().includes(searchText)
    );
  });
  function handleSearchChange(e) {
    setSearchText(e.target.value);
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();

      setPosts(data);
    };

    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        ></input>
      </form>{' '}
      <PromptCardList
        data={filteredPosts}
        handleTagClick={setSearchText}
      ></PromptCardList>
    </section>
  );
};

export default Feed;

'use client';

import Profile from '@components/Profile';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

function MyProfile() {
  const { data: session } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState();

  const fetchPosts = async () => {
    const response = await fetch(`/api/users/${session?.user.id}/posts`);
    const data = await response.json();

    setPosts(data);
  };

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      'Are you sure you want to delete this prompt?'
    );

    if (hasConfirmed) {
      try {
        await fetch(`api/prompt/${post._id.toString()}`, { method: 'DELETE' });

        fetchPosts();
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (session?.user.id) fetchPosts();
  }, [session]);

  return (
    <Profile
      name="My"
      desc="Welcome to my personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
}

export default MyProfile;

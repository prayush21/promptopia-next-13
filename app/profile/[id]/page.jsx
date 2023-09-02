'use client';

import Profile from '@components/Profile';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

function OtherProfile({ params }) {
  console.log('params', params);
  const { data: session } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState();
  const [userData, setUserData] = useState();

  const fetchPosts = async () => {
    const response = await fetch(`/api/users/${params?.id}/posts`);
    const data = await response.json();

    setPosts(data);
  };

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const fetchUserDetails = async () => {
    const response = await fetch(`/api/users/${params?.id}`);
    const data = await response.json();

    setUserData(data);
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
    if (params?.id) {
      fetchPosts();
      fetchUserDetails();
    }
  }, [params]);

  return (
    <Profile
      name={userData?.username}
      desc="Some description of profile page."
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
}

export default OtherProfile;

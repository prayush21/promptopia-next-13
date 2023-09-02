import User from '@models/user';
import { connectToDB } from '@utils/database';

export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const userData = await User.findById(params.id);

    if (!userData) return new Response('No User data found', { status: 404 });

    return new Response(JSON.stringify(userData), { status: 200 });
  } catch (error) {
    return new Response('Failed to fetch user data', { status: 500 });
  }
};

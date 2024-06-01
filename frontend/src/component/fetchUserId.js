import { jwtDecode } from "jwt-decode";
const fetchUserId = async () => {
  const token = localStorage.getItem('jwttoken');
 

  if (!token) {
    throw new Error('No token found, redirecting to login.');
  }

  const decodedToken = jwtDecode(token);
  const userId = decodedToken._id.toString();

  try {
    const response = await fetch(`https://movieshelf-two.vercel.app//users/user/${userId}`, {});
    if (response.ok) {
      const responseData = await response.json();
      console.log("from fetchUserId", responseData);
      if (responseData) {
        return responseData;
      } else {
        throw new Error('User not found');
      }
    } else {
      throw new Error('Error fetching user data: ' + response.statusText);
    }
  } catch (error) {
    throw new Error('Error fetching user data: ' + error.message);
  }
};

export default fetchUserId;

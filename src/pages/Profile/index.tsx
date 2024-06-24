import { useGetProfileQuery } from "../../store/ProfileSlice"; // Ensure this path is correct

const ProfilePage = () => {
  const { data, isLoading, error } = useGetProfileQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    if ("message" in error) {
      return <div>Error: {error.message}</div>;
    } else {
      return (
        <div>
          An unknown error occurred
          <pre>{JSON.stringify(data)}</pre>
          <pre>{JSON.stringify(error)}</pre>
        </div>
      );
    }
  }

  return (
    <div className="profile-page">
      <h1>Profile Page</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default ProfilePage;

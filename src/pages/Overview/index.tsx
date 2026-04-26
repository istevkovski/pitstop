import useAuth from "@hooks/useAuth";
import { auth } from "@services/firebase";
import { signOut } from "firebase/auth";

const Overview = () => {
  const { user } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      Congratulations {user?.email} <button onClick={handleSignOut}>Signout</button>
    </div>
  );
};

export default Overview;

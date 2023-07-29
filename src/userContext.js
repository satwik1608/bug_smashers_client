import React, { useMemo, useState } from "react";
import { getCurrentUser } from "./services/authService";
import { getInterviewer } from "./services/apiService";
import { useQuery } from "react-query";

const UserContext = React.createContext(null);

export const UserProvider = (props) => {
  const [id, setId] = React.useState(null);

  const [author, setAuthor] = useState(null);

  useMemo(() => {
    const currentUser = getCurrentUser();
    setAuthor(currentUser);
  }, []);

  const userQuery = useQuery(
    ["user", author],
    async () => {
      const obj = { email: author.email };
      const auth = await getInterviewer(obj);
      console.log("fasd", auth.data);
      return auth.data;
    },
    {
      enabled: !!author,
    }
  );

  React.useEffect(() => {
    if (userQuery.isSuccess) {
      console.log("chala");
      setId(userQuery.data);
    }
  }, [userQuery.data]);

  return (
    <UserContext.Provider value={{ id, setId }}>
      {props.children}
    </UserContext.Provider>
  );
};

export const useUser = () => React.useContext(UserContext);



import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../Contex/AuthProvider";


const useAdmin = () => {
  const { user } = useContext(AuthContext);

  const { data: isAdmin = false, isLoading: isAdminLoading } = useQuery({
    queryKey: ['isAdmin', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await fetch(`https://your-server.com/users/admin/${user.email}`);
      const data = await res.json();
      return data.admin;
    },
  });

  return [isAdmin, isAdminLoading];
};

export default useAdmin;

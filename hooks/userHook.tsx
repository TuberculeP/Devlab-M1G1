import { useEffect, useState } from "react";
import apiClient from "@/lib/apiClient";
import { PgUser } from "@/types/users";

const useUserHook = () => {
  const [user, setData] = useState<PgUser>();
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUserData = async () => {
    setLoading(true);
    const [userData, userDataError] = await apiClient.getRequest<PgUser>(
      "/auth/me"
    );
    if (userDataError) {
      setIsConnected(false);
      setLoading(false);
    } else {
      setIsConnected(true);
      setData(userData);
      setLoading(false);
    }
  };

  return { user, loading, isConnected, fetchUserData, setData };
};

export default useUserHook;

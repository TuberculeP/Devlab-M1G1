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

  useEffect(() => {
    // Abonnement à l'événement personnalisé 'refetch-data'
    const handleRefetch = () => {
      fetchUserData();
    };

    window.addEventListener("refetch-user", handleRefetch);

    // Cleanup lors du démontage du composant
    return () => {
      window.removeEventListener("refetch-user", handleRefetch);
    };
  }, []); // L'effet ne s'exécute qu'au montage/démontage

  return { user, loading, isConnected, fetchUserData };
};

export default useUserHook;

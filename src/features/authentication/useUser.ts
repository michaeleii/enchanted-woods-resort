import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";
import { User } from "@supabase/supabase-js";

function useUser() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  if (!user) return { user: {} as User, isLoading, isAuthenticated: false };

  return { user, isLoading, isAuthenticated: user?.role === "authenticated" };
}

export { useUser };

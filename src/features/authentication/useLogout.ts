import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout as logoutApi } from "../../services/apiAuth";

function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.removeQueries();
      toast.success("Logged out successfully");
      navigate("/login", { replace: true });
    },
    onError: () => {
      toast.error("There was an error logging out");
    },
  });
  return { logout, isLoading };
}
export { useLogout };

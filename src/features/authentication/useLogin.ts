import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginApi({ email, password }),
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data.user);
      toast.success("Logged in successfully");
      navigate("/dashboard", { replace: true });
    },
    onError: () => {
      toast.error("Invalid email or password");
    },
  });
  return { login, isLoading };
}

export { useLogin };

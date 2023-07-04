import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

function useLogin() {
  const navigate = useNavigate();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginApi({ email, password }),
    onSuccess: () => {
      toast.success("Logged in successfully");
      navigate("/dashboard");
    },
    onError: () => {
      toast.error("Provided credentials are incorrect");
    },
  });
  return { login, isLoading };
}

export { useLogin };

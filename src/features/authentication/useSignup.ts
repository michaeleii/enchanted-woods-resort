import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import { toast } from "react-toastify";

function useSignup() {
  const { isLoading, mutate: signup } = useMutation({
    mutationFn: signupApi,
    onSuccess: () => {
      toast.success(
        "Account successfully created! Please check your email to confirm your account"
      );
    },
    onError: () => {
      toast.error("There was an error signing up");
    },
  });
  return { isLoading, signup };
}

export { useSignup };

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateCurrentUser } from "../../services/apiAuth";

function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: ({
      password,
      full_name,
      avatar,
    }: {
      password?: string;
      full_name?: string;
      avatar?: File | null;
    }) => updateCurrentUser({ password, full_name, avatar }),
    onSuccess: ({ user }) => {
      toast.success("User edited successfully", { autoClose: 3000 });
      queryClient.setQueryData(["user"], user);
    },
    onError: (err) => {
      if (err instanceof Error) toast.error(err.message, { autoClose: 5000 });
    },
  });
  return { isUpdating, updateUser };
}

export { useUpdateUser };

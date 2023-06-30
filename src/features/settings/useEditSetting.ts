import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateSetting } from "../../services/apiSettings";

function useEditSetting() {
  const queryClient = useQueryClient();
  const { mutate: editSetting, isLoading: isEditing } = useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      toast.success("Settings edited successfully", { autoClose: 3000 });
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
    onError: (err) => {
      if (err instanceof Error) toast.error(err.message, { autoClose: 5000 });
    },
  });
  return { isEditing, editSetting };
}

export { useEditSetting };

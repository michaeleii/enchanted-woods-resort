import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createEditCabin } from "../../services/apiCabins";

function useCreateCabin() {
  const queryClient = useQueryClient();
  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("Cabin created successfully", { autoClose: 3000 });
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => {
      if (err instanceof Error) toast.error(err.message, { autoClose: 5000 });
    },
  });
  return { isCreating, createCabin };
}

export { useCreateCabin };

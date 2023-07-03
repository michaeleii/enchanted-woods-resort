import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createEditCabin } from "../../services/apiCabins";
import { CabinSchemaType } from "./CreateCabinForm";

function useEditCabin() {
  const queryClient = useQueryClient();
  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({
      cabinData,
      id,
    }: {
      cabinData: CabinSchemaType;
      id: number;
    }) => createEditCabin(cabinData, id),
    onSuccess: () => {
      toast.success("Cabin edited successfully", { autoClose: 3000 });
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => {
      if (err instanceof Error) toast.error(err.message, { autoClose: 5000 });
    },
  });
  return { isEditing, editCabin };
}

export { useEditCabin };

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin, NewCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useEditCabin() {
  const queryClient = useQueryClient();

  const { mutate: editCabin, isPending: isEditingCabin } = useMutation({
    mutationFn: ({ newCabinData, id }: { newCabinData: NewCabin; id: number | string }) =>
      createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success("Cabin edited successfully.");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  return { isEditingCabin, editCabin };
}
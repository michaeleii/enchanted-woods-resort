import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateBooking } from "../../services/apiBookings";

function useCheckout() {
  const queryClient = useQueryClient();

  const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
    mutationFn: (bookingId: number) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: (data) => {
      toast.success(`Booking ${data.id} successfuly checked out`, {
        autoClose: 3000,
      });
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
    onError: () => {
      toast.error("There was an error while checking out", { autoClose: 5000 });
    },
  });
  return { checkout, isCheckingOut };
}

export { useCheckout };

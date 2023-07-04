import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

function useBooking() {
  const { bookingId } = useParams();
  if (!bookingId) throw new Error("No bookingId");
  const {
    data: booking,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getBooking(+bookingId),
    retry: false,
  });

  return { booking, isLoading, error };
}

export { useBooking };

import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";
import {
  BookingsAfterDateData,
  ConfimedStaysData,
} from "../../services/apiBookings";
import { formatCurrency } from "../../utils/helpers";

function Stats({
  bookings,
  confirmedStays,
  numDays,
  cabinCount,
}: {
  bookings: BookingsAfterDateData;
  confirmedStays: ConfimedStaysData;
  numDays: number;
  cabinCount: number;
}) {
  const numBookings = bookings.length;
  const sales = bookings?.reduce(
    (acc, curr) => acc + (curr.total_price || 0),
    0
  );
  const checkins = confirmedStays.length;

  const occupancyRate = Math.round(
    (confirmedStays.reduce((acc, curr) => acc + (curr.num_nights || 0), 0) /
      (numDays * cabinCount)) *
      100
  );

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkins}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={occupancyRate + "%"}
      />
    </>
  );
}
export default Stats;


import { useBookings } from "../customhooks/usebooking";


import type { Booking } from "../types/Booking";

function MyBookings() {
  const { bookings, loading, error } = useBookings();
 console.log(bookings);
  if (loading) {
    return (
      <h2 className="text-center text-xl">
        Loading bookings...
      </h2>
    );
  }

  if (error) {
    return (
      <h2 className="text-red-500 text-center text-xl">
        {error}
      </h2>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        My Bookings
      </h1>

      {bookings.length === 0 ? (
        <p className="text-gray-500">
          No bookings found.
        </p>
      ) : (
        bookings.map(
          
          (booking) => (
            <div
              key={booking._id}
              className="border rounded-xl p-4 mb-6 shadow hover:shadow-lg transition"
            >
              <img
                src={booking.home.photo}
                alt={booking.home.name}
                className="w-full h-56 object-cover rounded-lg"
              />

              <div className="mt-4 space-y-2">
                <h2 className="text-2xl font-semibold">
                  {booking.home.name}
                </h2>

                <p className="text-gray-600">
                  📍 {booking.home.location}
                </p>

                {booking.home.description && (
                  <p className="text-gray-700">
                    {booking.home.description}
                  </p>
                )}

                <p className="text-green-600 font-bold text-lg">
                  ₹{booking.amount}
                </p>

                <div className="flex flex-wrap gap-3 mt-3">
                  <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">
                    Booking: {booking.bookingStatus}
                  </span>

                  <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm">
                    Payment: {booking.paymentStatus}
                  </span>
                </div>

                <p className="text-sm text-gray-500 mt-2">
                  Booked On:{" "}
                  {new Date(
                    booking.createdAt
                  ).toLocaleDateString()}
                </p>
              </div>
            </div>
          )
        )
      )}
    </div>
  );
}

export default MyBookings;
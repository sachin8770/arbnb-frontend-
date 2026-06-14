export const verifyPayment = async (
  paymentData
) => {
  const response = await fetch(
    "https://arbnb-backend-testing.onrender.com/booking/verify-payment",
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentData),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Payment verification failed"
    );
  }

  return data;
};
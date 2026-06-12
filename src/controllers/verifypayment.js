export const verifyPayment = async (
  paymentData
) => {
  const response = await fetch(
    "http://localhost:3000/booking/verify-payment",
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
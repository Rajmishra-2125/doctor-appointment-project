import React, { useState } from "react";
import { CreditCard, Loader2, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";
import paymentService from "../../services/paymentService";

const RazorpayCheckout = ({ appointmentId, appointmentFee, patientName, doctorName, onPaymentSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Load Razorpay script
      const isRazorpayLoaded = await loadRazorpayScript();
      if (!isRazorpayLoaded) {
        throw new Error("Failed to load Razorpay checkout script");
      }

      // Step 1: Create order on backend
      const orderResponse = await paymentService.createOrder(appointmentId);
      
      if (!orderResponse.data || !orderResponse.data.id) {
        throw new Error("Failed to create payment order");
      }

      const order = orderResponse.data;

      // Step 2: Open Razorpay checkout modal
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency || "INR",
        name: "MediCare",
        description: `Consultation with Dr. ${doctorName}`,
        order_id: order.id,
        prefill: {
          name: patientName || "",
          email: "",
          contact: "",
        },
        theme: {
          color: "#2563eb",
        },
        handler: async (response) => {
          try {
            setIsLoading(true);

            // Step 3: Verify payment signature on backend
            const verificationResponse = await paymentService.verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              appointmentId: appointmentId,
            });

            toast.success("Payment successful! Your appointment is confirmed.");
            
            if (onPaymentSuccess) {
              onPaymentSuccess(verificationResponse.data);
            }
          } catch (err) {
            const errorMessage = err.message || "Payment verification failed";
            setError(errorMessage);
            toast.error(errorMessage);
            console.error("Payment verification error:", err);
          } finally {
            setIsLoading(false);
          }
        },
        modal: {
          ondismiss: () => {
            setIsLoading(false);
            toast.error("Payment cancelled by user");
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

      rzp.on("payment.failed", (response) => {
        setIsLoading(false);
        const errorMessage = response.error?.description || "Payment failed. Please try again.";
        setError(errorMessage);
        toast.error(errorMessage);
      });
    } catch (err) {
      setIsLoading(false);
      const errorMessage = err.message || "An error occurred during payment";
      setError(errorMessage);
      toast.error(errorMessage);
      console.error("Payment error:", err);
    }
  };

  return (
    <div className="w-full">
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <button
        onClick={handlePayment}
        disabled={isLoading}
        className="w-full px-6 py-3 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <CreditCard className="w-5 h-5" />
            Pay ₹{appointmentFee} with Razorpay
          </>
        )}
      </button>

      <p className="text-xs text-gray-500 text-center mt-3">
        Your payment will be securely processed through Razorpay
      </p>
    </div>
  );
};

export default RazorpayCheckout;

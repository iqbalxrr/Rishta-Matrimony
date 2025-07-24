import React, { useContext, useEffect, useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import {  useParams } from "react-router";
import Swal from "sweetalert2";
import axiosInstance from "../Axios Instance/axios";
import { AuthContext } from "../Contex/AuthProvider";



const CheckoutPage = () => {
    const {bioId} = useParams();
   


  // console.log(mobile)

  const stripe = useStripe();
  const elements = useElements();
  const { user , biodata } = useContext(AuthContext);


  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (bioId) {
      axiosInstance
        .post("/create-payment-intent", { amount: 500 }) // $5 in cents
        .then((res) => setClientSecret(res.data.clientSecret))
        .catch(() => {
          Swal.fire("Error", "Failed to initialize payment", "error");
        });
    }
  }, [bioId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);
    const card = elements.getElement(CardElement);

    try {
      const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            email: user?.email,
          },
        },
      });

      if (error) {
        Swal.fire("Payment Failed", error.message, "error");
      } else if (paymentIntent.status === "succeeded") {
        // Save contact request to DB
        const contactData = {
          biodataId:bioId,
          requestBioId:biodata?.bioId,
          requestEmail:biodata?.email,
          requestName:biodata?.name,
          requestMobile:biodata?.mobile,
          transactionId: paymentIntent.id,
          status: "pending",
          
        };

        await axiosInstance.post("/contact-requests", contactData);
        Swal.fire("Success", "Contact request submitted!", "success");
      }
    } catch (err) {
      if(err.status == 409){

        Swal.fire("Error", "You have already requested this contact info", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-32 mx-6">
        <div className="max-w-lg mx-auto my-10 p-6 bg-white border rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6 text-orange-600">Request Contact Info</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">Biodata ID</label>
          <input
            type="text"
            value={bioId}
            readOnly
            className="w-full border rounded px-3 py-2 bg-gray-100 text-gray-800"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">Your Email</label>
          <input
            type="email"
            value={user?.email || ""}
            readOnly
            className="w-full border rounded px-3 py-2 bg-gray-100 text-gray-800"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 block  mb-1">Card Details</label>
          <div className="w-full border rounded px-3 py-3 bg-white">
            <CardElement options={{ style: { base: { fontSize: "16px" } } }} />
          </div>
        </div>

        <button
          type="submit"
          disabled={!stripe || !clientSecret || loading}
          className={`w-full py-2 rounded text-white font-semibold ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-orange-600 hover:bg-orange-700"
          }`}
        >
          {loading ? "Processing..." : "Pay $5"}
        </button>
      </form>
    </div>
    </div>
  );
};

export default CheckoutPage;

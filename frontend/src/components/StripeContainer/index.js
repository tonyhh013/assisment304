import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import React from "react"
import PaymentForm from "./PaymentForm"
import "./styles.css";
const PUBLIC_KEY = process.env.REACT_APP_LOCAL_STRIPE;
//const PUBLIC_KEY = "pk_test_51L8kryAr3fTSM490AIJtLJMQls6qsCuJNFcZYldXPIhsO0wd1HwmIaLFNdejxZvIIUOcUU7iXVplmc4Ksp2kthOQ000by4wmjF"
const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer({total}) {
	return (
		<Elements stripe={stripeTestPromise}>
			<PaymentForm total={total}/>
		</Elements>
	)
}

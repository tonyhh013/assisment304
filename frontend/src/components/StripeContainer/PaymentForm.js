import { CardElement,CardNumberElement, useElements, useStripe } from "@stripe/react-stripe-js"
import axios from "axios"
import React, { useState } from 'react'
import { Card } from 'antd';
import { Input } from 'antd';
import { useDispatch,useSelector } from "react-redux";
import LoadingButton from '@mui/lab/LoadingButton';
import {Navigate} from 'react-router-dom';
import { paymentRequest } from "../../actions/actions";
import { useParams } from "react-router-dom";
const { TextArea } = Input;
const CARD_OPTIONS = {
	iconStyle: "solid",
    hidePostalCode: true,
	style: {
		base: {
			iconColor: "#c4f0ff",
			color: "#fff",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "#fce883" },
			"::placeholder": { color: "#87bbfd" }
		},
		invalid: {
			iconColor: "#ffc7ee",
			color: "#ffc7ee"
		}
	}
}
export default function PaymentForm({total}) {
    const order = useSelector((state) => state.orderReducer);
    const dispatch = useDispatch();
    const [success, setSuccess ] = useState(false)
    const [address, setAddress] = useState('')
    const stripe = useStripe()
    const elements = useElements()
    const { orderId } = useParams();
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (address.length>0){
            const {error, paymentMethod} = await stripe.createPaymentMethod({
                type: "card",
                card: elements.getElement(CardElement),
                billing_details: {
                    address: { postal_code: '00000' }
                  },
            })
            if(!error) {
                try {
                    const {id} = paymentMethod

                    dispatch(paymentRequest(address,total*100,id,orderId))
                    // const response = await axios.post("http://localhost:3332/api/v1/order/payment", {
                    //     amount: total*100,
                    //     id
                    // })
        
                    // if(response.data.success) {
                    //     setSuccess(true)
                    // }
        
                } catch (error) {
                    
                }
            } else {
                
            }
        }
    }

    return (
        <>
        {!success ? 
        <form onSubmit={handleSubmit}>
            <Card
                style={{
                    width: 470
                }}
                >
                Address:<TextArea onChange={e => setAddress(e.target.value)} rows={4} placeholder="Please fill in your address"/>
                <p/>
                <fieldset className="FormGroup">
                <div className="FormRow">
                    <CardElement options={CARD_OPTIONS}/>
                </div>
            </fieldset>
            <LoadingButton
                onClick={handleSubmit}
                loading={order.loading}
                loadingIndicator="Loading…"
                variant="outlined"
            >
                PAY
            </LoadingButton>
            </Card>
            {order.success && <Navigate to={`/paymentsuccess`}/>}
            
        </form>
        :
       <div>
           <h2>You just bought a sweet spatula congrats this is the best decision of you're life</h2>
       </div> 
        }
            
        </>
    )
}

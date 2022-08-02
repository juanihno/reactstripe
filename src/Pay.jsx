import StripeCheckout from 'react-stripe-checkout'
import React, { useEffect, useState } from "react";
import axios from "axios";
import  { useHistory } from "react-router";



const KEY = "pk_test_51LRzDVEWWzWviwoS2k5YuQGmPI2FAcDYS8X3MP7qz1m5DUU9BTp5UQih9Tmn3cyTxlr2T57XxeELfhIA7KCgIjNc00fqbk4utk"

const Pay = () => {
    const [stripeToken, setStripeToken] = useState(null);
    const history = useHistory();
    const onToken = (token) => {
        setStripeToken(token);
    };

    useEffect(() => {
        const makeRequest = async () => {
            try {
                const res = await axios.post(
                    "http://localhost:5000/api/checkout/payment",
                    {
                        tokenId: stripeToken.id,
                        amount: 2000,
                    }
                );
                console.log(res.data);
                history.push("/success");
            } catch (err) {
                console.log(err);

            }
        };
        stripeToken && makeRequest();
    }, [stripeToken, history])

    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}
        >
            <StripeCheckout
                name="Ommy Shop"
                image=""
                billingAddress
                shippingAddress
                description="Your total is $20"
                amount={2000}
                token={onToken}
                stripeKey={KEY}
            >

                <button
                    style={{
                        border: "none",
                        width: 120,
                        borderRadius: 5,
                        padding: "20px",
                        backgroundColor: "black",
                        color: "white",
                        fontWeight: "600",
                        cursor: "pointer"
                    }}
                >
                    Pay Now
                </button>
            </StripeCheckout>
        </div>
    );
};

export default Pay;
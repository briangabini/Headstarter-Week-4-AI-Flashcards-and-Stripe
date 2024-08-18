import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const formatAmountForStripe = (amount) => {
    return Math.round(amount * 100);
};

export async function GET(req) {
    const url = new URL(req.url);
    const session_id = url.searchParams.get("session_id");

    if (!session_id) {
        return NextResponse.json(
            { error: "Session ID is required" },
            { status: 400 },
        );
    }

    try {
        const session = await stripe.checkout.sessions.retrieve(session_id);
        console.log("Retrieved session:", session); // Debugging line
        return NextResponse.json(session);
    } catch (error) {
        console.error("Error retrieving session:", error);
        return NextResponse.json(
            { error: "Error retrieving session" },
            { status: 500 },
        );
    }
}

export async function POST(req) {
    const body = await req.json();

    const formattedAmount = formatAmountForStripe(body.amount);

    const params = {
        mode: "subscription",
        payment_method_types: ["card"],
        line_items: [
            {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name:
                            body.amount === 10
                                ? "Pro Subscription"
                                : "Basic Subscription",
                    },
                    unit_amount: formattedAmount,
                    recurring: {
                        interval: "month",
                        interval_count: 1,
                    },
                },
                quantity: 1,
            },
        ],
        success_url: `${req.headers.get(
            "origin",
        )}/result?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.get(
            "origin",
        )}/result?session_id={CHECKOUT_SESSION_ID}`,
    };

    try {
        const checkoutSession = await stripe.checkout.sessions.create(params);

        return NextResponse.json(checkoutSession, {
            status: 200,
        });
    } catch (error) {
        console.error("Error creating checkout session:", error);
        return NextResponse.json(
            { error: "Error creating checkout session" },
            {
                status: 500,
            },
        );
    }
}

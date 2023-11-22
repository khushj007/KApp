import { loadStripe } from "@stripe/stripe-js";

export async function checkout({ lineItems }: any) {
  const stripe = await loadStripe(process.env.NEXT_PUBLIC_PAYMENT!);

  await stripe?.redirectToCheckout({
    mode: "payment",
    lineItems,
    successUrl: `${process.env.NEXT_PUBLIC_DOMAIN}/dashboard/session_id={CHECKOUT_SESSION_ID}`,
    cancelUrl: `${process.env.NEXT_PUBLIC_DOMAIN}`,
  });
}

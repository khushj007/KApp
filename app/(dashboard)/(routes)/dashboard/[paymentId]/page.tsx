"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
const Payment = ({ params }: any) => {
  const router = useRouter();
  const [error, setError] = useState(false);
  useEffect(() => {
    setError(false);
    (async () => {
      try {
        const response = await axios.get("/api/upgrade");

        if (response.data.status === 201) {
          toast.success(`subscribtion done`);
          router.refresh();
          router.push("/dashboard");
        }
      } catch (error: any) {
        console.log(`error while payment`, error.message);
        setError(error.message);
        toast.error(`there has been some error`);
      }
    })();
  }, []);

  return (
    <div>
      {!error ? `You are upgraded to pro pack` : `there has been some problem`}
    </div>
  );
};

export default Payment;

import openapi from "@/AI_API/AI_API";
export async function conversation(messages: any) {
  const response = await openapi.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages,
  });

  console.log(`conversation data send to api`);

  return response;
}

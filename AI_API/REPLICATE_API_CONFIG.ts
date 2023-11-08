import Replicate from "replicate";

export default new Replicate({
  auth: process.env.REPLICATE_AI_KEY,
});

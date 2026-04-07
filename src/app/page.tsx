import { connection } from "next/server";
import { HomePage } from "@/components/HomePage";

async function wait(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export default async function Home() {
  await connection();
  await wait(4000);

  return <HomePage />;
}

import { useState } from "react";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import toast from "react-hot-toast";
import emSphereLogo from "@/assets/eMPower_logo.png?url";

export default function Home() {
  const [name, setName] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Please enter your name before submitting.");
      return;
    }

    try {
      const res = await fetch("https://node-emsphere.onrender.com/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json",
          "Authorization" : "Bearer dev-token"
         },
        body: JSON.stringify({
          userId: "user123",
          title: "You have a new message!",
          message: `Hello, ${name}!`,
          icon: emSphereLogo
        })
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      toast.success("Notification sent to Windows client!");
      setName("");
    } catch (err) {
      console.error(err);
      toast.error("Failed to send notification. Please try again.");
    }
  };

  return (
    <main className="flex flex-col dark bg-black text-white min-h-screen items-center justify-center p-4">
      <div className="flex flex-col items-center justify-center space-y-4">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center space-y-2 w-full max-w-sm"
        >
          <Input
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button variant="outline" type="submit">
            Submit
          </Button>
        </form>
      </div>
    </main>
  );
}

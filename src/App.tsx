import { useState } from "react";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import toast from "react-hot-toast";
import reactSvg from "@/assets/react.svg?url";

export default function Home() {
  const [name, setName] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!("Notification" in window)) {
      toast.error("This browser does not support notifications.");
      return;
    }

    const showNotification = () => {
      if (!name) {
        toast.error("Please enter your name before submitting.");
        return;
      }
      const n = new Notification("You have a new message!", {
        body: `Hello, ${name}!`,
        icon: reactSvg,
        tag: "new-alert",
        requireInteraction: true,
      });

      n.onclick = () => {
        window.focus();
        console.log("Notification clicked");
      };
    };

    if (Notification.permission === "granted") {
      showNotification();
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          showNotification();
        } else {
          toast.error("Notifications are blocked. Please enable them.");
        }
      });
    } else {
      toast.error("Notifications are blocked. Please enable them.");
    }
  };

  return (
    <main className="flex flex-col dark bg-black text-white min-h-screen items-center justify-center p-4">
      <div className="flex flex-col items-center justify-center space-y-4">
        <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center space-y-2">
        <Input
          placeholder="Enter name"
          value={name || ""}
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

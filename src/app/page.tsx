import { Button, Link } from "@nextui-org/react";
import { GoSmiley } from "react-icons/go";

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl">Starting here...</h1>
      <Button
        as={Link}
        href="/members"
        color="danger"
        variant="bordered"
        startContent={<GoSmiley />}
      >
        Press Me
      </Button>
    </div>
  );
}

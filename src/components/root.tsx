import { Center } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <Center>
      <Outlet />
    </Center>
  );
}

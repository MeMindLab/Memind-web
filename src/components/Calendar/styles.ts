import styled from "@emotion/styled";
import { Stack } from "@chakra-ui/react";

export const SCalendar = styled(Stack)`
  overflow: hidden;
  .cell {
    position: relative;
    border-radius: 50%;
    &,
    button {
      width: 28px;
      background: transparent;
    }

    &.today button {
      background: #a9d0ff;
    }
  }

  .offset {
    position: absolute;
    left: 12px;
    bottom: -11px;
    text-align: center;
    z-index: 1;
    pointer-events: none;
    background: #a9d0ff;
    width: 7px;
    height: 7px;
    border-radius: 50%;
  }
` as unknown as typeof Stack;

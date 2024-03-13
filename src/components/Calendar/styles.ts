import styled from "@emotion/styled";
import { Stack } from "@chakra-ui/react";

export const SCalendar = styled(Stack)`
  overflow: hidden;
  .cell {
    width: 28px;
    height: 28px;
    position: relative;
    border-radius: 50%;
    &,
    button {
      background: transparent;
    }

    &.today button {
      background: #a9d0ff;
    }
  }

  .offset {
    position: absolute;
    left: 11px;
    bottom: -11px;
    text-align: center;
    z-index: 1;
    pointer-events: none;
    background: #a9d0ff;
    width: 7px;
    height: 7px;
    border-radius: 50%;
  }

  .icon {
    position: absolute;
    left: 2px;
    bottom: -24px;
  }
` as unknown as typeof Stack;

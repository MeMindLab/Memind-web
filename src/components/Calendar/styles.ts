import styled from "@emotion/styled";
import { Stack } from "@chakra-ui/react";

export const SCalendar = styled(Stack)`
  overflow: hidden;
  .header {
    flex: 1 0 auto;
  }
  .th {
    width: 48px;
    text-align: center;
    font-weight: 600;
  }
  .cell {
    flex: 0 0 auto;

    line-height: 2rem;
    text-align: center;
    font-weight: 600;
    position: relative;
    border-radius: 50%;
    &,
    button {
      width: 48px;
      height: 48px;
      background: transparent;
    }
    &.active button {
      /*background: orange;*/
    }
    &.today button {
      background: #a9d0ff;
    }
  }
  .today,
  .active {
    /*color: red;*/
  }
  .offset {
    position: absolute;
    left: 0;
    right: 0;
    text-align: center;
    bottom: -0.3rem;
    z-index: 1;
    pointer-events: none;
  }
` as unknown as typeof Stack;

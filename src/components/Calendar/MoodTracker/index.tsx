import { Box, Text, Flex } from "@chakra-ui/react";
import {
  IconLineChart,
  IconEmotionDownArrow,
  IconEmotionUpArrow,
} from "../../icons";

type EmotionBoxProps = {
  score: number;
  change: number;
};

const EmotionBox = ({ score, change }: EmotionBoxProps) => {
  const emotionChangeValue = change < 0;
  const color = emotionChangeValue ? "#EA3030" : "#2F8CFA";

  const formattedChange = emotionChangeValue
    ? change.toFixed(1)
    : `+${change.toFixed(1)}`;

  return (
    <Box
      width="351px"
      height="87px"
      bg="white"
      borderRadius="13px"
      boxShadow="0px 4px 4px rgba(212, 215, 225, 0.23)"
      p={4} // 패딩 추가
    >
      <Flex justifyContent="space-between">
        <Flex direction="column">
          <Text fontSize="16px" fontWeight="bold" color="#313131">
            이번주 감정 수치
          </Text>

          <Flex direction="row" alignItems="center">
            <Text
              paddingRight="12px"
              fontSize="32px"
              fontWeight="bold"
              color="#313131"
            >
              {score}
            </Text>

            <Flex alignItems="center">
              <Text fontSize="14px" color={color} mr="3px">
                {formattedChange}
              </Text>
              {emotionChangeValue ? (
                <IconEmotionDownArrow />
              ) : (
                <IconEmotionUpArrow />
              )}
            </Flex>
          </Flex>
        </Flex>
        <IconLineChart />
      </Flex>
    </Box>
  );
};

export default EmotionBox;

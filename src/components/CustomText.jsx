import { Text } from "react-native";

const CustomText = ({ fontWeight = "regular", ...props }) => {
    const typo = {
      light: "NotoSansThai-Light",
      regular: "NotoSansThai-Regular",
      bold: "NotoSansThai-Bold",
    };
  
    return (
      <Text {...props} style={[{ fontFamily: typo[fontWeight], ...props.style }]}>
        {props.children}
      </Text>
    );
  };
  
  export default CustomText;
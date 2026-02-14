import { View } from "react-native";
import Button from "../../../components/common/Button";
import LabelInput from "../../../components/common/LabelInput";

export default function Step1Screen({ navigation }) {
  function handleSave() {
    navigation.navigate("Step2");
  }

  return (
    <>
      <Button title="Save & Continue" onPress={handleSave} />
      <View className="w-full">
        <LabelInput
          label="Email Address"
          iconName="mail"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <LabelInput
          label="Password"
          iconName="lock-closed"
          isPassword
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
    </>
  );
}

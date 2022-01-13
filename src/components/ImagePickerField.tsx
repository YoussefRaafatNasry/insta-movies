import React from "react";

import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useField } from "formik";
import { Center, FormControl, IImageProps, Image, Pressable } from "native-base";

interface IImagePickerFieldProps extends IImageProps {
  name: string;
}

export const ImagePickerField: React.FC<IImagePickerFieldProps> = (props) => {
  const [{ value }, { error }, { setValue }] = useField(props.name);

  return (
    <FormControl {...props} isInvalid={!!error}>
      <Pressable
        onPress={async () => {
          const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
          });

          if (result.cancelled) return;
          setValue(result?.uri);
        }}>
        <Center
          height={props.h}
          width={props.w}
          borderRadius={props.borderRadius}
          bg="gray.200">
          {value === "" ? (
            <AntDesign name="camera" size={32} />
          ) : (
            <Image
              {...props}
              key={value}
              alt={props.name}
              source={{
                uri: value,
              }}
            />
          )}
        </Center>
      </Pressable>
      <FormControl.ErrorMessage>{error}</FormControl.ErrorMessage>
    </FormControl>
  );
};

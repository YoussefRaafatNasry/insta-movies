import React from "react";

import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useField } from "formik";
import { Center, FormControl, IImageProps, Image, Pressable } from "native-base";

interface IImagePickerFieldProps extends IImageProps {
  name: string;
}

export const ImagePickerField: React.FC<IImagePickerFieldProps> = (props) => {
  const [{ value }, { error, touched }, { setValue, setTouched }] = useField(props.name);

  return (
    <FormControl {...props} isInvalid={touched && !!error}>
      <Pressable
        onPress={async () => {
          const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
          });

          setTouched(true);
          if (result.cancelled) return;
          setValue(result?.uri);
        }}>
        <Center
          w={props.w}
          h={props.h}
          bg="primary.50"
          borderRadius={props.borderRadius}
          borderWidth={1}
          borderColor="primary.300">
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

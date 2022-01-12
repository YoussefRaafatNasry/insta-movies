import React, { useState } from "react";

import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Button, Center, Image, Input, Pressable, TextArea, VStack } from "native-base";

import { Movie } from "../domain/models/Movie";

interface INewMovieFormProps {
  onMovieAdded: (movie: Movie) => void;
}

export const NewMovieForm: React.FC<INewMovieFormProps> = ({ onMovieAdded }) => {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [overView, setOverview] = useState("");
  const [poster, setPoster] = useState<string>("");

  const options: ImagePicker.ImagePickerOptions = {
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
  };

  // TODO: Use Formik
  return (
    <VStack space={2} w="100%" p={4}>
      <Pressable
        onPress={async () => {
          const result = await ImagePicker.launchImageLibraryAsync(options);
          if (result.cancelled) return;
          setPoster(result?.uri);
        }}>
        <Center height={100} width={100} borderRadius={100} bg="gray.200">
          {poster === "" ? (
            <AntDesign name="camera" size={32} />
          ) : (
            <Image
              key={poster}
              height={100}
              width={100}
              borderRadius={100}
              alt="Poster"
              source={{
                uri: poster,
              }}
            />
          )}
        </Center>
      </Pressable>

      <Input placeholder="Title" value={title} onChangeText={setTitle} />
      <Input
        placeholder="Year"
        value={year}
        keyboardType="numeric"
        onChangeText={setYear}
      />
      <TextArea
        placeholder="Overview"
        value={overView}
        onChangeText={setOverview}
        numberOfLines={5}
      />
      <Button
        onPress={() =>
          onMovieAdded({
            id: Date.now(),
            title: title,
            date: new Date(parseInt(year), 1),
            overview: overView,
            posterUrl: poster,
          })
        }>
        Add Movie
      </Button>
    </VStack>
  );
};

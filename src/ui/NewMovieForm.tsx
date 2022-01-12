import React, { useState } from "react";
import { Button, Image, TextInput, View } from "react-native";

import * as ImagePicker from "expo-image-picker";

import { Movie } from "../domain/models/Movie";

interface INewMovieFormProps {
  onMovieAdded: (movie: Movie) => void;
}

export const NewMovieForm: React.FC<INewMovieFormProps> = ({ onMovieAdded }) => {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [overView, setOverview] = useState("");
  const [poster, setPoster] = useState<string>("");

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setPoster(result.uri);
    }
  };

  // TODO: Use Formik
  return (
    <View>
      <View>
        <Button title="Pick an image from camera roll" onPress={pickImage} />
        {poster != "" && <Image source={{ uri: poster }} style={{ width: 200, height: 200 }} />}
      </View>
      <TextInput placeholder="Title" value={title} onChangeText={setTitle} />
      <TextInput placeholder="Year" value={year} keyboardType="numeric" onChangeText={setYear} />
      <TextInput
        placeholder="Overview"
        value={overView}
        onChangeText={setOverview}
        numberOfLines={5}
      />
      <Button
        title="Add"
        onPress={() =>
          onMovieAdded({
            id: Date.now(),
            title: title,
            date: new Date(parseInt(year), 1),
            overview: overView,
            posterUrl: poster,
          })
        }
      />
    </View>
  );
};

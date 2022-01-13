import React from "react";

import { Formik } from "formik";
import { Button, VStack } from "native-base";

import { ImagePickerField } from "../components/ImagePickerField";
import { InputField } from "../components/InputField";
import { TextAreaField } from "../components/TextAreaField";
import { Movie } from "../domain/models/Movie";

interface INewMovieFormProps {
  onMovieAdded: (movie: Movie) => void;
}

interface IMovieInputs extends Omit<Movie, "id" | "date"> {
  year: string;
}

export const NewMovieForm: React.FC<INewMovieFormProps> = ({ onMovieAdded }) => {
  return (
    <Formik<IMovieInputs>
      initialValues={{
        title: "",
        overview: "",
        year: "",
        posterUrl: "",
      }}
      onSubmit={({ year, ...values }) => {
        // TODO: Add Validation
        onMovieAdded({
          ...values,
          id: Date.now(),
          date: new Date(parseInt(year), 1),
        });
      }}>
      {({ handleSubmit }) => (
        <VStack w="100%" space={2} p={4}>
          <ImagePickerField name="posterUrl" h={100} w={100} borderRadius={100} />
          <InputField name="title" placeholder="Title" />
          <InputField name="year" placeholder="Year" keyboardType="numeric" />
          <TextAreaField name="overview" placeholder="Overview" numberOfLines={5} />
          <Button onPress={() => handleSubmit()}>Add Movie</Button>
        </VStack>
      )}
    </Formik>
  );
};

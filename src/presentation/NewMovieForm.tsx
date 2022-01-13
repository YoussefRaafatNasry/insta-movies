import React from "react";

import { Formik } from "formik";
import { Button, HStack, VStack } from "native-base";

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
        <VStack w="100%" space={3} p={4}>
          <HStack w="100%" space={3} alignItems="center">
            <ImagePickerField name="posterUrl" w={100} h={100} borderRadius={100} />
            <VStack flex={1} space={3}>
              <InputField name="title" placeholder="Title" />
              <InputField name="year" placeholder="Year" keyboardType="numeric" />
            </VStack>
          </HStack>
          <TextAreaField name="overview" placeholder="Overview" numberOfLines={5} />
          <Button size="lg" onPress={() => handleSubmit()}>
            Add Movie
          </Button>
        </VStack>
      )}
    </Formik>
  );
};

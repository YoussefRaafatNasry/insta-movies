import React from "react";

import { Formik } from "formik";
import { Button, HStack, VStack } from "native-base";
import * as Yup from "yup";

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
  const schema: Yup.SchemaOf<IMovieInputs> = Yup.object({
    title: Yup.string().required("Required").label("Title"),
    overview: Yup.string().required("Required").label("Overview"),
    posterUrl: Yup.string().required("Required").label("Poster"),
    year: Yup.string()
      .required("Required")
      .length(4, "Must be 4 digits")
      .matches(/^(1[89]\d{2})|(2\d{3})$/, "Must be after 1799")
      .label("Year"),
  });

  return (
    <Formik<IMovieInputs>
      initialValues={{
        title: "",
        overview: "",
        year: "",
        posterUrl: "",
      }}
      validateOnBlur
      validationSchema={schema}
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
          <HStack w="100%" space={3} alignItems="center" py={4}>
            <ImagePickerField name="posterUrl" w={100} h={100} borderRadius={100} />
            <VStack flex={1} space={3}>
              <InputField name="title" placeholder="Title" />
              {/* TODO: Change to month-year picker */}
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

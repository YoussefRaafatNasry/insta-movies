import React from "react";
import { Image, Text, View } from "react-native";
import { Movie } from "../domain/models/Movie";

export const MovieCard: React.FC<Movie> = (props) => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        margin: 4,
        borderWidth: 1,
        borderColor: "blue",
        borderRadius: 12,
        overflow: "hidden",
      }}>
      <Image
        source={{
          uri: props.posterUrl,
          height: 140,
        }}
        style={{ aspectRatio: 2 / 3 }}
      />
      <View
        style={{
          display: "flex",
          flex: 1,
          padding: 12,
        }}>
        <Text
          style={{
            marginBottom: 4,
            fontSize: 18,
            fontWeight: "bold",
          }}>
          {props.title} ({props.date.getUTCFullYear()})
        </Text>
        <Text numberOfLines={5}>{props.overview}</Text>
      </View>
    </View>
  );
};

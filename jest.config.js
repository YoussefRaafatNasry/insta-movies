module.exports = {
  preset: "jest-expo",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  setupFiles: ["./src/test/setup.ts"],
  transformIgnorePatterns: [
    `node_modules/(?!(${[
      "(jest-)?react-native",
      "@react-native(-community)?)",
      "expo(nent)?",
      "@expo(nent)?/.*",
      "@expo-google-fonts/.*",
      "react-navigation",
      "@react-navigation/.*",
      "@unimodules/.*",
      "unimodules",
      "sentry-expo",
      "native-base",
      "react-native-svg",
    ].join("|")})`,
  ],
};

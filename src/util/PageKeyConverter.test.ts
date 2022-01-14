import { PageKeyConverter } from "./PageKeyConverter";

describe("PageKeyConverter", () => {
  // Arrange
  const prefix = "test-";
  const converter = new PageKeyConverter(prefix);

  it("encodes index to key", () => {
    const key = converter.toKey(1); // Act
    expect(key).toBe(`${prefix}1`); // Assert
  });

  it("decodes key to index", () => {
    const index = converter.toIndex(`${prefix}1`); // Act
    expect(index).toBe(1); // Assert
  });

  it("rejects negative indices", () => {
    const conversion = () => converter.toKey(-1); // Act
    expect(conversion).toThrow(RangeError); // Assert
  });

  it("rejects invalid key (suffix)", () => {
    const conversion = () => converter.toIndex(`1${prefix}`); // Act
    expect(conversion).toThrow(); // Assert
  });

  it("rejects invalid key (non-numeric)", () => {
    const conversion = () => converter.toIndex(`${prefix}ABC`); // Act
    expect(conversion).toThrow(); // Assert
  });

  it("rejects invalid key (negative)", () => {
    const conversion = () => converter.toIndex(`${prefix}-1`); // Act
    expect(conversion).toThrow(); // Assert
  });
});

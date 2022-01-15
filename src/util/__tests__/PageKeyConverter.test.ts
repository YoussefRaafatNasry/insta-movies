import { PageKeyConverter } from "../PageKeyConverter";

describe("PageKeyConverter", () => {
  // Arrange
  const prefix = "test-";
  const converter = new PageKeyConverter(prefix);

  it("encodes index to key", () => {
    // Act
    const key = converter.toKey(1);

    // Assert
    expect(key).toBe(`${prefix}1`);
  });

  it("decodes key to index", () => {
    // Act
    const index = converter.toIndex(`${prefix}1`);

    // Assert
    expect(index).toBe(1);
  });

  it("rejects negative indices", () => {
    // Act
    const conversion = () => converter.toKey(-1);

    // Assert
    expect(conversion).toThrow(RangeError);
  });

  it("rejects invalid key (suffix)", () => {
    // Act
    const conversion = () => converter.toIndex(`1${prefix}`);

    // Assert
    expect(conversion).toThrow();
  });

  it("rejects invalid key (non-numeric)", () => {
    // Act
    const conversion = () => converter.toIndex(`${prefix}ABC`);

    // Assert
    expect(conversion).toThrow();
  });

  it("rejects invalid key (negative)", () => {
    // Act
    const conversion = () => converter.toIndex(`${prefix}-1`);

    // Assert
    expect(conversion).toThrow();
  });
});

describe("String utilities", function() {
  describe("String manipulation", function() {
    it("should convert string to uppercase", function() {
      expect("hello world".toUpperCase()).toBe("HELLO WORLD");
    });

    it("should convert string to lowercase", function() {
      expect("HELLO WORLD".toLowerCase()).toBe("hello world");
    });

    it("should trim whitespace", function() {
      expect("  hello  ".trim()).toBe("hello");
    });

    it("should split string into array", function() {
      expect("a,b,c".split(",")).toEqual(["a", "b", "c"]);
    });
  });

  describe("String validation", function() {
    it("should check if string contains substring", function() {
      expect("hello world".includes("world")).toBe(true);
      expect("hello world".includes("universe")).toBe(false);
    });

    it("should check string length", function() {
      expect("hello".length).toBe(5);
      expect("".length).toBe(0);
    });

    it("should check if string starts with prefix", function() {
      expect("hello world".startsWith("hello")).toBe(true);
      expect("hello world".startsWith("world")).toBe(false);
    });
  });
});

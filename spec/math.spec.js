describe("Math utilities", function() {
  describe("Basic arithmetic", function() {
    it("should add two numbers correctly", function() {
      expect(2 + 3).toBe(5);
    });

    it("should subtract two numbers correctly", function() {
      expect(10 - 4).toBe(6);
    });

    it("should multiply two numbers correctly", function() {
      expect(3 * 4).toBe(12);
    });

    it("should divide two numbers correctly", function() {
      expect(15 / 3).toBe(5);
    });
  });

  describe("Advanced operations", function() {
    it("should handle decimal arithmetic", function() {
      expect(0.1 + 0.2).toBeCloseTo(0.3, 5);
    });

    it("should handle negative numbers", function() {
      expect(-5 + 3).toBe(-2);
    });

    it("should handle zero division", function() {
      expect(10 / 0).toBe(Infinity);
    });
  });
});

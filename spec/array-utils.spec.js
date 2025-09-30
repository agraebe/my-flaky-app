describe("Array utilities", function() {
  let testArray;

  beforeEach(function() {
    testArray = [1, 2, 3, 4, 5];
  });

  describe("Array manipulation", function() {
    it("should add element to array", function() {
      testArray.push(6);
      expect(testArray).toEqual([1, 2, 3, 4, 5, 6]);
    });

    it("should remove last element from array", function() {
      const lastElement = testArray.pop();
      expect(lastElement).toBe(5);
      expect(testArray).toEqual([1, 2, 3, 4]);
    });

    it("should find element in array", function() {
      expect(testArray.indexOf(3)).toBe(2);
      expect(testArray.includes(6)).toBe(false);
    });
  });

  describe("Array transformation", function() {
    it("should map array elements", function() {
      const doubled = testArray.map(x => x * 2);
      expect(doubled).toEqual([2, 4, 6, 8, 10]);
    });

    it("should filter array elements", function() {
      const evens = testArray.filter(x => x % 2 === 0);
      expect(evens).toEqual([2, 4]);
    });

    it("should reduce array to single value", function() {
      const sum = testArray.reduce((acc, x) => acc + x, 0);
      expect(sum).toBe(15);
    });
  });

  describe("Array validation", function() {
    it("should check array length", function() {
      expect(testArray.length).toBe(5);
    });

    it("should check if array is empty", function() {
      expect([].length).toBe(0);
      expect(testArray.length).toBeGreaterThan(0);
    });
  });
});

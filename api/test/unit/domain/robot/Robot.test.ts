import { describe, it, expect } from "vitest";
import { Robot } from "../../../../src/domain/robots/Robot";

describe("Robot", () => {
  describe("constructor", () => {
    it("should create a robot with valid data", () => {
      // Arrange & Act
      const robot = new Robot(1, "TestRobot", true);

      // Assert
      expect(robot.id).toBe(1);
      expect(robot.name).toBe("TestRobot");
      expect(robot.isActive).toBe(true);
    });

    it("should throw error when name is empty", () => {
      // Arrange & Act & Assert
      expect(() => {
        new Robot(1, "", true);
      }).toThrow("Robot name cannot be empty");
    });

    it("should throw error when name is only whitespace", () => {
      // Arrange & Act & Assert
      expect(() => {
        new Robot(1, "   ", true);
      }).toThrow("Robot name cannot be empty");
    });

    it("should create a robot with isActive false", () => {
      // Arrange & Act
      const robot = new Robot(1, "TestRobot", false);

      // Assert
      expect(robot.isActive).toBe(false);
    });

    it("should create a robot with optional createdAt and updatedAt", () => {
      // Arrange
      const createdAt = new Date("2025-01-01T00:00:00Z");
      const updatedAt = new Date("2025-01-02T00:00:00Z");

      // Act
      const robot = new Robot(1, "TestRobot", true, createdAt, updatedAt);

      // Assert
      expect(robot.createdAt).toEqual(createdAt);
      expect(robot.updatedAt).toEqual(updatedAt);
    });
  });
});

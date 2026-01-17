import { describe, it, expect } from "vitest";
import { Robot } from "../../../../src/domain/robots/Robot";

describe("Robot", () => {
  describe("constructor", () => {
    it("should create a robot with valid data", () => {
      // Arrange & Act
      const robot = new Robot(1, "TestRobot", "idle", null);

      // Assert
      expect(robot.id).toBe(1);
      expect(robot.name).toBe("TestRobot");
      expect(robot.status).toBe("idle");
      expect(robot.currentNodeId).toBeNull();
    });

    it("should throw error when name is empty", () => {
      // Arrange & Act & Assert
      expect(() => {
        new Robot(1, "", "idle", null);
      }).toThrow("Robot name cannot be empty");
    });

    it("should throw error when name is only whitespace", () => {
      // Arrange & Act & Assert
      expect(() => {
        new Robot(1, "   ", "idle", null);
      }).toThrow("Robot name cannot be empty");
    });

    it("should throw error when status is invalid", () => {
      // Arrange & Act & Assert
      expect(() => {
        new Robot(1, "TestRobot", "invalid" as "idle" | "moving", null);
      }).toThrow("Robot status must be 'idle' or 'moving'");
    });
  });

  describe("status getter", () => {
    it("should return the current status", () => {
      // Arrange
      const robot = new Robot(1, "TestRobot", "idle", null);

      // Act & Assert
      expect(robot.status).toBe("idle");
    });
  });

  describe("startMoving", () => {
    it("should change status to moving when idle", () => {
      // Arrange
      const robot = new Robot(1, "TestRobot", "idle", null);

      // Act
      robot.startMoving(5);

      // Assert
      expect(robot.status).toBe("moving");
    });

    it("should throw error when already moving", () => {
      // Arrange
      const robot = new Robot(1, "TestRobot", "moving", null);

      // Act & Assert
      expect(() => {
        robot.startMoving(5);
      }).toThrow("Robot is already moving");
    });

    it("should throw error when targetNodeId is negative", () => {
      // Arrange
      const robot = new Robot(1, "TestRobot", "idle", null);

      // Act & Assert
      expect(() => {
        robot.startMoving(-1);
      }).toThrow("Target node ID must be positive");
    });

    it("should throw error when targetNodeId is zero", () => {
      // Arrange
      const robot = new Robot(1, "TestRobot", "idle", null);

      // Act & Assert
      expect(() => {
        robot.startMoving(0);
      }).toThrow("Target node ID must be positive");
    });

    it("should allow null as targetNodeId", () => {
      // Arrange
      const robot = new Robot(1, "TestRobot", "idle", null);

      // Act
      robot.startMoving(null);

      // Assert
      expect(robot.status).toBe("moving");
    });
  });

  describe("stopMoving", () => {
    it("should change status to idle when moving", () => {
      // Arrange
      const robot = new Robot(1, "TestRobot", "moving", null);

      // Act
      robot.stopMoving();

      // Assert
      expect(robot.status).toBe("idle");
    });

    it("should throw error when already idle", () => {
      // Arrange
      const robot = new Robot(1, "TestRobot", "idle", null);

      // Act & Assert
      expect(() => {
        robot.stopMoving();
      }).toThrow("Robot is already idle");
    });
  });

  describe("isMoving", () => {
    it("should return true when status is moving", () => {
      // Arrange
      const robot = new Robot(1, "TestRobot", "moving", null);

      // Act & Assert
      expect(robot.isMoving()).toBe(true);
    });

    it("should return false when status is idle", () => {
      // Arrange
      const robot = new Robot(1, "TestRobot", "idle", null);

      // Act & Assert
      expect(robot.isMoving()).toBe(false);
    });
  });

  describe("isIdle", () => {
    it("should return true when status is idle", () => {
      // Arrange
      const robot = new Robot(1, "TestRobot", "idle", null);

      // Act & Assert
      expect(robot.isIdle()).toBe(true);
    });

    it("should return false when status is moving", () => {
      // Arrange
      const robot = new Robot(1, "TestRobot", "moving", null);

      // Act & Assert
      expect(robot.isIdle()).toBe(false);
    });
  });

  describe("canMove", () => {
    it("should return true when status is idle", () => {
      // Arrange
      const robot = new Robot(1, "TestRobot", "idle", null);

      // Act & Assert
      expect(robot.canMove()).toBe(true);
    });

    it("should return false when status is moving", () => {
      // Arrange
      const robot = new Robot(1, "TestRobot", "moving", null);

      // Act & Assert
      expect(robot.canMove()).toBe(false);
    });
  });
});

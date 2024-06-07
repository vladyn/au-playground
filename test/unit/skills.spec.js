import { Skills } from "../../src/resources/elements/skills";

describe("Skills", () => {
  let skills;

  beforeEach(() => {
    skills = new Skills();
  });

  it("should have a message", () => {
    expect(skills.message).toBeDefined();
  });

  it("should have a value", () => {
    expect(skills.value).toBeDefined();
  });

  it("should have a response", () => {
    expect(Skills.response).toBeDefined();
  });

  it("should have a constructor", () => {
    expect(skills.constructor).toBeDefined();
  });

  it("should have an attached method", () => {
    expect(skills.attached).toBeDefined();
  });

  it("should have a bind method", () => {
    expect(skills.bind).toBeDefined();
  });

  it("should have a valueChanged method", () => {
    expect(skills.valueChanged).toBeDefined();
  });
});

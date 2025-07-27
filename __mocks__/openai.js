module.exports = class OpenAI {
  constructor() {
    this.chat = {
      completions: {
        create: jest.fn(),
      },
    };
    this.embeddings = {
      create: jest.fn(),
    };
  }
};

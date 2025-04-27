import { GoogleGenerativeAI } from "@google/generative-ai";
import { IProduct } from "../models/Product";
import { IPost } from "../models/Post";
import { config } from "../config";

interface ChatMessage {
  content: string;
  sender: "USER" | "AI" | "REDDIT_USER";
  sentAt: Date;
}

class AIResponseGenerator {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor() {
    this.genAI = new GoogleGenerativeAI(config.gemini.apiKey);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  }

  private formatProductInfo(product: IProduct): string {
    return `
Product Details:
- Name: ${product.name}
- Description: ${product.description}
- Keywords: ${product.keywords.join(", ")}
- Location: ${product.location.city}, ${product.location.country}
- Price: ${product.price ? `$${product.price}` : "Not specified"}
- Domain: ${product.domain}
`;
  }

  private formatPostInfo(post: IPost): string {
    return `
Post Details:
- Title: ${post.title}
- Author: ${post.author}
- Subreddit: ${post.subreddit}
- Content: ${post.text}
`;
  }

  private formatChatHistory(chatHistory: ChatMessage[]): string {
    if (!chatHistory || chatHistory.length === 0)
      return "No previous conversation.";

    return chatHistory
      .map((msg) => {
        const sender =
          msg.sender === "USER"
            ? "You"
            : msg.sender === "AI"
            ? "Assistant"
            : msg.sender;
        return `${sender}: ${msg.content}`;
      })
      .join("\n");
  }

  async generateInitialResponse(
    post: IPost,
    product: IProduct
  ): Promise<string> {
    const prompt = `
You are a helpful assistant representing ${
      product.name
    }. Your goal is to engage with Reddit users in a helpful and professional manner.

${this.formatProductInfo(product)}

${this.formatPostInfo(post)}

Based on the post content and our product details, generate a friendly and helpful initial response. The response should:
1. Be personalized to the post content
2. Show understanding of the user's needs
3. Be concise and professional
4. Not be overly promotional but clearly mention the product and how it can help solve the user's problem
5. Focus on how our product can help solve their specific problem

Generate a response:`;

    try {
      const result = await this.model.generateContent(prompt);
      return result.response.text().trim();
    } catch (error) {
      console.error("Error generating AI response:", error);
      return "I noticed your post and would like to help. Could you tell me more about your specific needs?";
    }
  }

  async generateFollowUpResponse(
    post: IPost,
    product: IProduct,
    chatHistory: ChatMessage[]
  ): Promise<string> {
    const prompt = `
You are a helpful assistant representing ${
      product.name
    }. Continue the conversation in a helpful and professional manner.

${this.formatProductInfo(product)}

${this.formatPostInfo(post)}

Previous conversation:
${this.formatChatHistory(chatHistory)}

Based on the conversation history and our product details, generate a helpful follow-up response. The response should:
1. Be contextually relevant to the ongoing conversation
2. Address any specific questions or concerns raised
3. Be concise and professional
4. Not be overly promotional but clearly mention the product and how it can help solve the user's problem
5. Focus on providing value and solving the user's problem

Generate a response:`;

    try {
      const result = await this.model.generateContent(prompt);
      return result.response.text().trim();
    } catch (error) {
      console.error("Error generating AI response:", error);
      return "I'm here to help. Could you provide more details about your needs?";
    }
  }
}

export default new AIResponseGenerator();

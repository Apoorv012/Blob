import { generateObject } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { createOpenAI } from '@ai-sdk/openai';
import {type AIConfig} from './config.js';
import
{

  type StudyMaterialRequest,
  type StudyMaterialResponse,
  StudyMaterialSchema

  
}from './types.js';

export class StudyMaterialSDK
{
  private config: AIConfig;

  constructor(config: AIConfig)
  {
    this.config = config;
  }

  private getModel()
  {
    switch(this.config.provider)
    {
      case 'google':
        return createGoogleGenerativeAI({ 
          apiKey: this.config.apiKey 
        })(this.config.model);
      case 'openai':
        return createOpenAI({ 
          apiKey: this.config.apiKey 
        })(this.config.model);
      default:
        throw new Error(`Unsupported provider: ${this.config.provider}`);
    }
  }

async generateStudyMaterial(input: StudyMaterialRequest): Promise<StudyMaterialResponse> {
    const systemPrompt = this.buildSystemPrompt(input.expertiseLevel);
    const userPrompt = this.buildUserPrompt(input);

    const { object } = await generateObject({
      model: this.getModel(),
      schema: StudyMaterialSchema,
      system: systemPrompt,
      prompt: userPrompt,
    });

    return object;
  }

  private buildSystemPrompt(expertiseLevel: string): string {
    const levelInstructions: Record<string, string> = {
      beginner: 'Use simple language, avoid jargon, focus on core concepts with real-world examples.',
      intermediate: 'Include technical terms with context, explore concept relationships and practical applications.',
      advanced: 'Use expert terminology, cover edge cases, emphasize critical analysis and deeper implications.'
    };

    return `You are an expert educator creating study materials for ${expertiseLevel} level students.

${levelInstructions[expertiseLevel] || levelInstructions.intermediate}

Focus on:
- Accuracy and clarity
- Active recall techniques
- Progressive complexity
- Practical, applicable knowledge`;
  }

  private buildUserPrompt(input: StudyMaterialRequest): string {
    return `Topic: "${input.topic}"${input.additionalContext ? `\nContext: ${input.additionalContext}` : ''}

Generate the following:

FLASHCARDS (8-12):
- Front: Clear question using How/Why/What/Explain stems, no yes/no questions
- Back: Concise answer with key details
- Mix of definition (40%), application (30%), and comparison (30%) cards

QUIZ (5-8 questions):
- 4 options each, one correct answer
- Plausible distractors, no "all/none of the above"
- Include explanation for why the answer is correct

MIND MAP (8-15 nodes):
- Root node: main topic
- Level 1: 3-5 major subtopics
- Level 2+: supporting details
- Each node: unique id, label (2-5 words), parentId (null for root)

Keep terminology consistent across all three formats.`;
  }
}
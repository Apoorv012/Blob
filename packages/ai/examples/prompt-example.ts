

import { StudyMaterialSDK } from '../src/client.js';
import type { StudyMaterialRequest } from '../src/types.js';
const openAIConfig = {
  provider: 'openai' as const,
  apiKey: process.env.OPENAI_API_KEY || 'your-openai-key',
  model: 'gpt-4'
};

const googleConfig = {
  provider: 'google' as const,
  apiKey: process.env.GOOGLE_API_KEY || 'your-google-key',
  model: 'gemini-1.5-pro'
};
const examples: StudyMaterialRequest[] = [
  {
    topic: 'Photosynthesis',
    expertiseLevel: 'beginner',
    additionalContext: 'High school biology class, focus on the basic process and importance'
  },
  {
    topic: 'React Hooks',
    expertiseLevel: 'intermediate',
    additionalContext: 'Web development bootcamp, emphasize useState and useEffect with practical examples'
  },
  {
    topic: 'Machine Learning Algorithms',
    expertiseLevel: 'advanced',
    additionalContext: 'Graduate-level computer science course, focus on mathematical foundations and implementation details'
  },
  {
    topic: 'World War II Causes',
    expertiseLevel: 'intermediate',
    additionalContext: 'University history course, analyze political, economic, and social factors'
  }
];

async function demonstratePromptSystem() {
  const sdk = new StudyMaterialSDK(openAIConfig);

  console.log('🚀 Demonstrating Enhanced AI Prompt System for Study Materials\n');

  for (const [index, request] of examples.entries()) {
    console.log(`📚 Example ${index + 1}: ${request.topic} (${request.expertiseLevel})`);
    console.log(`Context: ${request.additionalContext}\n`);

    try {
      const materials = await sdk.generateStudyMaterial(request);

      console.log(`✅ Generated Materials:`);
      console.log(`   📇 Flashcards: ${materials.flashcards.length}`);
      console.log(`   ❓ Quiz Questions: ${materials.quiz.length}`);
      console.log(`   🧠 Mind Map Nodes: ${materials.mindmap.nodes.length}`);

      console.log(`\n📇 Sample Flashcard:`);
      console.log(`   Front: ${materials.flashcards[0]?.front}`);
      console.log(`   Back: ${materials.flashcards[0]?.back.substring(0, 100)}...`);

      console.log(`\n❓ Sample Quiz Question:`);
      console.log(`   Q: ${materials.quiz[0]?.question}`);
      console.log(`   Correct: ${materials.quiz[0]?.correctAnswer}`);

      console.log(`\n🧠 Mind Map Structure:`);
      console.log(`   Root: ${materials.mindmap.root}`);
      console.log(`   Sample Nodes: ${materials.mindmap.nodes.slice(0, 3).map(n => n.label).join(', ')}`);

      console.log('\n' + '─'.repeat(80) + '\n');

    } catch (error) {
      console.error(`❌ Error generating materials for "${request.topic}":`, error);
      console.log('\n' + '─'.repeat(80) + '\n');
    }
  }
}

export async function testSingleTopic(
  topic: string, 
  expertiseLevel: 'beginner' | 'intermediate' | 'advanced',
  additionalContext?: string
) {
  const sdk = new StudyMaterialSDK(openAIConfig);
  
  const request: StudyMaterialRequest = {
    topic,
    expertiseLevel,
    additionalContext
  };

  console.log(`🧪 Testing: ${topic} (${expertiseLevel})`);
  
  try {
    const materials = await sdk.generateStudyMaterial(request);
    
    console.log('\n📊 Results:');
    console.log(`Flashcards: ${materials.flashcards.length}`);
    console.log(`Quiz Questions: ${materials.quiz.length}`);
    console.log(`Mind Map Nodes: ${materials.mindmap.nodes.length}`);
    
    return materials;
  } catch (error) {
    console.error('❌ Generation failed:', error);
    throw error;
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  demonstratePromptSystem().catch(console.error);
}

export { demonstratePromptSystem, openAIConfig, googleConfig, examples };
import { createXai } from '@ai-sdk/xai';
import { streamText } from 'ai';

const xai = createXai({
  apiKey: process.env.NEXT_PUBLIC_XAI_API_KEY,
});

export async function POST(req: Request) {
  const { prompt }: { prompt: string } = await req.json();
  console.log('prompt', prompt);
  try {
    const result = streamText({
      model: xai('grok-3'),
      prompt,
      onError: (error) => {
        console.error('Error:', error);
      },
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error('Error in completion:', error);
    return new Response('Error in completion', { status: 500 });
  }
}

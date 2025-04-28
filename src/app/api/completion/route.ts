import { xai } from '@ai-sdk/xai';
import { streamText } from 'ai';

export async function POST(req: Request) {
  const { prompt }: { prompt: string } = await req.json();
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

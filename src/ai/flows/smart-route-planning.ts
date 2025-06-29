// This is an AI-powered route planning assistant.
//
// - smartRoutePlanning - A function that provides route recommendations based on user preferences and real-time conditions.
// - SmartRoutePlanningInput - The input type for the smartRoutePlanning function.
// - SmartRoutePlanningOutput - The return type for the smartRoutePlanning function.

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SmartRoutePlanningInputSchema = z.object({
  startLocation: z.string().describe('The starting location for the route.'),
  destination: z.string().describe('The destination for the route.'),
  preferences: z
    .array(z.enum(['fastest', 'most scenic', 'avoid highways']))
    .describe('User preferences for the route (fastest, most scenic, avoid highways).'),
  realTimeConditions: z
    .string()
    .optional()
    .describe('Real-time conditions such as traffic or road closures.'),
});
export type SmartRoutePlanningInput = z.infer<typeof SmartRoutePlanningInputSchema>;

const SmartRoutePlanningOutputSchema = z.object({
  routeDescription: z
    .string()
    .describe('A description of the recommended route, including estimated time and distance.'),
  routeSummary: z
    .string()
    .describe('A summary of the route including waypoints.'),
  estimatedTime: z.string().describe('The estimated travel time for the route.'),
  estimatedDistance: z.string().describe('The estimated distance of the route.'),
});
export type SmartRoutePlanningOutput = z.infer<typeof SmartRoutePlanningOutputSchema>;

export async function smartRoutePlanning(input: SmartRoutePlanningInput): Promise<SmartRoutePlanningOutput> {
  return smartRoutePlanningFlow(input);
}

const prompt = ai.definePrompt({
  name: 'smartRoutePlanningPrompt',
  input: {schema: SmartRoutePlanningInputSchema},
  output: {schema: SmartRoutePlanningOutputSchema},
  prompt: `You are a route planning assistant that recommends optimal routes to tourist destinations based on user preferences and real-time conditions.

  Provide a route description and summary that includes estimated time and distance based on the following information:

  Starting Location: {{{startLocation}}}
  Destination: {{{destination}}}
  Preferences: {{#each preferences}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
  Real-time Conditions: {{{realTimeConditions}}}
  \n`,
});

const smartRoutePlanningFlow = ai.defineFlow(
  {
    name: 'smartRoutePlanningFlow',
    inputSchema: SmartRoutePlanningInputSchema,
    outputSchema: SmartRoutePlanningOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

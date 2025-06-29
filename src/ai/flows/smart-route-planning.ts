'use server';
/**
 * @fileOverview This is an AI-powered route planning assistant.
 *
 * - smartRoutePlanning - A function that provides route recommendations based on user preferences and real-time conditions, using Google Maps for accurate data.
 * - SmartRoutePlanningInput - The input type for the smartRoutePlanning function.
 * - SmartRoutePlanningOutput - The return type for the smartRoutePlanning function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';
import { destinations } from '@/lib/data';

const SmartRoutePlanningInputSchema = z.object({
  startLocation: z.string().describe('The starting location for the route.'),
  destination: z.string().describe('The name of the destination place.'),
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
    .describe('A detailed, turn-by-turn style description of the recommended route.'),
  routeSummary: z
    .string()
    .describe('A high-level summary of the route including major waypoints or roads.'),
  estimatedTime: z.string().describe('The estimated travel time for the route, e.g., "35 mins".'),
  estimatedDistance: z.string().describe('The estimated distance of the route, e.g., "21 km".'),
});
export type SmartRoutePlanningOutput = z.infer<typeof SmartRoutePlanningOutputSchema>;

export async function smartRoutePlanning(input: SmartRoutePlanningInput): Promise<SmartRoutePlanningOutput> {
  return smartRoutePlanningFlow(input);
}


const GetRouteDirectionsInputSchema = z.object({
  startLocation: z.string().describe("The user's starting point."),
  destination: z.string().describe("The name of the destination, which must be one of the known tourist spots."),
  preferences: z.array(z.string()).optional().describe("Route preferences like 'avoid highways'."),
});


const getRouteDirectionsTool = ai.defineTool(
  {
    name: 'getRouteDirections',
    description: 'Gets route directions, distance, and duration from a mapping service for a trip in Pacitan.',
    inputSchema: GetRouteDirectionsInputSchema,
    outputSchema: z.object({
        distance: z.string().describe("Total distance of the route, e.g., '21.5 km'"),
        duration: z.string().describe("Total duration of the route, e.g., '45 mins'"),
        summary: z.string().describe("A summary of the main road(s) for the route, e.g., 'Jl. Lintas Selatan'"),
    }),
  },
  async (input) => {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    if (!apiKey) throw new Error("Google Maps API key is not configured.");

    const destinationInfo = destinations.find(d => d.name === input.destination);
    if (!destinationInfo) throw new Error(`Destination not found: ${input.destination}`);
    
    const destinationAddress = destinationInfo.address;

    const params = new URLSearchParams({
      origin: input.startLocation,
      destination: destinationAddress,
      key: apiKey,
      language: 'id'
    });

    if (input.preferences?.includes('avoid highways')) {
      params.append('avoid', 'highways');
    }

    const apiUrl = `https://maps.googleapis.com/maps/api/directions/json?${params.toString()}`;

    const response = await fetch(apiUrl);
    if (!response.ok) {
        console.error("Directions API request failed:", response.status, response.statusText);
        throw new Error('Failed to fetch directions from mapping service.');
    }
    const data = await response.json();

    if (data.status !== 'OK' || !data.routes || data.routes.length === 0) {
        console.error("Directions API error:", data.error_message || data.status);
        throw new Error('Could not retrieve directions from the mapping service.');
    }

    const route = data.routes[0];
    const leg = route.legs[0];

    return {
        distance: leg.distance.text,
        duration: leg.duration.text,
        summary: route.summary,
    };
  }
);


const prompt = ai.definePrompt({
    name: 'smartRoutePlanningPrompt',
    input: {schema: SmartRoutePlanningInputSchema},
    output: {schema: SmartRoutePlanningOutputSchema},
    tools: [getRouteDirectionsTool],
    prompt: `You are an expert route planning assistant for tourists in Pacitan, Indonesia. Your goal is to provide clear, helpful, and friendly route information in Bahasa Indonesia.

1.  **Use the Tool**: You MUST use the \`getRouteDirections\` tool to obtain the route details. Pass the user's \`startLocation\`, \`destination\`, and \`preferences\` to the tool.
2.  **Analyze Tool Output**: The tool will return the estimated \`distance\`, \`duration\`, and a \`summary\` of the main roads.
3.  **Generate Response in Bahasa Indonesia**:
    *   **estimatedTime**: Use the exact \`duration\` value from the tool.
    *   **estimatedDistance**: Use the exact \`distance\` value from the tool.
    *   **routeSummary**: Create a brief, user-friendly, one-sentence summary of the main road for the route in Bahasa Indonesia, based on the \`summary\` from the tool. For example, if the tool's summary is "Jl. Lintas Selatan", you should write "Rute utama Anda akan melewati Jl. Lintas Selatan.".
    *   **routeDescription**: Create a user-friendly, narrative description of the route in Bahasa Indonesia. Start from the \`startLocation\` and guide them to the \`destination\`. Mention the estimated travel time and distance. If the user has preferences like 'Rute Paling Indah' (most scenic), add a sentence acknowledging that the route chosen is efficient but they should enjoy the views along the way. Factor in any \`realTimeConditions\` provided by the user in your narrative (e.g., "Mengingat lalu lintas normal, perjalanan akan terasa lancar.").

User's request:
- Start: {{{startLocation}}}
- Destination: {{{destination}}}
- Preferences: {{#each preferences}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
- Conditions: {{{realTimeConditions}}}
`,
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

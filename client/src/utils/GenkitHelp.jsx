configureGenkit({
    plugins: [googleAI()],
    logLevel: 'debug',
    enableTracingAndMetrics: true,
});

export const menuSuggestionFlow = defineFlow(
    {
        name: 'menuSuggestionFlow',
        inputSchema: z.string(),
        outputSchema: z.string(),
    },
    async (subject) => {
        const llmResponse = await generate({
            prompt: `Suggest an item for the menu of a {subject} themed restaurant`,
            model: geminiPro,
            config: {
                temperature: 1,
            },
        });

        return llmResponse.text();
    }
);

startFlowsServer();
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

// Create the server
// This is the main interface with the MCP protocol. It handles the communication between the client and the server
const server = new McpServer({
    name: 'Demo', 
    version: '1.0.0',
});

// Define the tools
// The tools allow the LLM to perform actions through the MCP server
server.tool('fetch-weather', 'Tool to fetch the weather from a city', 
    {
        city: z.string().describe('The city to fetch the weather for'),
    },
    async ({ city }) => {
        // 1. Get the latitude and longitude of the city
        const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`);
        const data = await response.json();
        
        // 2. Get the weather data for the city (latitude and longitude)
        const { latitude, longitude } = data[0]
        const weatherResponse = await fetch('https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=$flongitude}');
        const weatherData = await weatherResponse.json();

        // 3. Return the weather data as a JSON string without any formatting, the MCP should be able to parse it and understand it
        return {
            content: [{ 
                type: 'text', 
                text: JSON.stringify(weatherData, null, 2) }]
        };
});

// Connect to the server using stdio transport
async function main() {
    console.log('Starting MCP Server...');
    const transport = new StdioServerTransport();
    await server.connect(transport);
}

main().catch(console.error);
// This can be run as: npx -y tsx main.ts

// Use "Inspector" to see the messages being exchanged between the client and the server
// Permite testear y depurar el servidor MCP
// https://modelcontextprotocol.io/legacy/tools/inspector#inspector
// npx -y @modelcontextprotocol/inspector npx -y tsx main.ts


// ------------------------------------------------------------
// MCP Playwright: (https://github.com/microsoft/playwright-mcp)
// Playwright enables reliable end-to-end testing for modern web apps
// This server enables LLMs to interact with web pages through structured accessibility snapshots,
// bypassing the need for screenshots or visually-tuned models

// Prompts and use Cases:
//   1. Visita la página web de https://midu.dev y quiero que me digas el h1 que tiene la página y los últimos cursos que ha publicado
//   2. Entra a la página de infolavelada.com y revisa que los patrocinadores que aparecen sean los mismos que tenemos en el proyecto en 
//      sponsors.ts y si falta alguno agrega el nombre del patrocinador y el logo en el archivo sponsors.ts

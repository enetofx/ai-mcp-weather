# MCP Weather Server

A Model Context Protocol (MCP) server that provides weather information for any city using the Open-Meteo API. This server enables Large Language Models (LLMs) to fetch real-time weather data through a standardized interface.

## Features

- 🌤️ **Weather Data**: Fetch current weather information for any city worldwide
- 🌍 **Geocoding**: Automatically converts city names to coordinates using Open-Meteo's geocoding API
- 🔧 **MCP Compatible**: Built with the official Model Context Protocol SDK
- 📡 **Real-time Data**: Uses Open-Meteo's free weather API (no API key required)
- 🛠️ **TypeScript**: Fully typed implementation with Zod schema validation

## What is MCP?

The [Model Context Protocol](https://modelcontextprotocol.io/) is an open standard that enables secure connections between AI applications and data sources. This weather server implements MCP to provide weather tools that can be used by any MCP-compatible AI assistant.

## Installation

1. Clone this repository:
```bash
git clone <repository-url>
cd mcp-weather
```

2. Install dependencies:
```bash
npm install
```

## Usage

### Running the Server

```bash
# Run with tsx (recommended for development)
npx -y tsx main.ts
```

### Testing with MCP Inspector

You can test and debug the MCP server using the official inspector:

```bash
npx -y @modelcontextprotocol/inspector npx -y tsx main.ts
```

This will open a web interface where you can:
- See the messages exchanged between client and server
- Test the weather tool manually
- Debug any issues with the implementation

## Available Tools

### `fetch-weather`

Fetches weather information for a specified city.

**Parameters:**
- `city` (string): The name of the city to get weather information for

**Example Usage:**
```
Tool: fetch-weather
Parameters: { "city": "London" }
```

**Response:**
Returns detailed weather data including:
- Current temperature, humidity, wind speed
- Weather conditions and forecasts
- Geographic coordinates
- Timezone information

## API Dependencies

This server uses the following free APIs:

1. **Open-Meteo Geocoding API**: Converts city names to coordinates
   - Endpoint: `https://geocoding-api.open-meteo.com/v1/search`
   - No API key required

2. **Open-Meteo Weather API**: Provides weather forecast data
   - Endpoint: `https://api.open-meteo.com/v1/forecast`
   - No API key required

## Technical Details

### Architecture

- **Server**: Built using `@modelcontextprotocol/sdk`
- **Transport**: Uses stdio transport for communication
- **Validation**: Zod schemas for input validation
- **API Calls**: Native fetch for HTTP requests

### Error Handling

The server includes basic error handling for:
- Invalid city names
- Network connectivity issues
- API response parsing

## Development

### Prerequisites

- Node.js 18+ 
- TypeScript/tsx for running TypeScript files

### Project Structure

```
mcp-weather/
├── main.ts           # Main MCP server implementation
├── package.json      # Dependencies and scripts
├── .gitignore       # Git ignore patterns
└── README.md        # This file
```

### Adding New Features

To extend this server:

1. Add new tools using `server.tool()`
2. Define input schemas with Zod
3. Implement the tool logic
4. Test with the MCP inspector

## Example Integration

Here are some example prompts you can use with an MCP-compatible AI assistant:

```
"What's the weather like in Tokyo today?"
"Get me the weather forecast for New York"
"Compare the weather between London and Paris"
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with the MCP inspector
5. Submit a pull request

## License

ISC License

## Resources

- [Model Context Protocol Documentation](https://modelcontextprotocol.io/)
- [Open-Meteo API Documentation](https://open-meteo.com/en/docs)
- [MCP SDK Documentation](https://github.com/modelcontextprotocol/typescript-sdk)
- [MCP Inspector](https://modelcontextprotocol.io/legacy/tools/inspector)

## Related Projects

- [MCP Playwright](https://github.com/microsoft/playwright-mcp) - Web automation through MCP
- [MCP Servers Collection](https://github.com/modelcontextprotocol/servers) - Official MCP server implementations

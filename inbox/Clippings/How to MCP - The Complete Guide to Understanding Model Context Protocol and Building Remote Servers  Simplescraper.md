---
title: "How to MCP - The Complete Guide to Understanding Model Context Protocol and Building Remote Servers | Simplescraper"
date: "2025-09-18T22:06:41+08:00"
updated: "2025-09-18T22:06:41+08:00"
tags:
source: "https://simplescraper.io/blog/how-to-mcp"
hostname: "simplescraper.io"
author: "​"
original_title: "How to MCP - The Complete Guide to Understanding Model Context Protocol and Building Remote Servers | Simplescraper"
---
## How to MCP: The Complete Guide to Understanding Model Context Protocol and Building Remote Servers

![Blog cover](https://simplescraper.io/blog/thinker.webp)

## Introduction

The [Model Context Protocol](https://modelcontextprotocol.io/) (MCP) promises an improved and standardized way of connecting LLM applications like Claude and ChatGPT with external tools and services via their APIs. It's a great effort, but if you've ever tried implementing an MCP server you'll quickly find yourself lost amid changing specifications, a lack of real-world examples, and terse documentation.

"The worst documented technology I have ever encountered," as one Hacker News commenter described it.

After spending a week combing through specs, SDK code, and GitHub issues, to build [our own remote MCP server](https://simplescraper.io/docs/mcp-server), this guide distills everything we've learned about MCP into a practical resource to help you:

1. **Understand MCP fundamentals** and how data flows
2. **Build a spec-compliant remote MCP server** that's ready for clients like Claude
3. **Implement authentication correctly** using OAuth 2.1 from the get-go
4. **Avoid common pitfalls** that can cost you hours of debugging

Whether you're building an MCP server to connect your app to LLMs, or a personal one to add AI to your workflows, you'll find the exact steps required to create a working implementation that balances simplicity with full protocol compliance.

  
  

---

  

### Why MCP is frustrating today

The MCP spec is still a work in progress, meaning finding consistent up-to-date code examples and documentation isn't so easy. Here's a quick rundown of common frustrations:

- **Multiple protocol versions**: MCP supports two transport standards with different requirements:
	- HTTP+SSE (2024-11-05) - The legacy protocol
	- Streamable HTTP (2025-03-26) - The modern protocol
- **Different communication patterns**: Each transport uses distinct methods:
	- HTTP+SSE requires maintaining two separate endpoints (`GET /mcp` for SSE and `POST /messages` for requests)
	- Streamable HTTP uses a single endpoint (`POST /mcp`) but involves complex request/response patterns
- **Local and Remote servers:** "server" can refer to either the local or remote implementation of the protocol which can cause confusion about which setup is being discussed
- **Sparse Documentation**: The official MCP website recommends vibe-coding your way to an MCP server, at the cost of practical examples
- **Unclear errors and evolving specs**: Vague error messages ("Claude was unable to connect") and frequent spec changes add friction to implementation

It’s a new protocol, so much of that can be forgiven, but it’s a big source of confusion. The sections below will provide clarity on all of the above and walk you through building a complete solution.

  

In the rest of this guide, we'll focus on:

- **Explaining MCP:** What it is, how it works and why it helps
- **Building for compatibility:** Create a server that handles both modern and legacy protocols
- **OAuth implementation:** Set up proper authentication with Firebase and MCP's required endpoints
- **State management:** Handle session state across different transport types
- **Production deployment:** Deploy your server to cloud platforms with proper monitoring
- **Troubleshooting:** Diagnose and fix the most common integration issues
  

Let's jump in!

  

## Part 1: Understanding MCP Fundamentals

  

### What MCP Actually Is (In Plain Language)

The Model Context Protocol is a standardized way for LLM applications (such as Claude, ChatGPT, and Cursor) to communicate with external APIs and services. It's a bridge between text-based AI models and your code-based API endpoints.

LLMs can't directly run code - but they can be taught to call functions that do. With MCP, you define each of your API capabilities as a "tool" that allow LLMs to:

1. Discover what tools (your API capabilities) are available
2. Learn how to use those tools (parameters, formats, etc.)
3. Choose the most appropriate tool based on the user's prompt
4. Call those tools to execute your underlying API code
5. Receive structured responses they can understand

Think of MCP as "OpenAPI for LLMs" - a standard interface that makes it easier for AI models to interact with your services.

  

### How Tools in MCP Connect LLMs to Your Existing API Endpoints

How exactly does an LLM application like Claude know which API endpoint to call and what parameters to send when, for example, a user asks "Show me all my Twitter scrape recipes"?

In our case, Simplescraper has a REST API endpoint `/recipes` that accepts parameters like `host` and `sort` and returns a list of recipe. But LLM applications have no idea this endpoint exists or what parameters it accepts, unless we tell them about it.

To solve this, MCP allows us to create a tool definition that:

1. Names the tool in a way that describes its purpose
2. Provides a description of what the tool does
3. Defines what parameters it accepts
4. Connects the tool to the actual API endpoint it represents via a handler function

Now when a user asks the Simplescraper MCP about their Twitter recipes, Claude can look at all available tools, understand their purposes through these descriptions, and select the appropriate one to handle the request.

  

#### Tool Definition Structure

A tool definition consists of these key elements:

| Element | Purpose | Example |
| --- | --- | --- |
| **Name** | Unique identifier the LLM uses to select the tool | `"list_recipes"` |
| **Parameter Schema** | Defines what arguments the tool accepts | `{ host: z.string() }` |
| **Description** | Helps the LLM understand when to use this tool | "Returns a list of user's scrape recipes with optional filters and sorting." |
| **Handler Function** | The code that calls your API, with access to authentication info (`authInfo`) | `async (params, { authInfo }) => { const response = await fetch(${API_BASE_URL}/recipes?host=${params.host}, { headers: { 'Authorization': Bearer ${authInfo.token} }}); return await response.json(); }` |

  

#### The Flow of a Prompt Using Tools

When a user asks a question, several steps happen behind the scenes to connect their natural language request to your API:

<svg id="mermaid-310" width="100%" xmlns="http://www.w3.org/2000/svg" class="flowchart" style="max-width: 874.7578125px;" viewBox="0 0 874.7578125 1100" role="graphics-document document" aria-roledescription="flowchart-v2"><g><marker id="mermaid-310_flowchart-v2-pointEnd" class="marker flowchart-v2" viewBox="0 0 10 10" refX="5" refY="5" markerUnits="userSpaceOnUse" markerWidth="8" markerHeight="8" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" class="arrowMarkerPath" style="stroke-width: 1; stroke-dasharray: 1, 0;"></path></marker><marker id="mermaid-310_flowchart-v2-pointStart" class="marker flowchart-v2" viewBox="0 0 10 10" refX="4.5" refY="5" markerUnits="userSpaceOnUse" markerWidth="8" markerHeight="8" orient="auto"><path d="M 0 5 L 10 10 L 10 0 z" class="arrowMarkerPath" style="stroke-width: 1; stroke-dasharray: 1, 0;"></path></marker><marker id="mermaid-310_flowchart-v2-circleEnd" class="marker flowchart-v2" viewBox="0 0 10 10" refX="11" refY="5" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><circle cx="5" cy="5" r="5" class="arrowMarkerPath" style="stroke-width: 1; stroke-dasharray: 1, 0;"></circle></marker><marker id="mermaid-310_flowchart-v2-circleStart" class="marker flowchart-v2" viewBox="0 0 10 10" refX="-1" refY="5" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><circle cx="5" cy="5" r="5" class="arrowMarkerPath" style="stroke-width: 1; stroke-dasharray: 1, 0;"></circle></marker><marker id="mermaid-310_flowchart-v2-crossEnd" class="marker cross flowchart-v2" viewBox="0 0 11 11" refX="12" refY="5.2" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><path d="M 1,1 l 9,9 M 10,1 l -9,9" class="arrowMarkerPath" style="stroke-width: 2; stroke-dasharray: 1, 0;"></path></marker><marker id="mermaid-310_flowchart-v2-crossStart" class="marker cross flowchart-v2" viewBox="0 0 11 11" refX="-1" refY="5.2" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><path d="M 1,1 l 9,9 M 10,1 l -9,9" class="arrowMarkerPath" style="stroke-width: 2; stroke-dasharray: 1, 0;"></path></marker><g class="root"><g class="clusters"><g class="cluster " id="HOST" data-look="classic"><rect style="" x="8" y="8" width="291.5859375" height="1084"></rect><g class="cluster-label " transform="translate(117.48828125, 8)"><foreignObject width="72.609375" height="24"><p><span></span></p><p>MCP HOST</p><p></p></foreignObject></g></g><g class="cluster " id="SERVER" data-look="classic"><rect style="" x="319.5859375" y="185" width="274.0234375" height="730"></rect><g class="cluster-label " transform="translate(389.515625, 185)"><foreignObject width="134.1640625" height="24"><p><span></span></p><p>MCP SERVER LAYER</p><p></p></foreignObject></g></g><g class="cluster " id="API" data-look="classic"><rect style="" x="613.609375" y="386" width="253.1484375" height="328"></rect><g class="cluster-label " transform="translate(690.90625, 386)"><foreignObject width="98.5546875" height="24"><p><span></span></p><p>EXTERNAL API</p><p></p></foreignObject></g></g></g><g class="edgePaths"><path d="M153.793,111L153.793,117.167C153.793,123.333,153.793,135.667,153.793,148C153.793,160.333,153.793,172.667,186.612,187.07C219.431,201.474,285.069,217.948,317.887,226.186L350.706,234.423" id="L_A_B_0" class=" edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" style="" marker-end="url(#mermaid-310_flowchart-v2-pointEnd)"></path><path d="M456.598,312L456.598,318.167C456.598,324.333,456.598,336.667,456.598,349C456.598,361.333,456.598,373.667,487.963,389.566C519.328,405.466,582.059,424.932,613.424,434.665L644.789,444.398" id="L_B_C_0" class=" edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" style="" marker-end="url(#mermaid-310_flowchart-v2-pointEnd)"></path><path d="M740.184,537L740.184,543.167C740.184,549.333,740.184,561.667,740.184,573.333C740.184,585,740.184,596,740.184,601.5L740.184,607" id="L_C_X_0" class=" edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" style="" marker-end="url(#mermaid-310_flowchart-v2-pointEnd)"></path><path d="M740.184,689L740.184,693.167C740.184,697.333,740.184,705.667,692.919,716C645.655,726.333,551.126,738.667,503.862,750.333C456.598,762,456.598,773,456.598,778.5L456.598,784" id="L_X_Y_0" class=" edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" style="" marker-end="url(#mermaid-310_flowchart-v2-pointEnd)"></path><path d="M456.598,890L456.598,894.167C456.598,898.333,456.598,906.667,406.13,917C355.663,927.333,254.728,939.667,204.26,951.333C153.793,963,153.793,974,153.793,979.5L153.793,985" id="L_Y_Z_0" class=" edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" style="" marker-end="url(#mermaid-310_flowchart-v2-pointEnd)"></path></g><g class="edgeLabels"><g class="edgeLabel" transform="translate(153.79296875, 148)"><g class="label" transform="translate(-28.296875, -12)"><foreignObject width="56.59375" height="24"><p><span></span></p><p>Request</p><p></p></foreignObject></g></g><g class="edgeLabel" transform="translate(456.59765625, 349)"><g class="label" transform="translate(-51.59375, -12)"><foreignObject width="103.1875" height="24"><p><span></span></p><p>Call API server</p><p></p></foreignObject></g></g><g class="edgeLabel" transform="translate(740.18359375, 574)"><g class="label" transform="translate(-36.9921875, -12)"><foreignObject width="73.984375" height="24"><p><span></span></p><p>Finds data</p><p></p></foreignObject></g></g><g class="edgeLabel" transform="translate(456.59765625, 751)"><g class="label" transform="translate(-45.40234375, -12)"><foreignObject width="90.8046875" height="24"><p><span></span></p><p>Returns data</p><p></p></foreignObject></g></g><g class="edgeLabel" transform="translate(153.79296875, 952)"><g class="label" transform="translate(-28.85546875, -12)"><foreignObject width="57.7109375" height="24"><p><span></span></p><p>Formats</p><p></p></foreignObject></g></g></g><g class="nodes"><g class="node default  " id="flowchart-C-0" transform="translate(740.18359375, 474)"><rect class="basic label-container" style="" x="-91.57421875" y="-63" width="183.1484375" height="126"></rect><g class="label" style="" transform="translate(-61.57421875, -48)"><rect></rect></g></g><g class="node default  " id="flowchart-X-1" transform="translate(740.18359375, 650)"><rect class="basic label-container" style="" x="-86.5625" y="-39" width="173.125" height="78"></rect><g class="label" style="" transform="translate(-56.5625, -24)"><rect></rect><foreignObject width="113.125" height="48"><p><span></span></p><p>Returns<br>recipe list JSON</p><p></p></foreignObject></g></g><g class="node default  " id="flowchart-B-2" transform="translate(456.59765625, 261)"><rect class="basic label-container" style="" x="-102.01171875" y="-51" width="204.0234375" height="102"></rect><g class="label" style="" transform="translate(-72.01171875, -36)"><rect></rect><foreignObject width="144.0234375" height="72"><p><span></span></p><p>Chooses list_recipes<br>tool with params:<br>{host: 'twitter.com'}</p><p></p></foreignObject></g></g><g class="node default  " id="flowchart-Y-3" transform="translate(456.59765625, 839)"><rect class="basic label-container" style="" x="-99.921875" y="-51" width="199.84375" height="102"></rect><g class="label" style="" transform="translate(-69.921875, -36)"><rect></rect><foreignObject width="139.84375" height="72"><p><span></span></p><p>MCP Server formats<br>API response as<br>MCP response</p><p></p></foreignObject></g></g><g class="node default  " id="flowchart-A-4" transform="translate(153.79296875, 72)"><rect class="basic label-container" style="" x="-110.79296875" y="-39" width="221.5859375" height="78"></rect><g class="label" style="" transform="translate(-80.79296875, -24)"><rect></rect><foreignObject width="161.5859375" height="48"><p><span></span></p><p>User: 'Show me all my<br>Twitter scrape recipes'</p><p></p></foreignObject></g></g><g class="node default  " id="flowchart-Z-5" transform="translate(153.79296875, 1028)"><rect class="basic label-container" style="" x="-93.36328125" y="-39" width="186.7265625" height="78"></rect><g class="label" style="" transform="translate(-63.36328125, -24)"><rect></rect><foreignObject width="126.7265625" height="48"><p><span></span></p><p>Claude shows<br>recipe list to user</p><p></p></foreignObject></g></g></g></g></g></svg>

First, the LLM application analyzes the user's request to determine intent. Then it selects the appropriate tool from those you've defined. In this example, when it detects a request about Twitter recipes, it chooses the `list_recipes` tool and automatically adds the parameter `host: "twitter.com"`. Your MCP server then executes the actual API call, receives the data, and returns it in a format the LLM application can present to the user.

  

#### Example Tool Definition

Here's how you would define a tool in your MCP server:

```javascript
javascript// defining a tool

server.tool(

  "list_recipes",  // Name that LLM application will use

  {

    // parameters schema (what LLM can pass)

    host: z.string().optional().describe("Filter by website host") 

  },

  {

    // metadata (helps LLM decide when to use this tool)

    description: "Returns a list of your scrape recipes with filters"

  },

  // actual function that calls your API

  async (params, { authInfo }) => {

    try {

      // get user's API key

      const apiKey = await getApiKeyFromToken(authInfo.token);

      

      // make the actual API call

      const result = await fetchRecipes(apiKey, params);

      

      // return formatted response to LLM

      return {

        content: [{ type: "text", text: JSON.stringify(result) }]

      };

    } catch (error) {

      return handleError(error);

    }

  }

);
```

The LLM application never directly executes code or calls your API. It simply identifies the right tool and parameters, then your MCP server handles the actual API communication and returns formatted results.

  

#### Tool Authorization and User-Specific Access

An important feature of MCP tool handlers is that they receive an `authInfo` object containing authentication details about the requesting user.

The `AuthInfo` object includes:

- `token`: The OAuth access token
- `clientId`: Identifier for the OAuth client application (provided by the client - e.g., "claudeai")
- `scopes`: Array of permission scopes granted to the user
- `expiresAt`: Optional expiration timestamp

Which allows you to implement per-user authorization for your tools:

```javascript
javascript// toolhandler receives both params and authInfo

async (params, { authInfo }) => {

  try {

    // authInfo contains token, clientId, and scopes

    console.log("tool called with authInfo:", authInfo);

    

    // you can use the token to get user-specific credentials

    let apiKey;

    if (authInfo?.token) {

      // look up the user's API key from their MCP token

      apiKey = await getApiKeyFromToken(authInfo.token);

    }

    

    // you can also check scopes to implement fine-grained access control

    if (!authInfo?.scopes || !authInfo.scopes.includes("list_recipes")) {

      return {

        content: [

          {

            type: "text",

            text: "Unauthorized: User lacks permission to list recipes",

          }

        ]

      };

    }

    

    // make API call with user's credentials

    const result = await fetchRecipes(apiKey, params);

    return { content: [{ type: "text", text: JSON.stringify(result) }] };

  } catch (error) {

    return handleError(error);

  }

}
```

This enables you to implement powerful authorization patterns:

1. **User-specific API keys**: Map MCP tokens to user-specific API keys in your database
2. **Scope-based access control**: Restrict tool access based on assigned scopes
3. **Resource-level permissions**: Check if a user has access to specific resources
4. **Usage quotas and rate limiting**: Implement per-user limits on tool usage

---

  

### Key Components of an MCP Server

An MCP server consists of several essential components:

1. **Tools**: Functions that AI models can call, each with defined parameters and return values
2. **Transport Layer**: The communication mechanism between the AI model and your server
3. **Session Management**: How your server tracks conversation state across multiple interactions
4. **Authentication**: How you verify and authorize access to your tools

The MCP protocol also defines a structured format for messages, based on JSON-RPC 2.0, which handles things like request/response correlation, error reporting, and tool invocation.

  

### MCP Capabilities Table

While tool calling is the core feature that most MCP servers implement, the protocol supports additional capabilities that can enhance functionality and user experience based on your goals.

| Capability | Description | Status |
| --- | --- | --- |
| **Tool Calling** | Allow models to invoke your functions with parameters | Core Feature |
| **Streaming** | Send incremental partial results back to clients | Optional |
| **Authentication** | Secure access with OAuth 2.1 with PKCE | Required for Production |
| **Session Management** | Track conversation state across multiple interactions | Core Feature |
| **Sampling** | Enable models to run prompts through your server | Optional |
| **Dynamic Tool Discovery** | Let models discover available tools at runtime | Optional |
| **Error Handling** | Return structured JSON-RPC errors | Core Feature |
| **Event Notifications** | Send server-initiated messages to clients | Optional |

  

### Local vs. Remote Servers: Understanding the Options

MCP servers can be implemented in several ways, from local implementations to fully remote services. The MCP ecosystem is still evolving, with local servers currently being the most common due to their ease of implementation, but remote servers likely represent the future direction as the ecosystem matures. Each approach offers different features and use cases.

  

#### Local MCP Servers:

Currently, many MCP implementations involve users downloading server code from GitHub repositories and running it locally.

**How it works:**

- User downloads MCP server code from GitHub
- The AI application launches this server as a subprocess on the user's computer
- Communication happens via STDIO (Standard Input/Output)
- Configured through a local file like `claude_desktop_config.json`
  

**Features:**

- **Update Process:** When server code changes, users must manually download and install updates
- **Configuration Requirements:** Users edit configuration files and manage dependencies
- **Updates:** Difficult to roll out updates to your server across a user base.
- **Desktop-Bound:** Primarily limited to desktop applications that can launch local processes.
- **Credential Management:** API keys or other credentials stored in local configuration files or environment variables on the user's machine
- **Direct Resource Access:** Good for tools that need direct access to local files or system resources (e.g., a server that reads from `/Users/username/Documents`).
  

#### Bridged Remote Servers: An Interim Approach

As MCP implementations evolve, a transitional pattern has emerged: remote servers with a local bridge connector. This approach exists because most MCP clients currently only support local servers via stdio transport, and don't yet support remote servers with OAuth authentication.

**How it works:**

- Server runs on the internet, with users running a local bridge tool (like [`mcp-remote`](https://github.com/geelen/mcp-remote))
- The bridge forwards requests from the local AI application to the remote server
- Still involves the `claude_desktop_config.json` file, but the command points to the bridge tool.
  

**Features:**

- **Update Process:** Server logic can be updated centrally, but bridge tool needs local updates
- **Configuration Requirements:** Still requires local configuration files
- **Credential Storage:** Authentication tokens typically stored in local configuration
- **Use Cases:** Good for transitioning from local to remote while supporting existing clients
  
  

#### Remote Servers: Scalable, secure (and the focus of this guide)

The most recent evolution in the MCP specification supports fully remote MCP servers that function like standard web services.

**How it works:**

- MCP server runs as a web service accessible via HTTPS
- AI clients connect directly without local configuration or proxies
- Authentication happens through standard OAuth 2.1 web flows

![image-20250522074207242](https://simplescraper.io/blog/assets/how-to-mcp.DHLvpd8e.png)

*Image showing Claude's Integration UI*

  

**Features:**

- **Update Process:** Changes immediately available to all users
- **Configuration Requirements:** No local setup or configuration files needed - configuration through LLM application settings UI rather than JSON files
- **Portability:** Works on any device that can access the web
- **Credential Storage:** Credentials managed through OAuth tokens, not local files
- **Discovery**: Central directories of available MCP servers
- **Use Cases:** Well-suited for SaaS products and broader integrations

While local and bridged setups have their place, building a remote MCP server offers the most robust, scalable, and user-friendly approach for integrating services with the broader AI ecosystem - these are the servers AI agents will interact with.

  

Trusting Remote Servers

You should only connect to official MCP servers hosted by the companies themselves. For example, if you want to access your Stripe data via an LLM application, use `https://mcp.stripe.com/`. Avoid third-party proxies or aggregators unless you trust them 100% as they will have access to your data.

  

### Transport Protocols: Streamable HTTP vs. HTTP+SSE

The MCP specification defines multiple transport mechanisms that have evolved over time:

  

#### Transport Protocols Comparison Table

| Feature | Streamable HTTP (Modern) | HTTP+SSE (Legacy) |
| --- | --- | --- |
| **Protocol Version** | 2025-03-26 | 2024-11-05 |
| **SDK Transport Class** | `StreamableHTTPServerTransport` | `SSEServerTransport` |
| **Endpoints** | Single `/mcp` for all operations | Dual endpoints: `GET /mcp` + `POST /messages` |
| **Client-to-Server** | POST /mcp | POST /messages?sessionId=xxx |
| **Server-to-Client** | Same POST response (streamed) | GET /mcp (SSE stream) |
| **Session Identification** | Via `Mcp-Session-Id` header | Via query parameters in URL |
| **Session Termination** | DELETE /mcp | Connection close |
| **Implementation Complexity** | Lower | Higher |
| **Connection Management** | Connection terminates naturally | Requires explicit management |
| **Primary Benefit** | Simpler, single connection | Compatible with older clients |

The challenge is that, as of mid-2025, we're in a transition period where different clients support different protocols. A production-ready MCP server should support both transport types to ensure compatibility with the widest range of clients.

  

## Part 2: Session management in your MCP Server

  

#### What Is Session Management and Why Do You Need It?

In MCP, "session management" simply means keeping track of a conversation between your LLM application, like Claude, and your server across multiple requests. Without sessions, the app would need to start from scratch with every request, making tools that require state (like a shopping cart or building a report through several data-gathering steps) impossible.

When the app first connects to your MCP server, it makes an "initialize" request. Your server needs to:

1. Create a unique session ID
2. Set up a transport instance for this conversation
3. Remember this session for future requests

A "transport" is just MCP's term for the communication handler between your server and the LLM app. Think of it as a phone line - each session gets its own dedicated line so messages don't get mixed up. The transport handles the actual sending and receiving of MCP messages for that specific conversation.

  

#### How Sessions Are Passed Back and Forth

The MCP specification defines a specific way to handle session IDs:

1. When the app first connects (initialization), your server generates a session ID
2. Your server returns this ID in the `Mcp-Session-Id` HTTP header
3. The app must include this same header in all subsequent requests
4. If the session expires, your server returns a 404, and the app starts over
<svg id="mermaid-944" width="100%" xmlns="http://www.w3.org/2000/svg" style="max-width: 879px;" viewBox="-50 -10 879 669" role="graphics-document document" aria-roledescription="sequence"><g><rect x="629" y="583" fill="#eaeaea" stroke="#666" width="150" height="65" name="Map" rx="3" ry="3" class="actor actor-bottom"></rect><text x="704" y="615.5" style="text-anchor: middle; font-size: 16px; font-weight: 400;" dominant-baseline="central" alignment-baseline="central" class="actor actor-box"><tspan x="704" dy="0">transports {}</tspan></text></g> <g><rect x="352" y="583" fill="#eaeaea" stroke="#666" width="150" height="65" name="Server" rx="3" ry="3" class="actor actor-bottom"></rect><text x="427" y="615.5" style="text-anchor: middle; font-size: 16px; font-weight: 400;" dominant-baseline="central" alignment-baseline="central" class="actor actor-box"><tspan x="427" dy="0">MCP Server</tspan></text></g> <g><rect x="0" y="583" fill="#eaeaea" stroke="#666" width="150" height="65" name="App" rx="3" ry="3" class="actor actor-bottom"></rect><text x="75" y="615.5" style="text-anchor: middle; font-size: 16px; font-weight: 400;" dominant-baseline="central" alignment-baseline="central" class="actor actor-box"><tspan x="75" dy="0">LLM App</tspan></text></g> <g><line id="actor2" x1="704" y1="65" x2="704" y2="583" class="actor-line 200" stroke-width="0.5px" stroke="#999" name="Map"></line><g id="root-2"><rect x="629" y="0" fill="#eaeaea" stroke="#666" width="150" height="65" name="Map" rx="3" ry="3" class="actor actor-top"></rect><text x="704" y="32.5" style="text-anchor: middle; font-size: 16px; font-weight: 400;" dominant-baseline="central" alignment-baseline="central" class="actor actor-box"><tspan x="704" dy="0">transports {}</tspan></text></g></g> <g><line id="actor1" x1="427" y1="65" x2="427" y2="583" class="actor-line 200" stroke-width="0.5px" stroke="#999" name="Server"></line><g id="root-1"><rect x="352" y="0" fill="#eaeaea" stroke="#666" width="150" height="65" name="Server" rx="3" ry="3" class="actor actor-top"></rect><text x="427" y="32.5" style="text-anchor: middle; font-size: 16px; font-weight: 400;" dominant-baseline="central" alignment-baseline="central" class="actor actor-box"><tspan x="427" dy="0">MCP Server</tspan></text></g></g> <g><line id="actor0" x1="75" y1="65" x2="75" y2="583" class="actor-line 200" stroke-width="0.5px" stroke="#999" name="App"></line><g id="root-0"><rect x="0" y="0" fill="#eaeaea" stroke="#666" width="150" height="65" name="App" rx="3" ry="3" class="actor actor-top"></rect><text x="75" y="32.5" style="text-anchor: middle; font-size: 16px; font-weight: 400;" dominant-baseline="central" alignment-baseline="central" class="actor actor-box"><tspan x="75" dy="0">LLM App</tspan></text></g></g> <g></g><defs><symbol id="computer" width="24" height="24"><path transform="scale(.5)" d="M2 2v13h20v-13h-20zm18 11h-16v-9h16v9zm-10.228 6l.466-1h3.524l.467 1h-4.457zm14.228 3h-24l2-6h2.104l-1.33 4h18.45l-1.297-4h2.073l2 6zm-5-10h-14v-7h14v7z"></path></symbol></defs><defs><symbol id="database" fill-rule="evenodd" clip-rule="evenodd"><path transform="scale(.5)" d="M12.258.001l.256.004.255.005.253.008.251.01.249.012.247.015.246.016.242.019.241.02.239.023.236.024.233.027.231.028.229.031.225.032.223.034.22.036.217.038.214.04.211.041.208.043.205.045.201.046.198.048.194.05.191.051.187.053.183.054.18.056.175.057.172.059.168.06.163.061.16.063.155.064.15.066.074.033.073.033.071.034.07.034.069.035.068.035.067.035.066.035.064.036.064.036.062.036.06.036.06.037.058.037.058.037.055.038.055.038.053.038.052.038.051.039.05.039.048.039.047.039.045.04.044.04.043.04.041.04.04.041.039.041.037.041.036.041.034.041.033.042.032.042.03.042.029.042.027.042.026.043.024.043.023.043.021.043.02.043.018.044.017.043.015.044.013.044.012.044.011.045.009.044.007.045.006.045.004.045.002.045.001.045v17l-.001.045-.002.045-.004.045-.006.045-.007.045-.009.044-.011.045-.012.044-.013.044-.015.044-.017.043-.018.044-.02.043-.021.043-.023.043-.024.043-.026.043-.027.042-.029.042-.03.042-.032.042-.033.042-.034.041-.036.041-.037.041-.039.041-.04.041-.041.04-.043.04-.044.04-.045.04-.047.039-.048.039-.05.039-.051.039-.052.038-.053.038-.055.038-.055.038-.058.037-.058.037-.06.037-.06.036-.062.036-.064.036-.064.036-.066.035-.067.035-.068.035-.069.035-.07.034-.071.034-.073.033-.074.033-.15.066-.155.064-.16.063-.163.061-.168.06-.172.059-.175.057-.18.056-.183.054-.187.053-.191.051-.194.05-.198.048-.201.046-.205.045-.208.043-.211.041-.214.04-.217.038-.22.036-.223.034-.225.032-.229.031-.231.028-.233.027-.236.024-.239.023-.241.02-.242.019-.246.016-.247.015-.249.012-.251.01-.253.008-.255.005-.256.004-.258.001-.258-.001-.256-.004-.255-.005-.253-.008-.251-.01-.249-.012-.247-.015-.245-.016-.243-.019-.241-.02-.238-.023-.236-.024-.234-.027-.231-.028-.228-.031-.226-.032-.223-.034-.22-.036-.217-.038-.214-.04-.211-.041-.208-.043-.204-.045-.201-.046-.198-.048-.195-.05-.19-.051-.187-.053-.184-.054-.179-.056-.176-.057-.172-.059-.167-.06-.164-.061-.159-.063-.155-.064-.151-.066-.074-.033-.072-.033-.072-.034-.07-.034-.069-.035-.068-.035-.067-.035-.066-.035-.064-.036-.063-.036-.062-.036-.061-.036-.06-.037-.058-.037-.057-.037-.056-.038-.055-.038-.053-.038-.052-.038-.051-.039-.049-.039-.049-.039-.046-.039-.046-.04-.044-.04-.043-.04-.041-.04-.04-.041-.039-.041-.037-.041-.036-.041-.034-.041-.033-.042-.032-.042-.03-.042-.029-.042-.027-.042-.026-.043-.024-.043-.023-.043-.021-.043-.02-.043-.018-.044-.017-.043-.015-.044-.013-.044-.012-.044-.011-.045-.009-.044-.007-.045-.006-.045-.004-.045-.002-.045-.001-.045v-17l.001-.045.002-.045.004-.045.006-.045.007-.045.009-.044.011-.045.012-.044.013-.044.015-.044.017-.043.018-.044.02-.043.021-.043.023-.043.024-.043.026-.043.027-.042.029-.042.03-.042.032-.042.033-.042.034-.041.036-.041.037-.041.039-.041.04-.041.041-.04.043-.04.044-.04.046-.04.046-.039.049-.039.049-.039.051-.039.052-.038.053-.038.055-.038.056-.038.057-.037.058-.037.06-.037.061-.036.062-.036.063-.036.064-.036.066-.035.067-.035.068-.035.069-.035.07-.034.072-.034.072-.033.074-.033.151-.066.155-.064.159-.063.164-.061.167-.06.172-.059.176-.057.179-.056.184-.054.187-.053.19-.051.195-.05.198-.048.201-.046.204-.045.208-.043.211-.041.214-.04.217-.038.22-.036.223-.034.226-.032.228-.031.231-.028.234-.027.236-.024.238-.023.241-.02.243-.019.245-.016.247-.015.249-.012.251-.01.253-.008.255-.005.256-.004.258-.001.258.001zm-9.258 20.499v.01l.001.021.003.021.004.022.005.021.006.022.007.022.009.023.01.022.011.023.012.023.013.023.015.023.016.024.017.023.018.024.019.024.021.024.022.025.023.024.024.025.052.049.056.05.061.051.066.051.07.051.075.051.079.052.084.052.088.052.092.052.097.052.102.051.105.052.11.052.114.051.119.051.123.051.127.05.131.05.135.05.139.048.144.049.147.047.152.047.155.047.16.045.163.045.167.043.171.043.176.041.178.041.183.039.187.039.19.037.194.035.197.035.202.033.204.031.209.03.212.029.216.027.219.025.222.024.226.021.23.02.233.018.236.016.24.015.243.012.246.01.249.008.253.005.256.004.259.001.26-.001.257-.004.254-.005.25-.008.247-.011.244-.012.241-.014.237-.016.233-.018.231-.021.226-.021.224-.024.22-.026.216-.027.212-.028.21-.031.205-.031.202-.034.198-.034.194-.036.191-.037.187-.039.183-.04.179-.04.175-.042.172-.043.168-.044.163-.045.16-.046.155-.046.152-.047.148-.048.143-.049.139-.049.136-.05.131-.05.126-.05.123-.051.118-.052.114-.051.11-.052.106-.052.101-.052.096-.052.092-.052.088-.053.083-.051.079-.052.074-.052.07-.051.065-.051.06-.051.056-.05.051-.05.023-.024.023-.025.021-.024.02-.024.019-.024.018-.024.017-.024.015-.023.014-.024.013-.023.012-.023.01-.023.01-.022.008-.022.006-.022.006-.022.004-.022.004-.021.001-.021.001-.021v-4.127l-.077.055-.08.053-.083.054-.085.053-.087.052-.09.052-.093.051-.095.05-.097.05-.1.049-.102.049-.105.048-.106.047-.109.047-.111.046-.114.045-.115.045-.118.044-.12.043-.122.042-.124.042-.126.041-.128.04-.13.04-.132.038-.134.038-.135.037-.138.037-.139.035-.142.035-.143.034-.144.033-.147.032-.148.031-.15.03-.151.03-.153.029-.154.027-.156.027-.158.026-.159.025-.161.024-.162.023-.163.022-.165.021-.166.02-.167.019-.169.018-.169.017-.171.016-.173.015-.173.014-.175.013-.175.012-.177.011-.178.01-.179.008-.179.008-.181.006-.182.005-.182.004-.184.003-.184.002h-.37l-.184-.002-.184-.003-.182-.004-.182-.005-.181-.006-.179-.008-.179-.008-.178-.01-.176-.011-.176-.012-.175-.013-.173-.014-.172-.015-.171-.016-.17-.017-.169-.018-.167-.019-.166-.02-.165-.021-.163-.022-.162-.023-.161-.024-.159-.025-.157-.026-.156-.027-.155-.027-.153-.029-.151-.03-.15-.03-.148-.031-.146-.032-.145-.033-.143-.034-.141-.035-.14-.035-.137-.037-.136-.037-.134-.038-.132-.038-.13-.04-.128-.04-.126-.041-.124-.042-.122-.042-.12-.044-.117-.043-.116-.045-.113-.045-.112-.046-.109-.047-.106-.047-.105-.048-.102-.049-.1-.049-.097-.05-.095-.05-.093-.052-.09-.051-.087-.052-.085-.053-.083-.054-.08-.054-.077-.054v4.127zm0-5.654v.011l.001.021.003.021.004.021.005.022.006.022.007.022.009.022.01.022.011.023.012.023.013.023.015.024.016.023.017.024.018.024.019.024.021.024.022.024.023.025.024.024.052.05.056.05.061.05.066.051.07.051.075.052.079.051.084.052.088.052.092.052.097.052.102.052.105.052.11.051.114.051.119.052.123.05.127.051.131.05.135.049.139.049.144.048.147.048.152.047.155.046.16.045.163.045.167.044.171.042.176.042.178.04.183.04.187.038.19.037.194.036.197.034.202.033.204.032.209.03.212.028.216.027.219.025.222.024.226.022.23.02.233.018.236.016.24.014.243.012.246.01.249.008.253.006.256.003.259.001.26-.001.257-.003.254-.006.25-.008.247-.01.244-.012.241-.015.237-.016.233-.018.231-.02.226-.022.224-.024.22-.025.216-.027.212-.029.21-.03.205-.032.202-.033.198-.035.194-.036.191-.037.187-.039.183-.039.179-.041.175-.042.172-.043.168-.044.163-.045.16-.045.155-.047.152-.047.148-.048.143-.048.139-.05.136-.049.131-.05.126-.051.123-.051.118-.051.114-.052.11-.052.106-.052.101-.052.096-.052.092-.052.088-.052.083-.052.079-.052.074-.051.07-.052.065-.051.06-.05.056-.051.051-.049.023-.025.023-.024.021-.025.02-.024.019-.024.018-.024.017-.024.015-.023.014-.023.013-.024.012-.022.01-.023.01-.023.008-.022.006-.022.006-.022.004-.021.004-.022.001-.021.001-.021v-4.139l-.077.054-.08.054-.083.054-.085.052-.087.053-.09.051-.093.051-.095.051-.097.05-.1.049-.102.049-.105.048-.106.047-.109.047-.111.046-.114.045-.115.044-.118.044-.12.044-.122.042-.124.042-.126.041-.128.04-.13.039-.132.039-.134.038-.135.037-.138.036-.139.036-.142.035-.143.033-.144.033-.147.033-.148.031-.15.03-.151.03-.153.028-.154.028-.156.027-.158.026-.159.025-.161.024-.162.023-.163.022-.165.021-.166.02-.167.019-.169.018-.169.017-.171.016-.173.015-.173.014-.175.013-.175.012-.177.011-.178.009-.179.009-.179.007-.181.007-.182.005-.182.004-.184.003-.184.002h-.37l-.184-.002-.184-.003-.182-.004-.182-.005-.181-.007-.179-.007-.179-.009-.178-.009-.176-.011-.176-.012-.175-.013-.173-.014-.172-.015-.171-.016-.17-.017-.169-.018-.167-.019-.166-.02-.165-.021-.163-.022-.162-.023-.161-.024-.159-.025-.157-.026-.156-.027-.155-.028-.153-.028-.151-.03-.15-.03-.148-.031-.146-.033-.145-.033-.143-.033-.141-.035-.14-.036-.137-.036-.136-.037-.134-.038-.132-.039-.13-.039-.128-.04-.126-.041-.124-.042-.122-.043-.12-.043-.117-.044-.116-.044-.113-.046-.112-.046-.109-.046-.106-.047-.105-.048-.102-.049-.1-.049-.097-.05-.095-.051-.093-.051-.09-.051-.087-.053-.085-.052-.083-.054-.08-.054-.077-.054v4.139zm0-5.666v.011l.001.02.003.022.004.021.005.022.006.021.007.022.009.023.01.022.011.023.012.023.013.023.015.023.016.024.017.024.018.023.019.024.021.025.022.024.023.024.024.025.052.05.056.05.061.05.066.051.07.051.075.052.079.051.084.052.088.052.092.052.097.052.102.052.105.051.11.052.114.051.119.051.123.051.127.05.131.05.135.05.139.049.144.048.147.048.152.047.155.046.16.045.163.045.167.043.171.043.176.042.178.04.183.04.187.038.19.037.194.036.197.034.202.033.204.032.209.03.212.028.216.027.219.025.222.024.226.021.23.02.233.018.236.017.24.014.243.012.246.01.249.008.253.006.256.003.259.001.26-.001.257-.003.254-.006.25-.008.247-.01.244-.013.241-.014.237-.016.233-.018.231-.02.226-.022.224-.024.22-.025.216-.027.212-.029.21-.03.205-.032.202-.033.198-.035.194-.036.191-.037.187-.039.183-.039.179-.041.175-.042.172-.043.168-.044.163-.045.16-.045.155-.047.152-.047.148-.048.143-.049.139-.049.136-.049.131-.051.126-.05.123-.051.118-.052.114-.051.11-.052.106-.052.101-.052.096-.052.092-.052.088-.052.083-.052.079-.052.074-.052.07-.051.065-.051.06-.051.056-.05.051-.049.023-.025.023-.025.021-.024.02-.024.019-.024.018-.024.017-.024.015-.023.014-.024.013-.023.012-.023.01-.022.01-.023.008-.022.006-.022.006-.022.004-.022.004-.021.001-.021.001-.021v-4.153l-.077.054-.08.054-.083.053-.085.053-.087.053-.09.051-.093.051-.095.051-.097.05-.1.049-.102.048-.105.048-.106.048-.109.046-.111.046-.114.046-.115.044-.118.044-.12.043-.122.043-.124.042-.126.041-.128.04-.13.039-.132.039-.134.038-.135.037-.138.036-.139.036-.142.034-.143.034-.144.033-.147.032-.148.032-.15.03-.151.03-.153.028-.154.028-.156.027-.158.026-.159.024-.161.024-.162.023-.163.023-.165.021-.166.02-.167.019-.169.018-.169.017-.171.016-.173.015-.173.014-.175.013-.175.012-.177.01-.178.01-.179.009-.179.007-.181.006-.182.006-.182.004-.184.003-.184.001-.185.001-.185-.001-.184-.001-.184-.003-.182-.004-.182-.006-.181-.006-.179-.007-.179-.009-.178-.01-.176-.01-.176-.012-.175-.013-.173-.014-.172-.015-.171-.016-.17-.017-.169-.018-.167-.019-.166-.02-.165-.021-.163-.023-.162-.023-.161-.024-.159-.024-.157-.026-.156-.027-.155-.028-.153-.028-.151-.03-.15-.03-.148-.032-.146-.032-.145-.033-.143-.034-.141-.034-.14-.036-.137-.036-.136-.037-.134-.038-.132-.039-.13-.039-.128-.041-.126-.041-.124-.041-.122-.043-.12-.043-.117-.044-.116-.044-.113-.046-.112-.046-.109-.046-.106-.048-.105-.048-.102-.048-.1-.05-.097-.049-.095-.051-.093-.051-.09-.052-.087-.052-.085-.053-.083-.053-.08-.054-.077-.054v4.153zm8.74-8.179l-.257.004-.254.005-.25.008-.247.011-.244.012-.241.014-.237.016-.233.018-.231.021-.226.022-.224.023-.22.026-.216.027-.212.028-.21.031-.205.032-.202.033-.198.034-.194.036-.191.038-.187.038-.183.04-.179.041-.175.042-.172.043-.168.043-.163.045-.16.046-.155.046-.152.048-.148.048-.143.048-.139.049-.136.05-.131.05-.126.051-.123.051-.118.051-.114.052-.11.052-.106.052-.101.052-.096.052-.092.052-.088.052-.083.052-.079.052-.074.051-.07.052-.065.051-.06.05-.056.05-.051.05-.023.025-.023.024-.021.024-.02.025-.019.024-.018.024-.017.023-.015.024-.014.023-.013.023-.012.023-.01.023-.01.022-.008.022-.006.023-.006.021-.004.022-.004.021-.001.021-.001.021.001.021.001.021.004.021.004.022.006.021.006.023.008.022.01.022.01.023.012.023.013.023.014.023.015.024.017.023.018.024.019.024.02.025.021.024.023.024.023.025.051.05.056.05.06.05.065.051.07.052.074.051.079.052.083.052.088.052.092.052.096.052.101.052.106.052.11.052.114.052.118.051.123.051.126.051.131.05.136.05.139.049.143.048.148.048.152.048.155.046.16.046.163.045.168.043.172.043.175.042.179.041.183.04.187.038.191.038.194.036.198.034.202.033.205.032.21.031.212.028.216.027.22.026.224.023.226.022.231.021.233.018.237.016.241.014.244.012.247.011.25.008.254.005.257.004.26.001.26-.001.257-.004.254-.005.25-.008.247-.011.244-.012.241-.014.237-.016.233-.018.231-.021.226-.022.224-.023.22-.026.216-.027.212-.028.21-.031.205-.032.202-.033.198-.034.194-.036.191-.038.187-.038.183-.04.179-.041.175-.042.172-.043.168-.043.163-.045.16-.046.155-.046.152-.048.148-.048.143-.048.139-.049.136-.05.131-.05.126-.051.123-.051.118-.051.114-.052.11-.052.106-.052.101-.052.096-.052.092-.052.088-.052.083-.052.079-.052.074-.051.07-.052.065-.051.06-.05.056-.05.051-.05.023-.025.023-.024.021-.024.02-.025.019-.024.018-.024.017-.023.015-.024.014-.023.013-.023.012-.023.01-.023.01-.022.008-.022.006-.023.006-.021.004-.022.004-.021.001-.021.001-.021-.001-.021-.001-.021-.004-.021-.004-.022-.006-.021-.006-.023-.008-.022-.01-.022-.01-.023-.012-.023-.013-.023-.014-.023-.015-.024-.017-.023-.018-.024-.019-.024-.02-.025-.021-.024-.023-.024-.023-.025-.051-.05-.056-.05-.06-.05-.065-.051-.07-.052-.074-.051-.079-.052-.083-.052-.088-.052-.092-.052-.096-.052-.101-.052-.106-.052-.11-.052-.114-.052-.118-.051-.123-.051-.126-.051-.131-.05-.136-.05-.139-.049-.143-.048-.148-.048-.152-.048-.155-.046-.16-.046-.163-.045-.168-.043-.172-.043-.175-.042-.179-.041-.183-.04-.187-.038-.191-.038-.194-.036-.198-.034-.202-.033-.205-.032-.21-.031-.212-.028-.216-.027-.22-.026-.224-.023-.226-.022-.231-.021-.233-.018-.237-.016-.241-.014-.244-.012-.247-.011-.25-.008-.254-.005-.257-.004-.26-.001-.26.001z"></path></symbol></defs><defs><symbol id="clock" width="24" height="24"><path transform="scale(.5)" d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.848 12.459c.202.038.202.333.001.372-1.907.361-6.045 1.111-6.547 1.111-.719 0-1.301-.582-1.301-1.301 0-.512.77-5.447 1.125-7.445.034-.192.312-.181.343.014l.985 6.238 5.394 1.011z"></path></symbol></defs><defs><marker id="arrowhead" refX="7.9" refY="5" markerUnits="userSpaceOnUse" markerWidth="12" markerHeight="12" orient="auto-start-reverse"><path d="M -1 0 L 10 5 L 0 10 z"></path></marker></defs><defs><marker id="crosshead" markerWidth="15" markerHeight="8" orient="auto" refX="4" refY="4.5"><path fill="none" stroke="#000000" stroke-width="1pt" d="M 1,2 L 6,7 M 6,2 L 1,7" style="stroke-dasharray: 0, 0;"></path></marker></defs><defs><marker id="filled-head" refX="15.5" refY="7" markerWidth="20" markerHeight="28" orient="auto"><path d="M 18,7 L9,13 L14,7 L9,1 Z"></path></marker></defs><defs><marker id="sequencenumber" refX="15" refY="15" markerWidth="60" markerHeight="40" orient="auto"><circle cx="15" cy="15" r="6"></circle></marker></defs><g><rect x="50" y="75" fill="#EDF2AE" stroke="#666" width="402" height="39" class="note"></rect><text x="251" y="80" text-anchor="middle" dominant-baseline="middle" alignment-baseline="middle" style="font-size: 16px; font-weight: 400;" class="noteText" dy="1em"><tspan x="251">Session Initialization</tspan></text></g> <g><rect x="50" y="324" fill="#EDF2AE" stroke="#666" width="402" height="39" class="note"></rect><text x="251" y="329" text-anchor="middle" dominant-baseline="middle" alignment-baseline="middle" style="font-size: 16px; font-weight: 400;" class="noteText" dy="1em"><tspan x="251">Subsequent Requests</tspan></text></g> <text x="250" y="129" text-anchor="middle" dominant-baseline="middle" alignment-baseline="middle" style="font-size: 16px; font-weight: 400;" class="messageText" dy="1em">POST /mcp (initialize)</text> <line x1="76" y1="164" x2="423" y2="164" class="messageLine0" stroke-width="2" stroke="none" marker-end="url(#arrowhead)" style="fill: none;"></line><text x="564" y="179" text-anchor="middle" dominant-baseline="middle" alignment-baseline="middle" style="font-size: 16px; font-weight: 400;" class="messageText" dy="1em">Generate session ID xyz123</text> <line x1="428" y1="214" x2="700" y2="214" class="messageLine0" stroke-width="2" stroke="none" marker-end="url(#arrowhead)" style="fill: none;"></line><text x="564" y="229" text-anchor="middle" dominant-baseline="middle" alignment-baseline="middle" style="font-size: 16px; font-weight: 400;" class="messageText" dy="1em">Store transport[xyz123]</text> <line x1="428" y1="264" x2="700" y2="264" class="messageLine0" stroke-width="2" stroke="none" marker-end="url(#arrowhead)" style="fill: none;"></line><text x="253" y="279" text-anchor="middle" dominant-baseline="middle" alignment-baseline="middle" style="font-size: 16px; font-weight: 400;" class="messageText" dy="1em">Mcp-Session-Id xyz123</text> <line x1="426" y1="314" x2="79" y2="314" class="messageLine0" stroke-width="2" stroke="none" marker-end="url(#arrowhead)" style="fill: none;"></line><text x="250" y="378" text-anchor="middle" dominant-baseline="middle" alignment-baseline="middle" style="font-size: 16px; font-weight: 400;" class="messageText" dy="1em">POST /mcp + Mcp-Session-Id xyz123</text> <line x1="76" y1="413" x2="423" y2="413" class="messageLine0" stroke-width="2" stroke="none" marker-end="url(#arrowhead)" style="fill: none;"></line><text x="564" y="428" text-anchor="middle" dominant-baseline="middle" alignment-baseline="middle" style="font-size: 16px; font-weight: 400;" class="messageText" dy="1em">Lookup transport[xyz123]</text> <line x1="428" y1="463" x2="700" y2="463" class="messageLine0" stroke-width="2" stroke="none" marker-end="url(#arrowhead)" style="fill: none;"></line><text x="567" y="478" text-anchor="middle" dominant-baseline="middle" alignment-baseline="middle" style="font-size: 16px; font-weight: 400;" class="messageText" dy="1em">Return existing transport</text> <line x1="703" y1="513" x2="431" y2="513" class="messageLine1" stroke-width="2" stroke="none" style="stroke-dasharray: 3, 3; fill: none;" marker-end="url(#arrowhead)"></line><text x="253" y="528" text-anchor="middle" dominant-baseline="middle" alignment-baseline="middle" style="font-size: 16px; font-weight: 400;" class="messageText" dy="1em">Process request with session context</text><line x1="426" y1="563" x2="79" y2="563" class="messageLine0" stroke-width="2" stroke="none" marker-end="url(#arrowhead)" style="fill: none;"></line></svg>  
  

#### Implementing Session Management (The Simple Version)

The simplest and most effective approach for most implementations is to use an in-memory JavaScript Map or object to store your sessions:

That's it! This object will store all active transport instances, with session IDs as keys.

  

#### Code Example: Simple Session Management

Here's a practical example from our MCP server implementation:

```javascript
javascript// store all active transports by session ID

const transports = {};

// handle when a client initializes a connection

app.post('/mcp', async (req, res) => {

  // check if this is an initial connection request

  const isInitRequest = req.body && req.body.method === 'initialize';

  if (isInitRequest) {

    // for new sessions, generate a unique ID

    const sessionId = uuidv4();

    

    // create a transport for this session

    const transport = new StreamableHTTPServerTransport();

    transport.sessionId = sessionId;

    

    // store it for future requests 

    transports[sessionId] = transport;

    

    // tell LLM application the session ID

    res.setHeader('Mcp-Session-Id', sessionId);

    

    // handle the initialize request

    await transport.handleRequest(req, res, req.body);

  } 

  else {

    // for existing sessions, get the ID from the header

    const sessionId = req.headers['mcp-session-id'];

    

    // look up the transport for this session

    const transport = transports[sessionId];

    

    if (!transport) {

      return res.status(404).json({

        error: 'Session not found'

      });

    }

    

    // handle the request using the existing transport

    await transport.handleRequest(req, res, req.body);

  }

});

// don't forget cleanup when sessions end

app.delete('/mcp', async (req, res) => {

  const sessionId = req.headers['mcp-session-id'];

  

  if (transports[sessionId]) {

    // Clean up the session

    delete transports[sessionId];

    res.status(204).end();

  } else {

    res.status(404).json({ error: 'Session not found' });

  }

});
```

That's really all there is to it for most implementations. The MCP SDK handles the complex parts of maintaining conversation state within the transport instance - you just need to make sure you keep track of which transport belongs to which session.

INFO

For production servers, you might want to add a simple timeout mechanism to clean up abandoned sessions, but the basic in-memory approach works well for most use cases.

  

For most implementations, the simple in-memory approach works. You might consider more complex options like Redis or database storage if:

- You're running multiple server instances behind a load balancer
- Your server needs to survive restarts without losing session state
- You have very high traffic volumes (thousands of concurrent sessions)

With session management in place to maintain conversation state, next we'll take a look at authentication, which ensures only authorized users can access your MCP tools.

  

## Part 3: Securing Access with Authentication and OAuth

With session management in place to track conversation state, the next step is securing access to your MCP tools. This involves two related but distinct processes:

**User Authentication**: Verifying who your actual human user is (via Firebase, Clerk, etc.)

**AI Client Authorization**: Granting an LLM application permission to access your APIs on behalf of that authenticated user (via OAuth 2.1)

Don't let "OAuth 2.1" intimidate you - it's simply a standardized way for AI clients to request access to your tools, and does not require external service or libraries (although many good ones exist to make things easier). In practice, you'll implement a few simple endpoints in your Express server:

  

If you have an existing app with users, you may use an auth system like Firebase or Clerk which already handles the hard parts (secure login, password management), meaning you only need to focus on the endpoints that connect authenticated users to AI clients.

This dual security model ensures that:

- Only real users with accounts can access your services
- AI clients can only take actions the user has specifically authorized
- You maintain control over which tools are accessible
  

### Understanding the Tokens and Codes

It's helpful to understand the different tokens and codes used in the MCP OAuth flow, as this is a common source of confusion:

| Token/Code Name | What It Is | Comes From | Lifespan | Storage | Purpose |
| --- | --- | --- | --- | --- | --- |
| **Identity Token** | Signed token proving user identity | Firebase/Auth provider (after user login) | ~1 hour | Not stored - used immediately | Verify user is who they claim to be |
| **Authorization Code** | Temporary exchange code | Your MCP server creates it | ~10 minutes | Stored temporarily in database | LLM application exchanges this for access token |
| **Access Token** | Long-lived API access credential | Your MCP server creates it | Days/weeks | Stored permanently in database | LLM application sends this with every API request |
| **Bearer Token** | Same as Access Token | Same as Access Token | Same as Access Token | Same as Access Token | The way to send access token in headers |

  

#### Understanding the Complete OAuth Flow in MCP

When a user first asks an LLM application to use your MCP server, here's what happens:

1. **Initial Tool Request**: The LLM application attempts to access your server
2. **Authentication Challenge**: Your server responds with "401 Unauthorized"
3. **OAuth Discovery**: The LLM application obtains authorization server information from /.well-known endpoints
4. **User Login Redirect**: The LLM application directs the user to your login page
5. **Authentication**: User logs in with your auth provider (Firebase, Auth0, etc.) and receives an identity token
6. **Authorization Code Grant**: Your server creates a temporary authorization code
7. **Token Exchange**: The LLM application exchanges this authorization code for an access token
8. **Authorized Tool Access**: The LLM application can now make authorized requests to your tools with this token

This flow combines standard user authentication with the OAuth 2.1 protocol that governs how AI clients get authorized access. Here's how that looks visualized:

  
<svg id="mermaid-1207" width="100%" xmlns="http://www.w3.org/2000/svg" style="max-width: 952px;" viewBox="-50 -10 952 871" role="graphics-document document" aria-roledescription="sequence"><g><rect x="702" y="785" fill="#eaeaea" stroke="#666" width="150" height="65" name="Server" rx="3" ry="3" class="actor actor-bottom"></rect><text x="777" y="817.5" style="text-anchor: middle; font-size: 16px; font-weight: 400;" dominant-baseline="central" alignment-baseline="central" class="actor actor-box"><tspan x="777" dy="0">Your MCP Server</tspan></text></g> <g><rect x="331" y="785" fill="#eaeaea" stroke="#666" width="150" height="65" name="LLM application" rx="3" ry="3" class="actor actor-bottom"></rect><text x="406" y="817.5" style="text-anchor: middle; font-size: 16px; font-weight: 400;" dominant-baseline="central" alignment-baseline="central" class="actor actor-box"><tspan x="406" dy="0">LLM application</tspan></text></g> <g><rect x="0" y="785" fill="#eaeaea" stroke="#666" width="150" height="65" name="User" rx="3" ry="3" class="actor actor-bottom"></rect><text x="75" y="817.5" style="text-anchor: middle; font-size: 16px; font-weight: 400;" dominant-baseline="central" alignment-baseline="central" class="actor actor-box"><tspan x="75" dy="0">User</tspan></text></g> <g><line id="actor5" x1="777" y1="65" x2="777" y2="785" class="actor-line 200" stroke-width="0.5px" stroke="#999" name="Server"></line><g id="root-5"><rect x="702" y="0" fill="#eaeaea" stroke="#666" width="150" height="65" name="Server" rx="3" ry="3" class="actor actor-top"></rect><text x="777" y="32.5" style="text-anchor: middle; font-size: 16px; font-weight: 400;" dominant-baseline="central" alignment-baseline="central" class="actor actor-box"><tspan x="777" dy="0">Your MCP Server</tspan></text></g></g> <g><line id="actor4" x1="406" y1="65" x2="406" y2="785" class="actor-line 200" stroke-width="0.5px" stroke="#999" name="LLM application"></line><g id="root-4"><rect x="331" y="0" fill="#eaeaea" stroke="#666" width="150" height="65" name="LLM application" rx="3" ry="3" class="actor actor-top"></rect><text x="406" y="32.5" style="text-anchor: middle; font-size: 16px; font-weight: 400;" dominant-baseline="central" alignment-baseline="central" class="actor actor-box"><tspan x="406" dy="0">LLM application</tspan></text></g></g> <g><line id="actor3" x1="75" y1="65" x2="75" y2="785" class="actor-line 200" stroke-width="0.5px" stroke="#999" name="User"></line><g id="root-3"><rect x="0" y="0" fill="#eaeaea" stroke="#666" width="150" height="65" name="User" rx="3" ry="3" class="actor actor-top"></rect><text x="75" y="32.5" style="text-anchor: middle; font-size: 16px; font-weight: 400;" dominant-baseline="central" alignment-baseline="central" class="actor actor-box"><tspan x="75" dy="0">User</tspan></text></g></g> <g></g><defs><symbol id="computer" width="24" height="24"><path transform="scale(.5)" d="M2 2v13h20v-13h-20zm18 11h-16v-9h16v9zm-10.228 6l.466-1h3.524l.467 1h-4.457zm14.228 3h-24l2-6h2.104l-1.33 4h18.45l-1.297-4h2.073l2 6zm-5-10h-14v-7h14v7z"></path></symbol></defs><defs><symbol id="database" fill-rule="evenodd" clip-rule="evenodd"><path transform="scale(.5)" d="M12.258.001l.256.004.255.005.253.008.251.01.249.012.247.015.246.016.242.019.241.02.239.023.236.024.233.027.231.028.229.031.225.032.223.034.22.036.217.038.214.04.211.041.208.043.205.045.201.046.198.048.194.05.191.051.187.053.183.054.18.056.175.057.172.059.168.06.163.061.16.063.155.064.15.066.074.033.073.033.071.034.07.034.069.035.068.035.067.035.066.035.064.036.064.036.062.036.06.036.06.037.058.037.058.037.055.038.055.038.053.038.052.038.051.039.05.039.048.039.047.039.045.04.044.04.043.04.041.04.04.041.039.041.037.041.036.041.034.041.033.042.032.042.03.042.029.042.027.042.026.043.024.043.023.043.021.043.02.043.018.044.017.043.015.044.013.044.012.044.011.045.009.044.007.045.006.045.004.045.002.045.001.045v17l-.001.045-.002.045-.004.045-.006.045-.007.045-.009.044-.011.045-.012.044-.013.044-.015.044-.017.043-.018.044-.02.043-.021.043-.023.043-.024.043-.026.043-.027.042-.029.042-.03.042-.032.042-.033.042-.034.041-.036.041-.037.041-.039.041-.04.041-.041.04-.043.04-.044.04-.045.04-.047.039-.048.039-.05.039-.051.039-.052.038-.053.038-.055.038-.055.038-.058.037-.058.037-.06.037-.06.036-.062.036-.064.036-.064.036-.066.035-.067.035-.068.035-.069.035-.07.034-.071.034-.073.033-.074.033-.15.066-.155.064-.16.063-.163.061-.168.06-.172.059-.175.057-.18.056-.183.054-.187.053-.191.051-.194.05-.198.048-.201.046-.205.045-.208.043-.211.041-.214.04-.217.038-.22.036-.223.034-.225.032-.229.031-.231.028-.233.027-.236.024-.239.023-.241.02-.242.019-.246.016-.247.015-.249.012-.251.01-.253.008-.255.005-.256.004-.258.001-.258-.001-.256-.004-.255-.005-.253-.008-.251-.01-.249-.012-.247-.015-.245-.016-.243-.019-.241-.02-.238-.023-.236-.024-.234-.027-.231-.028-.228-.031-.226-.032-.223-.034-.22-.036-.217-.038-.214-.04-.211-.041-.208-.043-.204-.045-.201-.046-.198-.048-.195-.05-.19-.051-.187-.053-.184-.054-.179-.056-.176-.057-.172-.059-.167-.06-.164-.061-.159-.063-.155-.064-.151-.066-.074-.033-.072-.033-.072-.034-.07-.034-.069-.035-.068-.035-.067-.035-.066-.035-.064-.036-.063-.036-.062-.036-.061-.036-.06-.037-.058-.037-.057-.037-.056-.038-.055-.038-.053-.038-.052-.038-.051-.039-.049-.039-.049-.039-.046-.039-.046-.04-.044-.04-.043-.04-.041-.04-.04-.041-.039-.041-.037-.041-.036-.041-.034-.041-.033-.042-.032-.042-.03-.042-.029-.042-.027-.042-.026-.043-.024-.043-.023-.043-.021-.043-.02-.043-.018-.044-.017-.043-.015-.044-.013-.044-.012-.044-.011-.045-.009-.044-.007-.045-.006-.045-.004-.045-.002-.045-.001-.045v-17l.001-.045.002-.045.004-.045.006-.045.007-.045.009-.044.011-.045.012-.044.013-.044.015-.044.017-.043.018-.044.02-.043.021-.043.023-.043.024-.043.026-.043.027-.042.029-.042.03-.042.032-.042.033-.042.034-.041.036-.041.037-.041.039-.041.04-.041.041-.04.043-.04.044-.04.046-.04.046-.039.049-.039.049-.039.051-.039.052-.038.053-.038.055-.038.056-.038.057-.037.058-.037.06-.037.061-.036.062-.036.063-.036.064-.036.066-.035.067-.035.068-.035.069-.035.07-.034.072-.034.072-.033.074-.033.151-.066.155-.064.159-.063.164-.061.167-.06.172-.059.176-.057.179-.056.184-.054.187-.053.19-.051.195-.05.198-.048.201-.046.204-.045.208-.043.211-.041.214-.04.217-.038.22-.036.223-.034.226-.032.228-.031.231-.028.234-.027.236-.024.238-.023.241-.02.243-.019.245-.016.247-.015.249-.012.251-.01.253-.008.255-.005.256-.004.258-.001.258.001zm-9.258 20.499v.01l.001.021.003.021.004.022.005.021.006.022.007.022.009.023.01.022.011.023.012.023.013.023.015.023.016.024.017.023.018.024.019.024.021.024.022.025.023.024.024.025.052.049.056.05.061.051.066.051.07.051.075.051.079.052.084.052.088.052.092.052.097.052.102.051.105.052.11.052.114.051.119.051.123.051.127.05.131.05.135.05.139.048.144.049.147.047.152.047.155.047.16.045.163.045.167.043.171.043.176.041.178.041.183.039.187.039.19.037.194.035.197.035.202.033.204.031.209.03.212.029.216.027.219.025.222.024.226.021.23.02.233.018.236.016.24.015.243.012.246.01.249.008.253.005.256.004.259.001.26-.001.257-.004.254-.005.25-.008.247-.011.244-.012.241-.014.237-.016.233-.018.231-.021.226-.021.224-.024.22-.026.216-.027.212-.028.21-.031.205-.031.202-.034.198-.034.194-.036.191-.037.187-.039.183-.04.179-.04.175-.042.172-.043.168-.044.163-.045.16-.046.155-.046.152-.047.148-.048.143-.049.139-.049.136-.05.131-.05.126-.05.123-.051.118-.052.114-.051.11-.052.106-.052.101-.052.096-.052.092-.052.088-.053.083-.051.079-.052.074-.052.07-.051.065-.051.06-.051.056-.05.051-.05.023-.024.023-.025.021-.024.02-.024.019-.024.018-.024.017-.024.015-.023.014-.024.013-.023.012-.023.01-.023.01-.022.008-.022.006-.022.006-.022.004-.022.004-.021.001-.021.001-.021v-4.127l-.077.055-.08.053-.083.054-.085.053-.087.052-.09.052-.093.051-.095.05-.097.05-.1.049-.102.049-.105.048-.106.047-.109.047-.111.046-.114.045-.115.045-.118.044-.12.043-.122.042-.124.042-.126.041-.128.04-.13.04-.132.038-.134.038-.135.037-.138.037-.139.035-.142.035-.143.034-.144.033-.147.032-.148.031-.15.03-.151.03-.153.029-.154.027-.156.027-.158.026-.159.025-.161.024-.162.023-.163.022-.165.021-.166.02-.167.019-.169.018-.169.017-.171.016-.173.015-.173.014-.175.013-.175.012-.177.011-.178.01-.179.008-.179.008-.181.006-.182.005-.182.004-.184.003-.184.002h-.37l-.184-.002-.184-.003-.182-.004-.182-.005-.181-.006-.179-.008-.179-.008-.178-.01-.176-.011-.176-.012-.175-.013-.173-.014-.172-.015-.171-.016-.17-.017-.169-.018-.167-.019-.166-.02-.165-.021-.163-.022-.162-.023-.161-.024-.159-.025-.157-.026-.156-.027-.155-.027-.153-.029-.151-.03-.15-.03-.148-.031-.146-.032-.145-.033-.143-.034-.141-.035-.14-.035-.137-.037-.136-.037-.134-.038-.132-.038-.13-.04-.128-.04-.126-.041-.124-.042-.122-.042-.12-.044-.117-.043-.116-.045-.113-.045-.112-.046-.109-.047-.106-.047-.105-.048-.102-.049-.1-.049-.097-.05-.095-.05-.093-.052-.09-.051-.087-.052-.085-.053-.083-.054-.08-.054-.077-.054v4.127zm0-5.654v.011l.001.021.003.021.004.021.005.022.006.022.007.022.009.022.01.022.011.023.012.023.013.023.015.024.016.023.017.024.018.024.019.024.021.024.022.024.023.025.024.024.052.05.056.05.061.05.066.051.07.051.075.052.079.051.084.052.088.052.092.052.097.052.102.052.105.052.11.051.114.051.119.052.123.05.127.051.131.05.135.049.139.049.144.048.147.048.152.047.155.046.16.045.163.045.167.044.171.042.176.042.178.04.183.04.187.038.19.037.194.036.197.034.202.033.204.032.209.03.212.028.216.027.219.025.222.024.226.022.23.02.233.018.236.016.24.014.243.012.246.01.249.008.253.006.256.003.259.001.26-.001.257-.003.254-.006.25-.008.247-.01.244-.012.241-.015.237-.016.233-.018.231-.02.226-.022.224-.024.22-.025.216-.027.212-.029.21-.03.205-.032.202-.033.198-.035.194-.036.191-.037.187-.039.183-.039.179-.041.175-.042.172-.043.168-.044.163-.045.16-.045.155-.047.152-.047.148-.048.143-.048.139-.05.136-.049.131-.05.126-.051.123-.051.118-.051.114-.052.11-.052.106-.052.101-.052.096-.052.092-.052.088-.052.083-.052.079-.052.074-.051.07-.052.065-.051.06-.05.056-.051.051-.049.023-.025.023-.024.021-.025.02-.024.019-.024.018-.024.017-.024.015-.023.014-.023.013-.024.012-.022.01-.023.01-.023.008-.022.006-.022.006-.022.004-.021.004-.022.001-.021.001-.021v-4.139l-.077.054-.08.054-.083.054-.085.052-.087.053-.09.051-.093.051-.095.051-.097.05-.1.049-.102.049-.105.048-.106.047-.109.047-.111.046-.114.045-.115.044-.118.044-.12.044-.122.042-.124.042-.126.041-.128.04-.13.039-.132.039-.134.038-.135.037-.138.036-.139.036-.142.035-.143.033-.144.033-.147.033-.148.031-.15.03-.151.03-.153.028-.154.028-.156.027-.158.026-.159.025-.161.024-.162.023-.163.022-.165.021-.166.02-.167.019-.169.018-.169.017-.171.016-.173.015-.173.014-.175.013-.175.012-.177.011-.178.009-.179.009-.179.007-.181.007-.182.005-.182.004-.184.003-.184.002h-.37l-.184-.002-.184-.003-.182-.004-.182-.005-.181-.007-.179-.007-.179-.009-.178-.009-.176-.011-.176-.012-.175-.013-.173-.014-.172-.015-.171-.016-.17-.017-.169-.018-.167-.019-.166-.02-.165-.021-.163-.022-.162-.023-.161-.024-.159-.025-.157-.026-.156-.027-.155-.028-.153-.028-.151-.03-.15-.03-.148-.031-.146-.033-.145-.033-.143-.033-.141-.035-.14-.036-.137-.036-.136-.037-.134-.038-.132-.039-.13-.039-.128-.04-.126-.041-.124-.042-.122-.043-.12-.043-.117-.044-.116-.044-.113-.046-.112-.046-.109-.046-.106-.047-.105-.048-.102-.049-.1-.049-.097-.05-.095-.051-.093-.051-.09-.051-.087-.053-.085-.052-.083-.054-.08-.054-.077-.054v4.139zm0-5.666v.011l.001.02.003.022.004.021.005.022.006.021.007.022.009.023.01.022.011.023.012.023.013.023.015.023.016.024.017.024.018.023.019.024.021.025.022.024.023.024.024.025.052.05.056.05.061.05.066.051.07.051.075.052.079.051.084.052.088.052.092.052.097.052.102.052.105.051.11.052.114.051.119.051.123.051.127.05.131.05.135.05.139.049.144.048.147.048.152.047.155.046.16.045.163.045.167.043.171.043.176.042.178.04.183.04.187.038.19.037.194.036.197.034.202.033.204.032.209.03.212.028.216.027.219.025.222.024.226.021.23.02.233.018.236.017.24.014.243.012.246.01.249.008.253.006.256.003.259.001.26-.001.257-.003.254-.006.25-.008.247-.01.244-.013.241-.014.237-.016.233-.018.231-.02.226-.022.224-.024.22-.025.216-.027.212-.029.21-.03.205-.032.202-.033.198-.035.194-.036.191-.037.187-.039.183-.039.179-.041.175-.042.172-.043.168-.044.163-.045.16-.045.155-.047.152-.047.148-.048.143-.049.139-.049.136-.049.131-.051.126-.05.123-.051.118-.052.114-.051.11-.052.106-.052.101-.052.096-.052.092-.052.088-.052.083-.052.079-.052.074-.052.07-.051.065-.051.06-.051.056-.05.051-.049.023-.025.023-.025.021-.024.02-.024.019-.024.018-.024.017-.024.015-.023.014-.024.013-.023.012-.023.01-.022.01-.023.008-.022.006-.022.006-.022.004-.022.004-.021.001-.021.001-.021v-4.153l-.077.054-.08.054-.083.053-.085.053-.087.053-.09.051-.093.051-.095.051-.097.05-.1.049-.102.048-.105.048-.106.048-.109.046-.111.046-.114.046-.115.044-.118.044-.12.043-.122.043-.124.042-.126.041-.128.04-.13.039-.132.039-.134.038-.135.037-.138.036-.139.036-.142.034-.143.034-.144.033-.147.032-.148.032-.15.03-.151.03-.153.028-.154.028-.156.027-.158.026-.159.024-.161.024-.162.023-.163.023-.165.021-.166.02-.167.019-.169.018-.169.017-.171.016-.173.015-.173.014-.175.013-.175.012-.177.01-.178.01-.179.009-.179.007-.181.006-.182.006-.182.004-.184.003-.184.001-.185.001-.185-.001-.184-.001-.184-.003-.182-.004-.182-.006-.181-.006-.179-.007-.179-.009-.178-.01-.176-.01-.176-.012-.175-.013-.173-.014-.172-.015-.171-.016-.17-.017-.169-.018-.167-.019-.166-.02-.165-.021-.163-.023-.162-.023-.161-.024-.159-.024-.157-.026-.156-.027-.155-.028-.153-.028-.151-.03-.15-.03-.148-.032-.146-.032-.145-.033-.143-.034-.141-.034-.14-.036-.137-.036-.136-.037-.134-.038-.132-.039-.13-.039-.128-.041-.126-.041-.124-.041-.122-.043-.12-.043-.117-.044-.116-.044-.113-.046-.112-.046-.109-.046-.106-.048-.105-.048-.102-.048-.1-.05-.097-.049-.095-.051-.093-.051-.09-.052-.087-.052-.085-.053-.083-.053-.08-.054-.077-.054v4.153zm8.74-8.179l-.257.004-.254.005-.25.008-.247.011-.244.012-.241.014-.237.016-.233.018-.231.021-.226.022-.224.023-.22.026-.216.027-.212.028-.21.031-.205.032-.202.033-.198.034-.194.036-.191.038-.187.038-.183.04-.179.041-.175.042-.172.043-.168.043-.163.045-.16.046-.155.046-.152.048-.148.048-.143.048-.139.049-.136.05-.131.05-.126.051-.123.051-.118.051-.114.052-.11.052-.106.052-.101.052-.096.052-.092.052-.088.052-.083.052-.079.052-.074.051-.07.052-.065.051-.06.05-.056.05-.051.05-.023.025-.023.024-.021.024-.02.025-.019.024-.018.024-.017.023-.015.024-.014.023-.013.023-.012.023-.01.023-.01.022-.008.022-.006.023-.006.021-.004.022-.004.021-.001.021-.001.021.001.021.001.021.004.021.004.022.006.021.006.023.008.022.01.022.01.023.012.023.013.023.014.023.015.024.017.023.018.024.019.024.02.025.021.024.023.024.023.025.051.05.056.05.06.05.065.051.07.052.074.051.079.052.083.052.088.052.092.052.096.052.101.052.106.052.11.052.114.052.118.051.123.051.126.051.131.05.136.05.139.049.143.048.148.048.152.048.155.046.16.046.163.045.168.043.172.043.175.042.179.041.183.04.187.038.191.038.194.036.198.034.202.033.205.032.21.031.212.028.216.027.22.026.224.023.226.022.231.021.233.018.237.016.241.014.244.012.247.011.25.008.254.005.257.004.26.001.26-.001.257-.004.254-.005.25-.008.247-.011.244-.012.241-.014.237-.016.233-.018.231-.021.226-.022.224-.023.22-.026.216-.027.212-.028.21-.031.205-.032.202-.033.198-.034.194-.036.191-.038.187-.038.183-.04.179-.041.175-.042.172-.043.168-.043.163-.045.16-.046.155-.046.152-.048.148-.048.143-.048.139-.049.136-.05.131-.05.126-.051.123-.051.118-.051.114-.052.11-.052.106-.052.101-.052.096-.052.092-.052.088-.052.083-.052.079-.052.074-.051.07-.052.065-.051.06-.05.056-.05.051-.05.023-.025.023-.024.021-.024.02-.025.019-.024.018-.024.017-.023.015-.024.014-.023.013-.023.012-.023.01-.023.01-.022.008-.022.006-.023.006-.021.004-.022.004-.021.001-.021.001-.021-.001-.021-.001-.021-.004-.021-.004-.022-.006-.021-.006-.023-.008-.022-.01-.022-.01-.023-.012-.023-.013-.023-.014-.023-.015-.024-.017-.023-.018-.024-.019-.024-.02-.025-.021-.024-.023-.024-.023-.025-.051-.05-.056-.05-.06-.05-.065-.051-.07-.052-.074-.051-.079-.052-.083-.052-.088-.052-.092-.052-.096-.052-.101-.052-.106-.052-.11-.052-.114-.052-.118-.051-.123-.051-.126-.051-.131-.05-.136-.05-.139-.049-.143-.048-.148-.048-.152-.048-.155-.046-.16-.046-.163-.045-.168-.043-.172-.043-.175-.042-.179-.041-.183-.04-.187-.038-.191-.038-.194-.036-.198-.034-.202-.033-.205-.032-.21-.031-.212-.028-.216-.027-.22-.026-.224-.023-.226-.022-.231-.021-.233-.018-.237-.016-.241-.014-.244-.012-.247-.011-.25-.008-.254-.005-.257-.004-.26-.001-.26.001z"></path></symbol></defs><defs><symbol id="clock" width="24" height="24"><path transform="scale(.5)" d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.848 12.459c.202.038.202.333.001.372-1.907.361-6.045 1.111-6.547 1.111-.719 0-1.301-.582-1.301-1.301 0-.512.77-5.447 1.125-7.445.034-.192.312-.181.343.014l.985 6.238 5.394 1.011z"></path></symbol></defs><defs><marker id="arrowhead" refX="7.9" refY="5" markerUnits="userSpaceOnUse" markerWidth="12" markerHeight="12" orient="auto-start-reverse"><path d="M -1 0 L 10 5 L 0 10 z"></path></marker></defs><defs><marker id="crosshead" markerWidth="15" markerHeight="8" orient="auto" refX="4" refY="4.5"><path fill="none" stroke="#000000" stroke-width="1pt" d="M 1,2 L 6,7 M 6,2 L 1,7" style="stroke-dasharray: 0, 0;"></path></marker></defs><defs><marker id="filled-head" refX="15.5" refY="7" markerWidth="20" markerHeight="28" orient="auto"><path d="M 18,7 L9,13 L14,7 L9,1 Z"></path></marker></defs><defs><marker id="sequencenumber" refX="15" refY="15" markerWidth="60" markerHeight="40" orient="auto"><circle cx="15" cy="15" r="6"></circle></marker></defs><text x="590" y="80" text-anchor="middle" dominant-baseline="middle" alignment-baseline="middle" style="font-size: 16px; font-weight: 400;" class="messageText" dy="1em">"Show me my scrape recipes" (No auth)</text> <line x1="407" y1="115" x2="773" y2="115" class="messageLine0" stroke-width="2" stroke="none" marker-end="url(#arrowhead)" style="fill: none;"></line><text x="593" y="130" text-anchor="middle" dominant-baseline="middle" alignment-baseline="middle" style="font-size: 16px; font-weight: 400;" class="messageText" dy="1em">401 Unauthorized + Auth challenge</text> <line x1="776" y1="165" x2="410" y2="165" class="messageLine0" stroke-width="2" stroke="none" marker-end="url(#arrowhead)" style="fill: none;"></line><text x="590" y="180" text-anchor="middle" dominant-baseline="middle" alignment-baseline="middle" style="font-size: 16px; font-weight: 400;" class="messageText" dy="1em">Get auth server details</text> <line x1="407" y1="215" x2="773" y2="215" class="messageLine0" stroke-width="2" stroke="none" marker-end="url(#arrowhead)" style="fill: none;"></line><text x="593" y="230" text-anchor="middle" dominant-baseline="middle" alignment-baseline="middle" style="font-size: 16px; font-weight: 400;" class="messageText" dy="1em">Authorization endpoints info</text> <line x1="776" y1="265" x2="410" y2="265" class="messageLine0" stroke-width="2" stroke="none" marker-end="url(#arrowhead)" style="fill: none;"></line><text x="242" y="280" text-anchor="middle" dominant-baseline="middle" alignment-baseline="middle" style="font-size: 16px; font-weight: 400;" class="messageText" dy="1em">"Please log in to access your data"</text> <line x1="405" y1="315" x2="79" y2="315" class="messageLine0" stroke-width="2" stroke="none" marker-end="url(#arrowhead)" style="fill: none;"></line><text x="425" y="330" text-anchor="middle" dominant-baseline="middle" alignment-baseline="middle" style="font-size: 16px; font-weight: 400;" class="messageText" dy="1em">Visit login page</text> <line x1="76" y1="365" x2="773" y2="365" class="messageLine0" stroke-width="2" stroke="none" marker-end="url(#arrowhead)" style="fill: none;"></line><text x="428" y="380" text-anchor="middle" dominant-baseline="middle" alignment-baseline="middle" style="font-size: 16px; font-weight: 400;" class="messageText" dy="1em">Show login form</text> <line x1="776" y1="415" x2="79" y2="415" class="messageLine0" stroke-width="2" stroke="none" marker-end="url(#arrowhead)" style="fill: none;"></line><text x="425" y="430" text-anchor="middle" dominant-baseline="middle" alignment-baseline="middle" style="font-size: 16px; font-weight: 400;" class="messageText" dy="1em">Provide credentials &amp; authenticate</text> <line x1="76" y1="465" x2="773" y2="465" class="messageLine0" stroke-width="2" stroke="none" marker-end="url(#arrowhead)" style="fill: none;"></line><text x="593" y="480" text-anchor="middle" dominant-baseline="middle" alignment-baseline="middle" style="font-size: 16px; font-weight: 400;" class="messageText" dy="1em">Create authorization code</text> <line x1="776" y1="515" x2="410" y2="515" class="messageLine0" stroke-width="2" stroke="none" marker-end="url(#arrowhead)" style="fill: none;"></line><text x="590" y="530" text-anchor="middle" dominant-baseline="middle" alignment-baseline="middle" style="font-size: 16px; font-weight: 400;" class="messageText" dy="1em">Exchange code for access token</text> <line x1="407" y1="565" x2="773" y2="565" class="messageLine0" stroke-width="2" stroke="none" marker-end="url(#arrowhead)" style="fill: none;"></line><text x="593" y="580" text-anchor="middle" dominant-baseline="middle" alignment-baseline="middle" style="font-size: 16px; font-weight: 400;" class="messageText" dy="1em">Access token</text> <line x1="776" y1="615" x2="410" y2="615" class="messageLine0" stroke-width="2" stroke="none" marker-end="url(#arrowhead)" style="fill: none;"></line><text x="590" y="630" text-anchor="middle" dominant-baseline="middle" alignment-baseline="middle" style="font-size: 16px; font-weight: 400;" class="messageText" dy="1em">Tool request with Bearer token</text> <line x1="407" y1="665" x2="773" y2="665" class="messageLine0" stroke-width="2" stroke="none" marker-end="url(#arrowhead)" style="fill: none;"></line><text x="593" y="680" text-anchor="middle" dominant-baseline="middle" alignment-baseline="middle" style="font-size: 16px; font-weight: 400;" class="messageText" dy="1em">"Here are your Twitter recipes..."</text> <line x1="776" y1="715" x2="410" y2="715" class="messageLine0" stroke-width="2" stroke="none" marker-end="url(#arrowhead)" style="fill: none;"></line><text x="242" y="730" text-anchor="middle" dominant-baseline="middle" alignment-baseline="middle" style="font-size: 16px; font-weight: 400;" class="messageText" dy="1em">Display recipe results</text><line x1="405" y1="765" x2="79" y2="765" class="messageLine0" stroke-width="2" stroke="none" marker-end="url(#arrowhead)" style="fill: none;"></line></svg>  

And here are the specific endpoints required to be implemented for this flow:

| Step # | Name | Endpoint | Purpose |
| --- | --- | --- | --- |
| 1 | **Initial Request** | Your remote mcp server (eg `https://mcp.simplescraper.io/mcp`) | Client attempts to use a tool |
| 2 | **Protected Resource Discovery** | `/.well-known/oauth-protected-resource` | Discovers auth server details |
| 3 | **Authorization Server Discovery** | `/.well-known/oauth-authorization-server` | Provides detailed auth server metadata |
| 4 | **Authentication** | `/authorize` | Shows login UI to the user |
| 5 | **Authorization Code** | `/callback` | Receives result after user login |
| 6 | **Token Exchange** | `/token` | Exchanges code for token |
| 7 | **Authenticated Access** | `/mcp` with Authorization header | Uses token for all tool calls |

We'll implement all of these endpoints below, including PKCE (a security feature that prevents certain types of attacks).

  

### Implementing OAuth 2.1 endpoints

These endpoints provide information about our authentication flow to MCP clients.

  

You have several options for implementing user authentication:

**Your Existing Auth System**

- If your application already has authentication, use it!
- You'll just need to add the OAuth endpoints required by MCP
- Avoids introducing another auth system
- Works with any authentication system that can issue tokens

**Firebase Auth** (What we'll use in this guide)

- Easy to set up with minimal code
- Free for most use cases
- Handles login UI and user management
- Integrates with broader Google Cloud services

**Supabase Auth**

- Open source and hosted options
- Directly integrates with PostgreSQL database
- The right choice if you're already using Supabase

**Clerk**

- Developer-friendly with beautiful UI components
- Pre-built React components make integration easy
- Popular option with good user management features

**Auth0**

- More comprehensive with advanced features
- Handles both authentication and authorization rules
- Great compliance features for regulated industries
- You still need all the same MCP OAuth endpoints even with Auth0
  
  

#### Creating the User Login Experience

While auth providers like Firebase have their own login UI, you may want a custom login page to match your application's branding. You'll create an `/authorize` endpoint that serves an HTML page for user login (e.g., Google or email sign-in) and then redirects to the `/callback` endpoint with OAuth parameters.

  

#### The /authorize Endpoint

  

#### Frontend Login Logic

Your login page needs to:

1. Authenticate the user with your auth provider (Firebase, Auth0, etc.)
2. Get an identity token proving who they are
3. Redirect to `/callback` with all the OAuth parameters

This handles the user login process and redirects to `/callback` with both the identity token and OAuth parameters required for the next step.

INFO

Other auth providers like Auth0, Clerk, or Supabase would replace `firebase.auth().currentUser.getIdToken()` with their own token retrieval methods, but the overall pattern remains the same.

  

### Implementing Access Token Verification

With the user login flow in place, we now need to handle the access tokens that the LLM application sends in the request Authorization Bearer header with each request. This verification process ensures that only valid tokens from authenticated users can access our tools.

We can create a helper function that validates these tokens and provides user context to our tool handlers:

```javascript
javascript// mcp-server.js

// authentication helper function

async function authenticateToken(req, res, rpcId = null) {

  const authHeader = req.headers['authorization'] || '';

  const token = authHeader.replace(/^Bearer\s+/i, '').trim();

  const baseUrl = getBaseUrl(req);

  if (!token) {

    const wwwAuthHeader = \`Bearer realm="MCP Server", resource_metadata_uri="${baseUrl}/.well-known/oauth-protected-resource"\`;

    

    return {

      success: false,

      response: res.status(401)

        .header('WWW-Authenticate', wwwAuthHeader)

        .json({

          jsonrpc: '2.0',

          error: { code: -32000, message: 'Missing Bearer token' },

          id: rpcId

        })

    };

  }

  try {

    // verify token in Firestore

    const doc = await db.collection('mcp-tokens').doc(token).get();

    if (!doc.exists) {

      return {

        success: false,

        response: res.status(403).json({

          jsonrpc: '2.0',

          error: { code: -32001, message: 'Invalid or expired token' },

          id: rpcId

        })

      };

    }

    const tokenData = doc.data();

    // create auth object for MCP server

    const authObject = {

      token: token,

      clientId: String(tokenData.client_id),

      scopes: Array.isArray(tokenData.scopes) ? tokenData.scopes.map(String) : []

    };

    return {

      success: true,

      tokenData,

      authObject

    };

  } catch (dbError) {

    return {

      success: false,

      response: res.status(500).json({

        jsonrpc: '2.0',

        error: { code: -32002, message: 'Database error during authentication' },

        id: rpcId

      })

    };

  }

}
```

The returned `authObject` contains everything our tool handlers need to know about who's making the request and what they're allowed to do.

  

## Part 4: Building the Core MCP Server & Transport Handlers

  

### Core Server Setup with Express

Let's start by setting up the basic structure of our MCP server using Express. This forms the foundation for our implementation:

```javascript
javascript// mcp-server.js

import express from 'express';

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';

import { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse.js';

import { v4 as uuidv4 } from 'uuid';

import authRoutes from './auth-routes.js';

import { debugLog } from './utils.js';

import { db } from './firebaseConfig.js';

// Create Express app

const app = express();

const port = process.env.PORT || 3000;

// Configure middleware

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Add CORS middleware

app.use((req, res, next) => {

  res.header('Access-Control-Allow-Origin', '*');

  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE');

  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Mcp-Session-Id');

  res.header('Access-Control-Expose-Headers', 'Mcp-Session-Id, WWW-Authenticate');

  

  if (req.method === 'OPTIONS') {

    return res.status(200).end();

  }

  

  next();

});

// Mount authentication routes

app.use(authRoutes);

// Create MCP server with tools registration

const mcpServer = new McpServer({

  name: "My MCP Server",

  version: "1.0.0",

  instructions: \`Instructions for using these tools...\`

});

// Register your tools here

registerTools(mcpServer);

// Transport maps

const transports = {};

const pendingTransports = {};

// Start server

app.listen(port, () => {

  console.log(\`MCP server running on port ${port}\`);

  console.log(\`MCP endpoint available at http://localhost:${port}/mcp\`);

});
```

Next, we'll implement the transport handling.

  

### Transport Implementation Details

This function encapsulates the creation and connection of a transport instance. By mapping each session to a dedicated transport, we maintain state across multiple requests.

```javascript
javascript// mcp-server.js

// Helper function to create and connect a transport

async function createAndConnectTransport(sessionId, mcpServer, transports) {

  if (pendingTransports[sessionId] || transports[sessionId]) {

    return pendingTransports[sessionId] || transports[sessionId];

  }

  const transport = new StreamableHTTPServerTransport({

    enableJsonResponse: true,

    eventSourceEnabled: true,

    onsessioninitialized: (actualId) => {

      delete pendingTransports[actualId];

    }

  });

  // Manually assign session ID

  transport.sessionId = sessionId;

  // Set cleanup handler

  transport.onclose = () => {

    if (transports[sessionId]) {

      delete transports[sessionId];

    }

  };

  // Track pending transport and store immediately

  pendingTransports[sessionId] = transport;

  transports[sessionId] = transport;

  // Connect to MCP server

  try {

    await mcpServer.connect(transport);

  } catch (error) {

    delete pendingTransports[sessionId];

    delete transports[sessionId];

    throw error;

  }

  return transport;

}
```
  

### Session Management Implementation

Finally, let's implement the main MCP endpoint that handles session management:

```javascript
javascript// mcp-server.js

// POST handler for /mcp endpoint

app.post('/mcp', async (req, res) => {

  const body = req.body;

  const rpcId = (body && body.id !== undefined) ? body.id : null;

  // authenticate the token

  const authResult = await authenticateToken(req, res, rpcId);

  if (!authResult.success) {

    return authResult.response;

  }

  // assign auth object to request

  req.auth = authResult.authObject;

  // extract session ID from header

  const clientSessionIdHeader = req.headers['mcp-session-id'];

  const actualClientSessionId = Array.isArray(clientSessionIdHeader) 

    ? clientSessionIdHeader[0] 

    : clientSessionIdHeader;

  let transport;

  let effectiveSessionId;

  // check if this is an initialize request

  const isInitRequest = body && body.method === 'initialize';

  if (isInitRequest) {

    // for initialize requests, create a new session

    effectiveSessionId = uuidv4();

    transport = await createAndConnectTransport(effectiveSessionId, mcpServer, transports);

    

    // set session ID in response header

    res.setHeader('Mcp-Session-Id', effectiveSessionId);

  } else if (actualClientSessionId && transports[actualClientSessionId]) {

    // for existing sessions, use the existing transport

    transport = transports[actualClientSessionId];

    effectiveSessionId = actualClientSessionId;

  } else {

    // invalid session ID for non-initialize request

    return res.status(400).json({

      jsonrpc: '2.0',

      error: { code: -32003, message: 'Bad Request: No valid session ID for non-initialize request.' },

      id: rpcId

    });

  }

  // set session ID in request headers for the transport

  req.headers['mcp-session-id'] = effectiveSessionId;

  

  // always set session ID in response headers

  res.setHeader('Mcp-Session-Id', effectiveSessionId);

  // handle the request using the transport

  try {

    await transport.handleRequest(req, res, body);

  } catch (handleError) {

    if (!res.headersSent) {

      res.status(500).json({ 

        jsonrpc: '2.0', 

        error: { code: -32603, message: 'Internal server error during MCP request handling' }, 

        id: rpcId 

      });

    }

  }

});
```

This endpoint is used to create a new session for initial Streamable HTTP request and using existing sessions for subsequent requests.

  

### Supporting Both Modern and Legacy Clients

A key challenge in building a production-ready MCP server is supporting both modern clients (using Streamable HTTP) and legacy clients (using HTTP+SSE). Rather than creating separate implementations, we'll use a unified approach:

1. **Single MCP Server Instance**: Register all tools with one central MCP server
2. **Multiple Transport Types**: Support different transport implementations for different clients
3. **Protocol Detection**: Route requests to the appropriate transport handler based on HTTP method and path
4. **Shared Authentication**: Apply the same authentication logic regardless of transport type

This approach provides maximum compatibility while minimizing code duplication and maintenance overhead.

  

### Modern Clients (Streamable HTTP)

Modern clients use the Streamable HTTP transport with these key characteristics:

1. **Single `/mcp` Endpoint**: All requests go through one endpoint
2. **Session ID via Header**: The `Mcp-Session-Id` header tracks session state
3. **JSON or SSE Responses**: The same endpoint can return either format based on the client's needs
4. **DELETE for Cleanup**: Clients can explicitly terminate sessions
  
  

### Modern Client Implementation

```js
js// POST handler for /mcp (modern Streamable HTTP clients)

app.post('/mcp', async (req, res) => {

  const body = req.body;

  const rpcId = (body && body.id !== undefined) ? body.id : null;

  // authenticate the token and assign it to req.auth

  const authResult = await authenticateToken(req, res, rpcId);

  if (!authResult.success) {

    return authResult.response;

  }

  req.auth = authResult.authObject;

  // session and transport handling

  const clientSessionIdHeader = req.headers['mcp-session-id'];

  const actualClientSessionId = Array.isArray(clientSessionIdHeader) 

    ? clientSessionIdHeader[0] 

    : clientSessionIdHeader;

  let transport;

  let effectiveSessionId;

  // check if this is an initialize request

  const isInitRequest = body && body.method === 'initialize';

  if (isInitRequest) {

    // create new session for initialize requests

    effectiveSessionId = uuidv4();

    transport = await createAndConnectTransport(

      effectiveSessionId, 

      mcpServer, 

      transports, 

      'Initialize: '

    );

    // set the session ID in the response header for initialize requests

    res.setHeader('Mcp-Session-Id', effectiveSessionId);

  } else if (actualClientSessionId && pendingTransports[actualClientSessionId]) {

    // use pending transport for remote LLM application sessions

    transport = await pendingTransports[actualClientSessionId];

    effectiveSessionId = actualClientSessionId;

  } else if (actualClientSessionId && transports[actualClientSessionId]) {

    // use existing transport for known sessions

    transport = transports[actualClientSessionId];

    effectiveSessionId = actualClientSessionId;

  } else if (actualClientSessionId) {

    // create new transport for unknown session ID

    effectiveSessionId = actualClientSessionId;

    transport = await createAndConnectTransport(

      effectiveSessionId, 

      mcpServer, 

      transports, 

      'Unknown Session: '

    );

  } else {

    // error: non-initialize request without session ID

    return res.status(400).json({

      jsonrpc: '2.0',

      error: { 

        code: -32003, 

        message: 'Bad Request: No session ID provided for non-initialize request.' 

      },

      id: rpcId

    });

  }

  // ensure session ID is consistent across request/response

  req.headers['mcp-session-id'] = effectiveSessionId;

  res.setHeader('Mcp-Session-Id', effectiveSessionId);

  // handle request using MCP transport

  try {

    // pass the original Express req, res, and parsed body

    await transport.handleRequest(req, res, body);

    return;

  } catch (handleError) {

    console.error(\`MCP POST handleRequest error (session ${effectiveSessionId}):\`, handleError);

    if (!res.headersSent) {

      res.status(500).json({ 

        jsonrpc: '2.0', 

        error: { 

          code: -32603, 

          message: 'Internal server error during MCP request handling' 

        }, 

        id: rpcId 

      });

    }

  }

});
```
  

### Legacy Clients (HTTP+SSE)

Legacy clients use the HTTP+SSE transport, which requires a different approach with two separate endpoints:

- **Dual Endpoints**: `GET /mcp` for SSE stream and `POST /messages` for requests
- **Session ID in URL**: Query parameters used for session tracking
- **Connection Management**: Long-lived SSE connections must be properly maintained
```
┌────────────────┐      ┌────────────────┐

│ Client GET /mcp│      │Client POST     │

│  (SSE stream)  │      │/messages?id=xxx│

└───────┬────────┘      └───────┬────────┘

        │                       │

        ▼                       ▼

┌────────────────┐      ┌────────────────┐

│   Validate     │      │   Validate     │

│  Bearer Token  │      │  Bearer Token  │

└───────┬────────┘      └───────┬────────┘

        │                       │

        ▼                       ▼

┌────────────────┐      ┌────────────────┐

│Create SSEServer│      │ Extract Session│

│   Transport    │      │ID from URL Param│

└───────┬────────┘      └───────┬────────┘

        │                       │

        ▼                       ▼

┌────────────────┐      ┌────────────────┐

│mcpServer.connect│     │ Lookup Transport│

│  (transport)    │     │ By Session ID  │

└───────┬────────┘      └───────┬────────┘

        │                       │

        │                       ▼

        │              ┌────────────────┐

        │              │transport.handle│

        │              │  PostMessage   │

        │              └───────┬────────┘

        │                      │

        ▼                      ▼

┌────────────────┐     ┌────────────────┐

│ Keep-Alive SSE │     │JSON Response to│

│Connection (resp)│     │  POST Request  │

└────────────────┘     └────────────────┘
```
  

### Legacy Client Implementation

```javascript
javascript// GET handler for /mcp (legacy SSE stream)

app.get('/mcp', async (req, res) => {

  // authenticate the token

  const authResult = await authenticateToken(req, res, null);

  if (!authResult.success) {

    return authResult.response;

  }

  

  req.auth = authResult.authObject;

  

  // create SSE transport

  const transport = new SSEServerTransport('/messages', res);

  

  // store transport for future messages

  transports[transport.sessionId] = transport;

  

  // set SSE headers

  res.setHeader('Content-Type', 'text/event-stream');

  res.setHeader('Cache-Control', 'no-cache');

  res.setHeader('Connection', 'keep-alive');

  res.setHeader('X-Accel-Buffering', 'no');

  res.setHeader('Mcp-Session-Id', transport.sessionId);

  

  // connect to MCP server

  try {

    await mcpServer.connect(transport, { auth: req.auth });

  } catch (error) {

    if (!res.headersSent) {

      res.status(500).send('Internal server error during SSE setup.');

    } else {

      res.end();

    }

    

    // clean up transport

    if (transports[transport.sessionId]) {

      delete transports[transport.sessionId];

    }

  }

});

// POST /messages handler for legacy clients

app.post('/messages', express.json(), async (req, res) => {

  const sessionId = req.query.sessionId;

  const body = req.body;

  const rpcId = (body && body.id !== undefined) ? body.id : null;

  

  // authenticate the token

  const authResult = await authenticateToken(req, res, rpcId);

  if (!authResult.success) {

    return authResult.response;

  }

  

  req.auth = authResult.authObject;

  

  if (!sessionId) {

    return res.status(400).json({

      jsonrpc: '2.0',

      error: { code: -32000, message: 'Missing sessionId in query parameters' },

      id: rpcId

    });

  }

  

  const transport = transports[sessionId];

  

  if (!transport || !(transport instanceof SSEServerTransport)) {

    return res.status(404).json({

      jsonrpc: '2.0',

      error: { code: -32001, message: 'Session not found or not an SSE session' },

      id: rpcId

    });

  }

  

  try {

    await transport.handlePostMessage(req, res, body);

  } catch (error) {

    if (!res.headersSent) {

      res.status(500).json({

        jsonrpc: '2.0',

        error: { code: -32603, message: 'Internal server error handling message' },

        id: rpcId

      });

    }

  }

});
```
  

### Managing Session State Across Transport Types

One challenge with supporting multiple transport types is ensuring consistent session management. Our approach uses a single `transports` map to store all transport instances, regardless of type.

This allows us to:

1. **Track All Sessions**: Maintain a consistent view of active sessions
2. **Reuse Authentication Logic**: Apply the same authentication regardless of transport type
3. **Clean Up Resources**: Properly terminate sessions when they're no longer needed

The key is to make sure that each transport's `sessionId` is unique, even across different transport types.

  

Proper error handling is crucial for a reliable MCP server. Our implementation includes several error-handling strategies:

1. **JSON-RPC Error Responses**: Return structured error objects that follow the JSON-RPC 2.0 specification
2. **Transport-Specific Error Handling**: Different handling for HTTP responses vs. SSE streams
3. **Authentication Errors**: Specific error codes for missing, invalid, or expired tokens
4. **Session Errors**: Clear error messages for session-related issues
5. **Transport Errors**: Graceful handling of transport-level exceptions
  

| Code | Description | Common Cause | How to Handle |
| --- | --- | --- | --- |
| \-32000 | Authentication Error | Missing or invalid token | Return WWW-Authenticate header |
| \-32001 | Invalid Session | Session ID not found | Client should reinitialize |
| \-32002 | Method Not Found | Client called unknown method | Check method name |
| \-32003 | Invalid Parameters | Missing or invalid parameters | Validate parameters |
| \-32004 | Internal Error | Server-side exception | Log details for debugging |
| \-32005 | Parse Error | Invalid JSON | Validate request format |

Implementing these error-handling strategies ensure that clients receive meaningful feedback when issues occur.

  

## Part 5: Deployment and Production Considerations

Once your MCP server is working locally, you'll need to deploy it to make it accessible to LLM applications like Claude. The choice of deployment platform depends on your transport implementation and scaling requirements.

  

### Cloud Deployment Options

#### 1\. Google Cloud Run

- Serverless and scales automatically
- Simple docker deployment with `gcloud run deploy`
- Works well with Firebase Auth

#### 2\. Vercel

- Zero-configuration deployments
- Excellent for Node.js applications
- Built-in edge network for global performance
- Seamless GitHub integration

#### 3\. Railway

- Automatic deployments from GitHub
- Built-in database options

#### 4\. Digital Ocean App Platform

- Simple deployment from Git repositories
- Managed SSL certificates
- Good choice for small to medium applications

Azure App Service, AWS Elastiv Beanstalk, and Render are also alternatives. Basically, any platform that supports Node.js applications can host your MCP server with proper configuration.

INFO

⚠️ Legacy HTTP+SSE transport (2024-11-05 spec) requires persistent connections, preventing serverless platforms like Google Cloud Run from scaling to zero when idle. This reduces cost efficiency compared to Streamable HTTP transport (2025-03-26 spec). This limitation applies to most serverless providers.

  

## Part 6: Troubleshooting and Lessons Learned

  

### Authentication Challenges and Solutions

Authentication was one of the most challenging aspects of implementing our MCP server. A few key lessons:

1. **OAuth Discovery Flow**: Many clients failed silently without proper discovery endpoints. Always implement `/.well-known/oauth-protected-resource` and `/.well-known/oauth-authorization-server`.
2. **PKCE Support**: The PKCE flow is required by the MCP spec. Our solution validates the `code_verifier` against the stored `code_challenge`:
  
1. **WWW-Authenticate Header**: When a token is missing, clients expect a proper `WWW-Authenticate` header to start the OAuth flow. Our implementation follows the standard format:
  
1. **Client Registration**: Some clients require dynamic client registration. Implement a `/register` endpoint to support these clients:
  

### Debugging Transport-Specific Issues

Each transport type comes with its own set of challenges:

**Streamable HTTP Issues:**

1. **Session ID Propagation**: Make sure to set the `Mcp-Session-Id` header in both directions:
	- Extract from `req.headers['mcp-session-id']` for incoming requests (note that headers are lowercase in Node.js/Express).
	- Always set via `res.setHeader('Mcp-Session-Id', effectiveSessionId)` in responses (with capitalized casing as required by the MCP spec)
2. **Content-Type Handling**: Different clients expect different content types:
	- The spec says clients MUST accept both `application/json` and `text/event-stream`
	- In practice, many clients only support one format
	- Configure `StreamableHTTPServerTransport` with `enableJsonResponse: true` and `eventSourceEnabled: true` to support both
  

**HTTP+SSE Issues:**

1. **SSE Connection Timeouts**: SSE connections can timeout unexpectedly:
	- Set `Content-Type: text/event-stream`, `Cache-Control: no-cache`, and `Connection: keep-alive` headers
	- Consider implementing a heartbeat mechanism to keep connections alive
2. **Session Management Complexity**: The dual-endpoint nature of HTTP+SSE makes session management more complex:
	- Ensure that `POST /messages` can find the transport created by `GET /mcp`
	- Extract sessionId from query parameters: `POST /messages?sessionId=...`
	- Clean up resources properly when SSE connections close
3. **Headers Already Sent**: A common error with SSE is trying to send headers after the stream has started:
	- Check `res.headersSent` before attempting to send status codes or headers
	- Handle errors differently for SSE vs. regular HTTP responses
  

### Session Management Gotchas

Several session management issues caused subtle bugs in our implementation:

1. **Race Conditions**: When a client sends multiple requests in quick succession, race conditions can occur:
	- Use a `pendingTransports` map to track transports being created
	- Check both `transports` and `pendingTransports` before creating a new transport
2. **Session Cleanup**: Proper session cleanup is essential to prevent memory leaks:
	- Set an `onclose` handler for each transport
	- Implement explicit cleanup in the DELETE handler
	- Consider adding a session timeout mechanism for abandoned sessions
3. **Manual Session ID Assignment**: The SDK doesn't always set the `sessionId` property automatically:
	- Explicitly assign `transport.sessionId = sessionId` after creation
	- Use this same ID in the `transports` map for consistent lookup
  

### Working Around MCP Spec Limitations

The MCP specification has several limitations that required workarounds:

1. **Authentication Context**: The spec doesn't provide a standard way to pass authentication context to tool handlers:
	- We used `req.auth` to pass authentication information through the request object
	- Future versions of the SDK may support a better approach
2. **Limited Error Handling**: The spec doesn't fully define error handling:
	- We implemented a consistent approach using JSON-RPC error codes
	- Always include the original `id` in error responses for proper correlation
3. **Missing But Required Endpoints**: Some clients expect endpoints not clearly required by the spec:
	- Include a `registration_endpoint` in OAuth metadata even if unused
	- This prevents silent failures during client initialization
  

### Testing Your Implementation

Once you've built your MCP server, you'll want to test it to ensure it works with different clients. One current (and temporary) hurdle is that for now accessing the Claude's remote MCP settings requires a Claude Max subscription. Fortunately, there are other approaches to test your implementation.

  

#### Using mcp-remote for Testing

The `mcp-remote` tool provides a convenient way to test your remote MCP server. This approach uses Claude Desktop (or any other LLM application supporting MCP) with a local bridge to your remote server.

Add the following configuration to your `claude_desktop_config.json` file:

  

#### Cloudflare's AI playground

Cloudflare provide an [AI playground](https://playground.ai.cloudflare.com/) that allows you to enter the URL of your remote MCP server and initiate the authorization process. It comes with a debug log that is helpful for indentifying any issues that occur during the process.

  

## Conclusion

Building a reliable MCP server today feels a little rough around the edges, mainly because of sparse documentation and a rapidly evolving specification. However, as this guide shows, once you have the steps in front of you, building a full functionality server is relatively simple.

With your server running, your app can seamlessly talk to LLMs and you can enjoy the benefits (and occasional frustrations) of being an early adopter to a protocol that may turn out to be as foundational to AI as HTTP became for the web.

### Additional Resources

For those looking to learn more about MCP implementation, here are some helpful resources:

- **[Model Context Protocol Specification](https://modelcontextprotocol.io/specification/2025-03-26)**: The official specification
- **[MCP SDK Documentation](https://github.com/modelcontextprotocol/sdk)**: Documentation for the official JavaScript SDK
- **[OAuth 2.1 Specification](https://oauth.net/2.1/)**: Details on implementing secure authentication
- **[Firebase Authentication Guide](https://firebase.google.com/docs/auth)**: Documentation for Firebase authentication
- **[Auth0 Documentation](https://auth0.com/docs)**: For Auth0 implementation details
- **[Clerk Documentation](https://clerk.com/docs)**: For Clerk authentication integration
- **[Supabase Auth Documentation](https://supabase.com/docs/guides/auth)**: For Supabase authentication
- [MCP Inspector](https://github.com/modelcontextprotocol/inspector): Developer tool for testing and debugging MCP servers
- [Awesome Remote MCP Servers](https://github.com/jaw9c/awesome-remote-mcp-servers): List of spec compliant remote MCP servers (including [Simplescraper's](https://simplescraper.io/docs/mcp-server))
import {
  ClientToolRegistry,
  ConvincedAgentAdmin,
  ConvincedClient,
  type ConvincedVoiceController,
  createWebMcpBridge,
  getWebMcpModelContext,
  publishRegistryToWebMcp,
  WEBMCP_VOICE_BINDINGS,
  type ConvincedAgentAdminOptions,
  type ClientToolExecutionAuthorizer,
  type JsonObject,
  type UpdateAgentPromptInput,
  type WebMcpRegisteredTool,
} from '@convinced/widget-sdk'

/** Call from the authenticated admin surface, not a visitor tool handler. */
export async function openAgentEditor(options: ConvincedAgentAdminOptions) {
  const admin = new ConvincedAgentAdmin(options)
  let current = await admin.getPrompt()
  let busy = false
  let reloadRequired = false
  return {
    get current() { return current },
    async reload() {
      if (busy) throw new Error('An editor request is already in progress')
      busy = true
      try {
        current = await admin.getPrompt()
        reloadRequired = false
        return current
      } finally { busy = false }
    },
    async save(changes: Omit<UpdateAgentPromptInput, 'expectedRevision'>) {
      if (busy) throw new Error('An editor request is already in progress')
      if (reloadRequired) throw new Error('Reload saved settings before attempting another save')
      busy = true
      try {
        current = await admin.updatePrompt({ ...changes, expectedRevision: current.revision })
        return current
      } catch (error) {
        reloadRequired = true
        throw error
      } finally { busy = false }
    },
  }
}

/** Register after the page tools exist; dispose before publishing a new snapshot. */
export async function publishPageTools(options: {
  tools: ClientToolRegistry
  orgSlug: string
  sessionId: () => string | null
  authorize: ClientToolExecutionAuthorizer
}) {
  const modelContext = getWebMcpModelContext()
  if (!modelContext?.registerTool) throw new Error('WebMCP registration is unavailable')
  const publisher = publishRegistryToWebMcp(options.tools, {
    modelContext,
    execution: () => ({ orgSlug: options.orgSlug, sessionId: options.sessionId(), turnId: crypto.randomUUID() }),
    authorize: options.authorize,
  })
  await publisher.ready
  return publisher
}

/** Public-agent example. Start voice only from your visitor's explicit gesture. */
export function createWebsiteVoice(options: {
  client: ConvincedClient
  publicAgentId: string
  argumentEncoding?: 'json-string' | 'object'
  authorize: (tool: WebMcpRegisteredTool, input: JsonObject) => boolean | Promise<boolean>
}) {
  const modelContext = getWebMcpModelContext()
  if (!modelContext?.getTools) throw new Error('WebMCP discovery is unavailable')
  const bridge = createWebMcpBridge({
    modelContext,
    origin: window.location.origin,
    argumentEncoding: options.argumentEncoding ?? 'json-string',
    authorize: options.authorize,
  })
  let voice: ConvincedVoiceController
  try {
    voice = options.client.createVoiceController({
      tools: new ClientToolRegistry(bridge.tools),
      descriptor: {
        agentId: options.publicAgentId,
        connectionType: 'webrtc',
        exactClientTools: WEBMCP_VOICE_BINDINGS,
        genericClientTool: false,
      },
    })
  } catch (error) {
    bridge.dispose()
    throw error
  }
  return {
    voice,
    bridge,
    async dispose() { await options.client.endSession(); bridge.dispose() },
  }
}

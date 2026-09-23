import {
  ClientToolRegistry,
  ConvincedAgentAdmin,
  ConvincedClient,
  type ConvincedAgentAdminOptions,
  type UpdateAgentPromptInput,
} from '@convinced/widget-sdk'

/** Create one canonical chat with optional Live speech. */
export async function createWebsiteAgent(options: {
  orgSlug: string
  agentId: string
}) {
  const tools = new ClientToolRegistry()
  const client = new ConvincedClient({
    orgSlug: options.orgSlug,
    agentId: options.agentId,
    tools,
    authorizeToolCall: ({ tool }) =>
      tool.effect === 'read' || window.confirm(`Allow ${tool.description}?`),
  })

  await client.initialize()

  const live = client.createLiveController()
  return {
    client,
    live,
    tools,
    async dispose() {
      await live.end()
      await client.endSession()
      client.destroy()
    },
  }
}

/** Call from the authenticated admin surface, not a visitor tool handler. */
export async function openAgentEditor(options: ConvincedAgentAdminOptions) {
  const admin = new ConvincedAgentAdmin(options)
  let current = await admin.getPrompt()
  return {
    get current() { return current },
    async reload() { current = await admin.getPrompt(); return current },
    async save(changes: Omit<UpdateAgentPromptInput, 'expectedRevision'>) {
      current = await admin.updatePrompt({ ...changes, expectedRevision: current.revision })
      return current
    },
  }
}

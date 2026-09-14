import {
  ClientToolRegistry,
  ConvincedClient,
  ConvincedVoiceController,
  mountConvincedWidget,
  registerDomTools,
  type ClientToolDefinition,
} from '@convinced/widget-sdk'

/** Run once in the browser after the page DOM exists. */
export async function createWebsiteWidget(options: {
  orgSlug: string
  publicAgentId: string
  widgetToken?: string
}) {
  const tools = new ClientToolRegistry()
  registerDomTools(tools, {
    capabilities: { pageContext: true, scroll: true, highlight: true },
    authorize: ({ action, target }) => action === 'pageContext' ||
      window.confirm(`Allow ${action}${target ? `: ${target}` : ''}?`),
  })
  const authorize = ({ tool }: { tool: ClientToolDefinition }) =>
    tool.effect === 'read' || window.confirm(`Allow ${tool.description}?`)
  const client = new ConvincedClient({
    orgSlug: options.orgSlug,
    widgetToken: options.widgetToken,
    tools,
    authorizeToolCall: authorize,
  })
  await client.initialize()
  const voice = new ConvincedVoiceController({
    orgSlug: client.orgSlug,
    sessionId: () => client.state.session?.sessionId ?? null,
    tools,
    authorizeToolCall: authorize,
    descriptor: {
      agentId: options.publicAgentId,
      connectionType: 'webrtc',
      exactClientTools: {
        host_get_page_context: 'host_get_page_context',
        host_scroll_to: 'host_scroll_to',
        host_highlight: 'host_highlight',
      },
      genericClientTool: false,
    },
    onConversationId: (id) => client.linkElevenLabsConversation(id),
  })
  const widget = mountConvincedWidget({
    client,
    voice,
    preset: 'managed-v2',
    autoInitialize: false,
    placement: 'floating',
    launcherLabel: 'Talk to us',
  })
  return {
    client,
    voice,
    widget,
    // Invoke from reliable application teardown; await before navigating away.
    async dispose() {
      await widget.endSession()
      widget.destroy()
      client.destroy()
    },
  }
}

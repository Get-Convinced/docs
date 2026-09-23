import {
  ClientToolRegistry,
  ConvincedClient,
  mountConvincedWidget,
  registerDomTools,
} from '@convinced/widget-sdk'

/** Run once in the browser after the page DOM exists. */
export async function createWebsiteWidget(options: {
  orgSlug: string
  agentId: string
  widgetToken?: string
}) {
  const tools = new ClientToolRegistry()
  registerDomTools(tools, {
    capabilities: { pageContext: true, scroll: true, highlight: true },
    authorize: ({ action, target }) => action === 'pageContext' ||
      window.confirm(`Allow ${action}${target ? `: ${target}` : ''}?`),
  })

  const client = new ConvincedClient({
    orgSlug: options.orgSlug,
    agentId: options.agentId,
    ...(options.widgetToken ? { widgetToken: options.widgetToken } : {}),
    tools,
    authorizeToolCall: ({ tool }) =>
      tool.effect === 'read' || window.confirm(`Allow ${tool.description}?`),
  })

  await client.initialize()
  const live = client.createLiveController()
  const widget = mountConvincedWidget({
    client,
    voice: live,
    preset: 'managed-v2',
    autoInitialize: false,
    placement: 'floating',
    launcherLabel: 'Talk to us',
  })

  return {
    client,
    live,
    widget,
    // Invoke from reliable application teardown; await before navigating away.
    async dispose() {
      await widget.endSession()
      widget.destroy()
      client.destroy()
    },
  }
}

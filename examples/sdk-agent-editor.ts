import { ConvincedAgentAdmin, type ConvincedAgentAdminOptions } from '@convinced/widget-sdk'

/** Mount only inside an authenticated management application. */
export async function mountAgentEditor(root: HTMLElement, options: ConvincedAgentAdminOptions) {
  const agent = new ConvincedAgentAdmin(options)
  const form = document.createElement('form')
  const prompt = document.createElement('textarea')
  const firstMessage = document.createElement('textarea')
  const save = document.createElement('button')
  const reload = document.createElement('button')
  const status = document.createElement('p')
  prompt.setAttribute('aria-label', 'System prompt')
  firstMessage.setAttribute('aria-label', 'First message')
  save.type = 'submit'; save.textContent = 'Save to ElevenLabs'
  reload.type = 'button'; reload.textContent = 'Reload saved settings'
  status.setAttribute('role', 'status')
  form.append(prompt, firstMessage, save, reload, status)
  root.append(form)
  const lifecycle = new AbortController()
  let disposed = false
  let current: Awaited<ReturnType<typeof agent.getPrompt>> | undefined
  let uncertain = true
  const busy = (value: boolean) => {
    if (disposed) return
    prompt.disabled = firstMessage.disabled = reload.disabled = value
    save.disabled = value || uncertain
  }
  async function load() {
    if (disposed) return
    busy(true)
    try {
      const loaded = await agent.getPrompt({ signal: lifecycle.signal })
      if (disposed) return
      current = loaded
      prompt.value = current.systemPrompt
      firstMessage.value = current.firstMessage
      uncertain = false
      status.textContent = 'Loaded from ElevenLabs'
    } catch {
      if (disposed) return
      uncertain = true
      status.textContent = 'Could not load settings. Check your administrator login and agent access.'
    } finally { busy(false) }
  }
  const onReload = () => {
    if (disposed) return
    if (window.confirm('Replace your unsaved edits with the saved settings?')) void load()
  }
  const onSave = async (event: SubmitEvent) => {
    event.preventDefault()
    if (disposed || !current || uncertain || save.disabled) return
    busy(true)
    try {
      const saved = await agent.updatePrompt({
        systemPrompt: prompt.value,
        firstMessage: firstMessage.value,
        expectedRevision: current.revision,
      }, { signal: lifecycle.signal })
      if (disposed) return
      current = saved
      prompt.value = current.systemPrompt
      firstMessage.value = current.firstMessage
      status.textContent = 'Saved to ElevenLabs for future conversations'
    } catch {
      if (disposed) return
      uncertain = true
      status.textContent = 'Save could not be confirmed. Copy your edits, then reload before retrying.'
    } finally { busy(false) }
  }
  form.addEventListener('submit', onSave)
  reload.addEventListener('click', onReload)
  await load()
  return {
    destroy() {
      if (disposed) return
      disposed = true
      lifecycle.abort()
      form.removeEventListener('submit', onSave)
      reload.removeEventListener('click', onReload)
      form.remove()
    },
  }
}

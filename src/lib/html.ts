/**
 * Forces every <a href> in a trusted, admin-authored HTML string (e.g. blog
 * post body content) to open in a new tab. Leaves anchors that already
 * declare a target untouched.
 */
export function openLinksInNewTab(html: string): string {
  return html.replace(/<a\s+((?:[^>]*?\s)?href=["'][^"']*["'][^>]*)>/gi, (match, attrs: string) => {
    if (/\btarget\s*=/i.test(attrs)) return match
    return `<a ${attrs} target="_blank" rel="noopener noreferrer">`
  })
}

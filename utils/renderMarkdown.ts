import { marked } from 'marked';

/**
 * Render markdown body into HTML, with custom GFM-style footnote handling.
 *
 * Input convention (matches sbh-editorial agent output):
 *   "Some claim[^1]."  →  inline reference
 *   "[^1]: Source title — URL — date"  →  footnote definition
 *
 * Output:
 *   <sup id="ref-1"><a href="#fn-1" class="footnote-ref">[1]</a></sup>
 *   …
 *   <section class="footnotes"><ol>
 *     <li id="fn-1">Source title — URL — date <a href="#ref-1">↩</a></li>
 *   </ol></section>
 *
 * The body string from the CMS may also contain the H1. We strip it here because
 * the page template renders its own <h1>.
 */
export function renderMarkdown(body: string): string {
    if (!body) return '';

    // Strip leading H1 (rendered separately by page template)
    let md = body.replace(/^#\s+.+\n+/, '');

    // Extract footnote definitions: "[^N]: ..."
    const footnotes = new Map<string, string>();
    md = md.replace(/^\[\^([^\]]+)\]:\s*(.+)$/gm, (_, key: string, text: string) => {
        footnotes.set(key, text.trim());
        return ''; // remove the definition line from the body
    });

    // Convert inline references "[^N]" to <sup> links
    md = md.replace(/\[\^([^\]]+)\]/g, (_, key: string) => {
        return `<sup id="ref-${key}" class="footnote-ref"><a href="#fn-${key}">[${key}]</a></sup>`;
    });

    marked.setOptions({
        gfm: true,
        breaks: false,
    });

    const html = marked.parse(md, { async: false }) as string;

    if (footnotes.size === 0) return html;

    // Render footnotes section
    const items = Array.from(footnotes.entries())
        .map(([key, text]) => {
            // Auto-link bare URLs inside footnote text
            const linked = text.replace(
                /(https?:\/\/[^\s)]+)/g,
                '<a href="$1" target="_blank" rel="noopener noreferrer nofollow">$1</a>',
            );
            return `<li id="fn-${key}">${linked} <a href="#ref-${key}" class="footnote-backref" aria-label="Retour au texte">↩</a></li>`;
        })
        .join('\n');

    const footer = `\n<section class="footnotes" aria-label="Sources"><hr><ol>\n${items}\n</ol></section>\n`;

    return html + footer;
}

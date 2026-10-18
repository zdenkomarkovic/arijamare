// HTML (WordPress / Elementor) -> Sanity Portable Text, sa slikama i linkovima.
import * as cheerio from 'cheerio'

const SITE_HOSTS = /^https?:\/\/(www\.)?arijamare\.com/i
let n = 0
const key = () => `k${(n++).toString(36)}`

// Interni linkovi postaju relativni (URL struktura je ista na novom sajtu)
export function normalizeHref(href) {
  if (!href) return href
  return href.replace(SITE_HOSTS, '') || '/'
}

const fullSize = (src) => src.replace(/-\d+x\d+(\.\w+)$/, '$1')

export async function htmlToBlocks(html, { uploadImage, drop = '' } = {}) {
  const $ = cheerio.load(`<div id="root">${html}</div>`, null, false)
  $('script, style, noscript, svg, form, iframe, button, input, select, template').remove()
  // WooCommerce / Elementor widgeti koji ne nose tekstualni sadržaj
  $(
    '.woocommerce, ul.products, [class*="elementor-widget-woocommerce"], [class*="elementor-widget-wc"], [class*="elementor-widget-search"], .elementor-widget-spacer, .elementor-widget-divider, .elementor-widget-button, .elementor-widget-counter, .elementor-widget-icon-box, .elementor-widget-sidebar',
  ).remove()
  if (drop) $(drop).remove()

  const blocks = []

  function inline(node, marks, defs, out) {
    node.contents().each((_, el) => {
      if (el.type === 'text') {
        const text = el.data.replace(/\s+/g, ' ')
        if (text) out.push({ _type: 'span', _key: key(), text, marks: [...marks] })
        return
      }
      if (el.type !== 'tag') return
      const $el = $(el)
      const tag = el.name
      if (tag === 'br') {
        out.push({ _type: 'span', _key: key(), text: '\n', marks: [...marks] })
      } else if (tag === 'strong' || tag === 'b') {
        inline($el, [...marks, 'strong'], defs, out)
      } else if (tag === 'em' || tag === 'i') {
        inline($el, [...marks, 'em'], defs, out)
      } else if (tag === 'a') {
        const href = normalizeHref($el.attr('href'))
        if (href && !href.startsWith('#') && !/^javascript:/i.test(href)) {
          const k = key()
          defs.push({ _key: k, _type: 'link', href })
          inline($el, [...marks, k], defs, out)
        } else inline($el, marks, defs, out)
      } else if (tag === 'img') {
        // slike unutar teksta se obrađuju na nivou bloka
      } else inline($el, marks, defs, out)
    })
  }

  function textBlock(node, style = 'normal', extra = {}) {
    const children = []
    const markDefs = []
    inline(node, [], markDefs, children)
    // trim
    while (children.length && !children[0].text.trim()) children.shift()
    while (children.length && !children[children.length - 1].text.trim()) children.pop()
    if (!children.length) return null
    children[0].text = children[0].text.replace(/^\s+/, '')
    children[children.length - 1].text = children[children.length - 1].text.replace(/\s+$/, '')
    return { _type: 'block', _key: key(), style, markDefs, children, ...extra }
  }

  async function imageBlock($img) {
    const src = $img.attr('data-src') || $img.attr('src')
    if (!src || src.startsWith('data:') || !uploadImage) return
    if (/(leaf-free-img|emoji|gravatar|logo)/i.test(src)) return
    try {
      const ref = await uploadImage(fullSize(src))
      blocks.push({
        _type: 'image',
        _key: key(),
        asset: { _type: 'reference', _ref: ref },
        alt: ($img.attr('alt') || '').trim(),
      })
    } catch (e) {
      console.warn('  slika preskočena:', src, e.message)
    }
  }

  async function walk(node, listCtx) {
    for (const el of node.children().toArray()) {
      const $el = $(el)
      const tag = el.name
      if (/^h[1-6]$/.test(tag)) {
        const lvl = Math.min(4, Math.max(2, Number(tag[1])))
        const b = textBlock($el, `h${lvl}`)
        if (b) blocks.push(b)
      } else if (tag === 'p') {
        // paragraf može sadržati sliku
        for (const img of $el.find('img').toArray()) await imageBlock($(img))
        const b = textBlock($el)
        if (b) blocks.push(b)
      } else if (tag === 'ul' || tag === 'ol') {
        const listItem = tag === 'ul' ? 'bullet' : 'number'
        for (const li of $el.children('li').toArray()) {
          const $li = $(li)
          const clone = $li.clone()
          clone.find('ul, ol').remove()
          const b = textBlock(clone, 'normal', { listItem, level: (listCtx ?? 0) + 1 })
          if (b) blocks.push(b)
          for (const sub of $li.children('ul, ol').toArray()) {
            await walk($('<div></div>').append($(sub).clone()), (listCtx ?? 0) + 1)
          }
        }
      } else if (tag === 'blockquote') {
        const b = textBlock($el, 'blockquote')
        if (b) blocks.push(b)
      } else if (tag === 'img') {
        await imageBlock($el)
      } else if (tag === 'table') {
        for (const tr of $el.find('tr').toArray()) {
          const b = textBlock($(tr).clone().find('td, th').after(' | ').end(), 'normal')
          if (b) blocks.push(b)
        }
      } else if (tag === 'figure' || tag === 'div' || tag === 'section' || tag === 'span' || tag === 'article' || tag === 'main' || tag === 'center') {
        // Ako kontejner ima samo inline sadržaj (bez blok dece), tretiraj ga kao paragraf
        const hasBlockChild = $el.children('h1,h2,h3,h4,h5,h6,p,ul,ol,div,section,figure,table,blockquote,img,article').length > 0
        if (hasBlockChild) await walk($el, listCtx)
        else {
          const b = textBlock($el)
          if (b) blocks.push(b)
        }
      } else {
        const b = textBlock($el)
        if (b) blocks.push(b)
      }
    }
  }

  await walk($('#root'))
  return blocks
}

export const plainText = (html) =>
  cheerio.load(`<div>${html || ''}</div>`).text().replace(/\s+/g, ' ').trim()

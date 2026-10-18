# ADR 0001 — Redesign visual: paleta mais clara e texturas por página

- **Status:** Aceito
- **Data:** 2026-10-12
- **Escopo:** `web/` (front-end React + Vite) e arquivo Figma "Zelda API - Redesign"

## Contexto

O redesign "Hyrule Compendium" usava uma base quase preta (`--bg #0A1216`, `--plate #0C171C`) com superfícies muito próximas entre si. Na prática:

- as telas ficavam escuras demais e os cards não se separavam do fundo;
- a textura de ondas douradas (`WavesGold.png`) cobria **todas** as páginas de cima a baixo, ficando repetitiva e "suja" atrás do conteúdo;
- textos secundários (`--muted #8F8D80`, `#A9A796`) tinham pouco contraste;
- o título "ZELDA UNIVERSE" da tela Explore usava `Florest.jpg` recortada no texto (`background-clip: text`) e ficava invisível sobre o fundo escuro;
- os cards "Meet the Characters" e "Face the Enemies" da Home estavam vazios no Figma.

## Decisão

### 1. Paleta "Sheikah slate" — escura, porém mais clara

Mantemos a identidade escura e dourada, com cores **sólidas**, mas subimos a luminosidade da base para um azul-petróleo médio e afastamos as camadas umas das outras.

| Token                | Antes     | Depois    |
|----------------------|-----------|-----------|
| `--bg`               | `#0A1216` | `#17303A` |
| `--plate`            | `#0C171C` | `#1C3842` |
| `--panel`            | `#111E25` | `#21414C` |
| `--card`             | `#12202A` | `#244653` |
| `--line`             | `#33392C` | `#4A6260` |
| `--line-gold`        | `#4A3F22` | `#6E5E30` |
| `--line-gold-strong` | `#5A4D27` | `#8A7536` |
| `--text-soft`        | `#BDB9A8` | `#D8D3C0` |
| `--muted`            | `#8F8D80` | `#B8B5A6` |

Novos tokens: `--bg-rgb` (para overlays `rgba(var(--bg-rgb), a)`), `--line-soft`, `--text-dim` e `--text-lead`, substituindo cores fixas espalhadas pelos CSS das páginas.

Overlays escuros (hero da Home, backdrop do Game, sombra dos cards) passam a usar `--bg-rgb` com cerca de 75% da opacidade anterior, deixando as imagens aparecerem mais.

### 2. Texturas por página, não por site

A textura global (`body::before`, `position: fixed`) foi removida. No lugar:

- **`.texture-waves`** — ondas douradas apenas atrás do cabeçalho da página, com `mask-image` fazendo fade para o fundo sólido. Altura ajustável via `--waves-height` (`.waves-short` = 540px, `.waves-tall` = 720px).
- **`.texture-book`** — o livro Sheikah (`BookGold.png`, versão dourada do `BookIcon.png`) no canto superior direito do cabeçalho.

| Página            | Textura                                                |
|-------------------|--------------------------------------------------------|
| Home              | Ondas só na seção "Where will your adventure lead?" (fade em cima e embaixo) |
| Explore (`/more`) | Ondas no topo                                          |
| Games / Game      | Ondas no topo                                          |
| Characters, Races | Livro Sheikah no cabeçalho, sem ondas                  |
| Character         | Fundo liso (o card de perfil já usa o livro Sheikah)   |
| Bosses            | Sem ondas — vermelho + glow (único lugar com glow)      |

### 3. Ajustes pontuais

- "ZELDA UNIVERSE" usa o mesmo degradê dourado de `.gold-text` (`--gold-hi → --gold → --gold-lo`).
- No Figma, os cards da Home recebem `ZeldaHome5.jpg` e `ZeldaHome6.jpg`, as mesmas imagens que o app usa.

### 4. Figma espelha o app

As telas "· Light" no Figma (abaixo das originais) são a referência do novo visual e devem reproduzir as telas renderizadas do app, não wireframes.

## Consequências

- **Positivas:** mais legibilidade e hierarquia; cada seção ganha identidade própria; as cores ficam centralizadas em tokens, o que facilita ajustes futuros (inclusive um eventual tema claro).
- **Negativas / atenção:**
  - `mask-image` exige o prefixo `-webkit-` em alguns navegadores (já incluído).
  - A textura usa `width: 100vw` e por isso o `body` recebe `overflow-x: clip` para evitar scroll horizontal.
  - As telas originais escuras continuam no Figma só como histórico; a fonte de verdade passa a ser a versão "· Light".

## Alternativas consideradas

- **Tema claro (pergaminho):** descartado por perder a atmosfera do Sheikah Slate e exigir revisar todas as imagens dos cards.
- **Só reduzir a opacidade da textura global:** resolveria parte do ruído, mas não o problema de todas as páginas parecerem iguais.

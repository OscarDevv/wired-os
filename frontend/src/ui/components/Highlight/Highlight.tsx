import { Highlight as ChakraHighlight } from "@chakra-ui/react/highlight"
import { Mark } from "@chakra-ui/react/mark"

import type { HighlightProps } from "./Highlight.types.ts"

export function Highlight({ query, ignoreCase, matchAll, ...rest }: HighlightProps) {
  return (
    <ChakraHighlight query={query} ignoreCase={ignoreCase} matchAll={matchAll}>
      {(chunks) =>
        chunks.map((chunk, index) =>
          chunk.match ? (
            <Mark key={index} {...rest}>
              {chunk.text}
            </Mark>
          ) : (
            <span key={index}>{chunk.text}</span>
          ),
        )
      }
    </ChakraHighlight>
  )
}
